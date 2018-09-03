const mongoose = require('mongoose');
const Country = require('./Country');
const Category = require('./Category');
const StatsEnginesGoogle = require('./StatsEnginesGoogle');
const StatsEnginesBing = require('./StatsEnginesBing');
const StatsEnginesYahoo = require('./StatsEnginesYahoo');
const Language = require('./Language');

const SiteSchema = new mongoose.Schema({
  url: String,
  name: String,
  countKeywordsTotal: Number,
  countActiveKeywords: Number,
  countMonitoredKeywords: Number,
  countPagesTotal: Number,
  countVisitors: Number,
  countryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  isDeleted: Boolean,
  isPaying: Boolean,
  maxPages: Number,
  maxKeywords: Number,
  isLinkExchangeEnabled: Boolean,
  isAutoAddingPages: Boolean,
  maxKeywordsPerPage: Number,
  statusCodes: String,
  aliasUrl: String,
  categoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  contacts: Array,
  googleEngineID: { type: mongoose.Schema.Types.ObjectId, ref: 'StatsEnginesGoogle' },
  bingEngineID: { type: mongoose.Schema.Types.ObjectId, ref: 'StatsEnginesBing' },
  yahooEngineID: { type: mongoose.Schema.Types.ObjectId, ref: 'StatsEnginesYahoo' },
  languageID: { type: mongoose.Schema.Types.ObjectId, ref: 'Language' },
  serverType: String,
  siteType: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Site', SiteSchema);