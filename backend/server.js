const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'OPTIONS'],
  credentials: false
}));

app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

let pricingData = null;
let lastLoaded = null;

async function loadPricingData() {
  try {
    const data = await fs.readFile(
      path.join(__dirname, 'pricing-data.json'), 
      'utf8'
    );
    pricingData = JSON.parse(data);
    lastLoaded = new Date();
    console.log('✓ Pricing data loaded successfully');
    console.log(`  Version: ${pricingData.version}`);
    console.log(`  Last Updated: ${pricingData.lastUpdated}`);
  } catch (error) {
    console.error('❌ Error loading pricing data:', error);
  }
}

// Load pricing data on startup
loadPricingData();

// Reload pricing data every hour
setInterval(loadPricingData, 3600000);

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: pricingData?.version || 'unknown',
    lastPriceUpdate: pricingData?.lastUpdated || null,
    serverLastLoaded: lastLoaded?.toISOString() || null,
    uptime: process.uptime()
  });
});

app.get('/api/pricing', (req, res) => {
  if (!pricingData) {
    return res.status(503).json({ 
      error: 'Pricing data not available',
      message: 'Server is initializing, please try again in a moment'
    });
  }
  res.json(pricingData);
});

app.get('/api/pricing/:category', (req, res) => {
  const { category } = req.params;
  
  if (!pricingData) {
    return res.status(503).json({ error: 'Pricing data not available' });
  }
  
  if (!pricingData.pricing[category]) {
    return res.status(404).json({ 
      error: 'Category not found',
      availableCategories: Object.keys(pricingData.pricing)
    });
  }
  
  res.json({
    category,
    lastUpdated: pricingData.lastUpdated,
    providers: pricingData.pricing[category]
  });
});

// Catch-all route for frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║   Sondai AI Pricing API Server        ║
║   Running on port ${PORT}                ║
╚════════════════════════════════════════╝
  `);
});
