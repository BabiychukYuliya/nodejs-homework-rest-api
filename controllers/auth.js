const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { SECRET_KEY }  = process.env;

const { User } = require('../models/user');

const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw new HttpError(409, 'Email in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({...req.body, password: hashedPassword});
   
    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription
   
    })
}



const login = async (req, res) => { 
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw new HttpError(401, 'Email or password is wrong');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
            throw new HttpError(401, 'Email or password is wrong');
    }
    

    const payload = {
        id: user._id,
    }
   
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.status(200).json({
        token, 
        user: {
            email: user.email,
            subscription: user.subscription
        }
        })

}


module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}