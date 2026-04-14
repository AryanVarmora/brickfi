import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing">

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-badge">Powered by Zillow Research Data</div>
          <h1>Make Smarter Real Estate Decisions</h1>
          <p>
            BrickFi analyzes real market data across all 50 states and 16,000+ cities
            to help you decide whether to buy, wait, or invest.
          </p>
          <div className="landing-cta">
            <Link to="/analyze" className="cta-primary">🔍 Analyze a Market</Link>
            <Link to="/search" className="cta-secondary">🏙️ Search by City</Link>
          </div>
        </div>
        <div className="landing-hero-stats">
          <div className="stat-card">
            <span className="stat-number">13,212</span>
            <span className="stat-label">Market Records</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">16,352</span>
            <span className="stat-label">Cities Covered</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">50</span>
            <span className="stat-label">States Analyzed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">22</span>
            <span className="stat-label">Market Metrics</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <h2>Everything You Need to Invest Smarter</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Market Analysis</h3>
            <p>Get real Zillow data for any state — median prices, price per sqft, inventory levels, and historical trends going back to 1996.</p>
            <Link to="/analyze" className="feature-link">Analyze Now →</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Property Search</h3>
            <p>Search by city, bedrooms, and property type. Compare your budget against real market prices and see if a property is fairly priced.</p>
            <Link to="/search" className="feature-link">Search Cities →</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚖️</div>
            <h3>Market Comparison</h3>
            <p>Compare two states side by side with detailed metrics and independent buy/wait recommendations for each market.</p>
            <Link to="/compare" className="feature-link">Compare Markets →</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Smart Recommendations</h3>
            <p>Our rule-based engine analyzes price cuts, days on market, and price-to-rent ratios to give you a clear buy or wait signal.</p>
            <Link to="/analyze" className="feature-link">Get Recommendation →</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Saved Searches</h3>
            <p>Create an account to save your market analyses and track multiple markets over time as you make your investment decisions.</p>
            <Link to="/register" className="feature-link">Create Account →</Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Price Trend Charts</h3>
            <p>Visualize historical price trends with interactive charts. See how markets have evolved over decades of real estate data.</p>
            <Link to="/analyze" className="feature-link">View Trends →</Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="landing-how">
        <h2>How BrickFi Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Select a Market</h3>
            <p>Choose any U.S. state or search by city to get started with your analysis.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Analyze the Data</h3>
            <p>BrickFi pulls real Zillow data — prices, trends, inventory, and rental metrics.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get a Recommendation</h3>
            <p>Receive a clear BUY, WAIT, or NEUTRAL signal with detailed explanations.</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Make Your Decision</h3>
            <p>Save your analysis and make a confident, data-driven investment decision.</p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="landing-tech">
        <h2>Built With Modern Technology</h2>
        <div className="tech-grid">
          <div className="tech-badge">React</div>
          <div className="tech-badge">Node.js</div>
          <div className="tech-badge">Express</div>
          <div className="tech-badge">MongoDB Atlas</div>
          <div className="tech-badge">Recharts</div>
          <div className="tech-badge">JWT Auth</div>
          <div className="tech-badge">Zillow Research Data</div>
          <div className="tech-badge">Vercel</div>
          <div className="tech-badge">Render</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta-section">
        <h2>Ready to Make Smarter Property Decisions?</h2>
        <p>Join BrickFi and start analyzing real estate markets with real data.</p>
        <div className="landing-cta">
          <Link to="/register" className="cta-primary">Get Started Free</Link>
          <Link to="/analyze" className="cta-secondary">Try Without Account</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span>🏠 BrickFi</span>
            <p>Real Estate Investment Analysis Platform</p>
          </div>
          <div className="footer-links">
            <Link to="/analyze">Market Analysis</Link>
            <Link to="/search">Property Search</Link>
            <Link to="/compare">Compare</Link>
            <Link to="/register">Register</Link>
          </div>
          <div className="footer-info">
            <p>Built by Aryan Varmora</p>
            <p>MSCS Capstone — Fordham University 2026</p>
            <a href="https://github.com/AryanVarmora/brickfi" target="_blank" rel="noreferrer">
              GitHub →
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Data sourced from Zillow Research. For educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;