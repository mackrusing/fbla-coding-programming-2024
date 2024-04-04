// db
import { db } from "@/db/drizzle";
import { orgsTable } from "@/db/schema";
import { like } from "drizzle-orm";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  const search = new URL(request.url).searchParams.get("q") ?? "";

  const data = await db
    .select()
    .from(orgsTable)
    .where(like(orgsTable.name, `%${search}%`))
    .orderBy(orgsTable.name);

  let headers = new Headers();
  headers.set("Content-Type", "application/json");

  return new Response(JSON.stringify(data), {
    headers: headers,
  });
}
