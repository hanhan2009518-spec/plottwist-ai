const MAX_IDEA_LENGTH = 1000;

const allowedStringFields = [
  "userIdea",
  "genre",
  "length",
  "platform",
  "mainCharacter",
  "relationship",
  "conflict",
  "tone",
  "endingType",
  "language",
  "outputStyle"
];

function isTestMode() {
  return String(process.env.AI_TEST_MODE || "").toLowerCase() === "true";
}

function parseBody(request) {
  if (!request.body) return {};
  if (typeof request.body === "string") {
    try {
      return JSON.parse(request.body);
    } catch {
      return null;
    }
  }
  return request.body;
}

function normalizePayload(body) {
  return allowedStringFields.reduce((payload, field) => {
    const value = body[field];
    payload[field] = typeof value === "string" ? value.trim() : "";
    return payload;
  }, {});
}

function isEmptyPayload(payload) {
  return allowedStringFields.every((field) => !payload[field]);
}

function buildMockResult(payload) {
  const idea = payload.userIdea || "a creator discovers a secret that changes the whole story";
  const genre = payload.genre || "Short drama";
  const tone = payload.tone || "dramatic";
  const platform = payload.platform || "TikTok";
  const mainCharacter = payload.mainCharacter || "Creator";
  const endingType = payload.endingType || "Plot Twist";

  return {
    title: `The Secret Behind ${mainCharacter}`,
    hook: `Everyone thought it was a normal ${genre.toLowerCase()} moment until one hidden detail exposed the truth.`,
    characters: [
      `${mainCharacter}: the person at the center of the story`,
      "Best Friend: knows more than they admit",
      "Witness: notices the clue everyone else missed"
    ],
    scene: `A fast ${platform} scene built around this idea: ${idea}`,
    script: [
      "Open on the main character trying to act normal while the audience sees something is wrong.",
      "The best friend pushes the conversation in a suspicious direction.",
      "A small clue appears on screen and changes the meaning of the first line.",
      "The main character realizes the truth and confronts the person who caused the conflict.",
      `End with a ${tone.toLowerCase()} beat that sets up the ${endingType.toLowerCase()}.`
    ],
    ending: `The final reveal shows the betrayal was planned from the beginning, but the main character already prepared proof.`,
    caption: `Would you forgive them after this?`,
    hashtags: ["#shortdrama", "#plottwist", "#storytime", "#aitools", "#creator"],
    productionNotes: {
      shots: ["Close-up reaction shot", "Over-the-shoulder confrontation", "Fast insert of the hidden clue"],
      musicMood: `${tone} tension with a sharp beat drop at the reveal`,
      textOverlay: "The clue was there from the start...",
      editingTip: "Cut every 1-2 seconds in the first half, then pause briefly before the reveal."
    }
  };
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({
      ok: false,
      error: "Method not allowed."
    });
  }

  const body = parseBody(request);
  if (!body || typeof body !== "object") {
    return response.status(400).json({
      ok: false,
      error: "Invalid request body."
    });
  }

  const payload = normalizePayload(body);
  if (isEmptyPayload(payload)) {
    return response.status(400).json({
      ok: false,
      error: "Request body is empty."
    });
  }

  if (payload.userIdea.length > MAX_IDEA_LENGTH) {
    return response.status(400).json({
      ok: false,
      error: "Story idea must be 1000 characters or less."
    });
  }

  if (isTestMode()) {
    return response.status(200).json({
      ok: true,
      source: "mock",
      result: buildMockResult(payload)
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return response.status(200).json({
      ok: false,
      error: "AI Mode is not configured yet."
    });
  }

  return response.status(200).json({
    ok: false,
    error: "AI Mode is not connected yet."
  });
}
