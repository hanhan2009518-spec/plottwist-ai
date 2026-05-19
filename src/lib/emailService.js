import { SITE_URL } from "./siteConfig.js";

export const CONTACT_EMAIL = "hanhan2009518@gmail.com";
export const FORM_ACTION = "/api/submit-email";

export function formReturnUrl(path = "/") {
  return `${SITE_URL}${path}`;
}

export async function submitEmailForm(payload) {
  const response = await fetch(FORM_ACTION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Email could not be sent.");
  }

  return data;
}
