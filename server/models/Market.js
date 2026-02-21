const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
  state: { type: String, required: true },
  date: { type: Date, required: true },
  medianListingPrice: { type: Number },
  medianRentalPrice: { type: Number },
  pricePerSqft: { type: Number },
  daysOnMarket: { type: Number },
  inventoryCount: { type: Number },
  pctHomesIncreasing: { type: Number },
  pctListingsWithPriceCut: { type: Number },
  priceToRentRatio: { type: Number },
  marketHealthScore: { type: Number },
}, { timestamps: true });

marketSchema.index({ state: 1, date: -1 });

module.exports = mongoose.model('Market', marketSchema);