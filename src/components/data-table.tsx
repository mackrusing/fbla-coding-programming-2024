// db
import { db } from "@/db/drizzle";
import { orgsTable } from "@/db/schema";
import { like } from "drizzle-orm";
// components
import { Search } from "./data-table/search";
import { New } from "./data-table/new";
import { Download } from "./data-table/download";
import { Table } from "./data-table/table";
import { Pagination } from "./data-table/pagination";

export async function DataTable({
  search,
  page,
}: {
  search: string;
  page: number;
}) {
  // fetch data from db
  const data = await db
    .select()
    .from(orgsTable)
    .where(like(orgsTable.name, `%${search}%`))
    .orderBy(orgsTable.name)
    .limit(10)
    .offset((page - 1) * 10);

  return (
    <div className="space-y-4">
      <div className="flex w-full gap-2">
        <Search />
        <New />
        <Download search={search} disabled={data.length === 0} />
      </div>
      <Table orgs={data} />
      <Pagination search={search} page={page} next={data.length === 10} />
    </div>
  );
}
