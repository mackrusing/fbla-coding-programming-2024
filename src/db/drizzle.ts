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

// interactable db object
export const db = drizzle(sql);
