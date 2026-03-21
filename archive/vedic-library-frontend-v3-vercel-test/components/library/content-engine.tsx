'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Volume2, ChevronDown, ThumbsUp, Copy, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Verse } from '@/lib/types'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface ContentEngineProps {
  verse: Verse | null
  className?: string
}

type ScriptType = 'devanagari' | 'iast' | 'telugu'
type MeaningLanguage = 'sa' | 'hi' | 'en' | 'te'

function VerseHeader({ verse }: { verse: Verse }) {
  return (
    <div className="border-b border-border pb-4 mb-4">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-3">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1">
          <ChevronLeft className="w-4 h-4" />
          Prev
        </Button>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-foreground">
            Bhagavad Gita - {verse.chapter}.{verse.verse}
          </h1>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1">
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Summary Theme */}
      <div className="text-center">
        <p className="text-sm italic text-muted-foreground">
          Focus on action, not the fruits of action
        </p>
      </div>
    </div>
  )
}

function VerseSection({ verse }: { verse: Verse }) {
  const [isOpen, setIsOpen] = useState(true)
  const [script, setScript] = useState<ScriptType>('devanagari')
  
  const getVerseText = () => {
    switch (script) {
      case 'devanagari':
        return verse.sanskrit
      case 'iast':
        return verse.transliteration
      case 'telugu':
        return verse.sanskrit // Placeholder - would need Telugu text
      default:
        return verse.sanskrit
    }
  }
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-border rounded-lg overflow-hidden">
      <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-3">
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
          <span className="font-medium">Verse</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
        <span className="text-sm text-muted-foreground font-serif">Anushtup Chhandas</span>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        {/* Script Selection Tabs */}
        <div className="flex border-b border-border" style={{ backgroundColor: 'var(--knowledge-blue)' }}>
          {(['devanagari', 'iast', 'telugu'] as ScriptType[]).map((s) => (
            <button
              key={s}
              onClick={() => setScript(s)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                script === s 
                  ? "bg-white/20 text-white" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {s === 'devanagari' ? 'Devanagari' : s === 'iast' ? 'Roman' : 'Telugu'}
            </button>
          ))}
        </div>
        
        {/* Verse Text */}
        <div className="p-6 text-center bg-card">
          <p className={cn(
            "leading-relaxed whitespace-pre-line",
            script === 'devanagari' ? "font-serif text-xl" : "text-lg italic"
          )}>
            {getVerseText()}
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function MeaningSection({ verse }: { verse: Verse }) {
  const [isOpen, setIsOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<'segmentation' | 'word-meaning' | 'prose-order' | 'prose-meaning'>('word-meaning')
  const [language, setLanguage] = useState<MeaningLanguage>('en')
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-border rounded-lg overflow-hidden">
      <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-3">
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
          <span className="font-medium">Word Analysis</span>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        {/* Analysis Type Tabs */}
        <div className="flex border-b border-border bg-secondary/20">
          {[
            { key: 'segmentation', label: 'Word Segmentation' },
            { key: 'word-meaning', label: 'Word-to-word Meaning' },
            { key: 'prose-order', label: 'Prose Order' },
            { key: 'prose-meaning', label: 'Prose Meaning' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={cn(
                "px-4 py-2.5 text-sm transition-colors border-b-2",
                activeTab === tab.key 
                  ? "border-primary text-primary font-medium" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Language Selection */}
        <div className="flex border-b border-border" style={{ backgroundColor: 'var(--knowledge-blue)' }}>
          {(['sa', 'hi', 'en', 'te'] as MeaningLanguage[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                language === lang 
                  ? "bg-white/20 text-white" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {lang === 'sa' ? 'Sanskrit' : lang === 'hi' ? 'Hindi' : lang === 'en' ? 'English' : 'Telugu'}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="p-4 bg-card">
          {activeTab === 'word-meaning' && (
            <div className="space-y-2">
              {verse.synonyms.map((syn, idx) => (
                <div key={idx} className="flex items-baseline gap-2 py-1.5 border-b border-border/50 last:border-0">
                  <span className="font-serif text-primary font-medium min-w-[120px]">{syn.word}</span>
                  <span className="text-muted-foreground">—</span>
                  <span className="text-foreground/90">{syn.meaning}</span>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'segmentation' && (
            <p className="text-muted-foreground italic">
              karmani + eva + adhikarah + te + ma + phalesu + kadacana + ma + karma-phala-hetuh + bhuh + ma + te + sangah + astu + akarmani
            </p>
          )}
          {activeTab === 'prose-order' && (
            <p className="text-foreground/90">
              te karmani eva adhikarah, phalesu kadacana ma. karma-phala-hetuh ma bhuh, te akarmani sangah ma astu.
            </p>
          )}
          {activeTab === 'prose-meaning' && (
            <div className="flex items-start justify-between gap-4">
              <p className="text-foreground/90 leading-relaxed">
                {language === 'en' && "Your right is to action alone, never to the fruits at any time. Do not be the cause of the fruit of action, nor let there be attachment in you to inaction."}
                {language === 'hi' && "तुम्हारा अधिकार केवल कर्म में है, फल में कभी नहीं। कर्मफल का कारण मत बनो, और न ही अकर्म में आसक्त रहो।"}
                {language === 'sa' && verse.translations.sa || "कर्मण्येव अधिकारः ते, न फलेषु कदाचन। मा कर्मफलहेतुः भूः, मा ते सङ्गोऽस्तु अकर्मणि।"}
                {language === 'te' && "మీ హక్కు కర్మలో మాత్రమే, ఫలంలో ఎప్పటికీ కాదు."}
              </p>
              <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8">
                <ThumbsUp className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function TranslationSection({ verse }: { verse: Verse }) {
  const [isOpen, setIsOpen] = useState(true)
  const { language } = useAppStore()
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-border rounded-lg overflow-hidden">
      <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-3">
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
          <span className="font-medium">Translation</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="p-4 bg-card">
          <p className="text-foreground leading-relaxed">
            {verse.translations[language] || verse.translations.en}
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function CommentarySection({ verse }: { verse: Verse }) {
  const [isOpen, setIsOpen] = useState(true)
  const [script, setScript] = useState<ScriptType>('devanagari')
  const { activeSampradaya, setActiveSampradaya, language } = useAppStore()
  
  const sampradayaLabels: Record<string, string> = {
    general: 'General',
    gaudiya: 'Gaudiya',
    advaita: 'Advaita',
    madhva: 'Madhva',
    sri_vaishnava: 'Sri Vaishnava'
  }
  
  // Sub-commentaries for each sampradaya (sample data)
  const subCommentaries: Record<string, string[]> = {
    gaudiya: ['Bhaktivedanta Purports'],
    advaita: ['Shankara Bhashya', 'Anandagiri Tika'],
    madhva: ['Madhva Bhashya', 'Jayatirtha Tika'],
    sri_vaishnava: ['Ramanuja Bhashya', 'Vedanta Desika Tika'],
    general: ['Standard Commentary']
  }
  
  const currentCommentary = verse.commentaries.find(c => c.sampradaya === activeSampradaya) || verse.commentaries[0]
  const [activeSubCommentary, setActiveSubCommentary] = useState(subCommentaries[activeSampradaya]?.[0] || '')
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-border rounded-lg overflow-hidden">
      <CollapsibleTrigger className="w-full flex items-center justify-between p-3 bg-secondary/30 hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-3">
          <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
          <span className="font-medium">Commentary</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        {/* Sampradaya Tabs */}
        <div className="flex flex-wrap border-b border-border" style={{ backgroundColor: 'var(--knowledge-blue)' }}>
          {verse.commentaries.map((commentary) => (
            <button
              key={commentary.sampradaya}
              onClick={() => {
                setActiveSampradaya(commentary.sampradaya)
                setActiveSubCommentary(subCommentaries[commentary.sampradaya]?.[0] || '')
              }}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                activeSampradaya === commentary.sampradaya 
                  ? "bg-white/20 text-white" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {sampradayaLabels[commentary.sampradaya]}
            </button>
          ))}
        </div>
        
        {/* Sub-commentary Tabs */}
        {subCommentaries[activeSampradaya] && subCommentaries[activeSampradaya].length > 0 && (
          <div className="flex border-b border-border bg-secondary/20">
            {subCommentaries[activeSampradaya].map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubCommentary(sub)}
                className={cn(
                  "px-4 py-2 text-sm transition-colors",
                  activeSubCommentary === sub 
                    ? "bg-accent text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
        
        {/* Script Selection */}
        <div className="flex border-b border-border" style={{ backgroundColor: 'var(--dharma-green)' }}>
          {(['devanagari', 'iast', 'telugu'] as ScriptType[]).map((s) => (
            <button
              key={s}
              onClick={() => setScript(s)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors",
                script === s 
                  ? "bg-white/20 text-white" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              {s === 'devanagari' ? 'Devanagari' : s === 'iast' ? 'Roman' : 'Telugu'}
            </button>
          ))}
        </div>
        
        {/* Commentary Content */}
        <div className="p-4 bg-card">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/50">
            <span className="text-sm font-medium" style={{ color: 'var(--knowledge-blue)' }}>
              {currentCommentary?.author}
            </span>
          </div>
          <p className="text-foreground/90 leading-relaxed">
            {currentCommentary?.content[language] || currentCommentary?.content.en}
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function ActionBar() {
  return (
    <div className="flex items-center justify-center gap-2 py-4 border-t border-border mt-4">
      <Button variant="outline" size="sm" className="gap-2">
        <Copy className="w-4 h-4" />
        Copy
      </Button>
      <Button variant="outline" size="sm" className="gap-2">
        <Bookmark className="w-4 h-4" />
        Save
      </Button>
      <Button variant="outline" size="sm" className="gap-2">
        <Share2 className="w-4 h-4" />
        Share
      </Button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-20 h-20 rounded-full bg-accent/50 flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Select a Verse
      </h3>
      <p className="text-muted-foreground max-w-sm">
        Navigate the Vedic corpus tree on the left to explore verses, chapters, and sacred texts.
      </p>
    </div>
  )
}

export function ContentEngine({ verse, className }: ContentEngineProps) {
  if (!verse) {
    return (
      <div className={cn("flex items-center justify-center h-full", className)}>
        <EmptyState />
      </div>
    )
  }
  
  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="p-4 max-w-4xl mx-auto space-y-4">
        <VerseHeader verse={verse} />
        <VerseSection verse={verse} />
        <MeaningSection verse={verse} />
        <TranslationSection verse={verse} />
        <CommentarySection verse={verse} />
        <ActionBar />
      </div>
    </ScrollArea>
  )
}
