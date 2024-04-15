// drizzle
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";
// vercel postgres
import { sql } from "@vercel/postgres";
// db
import { orgsTable } from "@/db/schema";

// types
export type Org = InferSelectModel<typeof orgsTable>;
export type NewOrg = InferInsertModel<typeof orgsTable>;
export type OrgType = "Business" | "NonProfit" | "Gov";

// database
// const DATABASE_URL = process.env["DATABASE_URL"];
// const DATABASE_AUTH_TOKEN = process.env["DATABASE_AUTH_TOKEN"];
// if (!DATABASE_URL || !DATABASE_AUTH_TOKEN) {
//   throw new Error("DATABASE_URL and DATABASE_AUTH_TOKEN must be set");
// }
// const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });

// interactable db object
export const db = drizzle(sql);
