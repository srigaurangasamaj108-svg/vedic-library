import "./globals.css";

export const metadata = {
  title: "Vedic Library",
  description: "A digital library of Vedic literature",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f6f1e7] text-gray-900 font-serif">
        <header className="border-b border-gray-300 bg-[#ede4d1]">
          <div className="max-w-[1100px] mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-lg font-semibold">
              Vedic Library
            </div>

            <nav className="space-x-6 text-sm">
              <a href="/bg" className="hover:underline">
                Bhagavad-gītā
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
