interface TranslationBlockProps {
  content: string;
  author?: string;
}

export function TranslationBlock({
  content,
  author,
}: TranslationBlockProps) {
  return (
    <div className="mt-16">

      {author && (
        <div className="text-sm text-gray-500 uppercase tracking-wide mb-4">
          Translation — {author}
        </div>
      )}

      <div className="text-lg leading-relaxed whitespace-pre-line">
        {content}
      </div>

    </div>
  );
}
