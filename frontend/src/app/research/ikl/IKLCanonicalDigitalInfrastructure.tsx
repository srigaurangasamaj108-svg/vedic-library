import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const IKLCanonicalDigitalInfrastructure = () => (
  <IKLPageLayout
    section="Section II · Four Pillars"
    title="Pillar I — Canonical Digital Infrastructure"
    subtitle="Preserving Structure Before Interpretation"
    prev={{ label: "Phase Roadmap & Expansion Vision", href: "/research/indian-knowledge-library/phase-roadmap" }}
    next={{ label: "Structured Education Framework", href: "/research/indian-knowledge-library/structured-education-framework" }}
  >
    {/* Intro */}
    <P>
      Before education, guidance, or community engagement,
      a stable canonical foundation must exist.
    </P>
    <P>
      Without structural discipline,
      knowledge systems fragment over time.
    </P>
    <P className="font-medium text-indigo-deep/90">
      This pillar establishes the permanent backbone.
    </P>

    <Divider />

    {/* Section 1 */}
    <H3>Defining Canonical Infrastructure</H3>
    <P>Canonical Digital Infrastructure means:</P>
    <BulletList items={[
      "Structurally declared textual units",
      "Stable canonical identity",
      "UID-bound references",
      "Spine-declared hierarchies",
      "Edition-agnostic structure",
      "Immutable canonical layer",
    ]} />
    <P>
      It is not digitization.{"\n"}
      It is not translation.{"\n"}
      It is not commentary.
    </P>
    <P className="font-medium text-indigo-deep/90">It is structural preservation.</P>

    <Divider />

    {/* Visual — Canonical Stack */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-6 font-medium">
        Canonical Stack Diagram
      </p>
      <div className="border border-gold-separator/30 rounded-lg bg-parchment-dark/30 p-8 md:p-12 flex flex-col items-center gap-3">
        {["Verse", "UID", "Spine", "Schema", "Storage"].map((label, i, arr) => (
          <div key={label} className="flex flex-col items-center">
            <div className="px-8 py-3 border border-indigo-deep/20 rounded bg-parchment text-center font-serif text-indigo-deep font-semibold text-sm md:text-base tracking-wide">
              {label}
            </div>
            {i < arr.length - 1 && (
              <div className="h-5 w-px bg-gold-separator/60" />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-indigo-medium/60 mt-4 italic">
        Identity precedes interpretation.
      </p>
    </div>

    <Divider />

    {/* Section 2 */}
    <H3>Why Structure Must Precede Expansion</H3>
    <P>When structure is unclear:</P>
    <BulletList items={[
      "Citations drift",
      "Editions conflict",
      "Commentaries misalign",
      "Curriculum loses reference stability",
      "Research becomes ambiguous",
    ]} />
    <P>A canonical infrastructure:</P>
    <BulletList items={[
      "Stabilizes cross-tradition study",
      "Enables comparative commentary",
      "Supports research-grade referencing",
      "Allows plural interpretations without fragmentation",
    ]} />

    <Divider />

    {/* Section 3 — Layer Separation */}
    <H3>Separation of Layers</H3>
    <P>The infrastructure enforces:</P>
    <div className="my-8 space-y-2">
      {[
        { n: 1, label: "Canonical Layer" },
        { n: 2, label: "Semantic Layer" },
        { n: 3, label: "Interpretive Layer" },
        { n: 4, label: "Pedagogical Layer" },
        { n: 5, label: "Community Layer" },
      ].map(({ n, label }) => (
        <div key={n} className="flex items-center gap-4">
          <span className="text-xs font-medium text-gold w-6 text-right">{n}</span>
          <div className="h-px flex-1 bg-gold-separator/30" />
          <span className="font-serif text-indigo-deep text-sm md:text-base font-medium">{label}</span>
          <div className="h-px flex-1 bg-gold-separator/30" />
        </div>
      ))}
    </div>
    <P>
      Each layer depends downward.{"\n"}
      None modify upward.
    </P>
    <P className="font-medium text-indigo-deep/90">Structural containment protects continuity.</P>

    <Divider />

    {/* Section 4 */}
    <H3>Designed for Generations</H3>
    <P>The system is built so that:</P>
    <BulletList items={[
      "Future technologies may change",
      "Interfaces may evolve",
      "Research tools may expand",
    ]} />
    <P className="font-medium text-indigo-deep/90">
      But canonical identity remains stable.
    </P>
    <P>Continuity outlives software.</P>

    <Divider />

    {/* Closing */}
    <Callout>
      A library survives centuries{"\n"}
      only if its foundation does not move.
    </Callout>
  </IKLPageLayout>
);

export default IKLCanonicalDigitalInfrastructure;
