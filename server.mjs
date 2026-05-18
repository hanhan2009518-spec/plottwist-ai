import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { createServer } from "node:http";
import { DEFAULT_KEYWORDS, OG_IMAGE, pageSeo, SITE_NAME, SITE_URL, SITEMAP_PATHS } from "./src/lib/siteConfig.js";

const root = resolve(".");
const port = Number(process.env.PORT || 4173);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

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

function sitemapXml() {
  const baseUrl = cleanSiteUrl();
  const urls = SITEMAP_PATHS.map((path) => {
    const loc = `${baseUrl}${path === "/" ? "/" : path}`;
    return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function robotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${cleanSiteUrl()}/sitemap.xml\n`;
}

function resolveFile(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  const candidate = resolve(root, cleanPath || "index.html");

  if (!candidate.startsWith(root)) {
    return null;
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }

  return join(root, "index.html");
}

createServer((request, response) => {
  const pathname = decodeURIComponent((request.url || "/").split("?")[0]);

  if (pathname === "/robots.txt") {
    response.writeHead(200, {
      "Content-Type": contentTypes[".txt"],
      "Cache-Control": "no-store"
    });
    response.end(robotsTxt());
    return;
  }

  if (pathname === "/sitemap.xml") {
    response.writeHead(200, {
      "Content-Type": contentTypes[".xml"],
      "Cache-Control": "no-store"
    });
    response.end(sitemapXml());
    return;
  }

  if (pathname === "/api/generate-ai") {
    response.writeHead(501, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(
      JSON.stringify({
        error: "Pro AI Mode is coming soon.",
        message: "This placeholder route does not call OpenAI. Add a secure server implementation before enabling real AI generation."
      })
    );
    return;
  }

  const filePath = resolveFile(request.url || "/");

  if (!filePath) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  const type = contentTypes[extname(filePath)] || "application/octet-stream";

  if (filePath === join(root, "index.html")) {
    const html = injectSeo(readFileSync(filePath, "utf-8"), pathname);
    response.writeHead(200, {
      "Content-Type": contentTypes[".html"],
      "Cache-Control": "no-store"
    });
    response.end(html);
    return;
  }

  response.writeHead(200, {
    "Content-Type": type,
    "Cache-Control": "no-store"
  });
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`PlotTwist AI is running at http://localhost:${port}`);
});
