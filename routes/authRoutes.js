const express = require('express');
const { signup, login, logout } = require('../controller/authController');
const {validateLogin, validateSignup} = require('../validators/validator');
const protect = require('../middleware/protectRoute');

const AuthRouter = express.Router();

AuthRouter.route('/signup')
    .post(validateSignup, signup);

AuthRouter.route('/login')
    .post(validateLogin, login);

AuthRouter.route('/logout')
    .post(protect, logout);

module.exports = AuthRouter;