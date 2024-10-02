const express = require('express');

const mainRouter = express.Router();

const { getCardsByNumber, createCard, getAllFavs, getBySource } = require('../controllers/mainController');

mainRouter.get('/getdaily/:numb', getCardsByNumber);
mainRouter.post('/cards/getFavsDaily', getAllFavs);
mainRouter.get('/cards/getbysource/:source', getBySource);
mainRouter.post('/cards/add', createCard);
// authRouter.delete('/signout', logoutUser);

exports.mainRouter = mainRouter;