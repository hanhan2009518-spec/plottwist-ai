import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { DEFAULT_KEYWORDS, OG_IMAGE, pageSeo, SITE_NAME, SITE_URL, SITEMAP_PATHS } from "../src/lib/siteConfig.js";

await import("./sync_seo_files.mjs");

const root = resolve(".");
const dist = resolve(root, "dist");
const filesToCopy = ["src", "public", "robots.txt", "sitemap.xml"];

if (existsSync(dist)) {
  rmSync(dist, { recursive: true, force: true });
}

mkdirSync(dist, { recursive: true });

for (const file of filesToCopy) {
  const source = resolve(root, file);
  if (existsSync(source)) {
    cpSync(source, resolve(dist, file), { recursive: true });
  }
}

function cleanSiteUrl() {
  return SITE_URL.replace(/\/+$/, "");
}

function normalizePath(path) {
  if (!path || path === "/index.html") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : "/";
}

function canonicalUrl(path) {
  const cleanPath = normalizePath(path);
  return `${cleanSiteUrl()}${cleanPath === "/" ? "/" : cleanPath}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function injectSeo(html, path) {
  const cleanPath = normalizePath(path);
  const seo = pageSeo[cleanPath] || pageSeo["/"];
  const url = canonicalUrl(cleanPath);
  const replacements = [
    [/<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`],
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s, `<meta name="description" content="${escapeHtml(seo.description)}" />`],
    [/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/s, `<meta name="keywords" content="${escapeHtml(DEFAULT_KEYWORDS)}" />`],
    [/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/s, `<link rel="canonical" href="${escapeHtml(url)}" />`],
    [/<meta\s+property="og:site_name"\s+content="[^"]*"\s*\/?>/s, `<meta property="og:site_name" content="${escapeHtml(SITE_NAME)}" />`],
    [/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/s, `<meta property="og:title" content="${escapeHtml(seo.title)}" />`],
    [/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/s, `<meta property="og:description" content="${escapeHtml(seo.description)}" />`],
    [/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/s, `<meta property="og:url" content="${escapeHtml(url)}" />`],
    [/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/s, `<meta property="og:image" content="${escapeHtml(OG_IMAGE)}" />`],
    [/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/s, `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`],
    [/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/s, `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`],
    [/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/s, `<meta name="twitter:image" content="${escapeHtml(OG_IMAGE)}" />`]
  ];

  return replacements.reduce((output, [pattern, replacement]) => output.replace(pattern, replacement), html);
}

const template = readFileSync(resolve(root, "index.html"), "utf-8");

for (const path of SITEMAP_PATHS) {
  const cleanPath = normalizePath(path);
  const target = cleanPath === "/" ? resolve(dist, "index.html") : resolve(dist, cleanPath.slice(1), "index.html");
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, injectSeo(template, cleanPath));
}

console.log(`Static build created in dist/ with ${SITEMAP_PATHS.length} prerendered routes.`);
