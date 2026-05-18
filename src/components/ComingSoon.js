import React from "react";
import htm from "htm";
import { ArrowLeft, Sparkles } from "lucide-react";
import { routes } from "../lib/router.js";

const html = htm.bind(React.createElement);

export function ComingSoon({ title, description }) {
  return html`
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="glass-panel rounded-lg p-8 sm:p-10">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-lime-300 text-slate-950">
          <${Sparkles} size=${24} />
        </span>
        <p className="mt-6 text-sm font-bold tracking-[0.18em] text-lime-300">Coming soon.</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">${title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">${description}</p>
        <a
          href=${routes.home}
          className="focus-ring mt-8 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:border-lime-300 hover:text-lime-300"
        >
          <${ArrowLeft} size=${17} />
          Back home
        </a>
      </div>
    </main>
  `;
}
