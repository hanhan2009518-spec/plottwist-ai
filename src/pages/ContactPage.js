import React, { useState } from "react";
import htm from "htm";
import { Send } from "lucide-react";

const html = htm.bind(React.createElement);

export function ContactPage() {
  const [sent, setSent] = useState(false);

  function submit(event) {
    event.preventDefault();
    setSent(true);
  }

  return html`
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-lg p-8 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Contact</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Contact PlotTwist AI</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
          This form is a front-end placeholder for the MVP. For now, you can contact us at
          <a className="font-bold text-lime-300 hover:text-white" href="mailto:hanhan2009518@gmail.com"> hanhan2009518@gmail.com</a>.
        </p>

        <form className="mt-8 grid gap-4" onSubmit=${submit}>
          <label>
            <span className="text-sm font-bold text-white/78">Name</span>
            <input className="focus-ring mt-2 min-h-12 w-full rounded-lg border border-white/10 bg-white px-3 text-slate-950" placeholder="Your name" />
          </label>
          <label>
            <span className="text-sm font-bold text-white/78">Email</span>
            <input type="email" className="focus-ring mt-2 min-h-12 w-full rounded-lg border border-white/10 bg-white px-3 text-slate-950" placeholder="you@example.com" />
          </label>
          <label>
            <span className="text-sm font-bold text-white/78">Message</span>
            <textarea className="focus-ring mt-2 min-h-32 w-full rounded-lg border border-white/10 bg-white px-3 py-3 text-slate-950" placeholder="What should PlotTwist AI generate next?"></textarea>
          </label>
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white sm:w-max">
            <${Send} size=${17} />
            Send message
          </button>
          ${sent && html`<p className="text-sm font-semibold text-lime-300">Demo message captured in the UI. No data was sent.</p>`}
        </form>
      </section>
    </main>
  `;
}
