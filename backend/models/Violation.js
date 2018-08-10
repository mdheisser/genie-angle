const mongoose = require('mongoose');
const ViolationSchema = new mongoose.Schema({
  status: Number,
  category: String,
  description: String,
  action: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Violation', ViolationSchema);