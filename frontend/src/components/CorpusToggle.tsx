"use client";

import { useState } from "react";

export function CorpusToggle({ onToggle }: { onToggle: (v: boolean) => void }) {
  const [visible, setVisible] = useState(true);

  function toggle() {
    const newValue = !visible;
    setVisible(newValue);
    onToggle(newValue);
  }

  return (
    <button
      onClick={toggle}
      className="text-sm px-2 py-1 border rounded bg-white"
    >
      {visible ? "Hide Corpus" : "Show Corpus"}
    </button>
  );
}