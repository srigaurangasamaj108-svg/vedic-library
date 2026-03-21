'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, BookOpen } from 'lucide-react'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/lib/store'
import { TreeNode } from '@/lib/types'

import { Header } from './header'
import { FilterBar } from './filter-bar'
import { TreeNavigation } from './tree-navigation'
import { ContentEngine } from './content-engine'
import { ApplicationPanel } from './application-panel'
import { Breadcrumb } from './breadcrumb'

import { vedicCorpusTree, sampleCourses, sampleGuidance, sevaDomains } from '@/data/vedic-corpus'
import { getVerse } from '@/lib/data-loader'

interface LibraryLayoutProps {
  children?: React.ReactNode
}

// Helper to find node path
function findNodePath(tree: TreeNode[], targetId: string, path: TreeNode[] = []): TreeNode[] | null {
  for (const node of tree) {
    const currentPath = [...path, node]
    if (node.id === targetId) return currentPath
    if (node.children) {
      const found = findNodePath(node.children, targetId, currentPath)
      if (found) return found
    }
  }
  return null
}

export function LibraryLayout({ children }: LibraryLayoutProps) {
  const isMobile = useIsMobile()
  const {
    leftSidebarOpen,
    rightSidebarOpen,
    toggleLeftSidebar,
    toggleRightSidebar,
    currentNodeId,
    setCurrentNode,
    currentVerse,
    setCurrentVerse,
    setTree,
    tree
  } = useAppStore()

  // Initialize tree
  useEffect(() => {
    setTree(vedicCorpusTree)
  }, [setTree])

  // Breadcrumb
  const breadcrumbPath = useMemo(() => {
    if (!currentNodeId || tree.length === 0) return []
    const path = findNodePath(tree, currentNodeId)
    return path?.map(node => ({
      id: node.id,
      name: node.name,
      sanskrit: node.sanskrit
    })) || []
  }, [currentNodeId, tree])

  // 🔥 FIXED DATA LOADER (supports chapter + verse)
  useEffect(() => {
    async function loadVerse() {
      if (!currentNodeId) return

      console.log("Selected node:", currentNodeId)

      // ✅ Case 1: Exact verse (bg-1-1)
      if (currentNodeId.startsWith('bg-') && currentNodeId.split('-').length === 3) {
        const parts = currentNodeId.split('-')
        const chapter = parseInt(parts[1])
        const verse = parseInt(parts[2])

        if (!chapter || !verse) return

        const realVerse = await getVerse(chapter, verse)
        if (realVerse) setCurrentVerse(realVerse)
      }

      // ✅ Case 2: Chapter click (fallback)
      else {
        const match = currentNodeId.match(/\d+/)

        if (match) {
          const chapter = parseInt(match[0])

          console.log("Loading chapter:", chapter)

          const realVerse = await getVerse(chapter, 1)
          if (realVerse) setCurrentVerse(realVerse)
        }
      }
    }

    loadVerse()
  }, [currentNodeId, setCurrentVerse])

  const handleBreadcrumbNavigate = useCallback((id: string) => {
    if (id === 'root') setCurrentNode(null)
    else setCurrentNode(id)
  }, [setCurrentNode])

  // ---------------- MOBILE ----------------
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <FilterBar />

        {breadcrumbPath.length > 0 && (
          <div className="px-4 py-2 border-b border-border bg-card">
            <Breadcrumb items={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />
          </div>
        )}

        <main className="flex-1 overflow-hidden">
          <ContentEngine verse={currentVerse} className="h-full" />
        </main>

        <Sheet open={leftSidebarOpen} onOpenChange={toggleLeftSidebar}>
          <SheetContent side="left" className="w-[300px] p-0 bg-sidebar">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <TreeNavigation tree={tree} className="pt-4" />
          </SheetContent>
        </Sheet>

        <Sheet open={rightSidebarOpen} onOpenChange={toggleRightSidebar}>
          <SheetContent side="right" className="w-[300px] p-0 bg-sidebar">
            <SheetTitle className="sr-only">Application Panel</SheetTitle>
            <ApplicationPanel
              relatedVerses={currentVerse?.relations?.related_verses}
              courses={sampleCourses}
              guidance={sampleGuidance}
              sevaDomains={sevaDomains}
              className="pt-4"
            />
          </SheetContent>
        </Sheet>

        <div className="border-t border-border bg-card p-2 flex gap-2">
          <Button variant="outline" className="flex-1" onClick={toggleLeftSidebar}>
            <Menu className="h-4 w-4 mr-2" />
            Navigate
          </Button>
          <Button variant="outline" className="flex-1" onClick={toggleRightSidebar}>
            <BookOpen className="h-4 w-4 mr-2" />
            Apply
          </Button>
        </div>
      </div>
    )
  }

  // ---------------- DESKTOP ----------------
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <FilterBar />

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">

          {leftSidebarOpen && (
            <>
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-sidebar border-r border-border">
                <TreeNavigation tree={tree} className="h-full" />
              </ResizablePanel>
              <ResizableHandle withHandle className="bg-border" />
            </>
          )}

          <ResizablePanel defaultSize={rightSidebarOpen ? 55 : 75} minSize={40}>
            <div className="h-full flex flex-col bg-background">

              {breadcrumbPath.length > 0 && (
                <div className="px-6 py-3 border-b border-border bg-card/50">
                  <Breadcrumb items={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />
                </div>
              )}

              <ContentEngine verse={currentVerse} className="flex-1" />
            </div>
          </ResizablePanel>

          {rightSidebarOpen && (
            <>
              <ResizableHandle withHandle className="bg-border" />
              <ResizablePanel defaultSize={25} minSize={18} maxSize={35} className="bg-sidebar border-l border-border">
                <ApplicationPanel
                  relatedVerses={currentVerse?.relations?.related_verses}
                  courses={sampleCourses}
                  guidance={sampleGuidance}
                  sevaDomains={sevaDomains}
                  className="h-full"
                />
              </ResizablePanel>
            </>
          )}

        </ResizablePanelGroup>
      </div>
    </div>
  )
}
