'use client'

import { useState, useCallback } from 'react'
import { ChevronRight, ChevronDown, BookOpen, FileText, Scroll, Library, BookMarked, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TreeNode } from '@/lib/types'
import { useAppStore } from '@/lib/store'
import { ScrollArea } from '@/components/ui/scroll-area'

interface TreeNodeComponentProps {
  node: TreeNode
  level: number
  parentPath?: string
}

function getNodeIcon(type: TreeNode['type']) {
  switch (type) {
    case 'corpus':
      return Library
    case 'text_group':
      return BookMarked
    case 'section':
      return Scroll
    case 'work':
      return BookOpen
    case 'chapter':
      return FileText
    case 'verse':
      return Hash
    default:
      return FileText
  }
}

function TreeNodeComponent({ node, level, parentPath = '' }: TreeNodeComponentProps) {
  const { expandedNodes, toggleNode, currentNodeId, setCurrentNode } = useAppStore()
  const [isHovered, setIsHovered] = useState(false)
  
  const isExpanded = expandedNodes.has(node.id)
  const isSelected = currentNodeId === node.id
  const hasChildren = node.children && node.children.length > 0
  const isVerse = node.type === 'verse'
  const Icon = getNodeIcon(node.type)
  
  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasChildren) {
      toggleNode(node.id)
    }
  }, [hasChildren, node.id, toggleNode])
  
  const handleSelect = useCallback(() => {
    setCurrentNode(node.id)
  }, [node.id, setCurrentNode])

  // For verses, display them in a more compact grid-like format
  if (isVerse) {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center min-w-[32px] h-7 px-2 text-sm rounded transition-colors",
          "hover:bg-accent/60",
          isSelected 
            ? "bg-primary text-primary-foreground font-medium" 
            : "text-foreground/80 hover:text-foreground"
        )}
        onClick={handleSelect}
      >
        {node.name}
      </button>
    )
  }

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center gap-1.5 py-1.5 px-2 rounded-lg cursor-pointer transition-all duration-150",
          "hover:bg-accent/60",
          isSelected && "bg-accent text-foreground font-medium",
          !isSelected && "text-foreground/80"
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={handleSelect}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Expand/Collapse Arrow */}
        <button
          onClick={handleToggle}
          className={cn(
            "w-4 h-4 flex items-center justify-center shrink-0 transition-transform duration-150",
            !hasChildren && "invisible"
          )}
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </button>
        
        {/* Node Icon */}
        <Icon className={cn(
          "w-4 h-4 shrink-0",
          isSelected ? "text-primary" : "text-muted-foreground"
        )} />
        
        {/* Node Name */}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm truncate">{node.name}</span>
          {node.sanskrit && isHovered && (
            <span className="text-xs text-muted-foreground font-serif truncate">
              {node.sanskrit}
            </span>
          )}
        </div>
        
        {/* Verse Count Badge */}
        {node.verseCount && !hasChildren && (
          <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded shrink-0">
            {node.verseCount.toLocaleString()}
          </span>
        )}
      </div>
      
      {/* Children - Special handling for verses (grid layout) */}
      {hasChildren && isExpanded && (
        <div className="animate-in slide-in-from-top-1 duration-150">
          {/* Check if children are verses */}
          {node.children![0]?.type === 'verse' ? (
            <div 
              className="flex flex-wrap gap-1 py-2 px-2"
              style={{ paddingLeft: `${(level + 1) * 12 + 24}px` }}
            >
              {node.children!.map((child) => (
                <TreeNodeComponent
                  key={child.id}
                  node={child}
                  level={level + 1}
                  parentPath={`${parentPath}/${node.name}`}
                />
              ))}
            </div>
          ) : (
            node.children!.map((child) => (
              <TreeNodeComponent
                key={child.id}
                node={child}
                level={level + 1}
                parentPath={`${parentPath}/${node.name}`}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}

interface TreeNavigationProps {
  tree: TreeNode[]
  className?: string
}

export function TreeNavigation({ tree, className }: TreeNavigationProps) {
  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="p-3">
        <div className="mb-3 px-2">
          <h2 className="text-sm font-semibold text-foreground">Vedic Corpus</h2>
          <p className="text-xs text-muted-foreground">Explore the knowledge tree</p>
        </div>
        <div className="space-y-0.5">
          {tree.map((node) => (
            <TreeNodeComponent key={node.id} node={node} level={0} />
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
