const mongoose = require('mongoose');
const CountrySchema = new mongoose.Schema({
  name: String,
  code: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Country', CountrySchema);