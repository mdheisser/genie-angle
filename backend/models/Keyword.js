const mongoose = require('mongoose');
const KeywordSchema = new mongoose.Schema({  
  text: { type: String, required: true, unique: true },
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
  lang: Array,
  siteID: { type: mongoose.Schema.Types.ObjectId, required: true }
});
module.exports = mongoose.model('Keyword', KeywordSchema);