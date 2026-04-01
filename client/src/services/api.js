import axios from 'axios';

const API_BASE = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Get all states
export const getStates = async () => {
  const res = await api.get('/markets/states');
  return res.data.data;
};

// Get latest market data for a state
export const getLatestByState = async (state) => {
  const res = await api.get(`/markets/${encodeURIComponent(state)}/latest`);
  return res.data.data;
};

// Get trend data for a state
export const getTrendsByState = async (state, limit = 60) => {
  const res = await api.get(`/markets/${encodeURIComponent(state)}/trends?limit=${limit}`);
  return res.data.data;
};

// Get buy/wait recommendation
export const getRecommendation = async (state, budget) => {
  const res = await api.post('/markets/recommend', { state, budget });
  return res.data.data;
};
// Saved Searches
export const saveSearch = async (data, token) => {
  const res = await api.post('/saved', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};

export const getSavedSearches = async (token) => {
  const res = await api.get('/saved', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.data;
};

export const deleteSavedSearch = async (id, token) => {
  const res = await api.delete(`/saved/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};  