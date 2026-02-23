"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ScriptureMode } from "./mode.types";
import { defaultMode } from "./mode.defaults";

interface ModeContextValue {
  mode: ScriptureMode;
  setMode: (mode: ScriptureMode) => void;
}

const ModeContext = createContext<ModeContextValue | undefined>(undefined);

const STORAGE_KEY = "vedic_library_mode";

export function ScriptureModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ScriptureMode>(defaultMode);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setMode(JSON.parse(stored));
      } catch {
        setMode(defaultMode);
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mode));
  }, [mode]);

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
