const mongoose = require('mongoose');
const KeywordCategorySchema = new mongoose.Schema({  
  name: String,
  group: String
});
module.exports = mongoose.model('KeywordCategory', KeywordCategorySchema);