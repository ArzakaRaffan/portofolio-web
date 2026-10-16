# Arzaka Portfolio · v2 "Blueprint"

Next.js 14 (App Router) + Tailwind + framer-motion + Lenis. No env vars needed.

```bash
npm install
npm run dev
```

## Where things live

| Change… | File |
|---|---|
| Projects, highlights, experience, bio, socials, games link | `lib/data.js` |
| Colors, fonts | `tailwind.config.js` |
| Motion primitives (Scramble, SplitReveal, Reveal, Magnetic, Clock) | `app/_components/ui.jsx` |
| Sections | `app/_components/*.jsx` |

## Motion rules

- Enter with expo-out (`EASE`), exit faster with expo-in (`EASE_IN`).
- Split/scramble only on short headlines and labels.
- Animate `transform`, `opacity`, `clip-path` only.
- `prefers-reduced-motion`: no smooth scroll, static ASCII field, instant reveals.
- Hover-only features have touch fallbacks (work thumbnails show inline on mobile).
