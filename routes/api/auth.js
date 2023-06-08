const express = require('express');
const { validateBody, authenticate, upload } = require('../../middlewares');

const ctrl = require('../../controllers/auth');

const { schemas } = require('../../models/userJoi');
const auth = require('../../controllers/auth');

const router = express.Router();

router.post("/register", validateBody(schemas.register), ctrl.register);

router.post("/login", validateBody(schemas.login), ctrl.login);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", validateBody(schemas.userEmailSchema), ctrl.resendVerifyEmail);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);

module.exports = router;