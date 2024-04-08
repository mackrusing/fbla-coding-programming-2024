// node
import fs from "fs";
// db
import { db, NewOrg } from "@/db/drizzle";
import { orgsTable } from "@/db/schema";

/**
 * Reset the database to a predefined default state for use in demo.
 */
export async function DELETE(_request: Request) {
  // remove all rows
  await db.delete(orgsTable);

  // read deafults from file and reinsert
  const defaults: NewOrg[] = JSON.parse(
    fs.readFileSync("db/default.json").toString(),
  );
  for (const org of defaults) {
    await db.insert(orgsTable).values(org);
  }

  // send no content response
  return new Response(null, { status: 204 });
}
