const mongoose = require('mongoose');
const Site = require('./Site');
const Keyword = require('./Keyword');
const StatsPositionSchema = new mongoose.Schema({
  siteID: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
  keywordID: { type: mongoose.Schema.Types.ObjectId, ref: 'Keyword' },
  googlePosition: Number,
  yahooPosition: Number,
  bingPosition: Number,
  googleChange: Number,
  yahooChange: Number,
  bingChange: Number,
  googleTotalAmount: Number,
  yahooTotalAmount: Number,
  bingTotalAmount: Number,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('StatsPosition', StatsPositionSchema);