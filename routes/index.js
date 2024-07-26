const express = require('express');

const routes = express.Router();

const { authRouter } = require('./authRouter');
const { notFoundRouter } = require('./notFound');

routes.use(authRouter);
routes.use(notFoundRouter);

module.exports = routes;