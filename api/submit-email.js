const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const sourceSubjects = {
  "Contact form": "PlotTwist AI - Contact form",
  "Homepage email signup": "PlotTwist AI - Homepage email signup",
  "Pro AI Mode waitlist": "PlotTwist AI - Pro AI Mode waitlist"
};

function isValidEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanText(value = "", maxLength = 2000) {
  return String(value).trim().slice(0, maxLength);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ success: false, message: "Method not allowed." });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return response.status(500).json({ success: false, message: "Email service is not configured yet." });
  }

  let body = {};

  try {
    body = typeof request.body === "string" ? JSON.parse(request.body || "{}") : request.body || {};
  } catch {
    return response.status(400).json({ success: false, message: "Invalid form data." });
  }
  const email = cleanText(body.email, 320);
  const source = cleanText(body.source, 80);

  if (!isValidEmail(email)) {
    return response.status(400).json({ success: false, message: "Please enter a valid email address." });
  }

  if (!sourceSubjects[source]) {
    return response.status(400).json({ success: false, message: "Unknown form source." });
  }

  const payload = {
    access_key: accessKey,
    subject: sourceSubjects[source],
    from_name: "PlotTwist AI",
    website: "PlotTwist AI",
    source,
    email,
    name: cleanText(body.name, 120),
    creator_type: cleanText(body.creatorType, 80),
    interest: cleanText(body.interest, 240),
    message: cleanText(body.message, 2000)
  };

  const web3formsResponse = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await web3formsResponse.json().catch(() => ({}));

  if (!web3formsResponse.ok || !data.success) {
    return response.status(502).json({
      success: false,
      message: data.message || "Email could not be sent right now."
    });
  }

  return response.status(200).json({ success: true });
}
