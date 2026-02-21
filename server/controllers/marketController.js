const Market = require('../models/Market');

// GET /api/markets/states - Get list of all available states
const getStates = async (req, res) => {
  try {
    const states = await Market.distinct('state');
    res.json({ success: true, data: states.sort() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/markets/:state/latest - Get latest data for a state
const getLatestByState = async (req, res) => {
  try {
    const { state } = req.params;
    const data = await Market.findOne(
      { state, medianListingPrice: { $ne: null } },
      { _id: 0 }
    ).sort({ date: -1 });

    if (!data) {
      return res.status(404).json({ success: false, error: 'State not found' });
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/markets/:state/trends - Get historical trend data for a state
const getTrendsByState = async (req, res) => {
  try {
    const { state } = req.params;
    const { limit = 60 } = req.query; // default last 60 months

    const data = await Market.find(
      { state, medianListingPrice: { $ne: null } },
      { _id: 0, date: 1, medianListingPrice: 1, pricePerSqft: 1, rentalPricePerSqft: 1, daysOnMarket: 1, priceToRentRatio: 1 }
    )
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json({ success: true, count: data.length, data: data.reverse() });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/markets/recommend - Buy/wait recommendation
const getRecommendation = async (req, res) => {
  try {
    const { state, budget } = req.body;

    const market = await Market.findOne(
      { state, medianListingPrice: { $ne: null } },
      { _id: 0 }
    ).sort({ date: -1 });

    if (!market) {
      return res.status(404).json({ success: false, error: 'No data for this state' });
    }

    // Simple rule-based recommendation logic
    let score = 0;
    let reasons = [];

    // Rule 1: Price reduction trend (higher % = buyer's market)
    if (market.pctPriceReduction > 5) {
      score += 1;
      reasons.push('Many sellers are cutting prices — good for buyers');
    } else {
      score -= 1;
      reasons.push('Few price reductions — competitive market');
    }

    // Rule 2: Days on market (higher = less competition)
    if (market.daysOnMarket > 30) {
      score += 1;
      reasons.push('Homes are sitting longer — less competition');
    } else {
      score -= 1;
      reasons.push('Homes selling fast — high competition');
    }

    // Rule 3: Price to rent ratio (lower = better to buy)
    if (market.priceToRentRatio && market.priceToRentRatio < 20) {
      score += 1;
      reasons.push('Price-to-rent ratio favors buying over renting');
    } else if (market.priceToRentRatio && market.priceToRentRatio > 25) {
      score -= 1;
      reasons.push('Price-to-rent ratio suggests renting may be better');
    }

    // Rule 4: Budget check
    if (budget && market.medianListingPrice) {
      if (budget >= market.medianListingPrice) {
        score += 1;
        reasons.push(`Your budget ($${budget.toLocaleString()}) meets the median price`);
      } else {
        score -= 1;
        reasons.push(`Median price ($${market.medianListingPrice.toLocaleString()}) exceeds your budget`);
      }
    }

    const recommendation = score >= 1 ? 'BUY' : score === 0 ? 'NEUTRAL' : 'WAIT';

    res.json({
      success: true,
      data: {
        state,
        recommendation,
        score,
        reasons,
        marketSnapshot: {
          medianListingPrice: market.medianListingPrice,
          pricePerSqft: market.pricePerSqft,
          daysOnMarket: market.daysOnMarket,
          pctPriceReduction: market.pctPriceReduction,
          priceToRentRatio: market.priceToRentRatio,
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getStates, getLatestByState, getTrendsByState, getRecommendation };