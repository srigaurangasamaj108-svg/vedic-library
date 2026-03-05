import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const IKLLivingCivilizationalModel = () => (
  <IKLPageLayout
    section="Section II · Four Pillars"
    title="Pillar IV — Living Civilizational Model"
    subtitle="Structured Continuity Across Generations"
    prev={{ label: "Applied Guidance Framework", href: "/research/indian-knowledge-library/applied-guidance-mapping" }}
    next={{ label: "Corpus Scope & Textual Coverage", href: "/research/indian-knowledge-library/corpus-scope" }}
  >
    {/* Intro */}
    <P>Texts preserve knowledge.</P>
    <P>Education transmits it.</P>
    <P>Guidance applies it.</P>
    <P>Civilization sustains it through living engagement.</P>
    <P className="font-medium text-indigo-deep/90">
      This pillar describes how structured community interaction remains layered — never canonical.
    </P>

    <Divider />

    {/* Section 1 */}
    <H3>Engagement Within Structure</H3>
    <P>The model allows:</P>
    <BulletList items={[
      "Structured discussion spaces",
      "Moderated reflections",
      "Context-aware annotations",
      "Study circles",
      "Institutional collaboration",
    ]} />
    <P>All engagement remains:</P>
    <div className="my-8 grid grid-cols-2 md:grid-cols-4 gap-3">
      {["Attributed", "Versioned", "Non-canonical", "Layered"].map((label) => (
        <div key={label} className="border border-gold-separator/30 rounded bg-parchment-dark/20 px-4 py-3 text-center font-serif text-sm text-indigo-deep font-medium">
          {label}
        </div>
      ))}
    </div>
    <P className="font-medium text-indigo-deep/90">Community voice does not redefine textual identity.</P>

    <Divider />

    {/* Visual — Layered Engagement Model */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-8 font-medium">
        Layered Engagement Model
      </p>
      <div className="flex items-center justify-center">
        <div className="relative">
          {[
            { label: "Community Layer", size: "w-72 h-72 md:w-80 md:h-80", opacity: "bg-parchment-dark/15" },
            { label: "Guidance Layer", size: "w-56 h-56 md:w-60 md:h-60", opacity: "bg-parchment-dark/25" },
            { label: "Educational Layer", size: "w-40 h-40 md:w-44 md:h-44", opacity: "bg-parchment-dark/35" },
            { label: "Canonical Core", size: "w-24 h-24 md:w-28 md:h-28", opacity: "bg-parchment-dark/50" },
          ].map(({ label, size, opacity }) => (
            <div
              key={label}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${size} ${opacity} rounded-full border border-gold-separator/40 flex items-end justify-center pb-2`}
            >
              <span className="font-serif text-xs text-indigo-deep/70 text-center leading-tight px-2">
                {label}
              </span>
            </div>
          ))}
          {/* Spacer to hold the size of outermost ring */}
          <div className="w-72 h-72 md:w-80 md:h-80" />
        </div>
      </div>
      <p className="text-center text-sm text-indigo-medium/60 mt-6 italic">
        Living engagement surrounds — it does not alter.
      </p>
    </div>

    <Divider />

    {/* Section 2 */}
    <H3>Guardrails for Continuity</H3>
    <P>The system enforces:</P>
    <BulletList items={[
      "Attribution requirements",
      "Role-based moderation",
      "Clear layer separation",
      "Preservation of canonical integrity",
      "Prevention of doctrinal drift",
    ]} />
    <P className="font-medium text-indigo-deep/90">Community vitality must coexist with structural stability.</P>

    <Divider />

    {/* Section 3 */}
    <H3>Institutional & Intergenerational Continuity</H3>
    <P>The model supports:</P>
    <BulletList items={[
      "Academic participation",
      "Mentorship structures",
      "Cross-institutional collaboration",
      "Generational knowledge transfer",
    ]} />
    <P>Continuity depends on structure —</P>
    <P className="font-medium text-indigo-deep/90">not on platform dynamics.</P>

    <Divider />

    {/* Section 4 */}
    <H3>A Living Knowledge Ecology</H3>
    <P>Over decades, the system may support:</P>
    <BulletList items={[
      "Regional study networks",
      "Multi-traditional discourse",
      "Structured community annotation",
      "Ethical and social dialogue",
    ]} />
    <P className="font-medium text-indigo-deep/90">All anchored in canonical reference stability.</P>

    <Divider />

    {/* Closing */}
    <Callout>
      Civilization survives{"\n"}
      when engagement remains accountable to identity.
    </Callout>
  </IKLPageLayout>
);

export default IKLLivingCivilizationalModel;
