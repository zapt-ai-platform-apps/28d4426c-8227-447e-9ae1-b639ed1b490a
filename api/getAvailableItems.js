import { createEvent } from '@zapt/zapt-js';
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.PROJECT_ID,
    },
  },
});

export default async function handler(req, res) {
  try {
    const prompt = `List 8 items that could be used in building a construction scene for kids. For each item, provide a "name" and a placeholder "image" URL. Format the response as a JSON array of items.`;

    const result = await createEvent('chatgpt_request', {
      prompt,
      response_type: 'json',
      app_id: process.env.VITE_PUBLIC_APP_ID,
    });

    res.status(200).json({ items: result });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}