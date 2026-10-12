# RAEVTAR — Portfolio

Personal cinematic portfolio website. Dark, premium, fully animated single-page experience built from live GitHub data.

## ✨ Features

- **Cinematic 100vh hero** — AI-generated night-landscape backdrop with a cursor-following
  spotlight reveal (260px feathered mask, lerped motion)
- **Preloader** — 0–100 counter with curtain transition
- **Butter-smooth motion** — Lenis smooth scroll + GSAP ScrollTrigger parallax,
  staggered line reveals, magnetic buttons, custom cursor
- **Creative Process** — 5-step vertical journey with a scroll-driven glowing path + 3D tilt cards
- **Selected Works** — 8 real projects from [`@latifangren`](https://github.com/latifangren)
  in an asymmetric editorial layout with 3D tilt / glow hover
- **Lab** — interactive playground (Systems / Android / Network / Web) with parallax chips
- **Atmospheric footer** — glowing particle canvas + oversized CTA
- Film grain overlay, marquee strips, `prefers-reduced-motion` support, fully responsive
  with mobile fullscreen menu

## 🛠️ Tech

Vanilla HTML/CSS/JS — no build step. Animations via GSAP + ScrollTrigger + Lenis (CDN).
Everything is inlined into a single `index.html`, so the site runs anywhere static files
are served.

## 🚀 Deploy

Any static host works. For **GitHub Pages**:

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → branch `main`, folder `/ (root)`
4. Open the published URL

The `.nojekyll` file is included so Pages serves assets as-is.

## 📁 Structure

```
├── index.html   # the entire site (markup + styles + scripts + inlined assets)
├── .nojekyll    # disable Jekyll processing on GitHub Pages
└── README.md
```

## 📝 Notes

- Project data (names, descriptions, stars, languages) was snapshotted from the
  GitHub API for `latifangren` at build time; re-export to refresh.
- Contact links point only to verified destinations (GitHub profile, raevtar.tech).

---

Built with Muse · © 2026 raevtar
