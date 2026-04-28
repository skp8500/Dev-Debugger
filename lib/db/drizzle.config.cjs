// CommonJS config for drizzle-kit
// lib/db has "type":"module", so we use .cjs extension to stay CommonJS
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set.");
}

/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
