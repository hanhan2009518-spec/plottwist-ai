const publicEnv = typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : {};

function readBoolean(name, defaultValue) {
  const value = publicEnv[name];
  if (value === undefined) return defaultValue;
  return String(value).toLowerCase() === "true";
}

function readNumber(name, defaultValue) {
  const value = Number(publicEnv[name]);
  return Number.isFinite(value) ? value : defaultValue;
}

export const aiModeConfig = {
  freeTemplateModeEnabled: true,
  aiModeEnabled: readBoolean("VITE_AI_MODE_ENABLED", false),
  requireProForAI: readBoolean("VITE_REQUIRE_PRO_FOR_AI", true),
  monthlyGenerationLimit: readNumber("VITE_MONTHLY_GENERATION_LIMIT", 100),
  devProAccess: readBoolean("VITE_DEV_PRO_ACCESS", false)
};

export const aiArchitecture = {
  projectType: "static-react",
  serverRoute: "/api/generate-ai",
  note: "Future OpenAI calls must run only through a server-side API route or a Next.js backend."
};
