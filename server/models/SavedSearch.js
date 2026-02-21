const mongoose = require('mongoose');

const savedSearchSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  state: { type: String, required: true },
  propertyType: { type: String },
  budget: { type: Number },
  recommendation: { type: String },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('SavedSearch', savedSearchSchema);