# Deployment Instructions

## DigitalOcean App Platform (Recommended)

### 1. Create GitHub Repository

```bash
cd sondai-calculator
git init
git add .
git commit -m "Initial commit - Sondai AI Calculator"
git remote add origin https://github.com/YOUR_USERNAME/sondai-calculator.git
git push -u origin main
```

### 2. Deploy to DigitalOcean

1. Go to https://cloud.digitalocean.com
2. Click "Create" → "Apps"
3. Choose "GitHub" and authorize
4. Select your `sondai-calculator` repository
5. Configure:
   - **Name:** sondai-api
   - **Type:** Web Service
   - **Source Directory:** `/backend`
   - **Build Command:** `npm install`
   - **Run Command:** `npm start`
   - **HTTP Port:** `8080`
   - **Plan:** Basic ($5/month)
6. Add environment variables:
   ```
   PORT=8080
   NODE_ENV=production
   ```
7. Click "Create Resources"

### 3. Your app will be available at:
```
https://your-app-name.ondigitalocean.app
```

### 4. Add Custom Domain (Optional)

1. In App Settings → Domains
2. Add `calc.sondai.ai`
3. Update your DNS:
   ```
   Type: CNAME
   Name: calc
   Value: your-app-name.ondigitalocean.app
   ```

## Updating Your App

```bash
# Make changes
git add .
git commit -m "Update description"
git push

# DigitalOcean automatically redeploys!
```

## Testing

```bash
# Test locally first
cd backend
npm install
npm start

# Visit http://localhost:8080

# Test API
curl http://localhost:8080/api/health
curl http://localhost:8080/api/pricing
```
