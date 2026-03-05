import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const permissionZones = [
  { layer: "Community", allowed: true },
  { layer: "Pedagogical", allowed: true },
  { layer: "Interpretive", allowed: true, note: "drafting only" },
  { layer: "Semantic", allowed: true },
  { layer: "Canonical", allowed: false },
];

const IKLAIGovernance = () => (
  <IKLPageLayout
    section="Section III · Architecture & Research"
    title="AI Governance & Safeguards"
    subtitle="AI as Instrument — Never as Authority"
    prev={{ label: "Knowledge Layer Model", href: "/research/indian-knowledge-library/knowledge-layer-model" }}
    next={{ label: "Technical Architecture", href: "/research/indian-knowledge-library/technical-architecture" }}
  >
    {/* Intro */}
    <P>Artificial Intelligence is a powerful tool.</P>
    <P>
      In textual traditions rooted in canonical preservation, power must be governed by discipline.
    </P>
    <P className="font-medium text-indigo-deep/90">
      The Indian Knowledge Library defines strict architectural boundaries for AI use.
    </P>

    <Divider />

    {/* Section 1 */}
    <H3>Permitted Domains of AI Assistance</H3>
    <P>AI may assist in:</P>
    <BulletList items={[
      "Translation drafting",
      "Gloss generation",
      "Semantic extraction",
      "Indexing support",
      "Pattern detection",
      "Educational content drafting",
      "Community facilitation",
    ]} />
    <P>AI operates in:</P>
    <div className="my-6 grid grid-cols-2 md:grid-cols-4 gap-3">
      {["Semantic layer", "Interpretive layer", "Pedagogical layer", "Community layer"].map((label) => (
        <div key={label} className="border border-gold-separator/30 rounded bg-parchment-dark/20 px-4 py-3 text-center font-serif text-sm text-indigo-deep font-medium">
          {label}
        </div>
      ))}
    </div>
    <P className="font-medium text-indigo-deep/90">Never in canonical layer.</P>

    <Divider />

    {/* Section 2 */}
    <H3>Non-Negotiable Boundaries</H3>
    <P>AI may never:</P>
    <BulletList items={[
      "Generate canonical text",
      "Modify canonical text",
      "Assign or redefine UID",
      "Infer missing canonical structure",
      "Alter declared spine",
      "Resolve doctrinal disputes",
      "Override human editorial authority",
    ]} />
    <P>Canonical layer remains AI-independent.</P>
    <P className="font-medium text-indigo-deep/90">Forever.</P>

    <Divider />

    {/* Visual — AI Permission Zones */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-8 font-medium">
        AI Permission Zones
      </p>
      <div className="max-w-lg mx-auto space-y-2">
        {permissionZones.map(({ layer, allowed, note }) => (
          <div
            key={layer}
            className={`border rounded px-6 py-4 flex items-center justify-between ${
              allowed
                ? "border-gold-separator/40 bg-parchment-dark/15"
                : "border-indigo-deep/30 bg-parchment-dark/40"
            }`}
          >
            <span className="font-serif text-sm md:text-base font-semibold text-indigo-deep">
              {layer}{note ? ` (${note})` : ""}
            </span>
            <span className={`text-xs tracking-wide uppercase ${allowed ? "text-gold" : "text-indigo-deep/60"}`}>
              {allowed ? "AI Permitted" : "🔒 Locked"}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-6 mt-6 text-sm text-indigo-medium/60 italic">
        <span>AI assists above structure.</span>
        <span>Never defines structure.</span>
      </div>
    </div>

    <Divider />

    {/* Section 3 */}
    <H3>Power Requires Containment</H3>
    <P>Large language models generate fluency — not authority.</P>
    <P>Without structural containment:</P>
    <BulletList items={[
      "Canonical drift becomes possible",
      "Translation distortion scales rapidly",
      "Interpretive bias compounds",
      "Structural identity weakens",
    ]} />
    <P>Discipline ensures:</P>
    <BulletList items={[
      "Auditability",
      "Attribution clarity",
      "Reversibility",
      "Human oversight",
    ]} />
    <P className="font-medium text-indigo-deep/90">AI becomes servant — never master.</P>

    <Divider />

    {/* Section 4 */}
    <H3>Review, Attribution, Traceability</H3>
    <P>All AI-assisted outputs must be:</P>
    <BulletList items={[
      "Clearly declared",
      "Human-reviewed",
      "Attributed",
      "Auditable",
    ]} />
    <P>This protects:</P>
    <BulletList items={[
      "Scholarly trust",
      "Institutional adoption",
      "Long-term legitimacy",
    ]} />
    <P className="font-medium text-indigo-deep/90">Architecture governs power.</P>

    <Divider />

    {/* Closing */}
    <Callout>
      Technology evolves.{"\n"}
      Discipline must remain.
    </Callout>
  </IKLPageLayout>
);

export default IKLAIGovernance;
