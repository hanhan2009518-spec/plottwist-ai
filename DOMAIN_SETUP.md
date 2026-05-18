# PlotTwist AI Domain Setup Guide

This guide explains how to choose, buy, and connect a custom domain for PlotTwist AI.

Important: do not buy a domain until you have checked the first-year price, renewal price, privacy protection, and DNS control. This guide does not purchase or pay for any domain.

## Recommended Domain

Best overall brand choice:

```text
plottwistai.com
```

Why:

- It directly matches the product name, PlotTwist AI.
- `.com` is the most familiar and trustworthy extension for users.
- It is easier to remember than a niche extension.
- It leaves room to expand beyond prompts into scripts, characters, captions, and Pro AI tools.

Secondary options:

- `plottwist.tools`: good for a creator tool website, but less universal than `.com`.
- `dramaprompt.com`: good SEO meaning, but weaker as a unique brand because it sounds more generic.
- `shortdram.ai`: relevant to AI short drama, but less polished as a brand and `.ai` domains often renew at a higher price.

## What To Check Before Buying

Before paying, check these items on the checkout page:

1. First-year price

   Some registrars discount the first year heavily. A domain may look cheap now but cost much more later.

2. Renewal price

   This is the yearly price after the first year. Renewal price matters more than the first-year promo price.

3. Privacy protection

   Domain privacy hides your personal contact information from public WHOIS listings. Prefer a registrar that includes privacy protection for free.

4. Auto-renew

   Turn on auto-renew if you want to avoid accidentally losing the domain. Make sure your payment method is current.

5. DNS management

   You need access to DNS records so the domain can point to Vercel. The registrar should let you edit A records and CNAME records.

## Recommended Registrars

### Cloudflare Registrar

Good for:

- Transparent renewal pricing
- Strong DNS management
- Free WHOIS privacy where supported

Notes:

- Cloudflare usually requires using Cloudflare nameservers.
- The interface is powerful but can feel more technical.

### Namecheap

Good for:

- Beginner-friendly buying flow
- Easy DNS management
- Usually includes domain privacy for many TLDs

Notes:

- Check renewal pricing carefully.
- Some optional upsells are not required for this project.

### Vercel Domains

Good for:

- Easiest setup if the website is hosted on Vercel
- Domain can be managed directly inside Vercel
- Less DNS setup work

Notes:

- Compare renewal price before buying.
- It may cost more than Cloudflare for some domains.

## How To Connect The Domain To Vercel

After buying the domain:

1. Open Vercel.
2. Go to the PlotTwist AI project.
3. Open:

   ```text
   Project Settings -> Domains -> Add Domain
   ```

4. Add the domain, for example:

   ```text
   plottwistai.com
   ```

5. Also add:

   ```text
   www.plottwistai.com
   ```

6. Vercel will show the DNS records you need to add at your domain registrar.

## DNS Records

Vercel may ask for records similar to these:

### Apex domain

For the root domain:

```text
plottwistai.com
```

Use an A record:

```text
Type: A
Name: @
Value: 76.76.21.21
```

### www subdomain

For:

```text
www.plottwistai.com
```

Use a CNAME record:

```text
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Always follow the exact values shown by Vercel, because Vercel may update instructions.

## Which Version Should Be Primary

Recommended:

```text
https://plottwistai.com
```

Then redirect:

```text
https://www.plottwistai.com
```

to:

```text
https://plottwistai.com
```

This keeps SEO clean because one domain becomes the canonical version.

## How To Check If It Worked

In Vercel:

- Go to `Project Settings -> Domains`.
- The domain should show as valid or configured.
- SSL should become active automatically.

In a browser:

- Open `https://plottwistai.com`.
- Open `https://www.plottwistai.com`.
- Confirm both load the same website.
- Confirm one version redirects to the preferred version if you configured a redirect.

Technical checks:

```bash
curl -I https://plottwistai.com
curl -I https://www.plottwistai.com
```

Expected result:

```text
HTTP/2 200
```

or a redirect such as:

```text
HTTP/2 308
```

## Code Changes After Domain Is Connected

This project uses one central site URL config:

```text
src/lib/siteConfig.js
```

When the final domain is ready, change:

```js
export const SITE_URL = "https://plottwist-ai-iota.vercel.app";
```

to:

```js
export const SITE_URL = "https://plottwistai.com";
```

Then run:

```bash
npm run build
```

The build updates:

- canonical URLs
- `sitemap.xml`
- `robots.txt`
- Open Graph URLs
- Twitter image URLs
- prerendered route metadata

Do not manually edit `sitemap.xml` or `robots.txt` unless you are intentionally bypassing the build script.

## Vercel Environment Variable

The current static MVP uses `src/lib/siteConfig.js` as the real source of truth.

For future Next.js or server-side versions, also set:

```text
NEXT_PUBLIC_SITE_URL=https://plottwistai.com
```

in Vercel:

```text
Project Settings -> Environment Variables
```

For the current version, changing `src/lib/siteConfig.js` and rebuilding is enough.

