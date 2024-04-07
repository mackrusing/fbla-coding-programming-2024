"use server";

import { orgsTable } from "@/db/schema";
import { db, NewOrg } from "@/db/drizzle";

export async function addOrg(
  org: NewOrg
) {
  const res = await db.insert(orgsTable).values(org);
  console.log(res);
}
