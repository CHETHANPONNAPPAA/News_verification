# TruthChain — Blockchain-Powered Decentralized News & Fact-Verification Protocol

TruthChain is a full-stack decentralized platform for news publication, AI-assisted fact verification, validator review, and blockchain-backed integrity.

> **Project status:** The current repository contains the initial implementation scaffold. Authentication/UI and core service structure are established; AI training, blockchain integration, IPFS storage, validator consensus, analytics, and production hardening remain implementation stages.

## Key Features

- 📰 Decentralized news publishing
- 🤖 AI-assisted fake/real news classification
- ⛓️ Blockchain-backed verification records
- 👥 Validator-based review and voting
- 🌐 IPFS-based decentralized content storage
- 🦊 MetaMask wallet integration
- 📊 Analytics dashboard with Recharts
- 📄 PDF and CSV reports
- 🔐 JWT authentication with bcrypt password hashing
- 👤 User and validator roles
- 🎨 Modern React + Vite + Tailwind UI

## System Architecture

```text
React + Vite + Tailwind
          │
       Axios/API
          │
Node.js + Express ─────── MongoDB
          │
          └──────────── Python Flask
                         │
                   TF-IDF + ML Model

News Content ─── IPFS
     │
     └────────── Ethereum/Hardhat
                       │
                    MetaMask
```

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router |
| HTTP | Axios |
| UI | React Icons, Framer Motion |
| Notifications | React Hot Toast |
| Charts | Recharts |
| Blockchain Client | ethers.js |
| Wallet | MetaMask |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcryptjs |
| AI Service | Python + Flask |
| ML | scikit-learn |
| Data Processing | pandas + NumPy |
| Blockchain | Solidity + Hardhat |
| Storage | IPFS |
| Reports | PDFKit + JSON2CSV |

## Project Structure

```text
news-verification-project/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Sidebar.jsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PublishNews.jsx
│   │   │   ├── VerifyNews.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Reports.jsx
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── News.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── news.js
│   │   └── reports.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── .env
│
├── ai-model/
│   ├── dataset/
│   ├── models/
│   ├── train.py
│   └── app.py
│
├── blockchain/
│   ├── contracts/
│   │   └── NewsVerification.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   └── hardhat.config.js
│
├── README.md
└── .gitignore
```

## Prerequisites

Install:

- Node.js 20 LTS
- npm
- Python 3.9+
- MongoDB
- Git
- MetaMask
- PyCharm, VS Code, or another code editor

Check installations:

```bash
node --version
npm --version
python --version
git --version
```

## 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd news-verification-project
```

## 2. Frontend Setup

```bash
cd frontend
npm install
npm install react-router-dom axios ethers react-icons framer-motion react-hot-toast react-spinners recharts
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

Vite normally runs at:

```text
http://localhost:5173
```

## 3. Backend Setup

```bash
cd backend
npm install
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer pdfkit json2csv
```

Create `backend/.env`:

```env
MONGO_URI=mongodb://127.0.0.1:27017/newsdb
JWT_SECRET=replace_with_a_secure_secret
AI_SERVICE_URL=http://127.0.0.1:5001
```

Start the server:

```bash
node server.js
```

Backend:

```text
http://localhost:5000
```

Make sure the backend mounts the authentication and other API routers before testing frontend requests.

## 4. MongoDB

Start MongoDB locally. The default database is:

```text
newsdb
```

Main data collections include:

```text
users
news
```

Example user fields:

```text
username
email
password
role
reputation
```

Example news fields:

```text
title
description
aiScore
status
blockchainHash
createdAt
```

## 5. AI Model

Create a Python environment:

### Windows

```bash
cd ai-model
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install flask pandas numpy scikit-learn matplotlib
```

Recommended pipeline:

```text
Dataset
   ↓
Cleaning
   ↓
Train/Test Split
   ↓
TF-IDF
   ↓
ML Classifier
   ↓
Evaluation
   ↓
Save Model + Vectorizer
   ↓
Flask Prediction API
```

Start the AI service:

```bash
python app.py
```

Expected endpoint:

```text
http://localhost:5001
```

Example request:

```json
{
  "text": "Example news article text..."
}
```

Example response:

```json
{
  "prediction": "Fake",
  "score": 0.92
}
```

> The placeholder prediction endpoint must be replaced by a trained model before claiming that the AI module is fully implemented.

## 6. Dataset

The initial implementation can use the **ISOT Fake News Dataset**, which contains separate fake and real news CSV files and fields such as title, article text, subject, and date.

Dataset:

https://www.kaggle.com/datasets/clmentbisaillon/fake-and-real-news-dataset

Typical files:

```text
Fake.csv
True.csv
```

Recommended preprocessing:

```text
Title + Text
      ↓
Normalize text
      ↓
TF-IDF
      ↓
Classifier
```

Avoid committing a complete dataset to GitHub when its license, size, or redistribution terms do not permit it.

## 7. Blockchain Setup

```bash
cd blockchain
npm install
```

If initializing from scratch:

```bash
npm init -y
npm install --save-dev hardhat
```

Start a local blockchain:

```bash
npx hardhat node
```

Typical RPC endpoint:

```text
http://127.0.0.1:8545
```

## 8. Smart Contract

The prototype contract stores a title, hash/reference, and verification state:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NewsVerification {
    struct News {
        string title;
        string hashValue;
        bool verified;
    }

    News[] public newsList;

    function publishNews(
        string memory _title,
        string memory _hash
    ) public {
        newsList.push(News(_title, _hash, false));
    }

    function verifyNews(uint index) public {
        newsList[index].verified = true;
    }
}
```

For the complete version, add validator authorization, voting thresholds, events, access control, duplicate handling, and deployment configuration.

Deploy:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Save the resulting contract address and ABI for application integration.

## 9. MetaMask

For local Hardhat development:

```text
Network: Localhost
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency: ETH
```

Import a development account generated by Hardhat.

> Never use a Hardhat development/private key as a real production wallet.

## 10. IPFS Workflow

The intended flow is:

```text
Article submitted
      ↓
Backend validation
      ↓
Upload content/metadata to IPFS
      ↓
Receive CID
      ↓
Store CID/hash on blockchain
      ↓
Use MongoDB for application metadata
```

This keeps large content outside the blockchain while retaining an immutable reference.

## Authentication Flow

```text
Register
   ↓
bcrypt password hash
   ↓
MongoDB
   ↓
Login
   ↓
JWT
   ↓
Protected API requests
```

Roles:

```text
user
validator
```

Server-side role authorization should be enforced rather than relying only on frontend controls.

## News Verification Flow

```text
Publish News
     ↓
MongoDB
     ↓
AI Prediction
     ↓
AI Score
     ↓
Validator Review
     ↓
Validator Voting
     ↓
Consensus State
     ↓
Blockchain Record
```

## API Overview

### Authentication

```http
POST /api/register
POST /api/login
```

### News

```http
POST /api/news
GET  /api/news
GET  /api/news/:id
```

### Verification

```http
POST /api/verify/:id
POST /api/vote/:id
```

### Reports

```http
GET /api/reports/pdf
GET /api/reports/csv
```

### AI

```http
POST http://localhost:5001/predict
```

The final endpoint set may expand during implementation.

## Dashboard

The dashboard is intended to show:

- Total news
- Verified news
- Fake/suspicious news
- Pending verification
- AI confidence
- Validator activity
- Verification trends
- Recent submissions

Charts can be implemented with Recharts.

## Reports

### PDF

Generated using PDFKit and can contain:

- Article title
- Verification status
- AI score
- Blockchain hash
- Creation date

### CSV

Generated using JSON2CSV for analysis and administrative reporting.

## UI

The interface uses a dark Web3-inspired style:

- Dark backgrounds
- Blue/purple gradients
- Glassmorphism
- Rounded cards
- Responsive layouts
- Sidebar navigation
- Smooth transitions
- Toast notifications
- Data visualization

Main pages:

```text
Login
Register
Dashboard
Publish News
Verify News
Analytics
Reports
```

## Testing

### Frontend

Test registration, login, routing, forms, dashboard navigation, wallet connection, and API responses.

### Backend

Test MongoDB connectivity, authentication, JWT validation, news operations, AI communication, and report generation.

### AI

Evaluate:

- Accuracy
- Precision
- Recall
- F1-score
- Confusion matrix
- Prediction API

### Blockchain

Test:

- Contract deployment
- News publication
- Verification transactions
- Events
- Validator permissions

## Security

Before production:

- Never commit `.env` files.
- Use strong JWT secrets.
- Hash passwords with bcrypt.
- Validate API input.
- Enforce JWT middleware.
- Enforce server-side role authorization.
- Validate uploads.
- Configure CORS appropriately.
- Protect private keys.
- Store API keys in environment variables.
- Add rate limiting.
- Avoid exposing sensitive server errors.

Recommended `.gitignore`:

```gitignore
node_modules/
venv/
.env
__pycache__/
*.pyc
dist/
build/
coverage/
artifacts/
cache/
```

## Development Roadmap

### Phase 1 — Foundation
- [x] React + Vite
- [x] Tailwind CSS
- [x] Routing
- [x] Login UI
- [x] Registration UI
- [x] Dashboard UI
- [x] Express backend setup
- [x] MongoDB models

### Phase 2 — Authentication
- [x] Password hashing
- [x] JWT generation
- [ ] JWT middleware
- [ ] Protected routes
- [ ] Role-based authorization

### Phase 3 — AI
- [ ] Dataset preprocessing
- [ ] TF-IDF vectorization
- [ ] Model training
- [ ] Evaluation
- [ ] Model serialization
- [ ] Flask inference API
- [ ] Backend ↔ AI integration

### Phase 4 — Blockchain
- [x] Solidity prototype
- [ ] Validator access control
- [ ] Voting mechanism
- [ ] Events
- [ ] Hardhat deployment
- [ ] ethers.js integration
- [ ] MetaMask integration

### Phase 5 — Decentralization
- [ ] IPFS integration
- [ ] CID storage
- [ ] Blockchain/IPFS linking
- [ ] Content integrity verification

### Phase 6 — Analytics & Reports
- [ ] Dynamic dashboard statistics
- [ ] Recharts analytics
- [ ] PDF reports
- [ ] CSV reports
- [ ] Verification history

### Phase 7 — Finalization
- [ ] Error handling
- [ ] Loading states
- [ ] Toast notifications
- [ ] Security review
- [ ] Testing
- [ ] Deployment
- [ ] Documentation

## Development Commands

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
node server.js
```

### AI

```bash
cd ai-model
venv\Scripts\activate
python app.py
```

### Blockchain

Terminal 1:

```bash
cd blockchain
npx hardhat node
```

Terminal 2:

```bash
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```

## Current Implementation Notes

The architecture is broader than the currently completed scaffold. Before calling the project production-ready, complete:

1. Real AI training and Flask inference.
2. Backend API router mounting.
3. Dynamic MongoDB dashboard statistics.
4. Blockchain deployment and frontend integration.
5. MetaMask transaction handling.
6. IPFS upload and CID handling.
7. Validator voting/consensus.
8. Protected routes and server-side authorization.
9. Production environment variables and deployment configuration.
10. Testing and security hardening.

## Project Objective

TruthChain demonstrates how machine learning, blockchain, decentralized storage, and full-stack development can be combined into a transparent news-verification workflow.

```text
AI          → assists with content classification
Validators  → provide human verification
IPFS        → stores decentralized content/reference data
Blockchain  → records integrity/verification state
MongoDB     → stores application/operational data
React       → provides the user interface
```

AI predictions are signals for verification, not independent proof that a news item is true or false.

## License

Add the project's chosen license before public distribution.

Example:

```text
MIT License
```

## Author

**Chethan Ponnappa A**

BE — Artificial Intelligence & Machine Learning

## Acknowledgements

- React
- Vite
- Tailwind CSS
- Node.js
- Express
- MongoDB
- Flask
- scikit-learn
- Solidity
- Hardhat
- Ethereum
- IPFS
- MetaMask
