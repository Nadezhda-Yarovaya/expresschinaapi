const express = require('express');

const setRouter = express.Router();

const { checkMaintanence } = require('../controllers/settingsCont');

setRouter.get('/site', checkMaintanence);

exports.setRouter = setRouter;