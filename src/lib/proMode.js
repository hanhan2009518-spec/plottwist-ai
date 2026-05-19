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
  return "Coming soon. Pro AI Studio will understand full story ideas, save characters, generate episode series and create platform-specific versions.";
}
