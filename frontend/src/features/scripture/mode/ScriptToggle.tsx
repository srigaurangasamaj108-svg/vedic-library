"use client";

import { useReadingMode } from "@/context/ReadingModeContext";

export function ScriptToggle() {
  const { scriptMode, setScriptMode } = useReadingMode();

  return (
    <div className="flex gap-2 text-sm">

      <button
        onClick={() => setScriptMode("devanagari")}
        className={scriptMode === "devanagari" ? "font-bold underline" : ""}
      >
        Devanagari
      </button>

      <button
        onClick={() => setScriptMode("iast")}
        className={scriptMode === "iast" ? "font-bold underline" : ""}
      >
        IAST
      </button>

      <button
        onClick={() => setScriptMode("both")}
        className={scriptMode === "both" ? "font-bold underline" : ""}
      >
        Both
      </button>

    </div>
  );
}