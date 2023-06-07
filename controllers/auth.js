const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY, PROJECT_URL } = process.env;

const {nanoid} = require("nanoid");
const { User } = require("../models/user");
const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const gravatar = require("gravatar");

const path = require("path");
const avatarDir = path.join(__dirname, "../", "public", "avatars");
const fs = require("fs/promises");

const Jimp = require("jimp");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashedPassword, avatarUrl, verificationToken });

  const verifyEmail = {
    to: email,
    subject: "Verification email",
    html: `<a target:"_blank" href:"${PROJECT_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };

  await sendEmail(verifyEmail);


  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });
    res.status(204).json({
          message: "No Content",
        });
};

const updateAvatar = async (req, res) => { 
  const {_id} = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;

  await Jimp.read(tmpUpload)
  .then((avatar) => {
    return avatar
      .resize(250, 250) // resize
      .quality(60) // set JPEG quality
      .write(tmpUpload); // save
  })
  .catch((err) => {
    throw new HttpError(err);
  });

  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tmpUpload, resultUpload);
  const avatarUrl = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({
    avatarUrl,
  })
}


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar)
};
