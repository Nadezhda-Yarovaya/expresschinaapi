const mongoose = require('mongoose');

const validator = require('validator');

const { minimumSymbMessage } = require('../constants/messages');

const settingSchema = new mongoose.Schema({
  maint: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('setting', settingSchema);