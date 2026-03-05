import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import heroBg from "@/assets/ikl-hero-bg.jpg";

/* ───── Shared primitives ───── */
const GoldDivider = () => (
  <div className="flex items-center justify-center py-10">
    <div className="h-px w-16 bg-gold-separator" />
    <div className="mx-3 h-1.5 w-1.5 rotate-45 border border-gold-separator" />
    <div className="h-px w-16 bg-gold-separator" />
  </div>
);

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-16 md:py-24 ${className}`}>
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

const IKLCivilizationalProblem = () => {
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
        <section className="relative overflow-hidden border-b border-gold-separator/30">
          <div className="absolute inset-0">
            <img src={heroBg} alt="" className="h-full w-full object-cover opacity-[0.06]" />
            <div className="absolute inset-0 bg-parchment/85" />
          </div>

          <div className="relative py-20 md:py-32">
            <div className="container-page max-w-4xl">
              <p className="text-xs tracking-[0.2em] uppercase text-gold font-medium mb-5">
                Section I · Foundations
              </p>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-[3.25rem] font-bold text-indigo-deep leading-[1.15] mb-5">
                Civilizational Continuity<br className="hidden sm:block" /> in the Digital Age
              </h1>
              <p className="font-serif text-lg md:text-xl text-indigo-medium/70 max-w-2xl mb-10">
                Why Ancient Knowledge Requires Structural Digital Infrastructure
              </p>

              <div className="max-w-3xl space-y-4">
                <P>
                  For millennia, Indian śāstric traditions have preserved knowledge through disciplined
                  transmission — oral, manuscript, commentary, and institutional study.
                </P>
                <P>In the digital age, preservation demands a new form of discipline.</P>
                <P className="font-medium text-indigo-deep/90">
                  Not digitization alone.<br />
                  But structural integrity.
                </P>
              </div>
            </div>
          </div>
        </section>

        <GoldDivider />

        {/* ─── SECTION 1 — The Quiet Transition ─── */}
        <Section>
          <SectionHeading>From Manuscript to Database</SectionHeading>

          <P className="mb-2">Across centuries, śāstra survived through:</P>
          <BulletGroup items={[
            "Oral lineage",
            "Scriptural copying",
            "Commentary traditions",
            "Gurukula transmission",
            "Monastic libraries",
          ]} />

          <ClosingLine>Each medium preserved not only content — but structure.</ClosingLine>

          <div className="mt-12" />

          <P className="mb-2">In the digital age, texts are increasingly:</P>
          <BulletGroup items={[
            "Scattered across websites",
            "Stored as PDFs",
            "Extracted without structural fidelity",
            "Detached from canonical identity",
            "Mixed with interpretation",
          ]} />

          <ClosingLine>
            The medium has changed.<br />
            The discipline often has not.
          </ClosingLine>
        </Section>

        <GoldDivider />

        {/* ─── VISUAL PLACEHOLDER 1 ─── */}
        <Section>
          <div className="rounded border border-gold-separator/40 bg-parchment-dark/20 p-8 md:p-12">
            <p className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-8 text-center">
              Structural Shift
            </p>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-10 mb-8">
              <div className="rounded border border-gold-separator/30 bg-parchment p-6 text-center">
                <div className="h-24 flex items-center justify-center mb-4">
                  <div className="grid grid-cols-3 gap-2 opacity-40">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-8 h-3 rounded-sm bg-indigo-medium/30" />
                    ))}
                  </div>
                </div>
                <p className="font-serif text-sm font-semibold text-indigo-deep">
                  Fragmented Digital Presentation
                </p>
              </div>

              <div className="rounded border border-gold-separator/50 bg-parchment p-6 text-center">
                <div className="h-24 flex items-center justify-center mb-4">
                  <div className="flex flex-col items-center gap-1 opacity-50">
                    <div className="w-16 h-3 rounded-sm bg-indigo-deep/40" />
                    <div className="w-px h-3 bg-gold-separator" />
                    <div className="flex gap-2">
                      <div className="w-10 h-3 rounded-sm bg-indigo-deep/30" />
                      <div className="w-10 h-3 rounded-sm bg-indigo-deep/30" />
                    </div>
                    <div className="w-px h-3 bg-gold-separator" />
                    <div className="flex gap-1">
                      <div className="w-6 h-3 rounded-sm bg-indigo-deep/20" />
                      <div className="w-6 h-3 rounded-sm bg-indigo-deep/20" />
                      <div className="w-6 h-3 rounded-sm bg-indigo-deep/20" />
                    </div>
                  </div>
                </div>
                <p className="font-serif text-sm font-semibold text-indigo-deep">
                  Canonical Structural Infrastructure
                </p>
              </div>
            </div>

            <p className="text-sm italic text-indigo-medium/60 text-center">
              The issue is not access — it is structural coherence.
            </p>
          </div>
        </Section>

        <GoldDivider />

        {/* ─── SECTION 2 — What Is At Risk? ─── */}
        <Section>
          <SectionHeading>Not Loss of Text — But Loss of Structure</SectionHeading>

          <P className="mb-2">Indian knowledge traditions are not merely collections of verses.</P>
          <P className="mb-2">They are:</P>
          <BulletGroup items={[
            "Interconnected structural systems",
            "Cross-referenced canonical hierarchies",
            "Layered interpretive traditions",
            "Identity-bound textual units",
            "Transmission-stable frameworks",
          ]} />

          <div className="mt-12" />

          <P className="mb-2">When structure weakens:</P>
          <BulletGroup items={[
            "Citation becomes inconsistent",
            "Cross-text mapping breaks",
            "Commentary comparison collapses",
            "Educational layering becomes unstable",
            "Institutional adoption becomes difficult",
          ]} />

          <ClosingLine>
            Preservation is not storage.<br />
            It is structural continuity.
          </ClosingLine>
        </Section>

        <GoldDivider />

        {/* ─── SECTION 3 — The Unaddressed Gap ─── */}
        <Section>
          <SectionHeading>The Missing Infrastructure</SectionHeading>

          <P className="mb-2">Modern digital systems excel at:</P>
          <BulletGroup items={[
            "Content hosting",
            "Search indexing",
            "User interaction",
            "Data analytics",
          ]} />

          <div className="mt-12" />

          <P className="mb-2">They do not inherently preserve:</P>
          <BulletGroup items={[
            "Canonical identity",
            "Spine immutability",
            "Layer separation",
            "Long-term structural reference",
            "Edition-agnostic stability",
          ]} />

          <ClosingLine>
            Without architectural discipline,<br />
            digital preservation remains superficial.
          </ClosingLine>
        </Section>

        <GoldDivider />

        {/* ─── VISUAL PLACEHOLDER 2 ─── */}
        <Section>
          <div className="rounded border border-gold-separator/40 bg-parchment-dark/20 p-8 md:p-12">
            <p className="text-xs tracking-[0.15em] uppercase text-gold font-medium mb-8 text-center">
              Knowledge Without Spine vs Knowledge With Spine
            </p>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-10 mb-8">
              {/* Without spine */}
              <div className="rounded border border-gold-separator/30 bg-parchment p-6 text-center">
                <div className="h-28 flex items-center justify-center mb-4">
                  <div className="relative w-32 h-20">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="absolute bg-indigo-medium/15 rounded-sm"
                        style={{
                          width: `${40 + Math.random() * 30}px`,
                          height: "10px",
                          top: `${i * 16}px`,
                          left: `${Math.random() * 40}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <p className="font-serif text-sm font-semibold text-indigo-deep/70">Without Spine</p>
                <p className="text-xs text-indigo-medium/50 mt-1">Content without structure</p>
              </div>

              {/* With spine */}
              <div className="rounded border border-gold-separator/50 bg-parchment p-6 text-center">
                <div className="h-28 flex items-center justify-center mb-4">
                  <div className="flex items-stretch gap-3">
                    <div className="w-1 bg-indigo-deep/40 rounded-full" />
                    <div className="flex flex-col justify-between py-1 gap-2">
                      <div className="w-20 h-2.5 rounded-sm bg-indigo-deep/25" />
                      <div className="w-16 h-2.5 rounded-sm bg-indigo-deep/20" />
                      <div className="w-24 h-2.5 rounded-sm bg-indigo-deep/15" />
                      <div className="w-14 h-2.5 rounded-sm bg-indigo-deep/20" />
                      <div className="w-18 h-2.5 rounded-sm bg-indigo-deep/15" />
                    </div>
                  </div>
                </div>
                <p className="font-serif text-sm font-semibold text-indigo-deep">With Spine</p>
                <p className="text-xs text-indigo-medium/50 mt-1">Identity-anchored knowledge</p>
              </div>
            </div>

            <p className="text-sm italic text-indigo-medium/60 text-center">
              Structure is the difference between content and civilization.
            </p>
          </div>
        </Section>

        <GoldDivider />

        {/* ─── SECTION 4 — A Calm Proposition ─── */}
        <Section>
          <SectionHeading>A Structural Response</SectionHeading>

          <P className="mb-2">The Indian Knowledge Library does not begin with:</P>
          <BulletGroup items={[
            "Commentary debates",
            "Interpretive claims",
            "Educational packaging",
            "AI enhancement",
          ]} />

          <div className="mt-12" />

          <P className="mb-2">It begins with:</P>
          <BulletGroup items={[
            "Canonical identity discipline",
            "Spine declaration",
            "UID stability",
            "Layer separation",
            "Architectural immutability",
          ]} />

          <ClosingLine>
            Civilizational continuity in the digital age<br />
            requires infrastructure — not enthusiasm.
          </ClosingLine>
        </Section>

        <GoldDivider />

        {/* ─── CLOSING STATEMENT ─── */}
        <section className="py-16 md:py-24">
          <div className="container-page max-w-3xl text-center">
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-indigo-deep/90 leading-relaxed italic">
              Texts survive through reverence.<br />
              Civilizations survive through structure.
            </blockquote>
          </div>
        </section>

        {/* ─── FOOTER NAVIGATION ─── */}
        <nav className="border-t border-gold-separator/30 bg-parchment-dark/20">
          <div className="container-page max-w-4xl py-10 flex items-center justify-between">
            <Link
              to="/research/indian-knowledge-library"
              className="group flex items-center gap-3 text-sm text-indigo-medium/70 hover:text-indigo-deep transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <div>
                <p className="text-xs text-indigo-medium/50 mb-0.5">Previous</p>
                <p className="font-medium">Landing Page</p>
              </div>
            </Link>
            <Link
              to="/research/indian-knowledge-library/corpus-scope"
              className="group flex items-center gap-3 text-sm text-indigo-medium/70 hover:text-indigo-deep transition-colors text-right"
            >
              <div>
                <p className="text-xs text-indigo-medium/50 mb-0.5">Next Page</p>
                <p className="font-medium">Corpus Scope &amp; Structural Breadth</p>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </nav>
      </main>
    </Layout>
  );
};

export default IKLCivilizationalProblem;
