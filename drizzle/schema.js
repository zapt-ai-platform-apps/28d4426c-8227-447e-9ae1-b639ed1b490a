import { pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const jokes = pgTable('jokes', {
  id: serial('id').primaryKey(),
  setup: text('setup').notNull(),
  punchline: text('punchline').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  userId: uuid('user_id').notNull(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  supabaseUserId: uuid('supabase_user_id').notNull().unique(),
  role: text('role').notNull().default('user'),
  createdAt: timestamp('created_at').defaultNow(),
});