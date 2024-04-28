// db
import { db, NewOrg } from "@/db/drizzle";
import { orgsTable } from "@/db/schema";

/**
 * Reset the database to a predefined default state for use in demo.
 */
export async function DELETE(request: Request) {
  // remove all rows
  await db.delete(orgsTable);

  // url
  const origin = new URL(request.url).origin;
  const url = new URL("default.json", origin);

  // read deafults from file and reinsert
  const defaults: NewOrg[] = await (await fetch(url)).json();
  for (const org of defaults) {
    await db.insert(orgsTable).values(org);
  }

  // send no content response
  return new Response(null, { status: 204 });
}
