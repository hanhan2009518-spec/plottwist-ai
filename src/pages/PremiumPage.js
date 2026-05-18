import React from "react";
import htm from "htm";
import { ArrowRight, Check, Crown, Sparkles } from "lucide-react";
import { WaitlistSection } from "../components/WaitlistSection.js";
import { routes } from "../lib/router.js";

const html = htm.bind(React.createElement);

const plans = [
  {
    name: "Free",
    price: "$0",
    note: "Available now",
    cta: "Use Free Generator",
    href: routes.script,
    active: true,
    features: ["Smart template generator", "Basic script output", "Copy result", "Prompt library access"]
  },
  {
    name: "Creator",
    price: "$5/month",
    note: "Suggested price",
    cta: "Coming Soon",
    href: "#pro-waitlist",
    active: false,
    features: [
      "Real AI script generation",
      "Better understanding of your story idea",
      "Longer scripts",
      "More plot twist options",
      "Production notes"
    ]
  },
  {
    name: "Pro",
    price: "$9/month",
    note: "Suggested price",
    cta: "Coming Soon",
    href: "#pro-waitlist",
    active: false,
    features: [
      "More monthly AI generations",
      "Advanced script styles",
      "Bilingual output",
      "Premium prompt packs",
      "Priority new features"
    ]
  }
];

function PlanCard({ plan }) {
  return html`
    <article className=${`rounded-lg border p-5 ${
      plan.active ? "border-lime-300/45 bg-lime-300/10" : "border-white/10 bg-white/[0.045]"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-black">${plan.name}</h2>
          <p className="mt-2 text-sm font-semibold text-white/55">${plan.note}</p>
        </div>
        ${plan.active && html`<span className="rounded-md bg-lime-300 px-2 py-1 text-xs font-black text-slate-950">Now</span>`}
      </div>
      <p className="mt-5 text-3xl font-black text-white">${plan.price}</p>
      <ul className="mt-5 space-y-3">
        ${plan.features.map((feature) => html`
          <li key=${feature} className="flex gap-3 text-sm leading-6 text-white/72">
            <${Check} className="mt-1 shrink-0 text-lime-300" size=${16} />
            <span>${feature}</span>
          </li>
        `)}
      </ul>
      <a
        href=${plan.href}
        className=${`focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-extrabold transition ${
          plan.active ? "bg-lime-300 text-slate-950 hover:bg-white" : "border border-white/15 text-white hover:border-lime-300 hover:text-lime-300"
        }`}
      >
        ${plan.cta}
        <${ArrowRight} size=${16} />
      </a>
    </article>
  `;
}

export function PremiumPage() {
  return html`
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-lg border border-lime-300/35 bg-lime-300/10 px-3 py-2 text-sm font-bold text-lime-300">
            <${Crown} size=${16} />
            Pro AI Mode coming soon
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">PlotTwist AI Pro</h1>
          <p className="mt-5 text-xl font-semibold leading-8 text-white">
            Unlock AI-powered short drama generation for creators.
          </p>
          <p className="mt-4 text-sm leading-7 text-white/65">
            The free smart template generator is available now. Creator and Pro plans are UI previews only until real AI generation, subscriptions and secure server-side billing are added.
          </p>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-3">
          ${plans.map((plan) => html`<${PlanCard} key=${plan.name} plan=${plan} />`)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-lg p-6">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-lime-300">
                <${Sparkles} size=${16} />
                Templates Pack
              </p>
              <h2 className="mt-3 text-2xl font-black">100 AI Short Drama Prompts</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                A future one-time prompt pack for creators who want repeatable short drama ideas, hooks, reversals and episode structures.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-5 text-left md:min-w-60">
              <p className="text-sm font-semibold text-white/55">Suggested price</p>
              <p className="mt-2 text-3xl font-black">$12 one-time</p>
              <a
                href="#pro-waitlist"
                className="focus-ring mt-5 inline-flex w-full items-center justify-center rounded-lg border border-white/15 px-4 py-3 text-sm font-extrabold text-white transition hover:border-lime-300 hover:text-lime-300"
              >
                Coming Soon
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="pro-waitlist">
        <${WaitlistSection} />
      </div>
    </main>
  `;
}
