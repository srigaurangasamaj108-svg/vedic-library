import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const archLayers = [
  { name: "Governance & Validation Layer", desc: "Enforcement" },
  { name: "Application & Presentation Layer", desc: "Interface" },
  { name: "Semantic & Interpretive Data Layer", desc: "Meaning" },
  { name: "Canonical Data Layer", desc: "Foundation" },
];

const IKLTechnicalArchitecture = () => (
  <IKLPageLayout
    section="Section III · Architecture & Research"
    title="Technical Architecture Overview"
    subtitle="From Canonical Discipline to Enforceable Infrastructure"
    prev={{ label: "AI Governance & Safeguards", href: "/research/indian-knowledge-library/ai-governance" }}
    next={{ label: "Research & Digital Humanities", href: "/research/indian-knowledge-library/research-digital-humanities" }}
  >
    {/* Intro */}
    <P>Philosophy defines intent.</P>
    <P>Architecture enforces discipline.</P>
    <P className="font-medium text-indigo-deep/90">
      The Indian Knowledge Library is built as a layered system — ensuring canonical integrity is not merely declared, but technically enforced.
    </P>

    <Divider />

    {/* Section 1 */}
    <H3>System Layer Separation</H3>
    <P>The system is organized into distinct layers:</P>
    <BulletList items={[
      "Canonical Data Layer",
      "Semantic & Interpretive Data Layer",
      "Application & Presentation Layer",
      "Governance & Validation Layer",
    ]} />
    <P>Each layer operates independently — yet depends downward on structural contracts.</P>
    <P className="font-medium text-indigo-deep/90">This prevents cross-layer contamination.</P>

    <Divider />

    {/* Visual — System Architecture Stack */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-8 font-medium">
        System Architecture Layers
      </p>
      <div className="max-w-lg mx-auto space-y-2">
        {archLayers.map(({ name, desc }, i) => (
          <div
            key={name}
            className={`border border-gold-separator/40 rounded px-6 py-4 flex items-center justify-between ${
              i === archLayers.length - 1 ? "bg-parchment-dark/50" : "bg-parchment-dark/15"
            }`}
          >
            <span className="font-serif text-sm md:text-base font-semibold text-indigo-deep">{name}</span>
            <span className="text-xs text-indigo-medium/50 tracking-wide uppercase">{desc}</span>
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-indigo-medium/60 mt-6 italic">
        Separation enables stability.
      </p>
    </div>

    <Divider />

    {/* Section 2 */}
    <H3>Canonical Data Discipline</H3>
    <P>Canonical units are:</P>
    <BulletList items={[
      "UID-bound",
      "Spine-resolved",
      "Schema-validated",
      "Immutable once locked",
    ]} />
    <P>Normalization pipelines ensure:</P>
    <BulletList items={[
      "Structural consistency",
      "Marker enforcement",
      "Language alignment",
      "Version tracking",
    ]} />
    <P className="font-medium text-indigo-deep/90">Canonical text is not edited — it is superseded when required.</P>

    <Divider />

    {/* Section 3 — UID System */}
    <H3>Stable Addressing Through UID</H3>
    <P>Each canonical unit receives a Universal Identifier.</P>

    <div className="my-6 border border-gold-separator/30 rounded bg-parchment-dark/20 px-6 py-4 font-mono text-sm text-indigo-deep/80 space-y-1">
      <p>bg.2.13</p>
      <p>manu.sm.2.6</p>
    </div>

    <P>UID encodes:</P>
    <BulletList items={["Location", "Structural hierarchy", "Spine alignment"]} />
    <P>UID never encodes:</P>
    <BulletList items={["Meaning", "Interpretation", "Edition"]} />
    <P>Address stability enables:</P>
    <BulletList items={[
      "Cross-text mapping",
      "Commentary layering",
      "Long-term reference integrity",
    ]} />

    <Divider />

    {/* Section 4 */}
    <H3>Validation as Architectural Guardrail</H3>
    <P>System validators enforce:</P>
    <BulletList items={[
      "Schema conformity",
      "Spine alignment",
      "UID integrity",
      "Layer separation",
      "AI boundary compliance",
    ]} />
    <P className="font-medium text-indigo-deep/90">
      Architecture replaces trust in individuals with enforceable structural discipline.
    </P>

    <Divider />

    {/* Section 5 */}
    <H3>Designed for Scale</H3>
    <P>The system is designed to support:</P>
    <BulletList items={[
      "Multiple śāstra types",
      "Multiple canonical unit structures",
      "Multiple languages",
      "Multiple traditions",
      "Educational overlays",
      "Institutional integration",
    ]} />
    <P>Expansion never alters foundation.</P>
    <P className="font-medium text-indigo-deep/90">Foundation governs expansion.</P>

    <Divider />

    {/* Closing */}
    <Callout>
      Infrastructure is discipline made executable.
    </Callout>
  </IKLPageLayout>
);

export default IKLTechnicalArchitecture;
