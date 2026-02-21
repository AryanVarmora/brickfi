const Recommendation = ({ data }) => {
  if (!data) return null;

  const colors = { BUY: '#22c55e', WAIT: '#ef4444', NEUTRAL: '#f59e0b' };
  const color = colors[data.recommendation] || '#333';

  return (
    <div className="recommendation">
      <h2>Our Recommendation</h2>
      <div className="rec-badge" style={{ backgroundColor: color }}>
        {data.recommendation}
      </div>
      <ul className="reasons">
        {data.reasons.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendation;