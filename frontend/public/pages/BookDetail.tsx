import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import PDFViewer from "@/components/PDFViewer";

// Import book cover images for local assets mapping
import psychologyOfTheMindCover from "@/assets/books/psychology-of-the-mind.jpg";
import theMilkMagicCover from "@/assets/books/the-milk-magic.jpg";
import buttermilkBeverageCover from "@/assets/books/buttermilk-beverage.jpg";
import eatingSmartlyCover from "@/assets/books/eating-smartly.jpg";
import aboutCurdCover from "@/assets/books/about-curd.jpg";

// Map cover_image_path to local assets
const coverImageMap: Record<string, string> = {
  "/assets/books/psychology-of-the-mind.jpg": psychologyOfTheMindCover,
  "/assets/books/the-milk-magic.jpg": theMilkMagicCover,
  "/assets/books/buttermilk-beverage.jpg": buttermilkBeverageCover,
  "/assets/books/eating-smartly.jpg": eatingSmartlyCover,
  "/assets/books/about-curd.jpg": aboutCurdCover,
};

const BookDetail = () => {
  const { bookId } = useParams<{ bookId: string }>();

  // Fetch book from database by slug
  const { data: book, isLoading } = useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("slug", bookId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!bookId,
  });

  // Get cover image from local assets or fallback
  const getCoverImage = (): string => {
    if (book?.cover_image_path && coverImageMap[book.cover_image_path]) {
      return coverImageMap[book.cover_image_path];
    }
    return book?.cover_image_path || "/placeholder.svg";
  };

  // PDF is only available if book is published AND has a PDF uploaded
  const isPublished = book?.status === "available";
  const hasPdf = !!book?.pdf_path;
  const showPdfViewer = isPublished && hasPdf;

  // Get PDF URL if available and published
  const pdfUrl = showPdfViewer
    ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/pdfs/${book.pdf_path}`
    : null;

  const downloadUrl = showPdfViewer && book
    ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/download-book-pdf?slug=${encodeURIComponent(book.slug)}`
    : null;

  const handleDownload = () => {
    if (!downloadUrl) return;

    // Trigger a real file download (server sets Content-Disposition: attachment)
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="heading-section mb-4 text-foreground">
                Book Not Found
              </h1>
              <p className="text-body mb-8">
                The book you're looking for doesn't exist or has been removed.
              </p>
              <Button asChild>
                <Link to="/books">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Books
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
            to="/books"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Link>
        </div>
      </section>

      {/* Book Detail */}
      <section className="section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-5xl">
            {/* Book Header */}
            <div className="mb-10 grid gap-10 md:grid-cols-[300px_1fr] md:items-start">
              {/* Cover Image */}
              <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
                <img
                  src={getCoverImage()}
                  alt={book.title}
                  className="h-auto w-full object-cover"
                />
              </div>

              {/* Book Info */}
              <div className="flex flex-col">
                {/* Title */}
                <h1 className="heading-section mb-4 text-foreground">
                  {book.title}
                </h1>

                {/* Description */}
                <p className="text-body mb-6">{book.description}</p>

                {/* Status Badge / Coming Soon Message */}
                {showPdfViewer ? (
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                      <FileText className="h-4 w-4" />
                      PDF Available – Read Below
                    </div>
                    <Button onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                      <FileText className="h-7 w-7 text-muted-foreground" />
                    </div>

                    <h2 className="mb-2 font-serif text-xl font-semibold text-foreground">
                      PDF Will Be Available Soon
                    </h2>

                    <p className="mb-6 text-sm text-muted-foreground">
                      We are currently preparing this book for digital release.
                      Contact us to be notified when it becomes available.
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <Button asChild variant="default">
                        <Link to="/contact">Notify Me</Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to="/books">Browse Other Books</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PDF Viewer - Only shown when published AND has PDF */}
            {showPdfViewer && pdfUrl && (
              <div className="mt-8">
                <h2 className="mb-6 font-serif text-2xl font-semibold text-foreground">
                  Read the Book
                </h2>
                <PDFViewer url={pdfUrl} title={book.title} />
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookDetail;
