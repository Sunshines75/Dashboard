# CSM Job Dashboard

A modern job search dashboard for finding Customer Success Manager roles. Powered by ZipRecruiter's job API.

## Features

- 🚀 Live job search from ZipRecruiter
- 🔐 DevSecOps & security-focused CSM roles
- 📊 Filter by industry, location, status
- 📥 Export results to CSV
- 🎨 Clean, responsive React interface
- ⚡ Fast deployment to Vercel

## Quick Start

### Local Development

```bash
# Clone and setup
git clone <your-repo-url>
cd csm-job-dashboard
npm install

# Run
npm run dev

# Visit http://localhost:3001
```

### Deploy to Vercel

1. Push code to GitHub
2. Go to vercel.com and import repository
3. No environment variables needed (ZipRecruiter is free!)
4. Click Deploy
5. Done! 🎉

## How to Use

1. Enter job title (e.g., "Customer Success Manager")
2. Select industry (optional)
3. Enter location (e.g., "Remote, US")
4. Click "Run Dual Scraper"
5. Results appear instantly!

## Tech Stack

- Backend: Node.js + Express
- Frontend: React 18 (via CDN)
- Deployment: Vercel
- Jobs: ZipRecruiter API

## Files

- `server.js` - Express backend with ZipRecruiter API calls
- `index.html` - React frontend UI
- `package.json` - Dependencies
- `vercel.json` - Vercel configuration
- `.gitignore` - Git exclusions

## Support

Having issues? Check:
1. Browser console (F12) for errors
2. Vercel deployment logs
3. Make sure ZipRecruiter API is accessible

Enjoy finding your next CSM role! 🚀
