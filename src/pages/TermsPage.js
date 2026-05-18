import React from "react";
import htm from "htm";

const html = htm.bind(React.createElement);

export function TermsPage() {
  return html`
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="glass-panel content-prose rounded-lg p-8 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Terms</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Terms of Use</h1>
        <p className="mt-4 text-sm font-semibold text-white/60">Last updated: May 18, 2026</p>
        <p className="mt-6">
          PlotTwist AI is a free MVP website for generating short drama scripts, plot twists, character ideas, TikTok titles and meme captions.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-white">Use of the Website</h2>
        <p className="mt-4">
          You may use PlotTwist AI for personal or commercial creative projects, subject to these Terms. The current version does not require login, does not collect payment information and does not connect to a real AI API.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-white">Generated Content</h2>
        <p className="mt-4">
          Generated content is provided for creative reference only. You are responsible for reviewing, editing and deciding whether generated scripts, titles, captions or ideas are appropriate for your use.
        </p>
        <p className="mt-4">
          You should not publish content that violates laws, platform rules, third-party rights or the rights of real people, brands or copyrighted works.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-white">No Guarantees</h2>
        <p className="mt-4">
          PlotTwist AI is provided as-is. We do not guarantee that generated content will be original, accurate, suitable for every platform or free from errors.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-white">Future Features</h2>
        <p className="mt-4">
          Future versions may include Google Analytics, cookies, ads, affiliate links, email signup, premium templates, payments or real AI generation. Additional terms may apply when those features are added.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-white">Contact</h2>
        <p className="mt-4">
          If you have questions about these Terms, contact us at
          <a className="text-lime-300 hover:text-white" href="mailto:hanhan2009518@gmail.com"> hanhan2009518@gmail.com</a>.
        </p>
      </section>
    </main>
  `;
}
