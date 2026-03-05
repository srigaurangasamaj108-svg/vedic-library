import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const IKLCurrentPhase = () => (
  <IKLPageLayout
    section="Section IV · Implementation"
    title="Current Phase & Implementation Status"
    subtitle="Building Structure Before Expansion"
    prev={{ label: "Research & Digital Humanities", href: "/research/indian-knowledge-library/research-digital-humanities" }}
    next={{ label: "Phase Roadmap", href: "/research/indian-knowledge-library/phase-roadmap" }}
  >
    {/* Intro */}
    <P>The Indian Knowledge Library advances by defined phases.</P>
    <P>Each phase is completed and locked before the next begins.</P>
    <P className="font-medium text-indigo-deep/90">
      This ensures structural stability, architectural clarity, and long-term integrity.
    </P>

    <Divider />

    {/* Section 1 — Completed Phases */}
    <H3>Completed & Locked</H3>

    <div className="my-8 space-y-4">
      {/* Card 1 */}
      <div className="border border-gold-separator/40 rounded-lg bg-parchment-dark/20 p-6 md:p-8">
        <p className="font-serif text-lg font-semibold text-indigo-deep mb-4">
          Phase 0 — Foundation & Architecture
        </p>
        <BulletList items={[
          "Project Constitution declared",
          "Canonical identity framework defined",
          "UID system formalized",
          "Spine declaration model established",
          "Schema contracts written",
          "Governance hierarchy locked",
        ]} />
      </div>

      {/* Card 2 */}
      <div className="border border-gold-separator/40 rounded-lg bg-parchment-dark/20 p-6 md:p-8">
        <p className="font-serif text-lg font-semibold text-indigo-deep mb-4">
          Phase 1 — Canonical Reader Pilot
        </p>
        <BulletList items={[
          "Bhagavad-gītā implemented",
          "Verse-level navigation",
          "Devanāgarī + IAST",
          "Word-by-word layer",
          "Multi-language translations",
          "Calm reading interface validated",
        ]} />
      </div>
    </div>

    <P className="font-medium text-indigo-deep/90">Once locked, phases are not retroactively altered.</P>

    <Divider />

    {/* Visual — Phase Timeline */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-8 font-medium">
        Phase Timeline
      </p>
      <div className="max-w-xl mx-auto flex items-center justify-center">
        {[
          { label: "Phase 0", status: "Locked" },
          { label: "Phase 1", status: "Locked" },
          { label: "Phase 2", status: "Active" },
        ].map(({ label, status }, i, arr) => (
          <div key={label} className="flex items-center">
            <div className={`px-5 py-3 rounded border text-center ${
              status === "Active"
                ? "border-gold bg-parchment-dark/35"
                : "border-gold-separator/30 bg-parchment-dark/15"
            }`}>
              <p className="font-serif text-sm font-semibold text-indigo-deep">{label}</p>
              <p className={`text-xs mt-1 ${status === "Active" ? "text-gold font-medium" : "text-indigo-medium/50"}`}>
                {status}
              </p>
            </div>
            {i < arr.length - 1 && (
              <div className="w-8 md:w-12 h-px bg-gold-separator/60" />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-indigo-medium/60 mt-6 italic">
        Advancement through locking, not iteration.
      </p>
    </div>

    <Divider />

    {/* Section 2 — Current Phase */}
    <H3>Phase 2 — Canonical Expansion</H3>
    <P>Current work focuses exclusively on:</P>
    <BulletList items={[
      "Canonical ingestion of additional śāstra",
      "Validation of multiple canonical unit types",
      "Stress-testing UID grammar",
      "Refinement of canonical spine declarations",
      "Pipeline standardization",
    ]} />
    <P>Deliberately excluded:</P>
    <BulletList items={[
      "Commentary comparison tools",
      "AI interpretation features",
      "Community modules",
      "Monetization systems",
      "Platform expansion",
    ]} />
    <P className="font-medium text-indigo-deep/90">Expansion without stability is avoided.</P>

    <Divider />

    {/* Section 3 */}
    <H3>Why Not Build Everything at Once?</H3>
    <P>Large knowledge systems fail when:</P>
    <BulletList items={[
      "Features outrun foundations",
      "UI decisions redefine structure",
      "Interpretation alters identity",
      "Scale precedes stability",
    ]} />
    <P>The Indian Knowledge Library proceeds in the opposite order:</P>
    <P className="font-medium text-indigo-deep/90">Structure first. Growth later.</P>

    <Divider />

    {/* Section 4 */}
    <H3>Open Architectural Documentation</H3>
    <P>All core documents are versioned and structured.</P>
    <P>Authority is declared by:</P>
    <BulletList items={[
      "Constitutional documents",
      "Phase status reports",
      "Architectural contracts",
      "Schema definitions",
    ]} />
    <P className="font-medium text-indigo-deep/90">
      The system is documented to remain stable across decades — not just releases.
    </P>

    <Divider />

    {/* Closing */}
    <Callout>
      The project advances by phases, not by patches.{"\n"}
      What is locked remains locked.
    </Callout>
  </IKLPageLayout>
);

export default IKLCurrentPhase;
