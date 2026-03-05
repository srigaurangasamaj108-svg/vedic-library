import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const IKLStructuredEducation = () => (
  <IKLPageLayout
    section="Section II · Four Pillars"
    title="Pillar II — Structured Education Framework"
    subtitle="From Canon to Curriculum"
    prev={{ label: "Canonical Digital Infrastructure", href: "/research/indian-knowledge-library/canonical-digital-infrastructure" }}
    next={{ label: "Applied Guidance Framework", href: "/research/indian-knowledge-library/applied-guidance-mapping" }}
  >
    {/* Intro */}
    <P>Canonical text preserves knowledge.</P>
    <P>Education organizes it for transmission.</P>
    <P className="font-medium text-indigo-deep/90">
      This pillar describes how structured learning emerges from stable canonical identity — without altering it.
    </P>

    <Divider />

    {/* Section 1 */}
    <H3>From Canonical Unit to Curriculum Element</H3>
    <P>Each canonical unit may generate:</P>
    <BulletList items={[
      "Concept nodes",
      "Principle statements",
      "Thematic clusters",
      "Skill classifications",
      "Cross-śāstra references",
    ]} />
    <P>Education does not rewrite text.</P>
    <P className="font-medium text-indigo-deep/90">It organizes meaning around it.</P>

    <Divider />

    {/* Visual — Learning Flow */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-6 font-medium">
        Learning Flow Diagram
      </p>
      <div className="border border-gold-separator/30 rounded-lg bg-parchment-dark/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
        {["Verse", "Principle", "Theme", "Module", "Course"].map((label, i, arr) => (
          <div key={label} className="flex flex-col md:flex-row items-center">
            <div className="px-6 py-3 border border-indigo-deep/20 rounded bg-parchment text-center font-serif text-indigo-deep font-semibold text-sm md:text-base tracking-wide">
              {label}
            </div>
            {i < arr.length - 1 && (
              <>
                <div className="h-5 w-px md:h-px md:w-8 bg-gold-separator/60 md:hidden" />
                <div className="hidden md:block h-px w-8 bg-gold-separator/60" />
              </>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-indigo-medium/60 mt-4 italic">
        Learning builds outward from identity.
      </p>
    </div>

    <Divider />

    {/* Section 2 */}
    <H3>Layered Learning Pathways</H3>
    <P>The framework allows:</P>
    <div className="my-8 space-y-2">
      {[
        "Introductory pathways",
        "Intermediate thematic tracks",
        "Advanced comparative studies",
        "Research-level cross-referencing",
      ].map((label, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="text-xs font-medium text-gold w-6 text-right">{i + 1}</span>
          <div className="h-px flex-1 bg-gold-separator/30" />
          <span className="font-serif text-indigo-deep text-sm md:text-base font-medium">{label}</span>
          <div className="h-px flex-1 bg-gold-separator/30" />
        </div>
      ))}
    </div>
    <P className="font-medium text-indigo-deep/90">All pathways resolve back to canonical reference.</P>
    <P>No detached abstraction.</P>

    <Divider />

    {/* Section 3 */}
    <H3>Structured Taxonomy &amp; Skill Integration</H3>
    <P>The system supports mapping across domains:</P>
    <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-3">
      {["Ethics", "Leadership", "Psychology", "Governance", "Education", "Social Order", "Personal Discipline", "Metaphysics"].map((domain) => (
        <div key={domain} className="border border-gold-separator/30 rounded bg-parchment-dark/20 px-4 py-3 text-center font-serif text-sm text-indigo-deep font-medium">
          {domain}
        </div>
      ))}
    </div>
    <P>Taxonomy does not replace scripture.</P>
    <P className="font-medium text-indigo-deep/90">It maps applicability.</P>

    <Divider />

    {/* Section 4 */}
    <H3>Preserving Canon Within Education</H3>
    <P>The framework ensures:</P>
    <BulletList items={[
      "Canonical text remains unchanged",
      "Interpretations remain attributed",
      "Learning modules remain detachable",
      "Courses do not become doctrinal authorities",
    ]} />
    <P>Education remains layered —</P>
    <P className="font-medium text-indigo-deep/90">never canonical.</P>

    <Divider />

    {/* Closing */}
    <Callout>
      Education organizes knowledge.{"\n"}
      Structure protects it.
    </Callout>
  </IKLPageLayout>
);

export default IKLStructuredEducation;
