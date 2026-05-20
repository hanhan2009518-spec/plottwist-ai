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

export async function generateWithAI() {
  return {
    success: false,
    message: "AI Mode is not enabled yet.",
    result: "AI Mode is not enabled yet."
  };
}

export function getProModeMessage() {
  return "Pro AI Studio will understand full story ideas, save characters, generate episode series and create platform-specific versions.";
}
