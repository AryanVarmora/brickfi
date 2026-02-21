# 🏠 BrickFi

> **Real Estate Investment Analysis Platform**  
> *Making smarter property decisions through data-driven insights*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-47A248.svg)](https://www.mongodb.com/)

---

## 📖 About

**BrickFi** is a full-stack web application designed to help homebuyers and real estate investors make informed property decisions. By analyzing real estate market data, BrickFi provides price-per-square-foot comparisons, market trend visualizations, rental yield estimates, and buy/wait recommendations based on current market conditions.

This project was developed as part of the **CISC-6597 MSCS Capstone** (Spring 2026) at Fordham University.

### ✨ Key Features

- 🔍 **Property Search** - Filter by location, type, bedrooms, bathrooms, and square footage
- 📊 **Market Analysis** - Visualize price trends and comparable property statistics
- 💰 **Price Intelligence** - Calculate price per square foot and compare against neighborhood averages
- 📈 **Rental Estimates** - Estimate potential rental income for investment properties
- 🎯 **Smart Recommendations** - Receive data-driven buy/wait recommendations with explanations
- 👤 **User Accounts** - Save searches and track property analyses over time

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Chart.js / Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router** - Navigation

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

### Data
- **Kaggle Datasets** - Real estate market data
- **Demo Data** - Fallback synthetic dataset

---

## 📁 Project Structure
```
brickfi/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Page-level components
│       ├── services/       # API calls
│       ├── utils/          # Helper functions
│       └── styles/         # CSS files
│
├── server/                 # Express backend
│   └── src/
│       ├── controllers/    # Route handlers
│       ├── models/         # MongoDB schemas
│       ├── routes/         # API routes
│       ├── middleware/     # Custom middleware
│       ├── config/         # Configuration files
│       ├── utils/          # Helper functions
│       └── server.js       # Entry point
│
├── data/                   # Real estate datasets
├── docs/                   # Documentation
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (v4.4 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/brickfi.git
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
```bash
cd ../server
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/brickfi
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

### Running the Application

**Development mode** (recommended during development):
```bash
# Terminal 1 - Start backend server
cd server
npm run dev

# Terminal 2 - Start frontend
cd client
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

**Production build**:
```bash
# Build frontend
cd client
npm run build

# Start backend (serves frontend build)
cd ../server
npm start
```

---

## 📊 API Endpoints

### Properties
- `GET /api/properties` - Get all properties (with filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property (admin)
- `PUT /api/properties/:id` - Update property (admin)
- `DELETE /api/properties/:id` - Delete property (admin)

### Analysis
- `POST /api/analysis/price` - Get price per sqft analysis
- `POST /api/analysis/trends` - Get market trend data
- `POST /api/analysis/rental` - Get rental yield estimate
- `POST /api/analysis/recommendation` - Get buy/wait recommendation

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

---

## 🗓️ Development Timeline

| Sprint | Focus | Deliverables |
|--------|-------|--------------|
| **1-2** | Data Research & UI Design | Wireframes, data validation, project setup |
| **3-4** | Frontend Development | React components, search forms, basic UI |
| **5-6** | Backend & Database | Express APIs, MongoDB schemas, data models |
| **7-8** | Data Visualization | Chart integration, trend analysis display |
| **9** | Recommendation Logic | Buy/wait algorithm implementation |
| **10** | Polish & Testing | Bug fixes, UI improvements, demo preparation |

---

## 🎯 Roadmap

### Sprint 1-2 (Current)
- [x] Project proposal
- [x] GitHub repository setup
- [ ] Data research (Kaggle datasets)
- [ ] UI wireframes
- [ ] Database schema design

### Sprint 3-4
- [ ] React app scaffolding
- [ ] Component library
- [ ] Search form UI
- [ ] Results display

### Sprint 5-6
- [ ] Express server setup
- [ ] MongoDB connection
- [ ] Property model
- [ ] Analysis endpoints

### Sprint 7-8
- [ ] Chart.js integration
- [ ] Trend visualization
- [ ] Price comparison charts

### Sprint 9
- [ ] Recommendation algorithm
- [ ] Logic explanation system

### Sprint 10
- [ ] End-to-end testing
- [ ] UI/UX polish
- [ ] Demo preparation
- [ ] Documentation

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

**Aryan**  
MSCS Student - Fordham University  
CISC-6597 Capstone Project - Spring 2026

---

## 🙏 Acknowledgments

- **Professor Nikitas Kounavelis** - CISC-6597 Capstone Course
- **Fordham University** - MSCS Program
- **Kaggle** - Real estate datasets
- **MERN Stack Community** - Open-source tools and libraries

---

## 📧 Contact

For questions or feedback about this project:
- Open an issue on GitHub
- Email: [your-email@fordham.edu]

---

<p align="center">Made with ❤️ as part of Fordham MSCS Capstone 2026</p>
