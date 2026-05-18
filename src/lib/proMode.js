export const proModeState = {
  isProMode: false,
  usageLimit: 20,
  aiModeEnabled: false,
  subscriptionStatus: "free"
};

export async function generateWithAI() {
  throw new Error("Pro AI Mode is coming soon. Real AI generation must run through a secure server endpoint.");
}

export function getProModeMessage() {
  return "Coming soon. Pro AI Mode will unlock real AI generation, longer scripts, better story understanding and premium templates.";
}
