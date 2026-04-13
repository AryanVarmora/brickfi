// Convert "NewYork" → "New York"
export const formatStateName = (state) => {
  if (!state) return '';
  return state
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace('Districtof Columbia', 'District of Columbia')
    .replace('United States', 'United States');
};