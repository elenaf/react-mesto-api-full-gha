// функциональность точки входа
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/router'); // импортируем роутер
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

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
