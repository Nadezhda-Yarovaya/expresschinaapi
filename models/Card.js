const mongoose = require('mongoose');

const validator = require('validator');

const { minimumSymbMessage } = require('../constants/messages');

const cardSchema = new mongoose.Schema({  
  id: {
    type: String,
    minlength: [2, minimumSymbMessage],
    maxlength: 15,
    required: true,
  },
  source: {
    type: String,
    minlength: [2, minimumSymbMessage],
    maxlength: 35,
    required: true,
  },
  taskEn: {
    type: String,
    minlength: [3, minimumSymbMessage],
    maxlength: 60,
    required: true,
  },
  chin: {
    type: String,
    minlength: [1, minimumSymbMessage],
    maxlength: 60,
    required: true,
  },
  pinyin: {
    type: String,
    minlength: [1, minimumSymbMessage],
    maxlength: 60,
  },
});

module.exports = mongoose.model('card', cardSchema);