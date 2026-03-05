import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Plus, 
  Loader2, 
  UserCheck, 
  UserX, 
  Shield,
  AlertCircle,
  KeyRound
} from "lucide-react";
import { z } from "zod";

interface AdminUser {
  id: string;
  user_id: string;
  email: string | null;
  is_active: boolean;
  created_at: string;
}

const emailSchema = z.string().email("Please enter a valid email address");

const AdminManagement = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [toggleAdmin, setToggleAdmin] = useState<AdminUser | null>(null);
  const [isToggling, setIsToggling] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [resettingPasswordFor, setResettingPasswordFor] = useState<string | null>(null);

  useEffect(() => {
    // Get current user ID
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setCurrentUserId(session.user.id);
      }
    });
    
    fetchAdmins();
  }, []);

  const getAuthHeaders = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error("Not authenticated");
    return {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    };
  };

  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const headers = await getAuthHeaders();
      const response = await supabase.functions.invoke("admin-users", {
        method: "GET",
        headers,
      });

      if (response.error) throw response.error;
      setAdmins(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch admins:", error);
      toast.error("Failed to load admin users");
      setAdmins([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    const validation = emailSchema.safeParse(email.trim());
    if (!validation.success) {
      setEmailError(validation.error.errors[0].message);
      return;
    }

    setIsAdding(true);
    try {
      const headers = await getAuthHeaders();
      const response = await supabase.functions.invoke("admin-users", {
        method: "POST",
        headers,
        body: { email: email.trim().toLowerCase() },
      });

      if (response.error) throw response.error;
      if (response.data?.error) throw new Error(response.data.message || response.data.error);

      toast.success(response.data.message || "Admin added successfully");
      setEmail("");
      setIsDialogOpen(false);
      fetchAdmins();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to add admin";
      toast.error(message);
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleAdmin = async () => {
    if (!toggleAdmin) return;

    setIsToggling(true);
    try {
      const headers = await getAuthHeaders();
      const response = await supabase.functions.invoke(`admin-users?id=${toggleAdmin.id}`, {
        method: "PUT",
        headers,
        body: { is_active: !toggleAdmin.is_active },
      });

      if (response.error) throw response.error;
      if (response.data?.error) throw new Error(response.data.message || response.data.error);

      toast.success(response.data.message || "Admin status updated");
      setToggleAdmin(null);
      fetchAdmins();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update admin";
      toast.error(message);
    } finally {
      setIsToggling(false);
    }
  };

  const handleResetPassword = async (adminEmail: string) => {
    if (!adminEmail) {
      toast.error("No email address available for this admin");
      return;
    }

    setResettingPasswordFor(adminEmail);
    try {
      const redirectUrl = `${window.location.origin}/admin`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(adminEmail, {
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      toast.success(`Password reset email sent to ${adminEmail}`, {
        description: "They will receive an email with instructions to reset their password.",
        duration: 5000,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send reset email";
      toast.error(message);
    } finally {
      setResettingPasswordFor(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Admin Management</h2>
            <p className="text-muted-foreground">Manage admin access to the dashboard</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admin</DialogTitle>
                <DialogDescription>
                  Enter the email address of the user you want to grant admin access.
                  If they don't have an account, one will be created for them.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Address</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError(null);
                    }}
                    disabled={isAdding}
                  />
                  {emailError && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {emailError}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isAdding || !email.trim()}>
                    {isAdding ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      "Add Admin"
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
              <Shield className="h-5 w-5" />
              Admin Users
            </CardTitle>
            <CardDescription>
              Users with admin access can manage books, courses, and other content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : admins.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No admin users found.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{admin.email || "Unknown"}</span>
                          {admin.user_id === currentUserId && (
                            <Badge variant="outline" className="text-xs">You</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {admin.is_active ? (
                          <Badge variant="default" className="gap-1">
                            <UserCheck className="h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <UserX className="h-3 w-3" />
                            Disabled
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(admin.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* Reset Password */}
                          {admin.email && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleResetPassword(admin.email!)}
                              disabled={resettingPasswordFor === admin.email}
                              title="Send password reset email"
                            >
                              {resettingPasswordFor === admin.email ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <KeyRound className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                          
                          {/* Enable/Disable */}
                          {admin.user_id !== currentUserId && (
                            <Button
                              size="sm"
                              variant={admin.is_active ? "outline" : "default"}
                              onClick={() => setToggleAdmin(admin)}
                            >
                              {admin.is_active ? (
                                <>
                                  <UserX className="mr-1 h-4 w-4" />
                                  Disable
                                </>
                              ) : (
                                <>
                                  <UserCheck className="mr-1 h-4 w-4" />
                                  Enable
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Confirm Toggle Dialog */}
        <AlertDialog open={!!toggleAdmin} onOpenChange={() => setToggleAdmin(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {toggleAdmin?.is_active ? "Disable Admin Access?" : "Enable Admin Access?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {toggleAdmin?.is_active
                  ? `This will revoke admin access for ${toggleAdmin?.email}. They will no longer be able to access the admin dashboard.`
                  : `This will restore admin access for ${toggleAdmin?.email}. They will be able to access all admin features.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isToggling}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleToggleAdmin} disabled={isToggling}>
                {isToggling ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : toggleAdmin?.is_active ? (
                  "Disable Admin"
                ) : (
                  "Enable Admin"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminManagement;