export const CONTACT_EMAIL = "hanhan2009518@gmail.com";
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export async function submitEmailForm(source, payload) {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      _subject: `PlotTwist AI - ${source}`,
      _template: "table",
      _captcha: "false",
      _honey: "",
      website: "PlotTwist AI",
      source,
      submittedAt: new Date().toISOString(),
      ...payload
    })
  });

  if (!response.ok) {
    throw new Error("Email service request failed.");
  }

  return response.json().catch(() => ({}));
}
