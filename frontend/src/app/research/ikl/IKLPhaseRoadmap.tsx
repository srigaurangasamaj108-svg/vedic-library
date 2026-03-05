import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const phases = [
  { num: 6, label: "Community & Living Knowledge" },
  { num: 5, label: "Applied Guidance Framework" },
  { num: 4, label: "Structured Educational Layer" },
  { num: 3, label: "Interpretive Layer Stabilization" },
];

const IKLPhaseRoadmap = () => (
  <IKLPageLayout
    section="Section IV · Implementation"
    title="Phase Roadmap & Expansion Vision"
    subtitle="Expansion Anchored in Structure"
    prev={{ label: "Current Phase Status", href: "/research/indian-knowledge-library/current-phase" }}
    next={{ label: "Four Pillars Framework", href: "/research/indian-knowledge-library/canonical-digital-infrastructure" }}
  >
    {/* Intro */}
    <P>The Indian Knowledge Library does not expand by feature accumulation.</P>
    <P>It expands by structural readiness.</P>
    <P className="font-medium text-indigo-deep/90">
      Each future phase builds upon locked foundations — without reopening them.
    </P>

    <Divider />

    {/* Phase 3 */}
    <H3>Phase 3 — Interpretive Layer Stabilization</H3>
    <P>Focus:</P>
    <BulletList items={[
      "Commentary attachment architecture",
      "Multi-ācārya comparison framework",
      "Semantic derivation validation",
      "Non-intrusive UI expansion",
    ]} />
    <P className="font-medium text-indigo-deep/90">
      Interpretation must attach to canon — without altering canonical identity.
    </P>

    <Divider />

    {/* Phase 4 */}
    <H3>Phase 4 — Structured Educational Layer</H3>
    <P>Focus:</P>
    <BulletList items={[
      "Curriculum modeling",
      "Learning pathways",
      "Thematic clustering",
      "Skill-oriented structuring",
    ]} />
    <P className="font-medium text-indigo-deep/90">
      Education organizes meaning — without redefining identity.
    </P>

    <Divider />

    {/* Phase 5 */}
    <H3>Phase 5 — Applied Guidance Framework</H3>
    <P>Focus:</P>
    <BulletList items={[
      "Situation-to-verse mapping",
      "Domain classification",
      "Principle extraction",
      "Decision-context modeling",
    ]} />
    <P className="font-medium text-indigo-deep/90">
      Application must trace back to canonical reference.
    </P>

    <Divider />

    {/* Phase 6 */}
    <H3>Phase 6 — Community & Living Knowledge</H3>
    <P>Focus:</P>
    <BulletList items={[
      "Discussion spaces",
      "Structured annotation",
      "Moderated reflection",
      "Contextual commentary",
    ]} />
    <P className="font-medium text-indigo-deep/90">
      Community engagement remains layered — never canonical.
    </P>

    <Divider />

    {/* Visual — Structural Growth Model */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-8 font-medium">
        Structural Growth Model
      </p>
      <div className="flex items-center justify-center">
        <div className="relative">
          {phases.map(({ num, label }, i) => {
            const sizes = [
              "w-72 h-72 md:w-80 md:h-80",
              "w-56 h-56 md:w-64 md:h-64",
              "w-40 h-40 md:w-48 md:h-48",
              "w-24 h-24 md:w-32 md:h-32",
            ];
            const opacities = [
              "bg-parchment-dark/10",
              "bg-parchment-dark/20",
              "bg-parchment-dark/30",
              "bg-parchment-dark/45",
            ];
            return (
              <div
                key={num}
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${sizes[i]} ${opacities[i]} rounded-full border border-gold-separator/40 flex items-end justify-center pb-2`}
              >
                <span className="font-serif text-xs text-indigo-deep/70 text-center leading-tight px-2">
                  Phase {num}
                </span>
              </div>
            );
          })}
          {/* Core */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-18 md:h-18 bg-parchment-dark/60 rounded-full border border-gold-separator/50 flex items-center justify-center">
            <span className="font-serif text-[10px] text-indigo-deep/80 text-center leading-tight">Canon</span>
          </div>
          {/* Spacer */}
          <div className="w-72 h-72 md:w-80 md:h-80" />
        </div>
      </div>
      <p className="text-center text-sm text-indigo-medium/60 mt-6 italic">
        Expansion without destabilization.
      </p>
    </div>

    <Divider />

    {/* Section 5 */}
    <H3>Long-Term Horizon</H3>
    <P>Over time, the system may support:</P>
    <BulletList items={[
      "Full Vedic corpus integration",
      "Multi-traditional commentarial ecosystems",
      "Cross-śāstra thematic mapping",
      "Research-grade citation infrastructure",
      "Institutional curriculum integration",
    ]} />
    <P>The goal is continuity —</P>
    <P className="font-medium text-indigo-deep/90">not acceleration.</P>

    <Divider />

    {/* Closing */}
    <div className="text-center space-y-1 py-4">
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">Structure first.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">Expansion second.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep font-semibold mt-4">Continuity always.</p>
    </div>
  </IKLPageLayout>
);

export default IKLPhaseRoadmap;
