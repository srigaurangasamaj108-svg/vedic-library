'use client'

import { useCallback, useEffect, useMemo } from 'react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
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

import { vedicCorpusTree, sampleVerse, sampleCourses, sampleGuidance, sevaDomains } from '@/data/vedic-corpus'

interface LibraryLayoutProps {
  children?: React.ReactNode
}

// Helper to find node path in tree
function findNodePath(tree: TreeNode[], targetId: string, path: TreeNode[] = []): TreeNode[] | null {
  for (const node of tree) {
    const currentPath = [...path, node]
    if (node.id === targetId) {
      return currentPath
    }
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

  // Initialize tree data
  useEffect(() => {
    setTree(vedicCorpusTree)
  }, [setTree])

  // Get breadcrumb path
  const breadcrumbPath = useMemo(() => {
    if (!currentNodeId || tree.length === 0) return []
    const path = findNodePath(tree, currentNodeId)
    return path?.map(node => ({
      id: node.id,
      name: node.name,
      sanskrit: node.sanskrit
    })) || []
  }, [currentNodeId, tree])

  // Load verse when selecting certain nodes (demo)
  useEffect(() => {
    // For demo, show sample verse when any Gita chapter is selected
    if (currentNodeId?.startsWith('bg-')) {
      setCurrentVerse(sampleVerse)
    }
  }, [currentNodeId, setCurrentVerse])

  const handleBreadcrumbNavigate = useCallback((id: string) => {
    if (id === 'root') {
      setCurrentNode(null)
    } else {
      setCurrentNode(id)
    }
  }, [setCurrentNode])

  // Mobile Layout with Sheets
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <FilterBar />
        
        {/* Mobile Breadcrumb */}
        {breadcrumbPath.length > 0 && (
          <div className="px-4 py-2 border-b border-border bg-card">
            <Breadcrumb items={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />
          </div>
        )}
        
        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <ContentEngine verse={currentVerse} className="h-full" />
        </main>

        {/* Mobile Navigation Sheet */}
        <Sheet open={leftSidebarOpen} onOpenChange={toggleLeftSidebar}>
          <SheetContent side="left" className="w-[300px] p-0 bg-sidebar">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <TreeNavigation tree={tree} className="pt-4" />
          </SheetContent>
        </Sheet>

        {/* Mobile Application Panel Sheet */}
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

        {/* Mobile Bottom Navigation */}
        <div className="border-t border-border bg-card p-2 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={toggleLeftSidebar}
          >
            <Menu className="h-4 w-4 mr-2" />
            Navigate
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={toggleRightSidebar}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Apply
          </Button>
        </div>
      </div>
    )
  }

  // Desktop Layout with Resizable Panels
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <FilterBar />
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Sidebar - Tree Navigation */}
          {leftSidebarOpen && (
            <>
              <ResizablePanel
                defaultSize={20}
                minSize={15}
                maxSize={30}
                className="bg-sidebar border-r border-border"
              >
                <TreeNavigation tree={tree} className="h-full" />
              </ResizablePanel>
              <ResizableHandle withHandle className="bg-border" />
            </>
          )}

          {/* Center - Content Engine */}
          <ResizablePanel defaultSize={rightSidebarOpen ? 55 : 75} minSize={40}>
            <div className="h-full flex flex-col bg-background">
              {/* Breadcrumb */}
              {breadcrumbPath.length > 0 && (
                <div className="px-6 py-3 border-b border-border bg-card/50">
                  <Breadcrumb items={breadcrumbPath} onNavigate={handleBreadcrumbNavigate} />
                </div>
              )}
              
              {/* Content */}
              <ContentEngine
                verse={currentVerse}
                className="flex-1"
              />
            </div>
          </ResizablePanel>

          {/* Right Sidebar - Application Panel */}
          {rightSidebarOpen && (
            <>
              <ResizableHandle withHandle className="bg-border" />
              <ResizablePanel
                defaultSize={25}
                minSize={18}
                maxSize={35}
                className="bg-sidebar border-l border-border"
              >
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
