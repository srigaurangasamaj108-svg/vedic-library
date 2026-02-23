"use client";

import { useReadingMode } from "@/context/ReadingModeContext";

type StudyMode = "devotional" | "scholarly" | "comparative";

export function StudyModeToggle() {
  const { studyMode, setStudyMode } = useReadingMode();

console.log("Study mode:", studyMode);   // ← ADD IT HERE

  const buttonClass = (value: StudyMode) =>
    `px-2 py-1 text-sm border rounded transition-colors ${
      studyMode === value
        ? "bg-black text-white"
        : "bg-white text-black border-gray-300"
    }`;

  return (
    <div className="flex gap-2">

      <button
        onClick={() => setStudyMode("devotional")}
        className={buttonClass("devotional")}
      >
        Devotional
      </button>

      <button
        onClick={() => setStudyMode("scholarly")}
        className={buttonClass("scholarly")}
      >
        Scholarly
      </button>

      <button
        onClick={() => setStudyMode("comparative")}
        className={buttonClass("comparative")}
      >
        Comparative
      </button>

    </div>
  );
}