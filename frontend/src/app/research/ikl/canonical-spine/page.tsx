import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Divider = () => (
  <div className="border-t border-border my-16" />
);

const Section = ({ children }: { children: React.ReactNode }) => (
  <section className="py-12 md:py-20">
    <div className="max-w-screen-lg mx-auto px-6">{children}</div>
  </section>
);

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-semibold mb-6">
    {children}
  </h2>
);

const P = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <p className={`text-base md:text-lg leading-relaxed text-muted-foreground ${className}`}>
    {children}
  </p>
);

const BulletGroup = ({ items }: { items: string[] }) => (
  <ul className="space-y-3 my-6 list-disc pl-6 text-muted-foreground">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export default function CanonicalSpinePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-screen-lg mx-auto px-6 py-4 text-sm text-muted-foreground">
          <Link href="/research/ikl" className="hover:text-foreground transition-colors">
            Indian Knowledge Library
          </Link>
          <span className="mx-2">/</span>
          <span>Canonical Spine</span>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-screen-lg mx-auto px-6 py-20 md:py-28">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            Section I · Foundations
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Canonical Spine Declaration
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            Structural Backbone for Stable Canonical Identity
          </p>

          <div className="space-y-4 max-w-3xl">
            <P>Canonical identity defines what a unit is.</P>
            <P>The canonical spine defines where it lives.</P>
            <P className="font-medium text-foreground">
              Without a declared spine,<br />
              identity cannot remain stable across editions,
              generations, and digital systems.
            </P>
          </div>
        </div>
      </section>

      <Divider />

      {/* Section 1 */}
      <Section>
        <Heading>Structural Backbone, Not Textual Preference</Heading>

        <P className="mb-4">
          A canonical spine is the minimal, stable structural framework of a śāstra.
        </P>

        <P className="mt-6">It defines:</P>
        <BulletGroup
          items={[
            "Hierarchical depth",
            "Numerical sequencing",
            "Address resolution",
            "Unit containment",
          ]}
        />

        <P className="mt-6">It does not define:</P>
        <BulletGroup
          items={[
            "Interpretation",
            "Translation",
            "Edition preference",
            "Philosophical meaning",
          ]}
        />

        <P className="mt-8 italic">
          The spine is structural authority.<br />
          Not textual opinion.
        </P>
      </Section>

      <Divider />

      {/* Navigation */}
      <nav className="border-t border-border bg-muted">
        <div className="max-w-screen-lg mx-auto px-6 py-10 flex items-center justify-between">

          <Link
            href="/research/ikl/canonical-identity-framework"
            className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <div>
              <p className="text-xs mb-1">Previous</p>
              <p className="font-medium">Canonical Identity Framework</p>
            </div>
          </Link>

          <Link
            href="/research/ikl/knowledge-layer-model"
            className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
          >
            <div>
              <p className="text-xs mb-1">Next</p>
              <p className="font-medium">Knowledge Layer Model</p>
            </div>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

        </div>
      </nav>

    </main>
  );
}
