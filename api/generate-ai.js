export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({
      success: false,
      message: "Method not allowed."
    });
  }

  return response.status(503).json({
    success: false,
    message: "AI Mode is not enabled yet.",
    architecture: "Future OpenAI calls must happen only inside this server-side Vercel Function."
  });
}
