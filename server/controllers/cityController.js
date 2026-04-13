
const City = require('../models/City');

// GET /api/cities/:state - Get all cities for a state
const getCitiesByState = async (req, res) => {
  try {
    const { state } = req.params;
    const cities = await City.find(
      { state, medianPrice: { $ne: null } },
      { _id: 0, city: 1, county: 1, state: 1 }
    ).sort({ city: 1 });

    res.json({ success: true, count: cities.length, data: cities });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/cities/:state/:city - Get data for a specific city
const getCityData = async (req, res) => {
  try {
    const { state, city } = req.params;
    const { bedrooms, propertyType } = req.query;

    const data = await City.findOne(
      { state, city: { $regex: new RegExp(`^${city}$`, 'i') } },
      { _id: 0 }
    );

    if (!data) {
      return res.status(404).json({ success: false, error: 'City not found' });
    }

    // Pick the right price based on bedrooms and property type
    let targetPrice = data.medianPrice;
    let targetPricePerSqft = data.pricePerSqft;

    if (bedrooms === '1') { targetPrice = data.price_1bed; targetPricePerSqft = data.pricePerSqft_1bed; }
    else if (bedrooms === '2') { targetPrice = data.price_2bed; targetPricePerSqft = data.pricePerSqft_2bed; }
    else if (bedrooms === '3') { targetPrice = data.price_3bed; targetPricePerSqft = data.pricePerSqft_3bed; }
    else if (bedrooms === '4') { targetPrice = data.price_4bed; }

    if (propertyType === 'sfr') { targetPrice = data.price_sfr; targetPricePerSqft = data.pricePerSqft_sfr; }
    else if (propertyType === 'condo') { targetPrice = data.price_condo; targetPricePerSqft = data.pricePerSqft_condo; }

    res.json({
      success: true,
      data: {
        ...data.toObject(),
        targetPrice,
        targetPricePerSqft,
        selectedBedrooms: bedrooms || 'all',
        selectedPropertyType: propertyType || 'all',
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getCitiesByState, getCityData };