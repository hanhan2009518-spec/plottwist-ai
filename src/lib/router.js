import { useEffect, useState } from "react";
import { normalizePath } from "./seo.js";

export const routes = {
  home: "/",
  script: "/short-drama-script-generator",
  twist: "/plot-twist-generator",
  character: "/character-generator",
  title: "/tiktok-title-generator",
  meme: "/meme-caption-generator",
  promptLibrary: "/prompt-library",
  premiumTemplates: "/premium-templates",
  blog: "/blog",
  about: "/about",
  contact: "/contact",
  privacy: "/privacy-policy",
  terms: "/terms-of-use"
};

export const toolLinks = [
  {
    title: "Short Drama Script Generator",
    description: "Generate hooks, scenes, dialogue, twists, captions and hashtags.",
    href: routes.script,
    accent: "from-violet-500 to-fuchsia-500",
    status: "Ready"
  },
  {
    title: "Plot Twist Generator",
    description: "Create unexpected reveals and cliffhangers for short videos.",
    href: routes.twist,
    accent: "from-cyan-400 to-blue-500",
    status: "Soon"
  },
  {
    title: "Character Generator",
    description: "Build dramatic character profiles, secrets and motivations.",
    href: routes.character,
    accent: "from-rose-400 to-orange-400",
    status: "Soon"
  },
  {
    title: "TikTok Title Generator",
    description: "Draft short, clickable titles for drama, comedy and reveal clips.",
    href: routes.title,
    accent: "from-lime-300 to-emerald-400",
    status: "Soon"
  },
  {
    title: "Meme Caption Generator",
    description: "Turn messy story moments into shareable captions.",
    href: routes.meme,
    accent: "from-amber-300 to-pink-400",
    status: "Soon"
  }
];

export function getCurrentPath() {
  if (window.location.hash.startsWith("#/")) {
    return normalizePath(window.location.hash.slice(1));
  }

  return normalizePath(window.location.pathname);
}

export function navigateTo(path) {
  const cleanPath = normalizePath(path);
  window.history.pushState({}, "", cleanPath);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function useAppRoute() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    if (window.location.hash.startsWith("#/")) {
      window.history.replaceState({}, "", getCurrentPath());
    }

    const onRouteChange = () => {
      setPath(getCurrentPath());
      if (typeof window.scrollTo === "function") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    };

    const onDocumentClick = (event) => {
      const link = event.target.closest?.("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      const target = link.getAttribute("target");
      if (!href || target || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      navigateTo(url.pathname);
    };

    const onHashChange = () => {
      if (window.location.hash.startsWith("#/")) {
        onRouteChange();
      }
    };

    window.addEventListener("popstate", onRouteChange);
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onDocumentClick);

    return () => {
      window.removeEventListener("popstate", onRouteChange);
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onDocumentClick);
    };
  }, []);

  return path;
}
