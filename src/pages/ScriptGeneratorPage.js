import React, { useMemo, useState } from "react";
import htm from "htm";
import { Clipboard, Clapperboard, Crown, Eraser, Lock, RotateCcw, WandSparkles } from "lucide-react";
import { WaitlistSection } from "../components/WaitlistSection.js";
import { generateWithTemplate, generatorOptions } from "../lib/generator.js";
import { generateWithAI, getProModeMessage, proModeState } from "../lib/proMode.js";

const html = htm.bind(React.createElement);
const STORY_LIMIT = 1000;

const simpleOptions = {
  genre: ["School", "Romance", "Mystery", "Revenge", "Comedy", "Sci-Fi"],
  length: ["30 seconds", "60 seconds", "90 seconds"],
  tone: ["Shocking", "Funny", "Romantic", "Suspenseful", "Emotional"],
  endingType: ["Plot Twist", "Happy Ending", "Sad Ending", "Cliffhanger"]
};

const simpleDefaults = {
  genre: "School",
  length: "60 seconds",
  tone: "Shocking",
  endingType: "Plot Twist",
  platform: "TikTok",
  language: "English",
  outputStyle: "Fast-paced short drama"
};

const initialForm = {
  storyIdea: "",
  genre: "School",
  length: "60 seconds",
  platform: "TikTok",
  mainCharacter: "Student",
  relationship: "Best friends",
  mainConflict: "Betrayal",
  tone: "Shocking",
  endingType: "Plot Twist",
  language: "English",
  outputStyle: "Fast-paced short drama"
};

const proFeatures = [
  "Real AI story understanding",
  "Complete script packages",
  "Saved characters",
  "Episode series generation",
  "Platform-specific versions",
  "Bilingual output"
];

const mainCharacterSignals = [
  ["poor student", "Poor Student"],
  ["rich ceo", "Rich CEO"],
  ["ceo", "Rich CEO"],
  ["best friend", "Best Friend"],
  ["friend", "Best Friend"],
  ["teacher", "Teacher"],
  ["detective", "Detective"],
  ["villain", "Villain"],
  ["popular girl", "Popular Girl"],
  ["quiet boy", "Quiet Boy"],
  ["transfer student", "New Transfer Student"],
  ["single mother", "Single Mother"],
  ["mother", "Single Mother"],
  ["brother", "Older Brother"],
  ["sister", "Younger Sister"],
  ["ex-boyfriend", "Ex-boyfriend"],
  ["ex-girlfriend", "Ex-girlfriend"],
  ["stranger", "Stranger"],
  ["student", "Student"]
];

const relationshipSignals = [
  [["best friend", "friend"], "Best friends"],
  [["enemy", "enemies", "rival"], "Enemies"],
  [["classmate", "school", "student", "exam", "teacher"], "Classmates"],
  [["brother", "sister", "sibling"], "Siblings"],
  [["couple", "love", "dating", "romance"], "Couple"],
  [["ex", "ex-boyfriend", "ex-girlfriend"], "Ex-couple"],
  [["teacher"], "Teacher and student"],
  [["boss", "ceo", "employee"], "Boss and employee"],
  [["mother", "father", "parent", "child"], "Parent and child"]
];

const conflictSignals = [
  [["fail", "failed", "exam", "test", "grade", "teacher"], "Exam pressure"],
  [["secret", "identity", "hidden", "disguise"], "Hidden identity"],
  [["betray", "betrayal", "backstab", "lied"], "Betrayal"],
  [["money", "paid", "debt", "rich", "poor", "price"], "Money problem"],
  [["revenge", "payback", "expose"], "Revenge"],
  [["love", "crush", "confession", "date"], "Secret crush"],
  [["misunderstanding", "screenshot", "rumor"], "Misunderstanding"],
  [["family", "mother", "father", "parent", "sibling"], "Family pressure"],
  [["jealous", "jealousy", "rival"], "Jealousy"],
  [["bully", "bullying", "humiliate"], "Bullying"],
  [["crime", "detective", "murder", "case", "evidence"], "Crime mystery"],
  [["time", "loop", "future", "tomorrow"], "Time loop"]
];

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

function FormActions({ isLoading, regenerate, clearForm, copyResult }) {
  return html`
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

function normalizedSimpleValue(key, value) {
  return simpleOptions[key].includes(value) ? value : simpleDefaults[key];
}

function lowerIdea(storyIdea, genre) {
  return `${storyIdea || ""} ${genre || ""}`.toLowerCase();
}

function inferMainCharacter(storyIdea) {
  const lower = lowerIdea(storyIdea);
  const matched = mainCharacterSignals.find(([signal]) => lower.includes(signal));
  return matched?.[1] || "Student";
}

function inferRelationship(storyIdea, genre) {
  const lower = lowerIdea(storyIdea, genre);
  const matched = relationshipSignals.find(([signals]) => signals.some((signal) => lower.includes(signal)));
  if (matched) return matched[1];
  if (genre === "Romance") return "Couple";
  if (genre === "School") return "Classmates";
  if (genre === "Mystery") return "Stranger and stranger";
  return "Best friends";
}

function inferConflict(storyIdea, genre) {
  const lower = lowerIdea(storyIdea, genre);
  const matched = conflictSignals.find(([signals]) => signals.some((signal) => lower.includes(signal)));
  if (matched) return matched[1];
  if (genre === "Revenge") return "Revenge";
  if (genre === "Romance") return "Secret crush";
  if (genre === "Mystery") return "Crime mystery";
  if (genre === "School") return "Exam pressure";
  return "Betrayal";
}

function buildSimplePayload(form) {
  const genre = normalizedSimpleValue("genre", form.genre);

  return {
    storyIdea: form.storyIdea,
    genre,
    length: normalizedSimpleValue("length", form.length),
    platform: simpleDefaults.platform,
    mainCharacter: inferMainCharacter(form.storyIdea),
    relationship: inferRelationship(form.storyIdea, genre),
    mainConflict: inferConflict(form.storyIdea, genre),
    tone: normalizedSimpleValue("tone", form.tone),
    endingType: normalizedSimpleValue("endingType", form.endingType),
    language: simpleDefaults.language,
    outputStyle: simpleDefaults.outputStyle
  };
}

function ProFeatureList() {
  return html`
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      ${proFeatures.map(
        (feature) => html`
          <div key=${feature} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm font-bold text-white/78">
            ${feature}
          </div>
        `
      )}
    </div>
  `;
}

function ProAiForm() {
  const [storyIdea, setStoryIdea] = useState("");
  const [outputType, setOutputType] = useState("Complete script package");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    const response = await generateWithAI({ storyIdea, outputType });
    setMessage(response.message || "AI Mode is not enabled yet.");
  }

  return html`
    <form className="mt-5 grid gap-4" onSubmit=${submit}>
      <div>
        <label className="text-sm font-bold text-white/78" htmlFor="pro-story-idea">Story idea for AI Studio</label>
        <textarea
          id="pro-story-idea"
          value=${storyIdea}
          onInput=${(event) => setStoryIdea(event.target.value)}
          placeholder="Example: A student discovers her best friend was hired to ruin her final exam."
          className="focus-ring mt-2 min-h-36 w-full resize-y rounded-lg border border-white/10 bg-white px-3 py-3 text-sm font-semibold leading-6 text-slate-950 caret-slate-950 placeholder:text-slate-500"
        ></textarea>
      </div>
      <${Field}
        label="AI Output Type"
        value=${outputType}
        options=${["Complete script package", "Episode series", "Character bible", "Platform-specific versions", "Bilingual script"]}
        onChange=${setOutputType}
      />
      <button className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white">
        <${WandSparkles} size=${18} />
        Generate with AI placeholder
      </button>
      ${message && html`<p className="rounded-lg border border-amber-300/35 bg-amber-300/10 p-3 text-sm font-semibold text-amber-200">${message}</p>`}
    </form>
  `;
}

function ProAiStudioPanel({ state }) {
  const hasProAccess = state.devProAccess || state.isProMode || state.subscriptionStatus === "pro";
  const isLocked = state.aiModeEnabled && state.requireProForAI && !hasProAccess;

  return html`
    <section className="mt-6 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
      <div className="glass-panel rounded-lg p-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-lime-300 text-slate-950">
          <${Lock} size=${24} />
        </div>

        ${!state.aiModeEnabled
          ? html`
              <h2 className="mt-5 text-2xl font-black">Pro AI Studio is coming soon.</h2>
              <p className="mt-3 text-sm leading-7 text-white/68">
                ${getProModeMessage()} No real AI API is connected in this MVP.
              </p>
              <${ProFeatureList} />
            `
          : isLocked
            ? html`
                <h2 className="mt-5 text-2xl font-black">Upgrade to Pro to use AI Studio.</h2>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  AI Mode is enabled for testing, but Pro access is required before real generation can run.
                </p>
                <${ProFeatureList} />
              `
            : html`
                <h2 className="mt-5 text-2xl font-black">AI generation form</h2>
                <p className="mt-3 text-sm leading-7 text-white/68">
                  Developer Pro access is enabled, but this still uses a placeholder and does not call OpenAI.
                </p>
                <${ProAiForm} />
              `}

        <div className="mt-5 grid gap-3 text-sm text-white/70">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="font-extrabold text-white">Current access</p>
            <p className="mt-1 capitalize">${state.subscriptionStatus} plan with Free Template Mode ${state.freeTemplateModeEnabled ? "available now" : "disabled"}.</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="font-extrabold text-white">AI Mode status</p>
            <p className="mt-1">${state.aiModeEnabled ? "Enabled by feature flag" : "Disabled by default. No real AI API is connected."}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="font-extrabold text-white">Monthly generation limit</p>
            <p className="mt-1">${state.monthlyGenerationLimit} planned Pro generations after login, payment and server usage tracking are added.</p>
          </div>
        </div>
      </div>
      <${WaitlistSection} compact=${true} />
    </section>
  `;
}

export function ScriptGeneratorPage() {
  const [activeMode, setActiveMode] = useState("template");
  const [templateMode, setTemplateMode] = useState("simple");
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formatted = useMemo(() => formatResult(result), [result]);
  const remaining = STORY_LIMIT - form.storyIdea.length;

  const isProMode = activeMode === "pro";
  const isSimpleMode = templateMode === "simple";

  function updateField(key, value) {
    if (key === "storyIdea" && value.length > STORY_LIMIT) return;
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function currentPayload() {
    return isSimpleMode ? buildSimplePayload(form) : form;
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
      setResult(generateWithTemplate(currentPayload()));
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

  const storyPlaceholder = isSimpleMode
    ? "Example: A poor student finds out his best friend secretly betrayed him."
    : "Example: A poor student finds out his best friend secretly paid the teacher to make him fail the exam.";

  return html`
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <section className="max-w-4xl min-w-0">
        <p className="inline-flex items-center gap-2 rounded-lg border border-lime-300/35 bg-lime-300/10 px-3 py-2 text-sm font-bold text-lime-300">
          <${Clapperboard} size=${16} />
          Free Template Mode available now
        </p>
        <h1 className="mt-5 max-w-sm break-words text-3xl font-black tracking-tight sm:max-w-none sm:text-5xl">Short Drama Script Generator</h1>
        <p className="mt-4 max-w-sm text-base leading-8 text-white/68 sm:max-w-2xl">
          Describe your idea, choose a style, and generate a ready-to-use short drama script.
        </p>
      </section>

      <div className="mt-8 grid min-w-0 gap-3 md:grid-cols-2">
        <button
          className=${`focus-ring min-w-0 rounded-lg border p-5 text-left transition ${
            activeMode === "template" ? "border-lime-300 bg-lime-300/10" : "border-white/10 bg-white/[0.04] hover:border-white/25"
          }`}
          onClick=${() => setActiveMode("template")}
        >
          <span className="flex min-w-0 items-center gap-2 text-lg font-black"><${WandSparkles} size=${20} /> Free Template Mode</span>
          <span className="mt-2 block text-sm leading-6 text-white/65">
            Fast, free script generation using Simple Mode or Detailed Mode.
          </span>
        </button>
        <button
          className=${`focus-ring min-w-0 rounded-lg border p-5 text-left transition ${
            activeMode === "pro" ? "border-lime-300 bg-lime-300/10" : "border-white/10 bg-white/[0.04] hover:border-white/25"
          }`}
          onClick=${() => setActiveMode("pro")}
        >
          <span className="flex min-w-0 items-center gap-2 text-lg font-black"><${Crown} size=${20} /> Pro AI Studio</span>
          <span className="mt-2 block text-sm leading-6 text-white/65">
            Coming soon. Full story understanding, saved characters, episode series and platform-specific versions.
          </span>
        </button>
      </div>

      ${isProMode
        ? html`<${ProAiStudioPanel} state=${proModeState} />`
        : html`
            <section className="mt-6 grid gap-6 lg:grid-cols-[.92fr_1.08fr] lg:items-start">
              <form className="glass-panel rounded-lg p-4 sm:p-5" onSubmit=${generate}>
                <div className="grid gap-2 rounded-lg border border-white/10 bg-black/20 p-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick=${() => setTemplateMode("simple")}
                    className=${`focus-ring rounded-md px-4 py-3 text-left text-sm font-extrabold transition ${
                      isSimpleMode ? "bg-lime-300 text-slate-950" : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Simple Mode
                  </button>
                  <button
                    type="button"
                    onClick=${() => setTemplateMode("detailed")}
                    className=${`focus-ring rounded-md px-4 py-3 text-left text-sm font-extrabold transition ${
                      !isSimpleMode ? "bg-lime-300 text-slate-950" : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Detailed Mode
                  </button>
                </div>

                <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-white/68">
                  ${isSimpleMode
                    ? "Fast mode for quick ideas. Enter your story idea, choose a few basics, and generate a ready-to-use short drama script."
                    : "Advanced mode for creators who want more control over platform, characters, conflict, tone, language and script style."}
                </p>

                <label className="mt-5 block text-sm font-bold text-white/78" htmlFor="story-idea">Your Story Idea</label>
                <textarea
                  id="story-idea"
                  value=${form.storyIdea}
                  maxLength=${STORY_LIMIT}
                  onInput=${(event) => updateField("storyIdea", event.target.value)}
                  placeholder=${storyPlaceholder}
                  className="focus-ring mt-2 min-h-40 w-full resize-y rounded-lg border border-white/10 bg-white px-3 py-3 text-sm font-semibold leading-6 text-slate-950 caret-slate-950 placeholder:text-slate-500"
                ></textarea>
                <div className="mt-2 flex items-center justify-between gap-3 text-xs text-white/55">
                  <span>${isSimpleMode ? "This is the main input. The template engine will infer missing details from your idea." : "Optional, but the result will follow your idea more closely when you add one."}</span>
                  <span className=${remaining < 100 ? "font-bold text-amber-300" : "font-semibold text-white/60"}>${form.storyIdea.length}/${STORY_LIMIT}</span>
                </div>

                ${isSimpleMode
                  ? html`
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <${Field} label="Genre" value=${normalizedSimpleValue("genre", form.genre)} options=${simpleOptions.genre} onChange=${(value) => updateField("genre", value)} />
                        <${Field} label="Length" value=${normalizedSimpleValue("length", form.length)} options=${simpleOptions.length} onChange=${(value) => updateField("length", value)} />
                        <${Field} label="Tone" value=${normalizedSimpleValue("tone", form.tone)} options=${simpleOptions.tone} onChange=${(value) => updateField("tone", value)} />
                        <${Field} label="Ending Type" value=${normalizedSimpleValue("endingType", form.endingType)} options=${simpleOptions.endingType} onChange=${(value) => updateField("endingType", value)} />
                      </div>
                    `
                  : html`
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
                    `}

                <${FormActions} isLoading=${isLoading} regenerate=${regenerate} clearForm=${clearForm} copyResult=${copyResult} />
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
