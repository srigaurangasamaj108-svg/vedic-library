"use client";

import { useScriptureMode } from "./mode.context";

export function TranslationToggle() {
  const { mode, setMode } = useScriptureMode();

  function updateTranslation(
    translation: "primary" | "none"
  ) {
    setMode({
      ...mode,
      translation,
    });
  }

  const base =
    "px-3 py-1 text-sm border rounded transition-colors";

  const active =
    "bg-black text-white border-black";

  const inactive =
    "bg-white text-gray-600 border-gray-300 hover:bg-gray-100";

  return (
    <div className="flex gap-2">
      <button
        onClick={() => updateTranslation("primary")}
        className={`${base} ${
          mode.translation === "primary"
            ? active
            : inactive
        }`}
      >
        Translation
      </button>

      <button
        onClick={() => updateTranslation("none")}
        className={`${base} ${
          mode.translation === "none"
            ? active
            : inactive
        }`}
      >
        Hide
      </button>
    </div>
  );
}
