import React, { useState } from "react";
import htm from "htm";
import { Mail } from "lucide-react";
import { submitEmailForm } from "../lib/emailService.js";

const html = htm.bind(React.createElement);

const creatorTypes = ["TikTok creator", "YouTube Shorts creator", "Student creator", "AI content creator", "Other"];

export function WaitlistSection({ compact = false }) {
  const [email, setEmail] = useState("");
  const [creatorType, setCreatorType] = useState(creatorTypes[0]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      await submitEmailForm({
        source: "Pro AI Mode waitlist",
        subject: "PlotTwist AI - Pro AI Mode waitlist",
        email,
        creatorType
      });
      setStatus("success");
      setMessage("Thanks for joining the waitlist. We will email you when Pro AI Mode is ready.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error.message || "Signup could not be sent. Please try again.");
    }
  }

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

      <form className="mt-5 grid gap-3 md:grid-cols-[1fr_220px_auto]" onSubmit=${handleSubmit}>
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
        <button disabled=${status === "loading"} className="focus-ring rounded-lg bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60">
          ${status === "loading" ? "Sending..." : "Join Waitlist"}
        </button>
      </form>
      ${message && html`<p className=${`mt-3 text-xs leading-5 ${status === "error" ? "text-rose-200" : "text-lime-200"}`}>${message}</p>`}
      <p className="mt-3 text-xs leading-5 text-white/52">Submissions are sent to the PlotTwist AI inbox.</p>
    </section>
  `;
}
