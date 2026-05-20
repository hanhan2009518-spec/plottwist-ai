# Pro AI API Notes

This static MVP includes a safe Vercel Function placeholder at `api/generate-ai.js`.

It does not call OpenAI, does not read Stripe secrets, and does not generate paid AI output yet.

Future implementation notes:

- Keep `POST /api/generate-ai` as the server-only AI endpoint.
- Read `OPENAI_API_KEY` only from server environment variables.
- Verify subscription status before calling the AI provider.
- Never send `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, or webhook secrets to frontend code.
- Validate usage limits and store generation counts on the server.
