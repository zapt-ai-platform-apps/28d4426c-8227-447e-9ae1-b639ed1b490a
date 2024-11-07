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
    const { id } = req.query;

    const prompt = `Provide detailed information about the role of a ${id} in construction. Include a brief description, required skills (as an array), educational path, and daily activities. Format the response as a JSON object with "title", "description", "skills", "education", and "image" fields. Use a placeholder image URL for "image".`;

    const result = await createEvent('chatgpt_request', {
      prompt,
      response_type: 'json',
      app_id: process.env.VITE_PUBLIC_APP_ID,
    });

    res.status(200).json({ role: result });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}