const mongoose = require('mongoose');
const KeywordSchema = new mongoose.Schema({  
  text: String,
  googleRanking: Number,
  yahooRanking: Number,
  bingRanking: Number,
  isDefault: Boolean,
  isPromoted: Boolean,
  isMonitored: Boolean,
  isForced: Boolean,
  significance: Number,
  suitability: Number,
  activePages: Number,
  isAssigned: Boolean,
  property: Array,
  lang: Array
});
module.exports = mongoose.model('Keyword', KeywordSchema);