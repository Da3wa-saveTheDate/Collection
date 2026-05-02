# Yasser & Salma — Wedding Invitation

A static, native HTML/CSS/JavaScript wedding invitation website. No build step, no frameworks.

## 📂 Structure

```
.
├── index.html          # All page content
├── styles.css          # All styles (converted from Tailwind)
├── script.js           # Preloader, calendar, countdown, audio, RSVP, scroll reveals
├── assets/
│   ├── couple-1.jpg
│   ├── couple-2.jpg
│   ├── couple-3.jpg
│   ├── envelope.jpg
│   ├── venue.jpg
│   ├── floral-decoration.png
│   └── fonts/
│       └── Runethia.otf
└── README.md
```

## 🚀 Run locally

Just open `index.html` in any modern browser. Or serve it for full audio support:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit http://localhost:8000

## 🌐 Deploy to GitHub Pages

1. Create a new repository on GitHub.
2. Upload all files (or `git push`) to the `main` branch.
3. Repository → **Settings** → **Pages**.
4. Under *Source*, select branch `main` and folder `/ (root)`.
5. Save. Your site will publish at `https://<username>.github.io/<repo>/`.

## 🎵 Audio

Songs stream from `cdn.pixabay.com`. Replace the `data-src` attribute on any
`.audio-player` element in `index.html` to use your own MP3.

## 💌 Customizing

- **Names / dates** → edit `index.html` directly.
- **Colors** → CSS variables defined at the top of `styles.css` (`:root`).
- **Calendar** → `buildCalendar()` in `script.js` (FIRST_OFFSET, DAYS_IN_MONTH).
- **Countdown target** → `TARGET` constant in `script.js`.

Made with love · Cairo, Egypt
