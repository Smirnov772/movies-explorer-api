const moviesRouter = require('express').Router();
const validationObject = require('../middlewares/validationObject');

const { validateCreateMovie } = require('../middlewares/validation');

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../conrollers/movies');

moviesRouter.get('/api/', getMovies);
moviesRouter.post('/api/', validateCreateMovie, createMovies);
moviesRouter.delete('/api/:movieId', validationObject, deleteMovies);

exports.moviesRouter = moviesRouter;
