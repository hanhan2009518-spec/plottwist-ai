import { SITE_URL } from "./siteConfig.js";

export const CONTACT_EMAIL = "hanhan2009518@gmail.com";
export const FORM_ACTION = "https://api.web3forms.com/submit";
export const WEB3FORMS_ACCESS_KEY = "a369c888-ef57-452d-9951-4e491e633187";

export function formReturnUrl(path = "/") {
  return `${SITE_URL}${path}`;
}
