import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Layers, GraduationCap, Users, Shield, Database, Brain, Scale } from "lucide-react";
import vgsLogo from "@/assets/vgs-foundation-logo.jpeg";
import heroBg from "@/assets/ikl-hero-bg.jpg";
import corpusTree from "@/assets/ikl-corpus-tree.jpg";

/* ───── Gold separator ───── */
const GoldDivider = () => (
  <div className="flex items-center justify-center py-10">
    <div className="h-px w-16 bg-gold-separator" />
    <div className="mx-3 h-1.5 w-1.5 rotate-45 border border-gold-separator" />
    <div className="h-px w-16 bg-gold-separator" />
  </div>
);

/* ───── Section wrapper ───── */
const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`py-16 md:py-24 ${className}`}>
    <div className="container-page max-w-5xl">{children}</div>
  </section>
);

const SectionHeadline = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-semibold text-indigo-deep leading-tight mb-6">
    {children}
  </h2>
);

const BodyText = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={`text-base md:text-lg leading-relaxed text-indigo-medium/80 ${className}`}>
    {children}
  </p>
);

/* ════════════════════════════════════════════════════════════ */

const IndianKnowledgeLibrary = () => {
  return (
    <Layout>
      <main className="bg-parchment text-indigo-deep">
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden border-b border-gold-separator/40">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={heroBg}
              alt=""
              className="h-full w-full object-cover opacity-[0.12]"
            />
            <div className="absolute inset-0 bg-parchment/80" />
          </div>

          <div className="relative py-24 md:py-36">
            <div className="container-page max-w-5xl text-center">
              {/* Logo */}
              <div className="flex justify-center mb-8">
                <img
                  src={vgsLogo}
                  alt="Vaishvika Gauranga Samaj Foundation"
                  className="w-[88px] h-auto object-contain opacity-90"
                />
              </div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-indigo-deep mb-5">
                Indian Knowledge Library
              </h1>

              <p className="font-serif text-lg md:text-xl text-indigo-medium mb-3 max-w-3xl mx-auto">
                A Canonical Identity–Driven Digital Infrastructure for Indian Śāstric Knowledge
              </p>

              <p className="text-sm md:text-base tracking-[0.15em] uppercase text-indigo-medium/60 mb-10">
                Preservation · Structure · Research · Education · Continuity
              </p>

              <div className="max-w-3xl mx-auto mb-12">
                <BodyText className="text-center">
                  The Indian Knowledge Library is a long-term civilizational infrastructure initiative dedicated to
                  structurally preserving and coherently organizing the vast corpus of Indian śāstric traditions.
                  It is built upon canonical identity stability, edition-agnostic structural discipline, and a layered
                  knowledge model that enables research, education, guidance, and living application without
                  compromising textual integrity.
                </BodyText>
              </div>

              {/* Three core signals */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-12 text-sm text-indigo-medium/70">
                <span className="flex items-center gap-2">
                  <span className="h-px w-6 bg-gold-separator" />
                  Verse-level canonical identity
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-px w-6 bg-gold-separator" />
                  Edition-independent structural spine
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-px w-6 bg-gold-separator" />
                  Layered knowledge architecture
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/research/indian-knowledge-library/civilizational-problem"
                  className="inline-flex items-center justify-center gap-2 rounded border border-indigo-deep bg-indigo-deep px-7 py-3 text-sm font-medium text-parchment transition-colors hover:bg-indigo-medium"
                >
                  Explore the Framework
                </Link>
                <Link
                  to="/research/indian-knowledge-library/current-phase"
                  className="inline-flex items-center justify-center gap-2 rounded border border-indigo-deep/30 px-7 py-3 text-sm font-medium text-indigo-deep transition-colors hover:border-indigo-deep hover:bg-indigo-deep/5"
                >
                  Phase Status
                </Link>
                <a
                  href="mailto:anubhav@vedarth.io"
                  className="inline-flex items-center justify-center gap-2 rounded border border-indigo-deep/30 px-7 py-3 text-sm font-medium text-indigo-deep transition-colors hover:border-indigo-deep hover:bg-indigo-deep/5"
                >
                  Institutional Collaboration
                </a>
              </div>
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* ─── TABLE OF CONTENTS ─── */}
        <Section>
          <SectionHeadline>Explore the Framework</SectionHeadline>
          <BodyText className="mb-10 max-w-3xl">
            The Indian Knowledge Library is organized into five sections. Each page builds on the previous, forming a coherent intellectual progression.
          </BodyText>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                section: "I · Foundations",
                pages: [
                  { label: "The Civilizational Problem", href: "/research/indian-knowledge-library/civilizational-problem" },
                  { label: "Canonical Identity Framework", href: "/research/indian-knowledge-library/canonical-identity-framework" },
                  { label: "Canonical Spine & Stability", href: "/research/indian-knowledge-library/canonical-spine" },
                  { label: "Canonical Text Discipline", href: "/research/indian-knowledge-library/canonical-text-discipline" },
                ],
              },
              {
                section: "II · Four Pillars",
                pages: [
                  { label: "Canonical Digital Infrastructure", href: "/research/indian-knowledge-library/canonical-digital-infrastructure" },
                  { label: "Structured Education Framework", href: "/research/indian-knowledge-library/structured-education-framework" },
                  { label: "Applied Guidance Mapping", href: "/research/indian-knowledge-library/applied-guidance-mapping" },
                  { label: "Living Civilizational Model", href: "/research/indian-knowledge-library/living-civilizational-model" },
                ],
              },
              {
                section: "III · Architecture & Research",
                pages: [
                  { label: "Knowledge Layer Model", href: "/research/indian-knowledge-library/knowledge-layer-model" },
                  { label: "Technical Architecture", href: "/research/indian-knowledge-library/technical-architecture" },
                  { label: "Research & Digital Humanities", href: "/research/indian-knowledge-library/research-digital-humanities" },
                  { label: "AI Governance & Safeguards", href: "/research/indian-knowledge-library/ai-governance" },
                ],
              },
              {
                section: "IV · Implementation",
                pages: [
                  { label: "Current Phase Status", href: "/research/indian-knowledge-library/current-phase" },
                  { label: "Phase Roadmap", href: "/research/indian-knowledge-library/phase-roadmap" },
                ],
              },
              {
                section: "V · Expansion & Vision",
                pages: [
                  { label: "Corpus Scope (Vedic Knowledge Tree)", href: "/research/indian-knowledge-library/corpus-scope" },
                  { label: "Institutional Collaboration", href: "/research/indian-knowledge-library/institutional-collaboration" },
                  { label: "Long-Term Vision", href: "/research/indian-knowledge-library/long-term-vision" },
                ],
              },
            ].map((group) => (
              <div key={group.section}>
                <p className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-3">
                  {group.section}
                </p>
                <ul className="space-y-2">
                  {group.pages.map((page) => (
                    <li key={page.href}>
                      <Link
                        to={page.href}
                        className="group flex items-center gap-2 text-sm text-indigo-medium/75 hover:text-indigo-deep transition-colors"
                      >
                        <ArrowRight className="h-3 w-3 shrink-0 text-gold/50 transition-transform group-hover:translate-x-0.5" />
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <GoldDivider />

        {/* ─── SECTION I — The Structural Problem ─── */}
        <Section>
          <SectionHeadline>From Richness to Fragmentation</SectionHeadline>

          <BodyText className="mb-4 max-w-3xl">
            Across centuries, Indian śāstra evolved through layered commentary, diverse regional editions,
            and multiple traditions of transmission.
          </BodyText>
          <BodyText className="mb-12 max-w-3xl">
            In the digital age, this richness risks fragmentation unless anchored by structural identity discipline.
          </BodyText>

          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: "Edition Variability",
                desc: "Numbering inconsistencies and textual divergence complicate digital coherence.",
              },
              {
                title: "Canonical–Commentary Mixing",
                desc: "Digital systems often blur primary text and interpretation.",
              },
              {
                title: "Research Non-Standardization",
                desc: "Lack of stable identifiers limits large-scale academic modeling.",
              },
              {
                title: "Applied Disconnect",
                desc: "Without structural layering, knowledge struggles to integrate into education and community systems.",
              },
            ].map((block) => (
              <div
                key={block.title}
                className="rounded border border-gold-separator/40 bg-parchment-dark/40 p-6"
              >
                <h3 className="font-serif text-lg font-semibold text-indigo-deep mb-2">
                  {block.title}
                </h3>
                <p className="text-sm leading-relaxed text-indigo-medium/75">
                  {block.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 font-serif text-base md:text-lg text-indigo-deep/90 italic text-center">
            The solution is not digitization alone — it is canonical infrastructure.
          </p>
        </Section>

        <GoldDivider />

        {/* ─── SECTION II — Scale of the Corpus ─── */}
        <Section>
          <SectionHeadline>The Vastness of the Śāstric Universe</SectionHeadline>

          <BodyText className="mb-10 max-w-3xl">
            Indian knowledge traditions span multiple structural domains:
          </BodyText>

          <div className="flex flex-col md:flex-row gap-10 items-center mb-10">
            {/* Tree image */}
            <div className="w-full md:w-2/5 flex justify-center">
              <img
                src={corpusTree}
                alt="Indian Śāstric Knowledge Tree"
                className="w-full max-w-xs rounded border border-gold-separator/30 opacity-90"
              />
            </div>

            {/* Taxonomy grid */}
            <div className="w-full md:w-3/5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Śruti",
                "Smṛti",
                "Itihāsa",
                "Purāṇa",
                "Āgama / Tantra",
                "Vedāṅga",
                "Upaveda",
                "Darśana",
                "Sampradāya Traditions",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded border border-gold-separator/50 bg-parchment px-5 py-3 text-center font-serif text-sm font-semibold text-indigo-deep"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>

          <BodyText className="text-center max-w-3xl mx-auto">
            The challenge is not preservation alone —{" "}
            <span className="text-indigo-deep font-medium">
              it is maintaining structural coherence across the entire civilizational spectrum.
            </span>
          </BodyText>
        </Section>

        <GoldDivider />

        {/* ─── SECTION III — Architectural Breakthrough ─── */}
        <Section>
          <SectionHeadline>Canonical Identity as Foundational Infrastructure</SectionHeadline>

          <BodyText className="mb-4 max-w-3xl">
            Identity is structural, not interpretive.
          </BodyText>
          <BodyText className="mb-10 max-w-3xl">Each canonical unit:</BodyText>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 mb-14 max-w-3xl">
            {[
              "Is anchored by stable UID",
              "Derives from a declared structural spine",
              "Remains edition-independent",
              "Accepts layered attachment without modification",
            ].map((point) => (
              <p key={point} className="flex items-start gap-2 text-sm md:text-base text-indigo-medium/80">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {point}
              </p>
            ))}
          </div>

          {/* Concentric diagram */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative flex items-center justify-center">
              {/* Outermost ring */}
              <div className="flex items-center justify-center rounded-full border border-gold-separator/50 w-72 h-72 sm:w-80 sm:h-80">
                {/* Middle ring */}
                <div className="flex items-center justify-center rounded-full border border-gold-separator/60 bg-parchment-dark/30 w-52 h-52 sm:w-56 sm:h-56">
                  {/* Inner ring */}
                  <div className="flex items-center justify-center rounded-full border border-gold-separator bg-parchment-dark/50 w-32 h-32 sm:w-36 sm:h-36">
                    {/* Core */}
                    <div className="flex items-center justify-center rounded-full bg-indigo-deep text-parchment w-20 h-20 sm:w-24 sm:h-24 text-center">
                      <span className="font-serif text-[11px] sm:text-xs font-semibold leading-tight px-1">
                        Canonical<br />Identity
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Labels positioned around */}
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-xs text-indigo-medium/70 font-medium">
                Community
              </span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 text-xs text-indigo-medium/70 font-medium">
                Pedagogical
              </span>
              <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 text-xs text-indigo-medium/70 font-medium">
                Semantic
              </span>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-xs text-indigo-medium/70 font-medium">
                Interpretive
              </span>
            </div>
            <p className="mt-8 text-sm italic text-indigo-medium/60 text-center">
              Identity remains stable as knowledge expands outward.
            </p>
          </div>
        </Section>

        <GoldDivider />

        {/* ─── SECTION IV — Four Pillars ─── */}
        <Section className="bg-saffron/[0.04]">
          <SectionHeadline>From Archive to Living Knowledge System</SectionHeadline>

          <div className="grid gap-5">
            {[
              {
                icon: Database,
                title: "Canonical Digital Infrastructure",
                desc: "Spine-based, UID-anchored corpus foundation.",
                link: "/research/indian-knowledge-library/canonical-digital-infrastructure",
              },
              {
                icon: GraduationCap,
                title: "Structured Education Framework",
                desc: "Age-stage pathways, curriculum modeling, disciplined learning architecture.",
                link: "/research/indian-knowledge-library/structured-education-framework",
              },
              {
                icon: BookOpen,
                title: "Applied Guidance Mapping",
                desc: "Context-aware application across life situations and domains.",
                link: "/research/indian-knowledge-library/applied-guidance-mapping",
              },
              {
                icon: Users,
                title: "Living Civilizational Model",
                desc: "Integration across social, economic, cultural, and institutional layers.",
                link: "/research/indian-knowledge-library/living-civilizational-model",
              },
            ].map((pillar) => (
              <Link
                key={pillar.title}
                to={pillar.link}
                className="group flex items-start gap-5 rounded border border-gold-separator/40 bg-parchment p-6 transition-colors hover:border-gold-separator hover:bg-parchment-dark/50"
              >
                <pillar.icon className="mt-1 h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-lg font-semibold text-indigo-deep mb-1 group-hover:text-indigo-medium transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-indigo-medium/75">{pillar.desc}</p>
                </div>
                <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-gold/60 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </Section>

        <GoldDivider />

        {/* ─── SECTION V — Architectural Integrity ─── */}
        <Section>
          <SectionHeadline>Governance &amp; Structural Discipline</SectionHeadline>

          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                icon: Scale,
                title: "Canonical Spine Declaration",
                desc: "Explicit structural backbone per work.",
              },
              {
                icon: Database,
                title: "UID & Schema Enforcement",
                desc: "Machine-parsable stability.",
              },
              {
                icon: Layers,
                title: "Knowledge Layer Separation",
                desc: "Interpretation without contamination.",
              },
              {
                icon: Shield,
                title: "AI Governance Safeguards",
                desc: "Assistance without authority.",
              },
            ].map((block) => (
              <div
                key={block.title}
                className="flex items-start gap-4 rounded border border-gold-separator/40 bg-parchment-dark/30 p-5"
              >
                <block.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold/80" strokeWidth={1.5} />
                <div>
                  <h3 className="font-serif text-base font-semibold text-indigo-deep mb-1">
                    {block.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-indigo-medium/70">{block.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <GoldDivider />

        {/* ─── SECTION VI — Current Status ─── */}
        <Section>
          <SectionHeadline>Phase 2 — Canonical Expansion</SectionHeadline>

          <div className="space-y-4 max-w-3xl">
            {[
              "The constitutional foundation is locked.",
              "The canonical reader architecture is validated.",
              "UID systems are active.",
              "Structured ingestion of additional śāstra is underway.",
            ].map((line) => (
              <p key={line} className="flex items-start gap-3 text-base text-indigo-medium/80">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {line}
              </p>
            ))}
          </div>

          <BodyText className="mt-10 max-w-3xl">
            Knowledge, education, and community layers are architecturally defined and will be introduced
            progressively in later phases.
          </BodyText>

          <p className="mt-6 text-sm text-indigo-medium/60 max-w-3xl">
            Growth is phased. Foundations are not rewritten.
          </p>
        </Section>

        <GoldDivider />

        {/* ─── SECTION VII — Academic Invitation ─── */}
        <Section>
          <SectionHeadline>An Open Infrastructure for Structured Research</SectionHeadline>

          <BodyText className="mb-8 max-w-3xl">
            The project welcomes collaboration from:
          </BodyText>

          <div className="flex flex-wrap gap-3 mb-10">
            {[
              "Indian Knowledge Systems Scholars",
              "Sanskrit Researchers",
              "Digital Humanities Laboratories",
              "Information Architects",
              "Ethical AI Researchers",
              "Interdisciplinary Civilizational Studies Groups",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold-separator/60 bg-parchment-dark/40 px-4 py-1.5 text-sm text-indigo-deep/80"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic max-w-3xl leading-relaxed">
            Indian Knowledge Library is designed not as a platform,
            but as durable infrastructure —
            intended to serve generations of readers and researchers.
          </p>
        </Section>

        {/* ─── Footer ─── */}
        <footer className="relative border-t border-gold-separator/40 bg-parchment-dark/30 py-12 overflow-hidden">
          {/* Subtle manuscript texture at bottom */}
          <div className="absolute inset-0">
            <img
              src={heroBg}
              alt=""
              className="h-full w-full object-cover opacity-[0.06]"
            />
          </div>

          <div className="relative container-page max-w-5xl text-center">
            <p className="font-serif text-lg font-semibold text-indigo-deep mb-1">
              An Initiative under Vaishvika Gauranga Samaj Foundation
            </p>
            <p className="text-sm text-indigo-medium/70 mb-4">Research Division — Vedarth</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-indigo-medium/60 mb-4">
              <a href="mailto:anubhav@vedarth.io" className="underline underline-offset-2 hover:text-indigo-deep transition-colors">
                anubhav@vedarth.io
              </a>
              <span className="hidden sm:inline">·</span>
              <a href="mailto:sri.gauranga.samaj.108@gmail.com" className="underline underline-offset-2 hover:text-indigo-deep transition-colors">
                sri.gauranga.samaj.108@gmail.com
              </a>
            </div>
            <p className="text-xs text-indigo-medium/50 mt-4">
              Conference Reference — IIT Dhanbad: Ancient Indian Texts, Science &amp; Technology
            </p>
          </div>
        </footer>
      </main>
    </Layout>
  );
};

export default IndianKnowledgeLibrary;
