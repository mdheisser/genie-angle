const mongoose = require('mongoose');
const Keyword = require('./Keyword');
const Violation = require('./Violation');
const PageSchema = new mongoose.Schema({
  pageUrl: String,
  isDefault: Boolean,
  isPromoted: Boolean,
  isMonitored: Boolean,
  isForced: Boolean,
  isAutoKeywords: Boolean,
  violationState: Number,
  violations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Violation' }],
  significance: Number,
  suitability: Number,
  ranking: Number,
  title: String,
  description: String,
  siteID: mongoose.Schema.Types.ObjectId,
  autoKeywordIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keyword' }],
  manualKeywordIDs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Keyword' }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Page', PageSchema);