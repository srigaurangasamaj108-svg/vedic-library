import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const layers = [
  { num: "1", name: "Canonical", color: "bg-parchment-dark/50" },
  { num: "2", name: "Semantic", color: "bg-parchment-dark/40" },
  { num: "3", name: "Interpretive", color: "bg-parchment-dark/30" },
  { num: "4", name: "Pedagogical", color: "bg-parchment-dark/20" },
  { num: "5", name: "Community", color: "bg-parchment-dark/10" },
];

const IKLKnowledgeLayerModel = () => (
  <IKLPageLayout
    section="Section III · Architecture & Research"
    title="Knowledge Layer Model"
    subtitle="From Canonical Preservation to Living Application"
    prev={{ label: "Canonical Spine Declaration", href: "/research/indian-knowledge-library/canonical-spine" }}
    next={{ label: "AI Governance & Safeguards", href: "/research/indian-knowledge-library/ai-governance" }}
  >
    {/* Intro */}
    <P>Not all knowledge is the same kind of knowledge.</P>
    <P>Śāstra itself distinguishes between:</P>
    <BulletList items={[
      "Text",
      "Meaning",
      "Principle",
      "Application",
      "Realization",
    ]} />
    <P className="font-medium text-indigo-deep/90">
      Digital systems must preserve these distinctions — without collapsing them.
    </P>

    <Divider />

    {/* Visual — Five-Layer Knowledge Model */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-8 font-medium">
        Five-Layer Knowledge Model
      </p>
      <div className="max-w-lg mx-auto space-y-2">
        {layers.map(({ num, name, color }) => (
          <div
            key={num}
            className={`${color} border border-gold-separator/40 rounded px-6 py-4 flex items-center justify-between`}
          >
            <span className="font-serif text-sm md:text-base font-semibold text-indigo-deep">
              Layer {num} — {name}
            </span>
            <span className="text-xs text-indigo-medium/50 tracking-wide uppercase">
              {num === "1" ? "Foundation" : `Level ${num}`}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-8 mt-6 text-sm text-indigo-medium/60 italic">
        <span>↓ Authority flows downward</span>
        <span>↑ Expansion flows upward</span>
      </div>
    </div>

    <Divider />

    {/* Layer 1 */}
    <H3>Layer 1 — Canonical</H3>
    <BulletList items={[
      "Primary śāstric unit",
      "UID-anchored",
      "Immutable",
      "Language-stable",
      "Identity-bound",
    ]} />
    <P className="font-medium text-indigo-deep/90 font-serif italic">Answers: What is actually said?</P>

    <Divider />

    {/* Layer 2 */}
    <H3>Layer 2 — Semantic</H3>
    <BulletList items={[
      "Translations",
      "Glosses",
      "Word meanings",
      "Entities",
      "Principles",
    ]} />
    <P className="font-medium text-indigo-deep/90 font-serif italic">Answers: What does it mean?</P>
    <P>Dependent on canonical. Removable without altering canon.</P>

    <Divider />

    {/* Layer 3 */}
    <H3>Layer 3 — Interpretive</H3>
    <BulletList items={[
      "Commentaries",
      "Sampradāya readings",
      "Comparative traditions",
      "Philosophical explanations",
    ]} />
    <P className="font-medium text-indigo-deep/90 font-serif italic">Answers: How is it understood within a tradition?</P>
    <P>Plural. Attributed. Non-canonical.</P>

    <Divider />

    {/* Layer 4 */}
    <H3>Layer 4 — Pedagogical</H3>
    <BulletList items={[
      "Courses",
      "Lessons",
      "Guided reading paths",
      "Curriculum frameworks",
      "Skill-based structuring",
    ]} />
    <P className="font-medium text-indigo-deep/90 font-serif italic">Answers: How should it be taught or practiced?</P>
    <P>Audience-aware. Selective. Contextual.</P>

    <Divider />

    {/* Layer 5 */}
    <H3>Layer 5 — Community & Living Layer</H3>
    <BulletList items={[
      "Discussion",
      "Reflection",
      "Shared application",
      "Contextual inquiry",
      "Contemporary dialogue",
    ]} />
    <P className="font-medium text-indigo-deep/90 font-serif italic">Answers: How is it being lived now?</P>
    <P>Experiential. Moderated. Non-authoritative.</P>

    <Divider />

    {/* Dependency Rule */}
    <H3>One-Way Dependency</H3>
    <P className="font-medium text-indigo-deep/90">No upper layer may redefine a lower one.</P>

    <div className="my-8">
      <div className="border border-gold-separator/30 rounded-lg bg-parchment-dark/30 p-8 md:p-12 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
        {["Canonical", "Semantic", "Interpretive", "Pedagogical", "Community"].map((label, i, arr) => (
          <div key={label} className="flex flex-col md:flex-row items-center">
            <div className="px-4 py-2.5 border border-indigo-deep/20 rounded bg-parchment text-center font-serif text-indigo-deep font-semibold text-xs md:text-sm tracking-wide">
              {label}
            </div>
            {i < arr.length - 1 && (
              <>
                <div className="h-5 w-px md:h-px md:w-6 bg-gold-separator/60 md:hidden" />
                <div className="hidden md:block h-px w-6 bg-gold-separator/60" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>

    <P>This preserves:</P>
    <BulletList items={[
      "Doctrinal stability",
      "Interpretive plurality",
      "Educational freedom",
      "Community vitality",
    ]} />
    <P className="font-medium text-indigo-deep/90">Without structural collapse.</P>

    <Divider />

    {/* Closing */}
    <div className="text-center space-y-1 py-4">
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">Canon preserves truth.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">Meaning unfolds it.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">Teaching transmits it.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep/90 italic">Community lives it.</p>
      <p className="font-serif text-base md:text-lg text-indigo-deep font-semibold mt-4">Architecture keeps them distinct.</p>
    </div>
  </IKLPageLayout>
);

export default IKLKnowledgeLayerModel;
