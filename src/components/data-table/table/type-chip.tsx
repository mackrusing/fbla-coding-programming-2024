// ui
import { Badge } from "@/ui/badge";

export function TypeChip({
  orgType,
}: {
  orgType: "Business" | "NonProfit" | "Gov";
}) {
  if (orgType === "Business") {
    return <Badge variant="outline">Business</Badge>;
  }

  if (orgType === "Gov") {
    return <Badge variant="outline">Government</Badge>;
  }

  if (orgType === "NonProfit") {
    return <Badge variant="outline">Non Profit</Badge>;
  }
}
