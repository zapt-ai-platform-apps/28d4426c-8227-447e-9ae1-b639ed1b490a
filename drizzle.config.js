import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './drizzle/schema.js',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.NEON_DB_URL,
  },
});