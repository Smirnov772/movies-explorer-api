const Movie = require('../models/movie');
const {
  NotFoundError,
  BadRequestError,
  ServerError,
  Forbiddenerror,
} = require('../errors/index');

const getMovies = (req, res, next) => {
  
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch(() => next(new ServerError('Ошибка сервера.')));
};

const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))

    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            'Переданы некорректные данные при создании фильма.',
          ),
        );
      }
      next(new ServerError('Ошибка сервера.'));
    });
};

const deleteMovies = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найдена.');
      } else {
        Movie.findById(req.params.movieId)
          .then(() => {
            if (!movie.owner.equals(req.user._id)) {
              throw new Forbiddenerror('Фильм не в вашей колекции.');
            } else {
              Movie.findByIdAndDelete(req.params.movieId)
                .then(() => {
                  res.send(movie);
                })
                .catch((err) => next(err));
            }
          }).catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Передан некорректный _id.'));
      }
      next(new ServerError('Ошибка сервера.'));
    });
};

module.exports = {
  getMovies,
  createMovies,
  deleteMovies,

};
