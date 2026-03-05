import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Briefcase, MapPin, Clock, Upload, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// Input validation schema
const applicationSchema = z.object({
  fullName: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  roleApplyingFor: z.string()
    .min(1, "Please select a role"),
});
const openRoles = [
  {
    id: 1,
    title: "Sanskrit Instructor",
    location: "Remote / Online",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Content Researcher",
    location: "Remote",
    type: "Part-time",
  },
  {
    id: 3,
    title: "Course Designer",
    location: "Remote",
    type: "Contract",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    location: "Remote",
    type: "Full-time",
  },
  {
    id: 5,
    title: "ML Developer",
    location: "Remote",
    type: "Full-time",
  },
];

const Careers = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    roleApplyingFor: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOC file.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validationResult = applicationSchema.safeParse(formData);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    if (!resumeFile) {
      toast({
        title: "Missing resume",
        description: "Please upload your resume.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate unique file path
      const fileExt = resumeFile.name.split(".").pop();
      const fileName = `${Date.now()}-${formData.fullName.replace(/\s+/g, "-").toLowerCase()}.${fileExt}`;

      // Upload resume to storage
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, resumeFile);

      if (uploadError) {
        throw uploadError;
      }

      // Save application to database
      const { error: dbError } = await supabase.from("job_applications").insert({
        full_name: formData.fullName,
        email: formData.email,
        role_applying_for: formData.roleApplyingFor,
        resume_path: fileName,
      });

      if (dbError) {
        throw dbError;
      }

      setIsSubmitted(true);
      toast({
        title: "Application submitted!",
        description: "Thank you for your interest. We'll be in touch soon.",
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding bg-card">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="heading-display mb-6 text-foreground">Careers</h1>
            <p className="text-body text-lg">
              Join us in spreading timeless wisdom through modern technology.
            </p>
          </div>
        </div>
      </section>

      {/* Open Roles Section */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <h2 className="heading-section mb-8 text-center text-foreground">
              Open Positions
            </h2>

            <div className="space-y-4">
              {openRoles.map((role) => (
                <div
                  key={role.id}
                  className="card-hover flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground">
                        {role.title}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {role.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {role.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Open
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resume Submission Form */}
      <section className="section-padding bg-card">
        <div className="container-page">
          <div className="mx-auto max-w-xl">
            <h2 className="heading-section mb-4 text-center text-foreground">
              Submit Your Application
            </h2>
            <p className="text-body mb-8 text-center">
              Interested in joining Vedarth? Send us your resume and we'll get back to you.
            </p>

            {isSubmitted ? (
              <div className="rounded-2xl border border-border bg-background p-8 text-center md:p-10">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-semibold text-foreground">
                  Application Submitted!
                </h3>
                <p className="text-muted-foreground">
                  Thank you for your interest in joining Vedarth. We've received your application
                  and will review it carefully. Expect to hear from us soon.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ fullName: "", email: "", roleApplyingFor: "" });
                    setResumeFile(null);
                  }}
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl border border-border bg-background p-6 md:p-8"
              >
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Role Applying For */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role Applying For</Label>
                  <Select
                    value={formData.roleApplyingFor}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, roleApplyingFor: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {openRoles.map((role) => (
                        <SelectItem key={role.id} value={role.title}>
                          {role.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <Label htmlFor="resume">Resume (PDF or DOC)</Label>
                  <div className="relative">
                    <Input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/30 px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-muted/50"
                    >
                      <Upload className="h-5 w-5" />
                      {resumeFile ? (
                        <span className="font-medium text-foreground">{resumeFile.name}</span>
                      ) : (
                        <span>Click to upload your resume</span>
                      )}
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">Max file size: 10MB</p>
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
