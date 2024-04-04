// icons
import { FileDownIcon } from "lucide-react";
// ui
import { Button } from "@/ui/button";

export function Download({
  search,
  disabled,
}: {
  search: string;
  disabled: boolean;
}) {
  return (
    <PossibleLink
      href={"/downloads/export.json?q=" + encodeURIComponent(search)}
      disabled={disabled}
    >
      <Button variant="outline" disabled={disabled}>
        <FileDownIcon className="h-4 w-4" />
      </Button>
    </PossibleLink>
  );
}

function PossibleLink({
  href,
  disabled,
  children,
}: {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return children;
  } else {
    return (
      <a href={href} download>
        {children}
      </a>
    );
  }
}
