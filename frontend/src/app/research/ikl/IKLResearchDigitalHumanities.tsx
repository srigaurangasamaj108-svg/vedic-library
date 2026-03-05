import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const IKLResearchDigitalHumanities = () => (
  <IKLPageLayout
    section="Section III · Architecture & Research"
    title="Research & Digital Humanities Context"
    subtitle="Toward Structured Infrastructure for Indian Knowledge Systems"
    prev={{ label: "Technical Architecture", href: "/research/indian-knowledge-library/technical-architecture" }}
    next={{ label: "Current Phase Status", href: "/research/indian-knowledge-library/current-phase" }}
  >
    {/* Intro */}
    <P>Digital humanities has transformed how texts are indexed, analyzed, and disseminated.</P>
    <P>
      Yet classical śāstric traditions present structural challenges that generic digital frameworks do not address.
    </P>
    <P className="font-medium text-indigo-deep/90">
      The Indian Knowledge Library approaches digital preservation as a structural research problem — not merely a digitization effort.
    </P>

    <Divider />

    {/* Section 1 */}
    <H3>Beyond Digitization</H3>
    <P>Most digital humanities projects focus on:</P>
    <BulletList items={[
      "Manuscript digitization",
      "Text encoding",
      "Corpus indexing",
      "Searchability",
      "Annotation systems",
    ]} />
    <P>Śāstric traditions require additional discipline:</P>
    <BulletList items={[
      "Canonical identity stability",
      "Spine declaration",
      "Layer separation",
      "Cross-interpretive containment",
      "Long-term UID resolution",
    ]} />
    <P className="font-medium text-indigo-deep/90">Digital representation must preserve structural ontology.</P>

    <Divider />

    {/* Visual — Digitization vs Structural Infrastructure */}
    <div className="my-12 md:my-16">
      <p className="text-xs tracking-[0.2em] uppercase text-gold text-center mb-8 font-medium">
        Digitization vs Structural Infrastructure
      </p>
      <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
        <div className="border border-gold-separator/30 rounded bg-parchment-dark/15 p-6">
          <p className="font-serif text-sm font-semibold text-indigo-deep mb-4 text-center">Digitization</p>
          <ul className="space-y-2 text-sm text-indigo-medium/70">
            {["Scan", "Encode", "Index", "Search", "Display"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-indigo-medium/30 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-gold-separator/40 rounded bg-parchment-dark/30 p-6">
          <p className="font-serif text-sm font-semibold text-indigo-deep mb-4 text-center">Structural Infrastructure</p>
          <ul className="space-y-2 text-sm text-indigo-medium/80">
            {["Identify", "Anchor", "Layer", "Govern", "Sustain"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-center text-sm text-indigo-medium/60 mt-6 italic">
        Access is not structure.
      </p>
    </div>

    <Divider />

    {/* Section 2 */}
    <H3>Alignment with Indian Knowledge Systems (IKS)</H3>
    <P>Indian Knowledge Systems initiatives emphasize:</P>
    <BulletList items={[
      "Curriculum integration",
      "Interdisciplinary study",
      "Civilizational awareness",
      "Research-driven revitalization",
    ]} />
    <P>A stable digital canonical infrastructure enables:</P>
    <BulletList items={[
      "Reliable citation",
      "Cross-text curriculum design",
      "Thematic research mapping",
      "Inter-traditional comparison",
      "Institutional adoption",
    ]} />
    <P className="font-medium text-indigo-deep/90">Infrastructure precedes integration.</P>

    <Divider />

    {/* Section 3 */}
    <H3>Research Possibilities</H3>
    <P>A structured canonical system enables:</P>
    <BulletList items={[
      "Cross-commentary comparison",
      "Philosophical lineage tracing",
      "Structural motif analysis",
      "Entity mapping",
      "Thematic clustering",
      "Version-aware textual comparison",
    ]} />
    <P className="font-medium text-indigo-deep/90">
      Scholarly disagreement remains possible — without structural ambiguity.
    </P>

    <Divider />

    {/* Section 4 */}
    <H3>Open to Academic Collaboration</H3>
    <P>The project is designed to:</P>
    <BulletList items={[
      "Support institutional partnerships",
      "Enable research contributions",
      "Facilitate schema refinement",
      "Integrate with curriculum frameworks",
      "Allow multi-disciplinary exploration",
    ]} />
    <P className="font-medium text-indigo-deep/90">
      Architecture supports plurality — without sacrificing canonical stability.
    </P>

    <Divider />

    {/* Closing */}
    <Callout>
      Research requires reference.{"\n"}
      Reference requires structure.
    </Callout>
  </IKLPageLayout>
);

export default IKLResearchDigitalHumanities;
