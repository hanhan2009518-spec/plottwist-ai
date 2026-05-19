import React, { useState } from "react";
import htm from "htm";
import { Send } from "lucide-react";
import { CONTACT_EMAIL, FORM_ACTION, formReturnUrl } from "../lib/emailService.js";

const html = htm.bind(React.createElement);

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return html`
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-lg p-8 sm:p-10">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Contact</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Contact PlotTwist AI</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
          Send feedback, partnership ideas or creator tool requests. You can also email us directly at
          <a className="font-bold text-lime-300 hover:text-white" href=${`mailto:${CONTACT_EMAIL}`}> ${CONTACT_EMAIL}</a>.
        </p>

        <form className="mt-8 grid gap-4" action=${FORM_ACTION} method="POST">
          <input type="hidden" name="_subject" value="PlotTwist AI - Contact form" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value=${formReturnUrl("/contact?message=sent")} />
          <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="hidden" />
          <input type="hidden" name="_replyto" value=${form.email} />
          <input type="hidden" name="source" value="Contact form" />
          <input type="hidden" name="website" value="PlotTwist AI" />
          <label>
            <span className="text-sm font-bold text-white/78">Name</span>
            <input
              name="name"
              value=${form.name}
              onInput=${(event) => updateField("name", event.target.value)}
              className="focus-ring mt-2 min-h-12 w-full rounded-lg border border-white/10 bg-white px-3 text-slate-950"
              placeholder="Your name"
            />
          </label>
          <label>
            <span className="text-sm font-bold text-white/78">Email</span>
            <input
              name="email"
              type="email"
              required
              value=${form.email}
              onInput=${(event) => updateField("email", event.target.value)}
              className="focus-ring mt-2 min-h-12 w-full rounded-lg border border-white/10 bg-white px-3 text-slate-950"
              placeholder="you@example.com"
            />
          </label>
          <label>
            <span className="text-sm font-bold text-white/78">Message</span>
            <textarea
              name="message"
              required
              value=${form.message}
              onInput=${(event) => updateField("message", event.target.value)}
              className="focus-ring mt-2 min-h-32 w-full rounded-lg border border-white/10 bg-white px-3 py-3 text-slate-950"
              placeholder="What should PlotTwist AI generate next?"
            ></textarea>
          </label>
          <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white sm:w-max">
            <${Send} size=${17} />
            Send message
          </button>
          <p className="text-xs leading-5 text-white/52">Submissions are sent to the PlotTwist AI inbox. The first test may ask the site owner to confirm the email address.</p>
        </form>
      </section>
    </main>
  `;
}
