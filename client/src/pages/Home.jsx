import { useState, useEffect } from 'react';
import StateSelector from '../components/StateSelector';
import MarketDashboard from '../components/MarketDashboard';
import TrendChart from '../components/TrendChart';
import Recommendation from '../components/Recommendation';
import { getStates, getLatestByState, getTrendsByState, getRecommendation } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { saveSearch } from '../services/api';
const Home = () => {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [budget, setBudget] = useState('');
  const [marketData, setMarketData] = useState(null);
  const [trendData, setTrendData] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
      if (!user) { alert('Please login to save searches'); return; }
  await saveSearch({
    state: selectedState,
    budget: budget ? parseInt(budget) : null,
    recommendation: recommendation?.recommendation,
    }, user.token);
    setSaved(true);
  };
  useEffect(() => {
    getStates().then(setStates);
  }, []);

  const handleAnalyze = async () => {
    if (!selectedState) return;
    setLoading(true);
    try {
      const [latest, trends, rec] = await Promise.all([
        getLatestByState(selectedState),
        getTrendsByState(selectedState),
        getRecommendation(selectedState, budget ? parseInt(budget) : null),
      ]);
      setMarketData(latest);
      setTrendData(trends);
      setRecommendation(rec);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="home">
      <div className="search-bar">
        <StateSelector states={states} selected={selectedState} onSelect={setSelectedState} />
        <input
          type="number"
          placeholder="Your budget (optional)"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="budget-input"
        />
        <button onClick={handleAnalyze} disabled={!selectedState || loading}>
          {loading ? 'Analyzing...' : 'Analyze Market'}
        </button>
        {recommendation && (
        <button onClick={handleSave} disabled={saved} style={{ background: saved ? '#22c55e' : '#4f46e5' }}>
          {saved ? '✅ Saved!' : '💾 Save Search'}
        </button>
)}
      </div>

      {marketData && (
        <>
          <MarketDashboard data={marketData} />
          <TrendChart data={trendData} />
          <Recommendation data={recommendation} />
        </>
      )}
    </div>
  );
};

export default Home;