interface TranslationBlockProps {
  content: string;
  author?: string;
}

export function TranslationBlock({
  content,
  author,
}: TranslationBlockProps) {
  return (
    <div className="space-y-6">

      {author && (
        <div className="text-xs uppercase tracking-[0.15em] text-gray-500">
          Translation
          <span className="normal-case tracking-normal text-gray-400 ml-2">
            — {author}
          </span>
        </div>
      )}

      <div className="text-lg md:text-xl leading-relaxed text-gray-800 whitespace-pre-line">
        {content}
      </div>

    </div>
  );
}
