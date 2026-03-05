import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const phases = [
  { id: "0", label: "Foundation" },
  { id: "1", label: "Reader Pilot" },
  { id: "2", label: "Expansion" },
  { id: "3", label: "Interpretive" },
  { id: "4", label: "Educational" },
  { id: "…", label: "Future" },
];

const IKLLongTermVision = () => (
  <IKLPageLayout
    section="Section V · Expansion & Vision"
    title="Long-Term Vision"
    subtitle="Designing for Continuity Beyond a Generation"
    prev={{ label: "Institutional Collaboration", href: "/research/indian-knowledge-library/institutional-collaboration" }}
  >
    <P>The Indian Knowledge Library is not conceived as a short-term initiative.</P>
    <P>
      It is designed as a durable civilizational infrastructure — built slowly, structured
      carefully, and intended to remain stable across generations.
    </P>
    <P className="font-medium text-indigo-deep/90">
      The goal is not rapid expansion. The goal is structural permanence.
    </P>

    <Divider />

    <H3>A Multi-Generational Commitment</H3>
    <P>Most digital projects operate on product cycles.</P>
    <P>Civilizational archives operate on time scales measured in decades and centuries.</P>
    <P>This project is designed for:</P>
    <BulletList items={[
      "50-year architectural stability",
      "100-year canonical continuity",
      "Intergenerational transmission",
      "Scholarly durability",
    ]} />
    <P>Technologies may evolve. Standards may shift. Interfaces may change.</P>
    <P className="font-medium text-indigo-deep/90">Canonical identity remains stable.</P>

    <Divider />

    <H3>Growth Without Structural Drift</H3>
    <P>Expansion is governed by:</P>
    <BulletList items={[
      "Phase discipline",
      "Locking of completed layers",
      "Explicit versioning",
      "Spine declaration protocols",
      "Schema enforcement",
    ]} />
    <P className="font-medium text-indigo-deep/90">Growth is additive, never destructive.</P>
    <P>Earlier foundations are never rewritten.</P>
    <Callout>Stability precedes expansion.</Callout>

    <Divider />

    {/* Visual — Stepped Phase Diagram */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-8 font-medium">
        Structural Growth Model
      </p>
      <div className="border border-gold-separator/30 rounded-lg bg-parchment-dark/20 p-8 md:p-12">
        <div className="flex flex-col items-center gap-0">
          {[...phases].reverse().map((phase, i) => {
            const widthPercent = 40 + i * 12;
            return (
              <div
                key={phase.id}
                className="border border-gold-separator/40 bg-parchment flex items-center justify-between px-5 py-3"
                style={{ width: `${widthPercent}%`, minWidth: "200px" }}
              >
                <span className="font-serif text-xs md:text-sm font-semibold text-indigo-deep">
                  Phase {phase.id}
                </span>
                <span className="text-xs text-indigo-medium/50 tracking-wide">{phase.label}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-indigo-medium/50">
          <span>▲ Each phase locked upon the previous</span>
        </div>
      </div>
      <p className="text-center text-xs text-indigo-medium/50 mt-4 italic">
        Structured expansion through phase discipline.
      </p>
    </div>

    <Divider />

    <H3>Technology as Servant, Not Master</H3>
    <P>The infrastructure is built so that:</P>
    <BulletList items={[
      "Data can migrate across technologies",
      "UID stability survives interface change",
      "Canonical text remains tool-independent",
      "Knowledge layers remain detachable",
    ]} />
    <P className="font-medium text-indigo-deep/90">The system is intentionally modular.</P>
    <P>No single platform defines the archive.</P>

    <Divider />

    <H3>Universal Access Without Identity Dilution</H3>
    <P>The vision includes:</P>
    <BulletList items={[
      "Multilingual access",
      "Cross-cultural research dialogue",
      "Comparative philosophical inquiry",
      "Global scholarly engagement",
    ]} />
    <P>But without:</P>
    <BulletList items={[
      "Canonical alteration",
      "Simplification for popularity",
      "Reduction to motivational content",
      "Commercial dilution",
    ]} />
    <P className="font-medium text-indigo-deep/90">Integrity is preserved through structure.</P>

    <Divider />

    <H3>From Archive to Living Continuity</H3>
    <P>Over time, the project may contribute to:</P>
    <BulletList items={[
      "Educational ecosystems",
      "Ethical economic models",
      "Research networks",
      "Structured community application",
      "Interdisciplinary civilizational study",
    ]} />
    <P>The ambition is not influence.</P>
    <P className="font-medium text-indigo-deep/90">The ambition is continuity.</P>

    <Divider />

    <H3>Custodianship Over Ownership</H3>
    <P>Sacred knowledge does not belong to its builders.</P>
    <P className="font-serif italic text-indigo-deep/90">It is held in trust.</P>
    <P>The responsibility is preservation, clarity, and disciplined expansion.</P>
    <Callout>Stewardship defines the work.</Callout>

    <Divider />

    <div className="text-center space-y-1 py-4">
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">Build slowly.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">Lock carefully.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">Preserve faithfully.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep font-semibold mt-4">
        Transmit responsibly.
      </p>
    </div>
  </IKLPageLayout>
);

export default IKLLongTermVision;
