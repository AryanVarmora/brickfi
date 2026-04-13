const express = require('express');
const router = express.Router();
const { getCitiesByState, getCityData } = require('../controllers/cityController');

router.get('/:state', getCitiesByState);
router.get('/:state/:city', getCityData);

module.exports = router;