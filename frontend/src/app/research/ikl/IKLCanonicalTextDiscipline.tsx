import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";

const IKLCanonicalTextDiscipline = () => (
  <IKLPageLayout
    section="Section I · Foundations"
    title="Canonical Text Discipline"
    subtitle="Principles governing how canonical text is stored, displayed, and protected from contamination."
    prev={{ label: "Canonical Spine & Stability", href: "/research/indian-knowledge-library/canonical-spine" }}
    next={{ label: "Canonical Digital Infrastructure", href: "/research/indian-knowledge-library/canonical-digital-infrastructure" }}
  >
    <P>
      Canonical text discipline refers to the set of rules governing how primary textual material is handled within the Indian Knowledge Library — from ingestion to storage to presentation.
    </P>

    <Divider />

    <H3>Core Rules</H3>
    <BulletList items={[
      "Canonical text is stored separately from all derivative content (commentary, translation, annotation).",
      "No modification of canonical text is permitted at any layer — corrections create versioned annotations.",
      "Display systems must clearly distinguish canonical text from attached layers.",
      "Canonical text is never generated, paraphrased, or summarized by AI systems.",
    ]} />

    <Divider />

    <H3>Separation of Canon and Commentary</H3>
    <P>
      One of the most critical design decisions in the Indian Knowledge Library is the strict separation between canonical text and all forms of commentary. This prevents the blurring that characterizes many existing digital platforms, where a reader cannot distinguish the original from interpretation.
    </P>

    <Callout>
      The canon is preserved. Everything else is attached — never merged.
    </Callout>

    <H3>Implications for Research</H3>
    <P>
      This discipline enables researchers to work with uncontaminated source material, compare across traditions without interpretive bias, and build computational models on structurally clean data.
    </P>
  </IKLPageLayout>
);

export default IKLCanonicalTextDiscipline;
