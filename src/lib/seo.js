import { useEffect } from "react";
import { DEFAULT_KEYWORDS, OG_IMAGE, pageSeo, SITE_NAME, SITE_URL } from "./siteConfig.js";

export function normalizePath(path) {
  if (!path || path === "/index.html") return "/";
  const withoutHash = path.split("#")[0].split("?")[0] || "/";
  const withSlash = withoutHash.startsWith("/") ? withoutHash : `/${withoutHash}`;
  return withSlash.length > 1 ? withSlash.replace(/\/+$/, "") : "/";
}

export function canonicalUrl(path) {
  const cleanPath = normalizePath(path);
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  return `${baseUrl}${cleanPath === "/" ? "/" : cleanPath}`;
}

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
}

function upsertCanonical(url) {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }
  element.setAttribute("href", url);
}

export function applySeo(path) {
  const cleanPath = normalizePath(path);
  const seo = pageSeo[cleanPath] || pageSeo["/"];
  const url = canonicalUrl(cleanPath);

  document.title = seo.title;
  upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
  upsertMeta('meta[name="keywords"]', { name: "keywords", content: DEFAULT_KEYWORDS });
  upsertMeta('meta[name="robots"]', { name: "robots", content: "index, follow" });
  upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
  upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
  upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
  upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
  upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
  upsertMeta('meta[property="og:image"]', { property: "og:image", content: OG_IMAGE });
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: OG_IMAGE });
  upsertCanonical(url);
}

export function useSeo(path) {
  useEffect(() => {
    applySeo(path);
  }, [path]);
}
