export type ScriptMode = "devanagari" | "iast" | "both";

export type TranslationMode = "show" | "none";

export type PurportMode = "hidden" | "collapsed" | "visible";

export type StudyProfile =
  | "devotional"
  | "scholarly"
  | "comparative";

export interface ScriptureMode {
  studyProfile: StudyProfile;
  script: ScriptMode;
  translation: TranslationMode;
  purport: PurportMode;
}
