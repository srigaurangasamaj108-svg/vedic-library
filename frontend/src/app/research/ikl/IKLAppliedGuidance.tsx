import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const IKLAppliedGuidance = () => (
  <IKLPageLayout
    section="Section II · Four Pillars"
    title="Pillar III — Applied Guidance Framework"
    subtitle="From Principle to Context"
    prev={{ label: "Structured Education Framework", href: "/research/indian-knowledge-library/structured-education-framework" }}
    next={{ label: "Living Civilizational Model", href: "/research/indian-knowledge-library/living-civilizational-model" }}
  >
    {/* Intro */}
    <P>Śāstric knowledge is not abstract.</P>
    <P>
      It addresses human roles,{"\n"}
      life stages,{"\n"}
      ethical dilemmas,{"\n"}
      social responsibilities,{"\n"}
      and decision contexts.
    </P>
    <P className="font-medium text-indigo-deep/90">
      This pillar describes how structured guidance emerges from canonical identity.
    </P>

    <Divider />

    {/* Section 1 */}
    <H3>Situation-to-Reference Mapping</H3>
    <P>The framework enables structured mapping between:</P>
    <BulletList items={[
      "Human roles",
      "Life stages",
      "Occupational domains",
      "Ethical dilemmas",
      "Leadership decisions",
      "Personal development challenges",
    ]} />
    <P>Each mapping must resolve to canonical reference.</P>
    <P>Application does not override identity.</P>
    <P className="font-medium text-indigo-deep/90">It traces back to it.</P>

    <Divider />

    {/* Visual — Context Flow Diagram */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-6 font-medium">
        Context Flow Diagram
      </p>
      <div className="border border-gold-separator/30 rounded-lg bg-parchment-dark/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
        {["Situation", "Principle", "Canonical UID"].map((label, i, arr) => (
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
        Guidance resolves downward.
      </p>
    </div>

    <Divider />

    {/* Section 2 */}
    <H3>Civilizational Domain Mapping</H3>
    <P>The system allows classification across domains such as:</P>
    <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-3">
      {["Education", "Governance", "Family Life", "Social Order", "Economic Responsibility", "Spiritual Practice", "Conflict Resolution", "Leadership"].map((domain) => (
        <div key={domain} className="border border-gold-separator/30 rounded bg-parchment-dark/20 px-4 py-3 text-center font-serif text-sm text-indigo-deep font-medium">
          {domain}
        </div>
      ))}
    </div>
    <P>These domains remain taxonomic layers —</P>
    <P className="font-medium text-indigo-deep/90">not reinterpretations of canon.</P>

    <Divider />

    {/* Section 3 */}
    <H3>Guardrails Against Misapplication</H3>
    <P>The framework prevents:</P>
    <BulletList items={[
      "Isolated verse extraction",
      "Context stripping",
      "Authority inflation",
      "Motivational simplification",
    ]} />
    <P>Guidance remains layered —</P>
    <P className="font-medium text-indigo-deep/90">never canonical.</P>

    <Divider />

    {/* Section 4 */}
    <H3>Toward Living Civilizational Guidance</H3>
    <P>Over time, structured mappings may support:</P>
    <BulletList items={[
      "Ethical advisory frameworks",
      "Mentorship structures",
      "Role-based curriculum integration",
      "Context-sensitive study paths",
    ]} />
    <P className="font-medium text-indigo-deep/90">All guided by canonical reference stability.</P>

    <Divider />

    {/* Closing */}
    <Callout>
      Application without reference fragments.{"\n"}
      Reference without application stagnates.{"\n\n"}
      Structure unites both.
    </Callout>
  </IKLPageLayout>
);

export default IKLAppliedGuidance;
