import { useState, useEffect } from 'react';
import CompareCard from '../components/CompareCard';
import { getStates, getLatestByState, getRecommendation } from '../services/api';

const Compare = () => {
  const [states, setStates] = useState([]);
  const [stateA, setStateA] = useState('');
  const [stateB, setStateB] = useState('');
  const [dataA, setDataA] = useState(null);
  const [dataB, setDataB] = useState(null);
  const [recA, setRecA] = useState(null);
  const [recB, setRecB] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getStates().then(setStates);
  }, []);

  const handleCompare = async () => {
    if (!stateA || !stateB) { setError('Please select two states'); return; }
    if (stateA === stateB) { setError('Please select two different states'); return; }
    setError('');
    setLoading(true);
    try {
      const [latestA, latestB, recommendA, recommendB] = await Promise.all([
        getLatestByState(stateA),
        getLatestByState(stateB),
        getRecommendation(stateA, null),
        getRecommendation(stateB, null),
      ]);
      setDataA(latestA);
      setDataB(latestB);
      setRecA(recommendA);
      setRecB(recommendB);
    } catch (err) {
      setError('Failed to load comparison data');
    }
    setLoading(false);
  };

  return (
    <div className="compare-page">
      <div className="compare-hero">
        <h2>Compare Markets</h2>
        <p>Side-by-side analysis of two real estate markets</p>
      </div>

      <div className="compare-selector">
        <div className="selector-group">
          <label>First State</label>
          <select value={stateA} onChange={(e) => setStateA(e.target.value)}>
            <option value="">-- Select State --</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="vs-badge">VS</div>

        <div className="selector-group">
          <label>Second State</label>
          <select value={stateB} onChange={(e) => setStateB(e.target.value)}>
            <option value="">-- Select State --</option>
            {states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button onClick={handleCompare} disabled={!stateA || !stateB || loading}>
          {loading ? 'Comparing...' : '⚖️ Compare'}
        </button>
      </div>

      {error && <div className="auth-error">{error}</div>}

      {dataA && dataB && (
        <div className="compare-results">
          <CompareCard data={dataA} recommendation={recA} />
          <CompareCard data={dataB} recommendation={recB} />
        </div>
      )}
    </div>
  );
};

export default Compare;