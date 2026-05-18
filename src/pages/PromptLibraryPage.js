import React, { useMemo, useState } from "react";
import htm from "htm";
import { ArrowRight, Check, Clipboard, Library, Sparkles } from "lucide-react";
import { routes } from "../lib/router.js";

const html = htm.bind(React.createElement);

export const promptCategories = [
  {
    id: "romance",
    title: "Romance Short Drama Prompts",
    description: "Relationship hooks, fake dating setups, confession scenes and emotional love-story reveals.",
    prompts: [
      {
        title: "The Fake Date Became Real",
        text: "Write a 60-second short drama where two classmates pretend to date for social media, but one hidden camera moment reveals real feelings.",
        bestFor: ["TikTok", "Reels", "Xiaohongshu"],
        tone: "romantic"
      },
      {
        title: "The Ex Kept One Secret",
        text: "Create a short drama about an ex-couple meeting at a rainy bus stop. One person acts cold, but the final message reveals they left to protect the other.",
        bestFor: ["TikTok", "YouTube Shorts", "Douyin"],
        tone: "emotional"
      },
      {
        title: "Love Letter To The Wrong Person",
        text: "Write a school romance scene where a love letter is read by the wrong student, causing public embarrassment before a surprising confession.",
        bestFor: ["TikTok", "Reels"],
        tone: "romantic"
      },
      {
        title: "The CEO Remembered Her Name",
        text: "Generate a rich CEO romance short where an employee thinks she is being punished, but the CEO remembers her from a past act of kindness.",
        bestFor: ["TikTok", "Douyin", "Reels"],
        tone: "dramatic"
      },
      {
        title: "The Last Umbrella",
        text: "Create a 30-second short drama where two strangers share one umbrella, then discover they are connected by an old missed confession.",
        bestFor: ["Reels", "Xiaohongshu"],
        tone: "heartwarming"
      },
      {
        title: "He Mocked Her Crush",
        text: "Write a dialogue-heavy romance where a popular boy mocks a love confession, then realizes the letter was never meant for him.",
        bestFor: ["TikTok", "YouTube Shorts"],
        tone: "shocking"
      },
      {
        title: "The Wedding Invitation Mistake",
        text: "Create a short wedding-room drama where the wrong name on an invitation exposes an old promise between two people.",
        bestFor: ["Douyin", "TikTok", "Reels"],
        tone: "dramatic"
      },
      {
        title: "The Silent Gift",
        text: "Write a romantic mini script where someone secretly pays for another person's dream, then pretends they never cared.",
        bestFor: ["Xiaohongshu", "Reels", "TikTok"],
        tone: "emotional"
      },
      {
        title: "Emergency Contact",
        text: "Generate a short drama where an ex deletes every photo, but the hospital calls because they are still listed as emergency contact.",
        bestFor: ["TikTok", "YouTube Shorts"],
        tone: "emotional"
      },
      {
        title: "The Confession Countdown",
        text: "Create a fast-paced romance where two people have 30 seconds before a train leaves, and one confession changes the ending.",
        bestFor: ["Reels", "TikTok", "Douyin"],
        tone: "romantic"
      }
    ]
  },
  {
    id: "mystery",
    title: "Mystery Short Drama Prompts",
    description: "Clues, missing phones, locked rooms, secret recordings and suspenseful reveal structures.",
    prompts: [
      {
        title: "The Phone Rang Inside The Room",
        text: "Write a mystery short where a missing phone rings from a locked classroom, and the final shot reveals who was hiding the evidence.",
        bestFor: ["TikTok", "YouTube Shorts"],
        tone: "suspenseful"
      },
      {
        title: "The Wrong Timestamp",
        text: "Create a short drama where a screenshot ruins someone's reputation, but the timestamp proves the story was edited.",
        bestFor: ["TikTok", "Reels", "Douyin"],
        tone: "shocking"
      },
      {
        title: "The Mirror Clue",
        text: "Generate a 45-second mystery where everyone watches a video, but only the reflection in the mirror reveals the real liar.",
        bestFor: ["YouTube Shorts", "TikTok"],
        tone: "suspenseful"
      },
      {
        title: "The Detective Knew The Victim",
        text: "Write a crime mystery scene where the detective solves the clue too quickly because they are secretly connected to the victim.",
        bestFor: ["YouTube Shorts", "Reels"],
        tone: "dark"
      },
      {
        title: "The Deleted Message Returned",
        text: "Create a mystery short set in a phone repair shop where deleted messages return and expose a hidden betrayal.",
        bestFor: ["TikTok", "Douyin"],
        tone: "shocking"
      },
      {
        title: "The Quiet Witness",
        text: "Write a suspense scene where the quiet student says nothing until the last five seconds, then reveals one recording that changes everything.",
        bestFor: ["TikTok", "Reels"],
        tone: "suspenseful"
      },
      {
        title: "The Locked Office",
        text: "Generate a short drama where an office door is locked from the inside, but the real clue is a coffee cup outside the room.",
        bestFor: ["YouTube Shorts", "TikTok"],
        tone: "mystery"
      },
      {
        title: "The Missing Page",
        text: "Create a school mystery where one missing notebook page proves the top student was framed before the exam.",
        bestFor: ["TikTok", "Xiaohongshu"],
        tone: "suspenseful"
      },
      {
        title: "The Second Voice",
        text: "Write a 60-second mystery where an audio recording sounds normal until the background voice names the real culprit.",
        bestFor: ["Reels", "TikTok", "Douyin"],
        tone: "shocking"
      },
      {
        title: "The Fake Alibi",
        text: "Create a short detective-style script where a perfect alibi collapses because of one detail in a social media caption.",
        bestFor: ["YouTube Shorts", "TikTok"],
        tone: "suspenseful"
      }
    ]
  },
  {
    id: "revenge",
    title: "Revenge Short Drama Prompts",
    description: "Public humiliation, hidden proof, fake apologies and satisfying payback endings.",
    prompts: [
      {
        title: "The Apology Was A Trap",
        text: "Write a revenge short where the main character apologizes in public, but the apology is designed to make the liar confess on camera.",
        bestFor: ["TikTok", "Douyin", "Reels"],
        tone: "shocking"
      },
      {
        title: "The Receipt Revenge",
        text: "Create a short drama where a poor student stays silent until graduation day, then reveals the receipt that proves who bought the result.",
        bestFor: ["TikTok", "YouTube Shorts"],
        tone: "dramatic"
      },
      {
        title: "The Group Chat Exposed",
        text: "Generate a revenge scene where a fake friend posts a cropped chat, but the hero releases the full group chat at the perfect moment.",
        bestFor: ["TikTok", "Reels"],
        tone: "shocking"
      },
      {
        title: "The Villain's Interview",
        text: "Write a 90-second revenge script where the villain brags in an interview without realizing every word is being broadcast live.",
        bestFor: ["YouTube Shorts", "TikTok"],
        tone: "dramatic"
      },
      {
        title: "The Silent Comeback",
        text: "Create an inspirational revenge short where someone humiliated for being poor returns with quiet proof instead of anger.",
        bestFor: ["Xiaohongshu", "Reels", "TikTok"],
        tone: "inspirational"
      },
      {
        title: "The Birthday Reveal",
        text: "Write a revenge drama set at a birthday party where one video turns the celebration into a public confession.",
        bestFor: ["TikTok", "Douyin"],
        tone: "shocking"
      },
      {
        title: "The Internship Payback",
        text: "Generate an office revenge short where the intern everyone ignores owns the document that can expose the boss.",
        bestFor: ["YouTube Shorts", "Reels"],
        tone: "dramatic"
      },
      {
        title: "The Fake Weakness",
        text: "Create a revenge script where the hero pretends to be weak so the bully repeats the same mistake in front of a hidden camera.",
        bestFor: ["TikTok", "Reels"],
        tone: "suspenseful"
      },
      {
        title: "The Last Seat",
        text: "Write a short drama where a family leaves one person out of dinner, then discovers that person controls the inheritance decision.",
        bestFor: ["Douyin", "TikTok"],
        tone: "dramatic"
      },
      {
        title: "The Calm Final Line",
        text: "Create a revenge ending where the hero says one calm sentence, shows one piece of proof, and walks away before anyone can respond.",
        bestFor: ["Reels", "TikTok", "Xiaohongshu"],
        tone: "emotional"
      }
    ]
  },
  {
    id: "school",
    title: "School Drama Prompts",
    description: "Exam pressure, friendships, bullying, teachers, classroom secrets and campus reveals.",
    prompts: [
      {
        title: "The Paid Exam Result",
        text: "Write a school short drama where a poor student discovers their best friend secretly paid the teacher to make them fail the exam.",
        bestFor: ["TikTok", "Douyin"],
        tone: "shocking"
      },
      {
        title: "The Transfer Student Knows",
        text: "Create a school drama where a new transfer student knows every secret before roll call and exposes the biggest lie last.",
        bestFor: ["TikTok", "Reels"],
        tone: "suspenseful"
      },
      {
        title: "The Cafeteria Silence",
        text: "Generate a 30-second scene where a cafeteria goes silent after one student reads the wrong announcement out loud.",
        bestFor: ["TikTok", "YouTube Shorts"],
        tone: "dramatic"
      },
      {
        title: "The Bully Forgot The Camera",
        text: "Write a school revenge script where the bully posts a video but forgets the classroom security camera recorded the full truth.",
        bestFor: ["TikTok", "Douyin", "Reels"],
        tone: "shocking"
      },
      {
        title: "The Teacher's Private Reason",
        text: "Create a short drama where a teacher fails a student on purpose, but the ending reveals the student was being protected.",
        bestFor: ["YouTube Shorts", "TikTok"],
        tone: "emotional"
      },
      {
        title: "The Quiet Boy's Recording",
        text: "Generate a school mystery where the quiet boy saves the main character by playing a recording nobody knew existed.",
        bestFor: ["TikTok", "Reels"],
        tone: "suspenseful"
      },
      {
        title: "The Scholarship Betrayal",
        text: "Write a short drama where two best friends compete for one scholarship and one hidden payment changes the result.",
        bestFor: ["TikTok", "Xiaohongshu"],
        tone: "dramatic"
      },
      {
        title: "The Wrong Name At Assembly",
        text: "Create a school reveal scene where the principal calls the wrong winner and accidentally exposes the person who changed the scores.",
        bestFor: ["Douyin", "TikTok"],
        tone: "shocking"
      },
      {
        title: "The Group Project Lie",
        text: "Generate a comedy-drama where one student takes all the credit for a group project until the presentation file reveals the edit history.",
        bestFor: ["Reels", "TikTok"],
        tone: "funny"
      },
      {
        title: "The Locker Note",
        text: "Write a short drama where a note in a locker looks like a confession, but it is actually a warning about the next exam.",
        bestFor: ["TikTok", "YouTube Shorts"],
        tone: "suspenseful"
      }
    ]
  },
  {
    id: "comedy",
    title: "Comedy Short Drama Prompts",
    description: "Awkward lies, family interruptions, classroom mistakes and fast punchline-friendly stories.",
    prompts: [
      {
        title: "The Lie Lasted Ten Seconds",
        text: "Write a comedy short where someone tells a perfect lie, then their mother enters the room and ruins it immediately.",
        bestFor: ["TikTok", "Reels"],
        tone: "funny"
      },
      {
        title: "The Wrong Voice Note",
        text: "Create a short comedy where a character sends a dramatic voice note to the wrong group chat and has 15 seconds to fix it.",
        bestFor: ["TikTok", "YouTube Shorts"],
        tone: "funny"
      },
      {
        title: "The Fake Rich Flex",
        text: "Generate a comedy drama where someone pretends to be rich in a restaurant, but the waiter is their cousin.",
        bestFor: ["Reels", "TikTok", "Douyin"],
        tone: "funny"
      },
      {
        title: "The Accidental Confession",
        text: "Write a short skit where someone practices a confession alone, then realizes the microphone was connected to the classroom speaker.",
        bestFor: ["TikTok", "Reels"],
        tone: "romantic comedy"
      },
      {
        title: "The Group Chat Detective",
        text: "Create a comedy mystery where one friend acts like a detective over a missing snack and accidentally exposes a bigger secret.",
        bestFor: ["YouTube Shorts", "TikTok"],
        tone: "funny"
      },
      {
        title: "The Overconfident Villain",
        text: "Generate a comedy short where the villain explains their plan too proudly while the hero is already livestreaming.",
        bestFor: ["TikTok", "Douyin"],
        tone: "funny"
      },
      {
        title: "The Wrong Twin",
        text: "Write a fast-paced skit where someone confesses to the wrong twin and both twins decide to test the story.",
        bestFor: ["Reels", "TikTok"],
        tone: "funny"
      },
      {
        title: "The Fake Phone Call",
        text: "Create a comedy short where a character fakes a phone call to escape a conversation, but the phone rings in their hand.",
        bestFor: ["TikTok", "YouTube Shorts", "Reels"],
        tone: "funny"
      },
      {
        title: "The Dramatic Entrance Failed",
        text: "Generate a short comedy where someone plans a dramatic entrance, trips, and accidentally reveals the truth anyway.",
        bestFor: ["Reels", "TikTok"],
        tone: "funny"
      },
      {
        title: "The Caption Betrayed Him",
        text: "Write a comedy skit where someone's inspirational caption accidentally exposes that they copied the whole story from their friend.",
        bestFor: ["TikTok", "Xiaohongshu"],
        tone: "funny"
      }
    ]
  }
];

function copyPromptText(prompt, categoryTitle) {
  return [
    `Prompt title: ${prompt.title}`,
    `Category: ${categoryTitle}`,
    `Prompt: ${prompt.text}`,
    `Best for: ${prompt.bestFor.join(" / ")}`,
    `Tone: ${prompt.tone}`
  ].join("\n");
}

function copyWithFallback(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);
  return Promise.resolve(copied);
}

function PromptCard({ prompt, categoryTitle, copiedId, onCopy }) {
  const promptId = `${categoryTitle}-${prompt.title}`;
  const copied = copiedId === promptId;

  return html`
    <article className="tool-card flex h-full flex-col rounded-lg p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-lime-300">Prompt title</p>
          <h2 className="mt-2 text-lg font-black leading-7 text-white">${prompt.title}</h2>
        </div>
        <button
          type="button"
          onClick=${() => onCopy(prompt, categoryTitle, promptId)}
          className=${`focus-ring inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-extrabold transition ${
            copied ? "bg-lime-300 text-slate-950" : "bg-white text-slate-950 hover:bg-lime-300"
          }`}
          aria-label=${`Copy ${prompt.title}`}
        >
          ${copied ? html`<${Check} size=${15} /> Copied` : html`<${Clipboard} size=${15} /> Copy`}
        </button>
      </div>

      <p className="mt-4 flex-1 text-sm leading-7 text-white/70">${prompt.text}</p>

      <div className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm">
        <p className="leading-6 text-white/62">
          <strong className="text-white">Best for:</strong>
          ${prompt.bestFor.join(" / ")}
        </p>
        <p className="leading-6 text-white/62">
          <strong className="text-white">Tone:</strong>
          ${prompt.tone}
        </p>
      </div>
    </article>
  `;
}

export function PromptLibraryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [copiedId, setCopiedId] = useState("");
  const visibleCategories = useMemo(
    () => activeCategory === "all" ? promptCategories : promptCategories.filter((category) => category.id === activeCategory),
    [activeCategory]
  );
  const totalPrompts = promptCategories.reduce((sum, category) => sum + category.prompts.length, 0);

  async function handleCopy(prompt, categoryTitle, promptId) {
    const copied = await copyWithFallback(copyPromptText(prompt, categoryTitle));
    if (copied) {
      setCopiedId(promptId);
      window.setTimeout(() => setCopiedId(""), 1500);
    }
  }

  return html`
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-lg border border-lime-300/35 bg-lime-300/10 px-3 py-2 text-sm font-bold text-lime-300">
            <${Library} size=${16} />
            Free prompt library
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">AI Short Drama Prompt Library</h1>
          <p className="mt-5 text-base leading-8 text-white/68">
            Browse reusable short drama prompts for romance, mystery, revenge, school drama and comedy. Copy a prompt, paste it into your workflow, or use it as a starting point in the free script generator.
          </p>
          <div className="mt-6 grid max-w-2xl grid-cols-3 gap-2 text-center sm:gap-3">
            <div className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3">
              <p className="text-lg font-black text-white">${promptCategories.length}</p>
              <p className="mt-1 text-xs font-semibold text-white/55">categories</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3">
              <p className="text-lg font-black text-white">${totalPrompts}</p>
              <p className="mt-1 text-xs font-semibold text-white/55">prompts</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.06] px-3 py-3">
              <p className="text-lg font-black text-white">1-click</p>
              <p className="mt-1 text-xs font-semibold text-white/55">copy</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick=${() => setActiveCategory("all")}
            className=${`focus-ring rounded-lg px-4 py-2 text-sm font-extrabold transition ${
              activeCategory === "all" ? "bg-lime-300 text-slate-950" : "border border-white/15 text-white hover:border-lime-300 hover:text-lime-300"
            }`}
          >
            All prompts
          </button>
          ${promptCategories.map((category) => html`
            <button
              key=${category.id}
              type="button"
              onClick=${() => setActiveCategory(category.id)}
              className=${`focus-ring rounded-lg px-4 py-2 text-sm font-extrabold transition ${
                activeCategory === category.id ? "bg-lime-300 text-slate-950" : "border border-white/15 text-white hover:border-lime-300 hover:text-lime-300"
              }`}
            >
              ${category.title.replace(" Prompts", "")}
            </button>
          `)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10">
          ${visibleCategories.map((category) => html`
            <div key=${category.id}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-lime-300">${category.prompts.length} prompts</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">${category.title}</h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-white/62">${category.description}</p>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                ${category.prompts.map((prompt) => html`
                  <${PromptCard}
                    key=${prompt.title}
                    prompt=${prompt}
                    categoryTitle=${category.title}
                    copiedId=${copiedId}
                    onCopy=${handleCopy}
                  />
                `)}
              </div>
            </div>
          `)}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-lg p-6 sm:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-lime-300">
                <${Sparkles} size=${16} />
                Pro CTA
              </p>
              <h2 className="mt-3 text-2xl font-black">Want more advanced AI-powered script generation? PlotTwist AI Pro is coming soon.</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                The free prompt library is available now. Future Pro plans will add real AI generation, longer scripts, bilingual output and premium creator packs.
              </p>
            </div>
            <a
              href=${routes.premiumTemplates}
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white"
            >
              View Pro Plans
              <${ArrowRight} size=${17} />
            </a>
          </div>
        </div>
      </section>
    </main>
  `;
}
