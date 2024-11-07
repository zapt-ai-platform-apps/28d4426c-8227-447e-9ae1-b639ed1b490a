import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './drizzle/schema.js',
  dialect: 'postgres',
  dbCredentials: {
    connectionString: process.env.NEON_DB_URL,
  },
});