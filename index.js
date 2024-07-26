const express = require('express');

const mongoose = require('mongoose');

require('dotenv').config();

const { errors } = require('celebrate');

const cors = require('cors');

const cookieParser = require('cookie-parser');

const helmet = require('helmet');

// const limiter = require('./constants/limiter');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const router = require('./routes');

const { errorHandler } = require('./middlewares/errorHandler');

const { NODE_ENV, PORT = 3000, MONGO_URL } = process.env;

const app = express();
app.use(requestLogger);
app.use(helmet());
// app.use(limiter);

app.use(express.json());
app.use(cookieParser());
const whiteList = [
  'https://chinese.ynstudios.ru',
  'http://localhost:3007',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Ошибка CORS'));
      }
    },
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'DELETE, PUT, GET, POST, PATCH',
  }),
);

app.use(router);

app.use(errorLogger);
mongoose.connect(
  NODE_ENV === 'production'
    ? `${MONGO_URL}`
    : 'mongodb://localhost:27017/moviesdb-dev',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});