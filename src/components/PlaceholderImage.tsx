type PlaceholderImageProps = {
  label: string;
  className?: string;
  tone?: "navy" | "light";
};

export function PlaceholderImage({
  label,
  className = "",
  tone = "navy",
}: PlaceholderImageProps) {
  const bg =
    tone === "navy"
      ? "bg-gradient-to-br from-navy to-navy-light"
      : "bg-gradient-to-br from-surface to-white";
  const text = tone === "navy" ? "text-white/60" : "text-navy/40";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${bg} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        className={`h-10 w-10 ${text}`}
      >
        <rect x="8" y="18" width="48" height="14" rx="4" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="16" cy="25" r="1.5" fill="currentColor" />
        <path d="M20 32c-4 6-4 12 0 18M32 32c-2 6-2 12 0 18M44 32c4 6 4 12 0 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span
        className={`absolute bottom-2 left-2 rounded bg-black/30 px-2 py-1 text-[10px] font-medium ${
          tone === "navy" ? "text-white/80" : "text-navy/60"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
