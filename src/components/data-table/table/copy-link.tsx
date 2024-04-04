"use client";

// react
import { useCopyToClipboard, useDebounce } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";
// icons

export function CopyLink({ text }: { text: string }) {
  const [_copiedText, copyToClipboard] = useCopyToClipboard();
  const [isAnimating, setIsAnimating] = useState(false);
  const debouncedIsAnimating = useDebounce(isAnimating, 3000);

  function handleClick() {
    copyToClipboard(text);
    setIsAnimating(true);
  }

  useEffect(() => {
    if (debouncedIsAnimating) {
      setIsAnimating(false);
    }
  }, [debouncedIsAnimating]);

  return (
    <span onClick={(_) => handleClick()}>
      <span className="cursor-pointer underline decoration-muted-foreground">
        {text}
      </span>
      <span
        className={`text-muted-foreground ${isAnimating ? "opacity-100" : "opacity-0"} transition-all`}
      >
        {" "}
        copied
      </span>
    </span>
  );
}
