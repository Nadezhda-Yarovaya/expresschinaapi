const express = require('express');

const characterRouter = express.Router();

const { createCharcterCard, createCardMultiple, getCCharactersByNumber } = require('../controllers/characterController');

characterRouter.get('/characters/:numb', getCCharactersByNumber);
characterRouter.post('/character/add', createCharcterCard);
characterRouter.post('/character/addmany', createCardMultiple);

// authRouter.delete('/signout', logoutUser);

exports.characterRouter = characterRouter;
