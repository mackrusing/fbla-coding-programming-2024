// drizzle
import { pgTable, text, serial } from "drizzle-orm/pg-core";

// table definition
export const orgsTable = pgTable("organizations", {
  // org info
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type", { enum: ["Business", "NonProfit", "Gov"] }).notNull(),
  website: text("website"),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  notes: text("notes"),
  // contact info
  contactFirstName: text("contact_first_name"),
  contactLastName: text("contact_last_name"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  contactNotes: text("contact_notes"),
});
