import { blogPosts } from "../data/blogPosts.js";

export const SITE_URL = "https://tryplottwistai.com";
export const SITE_NAME = "PlotTwist AI";
export const DEFAULT_KEYWORDS =
  "AI short drama generator, short drama script generator, plot twist generator, TikTok title generator, character generator, meme caption generator, AI video script, viral short video ideas";
export const DEFAULT_DESCRIPTION =
  "Generate short drama scripts, plot twists, characters, captions and production notes for TikTok, YouTube Shorts, Reels, Douyin and Xiaohongshu.";
export const OG_IMAGE = `${SITE_URL}/public/visuals/creator-board.png`;

export const SITEMAP_PATHS = [
  "/",
  "/short-drama-script-generator",
  "/plot-twist-generator",
  "/character-generator",
  "/tiktok-title-generator",
  "/meme-caption-generator",
  "/prompt-library",
  "/premium-templates",
  "/blog",
  ...blogPosts.map((post) => post.path),
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-use"
];

export const pageSeo = {
  "/": {
    title: "PlotTwist AI - Free AI Short Drama Script Generator",
    description:
      "Generate short drama scripts, plot twists, characters, captions and production notes for TikTok, YouTube Shorts, Reels, Douyin and Xiaohongshu."
  },
  "/short-drama-script-generator": {
    title: "Short Drama Script Generator - PlotTwist AI",
    description:
      "Generate a short drama script with a hook, characters, scene, dialogue beats, plot twist, caption, hashtags and production notes."
  },
  "/plot-twist-generator": {
    title: "Plot Twist Generator - PlotTwist AI",
    description:
      "Create dramatic plot twists, reveals, betrayals and cliffhangers for short drama videos on TikTok, Shorts, Reels, Douyin and Xiaohongshu."
  },
  "/character-generator": {
    title: "Character Generator - PlotTwist AI",
    description:
      "Generate short drama character ideas with goals, secrets, relationships, conflicts and viral short video story hooks."
  },
  "/tiktok-title-generator": {
    title: "TikTok Title Generator - PlotTwist AI",
    description:
      "Generate clickable TikTok titles, short video hooks and caption ideas for drama, comedy, mystery and plot twist content."
  },
  "/meme-caption-generator": {
    title: "Meme Caption Generator - PlotTwist AI",
    description:
      "Generate meme captions, funny one-liners and reaction text for short drama scenes and social video posts."
  },
  "/prompt-library": {
    title: "AI Short Drama Prompt Library - PlotTwist AI",
    description:
      "Browse free AI short drama prompts for romance, mystery, revenge, school drama and comedy short video scripts."
  },
  "/premium-templates": {
    title: "PlotTwist AI Pro - Premium Short Drama Tools",
    description:
      "Preview future PlotTwist AI Pro plans for AI-powered short drama scripts, premium prompt packs and creator workflows."
  },
  "/blog": {
    title: "PlotTwist AI Blog - Short Drama Creator Guides",
    description:
      "Read practical short drama creator guides for TikTok scripts, plot twists, viral titles, templates and AI character ideas."
  },
  ...Object.fromEntries(
    blogPosts.map((post) => [
      post.path,
      {
        title: post.metaTitle,
        description: post.metaDescription
      }
    ])
  ),
  "/about": {
    title: "About PlotTwist AI",
    description:
      "Learn about PlotTwist AI, a free creator toolkit for generating short drama scripts, plot twists and viral short video ideas."
  },
  "/contact": {
    title: "Contact PlotTwist AI",
    description:
      "Contact PlotTwist AI with feedback, partnership ideas or requests for new short drama creator tools."
  },
  "/privacy-policy": {
    title: "Privacy Policy - PlotTwist AI",
    description:
      "Read the PlotTwist AI privacy policy for this front-end MVP and future creator tool updates."
  },
  "/terms-of-use": {
    title: "Terms of Use - PlotTwist AI",
    description:
      "Read the basic terms of use for PlotTwist AI, a free short drama script and viral video idea generator."
  }
};
