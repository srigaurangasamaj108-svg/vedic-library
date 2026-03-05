import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowRight } from "lucide-react";

const initiatives = [
  {
    title: "Indian Knowledge Library",
    description:
      "A structured, searchable, verse-level digital infrastructure for Indian Shastras.",
    path: "/research/indian-knowledge-library",
  },
];

const Research = () => {
  return (
    <Layout>
      <main className="section-padding">
        <div className="container-page max-w-3xl text-center">
          <h1 className="heading-display text-foreground mb-4">
            Research Initiatives
          </h1>
          <p className="text-body max-w-xl mx-auto mb-16">
            Institutional efforts to structure and preserve Indian knowledge
            systems.
          </p>

          <div className="grid gap-6 sm:grid-cols-1">
            {initiatives.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="group block rounded-lg border border-border bg-card p-8 text-left card-hover"
              >
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Research;
