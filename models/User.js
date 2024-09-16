const mongoose = require('mongoose');

const validator = require('validator');

const { minimumSymbMessage } = require('../constants/messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 2,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
    },
  },
  password: {
    type: String,
    minlength: [2, minimumSymbMessage],
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: [2, minimumSymbMessage],
    maxlength: 30,
    required: true,
  },
  tokens: [
    {token: {type: String},}
  ],
  favsDaily: {
    type: [String],
    default: [],
  },
  favsCh: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('user', userSchema);