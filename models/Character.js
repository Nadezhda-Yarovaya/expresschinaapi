const mongoose = require('mongoose');

const validator = require('validator');

const { minimumSymbMessage } = require('../constants/messages');

const characSchema = new mongoose.Schema({  
  id: {
    type: String,
    minlength: [2, minimumSymbMessage],
    maxlength: 15,
  },
  character: {
    type: String,
    minlength: [1, minimumSymbMessage],
    maxlength: 60,
  },
  translate: {
    type: String,
    minlength: [1, minimumSymbMessage],
    maxlength: 60,
  },
  pinyin: {
    type: String,
    minlength: [1, minimumSymbMessage],
    maxlength: 60,
  },
  cat: {
    type: String,
  }
});

module.exports = mongoose.model('character', characSchema);