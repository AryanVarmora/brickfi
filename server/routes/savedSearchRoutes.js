const express = require('express');
const router = express.Router();
const { saveSearch, getSavedSearches, deleteSavedSearch } = require('../controllers/savedSearchController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, saveSearch);
router.get('/', protect, getSavedSearches);
router.delete('/:id', protect, deleteSavedSearch);

module.exports = router;