import React from "react";
import { createRoot } from "react-dom/client";
import htm from "htm";
import { ComingSoon } from "./components/ComingSoon.js";
import { Layout } from "./components/Layout.js";
import { useAppRoute } from "./lib/router.js";
import { useSeo } from "./lib/seo.js";
import { routes } from "./lib/router.js";
import { getBlogPost } from "./data/blogPosts.js";
import { AboutPage } from "./pages/AboutPage.js";
import { BlogArticlePage, BlogListPage } from "./pages/BlogPage.js";
import { ContactPage } from "./pages/ContactPage.js";
import { HomePage } from "./pages/HomePage.js";
import { PremiumPage } from "./pages/PremiumPage.js";
import { PromptLibraryPage } from "./pages/PromptLibraryPage.js";
import { PrivacyPage } from "./pages/PrivacyPage.js";
import { ScriptGeneratorPage } from "./pages/ScriptGeneratorPage.js";
import { TermsPage } from "./pages/TermsPage.js";

const html = htm.bind(React.createElement);

function App() {
  const path = useAppRoute();
  useSeo(path);
  const blogPost = getBlogPost(path);

  const page =
    path === routes.home || path === ""
      ? html`<${HomePage} />`
      : path === routes.script
        ? html`<${ScriptGeneratorPage} />`
        : path === routes.twist
          ? html`<${ComingSoon}
              title="Plot Twist Generator"
              description="Generate dramatic reveals, betrayals, cliffhangers and emotional reversals. This page is reserved for the next MVP step."
            />`
          : path === routes.character
            ? html`<${ComingSoon}
                title="Character Generator"
                description="Create short drama characters with secrets, motivations, visual cues and conflict hooks. Coming soon."
              />`
            : path === routes.title
              ? html`<${ComingSoon}
                  title="TikTok Title Generator"
                  description="Draft short, clickable titles for TikTok, YouTube Shorts and Reels. Coming soon."
                />`
              : path === routes.meme
                ? html`<${ComingSoon}
                    title="Meme Caption Generator"
                    description="Turn awkward drama moments into meme captions and shareable one-liners. Coming soon."
                  />`
                : path === routes.promptLibrary
                  ? html`<${PromptLibraryPage} />`
                  : path === routes.premiumTemplates
                    ? html`<${PremiumPage} />`
                    : path === routes.blog
                      ? html`<${BlogListPage} />`
                      : blogPost
                        ? html`<${BlogArticlePage} post=${blogPost} />`
                        : path === routes.about
                          ? html`<${AboutPage} />`
                          : path === routes.contact
                            ? html`<${ContactPage} />`
                            : path === routes.privacy
                              ? html`<${PrivacyPage} />`
                              : path === routes.terms
                                ? html`<${TermsPage} />`
                                : html`<${HomePage} />`;

  return html`<${Layout} path=${path}>${page}<//>`;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
