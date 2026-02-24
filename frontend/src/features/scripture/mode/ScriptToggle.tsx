"use client";

import { useReadingMode } from "@/context/ReadingModeContext";
import { Button } from "@/components/ui/button";

export function ScriptToggle() {
  const { scriptMode, setScriptMode } = useReadingMode();

  return (
    <div className="flex gap-2">

      <Button
        size="sm"
        variant={scriptMode === "devanagari" ? "default" : "outline"}
        onClick={() => setScriptMode("devanagari")}
      >
        Devanagari
      </Button>

      <Button
        size="sm"
        variant={scriptMode === "iast" ? "default" : "outline"}
        onClick={() => setScriptMode("iast")}
      >
        IAST
      </Button>

      <Button
        size="sm"
        variant={scriptMode === "both" ? "default" : "outline"}
        onClick={() => setScriptMode("both")}
      >
        Both
      </Button>

    </div>
  );
}
