"use client";

import * as React from "react";
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";

/* -----------------------------
   Panel Group
------------------------------ */

export function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof PanelGroup>) {
  return (
    <PanelGroup
      className={`flex h-full w-full ${className ?? ""}`}
      {...props}
    />
  );
}

/* -----------------------------
   Panel
------------------------------ */

export function ResizablePanel(
  props: React.ComponentProps<typeof Panel>
) {
  return <Panel {...props} />;
}

/* -----------------------------
   Visible Resize Handle
------------------------------ */

export function ResizableHandle(
  props: React.ComponentProps<typeof PanelResizeHandle>
) {
  return (
    <PanelResizeHandle
      {...props}
      className="relative w-[8px] bg-[#d2c7b0] hover:bg-[#bfb297] transition-colors cursor-col-resize"
    >
      {/* center line */}
      <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#8a7f6a]" />
    </PanelResizeHandle>
  );
}