import type { Config } from "drizzle-kit";

const drizzleConfig: Config = {
  schema: "src/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
};

export default drizzleConfig;
