import * as Sentry from '@sentry/node';
import { initializeZapt } from '@zapt/zapt-js';
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from '@drizzle-orm/neon-serverless';
import { users } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm/expressions';

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

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);

export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error('Invalid token');
  }

  // Initialize database connection
  neonConfig.fetchConnectionCache = true;
  const sql = neon(process.env.NEON_DB_URL);
  const db = drizzle(sql);

  // Check if user exists in our database
  let [dbUser] = await db
    .select()
    .from(users)
    .where(eq(users.supabaseUserId, user.id))
    .limit(1);

  if (!dbUser) {
    // If user does not exist, insert into database with default role 'user'
    await db
      .insert(users)
      .values({
        supabaseUserId: user.id,
        role: 'user',
      })
      .returning();

    [dbUser] = await db
      .select()
      .from(users)
      .where(eq(users.supabaseUserId, user.id))
      .limit(1);
  }

  // Attach the role to the user object
  user.role = dbUser.role;

  return user;
}