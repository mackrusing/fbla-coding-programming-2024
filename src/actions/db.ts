"use server";

// db
import { orgsTable } from "@/db/schema";
import { db, NewOrg, Org } from "@/db/drizzle";
// drizzle
import { ilike } from "drizzle-orm";

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

/**
 * Make a db search based on the provided search string and page number.
 * @param search The search term (case-insensitive)
 * @param page The page number
 * @returns {Promise<Org[]>} The list of matched organizations
 */
export async function getOrgs(search: string, page: number): Promise<Org[]> {
  return await db
    .select()
    .from(orgsTable)
    .where(ilike(orgsTable.name, `%${search}%`))
    .orderBy(orgsTable.name)
    .limit(10)
    .offset((page - 1) * 10);
}
