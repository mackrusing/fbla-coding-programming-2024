// drizzle
import {
  sqliteTable,
  integer,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// table definition
export const orgsTable = sqliteTable(
  "organizations",
  {
    // org info
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
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
  },
  (table) => {
    return {
      nameIdx: uniqueIndex("nameIdx").on(table.name),
    };
  },
);
