"use client";

import { useState } from "react";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { CorpusTree } from "@/components/CorpusTree";
import { ScriptToggle } from "@/features/scripture/mode/ScriptToggle";
import { TranslationToggle } from "@/features/scripture/mode/TranslationToggle";
import { StudyModeToggle } from "@/features/scripture/mode/StudyModeToggle";
import { CorpusToggle } from "@/components/CorpusToggle";

export function LayoutShell({ children }: { children: React.ReactNode }) {

  const [showCorpus, setShowCorpus] = useState(true);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#e8e2d3]">

      {/* ---------- HEADER ---------- */}
      <div className="px-6 py-4 border-b border-black/10 bg-[#e3dccb]">

        <div className="flex flex-col gap-3">

          <h1 className="text-xl font-semibold">
            Vedic Library
          </h1>

          <div className="flex flex-wrap items-center gap-4">

            <ScriptToggle />
            <TranslationToggle />
            <StudyModeToggle />
            <CorpusToggle onToggle={setShowCorpus} />

          </div>

        </div>

      </div>

      {/* ---------- BODY ---------- */}
      <div className="flex-1 overflow-hidden">

        <ResizablePanelGroup direction="horizontal">

          {showCorpus && (
            <>
              <ResizablePanel defaultSize={25} minSize={15}>
                <div className="h-full overflow-y-auto border-r border-black/20 bg-[#ede6d6]">
                  <CorpusTree />
                </div>
              </ResizablePanel>

              <ResizableHandle />
            </>
          )}

          <ResizablePanel defaultSize={showCorpus ? 75 : 100}>
            <div className="h-full overflow-y-auto px-10 py-12 bg-[#f4efe3]">
              {children}
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>

      </div>

    </div>
  );
}