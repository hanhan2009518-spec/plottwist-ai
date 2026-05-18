import React from "react";
import htm from "htm";

const html = htm.bind(React.createElement);

export function AboutPage() {
  return html`
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="glass-panel content-prose rounded-lg p-8 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">About</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">About PlotTwist AI</h1>
        <p className="mt-6">
          <strong>PlotTwist AI</strong> is a free tool website for creators who need fast short drama ideas, punchy hooks, plot twists, character setups and viral short-video titles.
        </p>
        <p className="mt-4">
          This MVP uses local front-end templates instead of a live AI API. The goal is to test the product direction, page structure and creator workflow before adding real model generation.
        </p>
        <p className="mt-4">
          The first working tool is the Short Drama Script Generator. Other tools are reserved as full pages so the site can expand without changing the navigation structure.
        </p>
      </section>
    </main>
  `;
}
