// components
import { DataTable } from "@/components/data-table";
// lib
import { createNumeric } from "@/lib/utils";

export default function HomePage({
  searchParams,
}: {
  searchParams: { q?: string; p?: string };
}) {
  let search = searchParams.q ?? "";
  let page = createNumeric(searchParams.p) ?? 1;

  return (
    <main className="mx-auto max-w-screen-lg px-4 py-8">
      <div className="py-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Organizations
        </h3>
        <p className="text-sm text-muted-foreground">
          Sunnylope community partners and buisnesses.
        </p>
      </div>
      <DataTable search={search} page={page} />
    </main>
  );
}
