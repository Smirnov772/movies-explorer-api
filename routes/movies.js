const moviesRouter = require('express').Router();
const validationObject = require('../middlewares/validationObject');

const { validateCreateMovie } = require('../middlewares/validation');

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../conrollers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validateCreateMovie, createMovies);
moviesRouter.delete('/:movieId', validationObject, deleteMovies);

exports.moviesRouter = moviesRouter;
