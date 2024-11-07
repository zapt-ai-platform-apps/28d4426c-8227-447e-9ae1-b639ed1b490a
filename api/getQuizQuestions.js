import fetch from 'node-fetch';
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.PROJECT_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    // Replace with actual API call to fetch quiz questions
    const response = await fetch('https://external-api.com/quiz-questions', {
      headers: {
        'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      res.status(200).json({ questions: data });
    } else {
      throw new Error('Failed to fetch quiz questions');
    }
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}