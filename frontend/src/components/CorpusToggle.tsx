"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CorpusToggle({ onToggle }: { onToggle: (v: boolean) => void }) {
  const [visible, setVisible] = useState(true);

  function toggle() {
    const newValue = !visible;
    setVisible(newValue);
    onToggle(newValue);
  }

  return (
    <Button
      size="sm"
      variant={visible ? "default" : "outline"}
      onClick={toggle}
    >
      {visible ? "Hide Corpus" : "Show Corpus"}
    </Button>
  );
}
