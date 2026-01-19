# 🚀 Deploying Work Tracker to Render (Free Alternative)

Since you are experiencing issues with Replit, **Render** is an excellent free alternative for hosting Java + React applications. It supports deploying directly from GitHub using a Dockerfile.

## Prerequisites

1.  A **GitHub Account**.
2.  A **Render Account** (Create one at [render.com](https://render.com)).

## Step 1: Push Code to GitHub

If you haven't already pushed your code to GitHub, do it now.

1.  Create a new repository on GitHub (e.g., `work-tracker`).
2.  Run these commands in your project terminal:

```bash
git init
git add .
git commit -m "Prepare for Render deployment"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/work-tracker.git
git push -u origin main
```

*(If you already have a repo, just run `git add .`, `git commit -m "add dockerfile"`, and `git push`)*

## Step 2: Create a Web Service on Render

1.  Log in to your **Render Dashboard**.
2.  Click **New +** and select **Web Service**.
3.  Choose **Build and deploy from a Git repository**.
4.  Connect your GitHub account if prompted, and select your `work-tracker` repository.

## Step 3: Configure Deployment

Render will detect the `Dockerfile` we just added and configure mostly everything automatically.

*   **Name**: `work-tracker` (or anything you like)
*   **Region**: Select the one closest to you (e.g., `Oregon, USA` or `Frankfurt, EU`).
*   **Branch**: `main`
*   **Runtime**: **Docker** (This is important! It should be selected automatically).
*   **Instance Type**: **Free** (Select the Free tier option).

## Step 4: Environment Variables (Optional)

In the **Environment Variables** section, you don't strictly need any for this app to start, but if you want to be safe:

*   **Key**: `PORT`
*   **Value**: `8080`

*(Our application is configured to listen on port 8080 by default, or whatever Render assigns).*

## Step 5: Deploy

1.  Click **Create Web Service**.
2.  Render will start building your app.
    *   It will pull the Maven image.
    *   It will install Node.js.
    *   It will build the React frontend.
    *   It will build the Spring Boot backend.
    *   It will launch the app.

This process might take **5-8 minutes** for the first build.

## Step 6: Access Your App

Once the build is complete, you will see a green **Live** badge.
Click the URL provided (e.g., `https://work-tracker-xyz.render.com`) to use your app!

---

## ⚡ Notes on Free Tier

*   **Spin Down**: Free web services on Render spin down after 15 minutes of inactivity. The first request after a while will take ~30-60 seconds to load while the server wakes up.
*   **Database**: This app currently uses H2 (In-Memory) database. **If the server restarts or spins down, your data will be reset.**
*   For persistent data, you would need to connect a Managed PostgreSQL database (Render offers a free Postgres tier too!).
