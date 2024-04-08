"use client";

// react
import { useCopyToClipboard, useDebounce } from "@uidotdev/usehooks";
import { useState, useEffect } from "react";

export function CopyLink({ text }: { text: string }) {
  // state
  const [_copiedText, copyToClipboard] = useCopyToClipboard();
  const [isAnimating, setIsAnimating] = useState(false);
  const debouncedIsAnimating = useDebounce(isAnimating, 3000); // run animation for 3 seconds

  // event handlers
  function handleClick() {
    copyToClipboard(text);
    setIsAnimating(true);
  }

  // animating the alert for coppied text
  useEffect(() => {
    if (debouncedIsAnimating) {
      setIsAnimating(false);
    }
  }, [debouncedIsAnimating]);

  return (
    <span onClick={handleClick}>
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
