const express = require('express');

const authRouter = express.Router();

const { registerUser, loginUser, makerefreshToken, getUser } = require('../controllers/usersController');

const {
  validateRegisterUser, validateSigninUser,
} = require('../middlewares/validators');

authRouter.post('/auth/register', validateRegisterUser, registerUser);
authRouter.post('/auth/login', validateSigninUser, loginUser);
authRouter.get('/auth/user', getUser);
authRouter.post('/auth/token', makerefreshToken);
// authRouter.delete('/signout', logoutUser);

exports.authRouter = authRouter;