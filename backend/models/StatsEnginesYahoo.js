const mongoose = require('mongoose');
const Country = require('./Country');
const Language = require('./Language');
const SitesEnginesYahooSchema = new mongoose.Schema({
  name: String,
  queryURL: String,
  isValid: Boolean,
  minValidLinksAmount: Number,
  languageID: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
  countryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  dateValidated: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('SitesEnginesYahoo', SitesEnginesYahooSchema);