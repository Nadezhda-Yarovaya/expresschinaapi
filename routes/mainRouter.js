const express = require('express');

const mainRouter = express.Router();

const { getCardsByNumber, createCard } = require('../controllers/mainController');

mainRouter.get('/getdaily/:numb', getCardsByNumber);
mainRouter.post('/cards/add', createCard);
// authRouter.delete('/signout', logoutUser);

exports.mainRouter = mainRouter;