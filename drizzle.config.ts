import type { Config } from "drizzle-kit";

const drizzleConfig: Config = {
  schema: "src/db/schema.ts",
  out: "db/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: "db/sqlite.db",
  },
};

export default drizzleConfig;
