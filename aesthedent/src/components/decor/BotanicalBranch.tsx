export default function BotanicalBranch({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M196 172C150 143 108 112 72 70 46 40 28 17 15 4" />
      <path d="M159 154c-2-18 6-30 23-35 1 17-6 30-23 35Z" />
      <path d="M131 132c-16 1-27-6-32-21 15-2 27 5 32 21Z" />
      <path d="M112 111c2-17 12-27 28-28-2 15-11 26-28 28Z" />
      <path d="M90 88c-15-1-25-9-28-23 14 0 24 8 28 23Z" />
      <path d="M70 68c3-14 12-23 26-23-3 13-12 21-26 23Z" />
      <path d="M47 43c-12-2-20-9-22-21 12 0 20 8 22 21Z" />
      <path d="M32 26c2-11 9-18 20-18-2 10-9 16-20 18Z" />
    </svg>
  );
}
