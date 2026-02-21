import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrendChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  const formatted = data.map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    medianListingPrice: d.medianListingPrice ? Math.round(d.medianListingPrice) : null,
    pricePerSqft: d.pricePerSqft ? Math.round(d.pricePerSqft) : null,
  }));

  return (
    <div className="chart">
      <h2>Price Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} interval={11} />
          <YAxis tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
          <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
          <Legend />
          <Line type="monotone" dataKey="medianListingPrice" stroke="#1a1a2e" name="Median Price" dot={false} />
          <Line type="monotone" dataKey="pricePerSqft" stroke="#4f46e5" name="Price/sqft" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;