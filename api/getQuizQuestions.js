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
    const { roleTitle } = req.query;

    const prompt = `Create a quiz with 5 multiple-choice questions about being a ${roleTitle}. Provide each question with four options and indicate the correct answer. Format the response as a JSON array of questions, each with "question", "options", and "correctAnswer" fields.`;

    const result = await createEvent('chatgpt_request', {
      prompt,
      response_type: 'json',
      app_id: process.env.VITE_PUBLIC_APP_ID,
    });

    res.status(200).json({ questions: result });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}