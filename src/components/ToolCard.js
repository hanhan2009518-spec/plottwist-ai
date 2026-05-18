import React from "react";
import htm from "htm";
import { ArrowRight, Captions, Clapperboard, MessageSquareText, Repeat2, Users } from "lucide-react";

const html = htm.bind(React.createElement);

const iconMap = {
  "Short Drama Script Generator": Clapperboard,
  "Plot Twist Generator": Repeat2,
  "Character Generator": Users,
  "TikTok Title Generator": Captions,
  "Meme Caption Generator": MessageSquareText
};

export function ToolCard({ tool }) {
  const Icon = iconMap[tool.title] || Clapperboard;

  return html`
    <a
      href=${tool.href}
      className="tool-card focus-ring group block rounded-lg p-5 transition duration-200"
      aria-label=${`Open ${tool.title}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className=${`inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${tool.accent} text-slate-950 shadow-lg`}>
          <${Icon} size=${22} strokeWidth=${2.4} />
        </span>
        <span className="rounded-md border border-white/10 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-white/70">
          ${tool.status}
        </span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-white">${tool.title}</h3>
      <p className="mt-2 min-h-12 text-sm leading-6 text-white/65">${tool.description}</p>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-lime-300">
        <span>Open tool</span>
        <${ArrowRight} className="transition group-hover:translate-x-1" size=${16} />
      </div>
    </a>
  `;
}
