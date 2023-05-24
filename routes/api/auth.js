const express = require('express');
const { validateBody } = require('../../middlewares');

const ctrl = require('../../controllers/auth');

const { schemas } = require('../../models/userJoi');

const router = express.Router();

router.post("/register", validateBody(schemas.register), ctrl.register);

router.post("/login", validateBody(schemas.login), ctrl.login);

module.exports = router;