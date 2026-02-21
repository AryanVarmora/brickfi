const express = require('express');
const router = express.Router();
const {
  getStates,
  getLatestByState,
  getTrendsByState,
  getRecommendation,
} = require('../controllers/marketController');

router.get('/states', getStates);
router.get('/:state/latest', getLatestByState);
router.get('/:state/trends', getTrendsByState);
router.post('/recommend', getRecommendation);

module.exports = router;