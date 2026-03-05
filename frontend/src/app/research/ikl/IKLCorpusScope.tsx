import IKLPageLayout from "@/components/ikl/IKLPageLayout";
import { P, H3, BulletList, Callout, Divider } from "@/components/ikl/IKLContent";
import corpusTree from "@/assets/ikl-corpus-tree.jpg";

const IKLCorpusScope = () => (
  <IKLPageLayout
    section="Section V · Expansion & Vision"
    title="Corpus Scope — The Vedic Knowledge Tree"
    subtitle="The full structural taxonomy of Indian śāstric traditions within the Indian Knowledge Library."
    prev={{ label: "Phase Roadmap", href: "/research/indian-knowledge-library/phase-roadmap" }}
    next={{ label: "Institutional Collaboration", href: "/research/indian-knowledge-library/institutional-collaboration" }}
  >
    <P>
      The Indian Knowledge Library aims to structurally encompass the entire spectrum of Indian śāstric traditions — from the earliest Vedic compositions to the living sampradāya literatures.
    </P>

    <div className="flex justify-center my-10">
      <img
        src={corpusTree}
        alt="Vedic Knowledge Tree"
        className="w-full max-w-sm rounded border border-gold-separator/30 opacity-90"
      />
    </div>

    <Divider />

    <H3>Structural Domains</H3>
    <BulletList items={[
      "Śruti — Vedic saṃhitā, Brāhmaṇa, Āraṇyaka, Upaniṣad traditions.",
      "Smṛti — Dharmaśāstra, Gṛhyasūtra, and related normative literatures.",
      "Itihāsa — Mahābhārata, Rāmāyaṇa, and allied narrative traditions.",
      "Purāṇa — The eighteen Mahāpurāṇas and regional Purāṇic traditions.",
      "Āgama / Tantra — Vaiṣṇava, Śaiva, Śākta, and related liturgical-philosophical canons.",
      "Vedāṅga — Śikṣā, Chandas, Vyākaraṇa, Nirukta, Jyotiṣa, Kalpa.",
      "Upaveda — Āyurveda, Dhanurveda, Gāndharvaveda, Arthaśāstra.",
      "Darśana — Nyāya, Vaiśeṣika, Sāṅkhya, Yoga, Mīmāṃsā, Vedānta.",
      "Sampradāya Traditions — Lineage-specific commentarial and devotional literatures.",
    ]} />

    <Callout>
      The challenge is not preservation alone — it is structural coherence across this entire civilizational knowledge spectrum.
    </Callout>
  </IKLPageLayout>
);

export default IKLCorpusScope;
