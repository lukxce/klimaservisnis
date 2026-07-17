export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="14" fill="#0b1526" />
      <g stroke="#2f6fed" strokeWidth="4.5" strokeLinecap="round" fill="none">
        <path d="M32 12v40" />
        <path d="M14.7 22l34.6 20" />
        <path d="M49.3 22L14.7 42" />
        <path d="M32 12l-6 6M32 12l6 6" />
        <path d="M32 52l-6-6M32 52l6-6" />
        <path d="M14.7 22l8.2-2.2M14.7 22l2.2 8.2" />
        <path d="M49.3 42l-8.2 2.2M49.3 42l-2.2-8.2" />
      </g>
      <circle cx="32" cy="32" r="5.5" fill="#2f6fed" />
    </svg>
  );
}

export function Logo({ title, className }: { title: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="truncate">{title}</span>
    </span>
  );
}
