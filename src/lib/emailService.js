import { SITE_URL } from "./siteConfig.js";

export const CONTACT_EMAIL = "hanhan2009518@gmail.com";
export const FORM_ACTION = `https://formsubmit.co/${CONTACT_EMAIL}`;

export function formReturnUrl(path = "/") {
  return `${SITE_URL}${path}`;
}
