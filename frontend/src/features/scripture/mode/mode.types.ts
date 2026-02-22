export type ScriptMode = "devanagari" | "iast" | "both";

export type TranslationMode = "primary" | "all" | "none";

export type CommentaryMode = "none" | "primary" | "all";

export type DensityMode = "normal" | "scholarly";

export interface ScriptureMode {
  script: ScriptMode;
  translation: TranslationMode;
  commentary: CommentaryMode;
  density: DensityMode;
}
