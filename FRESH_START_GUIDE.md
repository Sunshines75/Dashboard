# Fresh Start - Complete Setup Guide

## Step-by-Step Instructions

---

## PHASE 1: CREATE NEW GITHUB REPOSITORY

### Step 1: Create GitHub Repo

1. Go to https://github.com
2. Sign in to your account
3. Click **+** icon (top right) → **New repository**
4. Fill in:
   - **Repository name**: `csm-job-dashboard` (or similar)
   - **Description**: "CSM Job Dashboard with ZipRecruiter"
   - **Public**: Selected ✓
   - **Initialize with README**: Checked ✓
   - **Add .gitignore**: Select "Node"
5. Click **"Create repository"**

### Step 2: Add All Files to GitHub

You now have an empty repo. Add these files:

#### Files to Upload:

1. **FRESH_server.js** → Rename to **server.js**
2. **FRESH_package.json** → Rename to **package.json**
3. **FRESH_vercel.json** → Rename to **vercel.json**
4. **FRESH_index.html** → Rename to **index.html**
5. **FRESH_README.md** → Keep as **README.md** (or replace existing)
6. **FRESH_.gitignore** → Rename to **.gitignore** (with the dot!)

#### How to Upload:

1. Go to your new GitHub repo
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop all 6 files
4. Or click "choose your files" and select them
5. Scroll down to **"Commit changes"** section
6. Click **"Commit changes"**
7. ✅ All files uploaded!

#### Verify Files:

After upload, you should see:
- ✅ server.js
- ✅ package.json
- ✅ vercel.json
- ✅ index.html
- ✅ README.md
- ✅ .gitignore

---

## PHASE 2: DEPLOY TO VERCEL

### Step 3: Create Vercel Project

1. Go to https://vercel.com
2. Sign in (or create account)
3. Click **"Add New"** → **"Project"**
4. You should see your new GitHub repo listed
5. Click **"Import"** next to "csm-job-dashboard"

### Step 4: Configure Project

You'll see project settings. Configure:

**Project Name:** `csm-job-dashboard` (or leave default)

**Framework:** "Other" (or auto-detect)

**Root Directory:** `./` (default)

**Environment Variables:** None needed! ZipRecruiter is free 🎉

Click **"Deploy"**

### Step 5: Wait for Deployment

Vercel builds and deploys. You'll see:
```
✓ Build Completed
✓ Deployment Ready
```

Takes 2-3 minutes.

### Step 6: Get Your Live URL

Once deployed, you'll see:
```
Congratulations! Your project has been successfully deployed.
https://csm-job-dashboard-xxxxx.vercel.app
```

Click the link! Your dashboard is LIVE! 🚀

---

## PHASE 3: TEST YOUR DASHBOARD

### Step 7: Test the App

1. Go to your Vercel URL
2. You should see the CSM Job Dashboard
3. Fill in:
   - Job Title: "Customer Success Manager"
   - Industry: "DevSecOps" (optional)
   - Location: "Remote, US"
   - Max Results: "10"
4. Click **"Run Dual Scraper (Google + LinkedIn)"** button
5. Wait 5-10 seconds
6. Jobs from ZipRecruiter should appear! ✅

### If It Works:
Congrats! Your dashboard is live and working! 🎉

### If Jobs Don't Appear:
1. Press F12 to open Developer Tools
2. Go to **Console** tab
3. Look for error messages
4. Try a different search term
5. Wait 10 seconds (first search can be slow)

---

## WHAT YOU DOWNLOADED

All 6 files needed for fresh start:

### Backend Files:
- **FRESH_server.js** - Express backend with ZipRecruiter API
- **FRESH_package.json** - Dependencies (express, cors, dotenv)
- **FRESH_vercel.json** - Vercel build configuration

### Frontend Files:
- **FRESH_index.html** - React UI with dual scraper button

### Config Files:
- **FRESH_.gitignore** - Prevents uploading node_modules, .env
- **FRESH_README.md** - Project documentation

---

## REFERENCE: FILE CONTENTS

### server.js (FRESH_server.js)
- Express server with CORS enabled
- `/api/health` - Health check endpoint
- `/api/scrape` - Dual scraper (calls ZipRecruiter)
- `/api/search-jobs` - Single search endpoint
- Serves index.html on root

### package.json (FRESH_package.json)
- Dependencies: express, cors, dotenv
- Node version: 24.x
- Scripts: dev, start

### vercel.json (FRESH_vercel.json)
- Builds server.js as @vercel/node function
- Routes /api/* to server.js
- Routes /* to server.js (for SPA routing)

### index.html (FRESH_index.html)
- React frontend (via CDN)
- Dual scraper button
- Job results display
- Industry filtering
- Status tracking (Applied/Interested/Pass)
- CSV export button

---

## TROUBLESHOOTING

### "Cannot find module 'express'"
- This is normal - Vercel installs dependencies
- Click Redeploy if it fails

### "404 Not Found"
- Server not deployed yet
- Wait 2-3 minutes for deployment
- Check Vercel Deployments tab

### "No jobs found"
- Try different search terms
- Wait 10 seconds (first search is slow)
- Check browser console (F12) for errors

### "ZipRecruiter API error"
- ZipRecruiter API may be rate limiting
- Try again in a few seconds
- Try different search terms

### Files not uploading to GitHub
- Make sure .gitignore has the dot: **.gitignore** (not gitignore)
- Make sure .env.local has the dot: **.env.local** (not env.local)
- Hidden files need the dot!

---

## QUICK COMMAND REFERENCE

If you ever want to test locally:

```bash
# Install dependencies
npm install

# Run locally
npm start

# Visit http://localhost:3001
```

---

## SUMMARY

You're all set! Your fresh CSM Job Dashboard is now:

✅ On GitHub: https://github.com/YOUR-USERNAME/csm-job-dashboard
✅ Deployed to Vercel: https://csm-job-dashboard-xxxxx.vercel.app
✅ Powered by ZipRecruiter API (free!)
✅ Ready to search CSM jobs!

Enjoy! 🚀

---

## Next Steps (Optional Enhancements)

Once your dashboard works, you can:

1. **Add database** - Save jobs and applications
2. **Add authentication** - Track per-user job lists
3. **Add email alerts** - Get notified of new jobs
4. **Add more job sources** - Integrate Indeed, LinkedIn, etc.
5. **Customize industries** - Add your own categories

The backend is built to support all of these!

---

## Questions?

If something doesn't work:

1. Check Vercel deployment logs (Deployments → click deployment → scroll down)
2. Check browser console (F12 → Console tab)
3. Check GitHub files are correct (must have dots on .gitignore and .env)
4. Try test endpoint: `https://your-url/api/health` should return `{"status":"ok",...}`

Good luck! 🎉
