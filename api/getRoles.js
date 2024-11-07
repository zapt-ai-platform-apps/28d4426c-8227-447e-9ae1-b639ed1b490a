import { createEvent } from '../src/supabaseClient.js';
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID,
    },
  },
});

export default async function handler(req, res) {
  try {
    const prompt = `List 6 construction career roles suitable for kids to explore. For each role, provide a "title", a brief "description", and a placeholder "image" URL. Format the response as a JSON array of roles.`;

    const result = await createEvent('chatgpt_request', {
      prompt,
      response_type: 'json',
      app_id: process.env.VITE_PUBLIC_APP_ID,
    });

    res.status(200).json({ roles: result });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}