# Arzaka Portfolio · Next.js Export

Ready-to-deploy Next.js 14 (App Router) version of the portfolio.
**No conversion left to do.** Just install, run, and deploy.

## 1. Run locally (2 min)

```bash
cd nextjs-export
npm install
npm run dev
```

Open <http://localhost:3000>.

## 2. Deploy to Vercel (5 min, free)

The easiest path:

```bash
# from inside nextjs-export/
npx vercel
```

Follow the prompts — log in, pick a name, accept defaults. You'll get a live URL in under a minute.

**Or via GitHub (recommended for long-term):**

1. Create a new GitHub repo (e.g. `arzaka-portfolio`).
2. From inside `nextjs-export/`:
   ```bash
   git init
   git add .
   git commit -m "initial: portfolio v1"
   git branch -M main
   git remote add origin https://github.com/ArzakaRaffan/arzaka-portfolio.git
   git push -u origin main
   ```
3. Go to <https://vercel.com/new>, import that repo, deploy. Done.

Every future `git push` redeploys automatically.

## 3. Folder structure

```
nextjs-export/
├── app/
│   ├── layout.jsx          # root layout, <html><body>
│   ├── page.jsx            # the home page (composes all sections)
│   ├── globals.css         # design tokens + responsive grid + animations
│   └── components/
│       ├── Animations.jsx  # <Reveal> scroll-fade helper
│       ├── Icons.jsx       # Lucide icons + StatusPill
│       ├── Nav.jsx
│       ├── Hero.jsx
│       ├── SelectedWork.jsx
│       ├── Highlights.jsx
│       ├── Skills.jsx
│       ├── Experience.jsx
│       ├── About.jsx
│       ├── Contact.jsx
│       └── Footer.jsx
├── public/
│   ├── assets/             # all images (portrait + project screenshots)
│   └── fonts/
│       └── TT_Commons_Regular.otf
├── package.json
├── next.config.js
├── jsconfig.json
└── .gitignore
```

## 4. Common edits

| Need to change… | File |
|---|---|
| Add a new project | `app/components/SelectedWork.jsx` → `projects` array |
| Add an award | `app/components/Highlights.jsx` → `highlights` array |
| Update Experience entry | `app/components/Experience.jsx` → `experience` array |
| Change Skills logos | `app/components/Skills.jsx` → `groups` array |
| Hero copy | `app/components/Hero.jsx` |
| Email / socials | `app/components/Footer.jsx` + `app/components/Contact.jsx` |

## 5. Notes

- All components use `"use client"` — they include hooks (state, effects, IntersectionObserver). Safe and idiomatic for the App Router.
- Brand logos in **Skills** load from `cdn.simpleicons.org`. No bundling needed; they're tiny SVGs served from CDN.
- The contact form is **frontend-only** (success state is fake). To make it real, swap the `onSubmit` in `Contact.jsx` for a fetch to your handler — Resend, Formspree, or a Next.js Route Handler.
- The `<title>` and meta come from `metadata` in `layout.jsx` — edit there.

## 6. Image optimization (optional)

For better Lighthouse scores, swap plain `<img>` tags in `SelectedWork.jsx` and `About.jsx` for `<Image>` from `next/image`. Not required for tonight's deploy.

```jsx
import Image from "next/image";
<Image src="/assets/projects/cleanet.png" width={800} height={500} alt="CleaNet" />
```

## 7. Custom domain

After deploying to Vercel:
1. Project → Settings → Domains
2. Add `arzaka.dev` (or whatever you've got)
3. Update your DNS A / CNAME records as instructed

That's it — happy shipping.
