# Soumyadeep Dey — Premium Futuristic Developer Portfolio

[![Vercel Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?logo=github)](https://soumyadeepdey1217.github.io/Portfolio-/)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](LICENSE)

An award-winning, cinematic, dark-themed developer portfolio built for **Soumyadeep Dey** (Full-Stack Developer & AI/ML Engineer), inspired by the futuristic **DEVFUSION** aesthetic.

---

## ✦ Key Features

- **Full-Page 3D Scroll Sequence**: Pinned full-viewport 240-frame 60fps/120fps HTML5 Canvas sequence player scrubbing seamlessly across the entire website from top to bottom with exponential LERP smoothing, preserving the radiant white studio theme highlight and interactive pointer rotation.
- **DEVFUSION Visual System**: Deep space aesthetic (`#080C12`), cyber orange/gold accents (`#FF9800`), dark glassmorphic cards, and crisp typography.
- **Data-Driven Project Showcase**: Interactive category filters (`All`, `AI & ML`, `Full-Stack`, `Web Apps`, `Academic & Systems`) and modal inspection system with verified GitHub repositories and live deployments.
- **Complete Verified Profile**: Education at Adamas University (B.Tech CSE Core '28), internships at Cyber Secured India & IIT Guwahati AI/ML Summer School, Android 16 QA testing, and AWS/Oracle/NASSCOM certifications.
- **Zero-Dependency Architecture**: Built using pure semantic HTML5, modern CSS3, and Vanilla JavaScript (ES6+). Zero bloat, zero heavy frameworks.
- **Universal Compatibility**: Dual support for direct `file:///` local browsing (no web server required) and production static hosting on Vercel or GitHub Pages.

---

## 📁 Repository Structure

```
Portfolio/
├── index.html                   # Semantic HTML5 single-page application
├── css/
│   ├── style.css                # Design tokens, typography & core layouts
│   ├── animations.css           # Keyframes, reveals & reduced-motion rules
│   └── responsive.css           # Breakpoints (1920px down to 320px)
├── js/
│   ├── main.js                  # Navigation, glassmorphism, form & modal handlers
│   ├── animations.js            # Typewriter role cycler & particle engine
│   ├── projects.js              # Centralized project data, filter & modal
│   └── helmet-animation.js      # 3D Canvas sequence renderer & scrub physics
├── assets/
│   ├── images/                  # Mockups, icons & logos
│   ├── projects/                # Project vector previews (SVG)
│   ├── certificates/            # Issuer badge vectors (AWS, Oracle, etc.)
│   ├── helmet-frames/           # 240 optimized WebP & lossless PNG sequence frames
│   └── resume.pdf               # Official Resume of Soumyadeep Dey
├── favicon.svg                  # Custom orange SD monogram
├── robots.txt                   # Crawler indexing rules
├── sitemap.xml                  # Canonical sitemap
├── vercel.json                  # Vercel routing & immutable caching headers
└── package.json                 # Dev server script (Vite)
```

---

## 🚀 Local Development Setup

### Option 1: Live Dev Server (Recommended)
Make sure you have [Node.js](https://nodejs.org/) installed:

```bash
# Install dependencies
npm install

# Start local server on http://localhost:3000
npm run dev
```

### Option 2: Direct File Mode
Simply double-click `index.html` in your file explorer. All asset paths and script modules are configured relatively to work out of the box with zero setup.

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of premium portfolio"
   git branch -M main
   git remote add origin https://github.com/SOUMYADEEPDEY1217/Portfolio-.git
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Keep default settings (`Other` framework, root directory `./`).
4. Click **Deploy**. Vercel will automatically apply the headers and routing in `vercel.json`.

### Deploy to GitHub Pages
1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment**, set Source to **Deploy from a branch** (`main` / root).
3. Save. Your site will be live at `https://soumyadeepdey1217.github.io/Portfolio-/`.

---

## 👤 Developer Profile

**Soumyadeep Dey**  
- **Location**: Kolkata, West Bengal, India  
- **Email**: [rohan.dey1206@gmail.com](mailto:rohan.dey1206@gmail.com)  
- **LinkedIn**: [linkedin.com/in/soumyadeepdey-](https://www.linkedin.com/in/soumyadeepdey-/)  
- **GitHub**: [github.com/SOUMYADEEPDEY1217](https://github.com/SOUMYADEEPDEY1217)  
- **Education**: B.Tech in CSE (Core), Adamas University (Expected August 2028)
