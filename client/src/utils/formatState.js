// Convert "NewYork" → "New York"
export const formatStateName = (state) => {
  if (!state) return '';
  // Add space before capital letters that follow lowercase letters
  return state
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace('Districtof Columbia', 'District of Columbia')
    .trim();
};
// v2
