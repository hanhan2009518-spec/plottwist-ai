import React from "react";
import htm from "htm";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Sparkles } from "lucide-react";
import { blogPosts } from "../data/blogPosts.js";
import { routes } from "../lib/router.js";

const html = htm.bind(React.createElement);

export function BlogListPage() {
  return html`
    <main>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-lg border border-lime-300/35 bg-lime-300/10 px-3 py-2 text-sm font-bold text-lime-300">
            <${BookOpen} size=${16} />
            Creator blog
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">PlotTwist AI Blog</h1>
          <p className="mt-5 text-base leading-8 text-white/68">
            Practical guides for short drama creators: TikTok scripts, plot twists, viral titles, beginner templates and character ideas.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          ${blogPosts.map((post) => html`
            <article key=${post.slug} className="tool-card flex h-full flex-col rounded-lg p-5">
              <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.14em] text-white/48">
                <span>${post.category}</span>
                <span className="inline-flex items-center gap-1"><${Clock} size=${14} /> ${post.readTime}</span>
              </div>
              <h2 className="mt-4 text-xl font-black leading-8 text-white">${post.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-white/65">${post.excerpt}</p>
              <a
                href=${post.path}
                className="focus-ring mt-6 inline-flex items-center gap-2 rounded-lg text-sm font-extrabold text-lime-300 transition hover:text-white"
              >
                Read article
                <${ArrowRight} size=${16} />
              </a>
            </article>
          `)}
        </div>
      </section>
    </main>
  `;
}

export function BlogArticlePage({ post }) {
  if (!post) {
    return html`
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <a href=${routes.blog} className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-bold text-lime-300 hover:text-white">
          <${ArrowLeft} size=${16} />
          Back to blog
        </a>
        <h1 className="mt-6 text-3xl font-black">Article not found</h1>
        <p className="mt-3 text-white/65">This blog article may have moved.</p>
      </main>
    `;
  }

  return html`
    <main>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <a href=${routes.blog} className="focus-ring inline-flex items-center gap-2 rounded-lg text-sm font-bold text-lime-300 hover:text-white">
          <${ArrowLeft} size=${16} />
          Back to blog
        </a>

        <div className="mt-8">
          <p className="inline-flex items-center gap-2 rounded-lg border border-lime-300/35 bg-lime-300/10 px-3 py-2 text-sm font-bold text-lime-300">
            <${BookOpen} size=${16} />
            ${post.category}
          </p>
          <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">${post.title}</h1>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-white/48">
            <${Clock} size=${16} />
            ${post.readTime}
          </p>
          <p className="mt-5 text-lg leading-8 text-white/68">${post.excerpt}</p>
        </div>

        <div className="mt-8 rounded-lg border border-lime-300/25 bg-lime-300/10 p-5">
          <p className="text-sm leading-7 text-white/76">
            Want to turn an idea into a full creator-ready draft?
            <a className="font-extrabold text-lime-300 hover:text-white" href=${routes.script}> Try the Short Drama Script Generator</a>
            and use the article below as your planning checklist.
          </p>
        </div>

        <div className="content-prose mt-10 space-y-9">
          ${post.sections.map((section) => html`
            <section key=${section.heading}>
              <h2 className="text-2xl font-black tracking-tight text-white">${section.heading}</h2>
              <div className="mt-4 space-y-4">
                ${section.paragraphs.map((paragraph) => html`<p key=${paragraph}>${paragraph}</p>`)}
              </div>
            </section>
          `)}
        </div>

        <div className="mt-12 glass-panel rounded-lg p-6">
          <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-lime-300">
            <${Sparkles} size=${16} />
            Next step
          </p>
          <h2 className="mt-3 text-2xl font-black">Draft your short drama script faster</h2>
          <p className="mt-3 text-sm leading-7 text-white/65">
            Paste your story idea into PlotTwist AI and generate a hook, scene, dialogue beats, ending, caption, hashtags and production notes.
          </p>
          <a
            href=${routes.script}
            className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-white"
          >
            Open Short Drama Script Generator
            <${ArrowRight} size=${17} />
          </a>
        </div>
      </article>
    </main>
  `;
}
