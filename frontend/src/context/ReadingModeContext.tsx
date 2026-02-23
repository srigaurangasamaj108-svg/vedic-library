"use client";

import { createContext, useContext, useState } from "react";

type ScriptMode = "devanagari" | "iast" | "both";
type StudyMode = "devotional" | "scholarly" | "comparative";

interface ReadingModeContextType {
  scriptMode: ScriptMode;
  setScriptMode: (mode: ScriptMode) => void;

  showTranslation: boolean;
  setShowTranslation: (value: boolean) => void;

  studyMode: StudyMode;
  setStudyMode: (mode: StudyMode) => void;
}

const ReadingModeContext = createContext<ReadingModeContextType | undefined>(
  undefined
);

export function ReadingModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scriptMode, setScriptMode] = useState<ScriptMode>("both");
  const [showTranslation, setShowTranslation] = useState(true);
  const [studyMode, setStudyMode] =
    useState<StudyMode>("devotional");

  return (
    <ReadingModeContext.Provider
      value={{
        scriptMode,
        setScriptMode,
        showTranslation,
        setShowTranslation,
        studyMode,
        setStudyMode,
      }}
    >
      {children}
    </ReadingModeContext.Provider>
  );
}

export function useReadingMode() {
  const context = useContext(ReadingModeContext);
  if (!context) {
    throw new Error(
      "useReadingMode must be used inside ReadingModeProvider"
    );
  }
  return context;
}