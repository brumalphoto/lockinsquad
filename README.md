# Lock in Squad — Static Site (starter)

This repository contains a lightweight static site for **Lock in Squad**.

## What's included
- `index.html` — main page (edit text and structure as needed)
- `styles.css` — simple styles
- `script.js` — minimal JS
- `credits.html/` — credits page
- `assets/` — folder for images & audio (placeholder files included)
- `members/` — folder for individual member pages (placeholder files included)

## Quick start (local)
```bash
# clone or download the repo, then:
# serve locally (simple)
python3 -m http.server 8000
# open http://localhost:8000 in your browser
```

## To make this a public GitHub repo
1. Create a new GitHub repo (e.g. `lock-in-squad`).
2. From this project folder:
```bash
git init
git add .
git commit -m "Initial Lock in Squad static site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/lock-in-squad.git
git push -u origin main
```
3. Enable GitHub Pages (Settings → Pages) or use Vercel/Netlify for deployment.

## Branding
Replace files in `/assets` (images, audio) with your own. Update `index.html` links and copy.

## License
MIT — feel free to reuse and modify.

## Deploy to Cloudflare Pages
1. Connect your GitHub repo to Cloudflare Pages (free tier).
2. Set build command to empty (static site, no build needed).
3. Set output directory to `/` (root).
4. Deploy – it should auto-build on pushes.
