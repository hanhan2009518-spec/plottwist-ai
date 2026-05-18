import React from "react";
import htm from "htm";
import { ArrowRight, Clapperboard, Copy, Crown, Layers, Play, Sparkles, TextCursorInput, WandSparkles } from "lucide-react";
import { ToolCard } from "../components/ToolCard.js";
import { MonetizationSections } from "../components/MonetizationSections.js";
import { WaitlistSection } from "../components/WaitlistSection.js";
import { routes, toolLinks } from "../lib/router.js";

const html = htm.bind(React.createElement);

export function HomePage() {
  return html`
    <main>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-10 pt-10 sm:px-6 md:grid-cols-[1.02fr_.98fr] md:items-center lg:px-8 lg:pt-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-lg border border-lime-300/35 bg-lime-300/10 px-3 py-2 text-sm font-bold text-lime-300">
            <${Sparkles} size=${16} />
            Free Template Mode available now
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
            PlotTwist AI
          </h1>
          <p className="mt-5 max-w-2xl text-xl font-semibold leading-8 text-white">
            Turn simple ideas into short drama scripts, plot twists, characters, captions and production notes.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
            PlotTwist AI helps creators write faster for TikTok, YouTube Shorts, Instagram Reels, Douyin and Xiaohongshu. Use the free smart template generator now, then join the waitlist for Pro AI Mode when real AI generation launches.
          </p>

          <div className="mt-6 grid max-w-2xl grid-cols-3 gap-2 text-center sm:gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3">
              <p className="text-lg font-black text-white">Free</p>
              <p className="mt-1 text-xs font-semibold text-white/55">Template Mode</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3">
              <p className="text-lg font-black text-white">Idea</p>
              <p className="mt-1 text-xs font-semibold text-white/55">input ready</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3">
              <p className="text-lg font-black text-white">Pro</p>
              <p className="mt-1 text-xs font-semibold text-white/55">coming soon</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href=${routes.script}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white"
            >
              <${Clapperboard} size=${18} />
              Try Free Generator
              <${ArrowRight} size=${17} />
            </a>
            <a
              href="#pro-waitlist"
              className="focus-ring inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-lime-300 hover:text-lime-300"
            >
              Join Pro Waitlist
            </a>
          </div>
        </div>

        <div className="relative">
          <img
            src="/public/visuals/creator-board.png"
            alt="A cinematic creator dashboard with short drama script cards and social video title ideas"
            className="w-full rounded-lg border border-white/12 shadow-glow"
          />
          <div className="absolute inset-x-3 bottom-3 rounded-lg border border-white/12 bg-black/68 p-3 backdrop-blur sm:inset-x-4 sm:bottom-4 sm:p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-lime-300">Creator workflow</p>
                <p className="mt-1 text-sm font-black text-white">Idea → Script → Twist → Caption → Notes</p>
              </div>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lime-300 text-slate-950">
                <${Play} size=${17} fill="currentColor" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="glass-panel rounded-lg p-5">
            <${TextCursorInput} className="text-lime-300" size=${24} />
            <h3 className="mt-4 text-lg font-extrabold">Start with your own idea</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">Paste a plot seed, secret, conflict or character setup and steer the whole result.</p>
          </div>
          <div className="glass-panel rounded-lg p-5">
            <${WandSparkles} className="text-cyan-300" size=${24} />
            <h3 className="mt-4 text-lg font-extrabold">Generate creator-ready output</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">Get title, hook, characters, scene, script, twist, caption, hashtags and production notes.</p>
          </div>
          <div className="glass-panel rounded-lg p-5">
            <${Crown} className="text-amber-300" size=${24} />
            <h3 className="mt-4 text-lg font-extrabold">Pro AI Mode next</h3>
            <p className="mt-2 text-sm leading-6 text-white/62">The future paid mode is reserved for deeper AI scripts, longer outputs and better story understanding.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[.95fr_1.05fr]">
          <div className="glass-panel rounded-lg p-6">
            <${Layers} className="text-lime-300" size=${24} />
            <h2 className="mt-4 text-2xl font-black tracking-tight">Free today, AI-powered later</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">
              The current MVP uses a richer Template Mode with story idea input, keyword extraction and randomized creator templates. Pro AI Mode is planned for users who want real AI generation, longer scripts and premium workflows.
            </p>
            <a
              href=${routes.premiumTemplates}
              className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:border-lime-300 hover:text-lime-300"
            >
              View Pro plans
              <${ArrowRight} size=${16} />
            </a>
          </div>
          <div className="glass-panel rounded-lg p-6">
            <${Copy} className="text-cyan-300" size=${24} />
            <h2 className="mt-4 text-2xl font-black tracking-tight">Built for short video workflow</h2>
            <p className="mt-3 text-sm leading-7 text-white/65">
              Generate short drama scripts, plot twists, character setups, captions and production notes that can be copied into a filming plan or editing checklist.
            </p>
            <a
              href="#tools"
              className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:border-lime-300 hover:text-lime-300"
            >
              Browse tools
              <${ArrowRight} size=${16} />
            </a>
          </div>
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Creator tools</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Choose a generator</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/62">
            Start with the live script generator, then expand into twist ideas, character profiles, title hooks and meme captions as the product grows.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          ${toolLinks.map((tool) => html`<${ToolCard} key=${tool.title} tool=${tool} />`)}
        </div>
      </section>

      <${MonetizationSections} />
      <div id="pro-waitlist">
        <${WaitlistSection} />
      </div>
    </main>
  `;
}
