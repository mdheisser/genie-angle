const mongoose = require('mongoose');
const SiteSchema = new mongoose.Schema({
  name: String,
  active: Boolean,
  g: Number,
  y: Number,
  b: Number,
  date: Date,
  violations: Array,
  keywords: Array,
  pages: Number,
  sitemap: Number,
  health: Number
});
module.exports = mongoose.model('Site', SiteSchema);