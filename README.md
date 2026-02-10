# Sondai AI Calculator

AI Voice Agent cost calculator with real-time pricing data.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Git installed

### Local Development

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   ```
   http://localhost:8080
   ```

## 📁 Project Structure

```
sondai-calculator/
├── frontend/
│   └── index.html          # Calculator UI
├── backend/
│   ├── server.js           # Express API server
│   ├── pricing-data.json   # Pricing database
│   └── package.json        # Dependencies
└── README.md
```

## 🔧 API Endpoints

- `GET /api/health` - Health check
- `GET /api/pricing` - Get all pricing data
- `GET /api/pricing/:category` - Get specific category (stt, tts, llm, telephony, sms, email)

## 🌐 Deployment

### DigitalOcean App Platform

1. Push to GitHub
2. Create new App in DigitalOcean
3. Connect GitHub repository
4. Configure:
   - Source Directory: `/backend`
   - Build Command: `npm install`
   - Run Command: `npm start`
   - HTTP Port: `8080`
5. Deploy!

## 📝 Updating Prices

Edit `backend/pricing-data.json`:
1. Update the price values
2. Update `lastUpdated` to today's date
3. Commit and push (auto-deploys on DigitalOcean)

## 🔐 Environment Variables

- `PORT` - Server port (default: 8080)
- `NODE_ENV` - Environment (production/development)
- `FRONTEND_URL` - Frontend URL for CORS

## 📊 Monitoring

- Health check: `curl https://your-app.ondigitalocean.app/api/health`
- View logs in DigitalOcean dashboard

## 📄 License

Copyright © 2026 Sondai AI
