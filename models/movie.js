const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({

  // likes: {
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  //   default: [],
  // },

  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validator: (value) => validator.isURL(value, { require_protocol: true }),
    message: 'Неправильная ссылка',
  },
  trailer: {
    type: String,
    validator: (value) => validator.isURL(value, { require_protocol: true }),
    message: 'Неправильная ссылка',
  },
  thumbnail: {
    type: String,
    validator: (value) => validator.isURL(value, { require_protocol: true }),
    message: 'Неправильная ссылка',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
