import { templateLibrary } from "../data/scriptTemplates.js";

export const generatorOptions = {
  genre: [
    "Romance",
    "Mystery",
    "School",
    "Revenge",
    "Comedy",
    "Sci-Fi",
    "Horror",
    "Fantasy",
    "Crime",
    "Family Drama",
    "Friendship",
    "Betrayal",
    "Rich vs Poor",
    "Time Travel",
    "Supernatural"
  ],
  length: ["15 seconds", "30 seconds", "60 seconds", "90 seconds", "2 minutes", "3 minutes"],
  platform: ["TikTok", "YouTube Shorts", "Instagram Reels", "Douyin", "Xiaohongshu"],
  mainCharacter: [
    "Student",
    "Poor Student",
    "Rich CEO",
    "Best Friend",
    "Stranger",
    "Detective",
    "Villain",
    "Popular Girl",
    "Quiet Boy",
    "New Transfer Student",
    "Single Mother",
    "Older Brother",
    "Younger Sister",
    "Teacher",
    "Ex-boyfriend",
    "Ex-girlfriend"
  ],
  relationship: [
    "Best friends",
    "Enemies",
    "Classmates",
    "Siblings",
    "Couple",
    "Ex-couple",
    "Teacher and student",
    "Boss and employee",
    "Stranger and stranger",
    "Parent and child"
  ],
  mainConflict: [
    "Betrayal",
    "Hidden identity",
    "Secret crush",
    "Revenge",
    "Misunderstanding",
    "Money problem",
    "Family pressure",
    "Exam pressure",
    "Jealousy",
    "Bullying",
    "Crime mystery",
    "Time loop"
  ],
  tone: [
    "Sad",
    "Funny",
    "Shocking",
    "Romantic",
    "Suspenseful",
    "Dark",
    "Emotional",
    "Inspirational",
    "Dramatic",
    "Creepy",
    "Heartwarming"
  ],
  endingType: ["Happy Ending", "Sad Ending", "Plot Twist", "Cliffhanger", "Open Ending", "Revenge Ending", "Emotional Ending"],
  language: ["English", "Chinese", "Bilingual English + Chinese"],
  outputStyle: [
    "Simple TikTok script",
    "Cinematic script",
    "Dialogue-heavy script",
    "Fast-paced short drama",
    "Emotional monologue",
    "Suspense opening",
    "Comedy skit"
  ]
};

export const proModeDefaults = {
  isProMode: false,
  usageLimit: 20,
  aiModeEnabled: false,
  subscriptionStatus: "free"
};

const characterProfiles = {
  Student: { name: "Mia Chen", role: "student", secret: "she has one message that can expose the class" },
  "Poor Student": { name: "Leo Park", role: "poor student", secret: "he is hiding who paid his school fees" },
  "Rich CEO": { name: "Adrian Cole", role: "CEO", secret: "he knows the main character from childhood" },
  "Best Friend": { name: "Jules Lin", role: "best friend", secret: "they kept the receipt that proves the betrayal" },
  Stranger: { name: "Noah Vale", role: "stranger", secret: "he has seen this scene happen before" },
  Detective: { name: "Iris Moon", role: "detective", secret: "she is connected to the case personally" },
  Villain: { name: "Celeste King", role: "villain", secret: "she was once a victim of the same plan" },
  "Popular Girl": { name: "Ava Song", role: "popular girl", secret: "her perfect image depends on one hidden lie" },
  "Quiet Boy": { name: "Evan Yu", role: "quiet boy", secret: "he has been recording the truth silently" },
  "New Transfer Student": { name: "Rin Zhao", role: "new transfer student", secret: "they already know everyone's secrets" },
  "Single Mother": { name: "Nora Lin", role: "single mother", secret: "she gave up her future to protect her child" },
  "Older Brother": { name: "Kai Morgan", role: "older brother", secret: "he took the blame years ago" },
  "Younger Sister": { name: "Lina Park", role: "younger sister", secret: "she saw the truth but was too scared to speak" },
  Teacher: { name: "Ms. Rivera", role: "teacher", secret: "she changed the result for a hidden reason" },
  "Ex-boyfriend": { name: "Ryan Cho", role: "ex-boyfriend", secret: "he returned with proof, not an apology" },
  "Ex-girlfriend": { name: "Sofia Reed", role: "ex-girlfriend", secret: "she left to protect the person she loved" }
};

const peopleSignals = [
  ["poor student", "Poor Student"],
  ["student", "Student"],
  ["best friend", "Best Friend"],
  ["friend", "Best Friend"],
  ["teacher", "Teacher"],
  ["ceo", "Rich CEO"],
  ["boss", "Rich CEO"],
  ["mother", "Single Mother"],
  ["mom", "Single Mother"],
  ["detective", "Detective"],
  ["villain", "Villain"],
  ["popular girl", "Popular Girl"],
  ["quiet boy", "Quiet Boy"],
  ["transfer student", "New Transfer Student"],
  ["brother", "Older Brother"],
  ["sister", "Younger Sister"],
  ["ex-boyfriend", "Ex-boyfriend"],
  ["ex-girlfriend", "Ex-girlfriend"],
  ["stranger", "Stranger"]
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

const stopWords = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "with",
  "without",
  "from",
  "that",
  "this",
  "his",
  "her",
  "their",
  "into",
  "out",
  "find",
  "finds",
  "found",
  "about",
  "after",
  "before",
  "secretly",
  "make",
  "made",
  "him",
  "she",
  "he",
  "they",
  "them",
  "who",
  "what",
  "when",
  "where",
  "why",
  "how"
]);

const lengthBeats = {
  "15 seconds": ["0-2s", "2-6s", "6-11s", "11-15s"],
  "30 seconds": ["0-4s", "4-12s", "12-24s", "24-30s"],
  "60 seconds": ["0-6s", "6-22s", "22-45s", "45-60s"],
  "90 seconds": ["0-8s", "8-32s", "32-70s", "70-90s"],
  "2 minutes": ["0-10s", "10-45s", "45-95s", "95-120s"],
  "3 minutes": ["0-15s", "15-70s", "70-145s", "145-180s"]
};

function pick(list, fallback = "") {
  if (!list?.length) return fallback;
  return list[Math.floor(Math.random() * list.length)];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function cleanStoryIdea(text) {
  return String(text || "").trim().replace(/\s+/g, " ").slice(0, 1000);
}

function titleCase(text) {
  return String(text || "").replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

function ideaShort(idea) {
  if (!idea) return "A simple idea becomes a short drama";
  return idea.length > 72 ? `${idea.slice(0, 69)}...` : idea;
}

function extractKeywords(idea) {
  const lower = idea.toLowerCase();
  const phraseMatches = [
    "poor student",
    "best friend",
    "failed exam",
    "fail the exam",
    "paid the teacher",
    "secret identity",
    "hidden identity",
    "time loop",
    "crime scene",
    "single mother",
    "rich ceo",
    "secret crush"
  ].filter((phrase) => lower.includes(phrase));

  const wordMatches = lower
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !stopWords.has(word))
    .slice(0, 12);

  return unique([...phraseMatches, ...wordMatches]).slice(0, 10);
}

function detectCharacters(idea, fallbackCharacter) {
  const lower = idea.toLowerCase();
  const detected = peopleSignals.filter(([signal]) => lower.includes(signal)).map(([, label]) => label);
  const refined = detected.includes("Poor Student") ? detected.filter((label) => label !== "Student") : detected;
  return unique([fallbackCharacter, ...refined]).slice(0, 3);
}

function detectConflict(idea, fallbackConflict) {
  const lower = idea.toLowerCase();
  const matched = conflictSignals.find(([signals]) => signals.some((signal) => lower.includes(signal)));
  return matched?.[1] || fallbackConflict;
}

function filterTemplates(items, tags) {
  const matched = items.filter((item) => item.tags?.some((tag) => tags.includes(tag)));
  return matched.length ? matched : items;
}

function fillTemplate(template, context) {
  return template.replace(/\{(\w+)\}/g, (_, key) => context[key] ?? "");
}

function sentenceJoin(parts) {
  return parts.filter(Boolean).join(" ");
}

function buildContext(options) {
  const storyIdea = cleanStoryIdea(options.storyIdea || options.customIdea);
  const mainCharacter = options.mainCharacter || generatorOptions.mainCharacter[0];
  const mainConflict = detectConflict(storyIdea, options.mainConflict || generatorOptions.mainConflict[0]);
  const detectedCharacters = detectCharacters(storyIdea, mainCharacter);
  const keywords = extractKeywords(storyIdea);

  return {
    genre: options.genre || generatorOptions.genre[0],
    length: options.length || "60 seconds",
    platform: options.platform || "TikTok",
    mainCharacter,
    relationship: options.relationship || "Best friends",
    mainConflict,
    tone: options.tone || "Shocking",
    endingType: options.endingType || "Plot Twist",
    language: options.language || "English",
    outputStyle: options.outputStyle || "Simple TikTok script",
    storyIdea,
    ideaShort: ideaShort(storyIdea),
    keywords,
    keywordLine: keywords.length ? keywords.join(", ") : mainConflict,
    detectedCharacters
  };
}

function buildCharacters(context) {
  const main = characterProfiles[context.detectedCharacters[0]] || characterProfiles[context.mainCharacter];
  const supportLabel =
    context.detectedCharacters.find((label) => label !== context.detectedCharacters[0]) ||
    (context.relationship.includes("Teacher") ? "Teacher" : context.relationship.includes("Boss") ? "Rich CEO" : "Best Friend");
  const support = characterProfiles[supportLabel] || characterProfiles["Best Friend"];
  const thirdLabel = context.detectedCharacters.find((label) => label !== context.detectedCharacters[0] && label !== supportLabel) || "Stranger";
  const third = characterProfiles[thirdLabel] || characterProfiles.Stranger;

  return [
    `${main.name} - ${context.detectedCharacters[0]}. Goal: prove the truth behind ${context.mainConflict.toLowerCase()}. Secret pressure: ${main.secret}.`,
    `${support.name} - ${supportLabel}. Relationship: ${context.relationship}. They appear helpful, but ${support.secret}.`,
    `${third.name} - ${thirdLabel}. Use them as the person who changes the audience's understanding in the final beat.`
  ];
}

function buildIdeaHook(context, fallbackHook) {
  if (!context.storyIdea) return fallbackHook;

  const starts = [
    `A ${context.mainCharacter.toLowerCase()} thought the problem was ${context.mainConflict.toLowerCase()}, until one detail exposed the real setup.`,
    `The whole story starts with this: ${context.ideaShort}.`,
    `Everyone believed the obvious version, but the clue in "${context.keywordLine}" changes the entire scene.`,
    `In the first three seconds, show the moment the hero realizes ${context.ideaShort.toLowerCase()}.`
  ];

  return pick(starts);
}

function titleFocus(context) {
  const weak = new Set(["poor student", "best friend", "student", "friend", "teacher", "ceo", "mother"]);
  const stronger = context.keywords.find((keyword) => !weak.has(keyword));
  return titleCase(stronger || context.mainConflict);
}

function buildIdeaTitle(context, fallbackTitle) {
  if (!context.storyIdea) return fallbackTitle;

  const primaryKeyword = titleFocus(context);
  const titles = [
    `The Secret Behind ${primaryKeyword}`,
    `When ${context.ideaShort}`,
    `The ${context.mainCharacter} Who Exposed ${titleCase(context.mainConflict)}`,
    `The Friend Who Hid ${primaryKeyword}`,
    `The Truth About ${primaryKeyword}`
  ];

  return pick(titles);
}

function buildConflictDetail(context) {
  if (!context.storyIdea) return pick(templateLibrary.conflictTemplates);

  const lower = context.storyIdea.toLowerCase();
  if (lower.includes("exam") || lower.includes("teacher") || lower.includes("grade")) {
    return "the exam result was changed on purpose, and the payment trail points to someone close to the hero";
  }
  if (lower.includes("money") || lower.includes("paid") || lower.includes("debt")) {
    return "money is not just pressure; it is the proof that explains who controlled the situation";
  }
  if (lower.includes("friend") || lower.includes("betray")) {
    return "the trusted friend has been hiding the one detail that makes the betrayal understandable";
  }
  if (lower.includes("love") || lower.includes("crush") || lower.includes("ex")) {
    return "the romantic misunderstanding is built around one missing message";
  }
  if (lower.includes("mother") || lower.includes("family") || lower.includes("sister") || lower.includes("brother")) {
    return "the family member who looks guilty is protecting a deeper secret";
  }
  if (lower.includes("crime") || lower.includes("detective") || lower.includes("evidence")) {
    return "the first clue is real, but the person who found it is not innocent";
  }

  return `the hidden reason behind "${context.ideaShort}" is revealed through ${context.keywordLine}`;
}

function chooseScene(context) {
  const lower = `${context.storyIdea} ${context.genre} ${context.mainConflict} ${context.keywordLine}`.toLowerCase();
  const sceneGroups = [
    {
      signals: ["school", "student", "exam", "teacher", "class", "grade"],
      match: ["classroom", "school", "principal", "teacher", "cafeteria", "library", "broadcast", "stairwell", "exam"]
    },
    {
      signals: ["ceo", "boss", "office", "employee"],
      match: ["office", "ceo", "boardroom", "lobby"]
    },
    {
      signals: ["crime", "detective", "evidence", "police", "case"],
      match: ["police", "interview", "evidence", "parking", "phone"]
    },
    {
      signals: ["family", "mother", "father", "sister", "brother", "parent"],
      match: ["family", "dinner", "hospital", "bedroom", "shop"]
    },
    {
      signals: ["romance", "love", "crush", "ex", "couple"],
      match: ["rooftop", "umbrella", "wedding", "restaurant"]
    },
    {
      signals: ["time", "loop", "future", "sci-fi"],
      match: ["future", "train", "memory", "repeating"]
    },
    {
      signals: ["horror", "creepy", "supernatural", "ghost"],
      match: ["haunted", "mirror", "power outage", "hallway"]
    }
  ];

  const group = sceneGroups.find((item) => item.signals.some((signal) => lower.includes(signal)));
  const pool = group
    ? templateLibrary.sceneTemplates.filter((scene) => group.match.some((word) => scene.toLowerCase().includes(word)))
    : templateLibrary.sceneTemplates;

  return pick(pool, pick(templateLibrary.sceneTemplates));
}

function buildIdeaTwist(context, conflictDetail) {
  const main = characterProfiles[context.detectedCharacters[0]] || characterProfiles[context.mainCharacter];
  const support = characterProfiles[context.detectedCharacters[1]] || characterProfiles["Best Friend"];
  const clue = context.keywords[0] || context.mainConflict.toLowerCase();
  const lower = context.storyIdea.toLowerCase();

  if (context.endingType === "Happy Ending") {
    return `${main.name} exposes ${conflictDetail}, but the final beat reveals ${support.name} did the wrong thing to stop a worse plan. They do not forget the betrayal, but they choose a careful second chance.`;
  }
  if (context.endingType === "Sad Ending") {
    return `${main.name} proves the truth about ${clue}, but the friendship cannot return to normal. The final shot is the hero holding the proof alone.`;
  }
  if (context.endingType === "Open Ending") {
    return `${main.name} finds enough proof to confront ${support.name}, then a new message suggests someone else arranged the entire setup.`;
  }
  if (context.endingType === "Revenge Ending") {
    return `${main.name} lets ${support.name} explain the payment on camera, then reveals the teacher's second receipt before walking away.`;
  }
  if (context.endingType === "Emotional Ending") {
    return `${main.name} learns the betrayal was real, but the motive was more painful than the action. The ending focuses on the broken trust, not the win.`;
  }
  if (lower.includes("exam") || lower.includes("teacher") || lower.includes("paid")) {
    return pick([
      `The best friend really paid the teacher, but the final receipt shows a second payment from the person who wanted ${main.name} removed from the competition.`,
      `${main.name} discovers the payment was real, but ${support.name} paid to delay the exam result so the teacher's grade-selling scheme could be caught on camera.`,
      `The teacher admits ${support.name} paid first, then reveals another name on the receipt: the person who wanted ${main.name} to lose the scholarship.`
    ]);
  }

  return `${support.name} is guilty of hiding the truth, but the final clue proves they were also being controlled by someone connected to ${context.keywordLine}.`;
}

function buildDialogueLines(context, main, support) {
  if (!context.storyIdea) {
    return [
      pick(templateLibrary.dialoguePatterns).replace("{main}", main.name).replace("{support}", support.name),
      pick(templateLibrary.dialoguePatterns).replace("{main}", main.name).replace("{support}", support.name)
    ];
  }

  const clue = context.keywords[0] || context.mainConflict.toLowerCase();
  const lines = [
    `${main.name}: "I did not fail because I was weak. I failed because someone paid for it."`,
    `${support.name}: "I was going to tell you after I fixed it."`,
    `${main.name}: "Then why is your name connected to ${clue}?"`,
    `${support.name}: "Because I thought betraying you once would save you from something worse."`,
    `${main.name}: "You were my best friend. That was the one person I never checked."`,
    `${support.name}: "Check the second receipt. I am not the only one who paid."`
  ];

  const first = pick(lines.slice(0, 3));
  const second = pick(lines.slice(3));
  return [first, second];
}

function buildScript(context, hook, scene, twist, conflictDetail) {
  const beats = lengthBeats[context.length] || lengthBeats["60 seconds"];
  const main = characterProfiles[context.detectedCharacters[0]] || characterProfiles[context.mainCharacter];
  const support = characterProfiles[context.detectedCharacters[1]] || characterProfiles["Best Friend"];
  const [dialogueA, dialogueB] = buildDialogueLines(context, main, support);
  const ideaAnchor = context.storyIdea
    ? `Keep the scene clearly centered on this user idea: "${context.storyIdea}".`
    : `Build the scene around ${context.mainConflict.toLowerCase()}, ${context.relationship.toLowerCase()} and a ${context.tone.toLowerCase()} reveal.`;

  const styleDirection = {
    "Simple TikTok script": "Use short direct lines and clear captions.",
    "Cinematic script": "Use visual pauses, close-ups and a strong final image.",
    "Dialogue-heavy script": "Let the truth come out through sharp dialogue.",
    "Fast-paced short drama": "Use quick cuts, interruptions and a fast reveal.",
    "Emotional monologue": "Let the main character carry the middle with one vulnerable speech.",
    "Suspense opening": "Delay the explanation and let the clue create tension.",
    "Comedy skit": "Start with a confident lie, then let reality destroy it."
  }[context.outputStyle];

  return [
    `${beats[0]} - Cold open: ${hook} Show the key clue connected to "${context.keywordLine}" before anyone explains it.`,
    `${beats[1]} - Setup: ${scene} ${main.name} confronts ${support.name}. ${ideaAnchor}`,
    `${beats[2]} - Escalation: ${dialogueA} Add a reaction cut, then reveal the conflict detail: ${conflictDetail}. ${dialogueB}`,
    `${beats[3]} - Ending: ${twist} ${styleDirection} End on a final expression or unfinished sentence so viewers want the next part.`
  ];
}

function buildProductionNotes(context) {
  const byType = (type) => templateLibrary.productionNoteTemplates.filter((item) => item.type === type).map((item) => item.text);
  const musicPool = byType("music");
  const toneLower = `${context.tone} ${context.genre} ${context.mainConflict}`.toLowerCase();
  const music =
    toneLower.includes("funny") || toneLower.includes("comedy")
      ? musicPool.find((item) => item.toLowerCase().includes("comedic")) || pick(musicPool)
      : toneLower.includes("suspense") || toneLower.includes("mystery") || toneLower.includes("shocking")
        ? musicPool.find((item) => item.toLowerCase().includes("suspense") || item.toLowerCase().includes("heartbeat")) || pick(musicPool)
        : toneLower.includes("sad") || toneLower.includes("emotional") || toneLower.includes("heartwarming")
          ? musicPool.find((item) => item.toLowerCase().includes("piano")) || pick(musicPool)
          : toneLower.includes("horror") || toneLower.includes("creepy") || toneLower.includes("dark")
            ? musicPool.find((item) => item.toLowerCase().includes("dark")) || pick(musicPool)
            : pick(musicPool);

  return {
    suggestedShots: pick(byType("shots")),
    musicMood: `${context.tone} ${context.genre} mood. ${music}`,
    textOverlayIdea: context.storyIdea
      ? `Text overlay: "What would you do if ${ideaShort(context.storyIdea).toLowerCase()}?"`
      : pick(byType("overlay")),
    editingTip: `${pick(byType("editing"))} Optimize pacing for ${context.platform}.`
  };
}

function languageWrap(context, result) {
  if (context.language === "English") return result;

  const chinese = {
    title: `短剧标题：${result.title}`,
    hook: `开场钩子：围绕「${context.ideaShort}」，用一个反转细节立刻抓住观众。`,
    characters: result.characters.map((line) => `角色设定：${line}`),
    scene: `场景：${result.scene}`,
    script: result.script.map((line) => `中文拍摄节奏：${line}`),
    ending: `结尾反转：${result.ending}`,
    caption: `短视频文案：${result.caption}`,
    productionNotes: {
      suggestedShots: `建议镜头：${result.productionNotes.suggestedShots}`,
      musicMood: `音乐氛围：${result.productionNotes.musicMood}`,
      textOverlayIdea: `字幕想法：${result.productionNotes.textOverlayIdea}`,
      editingTip: `剪辑提示：${result.productionNotes.editingTip}`
    }
  };

  if (context.language === "Chinese") {
    return { ...result, ...chinese };
  }

  return {
    ...result,
    title: `${result.title}\n中文：${chinese.title}`,
    hook: `${result.hook}\n中文：${chinese.hook}`,
    characters: result.characters.map((line, index) => `${line}\n中文：${chinese.characters[index] || line}`),
    scene: `${result.scene}\n中文：${chinese.scene}`,
    script: result.script.map((line, index) => `${line}\n中文：${chinese.script[index] || line}`),
    ending: `${result.ending}\n中文：${chinese.ending}`,
    caption: `${result.caption}\n中文：${chinese.caption}`,
    productionNotes: {
      suggestedShots: `${result.productionNotes.suggestedShots}\n中文：${chinese.productionNotes.suggestedShots}`,
      musicMood: `${result.productionNotes.musicMood}\n中文：${chinese.productionNotes.musicMood}`,
      textOverlayIdea: `${result.productionNotes.textOverlayIdea}\n中文：${chinese.productionNotes.textOverlayIdea}`,
      editingTip: `${result.productionNotes.editingTip}\n中文：${chinese.productionNotes.editingTip}`
    }
  };
}

function buildHashtags(context) {
  const relevanceTerms = [
    context.platform,
    context.genre,
    context.mainConflict,
    context.relationship,
    context.endingType,
    ...context.detectedCharacters,
    ...context.keywords
  ]
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((term) => term.length > 2);

  const scoredGroups = templateLibrary.hashtagGroups
    .map((group) => {
      const groupText = group.join(" ").toLowerCase().replace(/#/g, "");
      const score = relevanceTerms.reduce((total, term) => total + (groupText.includes(term) ? 1 : 0), 0);
      return { group, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const bestScore = scoredGroups[0]?.score || 0;
  const bestGroups = bestScore ? scoredGroups.filter((item) => item.score === bestScore).map((item) => item.group) : [];
  const group = pick(bestGroups, templateLibrary.hashtagGroups[0]);
  const dynamic = [
    `#${context.platform.replace(/\s+/g, "")}`,
    `#${context.genre.replace(/\s+/g, "")}`,
    `#${context.mainConflict.replace(/\s+/g, "")}`,
    ...context.keywords.slice(0, 2).map((keyword) => `#${titleCase(keyword).replace(/\s+/g, "")}`)
  ];

  return unique([...dynamic, ...group]).slice(0, 9).join(" ");
}

export function generateWithTemplate(options = {}) {
  const context = buildContext(options);
  const tags = [
    context.genre,
    context.tone,
    context.platform,
    context.endingType,
    context.relationship,
    context.mainConflict,
    ...context.detectedCharacters,
    ...context.keywords
  ];

  const fallbackHook = pick(filterTemplates(templateLibrary.hooks, tags)).text;
  const fallbackTitle = fillTemplate(pick(templateLibrary.titleTemplates), {
    ...context,
    keywords: context.keywords[0] ? titleCase(context.keywords[0]) : context.mainConflict
  });
  const hook = buildIdeaHook(context, fallbackHook);
  const title = buildIdeaTitle(context, fallbackTitle);
  const centralIdea = context.storyIdea
    ? context.storyIdea.replace(/[.!?]+$/, "")
    : `${context.mainConflict} between ${context.relationship.toLowerCase()}`;
  const scene = `${chooseScene(context)} The central idea is: ${centralIdea}.`;
  const conflict = buildConflictDetail(context);
  const twist = context.storyIdea
    ? buildIdeaTwist(context, conflict)
    : context.endingType === "Happy Ending"
      ? `The truth comes out, but the final choice is forgiveness: ${conflict}.`
      : context.endingType === "Sad Ending"
        ? `The hero exposes ${context.mainConflict.toLowerCase()}, but loses the relationship they wanted to save.`
        : context.endingType === "Open Ending"
          ? `The evidence appears to solve the story, then a new message suggests the real answer is still hidden.`
          : context.endingType === "Revenge Ending"
            ? `The apology was a trap. The hero lets the liar confess on camera, then walks away.`
            : context.endingType === "Emotional Ending"
              ? `The final reveal is not about winning; it is about why the betrayal hurt so much.`
              : pick(templateLibrary.twistTemplates);

  const baseResult = {
    title,
    hook,
    storyIdea: context.storyIdea || "No custom story idea entered. Generated from selected options.",
    extractedKeywords: context.keywords,
    detectedCharacters: context.detectedCharacters,
    detectedConflict: context.mainConflict,
    characters: buildCharacters(context),
    scene,
    script: buildScript(context, hook, scene, twist, conflict),
    ending: twist,
    caption: `${pick(templateLibrary.captionTemplates)} Built for ${context.platform}.`,
    hashtags: buildHashtags(context),
    productionNotes: buildProductionNotes(context),
    meta: {
      mode: "Free Template Mode",
      platform: context.platform,
      outputStyle: context.outputStyle,
      language: context.language
    }
  };

  return languageWrap(context, baseResult);
}

export function generateDramaScript(options = {}) {
  return generateWithTemplate(options);
}

export async function generateWithAI() {
  throw new Error("Pro AI Mode is not enabled yet. Add a secure server API before connecting real AI generation.");
}
