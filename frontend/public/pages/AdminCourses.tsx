import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminCoursesApi, adminUploadCover } from "@/lib/admin-api";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MultiSelect } from "@/components/ui/multi-select";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Eye,
  EyeOff,
  ExternalLink,
  Upload,
  RefreshCw,
  ImageIcon,
  X,
  GraduationCap,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Course {
  id: string;
  slug: string;
  title: string;
  summary: string | null;
  level: string;
  status: string;
  duration: string | null;
  cover_image_path: string | null;
  created_at: string;
  updated_at: string;
}

const AdminCourses = () => {
  const queryClient = useQueryClient();
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [togglingCourseId, setTogglingCourseId] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    summary: "",
    level: "Beginner",
    status: "upcoming",
    duration: "",
    cover_image_path: "",
  });
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

  // Cover image upload state
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      return data as Category[];
    },
  });

  // Fetch course categories for all courses
  const { data: courseCategoriesMap = {} } = useQuery({
    queryKey: ["course-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_categories")
        .select("course_id, category_id, categories(id, name, slug)");
      if (error) throw error;
      const map: Record<string, Category[]> = {};
      for (const row of data || []) {
        if (!map[row.course_id]) map[row.course_id] = [];
        if (row.categories) map[row.course_id].push(row.categories as unknown as Category);
      }
      return map;
    },
  });

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const data = await adminCoursesApi.list();
      setCourses(Array.isArray(data?.courses) ? data.courses : []);
    } catch (error) {
      console.error("Failed to load courses:", error);
      toast.error(error instanceof Error ? error.message : "Failed to load courses");
      setCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      summary: "",
      level: "Beginner",
      status: "upcoming",
      duration: "",
      cover_image_path: "",
    });
    setEditingCourse(null);
    setCoverPreview(null);
    setCoverFile(null);
    setSelectedCategoryIds([]);
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      slug: course.slug,
      title: course.title,
      summary: course.summary || "",
      level: course.level,
      status: course.status,
      duration: course.duration || "",
      cover_image_path: course.cover_image_path || "",
    });
    const courseCats = courseCategoriesMap[course.id] || [];
    setSelectedCategoryIds(courseCats.map((c) => c.id));
    if (course.cover_image_path) {
      setCoverPreview(course.cover_image_path);
    } else {
      setCoverPreview(null);
    }
    setCoverFile(null);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let updatedFormData = { ...formData };

      // Upload cover image if a new file was selected
      if (coverFile) {
        setIsUploadingCover(true);
        try {
          const result = await adminUploadCover(coverFile, formData.slug || undefined);
          if (result?.publicUrl) {
            updatedFormData.cover_image_path = result.publicUrl;
          }
        } catch (coverError) {
          console.error("Cover upload failed:", coverError);
          toast.error("Failed to upload cover image");
          setIsSaving(false);
          setIsUploadingCover(false);
          return;
        }
        setIsUploadingCover(false);
      }

      let courseId: string;
      if (editingCourse) {
        await adminCoursesApi.update(editingCourse.id, updatedFormData);
        courseId = editingCourse.id;
        toast.success("Course updated successfully");
      } else {
        const newCourse = await adminCoursesApi.create(updatedFormData);
        courseId = newCourse?.course?.id;
        toast.success("Course created successfully");
      }

      // Update course categories
      if (courseId) {
        await supabase.from("course_categories").delete().eq("course_id", courseId);
        if (selectedCategoryIds.length > 0) {
          const inserts = selectedCategoryIds.map((category_id) => ({
            course_id: courseId,
            category_id,
          }));
          await supabase.from("course_categories").insert(inserts);
        }
        queryClient.invalidateQueries({ queryKey: ["course-categories"] });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchCourses();
    } catch (error) {
      toast.error(editingCourse ? "Failed to update course" : "Failed to create course");
    } finally {
      setIsSaving(false);
      setIsUploadingCover(false);
    }
  };

  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, and WebP images are allowed");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error(`File size exceeds maximum of 5MB`);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    setCoverFile(file);
    e.target.value = "";
  };

  const clearCoverImage = () => {
    setCoverPreview(null);
    setCoverFile(null);
    setFormData((prev) => ({ ...prev, cover_image_path: "" }));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;

    try {
      await adminCoursesApi.delete(id);
      toast.success("Course deleted successfully");
      fetchCourses();
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  const togglePublishStatus = async (course: Course) => {
    setTogglingCourseId(course.id);
    const newStatus = course.status === "available" ? "upcoming" : "available";

    try {
      await adminCoursesApi.update(course.id, { status: newStatus });
      toast.success(`Course ${newStatus === "available" ? "published" : "unpublished"} successfully`);
      fetchCourses();
    } catch (error) {
      toast.error("Failed to update course status");
    } finally {
      setTogglingCourseId(null);
    }
  };

  const openPreview = (slug: string) => {
    window.open(`/courses/${slug}`, "_blank");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Courses</h2>
            <p className="text-muted-foreground">Manage your course offerings</p>
          </div>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
                <DialogDescription>
                  {editingCourse ? "Update the course details below" : "Fill in the details for the new course"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="my-course-title"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, level: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g. 8 weeks"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Categories</Label>
                  <MultiSelect
                    options={categories.map((c) => ({ value: c.id, label: c.name }))}
                    selected={selectedCategoryIds}
                    onChange={setSelectedCategoryIds}
                    placeholder="Select categories..."
                    emptyMessage="No categories. Create some first."
                  />
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="flex gap-4 items-start">
                    <div className="relative w-24 h-16 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden">
                      {coverPreview ? (
                        <>
                          <img src={coverPreview} alt="Cover preview" className="w-full h-full object-cover" />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={clearCoverImage}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="file"
                        ref={coverInputRef}
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={handleCoverSelect}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => coverInputRef.current?.click()}
                        disabled={isUploadingCover}
                        className="w-full"
                      >
                        {isUploadingCover ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : coverPreview ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Replace Image
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Cover
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, PNG, or WebP. Max 5MB.</p>
                    </div>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : editingCourse ? (
                      "Update Course"
                    ) : (
                      "Create Course"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              All Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : courses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No courses found. Add your first course to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.slug}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(courseCategoriesMap[course.id] || []).length === 0 ? (
                            <span className="text-xs text-muted-foreground">—</span>
                          ) : (
                            (courseCategoriesMap[course.id] || []).map((cat) => (
                              <Badge key={cat.id} variant="outline" className="text-xs">
                                {cat.name}
                              </Badge>
                            ))
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{course.level}</Badge>
                      </TableCell>
                      <TableCell>
                        {course.status === "available" ? (
                          <Badge variant="default" className="gap-1">
                            <Eye className="h-3 w-3" />
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <EyeOff className="h-3 w-3" />
                            Upcoming
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => togglePublishStatus(course)}
                            disabled={togglingCourseId === course.id}
                            title={course.status === "available" ? "Unpublish" : "Publish"}
                          >
                            {togglingCourseId === course.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : course.status === "available" ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openPreview(course.slug)}
                            title="Preview"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => openEditDialog(course)} title="Edit">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(course.id)}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminCourses;
