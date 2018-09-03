const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
  name: String,
  tempURL: String,
  echelon: Number,
  parentCategoryID: mongoose.Schema.Types.ObjectId,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Category', CategorySchema);