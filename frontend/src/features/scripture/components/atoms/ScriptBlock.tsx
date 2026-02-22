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

  const style =
    variant === "primary"
      ? "text-3xl leading-loose"
      : "text-lg italic text-gray-600";

  return (
    <div
      className={`${alignment} ${style} whitespace-pre-line`}
    >
      {content}
    </div>
  );
}
