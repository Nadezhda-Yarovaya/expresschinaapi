const express = require('express');

const routes = express.Router();

const { authRouter } = require('./authRouter');
const { setRouter } = require('./settingsRouter');
const { mainRouter } = require('./mainRouter');
const { notFoundRouter } = require('./notFound');

routes.use(authRouter);
routes.use(setRouter);
routes.use(mainRouter);
routes.use(notFoundRouter);

module.exports = routes;