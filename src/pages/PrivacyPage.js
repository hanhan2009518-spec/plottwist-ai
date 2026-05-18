import React from "react";
import htm from "htm";

const html = htm.bind(React.createElement);

export function PrivacyPage() {
  return html`
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="glass-panel content-prose rounded-lg p-8 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Privacy Policy</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm font-semibold text-white/60">Last updated: May 18, 2026</p>
        <p className="mt-6">
          PlotTwist AI is a free MVP website that helps users generate short drama scripts, plot twists, character ideas, TikTok titles and meme captions.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-white">Information We Collect</h2>
        <p className="mt-4">
          The current version does not require user accounts, does not collect payment information, does not connect to a real AI API and does not save user-generated content.
        </p>
        <p className="mt-4">
          Some forms, such as contact or email signup areas, may appear as placeholders in this MVP. Unless a form is connected to a real service in a future version, submitted information is not stored by this site.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-white">Generated Content</h2>
        <p className="mt-4">
          Generated scripts, titles, captions and ideas are provided for creative reference only. Users are responsible for reviewing, editing and deciding how to use any generated content.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-white">Future Analytics, Cookies and Advertising</h2>
        <p className="mt-4">
          Future versions may use analytics tools such as Google Analytics, cookies, advertising networks, affiliate links, email signup tools and premium template services. If these features are added, this Privacy Policy should be updated to explain what data is collected and how it is used.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-white">Third-Party Links</h2>
        <p className="mt-4">
          PlotTwist AI may include links to third-party websites, tools or affiliate offers in the future. We are not responsible for the privacy practices of those third-party services.
        </p>
        <h2 className="mt-8 text-xl font-extrabold text-white">Contact</h2>
        <p className="mt-4">
          If you have questions about this Privacy Policy, contact us at
          <a className="text-lime-300 hover:text-white" href="mailto:hanhan2009518@gmail.com"> hanhan2009518@gmail.com</a>.
        </p>
      </section>
    </main>
  `;
}
