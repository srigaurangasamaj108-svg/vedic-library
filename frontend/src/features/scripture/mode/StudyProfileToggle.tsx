"use client";

import { useScriptureMode } from "./mode.context";

export function StudyProfileToggle() {
  const { mode, setMode } = useScriptureMode();

  const setProfile = (profile: "devotional" | "scholarly" | "comparative") => {
    if (profile === "devotional") {
      setMode({
        studyProfile: "devotional",
        script: "devanagari",
        translation: "show",
        purport: "collapsed",
      });
    }

    if (profile === "scholarly") {
      setMode({
        studyProfile: "scholarly",
        script: "both",
        translation: "show",
        purport: "visible",
      });
    }

    if (profile === "comparative") {
      setMode({
        studyProfile: "comparative",
        script: "both",
        translation: "show",
        purport: "visible",
      });
    }
  };

  return (
    <div className="flex items-center gap-4 text-sm">
      <button
        onClick={() => setProfile("devotional")}
        className={`px-3 py-1 rounded-full transition-colors ${
          mode.studyProfile === "devotional"
            ? "bg-[var(--bg-secondary)] font-semibold"
            : "opacity-70 hover:opacity-100"
        }`}
      >
        Devotional
      </button>

      <button
        onClick={() => setProfile("scholarly")}
        className={`px-3 py-1 rounded-full transition-colors ${
          mode.studyProfile === "scholarly"
            ? "bg-[var(--bg-secondary)] font-semibold"
            : "opacity-70 hover:opacity-100"
        }`}
      >
        Scholarly
      </button>

      <button
        onClick={() => setProfile("comparative")}
        className={`px-3 py-1 rounded-full transition-colors ${
          mode.studyProfile === "comparative"
            ? "bg-[var(--bg-secondary)] font-semibold"
            : "opacity-70 hover:opacity-100"
        }`}
      >
        Comparative
      </button>
    </div>
  );
}
