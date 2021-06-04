const router = require('express').Router();
const validationObject = require('../middlewares/validationObject');

const { validateCreateMovie } = require('../middlewares/validation');

const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../conrollers/movies');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovies);
router.delete('/:movieId', validationObject, deleteMovies);

module.exports = router;
