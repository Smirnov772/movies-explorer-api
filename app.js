require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const errorHandler = require('./middlewares/error-handler');
const {
  validateRegisterBody,
  validateRegistration,
} = require('./middlewares/validation');
const { createUser, login } = require('./conrollers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./errors/index');
const auth = require('./middlewares/auth');

const app = express();
const { PORT = 3002 } = process.env;
app.use(express.json());
app.use(cors({
  origin: true,
  exposedHeaders: '*',
  credentials: true,
}));
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signin', validateRegisterBody, login);
app.post('/signup', validateRegistration, createUser);

app.use('/users', auth, usersRouter);
app.use('/movies', auth, moviesRouter);

app.use((req, res, next) => {
  next(new NotFoundError('ресурс не найден'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {});
