import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Vedic Education"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="container-page relative z-10 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="heading-display mb-6 animate-fade-in text-foreground">
              Timeless Vedic Wisdom for the Modern Mind
            </h1>
            <p className="text-body mx-auto mb-10 max-w-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Explore the profound teachings of ancient India through carefully curated
              books, immersive courses, and meaningful career paths. Begin your journey
              to inner wisdom today.
            </p>
            <div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              style={{ animationDelay: "0.4s" }}
            >
              <Button variant="hero" size="lg" asChild>
                <Link to="/books">
                  Explore Books
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/courses">View Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-card">
        <div className="container-page">
          <div className="mb-16 text-center">
            <h2 className="heading-section mb-4 text-foreground">
              Discover Your Path
            </h2>
            <p className="text-body mx-auto max-w-2xl">
              Whether you seek knowledge through sacred texts, structured learning,
              or a fulfilling career, Vedarth guides you every step of the way.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Books Card */}
            <Link
              to="/books"
              className="card-hover group rounded-2xl border border-border bg-background p-8 text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mb-3 font-serif text-2xl font-semibold text-foreground">
                Sacred Books
              </h3>
              <p className="text-body">
                Access a curated collection of Vedic scriptures, commentaries,
                and modern interpretations.
              </p>
            </Link>

            {/* Courses Card */}
            <Link
              to="/courses"
              className="card-hover group rounded-2xl border border-border bg-background p-8 text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="mb-3 font-serif text-2xl font-semibold text-foreground">
                Immersive Courses
              </h3>
              <p className="text-body">
                Learn from experienced scholars through structured programs
                designed for modern seekers.
              </p>
            </Link>

            {/* Careers Card */}
            <Link
              to="/careers"
              className="card-hover group rounded-2xl border border-border bg-background p-8 text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Briefcase className="h-8 w-8" />
              </div>
              <h3 className="mb-3 font-serif text-2xl font-semibold text-foreground">
                Meaningful Careers
              </h3>
              <p className="text-body">
                Explore opportunities to serve and grow within the Vedic
                education community.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading-section mb-6 text-foreground">Our Mission</h2>
            <p className="text-body mb-8">
              Vedarth is dedicated to preserving and sharing the timeless wisdom
              of the Vedas in a way that resonates with contemporary seekers. We
              believe that ancient knowledge holds the keys to modern challenges,
              offering guidance for a life of purpose, clarity, and inner peace.
            </p>
            <Button variant="outline" asChild>
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-muted/30">
        <div className="container-page">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-muted-foreground">
              Questions or feedback? Email us at{" "}
              <a
                href="mailto:anubhav@vedarth.io"
                className="font-medium text-primary hover:underline"
              >
                anubhav@vedarth.io
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
