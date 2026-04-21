import axios from 'axios';

const API_BASE = 'https://brickfi-api.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

export const getStates = async () => {
  const res = await api.get('/markets/states');
  return res.data.data;
};

export const getLatestByState = async (state) => {
  const res = await api.get(`/markets/${encodeURIComponent(state)}/latest`);
  return res.data.data;
};

export const getTrendsByState = async (state, limit = 60) => {
  const res = await api.get(`/markets/${encodeURIComponent(state)}/trends?limit=${limit}`);
  return res.data.data;
};

export const getRecommendation = async (state, budget) => {
  const res = await api.post('/markets/recommend', { state, budget });
  return res.data.data;
};

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

export const getCitiesByState = async (state) => {
  const res = await api.get(`/cities/${encodeURIComponent(state)}`);
  return res.data.data;
};

export const getCityData = async (state, city, bedrooms, propertyType) => {
  const res = await api.get(`/cities/${encodeURIComponent(state)}/${encodeURIComponent(city)}`, {
    params: { bedrooms, propertyType }
  });
  return res.data.data;
};
