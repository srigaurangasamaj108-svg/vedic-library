'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Verse, ContentTab } from '@/lib/types'
import { useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface ContentEngineProps {
  verse: Verse | null
  className?: string
}

function VerseHeader({ verse }: { verse: Verse }) {
  return (
    <div className="text-center mb-6 pb-4 border-b border-border">
      <div className="text-sm text-muted-foreground mb-1">
        Bhagavad Gītā
      </div>
      <h1 className="text-xl font-semibold text-foreground">
        Chapter {verse.chapter}, Verse {verse.verse}
      </h1>
    </div>
  )
}

function ShlokaView({ verse }: { verse: Verse }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-8 px-4 bg-accent/30 rounded-2xl">
        <p className="font-serif text-2xl leading-relaxed text-foreground whitespace-pre-line tracking-wide">
          {verse.sanskrit}
        </p>
      </div>
    </div>
  )
}

function TransliterationView({ verse }: { verse: Verse }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-8 px-4 bg-secondary/50 rounded-2xl">
        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line italic">
          {verse.transliteration}
        </p>
      </div>
    </div>
  )
}

function SynonymsView({ verse }: { verse: Verse }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {verse.synonyms.map((synonym, index) => (
          <div
            key={index}
            className="flex items-baseline gap-2 p-3 bg-secondary/30 rounded-xl"
          >
            <span className="font-serif text-primary font-medium">
              {synonym.word}
            </span>
            <span className="text-muted-foreground">—</span>
            <span className="text-foreground/80 text-sm">
              {synonym.meaning}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TranslationView({ verse }: { verse: Verse }) {
  const { language } = useAppStore()
  const translation = verse.translations[language] || verse.translations.en
  
  return (
    <div className="space-y-4">
      <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
        <p className="text-lg leading-relaxed text-foreground">
          {translation}
        </p>
      </div>
    </div>
  )
}

function CommentaryView({ verse }: { verse: Verse }) {
  const { activeSampradaya, setActiveSampradaya, language } = useAppStore()
  
  const currentCommentary = verse.commentaries.find(
    c => c.sampradaya === activeSampradaya
  ) || verse.commentaries[0]
  
  const commentaryContent = currentCommentary?.content[language] || currentCommentary?.content.en
  
  const sampradayaLabels: Record<string, string> = {
    general: 'General',
    gaudiya: 'Gauḍīya',
    advaita: 'Advaita',
    madhva: 'Mādhva',
    sri_vaishnava: 'Śrī Vaiṣṇava'
  }
  
  return (
    <div className="space-y-4">
      {/* Sampradaya Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Sampradāya:</span>
        <Select value={activeSampradaya} onValueChange={setActiveSampradaya}>
          <SelectTrigger className="w-48 bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {verse.commentaries.map((commentary) => (
              <SelectItem key={commentary.sampradaya} value={commentary.sampradaya}>
                {sampradayaLabels[commentary.sampradaya] || commentary.sampradaya}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Commentary Content */}
      {currentCommentary && (
        <div className="p-6 bg-card rounded-2xl border border-border/50 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border/50">
            <span className="text-sm font-medium text-primary">
              {currentCommentary.author}
            </span>
            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
              {sampradayaLabels[currentCommentary.sampradaya]}
            </span>
          </div>
          <p className="text-base leading-relaxed text-foreground/90">
            {commentaryContent}
          </p>
        </div>
      )}
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
        Select a Text
      </h3>
      <p className="text-muted-foreground max-w-sm">
        Navigate the Vedic corpus tree on the left to explore verses, chapters, and sacred texts.
      </p>
    </div>
  )
}

export function ContentEngine({ verse, className }: ContentEngineProps) {
  const { activeTab, setActiveTab } = useAppStore()
  
  if (!verse) {
    return (
      <div className={cn("flex items-center justify-center h-full", className)}>
        <EmptyState />
      </div>
    )
  }
  
  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="p-6 max-w-3xl mx-auto">
        <VerseHeader verse={verse} />
        
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as ContentTab)}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-5 bg-secondary/50 p-1 rounded-xl mb-6">
            <TabsTrigger
              value="shloka"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm"
            >
              Śloka
            </TabsTrigger>
            <TabsTrigger
              value="transliteration"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm"
            >
              IAST
            </TabsTrigger>
            <TabsTrigger
              value="synonyms"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm"
            >
              Words
            </TabsTrigger>
            <TabsTrigger
              value="translation"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm"
            >
              Meaning
            </TabsTrigger>
            <TabsTrigger
              value="commentary"
              className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm text-sm"
            >
              Bhāṣya
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="shloka" className="mt-0 focus-visible:outline-none">
            <ShlokaView verse={verse} />
          </TabsContent>
          
          <TabsContent value="transliteration" className="mt-0 focus-visible:outline-none">
            <TransliterationView verse={verse} />
          </TabsContent>
          
          <TabsContent value="synonyms" className="mt-0 focus-visible:outline-none">
            <SynonymsView verse={verse} />
          </TabsContent>
          
          <TabsContent value="translation" className="mt-0 focus-visible:outline-none">
            <TranslationView verse={verse} />
          </TabsContent>
          
          <TabsContent value="commentary" className="mt-0 focus-visible:outline-none">
            <CommentaryView verse={verse} />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  )
}
