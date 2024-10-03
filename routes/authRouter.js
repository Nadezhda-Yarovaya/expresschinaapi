const express = require('express');

const authRouter = express.Router();

const { registerUser, loginUser, makerefreshToken, getUser, addToFavs, removeFromFavs, addToFavsCh, logoutUser } = require('../controllers/usersController');

const {
  validateRegisterUser, validateSigninUser,
} = require('../middlewares/validators');

authRouter.post('/auth/register', validateRegisterUser, registerUser);
authRouter.post('/auth/login', validateSigninUser, loginUser);
authRouter.get('/auth/user', getUser);
authRouter.get('/auth/token', makerefreshToken);
authRouter.put('/user/addtofav', addToFavs);
authRouter.delete('/user/removefromfav', removeFromFavs);
authRouter.put('/user/addtofavch', addToFavsCh);
authRouter.delete('/auth/logout', logoutUser);

exports.authRouter = authRouter;