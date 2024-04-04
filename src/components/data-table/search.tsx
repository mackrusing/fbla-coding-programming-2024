"use client";

// icons
import { SearchIcon, LoaderCircleIcon } from "lucide-react";
// ui
import { Input } from "@/ui/input";
// next
import { useRouter, usePathname } from "next/navigation";
// react
import { useDebounce } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";

export function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const [input, setInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const search = useDebounce(input, 200);

  function handleChange(value: string) {
    setInput(value);
    setIsSearching(true);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("p");
    if (search) {
      params.set("q", search);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
    setIsSearching(false);
  }, [search]);

  return (
    <div className="relative mr-auto w-fit">
      <SearchIcon className="absolute left-3 top-3 h-4 w-4" />
      <Input
        type="input"
        onChange={(e) => handleChange(e.target.value)}
        className="w-full pl-9 text-[16px] sm:w-80 sm:text-sm"
        placeholder="Search by name"
      />
      {isSearching ? (
        <LoaderCircleIcon className="absolute right-3 top-3 h-4 w-4 animate-spin" />
      ) : (
        <></>
      )}
    </div>
  );
}
