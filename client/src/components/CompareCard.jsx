const CompareCard = ({ data, recommendation }) => {
  if (!data) return null;

  const fmt = (val) => val ? `$${Math.round(val).toLocaleString()}` : 'N/A';
  const recColor = { BUY: '#22c55e', WAIT: '#ef4444', NEUTRAL: '#f59e0b' };

  return (
    <div className="compare-card">
      <div className="compare-header">
        <h3>{data.state}</h3>
        {recommendation && (
          <div className="compare-badge" style={{ backgroundColor: recColor[recommendation.recommendation] }}>
            {recommendation.recommendation}
          </div>
        )}
      </div>

      <div className="compare-metrics">
        <div className="compare-metric">
          <span className="metric-label">Median Price</span>
          <span className="metric-value">{fmt(data.medianListingPrice)}</span>
        </div>
        <div className="compare-metric">
          <span className="metric-label">Price per sqft</span>
          <span className="metric-value">{fmt(data.pricePerSqft)}</span>
        </div>
        <div className="compare-metric">
          <span className="metric-label">1BR Price</span>
          <span className="metric-value">{fmt(data.medianListingPrice_1bed)}</span>
        </div>
        <div className="compare-metric">
          <span className="metric-label">2BR Price</span>
          <span className="metric-value">{fmt(data.medianListingPrice_2bed)}</span>
        </div>
        <div className="compare-metric">
          <span className="metric-label">3BR Price</span>
          <span className="metric-value">{fmt(data.medianListingPrice_3bed)}</span>
        </div>
        <div className="compare-metric">
          <span className="metric-label">Days on Market</span>
          <span className="metric-value">{data.daysOnMarket ? `${Math.round(data.daysOnMarket)} days` : 'N/A'}</span>
        </div>
        <div className="compare-metric">
          <span className="metric-label">Price Reductions</span>
          <span className="metric-value">{data.pctPriceReduction ? `${data.pctPriceReduction.toFixed(1)}%` : 'N/A'}</span>
        </div>
        <div className="compare-metric">
          <span className="metric-label">Inventory</span>
          <span className="metric-value">{data.inventoryCount ? Math.round(data.inventoryCount).toLocaleString() : 'N/A'}</span>
        </div>
        <div className="compare-metric">
          <span className="metric-label">Price-to-Rent Ratio</span>
          <span className="metric-value">{data.priceToRentRatio ? data.priceToRentRatio.toFixed(1) : 'N/A'}</span>
        </div>
      </div>

      {recommendation && (
        <div className="compare-reasons">
          <h4>Why {recommendation.recommendation}?</h4>
          <ul>
            {recommendation.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompareCard;