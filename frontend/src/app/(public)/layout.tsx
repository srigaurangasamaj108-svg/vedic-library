import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
