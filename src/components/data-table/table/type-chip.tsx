export function TypeChip({
  orgType,
}: {
  orgType: "Business" | "NonProfit" | "Gov";
}) {
  if (orgType === "Business") {
    return (
      <span className="rounded-full border border-emerald-500 bg-emerald-100 px-2 py-1 text-xs">
        Business
      </span>
    );
  }

  if (orgType === "Gov") {
    return (
      <span className="rounded-full border border-blue-500 bg-blue-100 px-2 py-1 text-xs">
        Government
      </span>
    );
  }

  if (orgType === "NonProfit") {
    return (
      <span className="rounded-full border border-orange-500 bg-orange-100 px-2 py-1 text-xs">
        Non Profit
      </span>
    );
  }
}
