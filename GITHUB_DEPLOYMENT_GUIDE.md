# Deploy PM Simulation to GitHub Pages - Complete Guide

## What You'll Need
- A GitHub account (free - create at github.com)
- Your simulation code (pm-simulation.jsx)
- About 20 minutes

---

## Step 1: Create GitHub Account (if you don't have one)

1. Go to **github.com**
2. Click **Sign up**
3. Enter your email, password, and username
4. Verify your email
5. Done! You now have a GitHub account

---

## Step 2: Install GitHub Desktop (Easiest Method)

**For Windows/Mac:**
1. Go to **desktop.github.com**
2. Download GitHub Desktop
3. Install it
4. Sign in with your GitHub account

**Why GitHub Desktop?**
- No command line needed
- Visual interface
- Easier for beginners

---

## Step 3: Create a New Repository

1. Open **GitHub Desktop**
2. Click **File** → **New Repository**
3. Fill in:
   - **Name**: `pm-simulation` (or whatever you like)
   - **Description**: "Product Management Executive Simulation"
   - **Local Path**: Choose where to save it on your computer
   - ✅ Check "Initialize this repository with a README"
4. Click **Create Repository**
5. Click **Publish repository** (top right)
6. ✅ Uncheck "Keep this code private" (so it can be hosted)
7. Click **Publish repository**

---

## Step 4: Set Up Your Project Files

Now I'll create the proper project structure for you. You need these files:

### File 1: `index.html`
This is your main page that loads the React app.

### File 2: Your simulation component (already have this!)

### File 3: `package.json`
Tells GitHub how to build your project.

Let me create these files for you...

---

## What I'll Create for You

I'm going to generate:
1. **index.html** - The main HTML file
2. **package.json** - Project configuration
3. **deploy.yml** - Automatic deployment setup
4. **Updated simulation** - Optimized for GitHub Pages

After I create these, I'll tell you exactly where to put them.

Should I create these files now?

---

## Step 5: Copy Files to Your Repository (After I create them)

1. Open the folder where your repository is saved (the "Local Path" from Step 3)
2. Copy all the files I create into this folder
3. Go back to **GitHub Desktop**
4. You'll see all the new files listed on the left
5. In the bottom left:
   - **Summary**: Type "Initial commit - PM simulation"
   - Click **Commit to main**
6. Click **Push origin** (top right)

---

## Step 6: Enable GitHub Pages

1. Go to **github.com**
2. Sign in
3. Click on your repository name (`pm-simulation`)
4. Click **Settings** (top right)
5. Scroll down to **Pages** (left sidebar)
6. Under "Source":
   - Select **GitHub Actions** (instead of Deploy from a branch)
7. Done! GitHub will automatically build and deploy

---

## Step 7: Wait for Deployment (2-3 minutes)

1. Go to your repository page on GitHub
2. Click the **Actions** tab (top)
3. You'll see a workflow running (orange dot → green checkmark)
4. Wait for the green checkmark ✅

---

## Step 8: Get Your Live URL

1. Go back to **Settings** → **Pages**
2. You'll see: "Your site is live at https://YOUR-USERNAME.github.io/pm-simulation/"
3. Click that link
4. **Your simulation is now live!** 🎉

---

## Step 9: Share on LinkedIn

Now you can:
1. Copy your live URL
2. Post on LinkedIn with the link
3. People can click and take your simulation
4. Emails flow to your Google Sheet automatically!

---

## Troubleshooting

**Problem: "Page not found" error**
- Wait 5 minutes - GitHub Pages takes time to deploy
- Check that you enabled GitHub Pages in Settings
- Make sure repository is public

**Problem: Blank page**
- Check the browser console for errors (F12 → Console tab)
- Make sure all files were uploaded correctly

**Problem: GitHub Actions failed**
- Click on the failed action to see error details
- Usually means a file is missing or has syntax error

---

## Updating Your Simulation Later

When you want to make changes:
1. Edit the files on your computer
2. Open GitHub Desktop
3. It will show what changed
4. Write a commit message ("Updated questions" etc.)
5. Click "Commit to main"
6. Click "Push origin"
7. GitHub automatically rebuilds (2-3 mins)
8. Changes are live!

---

## Alternative: Use Vercel (Even Easier!)

If GitHub seems complicated, **Vercel** is actually easier:

1. Go to **vercel.com**
2. Sign up with GitHub
3. Click **New Project**
4. Import your GitHub repository
5. Click **Deploy**
6. Done in 30 seconds!

Vercel gives you:
- Faster deployment
- Better performance
- Custom domain support
- Automatic HTTPS

---

## Ready to Start?

Let me know and I'll create all the necessary files for you with the proper configuration!

Should I proceed with creating the GitHub deployment files?
