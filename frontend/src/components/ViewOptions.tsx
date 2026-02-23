"use client";

import { useScriptureMode } from "@/features/scripture/mode/mode.context";
import { StudyProfile } from "@/features/scripture/mode/mode.types";

export function ViewOptions() {
  const { mode, setMode } = useScriptureMode();

  function applyProfile(profile: StudyProfile) {
    if (profile === "devotional") {
      setMode({
        studyProfile: "devotional",
        script: "both",
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
  }

  function buttonStyle(profile: StudyProfile) {
    const isActive = mode.studyProfile === profile;

    return `px-5 py-2 rounded-full font-medium transition-colors ${
      isActive
        ? "bg-[#e6a75a] bg-opacity-30 text-[#5c4d3c]"
        : "bg-[#e6a75a] bg-opacity-10 hover:bg-opacity-20 text-[#5c4d3c]"
    }`;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16 text-sm font-serif">

      <button
        onClick={() => applyProfile("devotional")}
        className={buttonStyle("devotional")}
      >
        Devotional
      </button>

      <button
        onClick={() => applyProfile("scholarly")}
        className={buttonStyle("scholarly")}
      >
        Scholarly
      </button>

      <button
        onClick={() => applyProfile("comparative")}
        className={buttonStyle("comparative")}
      >
        Comparative
      </button>

    </div>
  );
}
