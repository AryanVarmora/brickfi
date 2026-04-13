const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  city: { type: String, required: true },
  county: { type: String },
  state: { type: String, required: true },
  date: { type: Date },
  medianPrice: { type: Number },
  price_1bed: { type: Number },
  price_2bed: { type: Number },
  price_3bed: { type: Number },
  price_4bed: { type: Number },
  pricePerSqft: { type: Number },
  pricePerSqft_1bed: { type: Number },
  pricePerSqft_2bed: { type: Number },
  pricePerSqft_3bed: { type: Number },
  pricePerSqft_sfr: { type: Number },
  pricePerSqft_condo: { type: Number },
  price_sfr: { type: Number },
  price_condo: { type: Number },
  inventory: { type: Number },
});

citySchema.index({ state: 1, city: 1 });

module.exports = mongoose.model('City', citySchema);