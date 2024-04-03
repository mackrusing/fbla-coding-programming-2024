// db
import { db } from "@/db/drizzle";
import { orgsTable } from "@/db/schema";

export default async function HomePage() {
  const data = await db
    .select()
    .from(orgsTable)
    .orderBy(orgsTable.name)
    .limit(10);

  const list = data.map((org) => <li>{org.name}</li>);

  return (<ul>{list}</ul>);
}
