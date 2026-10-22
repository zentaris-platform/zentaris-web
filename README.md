# Zentaris web

Public website for [Zentaris](https://www.linkedin.com/company/zentarisin/) — one team for software, brand and attention.

The look and copy come from the approved **Hero Lab** prototype in `../zentaris-hero-lab`. This app is the SvelteKit port of that design, not a new theme.

## Stack

- SvelteKit 3, Svelte 5, Vite 8, TypeScript
- Hero Lab CSS and tokens (Tailwind v4 theme/utilities only — no preflight, so Lab styles win)
- Lenis for smooth scrolling
- Netlify adapter

Theme follows the OS (`prefers-color-scheme`). There is no in-page theme switch.

## Run it

From this folder:

```sh
npm install
npm run dev
```

Open http://localhost:5173/

```sh
npm run check     # types
npm run build     # production
npm run preview   # serve the build
npm run format    # Prettier
```

## Layout

```
src/routes/+page.svelte          homepage (composes sections)
src/lib/components/home/         header, sections, footer
src/lib/components/home/illustrations/   SVG as Svelte components
src/lib/hero-lab/                tokens, CSS, client enhance
src/lib/seo.ts                   title, description, JSON-LD
src/lib/smooth-scroll.ts         Lenis
src/lib/scroll-text.ts           word-fill on scroll
static/                          favicon, fonts, logos
```

Imports use the `#lib` alias. TypeScript files need the `.ts` suffix (`#lib/seo.ts`). Svelte files keep `.svelte`.

## Behaviour

- Homepage is prerendered.
- `/sitemap.xml` and `/robots.txt` are generated. Demo routes are `noindex`.
- Contact form is **preview only** — it validates in the browser and does not send mail.
- Reduced-motion: Lenis and scroll-text are skipped.

Set `PUBLIC_SITE_URL` (no trailing slash) in production so canonical, Open Graph and sitemap URLs use the live domain.

## Still needed from the owner

Do not invent these. Until they arrive, leave the placeholders.

| Field | Where it shows |
| --- | --- |
| Email, phone / WhatsApp, city | Contact |
| Domain | SEO, sitemap, social cards |
| Form destination | Contact (inbox, CRM, or stay preview-only) |
| Founder photo | About |
| Real case studies (name, image, one true result) | Work |
| Privacy and terms | Footer (links currently go `#top`) |

## Brand

- Teal `#00E5C8` · Ink `#161616` · Stone `#E7E3E0`
- Display: Sora · Body: Inter · Labels: IBM Plex Mono
- Logos and favicons live in `static/logo` and `static/favicon` (copied from Hero Lab)
