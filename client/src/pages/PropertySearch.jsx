import { useState, useEffect } from 'react';
import { getStates, getCitiesByState, getCityData, getRecommendation } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { saveSearch } from '../services/api';

const stateToCode = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
  'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
  'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
  'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
  'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
  'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
  'NewHampshire': 'NH', 'NewJersey': 'NJ', 'NewMexico': 'NM', 'NewYork': 'NY',
  'NorthCarolina': 'NC', 'NorthDakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
  'Oregon': 'OR', 'Pennsylvania': 'PA', 'RhodeIsland': 'RI', 'SouthCarolina': 'SC',
  'SouthDakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
  'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'WestVirginia': 'WV',
  'Wisconsin': 'WI', 'Wyoming': 'WY', 'DistrictofColumbia': 'DC',
  'UnitedStates': 'US'
};

const PropertySearch = () => {
  const { user } = useAuth();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [form, setForm] = useState({
    state: '', city: '', bedrooms: '', propertyType: '', budget: '', sqft: ''
  });
  const [result, setResult] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getStates().then(setStates);
  }, []);

  useEffect(() => {
    if (form.state) {
      setCities([]);
      setResult(null);
      setRecommendation(null);
      setForm(f => ({ ...f, city: '' }));
      setCitiesLoading(true);
      const stateCode = stateToCode[form.state] || form.state;
      getCitiesByState(stateCode)
        .then(setCities)
        .finally(() => setCitiesLoading(false));
    }
  }, [form.state]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
    setError('');
  };

  const handleSearch = async () => {
    if (!form.state || !form.city) {
      setError('Please select a state and city');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const stateCode = stateToCode[form.state] || form.state;
      const [cityData, rec] = await Promise.all([
        getCityData(stateCode, form.city, form.bedrooms, form.propertyType),
        getRecommendation(form.state, form.budget ? parseInt(form.budget) : null),
      ]);
      setResult(cityData);
      setRecommendation(rec);
    } catch (err) {
      setError('No data found for this city. Try another city.');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) { alert('Please login to save searches'); return; }
    await saveSearch({
      state: form.state,
      budget: form.budget ? parseInt(form.budget) : null,
      recommendation: recommendation?.recommendation,
      notes: `${form.city}, ${form.bedrooms ? form.bedrooms + 'BR' : 'Any BR'}, ${form.propertyType || 'Any type'}`,
    }, user.token);
    setSaved(true);
  };

  const fmt = (val) => val ? `$${Math.round(val).toLocaleString()}` : 'N/A';

  const getPriceLabel = () => {
    if (form.bedrooms === '1') return '1BR Median Price';
    if (form.bedrooms === '2') return '2BR Median Price';
    if (form.bedrooms === '3') return '3BR Median Price';
    if (form.bedrooms === '4') return '4BR Median Price';
    if (form.propertyType === 'sfr') return 'SFR Median Price';
    if (form.propertyType === 'condo') return 'Condo Median Price';
    return 'Median Price';
  };

  const recColor = { BUY: '#22c55e', WAIT: '#ef4444', NEUTRAL: '#f59e0b' };

  const budgetAnalysis = result && form.budget ? {
    budget: parseInt(form.budget),
    marketPrice: result.targetPrice,
    difference: parseInt(form.budget) - result.targetPrice,
    affordable: parseInt(form.budget) >= result.targetPrice,
    pricePerSqftInput: form.sqft && form.budget
      ? (parseInt(form.budget) / parseInt(form.sqft)).toFixed(0)
      : null,
  } : null;

  return (
    <div className="property-page">
      <div className="compare-hero">
        <h2>🔍 Property Search</h2>
        <p>Find city-level market data and analyze if a property is fairly priced</p>
      </div>

      <div className="property-form">
        <div className="form-grid">

          {/* State */}
          <div className="form-group">
            <label>State *</label>
            <select name="state" value={form.state} onChange={handleChange}>
              <option value="">-- Select State --</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* City */}
          <div className="form-group">
            <label>City *</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              disabled={!form.state || citiesLoading}
            >
              <option value="">
                {citiesLoading ? 'Loading cities...' : '-- Select City --'}
              </option>
              {cities.map(c => (
                <option key={`${c.city}-${c.county}`} value={c.city}>
                  {c.city} ({c.county})
                </option>
              ))}
            </select>
            {form.state && !citiesLoading && cities.length === 0 && (
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>
                No city data available — try the Market Analysis page instead
              </p>
            )}
            {form.state && !citiesLoading && cities.length > 0 && (
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '4px' }}>
                {cities.length} cities available
              </p>
            )}
          </div>

          {/* Bedrooms */}
          <div className="form-group">
            <label>Bedrooms</label>
            <select name="bedrooms" value={form.bedrooms} onChange={handleChange}>
              <option value="">Any</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
            </select>
          </div>

          {/* Property Type */}
          <div className="form-group">
            <label>Property Type</label>
            <select name="propertyType" value={form.propertyType} onChange={handleChange}>
              <option value="">Any</option>
              <option value="sfr">Single Family</option>
              <option value="condo">Condo/Co-op</option>
            </select>
          </div>

          {/* Budget */}
          <div className="form-group">
            <label>Your Budget ($)</label>
            <input
              type="number"
              name="budget"
              placeholder="e.g. 350000"
              value={form.budget}
              onChange={handleChange}
            />
          </div>

          {/* Sqft */}
          <div className="form-group">
            <label>Property Sqft (optional)</label>
            <input
              type="number"
              name="sqft"
              placeholder="e.g. 1500"
              value={form.sqft}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <div className="form-actions">
          <button
            onClick={handleSearch}
            disabled={!form.state || !form.city || loading}
          >
            {loading ? 'Analyzing...' : '🔍 Analyze Property'}
          </button>
          {recommendation && (
            <button onClick={handleSave} disabled={saved} className="save-btn">
              {saved ? '✅ Saved!' : '💾 Save Search'}
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="property-results">

          {/* Market Snapshot */}
          <div className="dashboard">
            <h2>📍 {result.city}, {result.state} — Market Data</h2>
            <div className="cards">
              <div className="card">
                <span className="label">{getPriceLabel()}</span>
                <span className="value">{fmt(result.targetPrice)}</span>
              </div>
              <div className="card">
                <span className="label">Price per Sqft</span>
                <span className="value">{fmt(result.targetPricePerSqft)}</span>
              </div>
              <div className="card">
                <span className="label">1BR Price</span>
                <span className="value">{fmt(result.price_1bed)}</span>
              </div>
              <div className="card">
                <span className="label">2BR Price</span>
                <span className="value">{fmt(result.price_2bed)}</span>
              </div>
              <div className="card">
                <span className="label">3BR Price</span>
                <span className="value">{fmt(result.price_3bed)}</span>
              </div>
              <div className="card">
                <span className="label">Inventory</span>
                <span className="value">
                  {result.inventory ? Math.round(result.inventory).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Budget Analysis */}
          {budgetAnalysis && (
            <div className="dashboard">
              <h2>💰 Budget Analysis</h2>
              <div className="cards">
                <div className="card">
                  <span className="label">Your Budget</span>
                  <span className="value">{fmt(budgetAnalysis.budget)}</span>
                </div>
                <div className="card">
                  <span className="label">Market Price</span>
                  <span className="value">{fmt(budgetAnalysis.marketPrice)}</span>
                </div>
                <div className="card">
                  <span className="label">Difference</span>
                  <span className="value" style={{ color: budgetAnalysis.affordable ? '#22c55e' : '#ef4444' }}>
                    {budgetAnalysis.affordable ? '+' : ''}{fmt(budgetAnalysis.difference)}
                  </span>
                </div>
                {budgetAnalysis.pricePerSqftInput && (
                  <div className="card">
                    <span className="label">Your Price/Sqft</span>
                    <span className="value">${budgetAnalysis.pricePerSqftInput}</span>
                  </div>
                )}
                {result.targetPricePerSqft && budgetAnalysis.pricePerSqftInput && (
                  <div className="card">
                    <span className="label">Market Price/Sqft</span>
                    <span className="value">{fmt(result.targetPricePerSqft)}</span>
                  </div>
                )}
                <div className="card">
                  <span className="label">Affordability</span>
                  <span className="value" style={{ color: budgetAnalysis.affordable ? '#22c55e' : '#ef4444' }}>
                    {budgetAnalysis.affordable ? '✅ Within Budget' : '❌ Over Budget'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Recommendation */}
          {recommendation && (
            <div className="recommendation">
              <h2>Our Recommendation for {form.state.replace(/([A-Z])/g, ' $1').trim()}</h2>
              <div className="rec-badge" style={{ backgroundColor: recColor[recommendation.recommendation] }}>
                {recommendation.recommendation}
              </div>
              <ul className="reasons">
                {recommendation.reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default PropertySearch;