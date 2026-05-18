import React, { useMemo, useState } from "react";
import htm from "htm";
import { Clipboard, Clapperboard, Crown, Eraser, Lock, RotateCcw, WandSparkles } from "lucide-react";
import { WaitlistSection } from "../components/WaitlistSection.js";
import { generateWithTemplate, generatorOptions } from "../lib/generator.js";
import { getProModeMessage, proModeState } from "../lib/proMode.js";

const html = htm.bind(React.createElement);
const STORY_LIMIT = 1000;

const initialForm = {
  storyIdea: "",
  genre: "School",
  length: "60 seconds",
  platform: "TikTok",
  mainCharacter: "Poor Student",
  relationship: "Best friends",
  mainConflict: "Betrayal",
  tone: "Shocking",
  endingType: "Plot Twist",
  language: "English",
  outputStyle: "Fast-paced short drama"
};

function Field({ label, value, options, onChange }) {
  const fieldId = label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return html`
    <div>
      <label className="text-sm font-bold text-white/78" htmlFor=${fieldId}>${label}</label>
      <select
        id=${fieldId}
        value=${value}
        onChange=${(event) => onChange(event.target.value)}
        className="focus-ring mt-2 min-h-11 w-full rounded-lg border border-white/10 bg-white px-3 text-sm font-bold text-slate-950"
      >
        ${options.map((option) => html`<option key=${option} value=${option}>${option}</option>`)}
      </select>
    </div>
  `;
}

function OutputBlock({ title, children }) {
  return html`
    <section className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
      <h3 className="text-xs font-extrabold uppercase tracking-[0.16em] text-lime-300">${title}</h3>
      <div className="mt-3 whitespace-pre-line text-sm leading-7 text-white/78">${children}</div>
    </section>
  `;
}

function formatResult(result) {
  if (!result) return "";

  return [
    `Title: ${result.title}`,
    `Hook: ${result.hook}`,
    `Story Idea: ${result.storyIdea}`,
    `Extracted Keywords: ${result.extractedKeywords.join(", ") || "None"}`,
    `Characters:\n${result.characters.map((item) => `- ${item}`).join("\n")}`,
    `Scene: ${result.scene}`,
    `Script:\n${result.script.map((item) => `- ${item}`).join("\n")}`,
    `Ending / Plot Twist: ${result.ending}`,
    `Caption: ${result.caption}`,
    `Hashtags: ${result.hashtags}`,
    `Production Notes:\n- Suggested shots: ${result.productionNotes.suggestedShots}\n- Music mood: ${result.productionNotes.musicMood}\n- Text overlay idea: ${result.productionNotes.textOverlayIdea}\n- Editing tip: ${result.productionNotes.editingTip}`
  ].join("\n\n");
}

function fallbackCopyText(text) {
  const fallback = document.createElement("textarea");
  fallback.value = text;
  fallback.setAttribute("readonly", "");
  fallback.style.position = "fixed";
  fallback.style.top = "-9999px";
  document.body.appendChild(fallback);
  fallback.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(fallback);
  return copied;
}

export function ScriptGeneratorPage() {
  const [activeMode, setActiveMode] = useState("template");
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formatted = useMemo(() => formatResult(result), [result]);
  const remaining = STORY_LIMIT - form.storyIdea.length;

  const isProMode = activeMode === "pro";
  const { usageLimit, aiModeEnabled, subscriptionStatus } = proModeState;

  function updateField(key, value) {
    if (key === "storyIdea" && value.length > STORY_LIMIT) return;
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function generateWithCurrentForm() {
    if (form.storyIdea.length > STORY_LIMIT) {
      setError("Story idea must be 1000 characters or less.");
      return;
    }

    setIsLoading(true);
    setError("");
    setCopyStatus("");

    window.setTimeout(() => {
      setResult(generateWithTemplate(form));
      setIsLoading(false);
    }, 350);
  }

  function generate(event) {
    event.preventDefault();
    generateWithCurrentForm();
  }

  function regenerate() {
    generateWithCurrentForm();
  }

  function clearForm() {
    setForm(initialForm);
    setResult(null);
    setError("");
    setCopyStatus("");
  }

  async function copyResult() {
    if (!result) {
      setError("Generate a script before copying.");
      return;
    }

    try {
      let copied = false;
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(formatted);
          copied = true;
        } catch {
          copied = false;
        }
      }

      if (!copied) {
        copied = fallbackCopyText(formatted);
      }

      if (!copied) throw new Error("Copy unavailable");
      setCopyStatus("Copied result.");
    } catch {
      setError("Copy failed. Select the result text manually.");
    }
  }

  return html`
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="max-w-4xl">
        <p className="inline-flex items-center gap-2 rounded-lg border border-lime-300/35 bg-lime-300/10 px-3 py-2 text-sm font-bold text-lime-300">
          <${Clapperboard} size=${16} />
          Free Template Mode available now
        </p>
        <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">Short Drama Script Generator</h1>
        <p className="mt-4 text-base leading-8 text-white/68">
          Describe your idea, choose a style, and generate a ready-to-use short drama script.
        </p>
      </section>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        <button
          className=${`focus-ring rounded-lg border p-5 text-left transition ${
            activeMode === "template" ? "border-lime-300 bg-lime-300/10" : "border-white/10 bg-white/[0.04] hover:border-white/25"
          }`}
          onClick=${() => setActiveMode("template")}
        >
          <span className="flex items-center gap-2 text-lg font-black"><${WandSparkles} size=${20} /> Free Template Mode</span>
          <span className="mt-2 block text-sm leading-6 text-white/65">
            Fast, free script generation using smart templates. Great for quick ideas and inspiration.
          </span>
        </button>
        <button
          className=${`focus-ring rounded-lg border p-5 text-left transition ${
            activeMode === "pro" ? "border-lime-300 bg-lime-300/10" : "border-white/10 bg-white/[0.04] hover:border-white/25"
          }`}
          onClick=${() => setActiveMode("pro")}
        >
          <span className="flex items-center gap-2 text-lg font-black"><${Crown} size=${20} /> Pro AI Mode</span>
          <span className="mt-2 block text-sm leading-6 text-white/65">
            Coming soon. Unlock real AI generation that understands your full story idea and creates more detailed scripts.
          </span>
        </button>
      </div>

      ${isProMode
        ? html`
            <section className="mt-6 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
              <div className="glass-panel rounded-lg p-6">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-lime-300 text-slate-950">
                  <${Lock} size=${24} />
                </div>
                <h2 className="mt-5 text-2xl font-black">Pro AI Mode is coming soon</h2>
                <p className="mt-3 text-sm leading-7 text-white/68">${getProModeMessage()}</p>
                <div className="mt-5 grid gap-3 text-sm text-white/70">
                  <p><strong className="text-white">isProMode:</strong> ${String(isProMode)}</p>
                  <p><strong className="text-white">usageLimit:</strong> ${usageLimit} free template generations placeholder</p>
                  <p><strong className="text-white">aiModeEnabled:</strong> ${String(aiModeEnabled)}</p>
                  <p><strong className="text-white">subscriptionStatus:</strong> ${subscriptionStatus}</p>
                </div>
              </div>
              <${WaitlistSection} compact=${true} />
            </section>
          `
        : html`
            <section className="mt-6 grid gap-6 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
              <form className="glass-panel rounded-lg p-4 sm:p-5" onSubmit=${generate}>
                <label className="text-sm font-bold text-white/78" htmlFor="story-idea">Your Story Idea</label>
                <textarea
                  id="story-idea"
                  value=${form.storyIdea}
                  maxLength=${STORY_LIMIT}
                  onInput=${(event) => updateField("storyIdea", event.target.value)}
                  placeholder="Example: A poor student finds out his best friend secretly paid the teacher to make him fail the exam."
                  className="focus-ring mt-2 min-h-40 w-full resize-y rounded-lg border border-white/10 bg-white px-3 py-3 text-sm font-semibold leading-6 text-slate-950 caret-slate-950 placeholder:text-slate-500"
                ></textarea>
                <div className="mt-2 flex items-center justify-between gap-3 text-xs text-white/55">
                  <span>Optional, but the result will follow your idea more closely when you add one.</span>
                  <span className=${remaining < 100 ? "font-bold text-amber-300" : "font-semibold text-white/60"}>${form.storyIdea.length}/${STORY_LIMIT}</span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <${Field} label="Genre" value=${form.genre} options=${generatorOptions.genre} onChange=${(value) => updateField("genre", value)} />
                  <${Field} label="Length" value=${form.length} options=${generatorOptions.length} onChange=${(value) => updateField("length", value)} />
                  <${Field} label="Platform" value=${form.platform} options=${generatorOptions.platform} onChange=${(value) => updateField("platform", value)} />
                  <${Field} label="Main Character" value=${form.mainCharacter} options=${generatorOptions.mainCharacter} onChange=${(value) => updateField("mainCharacter", value)} />
                  <${Field} label="Relationship" value=${form.relationship} options=${generatorOptions.relationship} onChange=${(value) => updateField("relationship", value)} />
                  <${Field} label="Main Conflict" value=${form.mainConflict} options=${generatorOptions.mainConflict} onChange=${(value) => updateField("mainConflict", value)} />
                  <${Field} label="Tone" value=${form.tone} options=${generatorOptions.tone} onChange=${(value) => updateField("tone", value)} />
                  <${Field} label="Ending Type" value=${form.endingType} options=${generatorOptions.endingType} onChange=${(value) => updateField("endingType", value)} />
                  <${Field} label="Language" value=${form.language} options=${generatorOptions.language} onChange=${(value) => updateField("language", value)} />
                  <${Field} label="Output Style" value=${form.outputStyle} options=${generatorOptions.outputStyle} onChange=${(value) => updateField("outputStyle", value)} />
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white">
                    <${WandSparkles} size=${18} />
                    ${isLoading ? "Generating..." : "Generate Script"}
                  </button>
                  <button type="button" onClick=${regenerate} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-lime-300/45 px-5 py-3 text-sm font-extrabold text-lime-300 transition hover:bg-lime-300 hover:text-slate-950">
                    <${RotateCcw} size=${17} />
                    Regenerate
                  </button>
                  <button type="button" onClick=${clearForm} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-lime-300 hover:text-lime-300">
                    <${Eraser} size=${17} />
                    Clear
                  </button>
                  <button type="button" onClick=${copyResult} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-lime-300">
                    <${Clipboard} size=${17} />
                    Copy Result
                  </button>
                </div>
                ${error && html`<p className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 p-3 text-sm font-semibold text-red-200">${error}</p>`}
                ${copyStatus && html`<p className="mt-4 rounded-lg border border-lime-300/30 bg-lime-300/10 p-3 text-sm font-semibold text-lime-300">${copyStatus}</p>`}
              </form>

              <section id="generated-result" className="glass-panel min-h-[620px] rounded-lg p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">Generated result</p>
                    <h2 className="mt-2 text-2xl font-black">Ready-to-use creator script</h2>
                  </div>
                  <button type="button" onClick=${copyResult} className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-lime-300">
                    <${Clipboard} size=${17} />
                    Copy Result
                  </button>
                </div>

                ${isLoading
                  ? html`<div className="mt-6 rounded-lg border border-white/10 bg-white/[0.055] p-6 text-sm leading-7 text-white/70">Generating a smarter template version from your idea and selected style...</div>`
                  : !result
                    ? html`
                        <div className="mt-6 rounded-lg border border-dashed border-white/18 bg-white/[0.035] p-8 text-center">
                          <p className="text-lg font-black text-white">No script generated yet</p>
                          <p className="mt-3 text-sm leading-7 text-white/62">Enter a story idea or choose options, then click Generate Script. The free mode will create a full script, caption, hashtags and production notes.</p>
                        </div>
                      `
                    : html`
                        <div className="mt-5 grid gap-4">
                          <${OutputBlock} title="Title"><p className="text-xl font-black text-white">${result.title}</p><//>
                          <${OutputBlock} title="Hook"><p>${result.hook}</p><//>
                          <${OutputBlock} title="Characters">
                            <ul className="list-disc space-y-2 pl-5">${result.characters.map((item) => html`<li key=${item}>${item}</li>`)}</ul>
                          <//>
                          <${OutputBlock} title="Scene"><p>${result.scene}</p><//>
                          <${OutputBlock} title="Script">
                            <ol className="list-decimal space-y-3 pl-5">${result.script.map((line) => html`<li key=${line}>${line}</li>`)}</ol>
                          <//>
                          <${OutputBlock} title="Ending / Plot Twist"><p>${result.ending}</p><//>
                          <${OutputBlock} title="Caption"><p>${result.caption}</p><//>
                          <${OutputBlock} title="Hashtags"><p className="break-words font-bold text-white">${result.hashtags}</p><//>
                          <${OutputBlock} title="Production Notes">
                            <ul className="list-disc space-y-2 pl-5">
                              <li><strong className="text-white">Suggested shots:</strong> ${result.productionNotes.suggestedShots}</li>
                              <li><strong className="text-white">Music mood:</strong> ${result.productionNotes.musicMood}</li>
                              <li><strong className="text-white">Text overlay idea:</strong> ${result.productionNotes.textOverlayIdea}</li>
                              <li><strong className="text-white">Editing tip:</strong> ${result.productionNotes.editingTip}</li>
                            </ul>
                          <//>
                        </div>
                      `}
              </section>
            </section>
          `}
    </main>
  `;
}
