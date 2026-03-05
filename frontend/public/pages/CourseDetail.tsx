import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Users, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Import course cover images for local assets mapping
import vedicPsychologyCover from "@/assets/courses/vedic-psychology.jpg";
import foodMindConsciousnessCover from "@/assets/courses/food-mind-consciousness.jpg";
import yogicLifestyleCover from "@/assets/courses/yogic-lifestyle.jpg";

const coverImageMap: Record<string, string> = {
  "/assets/courses/vedic-psychology.jpg": vedicPsychologyCover,
  "/assets/courses/food-mind-consciousness.jpg": foodMindConsciousnessCover,
  "/assets/courses/yogic-lifestyle.jpg": yogicLifestyleCover,
};

interface Course {
  id: string;
  slug: string;
  title: string;
  level: string;
  summary: string | null;
  status: string;
  duration: string | null;
  cover_image_path: string | null;
}

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", courseId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching course:", error);
      }
      setCourse(data);
      setLoading(false);
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const getCoverImage = (course: Course): string => {
    if (course.cover_image_path && (course.cover_image_path.startsWith("http://") || course.cover_image_path.startsWith("https://"))) {
      return course.cover_image_path;
    }
    if (course.cover_image_path && coverImageMap[course.cover_image_path]) {
      return coverImageMap[course.cover_image_path];
    }
    return course.cover_image_path || "/placeholder.svg";
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="heading-section mb-4 text-foreground">
                Course Not Found
              </h1>
              <p className="text-body mb-8">
                The course you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link to="/courses">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Courses
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="border-b border-border bg-card py-4">
        <div className="container-page">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </div>
      </section>

      {/* Course Detail */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-10 md:grid-cols-2 md:items-start">
              {/* Cover Image */}
              <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
                <img
                  src={getCoverImage(course)}
                  alt={course.title}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="flex flex-col">
                {/* Badges */}
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {course.level}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {course.status === "upcoming" ? "Upcoming" : course.status === "available" ? "Available" : "Ongoing"}
                  </span>
                </div>

                {/* Title */}
                <h1 className="heading-section mb-4 text-foreground">
                  {course.title}
                </h1>

                {/* Summary */}
                <p className="text-body mb-6">
                  {course.summary}
                </p>

                {/* Course Info Cards */}
                <div className="mb-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-card p-4 text-center">
                    <Clock className="mx-auto mb-2 h-5 w-5 text-primary" />
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="text-sm font-medium text-foreground">{course.duration || "TBA"}</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4 text-center">
                    <Calendar className="mx-auto mb-2 h-5 w-5 text-primary" />
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="text-sm font-medium text-foreground">Coming Soon</p>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4 text-center">
                    <Users className="mx-auto mb-2 h-5 w-5 text-primary" />
                    <p className="text-xs text-muted-foreground">Format</p>
                    <p className="text-sm font-medium text-foreground">Online</p>
                  </div>
                </div>

                {/* Upcoming Notice Card */}
                <div className="rounded-2xl border border-border bg-muted/30 p-6 text-center">
                  <h2 className="mb-2 font-serif text-lg font-semibold text-foreground">
                    Course Launching Soon
                  </h2>

                  <p className="mb-4 text-sm text-muted-foreground">
                    Register your interest to be the first to know when enrollment opens.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild variant="default">
                      <Link to="/contact">Register Interest</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/courses">Browse Other Courses</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CourseDetail;
