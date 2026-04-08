# 🏠 BrickFi

> **Real Estate Investment Analysis Platform**  
> *Making smarter property decisions through data-driven insights powered by Zillow Research Data*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v24+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248.svg)](https://www.mongodb.com/)

---

## 📖 About

**BrickFi** is a full-stack MERN web application that helps homebuyers and real estate investors make informed property decisions. Powered by **13,212 records of official Zillow Research Data**, BrickFi provides real market analysis, price trend visualizations, rental yield data, and rule-based buy/wait recommendations across all 50 U.S. states.

This project was developed as part of the **CISC-6597 MSCS Capstone** (Spring 2026) at Fordham University.

### ✨ Key Features

- 📊 **Market Analysis** - Real Zillow data for all 50 states — median prices, price/sqft, inventory
- 📈 **Price Trend Charts** - Historical price trends going back to 1996
- 🎯 **Buy/Wait Recommendation** - Rule-based engine using price cuts, days on market, and price-to-rent ratio
- ⚖️ **State Comparison** - Side-by-side analysis of two real estate markets
- 💾 **Saved Searches** - Authenticated users can save and revisit market analyses
- 👤 **User Authentication** - JWT-based register/login/logout

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
- **Zillow Research Dataset** (State_time_series.csv)
- 13,212 records, 22 metrics per record
- Coverage: All 50 U.S. states, 1996–2017

---

## 📁 Project Structure

```
brickfi/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── components/      # StateSelector, MarketDashboard, TrendChart, Recommendation, CompareCard
│       ├── pages/           # Home, Login, Register, SavedSearches, Compare
│       ├── services/        # api.js — all Axios calls
│       └── context/         # AuthContext — JWT state management
│
├── server/                  # Express backend
│   ├── controllers/         # marketController, authController, savedSearchController
│   ├── models/              # Market, User, SavedSearch schemas
│   ├── routes/              # marketRoutes, authRoutes, savedSearchRoutes
│   ├── middleware/          # authMiddleware (JWT protect)
│   └── index.js             # Entry point
│
└── data/
    ├── raw/zillow/          # Zillow Research CSVs
    └── scripts/             # process_zillow.py — data pipeline
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Python 3.x](https://www.python.org/) (for data pipeline)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/AryanVarmora/brickfi.git
cd brickfi
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

4. **Set up environment variables**

Create `server/.env`:
```env
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_here
```

### Running the Application

**Development mode:**
```bash
# Terminal 1 - Start backend server
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

---

## 📊 API Endpoints

### Markets
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/markets/states` | Get all available states |
| GET | `/api/markets/:state/latest` | Get latest market data for a state |
| GET | `/api/markets/:state/trends` | Get historical trend data |
| POST | `/api/markets/recommend` | Get buy/wait recommendation |

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
| **7-8** | Testing & Bug Fixes | 🔄 In Progress |
| **9-10** | Deployment (Render + Vercel) | 🔄 In Progress |

---

## 🎯 Roadmap

### Sprint 1-2 ✅
- [x] MERN project structure
- [x] MongoDB Atlas connection
- [x] Zillow data pipeline (13,212 records loaded)
- [x] Express API routes
- [x] React frontend with Recharts

### Sprint 3 ✅
- [x] JWT authentication
- [x] Register / Login / Logout
- [x] Protected routes

### Sprint 4 ✅
- [x] Save market analyses
- [x] View saved searches
- [x] Delete saved searches

### Sprint 5 ✅
- [x] Full UI overhaul
- [x] Hero section, polished cards
- [x] Responsive navbar

### Sprint 6 ✅
- [x] State comparison page
- [x] Side-by-side market metrics
- [x] Dual recommendations

### Sprint 7-8 🔄
- [ ] Unit testing
- [ ] Edge case handling
- [ ] Performance improvements

### Sprint 9-10 🔄
- [ ] Deploy backend to Render
- [ ] Deploy frontend to Vercel
- [ ] Demo Day preparation

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

## 📧 Contact

For questions or feedback about this project:
- Open an issue on GitHub
- Email: akv5@fordham.edu

---

<p align="center">Made with ❤️ as part of Fordham MSCS Capstone 2026</p>