# PlotTwist AI

PlotTwist AI is a creator tool for turning simple ideas into short drama scripts, plot twists, characters, captions, hashtags, prompt ideas, blog guides, and production notes for TikTok, YouTube Shorts, Reels, Douyin, and Xiaohongshu.

## Project Type

This project is an **other React project**, not Vite and not Next.js.

It is a static React MVP that uses:

- React loaded through an import map
- Tailwind CSS from CDN
- Local JavaScript modules under `src/`
- A lightweight Node preview server for local clean-route SEO checks
- A static `dist/` build for Vercel

## Current Version

The current version is **Free Template Mode**.

- No user login is required.
- No real OpenAI API is connected.
- No real Stripe payment is connected.
- Script generation uses local front-end templates and keyword-aware logic.
- Waitlist signup is local UI only.

## Planned Pro AI Mode

Pro AI Mode is planned for a future paid version. It may include:

- Real AI script generation
- Better understanding of full story ideas
- Longer scripts
- Advanced styles and bilingual output
- More monthly generations
- Premium prompt packs

The current Pro AI Mode UI is a placeholder only.

## Security Notes

- Do not put `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, or webhook secrets in front-end code.
- Future AI generation must be handled through a secure server-side API route or backend service.
- `.env.example` documents planned environment variables only.
- The current `/api/generate-ai` local placeholder does not call OpenAI.

## Local Run

Run the local preview server:

```bash
npm run serve
```

Or directly:

```bash
node server.mjs
```

Open:

```text
http://localhost:4173
```

If the port is already in use:

```bash
PORT=4174 node server.mjs
```

## Build

Recommended build command:

```bash
npm run build
```

The build creates a static `dist/` folder, refreshes `robots.txt` and `sitemap.xml`, and prerenders route-level `index.html` files with the correct SEO metadata.

If npm is not available but Node 24 is available, the same package script can be run with:

```bash
node --run build
```

## Vercel Deployment

Recommended Vercel settings:

- Framework preset: `Other`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: leave default

This repository includes `vercel.json` with:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

The build script generates static HTML files for all sitemap routes, including `/blog` and article pages, so direct clean URLs can be served from `dist/`.

## Environment Variables

Current MVP does not require real environment variables to run.

Planned variables are listed in `.env.example`:

```bash
OPENAI_API_KEY=your_openai_api_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
NEXT_PUBLIC_SITE_URL=https://tryplottwistai.com
```

For the current static version, update the public site URL in:

```text
src/lib/siteConfig.js
```

`SITE_URL` is the single source used for canonical URLs, sitemap URLs, robots.txt, and Open Graph URLs.

## Custom Domain

Custom domain buying and Vercel binding notes are in:

```text
DOMAIN_SETUP.md
```

After a final domain is connected, update `SITE_URL` in `src/lib/siteConfig.js` and run `npm run build`. The build refreshes canonical URLs, `sitemap.xml`, `robots.txt`, Open Graph URLs, and prerendered SEO metadata.

## Project Structure

```text
.
├── api/
│   └── generate-ai.placeholder.md
├── index.html
├── package.json
├── public/
│   ├── favicon.svg
│   └── visuals/
├── scripts/
│   ├── build.mjs
│   ├── create_hero_asset.py
│   └── sync_seo_files.mjs
├── server.mjs
├── src/
│   ├── App.js
│   ├── components/
│   ├── data/
│   ├── lib/
│   └── pages/
└── vercel.json
```

## Next AI And Payment Steps

1. Add a secure backend API route for AI generation.
2. Read `OPENAI_API_KEY` only from server-side environment variables.
3. Add Stripe Checkout and webhook handling on the server.
4. Store subscription status and monthly usage limits in a database.
5. Connect Pro AI Mode UI to the secure backend only after payment status is verified.
