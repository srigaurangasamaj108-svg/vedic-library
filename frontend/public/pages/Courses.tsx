import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import { Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import CategoryFilter from "@/components/CategoryFilter";

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

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CourseCategory {
  course_id: string;
  category_id: string;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "upcoming":
      return (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Upcoming
        </span>
      );
    case "available":
      return (
        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
          Available
        </span>
      );
    case "ongoing":
      return (
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
          Ongoing
        </span>
      );
    default:
      return null;
  }
};

const getLevelBadge = (level: string) => {
  return (
    <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
      {level}
    </span>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [courseCategories, setCourseCategories] = useState<CourseCategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [coursesRes, categoriesRes, courseCategoriesRes] = await Promise.all([
        supabase.from("courses").select("*").order("created_at", { ascending: true }),
        supabase.from("categories").select("*").order("name"),
        supabase.from("course_categories").select("course_id, category_id"),
      ]);

      if (coursesRes.error) console.error("Error fetching courses:", coursesRes.error);
      if (categoriesRes.error) console.error("Error fetching categories:", categoriesRes.error);
      if (courseCategoriesRes.error) console.error("Error fetching course categories:", courseCategoriesRes.error);

      setCourses(coursesRes.data || []);
      setCategories(categoriesRes.data || []);
      setCourseCategories(courseCategoriesRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
  };

  // Only show categories that have at least one published course
  const availableCategories = useMemo(() => {
    const publishedCourseIds = courses.filter(c => c.status === "available").map(c => c.id);
    const usedCategoryIds = new Set(
      courseCategories
        .filter(cc => publishedCourseIds.includes(cc.course_id))
        .map(cc => cc.category_id)
    );
    return categories.filter(cat => usedCategoryIds.has(cat.id));
  }, [courses, courseCategories, categories]);

  const filteredCourses = useMemo(() => {
    if (selectedCategories.length === 0) return courses;

    const courseIdsWithSelectedCategories = courseCategories
      .filter((cc) => selectedCategories.includes(cc.category_id))
      .map((cc) => cc.course_id);

    return courses.filter((course) => courseIdsWithSelectedCategories.includes(course.id));
  }, [courses, courseCategories, selectedCategories]);

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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-card">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="heading-display mb-6 text-foreground">
              Immersive Courses
            </h1>
            <p className="text-body">
              Deepen your understanding of Vedic wisdom through structured
              learning programs designed for seekers at every stage of their journey.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="container-page">
          <CategoryFilter
            categories={availableCategories}
            selectedCategories={selectedCategories}
            onCategoryToggle={handleCategoryToggle}
            onClearAll={handleClearAll}
          />

          {filteredCourses.length === 0 ? (
            <p className="text-center text-muted-foreground">
              {selectedCategories.length > 0
                ? "No courses found in the selected categories."
                : "No courses available yet."}
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
                >
                  {/* Cover Image */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={getCoverImage(course)}
                      alt={course.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Badges */}
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {getLevelBadge(course.level)}
                      {getStatusBadge(course.status)}
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 font-serif text-xl font-semibold leading-tight text-foreground">
                      {course.title}
                    </h3>

                    {/* Summary */}
                    <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {course.summary}
                    </p>

                    {/* Duration */}
                    {course.duration && (
                      <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="mt-auto">
                      <Button asChild variant="outline" className="w-full">
                        <Link to={`/courses/${course.slug}`}>Learn More</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* More Coming Soon */}
          <div className="mt-16 text-center">
            <div className="mx-auto max-w-md rounded-xl border border-dashed border-border bg-muted/30 p-8">
              <p className="font-serif text-lg font-medium text-foreground">
                More Courses Coming Soon
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                We're developing additional courses on Sanskrit, Vedanta, Meditation,
                and more. Stay connected for updates.
              </p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/contact">Get Notified</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
