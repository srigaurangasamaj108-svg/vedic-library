import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { 
  FileText, 
  User, 
  Mail, 
  Briefcase, 
  Calendar,
  Brain,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Loader2,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: string;
  full_name: string;
  email: string;
  role_applying_for: string;
  resume_path: string;
  created_at: string;
  ai_score: number | null;
  ai_skill_match: number | null;
  ai_summary: string | null;
  ai_strengths: string[] | null;
  ai_weaknesses: string[] | null;
  ai_evaluated_at: string | null;
}

const AdminApplications = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      // Use service role via edge function for admin access
      const { data, error } = await supabase.functions.invoke("admin-get-applications");
      
      if (error) throw error;
      setApplications(data?.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const triggerEvaluation = async (app: Application) => {
    setEvaluatingId(app.id);
    try {
      // For demo purposes, we'll simulate resume text extraction
      // In production, you'd parse the actual PDF/DOC file
      const resumeText = `
        Candidate: ${app.full_name}
        Email: ${app.email}
        Applied for: ${app.role_applying_for}
        Resume file: ${app.resume_path}
        
        Note: This is a placeholder. In production, the actual resume content would be extracted from the uploaded file.
      `;

      const { data, error } = await supabase.functions.invoke("evaluate-resume", {
        body: {
          applicationId: app.id,
          resumeText,
          roleApplyingFor: app.role_applying_for,
        },
      });

      if (error) throw error;

      toast({
        title: "Evaluation Complete",
        description: `Resume for ${app.full_name} has been evaluated.`,
      });

      // Refresh applications
      fetchApplications();
    } catch (error: any) {
      console.error("Evaluation error:", error);
      toast({
        title: "Evaluation Failed",
        description: error.message || "Failed to evaluate resume",
        variant: "destructive",
      });
    } finally {
      setEvaluatingId(null);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <Layout>
      {/* Header */}
      <section className="section-padding bg-card">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="heading-section text-foreground">
                Admin: Job Applications
              </h1>
              <p className="mt-2 text-muted-foreground">
                Review applications and AI-powered resume evaluations
              </p>
            </div>
            <Button onClick={fetchApplications} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </section>

      {/* Applications List */}
      <section className="section-padding">
        <div className="container-page">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : applications.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                No Applications Yet
              </h3>
              <p className="mt-2 text-muted-foreground">
                Applications submitted through the Careers page will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="rounded-2xl border border-border bg-card p-6 md:p-8"
                >
                  {/* Applicant Info */}
                  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-serif text-xl font-semibold text-foreground">
                            {app.full_name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3.5 w-3.5" />
                              {app.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3.5 w-3.5" />
                              {app.role_applying_for}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(app.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Evaluate Button */}
                    {!app.ai_evaluated_at && (
                      <Button
                        onClick={() => triggerEvaluation(app)}
                        disabled={evaluatingId === app.id}
                        className="gap-2"
                      >
                        {evaluatingId === app.id ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Evaluating...
                          </>
                        ) : (
                          <>
                            <Brain className="h-4 w-4" />
                            Run AI Evaluation
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  {/* AI Evaluation Results */}
                  {app.ai_evaluated_at && (
                    <div className="border-t border-border pt-6">
                      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Brain className="h-4 w-4 text-primary" />
                        <span>AI Evaluation</span>
                        <span className="text-xs">
                          ({new Date(app.ai_evaluated_at).toLocaleString()})
                        </span>
                      </div>

                      {/* Scores */}
                      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Resume Score */}
                        <div className={`rounded-xl p-4 ${getScoreBg(app.ai_score || 0)}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">Resume Score</span>
                            <TrendingUp className={`h-4 w-4 ${getScoreColor(app.ai_score || 0)}`} />
                          </div>
                          <p className={`mt-1 text-3xl font-bold ${getScoreColor(app.ai_score || 0)}`}>
                            {app.ai_score}/100
                          </p>
                        </div>

                        {/* Skill Match */}
                        <div className={`rounded-xl p-4 ${getScoreBg(app.ai_skill_match || 0)}`}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-foreground">Skill Match</span>
                            <Briefcase className={`h-4 w-4 ${getScoreColor(app.ai_skill_match || 0)}`} />
                          </div>
                          <p className={`mt-1 text-3xl font-bold ${getScoreColor(app.ai_skill_match || 0)}`}>
                            {app.ai_skill_match}%
                          </p>
                        </div>

                        {/* Re-evaluate */}
                        <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => triggerEvaluation(app)}
                            disabled={evaluatingId === app.id}
                            className="gap-2"
                          >
                            <RefreshCw className={`h-4 w-4 ${evaluatingId === app.id ? 'animate-spin' : ''}`} />
                            Re-evaluate
                          </Button>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="mb-6 rounded-xl bg-muted/50 p-4">
                        <h4 className="mb-2 font-medium text-foreground">AI Summary</h4>
                        <p className="text-sm text-muted-foreground">{app.ai_summary}</p>
                      </div>

                      {/* Strengths & Weaknesses */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        {/* Strengths */}
                        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                          <h4 className="mb-3 flex items-center gap-2 font-medium text-green-800">
                            <CheckCircle className="h-4 w-4" />
                            Strengths
                          </h4>
                          <ul className="space-y-2">
                            {app.ai_strengths?.map((strength, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Weaknesses */}
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                          <h4 className="mb-3 flex items-center gap-2 font-medium text-amber-800">
                            <AlertCircle className="h-4 w-4" />
                            Areas for Growth
                          </h4>
                          <ul className="space-y-2">
                            {app.ai_weaknesses?.map((weakness, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AdminApplications;
