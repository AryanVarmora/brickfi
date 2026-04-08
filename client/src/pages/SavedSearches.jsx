import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSavedSearches, deleteSavedSearch } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SavedSearches = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searches, setSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    getSavedSearches(user.token)
      .then(setSearches)
      .finally(() => setLoading(false));
  }, [user]);

  const handleDelete = async (id) => {
    await deleteSavedSearch(id, user.token);
    setSearches(searches.filter(s => s._id !== id));
  };

  const recColor = { BUY: '#22c55e', WAIT: '#ef4444', NEUTRAL: '#f59e0b' };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="saved-page">
      <h2>Saved Searches</h2>
      {searches.length === 0 ? (
        <p className="empty">No saved searches yet. Analyze a market and save it!</p>
      ) : (
        <div className="saved-list">
          {searches.map((s) => (
            <div key={s._id} className="saved-card">
              <div className="saved-info">
                <h3>{s.state}</h3>
                {s.budget && <p>Budget: ${s.budget.toLocaleString()}</p>}
                <p>Saved: {new Date(s.createdAt).toLocaleDateString()}</p>
              </div>
              {s.recommendation && (
                <div className="saved-rec" style={{ backgroundColor: recColor[s.recommendation] }}>
                  {s.recommendation}
                </div>
              )}
              <button className="delete-btn" onClick={() => handleDelete(s._id)}>🗑️</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedSearches;