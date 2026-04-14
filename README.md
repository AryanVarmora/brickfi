# 🏠 BrickFi

> **Real Estate Investment Analysis Platform**  
> *Making smarter property decisions through data-driven insights powered by Zillow Research Data*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v24+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/)

🌐 **Live Demo:** [https://brickfi-five.vercel.app](https://brickfi-five.vercel.app)  
🔧 **API:** [https://brickfi-api.onrender.com](https://brickfi-api.onrender.com)

---

## 📖 About

**BrickFi** is a full-stack MERN web application that helps homebuyers and real estate investors make informed property decisions. Powered by **13,212 records of official Zillow Research Data**, BrickFi provides real market analysis, price trend visualizations, rental yield calculations, and rule-based buy/wait recommendations across all 50 U.S. states and 16,352 cities.

This project was developed as part of the **CISC-6597 MSCS Capstone** (Spring 2026) at Fordham University.

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 📊 **Market Analysis** | Real Zillow data for all 50 states — median prices, price/sqft, inventory |
| 📈 **Price Trend Charts** | Historical price trends going back to 1996 |
| 🎯 **Buy/Wait Recommendation** | Rule-based engine using price cuts, days on market, and price-to-rent ratio |
| ⚖️ **State Comparison** | Side-by-side analysis of two real estate markets |
| 🔍 **Property Search** | City-level search across 16,352 U.S. cities with budget analysis |
| 💰 **Rental Yield Calculator** | Full investment analysis — cap rate, cash-on-cash return, monthly cash flow |
| 💾 **Saved Searches** | Authenticated users can save and revisit market analyses |
| 👤 **User Authentication** | JWT-based register/login/logout |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** (Vite) - UI framework
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router v6** - Navigation

### Backend
- **Node.js + Express** - Runtime and web framework
- **MongoDB Atlas + Mongoose** - Database and ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

### Data
- **Zillow Research Dataset** (State_time_series.csv + City_time_series.csv)
- 13,212 state-level records, 22 metrics per record
- 16,352 city-level records across all 50 states
- Coverage: 1996–2017

### Deployment
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 📁 Project Structure

```
brickfi/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── components/      # StateSelector, MarketDashboard, TrendChart, Recommendation, CompareCard
│       ├── pages/           # Landing, Home, Login, Register, SavedSearches, Compare, PropertySearch, RentalCalculator
│       ├── services/        # api.js — all Axios calls
│       ├── utils/           # formatState.js
│       └── context/         # AuthContext — JWT state management
│
├── server/                  # Express backend
│   ├── controllers/         # marketController, authController, savedSearchController, cityController
│   ├── models/              # Market, User, SavedSearch, City schemas
│   ├── routes/              # marketRoutes, authRoutes, savedSearchRoutes, cityRoutes
│   ├── middleware/          # authMiddleware (JWT protect)
│   └── index.js             # Entry point
│
└── data/
    ├── raw/zillow/          # Zillow Research CSVs
    └── scripts/             # process_zillow.py, process_cities.py — data pipelines
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.x (for data pipeline)
- MongoDB Atlas account

### Installation

```bash
# Clone the repo
git clone https://github.com/AryanVarmora/brickfi.git
cd brickfi

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Setup

Create `server/.env`:
```env
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_here
```

Create `client/.env`:
```env
VITE_API_URL=https://brickfi-api.onrender.com/api
```

### Running Locally

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000

---

## 📊 API Endpoints

### Markets
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/markets/states` | Get all available states |
| GET | `/api/markets/:state/latest` | Get latest market data for a state |
| GET | `/api/markets/:state/trends` | Get historical trend data |
| POST | `/api/markets/recommend` | Get buy/wait recommendation |

### Cities
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cities/:state` | Get all cities for a state |
| GET | `/api/cities/:state/:city` | Get city-level market data |

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user (protected) |

### Saved Searches
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/saved` | Get user's saved searches (protected) |
| POST | `/api/saved` | Save a search (protected) |
| DELETE | `/api/saved/:id` | Delete a saved search (protected) |

---

## 🗓️ Development Timeline

| Sprint | Focus | Status |
|--------|-------|--------|
| **1-2** | MERN setup, Zillow data pipeline, MongoDB Atlas | ✅ Done |
| **3** | JWT Authentication (register/login/logout) | ✅ Done |
| **4** | Saved Searches | ✅ Done |
| **5** | UI Polish | ✅ Done |
| **6** | State Comparison Feature | ✅ Done |
| **7** | City-level Property Search (16,352 cities) | ✅ Done |
| **8** | Rental Yield Calculator | ✅ Done |
| **9-10** | Deployment (Render + Vercel) | ✅ Done |

---

## 🎯 Recommendation Algorithm

BrickFi uses a rule-based scoring system to generate buy/wait recommendations:

- **Price Reductions** — If >5% of listings have price cuts → buyer's market (+1)
- **Days on Market** — If homes sit >30 days → less competition (+1)
- **Price-to-Rent Ratio** — If ratio <20 → buying favored over renting (+1)
- **Budget Check** — If user budget meets median price (+1)

Score ≥ 1 → **BUY** | Score = 0 → **NEUTRAL** | Score < 0 → **WAIT**

---

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

---

## 📝 Contributing

This is a capstone project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Aryan Varmora**  
MSCS Student — Fordham University  
CISC-6597 Capstone Project — Spring 2026  
GitHub: [@AryanVarmora](https://github.com/AryanVarmora)

---

## 🙏 Acknowledgments

- **Zillow Research** — Open real estate datasets
- **Fordham University** — MSCS Program
- **Professor** — CISC-6597 Capstone Course
- **MERN Stack Community** — Open-source tools and libraries

---

<p align="center">Made with ❤️ as part of Fordham MSCS Capstone 2026</p>