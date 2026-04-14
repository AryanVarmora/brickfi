import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SavedSearches from './pages/SavedSearches';
import Compare from './pages/Compare';
import PropertySearch from './pages/PropertySearch';
import './App.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <Link to="/">
        <h1>🏠 BrickFi</h1>
        <p>Real Estate Investment Analysis</p>
      </Link>
      <nav className="nav-links">
        <Link to="/analyze" className="nav-btn">📊 Analyze</Link>
        <Link to="/search" className="nav-btn">🔍 Property Search</Link>
        <Link to="/compare" className="nav-btn">⚖️ Compare</Link>
        {user ? (
          <>
            <span>Hi, {user.name}!</span>
            <Link to="/saved" className="nav-btn">Saved Searches</Link>
            <button onClick={handleLogout} className="nav-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/analyze" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/saved" element={<SavedSearches />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/search" element={<PropertySearch />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;