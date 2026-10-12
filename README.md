# RAEVTAR — Portfolio

Dark fantasy portfolio website in the spirit of House of the Dragon. A single-file,
fully animated cinematic experience built from live GitHub data — no build step.

## ✨ Features

- **Epic 100vh hero** — burning castle + dragon backdrop with a WebGL (Three.js)
  ember particle field, fog and mouse-parallax camera
- **Knight-cat mascot** — original AI-generated character (*Ser Whisker*) revealed
  through a cursor-following spotlight (260px feathered mask, lerped motion)
- **Preloader** — "Forging the realm…" with rising embers
- **Butter-smooth motion** — Lenis smooth scroll + GSAP ScrollTrigger parallax,
  staggered line reveals, magnetic buttons, custom cursor
- **The Five Trials** — creative process as a vertical quest with a scroll-driven
  fire path + 3D tilt cards
- **Chronicles** — 8 real projects from [`@latifangren`](https://github.com/latifangren)
  presented as battle records with 3D tilt / ember-glow hover
- **The Dragonpit** — interactive lab (Systems / Android / Network / Web)
  with floating ember chips
- **Burning-throne footer** — fire particle canvas + oversized CTA
- Cinzel serif display type, film grain + vignette, `prefers-reduced-motion`
  support, fully responsive with mobile fullscreen menu

## 🛠️ Tech

Modular, zero-build static architecture:
- **Markup**: Clean semantic `index.html` (~18 KB)
- **Styles**: `css/style.css` (custom design system tokens, typography, dark fantasy aesthetics)
- **Data Configuration**: `js/data.js` (isolated repository records & lab categories for quick maintenance)
- **Interactive Controller**: `js/main.js` (GSAP ScrollTrigger + Lenis smooth scroll, Three.js ember field, particle canvases)
- **Assets**: Optimized WebP visuals in `assets/img/`
- No build step, no backend required — runs on GitHub Pages or any static host.

## 🚀 Deploy

Any static host works. For **GitHub Pages**:

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Source: **Deploy from a branch** → branch `main`, folder `/ (root)`
4. Open the published URL

The `.nojekyll` file is included so Pages serves assets as-is.

## 📁 Structure

```
├── index.html            # Main markup (~18 KB, links CSS, JS, and assets)
├── css/
│   └── style.css         # Dark fantasy theme, typography, layout & animations
├── js/
│   ├── data.js           # Chronicles & Dragonpit data (easy to update)
│   └── main.js           # Three.js embers, GSAP, Lenis, tilt, cursor & canvas particles
├── assets/
│   └── img/
│       ├── hero-bg.webp          # 100vh hero castle & dragon
│       ├── hero-spotlight.webp   # Spotlight reveal texture
│       ├── ser-whisker.webp      # Knight-cat mascot
│       ├── dragon-banner.webp    # Dragon banner portrait
│       └── foot-throne.webp      # Burning throne background
├── .nojekyll             # Disable Jekyll processing on GitHub Pages
└── README.md
```

## 📝 Notes

- Project data (names, descriptions, stars, languages) was snapshotted from the
  GitHub API for `latifangren` at build time; re-export to refresh.
- Contact links point only to verified destinations (GitHub profile, raevtar.tech).
- All artwork is original AI-generated for this site.

---

Built with Muse · © 2026 raevtar
