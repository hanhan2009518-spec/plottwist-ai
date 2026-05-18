import { writeFileSync } from "node:fs";
import { SITE_URL, SITEMAP_PATHS } from "../src/lib/siteConfig.js";

const baseUrl = SITE_URL.replace(/\/+$/, "");

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`;

const sitemapUrls = SITEMAP_PATHS.map((path) => {
  const loc = `${baseUrl}${path === "/" ? "/" : path}`;
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
}).join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`;

writeFileSync("robots.txt", robots);
writeFileSync("sitemap.xml", sitemap);

console.log("SEO files generated from src/lib/siteConfig.js");
