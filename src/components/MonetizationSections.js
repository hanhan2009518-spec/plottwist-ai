import React, { useState } from "react";
import htm from "htm";
import { BadgeDollarSign, Crown, Library, Mail } from "lucide-react";
import { FORM_ACTION, formReturnUrl } from "../lib/emailService.js";
import { routes } from "../lib/router.js";

const html = htm.bind(React.createElement);

const sections = [
  {
    title: "Affiliate Tools",
    description: "Reserved space for creator tools, editing apps, stock asset deals and creator software partnerships.",
    icon: BadgeDollarSign,
    accent: "text-lime-300"
  },
  {
    title: "Prompt Library",
    description: "Future library of repeatable prompts for romance, revenge, comedy, mystery and viral hooks.",
    icon: Library,
    accent: "text-cyan-300"
  },
  {
    title: "Premium Templates",
    description: "Reserved space for Pro AI Mode, premium prompt packs, advanced story structures and creator workflows.",
    icon: Crown,
    accent: "text-amber-300"
  }
];

export function MonetizationSections() {
  const [email, setEmail] = useState("");

  return html`
    <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        ${sections.map((item) => {
          const Icon = item.icon;
          return html`
            <div className="tool-card rounded-lg p-5" key=${item.title}>
              <${Icon} className=${item.accent} size=${24} />
              <h3 className="mt-4 text-lg font-bold">${item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">${item.description}</p>
              ${item.title === "Prompt Library" &&
              html`<a className="focus-ring mt-4 inline-flex rounded-md text-sm font-bold text-lime-300 hover:text-white" href=${routes.promptLibrary}>Open page</a>`}
              ${item.title === "Premium Templates" &&
              html`<a className="focus-ring mt-4 inline-flex rounded-md text-sm font-bold text-lime-300 hover:text-white" href=${routes.premiumTemplates}>Open page</a>`}
            </div>
          `;
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_.85fr]">
        <div className="glass-panel rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-slate-950">
              <${Mail} size=${22} />
            </span>
            <div>
              <h3 className="text-xl font-extrabold">Email Signup</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                A live signup block for launch updates, prompt drops, Pro AI Mode and premium template releases.
              </p>
            </div>
          </div>
        </div>

        <form className="glass-panel rounded-lg p-4" action=${FORM_ACTION} method="POST">
          <input type="hidden" name="_subject" value="PlotTwist AI - Homepage email signup" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value=${formReturnUrl("/?signup=joined")} />
          <input type="text" name="_honey" tabIndex="-1" autoComplete="off" className="hidden" />
          <input type="hidden" name="source" value="Homepage email signup" />
          <input type="hidden" name="interest" value="Launch updates, prompt drops, Pro AI Mode and premium templates" />
          <input type="hidden" name="website" value="PlotTwist AI" />
          <label className="text-sm font-semibold text-white/80" htmlFor="email-signup">Creator email</label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="email-signup"
              name="email"
              type="email"
              required
              value=${email}
              onInput=${(event) => setEmail(event.target.value)}
              placeholder="creator@example.com"
              className="focus-ring min-h-11 flex-1 rounded-lg border border-white/10 bg-white px-3 text-slate-950 placeholder:text-slate-500"
            />
            <button className="focus-ring rounded-lg bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white">
              Join list
            </button>
          </div>
          <p className="mt-3 text-xs leading-5 text-white/52">Submissions are sent to the PlotTwist AI inbox.</p>
        </form>
      </div>
    </section>
  `;
}
