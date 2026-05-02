# Omar & Laila — Wedding Invitation

A static, single-page wedding invitation site. Pure **HTML + CSS + JS** — no React, no build step, no dependencies.

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
# Python 3
python3 -m http.server 8000

# or Node
npx serve .
```

Then visit http://localhost:8000

## Deploy to GitHub Pages

1. Create a new GitHub repo and upload the contents of this folder.
2. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)`.
3. Visit `https://<your-username>.github.io/<repo>/`.

## Files

```
index.html      Markup
styles.css      All styles (design tokens preserved)
script.js       Preloader, reveal, calendar, timeline, countdown, RSVP, voice player
assets/         Images + the romantic background song (Clair de Lune, public domain)
```
