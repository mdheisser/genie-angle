const mongoose = require('mongoose');
const KeywordSchema = new mongoose.Schema({  
  keyword: String,
  g: Number,
  y: Number,
  m: Number,
  category: {
    default: Boolean,
    promoted: Boolean,
    monitored: Boolean,
    forced: Boolean
  },
  significance: Number,
  suitability: Number,
  activepages: Number,
  forced_min: Number,
  forced_max: Number,
  assignedState: Boolean,
  auto_assign: Boolean
});
module.exports = mongoose.model('Keyword', KeywordSchema);