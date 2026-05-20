# PlotTwist AI

PlotTwist AI is a creator tool for turning simple ideas into short drama scripts, plot twists, characters, captions, hashtags, prompt ideas, blog guides, and production notes for TikTok, YouTube Shorts, Reels, Douyin, and Xiaohongshu.

## Project Type

This project is an **other React project**, not Vite and not Next.js.

It is a static React MVP that uses:

- React loaded through an import map
- Tailwind CSS from CDN
- Local JavaScript modules under `src/`
- A lightweight Node preview server for local clean-route SEO checks
- Vercel Serverless Functions under `api/` for future server-side AI/payment work
- A static `dist/` build for Vercel

## Current Version

The current version is **Free Template Mode**.

- No user login is required.
- No real OpenAI API is connected.
- No real Stripe payment is connected.
- Script generation uses local front-end templates and keyword-aware logic.
- Waitlist signup is local UI only.
- Free Template Mode does not spend any AI API money because it runs from local templates.

## Planned Pro AI Mode Architecture

Pro AI Mode is planned for a future paid version, but it is disabled by default right now.

The current project is static React, not Vite and not Next.js, so browser code cannot safely hold a real `OPENAI_API_KEY`. Vite front-end code also cannot safely hold API keys because `VITE_*` variables are browser-visible. Future AI generation must go through a server-side route such as the included Vercel Function placeholders:

```text
POST /api/generate-ai
POST /api/generate-ai-script
```

`/api/generate-ai-script` accepts the future Pro AI form payload and currently supports safe mock behavior only. It reads `process.env.OPENAI_API_KEY` only inside the serverless function and never exposes that value to client code.

Planned Pro AI Mode may include:

- Real AI script generation
- Better understanding of full story ideas
- Longer scripts
- Advanced styles and bilingual output
- More monthly generations
- Premium prompt packs

The current Pro AI Mode UI supports three states:

- AI Mode disabled: shows "Pro AI Studio is coming soon."
- AI Mode enabled without Pro access: shows a locked upgrade state.
- AI Mode enabled with development Pro access: shows an AI form that still returns a placeholder response.

No state currently calls OpenAI.

## Security Notes

- Do not put `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, or webhook secrets in front-end code.
- Future AI generation must be handled through a secure server-side API route, Vercel Function, Next.js API route, or backend service.
- OpenAI API usage is billed by usage, so production AI Mode needs server-side usage limits.
- `.env.example` documents planned environment variables only.
- The current `/api/generate-ai` local placeholder does not call OpenAI.
- The current `/api/generate-ai-script` route does not call OpenAI. If `AI_TEST_MODE=true`, it can return a mock AI result for integration testing.
- The current AI Mode is disabled by default and requires feature flags plus future login/payment checks before real use.

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

Current MVP does not require server environment variables to run.

Contact, waitlist and signup forms use the Web3Forms free client-side mode. This means the Web3Forms public form access key is included in the front-end request. It is not an OpenAI key, Stripe key or email password, but it can be rotated in Web3Forms if spam submissions become a problem.

Planned Pro AI and payment variables are also listed in `.env.example`:

```bash
OPENAI_API_KEY=your_openai_api_key_here
AI_TEST_MODE=false
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
NEXT_PUBLIC_SITE_URL=https://tryplottwistai.com
VITE_AI_MODE_ENABLED=false
VITE_REQUIRE_PRO_FOR_AI=true
VITE_DEV_PRO_ACCESS=false
VITE_MONTHLY_GENERATION_LIMIT=100
```

For this static React MVP, `VITE_*` values are public feature flags only. Do not put private keys in any `VITE_*` or `NEXT_PUBLIC_*` variable because those values are intended for browser-visible code in Vite or Next.js.

When deploying to Vercel, add private values such as `OPENAI_API_KEY` in:

```text
Vercel Project Settings -> Environment Variables
```

Local development with `node server.mjs` serves the static site only. Vercel API routes may not be fully available locally unless you use Vercel's local development tooling. On production Vercel, files under `api/` are deployed as serverless functions.

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

## Google Search Console

Google Search Console setup notes are in:

```text
SEARCH_CONSOLE_SETUP.md
```

Use the current production sitemap:

```text
https://tryplottwistai.com/sitemap.xml
```

## Project Structure

```text
.
├── api/
│   ├── generate-ai.js
│   ├── generate-ai-script.js
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

1. Keep AI generation inside a secure backend API route or migrate to Next.js API routes.
2. Read `OPENAI_API_KEY` only from server-side environment variables.
3. Add Stripe Checkout and webhook handling on the server.
4. Store subscription status and monthly usage limits in a database.
5. Connect Pro AI Mode UI to the secure backend only after payment status is verified.
6. Add login, user accounts, database records, monthly usage counters, abuse protection, and server-side prompt validation before enabling paid AI generation.
