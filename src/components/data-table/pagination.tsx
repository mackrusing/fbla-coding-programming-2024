// next
import Link from "next/link";
// ui
import { Button } from "@/ui/button";
// icons
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
// lib
import { constructHomePageUrl } from "@/lib/utils";

export function Pagination({
  search,
  page,
  next,
}: {
  search: string;
  page: number;
  next: boolean;
}) {
  const prevPageUrl = constructHomePageUrl(search, page - 1);
  const nextPageUrl = constructHomePageUrl(search, page + 1);

  return (
    <div className="flex w-full justify-center gap-1">
      <PossibleLink href={prevPageUrl} disabled={page <= 1}>
        <Button
          className="px-3"
          variant="ghost"
          size="icon"
          disabled={page <= 1}
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
      </PossibleLink>
      <Button variant="outline">{page}</Button>
      <PossibleLink href={nextPageUrl} disabled={!next}>
        <Button className="px-3" variant="ghost" disabled={!next}>
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </PossibleLink>
    </div>
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
    return <Link href={href}>{children}</Link>;
  }
}
