"use client";

import { useScriptureMode } from "./mode.context";

export function ScriptToggle() {
  const { mode, setMode } = useScriptureMode();

  function updateScript(script: "devanagari" | "iast" | "both") {
    setMode({
      ...mode,
      script,
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
        onClick={() => updateScript("devanagari")}
        className={`${base} ${
          mode.script === "devanagari" ? active : inactive
        }`}
      >
        Devanagari
      </button>

      <button
        onClick={() => updateScript("iast")}
        className={`${base} ${
          mode.script === "iast" ? active : inactive
        }`}
      >
        IAST
      </button>

      <button
        onClick={() => updateScript("both")}
        className={`${base} ${
          mode.script === "both" ? active : inactive
        }`}
      >
        Both
      </button>
    </div>
  );
}
