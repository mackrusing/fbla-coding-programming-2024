// drizzle
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
// sqlite
import Database from "better-sqlite3";
// db
import { orgsTable } from "@/db/schema";

// types
export type Org = InferSelectModel<typeof orgsTable>;
export type NewOrg = InferInsertModel<typeof orgsTable>;
export type OrgType = "Business" | "NonProfit" | "Gov";

// database
const sqlite = new Database("db/sqlite.db");

// interactable db object
export const db = drizzle(sqlite);
