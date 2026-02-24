"use client";

import { useReadingMode } from "@/context/ReadingModeContext";
import { Button } from "@/components/ui/button";

export function TranslationToggle() {
  const { showTranslation, setShowTranslation } = useReadingMode();

  return (
    <Button
      size="sm"
      variant={showTranslation ? "default" : "outline"}
      onClick={() => setShowTranslation(!showTranslation)}
    >
      Translation {showTranslation ? "Hide" : "Show"}
    </Button>
  );
}
