"use client";

import { useReadingMode } from "@/context/ReadingModeContext";

export function TranslationToggle() {
  const { showTranslation, setShowTranslation } = useReadingMode();

  return (
    <button
      onClick={() => setShowTranslation(!showTranslation)}
      className={`text-sm px-2 py-1 rounded border transition-colors ${
        showTranslation
          ? "bg-gray-100 border-gray-300"
          : "bg-white border-gray-200"
      }`}
    >
      Translation {showTranslation ? "Hide" : "Show"}
    </button>
  );
}