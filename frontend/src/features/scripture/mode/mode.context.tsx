"use client";

import { createContext, useContext, useState } from "react";
import { ScriptureMode } from "./mode.types";
import { defaultMode } from "./mode.defaults";

interface ModeContextValue {
  mode: ScriptureMode;
  setMode: (mode: ScriptureMode) => void;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

export function ScriptureModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ScriptureMode>(defaultMode);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useScriptureMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useScriptureMode must be used within ScriptureModeProvider");
  }
  return context;
}
