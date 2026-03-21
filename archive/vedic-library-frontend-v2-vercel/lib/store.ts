'use client'

import { create } from 'zustand'
import { TreeNode, Verse, Language, Filters, ContentTab, Relations } from './types'

interface AppState {
  // Navigation State
  currentNodeId: string | null
  expandedNodes: Set<string>
  selectedPath: string[]
  
  // Content State
  currentVerse: Verse | null
  activeTab: ContentTab
  activeSampradaya: string
  
  // UI State
  language: Language
  filters: Filters
  leftSidebarOpen: boolean
  rightSidebarOpen: boolean
  searchQuery: string
  
  // Data Cache
  tree: TreeNode[]
  verses: Record<string, Verse>
  relations: Record<string, Relations>
  
  // Actions
  setCurrentNode: (id: string | null) => void
  toggleNode: (id: string) => void
  setSelectedPath: (path: string[]) => void
  setCurrentVerse: (verse: Verse | null) => void
  setActiveTab: (tab: ContentTab) => void
  setActiveSampradaya: (sampradaya: string) => void
  setLanguage: (lang: Language) => void
  setFilters: (filters: Partial<Filters>) => void
  toggleLeftSidebar: () => void
  toggleRightSidebar: () => void
  setSearchQuery: (query: string) => void
  setTree: (tree: TreeNode[]) => void
  cacheVerse: (id: string, verse: Verse) => void
  cacheRelations: (id: string, relations: Relations) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  currentNodeId: null,
  expandedNodes: new Set(['vedic-corpus']),
  selectedPath: [],
  currentVerse: null,
  activeTab: 'shloka',
  activeSampradaya: 'general',
  language: 'en',
  filters: {},
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  searchQuery: '',
  tree: [],
  verses: {},
  relations: {},
  
  // Actions
  setCurrentNode: (id) => set({ currentNodeId: id }),
  
  toggleNode: (id) => set((state) => {
    const newExpanded = new Set(state.expandedNodes)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    return { expandedNodes: newExpanded }
  }),
  
  setSelectedPath: (path) => set({ selectedPath: path }),
  
  setCurrentVerse: (verse) => set({ currentVerse: verse }),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  setActiveSampradaya: (sampradaya) => set({ activeSampradaya: sampradaya }),
  
  setLanguage: (lang) => set({ language: lang }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  
  toggleLeftSidebar: () => set((state) => ({
    leftSidebarOpen: !state.leftSidebarOpen
  })),
  
  toggleRightSidebar: () => set((state) => ({
    rightSidebarOpen: !state.rightSidebarOpen
  })),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setTree: (tree) => set({ tree }),
  
  cacheVerse: (id, verse) => set((state) => ({
    verses: { ...state.verses, [id]: verse }
  })),
  
  cacheRelations: (id, relations) => set((state) => ({
    relations: { ...state.relations, [id]: relations }
  })),
}))
