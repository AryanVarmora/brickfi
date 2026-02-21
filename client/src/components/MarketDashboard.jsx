const MarketDashboard = ({ data }) => {
  if (!data) return null;

  const fmt = (val) => val ? `$${Math.round(val).toLocaleString()}` : 'N/A';
  const fmtNum = (val) => val ? Math.round(val) : 'N/A';

  return (
    <div className="dashboard">
      <h2>Market Snapshot</h2>
      <div className="cards">
        <div className="card">
          <span className="label">Median Price</span>
          <span className="value">{fmt(data.medianListingPrice)}</span>
        </div>
        <div className="card">
          <span className="label">Price per sqft</span>
          <span className="value">{fmt(data.pricePerSqft)}</span>
        </div>
        <div className="card">
          <span className="label">Days on Market</span>
          <span className="value">{fmtNum(data.daysOnMarket)} days</span>
        </div>
        <div className="card">
          <span className="label">Price Reductions</span>
          <span className="value">{data.pctPriceReduction ? `${data.pctPriceReduction.toFixed(1)}%` : 'N/A'}</span>
        </div>
        <div className="card">
          <span className="label">Inventory</span>
          <span className="value">{fmtNum(data.inventoryCount)}</span>
        </div>
        <div className="card">
          <span className="label">Price-to-Rent Ratio</span>
          <span className="value">{data.priceToRentRatio ? data.priceToRentRatio.toFixed(1) : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;