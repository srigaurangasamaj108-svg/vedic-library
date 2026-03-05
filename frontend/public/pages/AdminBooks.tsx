import { useState, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminBooksApi, adminUploadPdf, adminUploadCover, adminGenerateCover } from "@/lib/admin-api";
import { supabase } from "@/integrations/supabase/client";
import BulkBookImport from "@/components/admin/BulkBookImport";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Progress } from "@/components/ui/progress";
import { MultiSelect } from "@/components/ui/multi-select";
import { toast } from "sonner";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Upload, 
  Loader2, 
  FileText, 
  Eye, 
  EyeOff, 
  ExternalLink,
  Check,
  RefreshCw,
  ImageIcon,
  X,
  Sparkles
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Book {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  status: string;
  cover_image_path: string | null;
  pdf_path: string | null;
  created_at: string;
  updated_at: string;
  categories?: Category[];
}

interface BookCategory {
  category_id: string;
  categories: Category;
}

const AdminBooks = () => {
  const queryClient = useQueryClient();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingBookId, setUploadingBookId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [togglingBookId, setTogglingBookId] = useState<string | null>(null);
  
  // Confirmation dialog state for PDF replacement
  const [pendingUpload, setPendingUpload] = useState<{ bookId: string; file: File } | null>(null);
  const [showReplaceConfirm, setShowReplaceConfirm] = useState(false);
  
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    status: "coming-soon",
    cover_image_path: "",
    pdf_path: "",
  });
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  
  // Cover image upload state
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;
      return data as Category[];
    },
  });

  // Fetch book categories for all books
  const { data: bookCategoriesMap = {} } = useQuery({
    queryKey: ["book-categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("book_categories")
        .select("book_id, category_id, categories(id, name, slug)");
      if (error) throw error;
      // Group by book_id
      const map: Record<string, Category[]> = {};
      for (const row of data || []) {
        if (!map[row.book_id]) map[row.book_id] = [];
        if (row.categories) map[row.book_id].push(row.categories as unknown as Category);
      }
      return map;
    },
  });

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const data = await adminBooksApi.list();
      // Ensure we always have an array
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load books:", error);
      toast.error(error instanceof Error ? error.message : "Failed to load books");
      setBooks([]); // Reset to empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      description: "",
      status: "coming-soon",
      cover_image_path: "",
      pdf_path: "",
    });
    setEditingBook(null);
    setCoverPreview(null);
    setCoverFile(null);
    setSelectedCategoryIds([]);
  };

  const openEditDialog = (book: Book) => {
    setEditingBook(book);
    setFormData({
      slug: book.slug,
      title: book.title,
      description: book.description || "",
      status: book.status,
      cover_image_path: book.cover_image_path || "",
      pdf_path: book.pdf_path || "",
    });
    // Set selected categories
    const bookCats = bookCategoriesMap[book.id] || [];
    setSelectedCategoryIds(bookCats.map((c) => c.id));
    // Set preview if there's an existing cover image
    if (book.cover_image_path) {
      setCoverPreview(book.cover_image_path);
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
      
      let bookId: string;
      if (editingBook) {
        await adminBooksApi.update(editingBook.id, updatedFormData);
        bookId = editingBook.id;
        toast.success("Book updated successfully");
      } else {
        const newBook = await adminBooksApi.create(updatedFormData);
        bookId = newBook?.id;
        toast.success("Book created successfully");
      }

      // Update book categories
      if (bookId) {
        // Remove existing categories
        await supabase.from("book_categories").delete().eq("book_id", bookId);
        // Insert new categories
        if (selectedCategoryIds.length > 0) {
          const inserts = selectedCategoryIds.map((category_id) => ({
            book_id: bookId,
            category_id,
          }));
          await supabase.from("book_categories").insert(inserts);
        }
        queryClient.invalidateQueries({ queryKey: ["book-categories"] });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchBooks();
    } catch (error) {
      toast.error(editingBook ? "Failed to update book" : "Failed to create book");
    } finally {
      setIsSaving(false);
      setIsUploadingCover(false);
    }
  };
  
  const handleCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, and WebP images are allowed");
      return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast.error(`File size (${sizeMB}MB) exceeds maximum of 5MB`);
      return;
    }
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    setCoverFile(file);
    
    // Reset input so same file can be re-selected
    e.target.value = "";
  };
  
  const clearCoverImage = () => {
    setCoverPreview(null);
    setCoverFile(null);
    setFormData(prev => ({ ...prev, cover_image_path: "" }));
  };

  const handleGenerateCover = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a book title first");
      return;
    }

    setIsGeneratingCover(true);
    try {
      // Get category names for the prompt
      const categoryNames = selectedCategoryIds
        .map(id => categories.find(c => c.id === id)?.name)
        .filter(Boolean) as string[];

      const result = await adminGenerateCover(
        formData.title,
        formData.description || undefined,
        categoryNames.length > 0 ? categoryNames : undefined,
        formData.slug || undefined
      );

      if (result?.publicUrl) {
        setCoverPreview(result.publicUrl);
        setCoverFile(null); // Clear any uploaded file since we're using generated
        setFormData(prev => ({ ...prev, cover_image_path: result.publicUrl }));
        toast.success("Cover generated successfully!");
      }
    } catch (error) {
      console.error("Cover generation failed:", error);
      const message = error instanceof Error ? error.message : "Failed to generate cover";
      toast.error(message);
    } finally {
      setIsGeneratingCover(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await adminBooksApi.delete(id);
      toast.success("Book deleted successfully");
      fetchBooks();
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  const executeUpload = async (bookId: string, file: File) => {
    const book = books.find(b => b.id === bookId);
    const isReplacing = !!book?.pdf_path;

    setUploadingBookId(bookId);
    setUploadProgress(0);
    setUploadSuccess(null);

    // Simulate progress since we don't have real progress events
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const result = await adminUploadPdf(file, "books", book?.slug);
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result?.path) {
        // Update the book with the new PDF path
        await adminBooksApi.update(bookId, { pdf_path: result.path });
        setUploadSuccess(bookId);
        toast.success(isReplacing ? "PDF replaced successfully" : "PDF uploaded successfully");
        
        // Clear success state after 3 seconds
        setTimeout(() => {
          setUploadSuccess(null);
        }, 3000);
        
        fetchBooks();
      }
    } catch (error) {
      clearInterval(progressInterval);
      
      // Handle network errors gracefully
      let errorMessage = "Failed to upload PDF";
      if (error instanceof Error) {
        if (error.message.includes("fetch") || error.message.includes("network") || error.message.includes("Failed to fetch")) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage, {
        description: "The existing PDF (if any) was not affected.",
        duration: 5000,
      });
    } finally {
      setUploadingBookId(null);
      setUploadProgress(0);
    }
  };

  const handlePdfUpload = async (bookId: string, file: File) => {
    // Client-side validation
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast.error(`File size (${sizeMB}MB) exceeds maximum of 20MB`);
      return;
    }

    const book = books.find(b => b.id === bookId);
    const isReplacing = !!book?.pdf_path;

    // If replacing, show confirmation dialog
    if (isReplacing) {
      setPendingUpload({ bookId, file });
      setShowReplaceConfirm(true);
      return;
    }

    // If new upload, proceed directly
    executeUpload(bookId, file);
  };

  const confirmReplace = () => {
    if (pendingUpload) {
      executeUpload(pendingUpload.bookId, pendingUpload.file);
    }
    setShowReplaceConfirm(false);
    setPendingUpload(null);
  };

  const cancelReplace = () => {
    setShowReplaceConfirm(false);
    setPendingUpload(null);
  };

  const handleFileSelect = (bookId: string) => {
    fileInputRefs.current[bookId]?.click();
  };

  const handleFileChange = (bookId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handlePdfUpload(bookId, file);
    }
    // Reset the input so the same file can be selected again
    e.target.value = "";
  };

  const togglePublishStatus = async (book: Book) => {
    setTogglingBookId(book.id);
    const newStatus = book.status === "available" ? "coming-soon" : "available";

    try {
      await adminBooksApi.update(book.id, { status: newStatus });
      toast.success(`Book ${newStatus === "available" ? "published" : "unpublished"} successfully`);
      fetchBooks();
    } catch (error) {
      toast.error("Failed to update book status");
    } finally {
      setTogglingBookId(null);
    }
  };

  const openPreview = (slug: string) => {
    window.open(`/books/${slug}`, "_blank");
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Books</h2>
            <p className="text-muted-foreground">Manage your book collection and PDFs</p>
          </div>
          <div className="flex gap-2">
            <BulkBookImport
              categories={categories}
              existingBooks={books.map(b => ({ slug: b.slug, title: b.title }))}
              onImportComplete={fetchBooks}
            />
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Book
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
                <DialogDescription>
                  {editingBook ? "Update the book details below" : "Fill in the details for the new book"}
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
                      placeholder="my-book-title"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Visibility</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coming-soon">Coming Soon</SelectItem>
                        <SelectItem value="available">Available</SelectItem>
                      </SelectContent>
                    </Select>
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
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="flex gap-4 items-start">
                    {/* Preview area */}
                    <div className="relative w-24 h-32 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden">
                      {coverPreview ? (
                        <>
                          <img 
                            src={coverPreview} 
                            alt="Cover preview" 
                            className="w-full h-full object-cover"
                          />
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
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    
                    {/* Upload button and input */}
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
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleGenerateCover}
                        disabled={isGeneratingCover || isUploadingCover || !formData.title.trim()}
                        className="w-full"
                      >
                        {isGeneratingCover ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Cover
                          </>
                        )}
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        Upload or AI-generate. Max 5MB.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : editingBook ? (
                      "Update Book"
                    ) : (
                      "Create Book"
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Books</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No books found. Add your first book to get started.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>PDF Status</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <div className="font-medium">{book.title}</div>
                        <div className="text-sm text-muted-foreground">{book.slug}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(bookCategoriesMap[book.id] || []).length === 0 ? (
                            <span className="text-xs text-muted-foreground">—</span>
                          ) : (
                            (bookCategoriesMap[book.id] || []).map((cat) => (
                              <Badge key={cat.id} variant="outline" className="text-xs">
                                {cat.name}
                              </Badge>
                            ))
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {uploadingBookId === book.id ? (
                          <div className="space-y-2 w-32">
                            <Progress value={uploadProgress} className="h-2" />
                            <span className="text-xs text-muted-foreground">
                              Uploading... {uploadProgress}%
                            </span>
                          </div>
                        ) : uploadSuccess === book.id ? (
                          <Badge variant="default" className="gap-1 bg-green-600">
                            <Check className="h-3 w-3" />
                            Uploaded
                          </Badge>
                        ) : book.pdf_path ? (
                          <Badge variant="default" className="gap-1">
                            <FileText className="h-3 w-3" />
                            Uploaded
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <FileText className="h-3 w-3" />
                            Not Uploaded
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {book.status === "available" ? (
                          <Badge variant="default" className="gap-1">
                            <Eye className="h-3 w-3" />
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <EyeOff className="h-3 w-3" />
                            Coming Soon
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          {/* Hidden file input for each book */}
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            ref={(el) => (fileInputRefs.current[book.id] = el)}
                            onChange={(e) => handleFileChange(book.id, e)}
                          />
                          
                          {/* Upload/Replace PDF */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleFileSelect(book.id)}
                            disabled={uploadingBookId === book.id}
                            title={book.pdf_path ? "Replace PDF" : "Upload PDF"}
                          >
                            {book.pdf_path ? (
                              <RefreshCw className="h-4 w-4" />
                            ) : (
                              <Upload className="h-4 w-4" />
                            )}
                          </Button>

                          {/* Toggle Publish/Unpublish */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => togglePublishStatus(book)}
                            disabled={togglingBookId === book.id}
                            title={book.status === "published" ? "Unpublish" : "Publish"}
                          >
                            {togglingBookId === book.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : book.status === "published" ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>

                          {/* Preview */}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openPreview(book.slug)}
                            title="Preview BookDetail page"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>

                          {/* Edit */}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditDialog(book)}
                            title="Edit book"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>

                          {/* Delete */}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(book.id)}
                            title="Delete book"
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

        {/* Replace PDF Confirmation Dialog */}
        <AlertDialog open={showReplaceConfirm} onOpenChange={setShowReplaceConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Replace existing PDF?</AlertDialogTitle>
              <AlertDialogDescription>
                This book already has a PDF uploaded. Replacing it will overwrite the current file. 
                The previous PDF will no longer be accessible. Are you sure you want to continue?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={cancelReplace}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmReplace}>
                Replace PDF
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default AdminBooks;
