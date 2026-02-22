interface ScriptBlockProps {
  content: string;
  align?: "left" | "center";
  variant?: "primary" | "secondary";
}

export function ScriptBlock({
  content,
  align = "center",
  variant = "primary",
}: ScriptBlockProps) {
  const alignment =
    align === "center" ? "text-center" : "text-left";

  const base = "whitespace-pre-line";

  const primaryStyle =
    "text-2xl md:text-3xl leading-relaxed tracking-wide";

  const secondaryStyle =
    "text-lg md:text-xl leading-relaxed italic text-gray-600";

  const style = variant === "primary"
    ? primaryStyle
    : secondaryStyle;

  return (
    <div className={`${alignment} ${base} ${style}`}>
      {content}
    </div>
  );
}
