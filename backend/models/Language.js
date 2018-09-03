const mongoose = require('mongoose');
const LanguageSchema = new mongoose.Schema({
  name: String,
  languageCode: String,
  isGlobal: Boolean,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Language', LanguageSchema);