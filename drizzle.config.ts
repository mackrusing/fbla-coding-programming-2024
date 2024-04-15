import type { Config } from "drizzle-kit";

const drizzleConfig: Config = {
  schema: "src/db/schema.ts",
  out: "db",
  driver: "turso",
  dbCredentials: {
    url: process.env["DATABASE_URL"]!,
    authToken: process.env["DATABASE_AUTH_TOKEN"],
  },
};

export default drizzleConfig;
