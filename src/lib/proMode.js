import { aiModeConfig } from "./aiModeConfig.js";

export const proModeState = {
  isProMode: aiModeConfig.devProAccess,
  usageLimit: aiModeConfig.monthlyGenerationLimit,
  monthlyGenerationLimit: aiModeConfig.monthlyGenerationLimit,
  aiModeEnabled: aiModeConfig.aiModeEnabled,
  requireProForAI: aiModeConfig.requireProForAI,
  freeTemplateModeEnabled: aiModeConfig.freeTemplateModeEnabled,
  devProAccess: aiModeConfig.devProAccess,
  subscriptionStatus: aiModeConfig.devProAccess ? "pro-dev" : "free"
};

export async function generateWithAI(payload = {}) {
  try {
    const response = await fetch("/api/generate-ai-script", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      return {
        ok: false,
        error: data.error || "AI Mode is not enabled yet."
      };
    }

    return data;
  } catch {
    return {
      ok: false,
      error: "AI Mode is not available in this environment."
    };
  }
}

export function getProModeMessage() {
  return "Pro AI Studio will understand full story ideas, save characters, generate episode series and create platform-specific versions.";
}
