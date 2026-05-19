import { SITE_URL } from "./siteConfig.js";

export const CONTACT_EMAIL = "hanhan2009518@gmail.com";
export const FORM_ACTION = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "a369c888-ef57-452d-9951-4e491e633187";

export function formReturnUrl(path = "/") {
  return `${SITE_URL}${path}`;
}

export async function submitEmailForm(payload) {
  const response = await fetch(FORM_ACTION, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      from_name: "PlotTwist AI",
      website: "PlotTwist AI",
      ...payload
    })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Email could not be sent.");
  }

  return data;
}
