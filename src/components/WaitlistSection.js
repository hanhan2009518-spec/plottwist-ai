import React, { useState } from "react";
import htm from "htm";
import { Mail } from "lucide-react";
import { FORM_ACTION, WEB3FORMS_ACCESS_KEY, formReturnUrl } from "../lib/emailService.js";

const html = htm.bind(React.createElement);

const creatorTypes = ["TikTok creator", "YouTube Shorts creator", "Student creator", "AI content creator", "Other"];

export function WaitlistSection({ compact = false }) {
  const [email, setEmail] = useState("");
  const [creatorType, setCreatorType] = useState(creatorTypes[0]);

  return html`
    <section className=${compact ? "rounded-lg border border-white/10 bg-white/[0.055] p-5" : "glass-panel rounded-lg p-6 sm:p-8"}>
      <div className="flex items-start gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-lime-300 text-slate-950">
          <${Mail} size=${22} />
        </span>
        <div>
          <h2 className=${compact ? "text-xl font-black" : "text-2xl font-black"}>Join the Pro AI Mode waitlist</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">
            Be notified when real AI generation, paid plans and premium templates are ready.
          </p>
        </div>
      </div>

      <form className="mt-5 grid gap-3 md:grid-cols-[1fr_220px_auto]" action=${FORM_ACTION} method="POST">
        <input type="hidden" name="access_key" value=${WEB3FORMS_ACCESS_KEY} />
        <input type="hidden" name="subject" value="PlotTwist AI - Pro AI Mode waitlist" />
        <input type="hidden" name="from_name" value="PlotTwist AI" />
        <input type="hidden" name="redirect" value=${formReturnUrl("/?waitlist=joined")} />
        <input type="checkbox" name="botcheck" tabIndex="-1" autoComplete="off" className="hidden" style=${{ display: "none" }} />
        <input type="hidden" name="source" value="Pro AI Mode waitlist" />
        <input type="hidden" name="website" value="PlotTwist AI" />
        <input
          name="email"
          type="email"
          required
          value=${email}
          onInput=${(event) => setEmail(event.target.value)}
          placeholder="creator@example.com"
          className="focus-ring min-h-12 rounded-lg border border-white/10 bg-white px-3 text-sm font-semibold text-slate-950 placeholder:text-slate-500"
        />
        <select
          name="creatorType"
          value=${creatorType}
          onChange=${(event) => setCreatorType(event.target.value)}
          className="focus-ring min-h-12 rounded-lg border border-white/10 bg-white px-3 text-sm font-semibold text-slate-950"
        >
          ${creatorTypes.map((type) => html`<option key=${type} value=${type}>${type}</option>`)}
        </select>
        <button className="focus-ring rounded-lg bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white">
          Join Waitlist
        </button>
      </form>
      <p className="mt-3 text-xs leading-5 text-white/52">Submissions are sent to the PlotTwist AI inbox.</p>
    </section>
  `;
}
