const express = require('express');

const mainRouter = express.Router();

const { getCardsByNumber } = require('../controllers/mainController');

mainRouter.get('/getdaily/:numb', getCardsByNumber);
// authRouter.delete('/signout', logoutUser);

exports.mainRouter = mainRouter;