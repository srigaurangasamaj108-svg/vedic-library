"use client";

import { useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

import { CorpusTree } from "@/components/CorpusTree";
import { ScriptToggle } from "@/features/scripture/mode/ScriptToggle";
import { TranslationToggle } from "@/features/scripture/mode/TranslationToggle";
import { StudyModeToggle } from "@/features/scripture/mode/StudyModeToggle";
import { CorpusToggle } from "@/components/CorpusToggle";

import { Separator } from "@/components/ui/separator";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [showCorpus, setShowCorpus] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-[#e8e2d3]">

      {/* ================= HEADER ================= */}
      <header className="px-8 pt-8 pb-6 border-b border-black/10 bg-[#e6dfcf] shadow-sm">

        <div className="flex flex-col gap-4">

          {/* Title */}
	<h1 className="text-3xl font-serif font-bold tracking-tight text-[#2b2218]">
            Vedic Library
          </h1>

          <Separator />

          {/* Control Panel */}
                <div className="flex flex-wrap items-center gap-3 
                bg-[#f4efe3] 
                border border-black/10 
                px-4 py-3 
                rounded-lg 
                shadow-md">

            <ScriptToggle />
            <TranslationToggle />
            <StudyModeToggle />
            <CorpusToggle onToggle={setShowCorpus} />

          </div>

        </div>
      </header>

      {/* ================= BODY ================= */}
      <div className="flex-1 overflow-hidden">

        <ResizablePanelGroup direction="horizontal">

          {showCorpus && (
            <>
              <ResizablePanel defaultSize={25} minSize={15}>
		<div className="h-full overflow-y-auto border-r border-black/20 bg-[#ede6d6] shadow-inner px-4 py-6">
                  <CorpusTree />
                </div>
              </ResizablePanel>

              <ResizableHandle />
            </>
          )}

          <ResizablePanel defaultSize={showCorpus ? 75 : 100}>
            <div className="h-full overflow-y-auto px-12 py-14 bg-[#f4efe3]">
              {children}
            </div>
          </ResizablePanel>

        </ResizablePanelGroup>

      </div>
    </div>
  );
}
