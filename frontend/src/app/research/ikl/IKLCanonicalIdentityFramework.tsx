import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

/* ───── Shared primitives ───── */
const GoldDivider = () => (
  <div className="flex items-center justify-center py-10">
    <div className="h-px w-16 bg-gold-separator" />
    <div className="mx-3 h-1.5 w-1.5 rotate-45 border border-gold-separator" />
    <div className="h-px w-16 bg-gold-separator" />
  </div>
);

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="py-16 md:py-24">
    <div className="container-page max-w-4xl">{children}</div>
  </section>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-indigo-deep leading-tight mb-8">
    {children}
  </h2>
);

const P = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-base md:text-lg leading-relaxed text-indigo-medium/80 ${className}`}>{children}</p>
);

const BulletGroup = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 my-6">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3 text-base md:text-lg text-indigo-medium/80">
        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
        {item}
      </li>
    ))}
  </ul>
);

const ClosingLine = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-8 font-serif text-base md:text-lg text-indigo-deep/90 italic">{children}</p>
);

/* ═══════════════════════════════════════════════ */

const IKLCanonicalIdentityFramework = () => {
  return (
    <Layout>
      <main className="bg-parchment text-indigo-deep">
        {/* ─── Breadcrumb ─── */}
        <div className="border-b border-gold-separator/30">
          <div className="container-page max-w-4xl py-4 flex items-center gap-2 text-sm text-indigo-medium/60">
            <Link to="/research/indian-knowledge-library" className="hover:text-indigo-deep transition-colors">
              Indian Knowledge Library
            </Link>
            <span>/</span>
            <span className="text-indigo-medium/80">Foundations</span>
          </div>
        </div>

        {/* ─── HERO ─── */}
        <section className="border-b border-gold-separator/30">
          <div className="py-20 md:py-32">
            <div className="container-page max-w-4xl">
              <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-5">
                Section I · Foundations
              </p>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-[3.25rem] font-bold text-indigo-deep leading-[1.15] mb-5">
                Canonical Identity Framework
              </h1>
              <p className="font-serif text-lg md:text-xl text-indigo-medium/70 max-w-2xl mb-12">
                The Structural Core of Digital Śāstra Preservation
              </p>

              <div className="max-w-3xl border-l-2 border-gold-separator pl-6 py-2">
                <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic leading-relaxed">
                  Canonical identity is the stable, irreducible structural reference by which a śāstric unit remains the same across language, commentary, edition, and time.
                </p>
              </div>
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* ─── SECTION 1 — WHY IDENTITY MATTERS ─── */}
        <Section>
          <SectionHeading>Before Meaning, There Is Identity</SectionHeading>

          <P className="mb-2">Every śāstric tradition distinguishes between:</P>
          <BulletGroup items={[
            "The text itself",
            "Its explanation",
            "Its interpretation",
            "Its application",
          ]} />

          <P className="mt-8">Digital systems frequently collapse these layers.</P>
          <P className="mt-4">But śāstra survives because identity remains stable even when interpretation varies.</P>

          <ClosingLine>
            Canonical identity answers a single question:<br />
            What is this unit — regardless of how it is explained?
          </ClosingLine>
        </Section>

        <GoldDivider />

        {/* ─── SECTION 2 — IDENTITY VS PRESENTATION ─── */}
        <Section>
          <SectionHeading>Structural Identity Is Not Presentation</SectionHeading>

          <P className="mb-2">A verse may appear as:</P>
          <BulletGroup items={[
            "Devanāgarī script",
            "Transliteration (IAST)",
            "Word-by-word synonyms",
            "Multiple translations",
            "Multiple commentaries",
            "Thematic classification",
            "Educational lesson",
            "Community discussion",
          ]} />

          <P className="mt-8 font-medium text-indigo-deep/90">None of these define its identity.</P>
          <P>They depend on it.</P>

          <ClosingLine>Identity is structural location within a declared canonical spine.</ClosingLine>

          {/* Example block */}
          <div className="mt-12 rounded border border-gold-separator/40 bg-parchment-dark/20 p-8 md:p-10">
            <p className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-6">Example</p>
            <p className="font-mono text-xl md:text-2xl text-indigo-deep font-semibold mb-6">bg.2.13</p>
            <P className="mb-2">This reference remains stable whether:</P>
            <BulletGroup items={[
              "Read in Sanskrit",
              "Translated into English",
              "Explained by different ācāryas",
              "Used in education",
              "Referenced in community",
            ]} />
            <div className="mt-6 pt-6 border-t border-gold-separator/30">
              <p className="font-serif text-base text-indigo-deep/90 italic">
                Meaning evolves.<br />
                Identity does not.
              </p>
            </div>
          </div>
        </Section>

        <GoldDivider />

        {/* ─── VISUAL — IDENTITY CORE DIAGRAM ─── */}
        <Section>
          <div className="rounded border border-gold-separator/40 bg-parchment-dark/20 p-8 md:p-12">
            <p className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-8 text-center">
              Canonical Identity as Structural Center
            </p>

            {/* Concentric rings placeholder */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Outer rings */}
                {[
                  { size: "100%", label: "Community", opacity: "0.08" },
                  { size: "80%", label: "Pedagogical", opacity: "0.12" },
                  { size: "60%", label: "Interpretive", opacity: "0.18" },
                  { size: "40%", label: "Semantic", opacity: "0.25" },
                  { size: "20%", label: "Canonical", opacity: "0.5" },
                ].map((ring, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-indigo-deep/20 flex items-center justify-center"
                    style={{
                      width: ring.size,
                      height: ring.size,
                      top: `${(100 - parseFloat(ring.size)) / 2}%`,
                      left: `${(100 - parseFloat(ring.size)) / 2}%`,
                      backgroundColor: `rgba(39, 39, 68, ${ring.opacity})`,
                    }}
                  >
                    {i === 4 && (
                      <span className="text-xs font-medium text-parchment tracking-wide">
                        UID
                      </span>
                    )}
                  </div>
                ))}
                {/* Labels */}
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[10px] text-indigo-medium/50">Community</span>
                <span className="absolute top-[12%] left-1/2 -translate-x-1/2 text-[10px] text-indigo-medium/50">Pedagogical</span>
                <span className="absolute top-[22%] left-1/2 -translate-x-1/2 text-[10px] text-indigo-medium/60">Interpretive</span>
                <span className="absolute top-[32%] left-1/2 -translate-x-1/2 text-[10px] text-indigo-medium/70">Semantic</span>
              </div>
            </div>

            <p className="text-sm italic text-indigo-medium/60 text-center">
              All knowledge layers resolve downward to a single canonical identity.
            </p>
          </div>
        </Section>

        <GoldDivider />

        {/* ─── SECTION 3 — THE LAYER MODEL ─── */}
        <Section>
          <SectionHeading>Layer Separation Prevents Collapse</SectionHeading>

          <div className="space-y-4 my-8">
            {[
              { num: 1, name: "Canonical", desc: "The immutable structural unit" },
              { num: 2, name: "Semantic", desc: "Word meanings and linguistic parsing" },
              { num: 3, name: "Interpretive", desc: "Commentary and ācārya explanations" },
              { num: 4, name: "Pedagogical", desc: "Educational structuring and curricula" },
              { num: 5, name: "Community", desc: "Discussion, reflection, and application" },
            ].map((layer) => (
              <div key={layer.num} className="flex items-baseline gap-4 py-3 border-b border-gold-separator/20 last:border-0">
                <span className="font-mono text-sm text-gold font-semibold shrink-0 w-20">
                  Layer {layer.num}
                </span>
                <span className="font-serif text-base md:text-lg font-semibold text-indigo-deep shrink-0 w-36">
                  {layer.name}
                </span>
                <span className="text-sm text-indigo-medium/60">{layer.desc}</span>
              </div>
            ))}
          </div>

          <P className="mt-8">Each layer depends on the one below it.</P>
          <P className="font-medium text-indigo-deep/90">No layer may redefine the canonical unit.</P>

          <P className="mt-8 mb-2">This prevents:</P>
          <BulletGroup items={[
            "Verse drift",
            "Commentary hijacking",
            "Language-based duplication",
            "Edition lock-in",
            "Structural fragmentation",
          ]} />
        </Section>

        <GoldDivider />

        {/* ─── SECTION 4 — CONCRETE ILLUSTRATION ─── */}
        <Section>
          <SectionHeading>A Single Verse, Many Expansions</SectionHeading>

          <div className="rounded border border-gold-separator/40 bg-parchment-dark/20 p-8 md:p-10">
            <p className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-4">Canonical Unit</p>
            <p className="font-mono text-xl md:text-2xl text-indigo-deep font-semibold mb-8">
              Bhagavad-Gītā 2.13
            </p>

            <p className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-4">Expands Into</p>
            <BulletGroup items={[
              "Sanskrit text",
              "Transliteration",
              "Word meanings",
              "Multiple translations",
              "Multiple purports",
              "Cross-references",
              "Entities (Arjuna, Kṛṣṇa, battlefield context)",
              "Philosophical principles",
              "Educational lessons",
              "Guidance mappings",
              "Community reflection",
            ]} />

            <div className="mt-8 pt-6 border-t border-gold-separator/30 text-center">
              <p className="font-mono text-lg text-indigo-deep font-semibold mb-2">bg.2.13</p>
              <p className="font-serif text-sm italic text-indigo-medium/60">
                All of these attach to this identity. None redefine it.
              </p>
            </div>
          </div>
        </Section>

        <GoldDivider />

        {/* ─── SECTION 5 — ARCHITECTURAL CONSEQUENCES ─── */}
        <Section>
          <SectionHeading>Identity Enables Infrastructure</SectionHeading>

          <P className="mb-2">Without canonical identity:</P>
          <BulletGroup items={[
            "Databases fragment",
            "Search systems distort structure",
            "Citation becomes unstable",
            "Comparative commentary fails",
            "Educational layering collapses",
          ]} />

          <div className="mt-12" />

          <P className="mb-2">With canonical identity:</P>
          <BulletGroup items={[
            "UID stability becomes possible",
            "Spine immutability is enforceable",
            "Cross-text referencing scales",
            "Multi-ācārya comparison becomes coherent",
            "Long-term digital preservation becomes viable",
          ]} />

          <ClosingLine>
            Identity is not a feature.<br />
            It is an architectural contract.
          </ClosingLine>
        </Section>

        <GoldDivider />

        {/* ─── CLOSING STATEMENT ─── */}
        <section className="py-16 md:py-24">
          <div className="container-page max-w-3xl text-center">
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-indigo-deep/90 leading-relaxed italic">
              Software stores text.<br />
              Structure preserves civilization.
            </blockquote>
          </div>
        </section>

        {/* ─── FOOTER NAVIGATION ─── */}
        <nav className="border-t border-gold-separator/30 bg-parchment-dark/20">
          <div className="container-page max-w-4xl py-10 flex items-center justify-between">
            <Link
              to="/research/indian-knowledge-library/civilizational-problem"
              className="group flex items-center gap-3 text-sm text-indigo-medium/70 hover:text-indigo-deep transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <div>
                <p className="text-xs text-indigo-medium/50 mb-0.5">Previous</p>
                <p className="font-medium">Civilizational Problem</p>
              </div>
            </Link>
            <Link
              to="/research/indian-knowledge-library/canonical-spine"
              className="group flex items-center gap-3 text-sm text-indigo-medium/70 hover:text-indigo-deep transition-colors text-right"
            >
              <div>
                <p className="text-xs text-indigo-medium/50 mb-0.5">Next Page</p>
                <p className="font-medium">Canonical Spine & Stability</p>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </nav>
      </main>
    </Layout>
  );
};

export default IKLCanonicalIdentityFramework;
