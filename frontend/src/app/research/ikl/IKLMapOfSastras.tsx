import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";
import { Link } from "react-router-dom";

const textTypes = [
  { type: "Bhagavad Gītā", unit: "Śloka", depth: "Chapter → Verse", uid: "bg.2.13" },
  { type: "Dharma-sūtra", unit: "Sūtra", depth: "Adhyāya → Sūtra", uid: "manu.sm.2.6" },
  { type: "Veda", unit: "Mantra", depth: "Maṇḍala → Sūkta → Mantra", uid: "rv.1.1.1" },
  { type: "Purāṇa", unit: "Śloka", depth: "Skandha → Adhyāya → Verse", uid: "sb.1.1.1" },
];

const domains = [
  "Śruti", "Smṛti", "Itihāsa", "Purāṇa", "Āgama / Tantra",
  "Vedāṅga", "Upaveda", "Darśana", "Sampradāya Traditions",
];

const IKLMapOfSastras = () => (
  <IKLPageLayout
    section="Section V · Expansion & Vision"
    title="Map of the Śāstric Corpus"
    subtitle="Structural Cartography of Civilizational Knowledge"
    prev={{ label: "Phase Roadmap", href: "/research/indian-knowledge-library/phase-roadmap" }}
    next={{ label: "Corpus Scope", href: "/research/indian-knowledge-library/corpus-scope" }}
  >
    {/* Section I */}
    <H3>How Does One Map a Civilizational Corpus?</H3>
    <P>
      The Indian śāstric tradition spans thousands of works across multiple knowledge domains, genres, and transmission lineages. A meaningful digital system requires more than listing texts — it requires structural mapping.
    </P>
    <P className="font-medium text-indigo-deep/90">
      This page outlines how the Indian Knowledge Library organizes, classifies, and structurally anchors the corpus.
    </P>

    <Divider />

    {/* Section II — Primary Structural Domains */}
    <H3>Major Knowledge Classifications</H3>
    <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-3">
      {domains.map((domain) => (
        <div key={domain} className="border border-gold-separator/30 rounded bg-parchment-dark/20 px-4 py-3 text-center font-serif text-sm text-indigo-deep font-medium">
          {domain}
        </div>
      ))}
    </div>
    <P>These classifications represent macro-structural domains — not interpretive hierarchies.</P>
    <P className="font-medium text-indigo-deep/90">Each domain follows distinct structural conventions.</P>

    <Divider />

    {/* Section III — Structural Unit Types */}
    <H3>Canonical Unit Variations Across Text Types</H3>
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-gold-separator/40">
            {["Text Type", "Primary Unit", "Structural Depth", "Example UID"].map((h) => (
              <th key={h} className="py-3 px-4 text-left font-serif font-semibold text-indigo-deep text-xs tracking-wide uppercase">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {textTypes.map(({ type, unit, depth, uid }) => (
            <tr key={type} className="border-b border-gold-separator/20">
              <td className="py-3 px-4 font-serif font-medium text-indigo-deep">{type}</td>
              <td className="py-3 px-4 text-indigo-medium/80">{unit}</td>
              <td className="py-3 px-4 text-indigo-medium/80">{depth}</td>
              <td className="py-3 px-4 font-mono text-indigo-deep/70">{uid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <P className="font-medium text-indigo-deep/90">
      Canonical identity is adapted to structural type, not forced into uniformity.
    </P>

    <Divider />

    {/* Section IV — Canonical Spine Application */}
    <H3>Spine Declaration Across Works</H3>
    <P>Each major śāstra requires a declared structural spine.</P>
    <P>The spine defines:</P>
    <BulletList items={[
      "Hierarchical depth",
      "Numerical stability",
      "UID derivation logic",
    ]} />

    {/* Spine Declaration Diagram */}
    <div className="my-10">
      <div className="max-w-md mx-auto border border-gold-separator/30 rounded-lg bg-parchment-dark/20 p-6 space-y-3">
        {["Work Declaration", "Division Schema", "Unit Numbering", "UID Generation"].map((step, i, arr) => (
          <div key={step}>
            <div className="px-4 py-2.5 border border-indigo-deep/15 rounded bg-parchment text-center font-serif text-sm text-indigo-deep font-medium">
              {step}
            </div>
            {i < arr.length - 1 && (
              <div className="flex justify-center py-1">
                <div className="h-3 w-px bg-gold-separator/50" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-indigo-medium/60 mt-4 italic">
        Identity derives from structure — not edition.
      </p>
    </div>

    <Divider />

    {/* Section V — Edition Variants */}
    <H3>Managing Variant Traditions Without Identity Drift</H3>
    <P>Different editions may vary in:</P>
    <BulletList items={[
      "Minor numbering shifts",
      "Commentary inclusion",
      "Formatting conventions",
    ]} />
    <P>But canonical identity remains anchored to declared spine.</P>
    <P className="font-medium text-indigo-deep/90">Variants are mapped — not merged.</P>

    <Divider />

    {/* Section VI — Future Corpus Expansion */}
    <H3>From Individual Text to Full Civilizational Coverage</H3>
    <P>Phase 2: Canonical expansion of additional śāstra.</P>
    <P>Phase 3+: Layered semantic, interpretive, and educational modeling.</P>
    <P>Long-term objective:</P>
    <P className="font-medium text-indigo-deep/90">
      Full structural coverage across major śāstric domains.
    </P>
    <P>No timeline promises. No numerical projections. Only architectural commitment.</P>

    <Divider />

    {/* Section VII — Structural Interoperability */}
    <H3>Preparing for Research Integration</H3>
    <P>Stable UID enables:</P>
    <BulletList items={[
      "Cross-text comparison",
      "Interdisciplinary modeling",
      "Digital humanities analysis",
      "Long-term archival durability",
    ]} />

    <Divider />

    {/* Closing */}
    <Callout>
      Mapping precedes meaning.{"\n"}
      Structure precedes scale.
    </Callout>

    {/* Navigation Links */}
    <div className="mt-12 flex flex-col sm:flex-row gap-3">
      {[
        { label: "View Canonical Identity Framework", href: "/research/indian-knowledge-library/canonical-identity-framework" },
        { label: "View Knowledge Layer Model", href: "/research/indian-knowledge-library/knowledge-layer-model" },
        { label: "Return to Main Framework", href: "/research/indian-knowledge-library" },
      ].map(({ label, href }) => (
        <Link
          key={href}
          to={href}
          className="border border-gold-separator/40 rounded px-5 py-3 text-center font-serif text-sm text-indigo-deep font-medium hover:bg-parchment-dark/20 transition-colors"
        >
          {label}
        </Link>
      ))}
    </div>
  </IKLPageLayout>
);

export default IKLMapOfSastras;
