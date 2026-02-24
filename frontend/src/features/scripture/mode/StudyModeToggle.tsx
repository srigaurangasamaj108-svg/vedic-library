"use client";

import { useReadingMode } from "@/context/ReadingModeContext";
import { Button } from "@/components/ui/button";

type StudyMode = "devotional" | "scholarly" | "comparative";

export function StudyModeToggle() {
  const { studyMode, setStudyMode } = useReadingMode();

  const modes: StudyMode[] = ["devotional", "scholarly", "comparative"];

  return (
    <div className="flex gap-2">
      {modes.map((mode) => (
        <Button
          key={mode}
          size="sm"
          variant={studyMode === mode ? "default" : "outline"}
          onClick={() => setStudyMode(mode)}
        >
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </Button>
      ))}
    </div>
  );
}
