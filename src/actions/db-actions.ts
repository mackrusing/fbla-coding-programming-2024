"use server";

// db
import { orgsTable } from "@/db/schema";
import { db, NewOrg } from "@/db/drizzle";

/**
 * Add a new organization to the database and return the success of the
 * operation.
 * @param org The new org to add to the database
 * @returns {Promise<boolean>} The success of the operation
 */
export async function addOrg(org: NewOrg): Promise<boolean> {
  const res = await db.insert(orgsTable).values(org);
  if (res.rowCount == 1) {
    return true;
  } else {
    return false;
  }
}
