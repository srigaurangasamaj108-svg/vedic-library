import { LayoutShell } from "@/components/layout/LayoutShell";
import { ReadingModeProvider } from "@/context/ReadingModeContext";

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReadingModeProvider>
      <LayoutShell>
        {children}
      </LayoutShell>
    </ReadingModeProvider>
  );
}