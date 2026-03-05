import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { useBooks, getCoverImage } from "@/hooks/useBooks";
import FeaturedBookCard from "@/components/books/FeaturedBookCard";
import CompactBookCard from "@/components/books/CompactBookCard";
import BookSearch from "@/components/books/BookSearch";
import CategoryTabs from "@/components/books/CategoryTabs";
import { Button } from "@/components/ui/button";

const BOOKS_PER_PAGE = 30;

const Books = () => {
  const {
    loading,
    featuredBooks,
    libraryBooks,
    availableCategories,
    searchQuery,
    selectedCategory,
    handleSearch,
    handleCategoryChange,
  } = useBooks();

  const [featuredCollapsed, setFeaturedCollapsed] = useState(false);
  const [visibleCount, setVisibleCount] = useState(BOOKS_PER_PAGE);

  // Auto-collapse featured section on scroll (mobile only)
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768 && window.scrollY > 200) {
        setFeaturedCollapsed(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(BOOKS_PER_PAGE);
  }, [searchQuery, selectedCategory]);

  const visibleBooks = libraryBooks.slice(0, visibleCount);
  const hasMore = visibleCount < libraryBooks.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + BOOKS_PER_PAGE);
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
            <h1 className="heading-display mb-6 text-foreground">Sacred Books</h1>
            <p className="text-body">
              Explore our curated collection of books rooted in Vedic wisdom,
              covering health, psychology, and traditional knowledge for modern
              living.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books Section - Collapsible */}
      {featuredBooks.length > 0 && (
        <section className="border-b border-border">
          <div className="container-page py-4 md:py-8">
            <button
              onClick={() => setFeaturedCollapsed(!featuredCollapsed)}
              className="mb-4 flex w-full items-center justify-between md:pointer-events-none"
            >
              <h2 className="font-serif text-lg md:text-2xl font-semibold text-foreground">
                Featured Books
              </h2>
              <span className="md:hidden text-muted-foreground">
                {featuredCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
              </span>
            </button>
            
            <div className={`grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-4 transition-all duration-300 ${
              featuredCollapsed ? "hidden md:grid" : "grid"
            }`}>
              {featuredBooks.map((book) => (
                <FeaturedBookCard
                  key={book.id}
                  slug={book.slug}
                  title={book.title}
                  description={book.description}
                  coverImage={getCoverImage(book)}
                  status={book.status}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Library Section */}
      <section className="section-padding">
        <div className="container-page">
          {/* Search and Filter Controls */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <BookSearch value={searchQuery} onChange={handleSearch} />
            <CategoryTabs
              categories={availableCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Books Count */}
          <p className="mb-4 text-sm text-muted-foreground">
            {libraryBooks.length} {libraryBooks.length === 1 ? "book" : "books"}
            {selectedCategory || searchQuery ? " found" : " in library"}
          </p>

          {/* Books Grid - Optimized for large collections */}
          {libraryBooks.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory
                  ? "No books found matching your criteria."
                  : "No books available yet."}
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-x-2 gap-y-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {visibleBooks.map((book) => (
                  <CompactBookCard
                    key={book.id}
                    slug={book.slug}
                    title={book.title}
                    coverImage={getCoverImage(book)}
                    status={book.status}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" onClick={loadMore}>
                    Load More ({libraryBooks.length - visibleCount} remaining)
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Books;
