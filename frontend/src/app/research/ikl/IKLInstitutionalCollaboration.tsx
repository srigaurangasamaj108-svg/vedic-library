import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const researchDomains = [
  "Digital Humanities",
  "Indology & Textual Studies",
  "Knowledge Graph Modeling",
  "Linguistics & Semantic Annotation",
  "Information Architecture",
  "Ethical AI & Data Governance",
  "Civilizational Studies",
  "Comparative Philosophy",
];

const layers = [
  { name: "Canonical Layer", desc: "UID-anchored primary texts" },
  { name: "Semantic Layer", desc: "Translations, glosses, meanings" },
  { name: "Interpretive Layer", desc: "Commentaries, traditions" },
  { name: "Pedagogical Layer", desc: "Courses, curricula, pathways" },
  { name: "Community Layer", desc: "Discussion, reflection, living inquiry" },
];

const IKLInstitutionalCollaboration = () => (
  <IKLPageLayout
    section="Section V · Expansion & Vision"
    title="Institutional Collaboration & Research Integration"
    subtitle="A Structured Digital Infrastructure for Interdisciplinary Study"
    prev={{ label: "Corpus Scope", href: "/research/indian-knowledge-library/corpus-scope" }}
    next={{ label: "Long-Term Vision", href: "/research/indian-knowledge-library/long-term-vision" }}
  >
    {/* Intro */}
    <P>The Indian Knowledge Library is not merely a preservation initiative.</P>
    <P>
      It is a research-ready digital infrastructure designed to support interdisciplinary inquiry
      into textual traditions, knowledge systems, semantic modeling, and civilizational continuity.
    </P>
    <P>
      This section outlines how academic institutions, researchers, and technical collaborators
      may engage with the project.
    </P>

    <Divider />

    {/* Section 1 — Research Domains */}
    <H3>Interdisciplinary Relevance</H3>
    <P>The infrastructure supports research across domains:</P>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-8">
      {researchDomains.map((domain) => (
        <div
          key={domain}
          className="border border-gold-separator/40 rounded bg-parchment-dark/20 px-5 py-3.5 font-serif text-sm md:text-base text-indigo-deep/90"
        >
          {domain}
        </div>
      ))}
    </div>

    <P>
      The system is designed to allow structured extraction, reference stability, and layered
      interpretation without compromising canonical integrity.
    </P>

    <Divider />

    {/* Section 2 — Data Structure as Research Tool */}
    <H3>From Text to Structured Knowledge</H3>
    <P>Each canonical unit is:</P>
    <BulletList
      items={[
        "UID anchored",
        "Schema validated",
        "Version controlled",
        "Layer-separated",
      ]}
    />
    <P>This enables:</P>
    <BulletList
      items={[
        "Cross-commentary comparison",
        "Semantic mapping",
        "Intertextual referencing",
        "Computational analysis",
        "Citation stability",
      ]}
    />
    <P className="font-medium text-indigo-deep/90">
      The architecture is built for research durability, not short-term presentation.
    </P>

    <Divider />

    {/* Visual — Research Integration Diagram */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-8 font-medium">
        Research Integration Model
      </p>

      <div className="border border-gold-separator/30 rounded-lg bg-parchment-dark/20 p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-12">
          {/* Layers column */}
          <div className="space-y-2 flex-1 max-w-sm">
            {layers.map((layer, i) => (
              <div key={layer.name}>
                <div className="border border-gold-separator/40 rounded bg-parchment px-5 py-3 text-center">
                  <span className="font-serif text-sm font-semibold text-indigo-deep block">
                    {layer.name}
                  </span>
                  <span className="text-xs text-indigo-medium/50">{layer.desc}</span>
                </div>
                {i < layers.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="h-4 w-px bg-gold-separator/60" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Research domains mapping */}
          <div className="flex-1 max-w-xs space-y-3">
            <p className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-4 text-center md:text-left">
              Research Domains
            </p>
            {["Digital Humanities", "Indology", "Knowledge Graphs", "Linguistics", "Ethical AI"].map(
              (d) => (
                <div
                  key={d}
                  className="border border-indigo-deep/10 rounded bg-parchment-dark/10 px-4 py-2 text-xs md:text-sm font-serif text-indigo-deep/80 text-center md:text-left"
                >
                  {d}
                </div>
              )
            )}
            <p className="text-xs text-indigo-medium/40 italic text-center md:text-left pt-1">
              ← mapping into multiple layers
            </p>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-indigo-medium/50 mt-4 italic">
        A layered infrastructure enabling multi-domain inquiry.
      </p>
    </div>

    <Divider />

    {/* Section 3 — Collaboration Models */}
    <H3>Modes of Academic Engagement</H3>
    <P>Possible collaborations include:</P>
    <BulletList
      items={[
        "Joint research projects",
        "Structured corpus digitization",
        "Semantic tagging partnerships",
        "Conference presentations",
        "Graduate-level thesis integration",
        "Technical architecture research",
      ]}
    />
    <P>The project welcomes:</P>
    <div className="my-6 space-y-1">
      {["Scholars.", "Data scientists.", "Linguists.", "Architects of digital systems.", "Civilizational theorists."].map(
        (line) => (
          <p key={line} className="font-serif text-base text-indigo-deep/90 italic">
            {line}
          </p>
        )
      )}
    </div>

    <Divider />

    {/* Section 4 — Ethical Framework */}
    <H3>Governance & Data Responsibility</H3>
    <P>All collaboration operates under:</P>
    <BulletList
      items={[
        "Canonical immutability principles",
        "Reference-based authority",
        "Explicit schema validation",
        "Transparent versioning",
      ]}
    />
    <P className="font-medium text-indigo-deep/90">
      No research layer may modify canonical data.
    </P>
    <Callout>Integrity precedes innovation.</Callout>

    <Divider />

    {/* Section 5 — Long-Term Research Vision */}
    <H3>Toward a Structured Civilizational Archive</H3>
    <P>Over time, the infrastructure may support:</P>
    <BulletList
      items={[
        "Structured digital editions",
        "Comparative sampradāya study",
        "Civilizational analytics",
        "Knowledge transmission research",
        "Cross-cultural textual modeling",
      ]}
    />
    <P className="font-medium text-indigo-deep/90">The ambition is durability.</P>
    <P className="font-medium text-indigo-deep/90">The discipline is structural.</P>
    <P className="font-medium text-indigo-deep/90">The invitation is open.</P>

    <Divider />

    {/* Closing */}
    <div className="text-center space-y-1 py-4">
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">A library preserves text.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">A structured system enables inquiry.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep font-semibold mt-4">
        Collaboration builds continuity.
      </p>
    </div>
  </IKLPageLayout>
);

export default IKLInstitutionalCollaboration;
