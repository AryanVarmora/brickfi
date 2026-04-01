const SavedSearch = require('../models/SavedSearch');
const User = require('../models/User');

// POST /api/saved - Save a search
const saveSearch = async (req, res) => {
  try {
    const { state, propertyType, budget, recommendation, notes } = req.body;

    const saved = await SavedSearch.create({
      user: req.user.id,
      state,
      propertyType,
      budget,
      recommendation,
      notes,
    });

    // Add to user's savedSearches array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { savedSearches: saved._id }
    });

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/saved - Get all saved searches for logged in user
const getSavedSearches = async (req, res) => {
  try {
    const searches = await SavedSearch.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: searches.length, data: searches });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE /api/saved/:id - Delete a saved search
const deleteSavedSearch = async (req, res) => {
  try {
    const search = await SavedSearch.findById(req.params.id);

    if (!search) {
      return res.status(404).json({ success: false, error: 'Search not found' });
    }

    // Make sure user owns this search
    if (search.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'Not authorized' });
    }

    await search.deleteOne();
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { savedSearches: search._id }
    });

    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { saveSearch, getSavedSearches, deleteSavedSearch };