// функциональность точки входа
const { errors } = require('celebrate');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/router'); // импортируем роутер
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors({
  origin: [
    'https://mesto-react.nomoredomains.monster/',
    'http://mesto-react.nomoredomains.monster/',
    'https://api.mesto-react.nomoredomains.monster/',
    'http://api.mesto-react.nomoredomains.monster/',
    'https://localhost:3000',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
}));

dotenv.config();
const { PORT = 3000, DATABASE_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

app.use(requestLogger); // подключаем логгер запросов

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router); // запускаем роутер.

app.use(errorLogger); // подключаем логгер ошибок

// обработчик ошибок celebrate
app.use(errors());

// миддлвэр обработки ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});

// подключение к базе данных
async function connect() {
  await mongoose.connect(DATABASE_URL); // подключаемся к БД
  await app.listen(PORT);
}

connect();
