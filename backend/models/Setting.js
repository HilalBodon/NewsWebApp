const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
    showNewsTicker: Boolean,
    showVideo: Boolean,
    videoLink: String,
  });
  
  const Setting = mongoose.model('Setting', settingsSchema);

module.exports = Setting;