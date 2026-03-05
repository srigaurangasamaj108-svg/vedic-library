import Layout from "@/components/layout/Layout";
import { Heart, BookOpen, Users, Target } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-card">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="heading-display mb-6 text-foreground">
              About Vedarth
            </h1>
            <p className="text-body">
              We are dedicated to making the profound wisdom of the Vedas
              accessible to seekers around the world, preserving ancient
              knowledge while adapting its presentation for the modern era.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h2 className="heading-section mb-6 text-center text-foreground">
              Our Story
            </h2>
            <div className="space-y-6 text-body">
              <p>
                Vedarth was born from a simple yet profound vision: to bridge the
                gap between ancient Vedic wisdom and contemporary seekers. In a
                world filled with noise and distraction, the timeless teachings
                of the Vedas offer clarity, purpose, and inner peace.
              </p>
              <p>
                Our team of scholars, educators, and technologists work together
                to curate authentic content, develop engaging courses, and create
                a supportive community for spiritual growth. We believe that
                everyone, regardless of background, can benefit from these
                universal teachings.
              </p>
              <p>
                From the sacred verses of the Upanishads to practical wisdom of
                the Bhagavad Gita, from the science of Ayurveda to the philosophy
                of Yoga — we present these traditions with scholarly rigor and
                heartfelt devotion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-card">
        <div className="container-page">
          <h2 className="heading-section mb-12 text-center text-foreground">
            Our Values
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Authenticity */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                Authenticity
              </h3>
              <p className="text-sm text-muted-foreground">
                We present teachings from authentic sources, verified by scholars
                and rooted in tradition.
              </p>
            </div>

            {/* Accessibility */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                Accessibility
              </h3>
              <p className="text-sm text-muted-foreground">
                Ancient wisdom should be available to all. We design our programs
                for seekers at every level.
              </p>
            </div>

            {/* Purpose */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                Purpose
              </h3>
              <p className="text-sm text-muted-foreground">
                Our mission is service. Every decision is guided by what benefits
                our community of learners.
              </p>
            </div>

            {/* Devotion */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                Devotion
              </h3>
              <p className="text-sm text-muted-foreground">
                We approach our work with reverence for the teachings and care
                for those we serve.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
