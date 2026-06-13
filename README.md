# Lester Vilo — Personal Portfolio

A professional, responsive portfolio website built with HTML, CSS, and JavaScript.
Designed for GitHub Pages deployment. No frameworks, no build tools required.

---

## Folder Structure

```
lester-portfolio/
├── index.html          ← Main file (all sections here)
├── base.css            ← CSS reset and foundations (do not edit)
├── style.css           ← Design tokens, colors, components (edit colors here)
├── app.js              ← Interactions: dark mode, animations, nav, form
├── README.md           ← This file
└── assets/
    ├── Lester-Vilo-Resume.pdf   ← PUT YOUR RESUME HERE
    ├── lester-photo.jpg         ← PUT YOUR PHOTO HERE (optional)
    └── og-image.jpg             ← PUT A SITE SCREENSHOT HERE (for social sharing)
```

---

## What to Edit

### In `index.html` — search for `<!-- EDIT:` comments

| Section           | What to change                                                     |
|-------------------|--------------------------------------------------------------------|
| **Hero**          | Name, title, value statement, stats, photo path, CTA links         |
| **About**         | Bio paragraphs, strengths tags, career goals                       |
| **Skills**        | Skill categories and pill items                                    |
| **Projects**      | Project titles, summaries, tech stacks, GitHub/demo links, images  |
| **Experience**    | Job titles, organizations, dates, descriptions, tags               |
| **Certificates**  | Cert names, issuers, completion dates, credential links            |
| **Services**      | Service titles and descriptions                                    |
| **Resume**        | PDF file link (point to `./assets/Lester-Vilo-Resume.pdf`)         |
| **Contact**       | Email, LinkedIn URL, GitHub URL, phone number                      |
| **Footer**        | Social links                                                       |

### In `style.css` — change colors

Find `/* Primary Accent — Electric Blue */` and update:
```css
--color-primary: #1a6fc4;   /* ← change to your preferred accent color */
```

---

## Adding Your Photo

1. Save your photo as `lester-photo.jpg` inside the `assets/` folder
2. In `index.html`, find the hero section and replace:
   ```html
   <div class="hero__avatar-placeholder">LV</div>
   ```
   with:
   ```html
   <img src="./assets/lester-photo.jpg" alt="Lester Vilo" />
   ```

---

## Adding Your Resume

1. Save your resume as `Lester-Vilo-Resume.pdf` inside the `assets/` folder
2. The download buttons already point to `./assets/Lester-Vilo-Resume.pdf` — no code change needed

---

## Making the Contact Form Work

The form currently shows a success message (demo mode only). To make it actually send emails:

1. Go to https://formspree.io/ and create a free account
2. Create a form and copy your form ID (looks like `xabc1234`)
3. In `app.js`, find the commented-out Formspree block and uncomment it
4. Replace `YOUR_FORM_ID` with your actual ID
5. Delete the `setTimeout` demo block above it

---

## Deploy on GitHub Pages

### Option 1 — Upload directly (easiest)

1. Create a new repository on GitHub named `lestervilo.github.io` (use YOUR GitHub username)
2. Upload all files in this folder to the repository root
3. Go to **Settings → Pages** → Source: `main` branch / `/ (root)` → Save
4. Your site will be live at `https://lestervilo.github.io` within a few minutes

### Option 2 — Git command line

```bash
# Initialize git in this folder
git init
git add .
git commit -m "Initial portfolio commit"

# Push to GitHub (replace with your repo URL)
git remote add origin https://github.com/lestervilo/lestervilo.github.io.git
git push -u origin main
```

Then enable GitHub Pages in repository Settings.

### Custom domain (optional)

1. Buy a domain (e.g., Namecheap, Google Domains)
2. In GitHub Pages settings, add your custom domain
3. Create a file named `CNAME` with just your domain name inside:
   ```
   www.lestervilo.com
   ```
4. Point your domain's DNS to GitHub Pages (GitHub will show you the IPs)

---

## SEO Tips

- Replace the `og:image` meta tag with a real screenshot after you publish
- Update the `og:url` with your actual GitHub Pages URL
- Google will index your site within a few days — no extra setup needed

---

## Features

- Responsive design (mobile, tablet, desktop)
- Dark / Light mode toggle (respects system preference)
- Scroll-reveal animations
- Active nav link highlighting
- Sticky header with hide-on-scroll
- Scroll-to-top button
- Accessible (semantic HTML, keyboard navigation, ARIA labels)
- SEO-friendly (meta tags, JSON-LD structured data, Open Graph)
- No frameworks, no build tools — pure HTML/CSS/JS
