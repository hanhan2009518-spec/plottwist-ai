# Pro AI API Placeholder

This static MVP does not expose a real secure backend for OpenAI or Stripe.

Future implementation notes:

- Create a server-only API route such as `POST /api/generate-ai`.
- Read `OPENAI_API_KEY` only from server environment variables.
- Verify subscription status before calling the AI provider.
- Never send `OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, or webhook secrets to frontend code.
- Validate usage limits and store generation counts on the server.
