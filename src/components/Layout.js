import React, { useState } from "react";
import htm from "htm";
import { Menu, Sparkles, X } from "lucide-react";
import { routes } from "../lib/router.js";

const html = htm.bind(React.createElement);

const navLinks = [
  ["Home", routes.home],
  ["Script Generator", routes.script],
  ["Prompt Library", routes.promptLibrary],
  ["Blog", routes.blog],
  ["About", routes.about],
  ["Contact", routes.contact]
];

export function Layout({ children, path }) {
  const [open, setOpen] = useState(false);

  const nav = html`
    <nav className="flex flex-col gap-2 md:flex-row md:items-center md:gap-1">
      ${navLinks.map(([label, href]) => {
        const active = path === href.replace("#", "") || (href === routes.blog && path.startsWith("/blog/"));
        return html`
          <a
            key=${href}
            href=${href}
            onClick=${() => setOpen(false)}
            className=${`focus-ring rounded-lg px-3 py-2 text-sm font-semibold transition ${
              active ? "bg-white text-slate-950" : "text-white/72 hover:bg-white/10 hover:text-white"
            }`}
          >
            ${label}
          </a>
        `;
      })}
    </nav>
  `;

  return html`
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="noise-layer pointer-events-none absolute inset-0"></div>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/82 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href=${routes.home} className="focus-ring flex items-center gap-3 rounded-lg">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-lime-300 text-slate-950">
              <${Sparkles} size=${21} strokeWidth=${2.6} />
            </span>
            <span>
              <span className="block text-base font-black leading-none tracking-tight">PlotTwist AI</span>
              <span className="block text-xs font-semibold text-white/50">Free creator toolkit</span>
            </span>
          </a>

          <div className="hidden md:block">${nav}</div>

          <button
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
            onClick=${() => setOpen(!open)}
            aria-label=${open ? "Close menu" : "Open menu"}
          >
            ${open ? html`<${X} size=${22} />` : html`<${Menu} size=${22} />`}
          </button>
        </div>

        ${open &&
        html`
          <div className="border-t border-white/10 px-4 pb-4 pt-2 md:hidden">
            ${nav}
          </div>
        `}
      </header>

      ${children}

      <footer className="mx-auto mt-20 max-w-6xl border-t border-white/10 px-4 py-8 text-sm text-white/55 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 PlotTwist AI. Built for short drama creators.</p>
          <div className="flex flex-wrap gap-4">
            <a className="focus-ring rounded-md hover:text-white" href=${routes.promptLibrary}>Prompt Library</a>
            <a className="focus-ring rounded-md hover:text-white" href=${routes.blog}>Blog</a>
            <a className="focus-ring rounded-md hover:text-white" href=${routes.premiumTemplates}>Premium Templates</a>
            <a className="focus-ring rounded-md hover:text-white" href=${routes.about}>About</a>
            <a className="focus-ring rounded-md hover:text-white" href=${routes.contact}>Contact</a>
            <a className="focus-ring rounded-md hover:text-white" href=${routes.privacy}>Privacy Policy</a>
            <a className="focus-ring rounded-md hover:text-white" href=${routes.terms}>Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  `;
}
