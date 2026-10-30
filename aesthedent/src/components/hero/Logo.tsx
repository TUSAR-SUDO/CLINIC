interface LogoProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M23.9 7.4c-2.5 0-4.9.9-6.8 2.5a10.8 10.8 0 0 0-6.8-2.5c-4.5 0-8 3.8-8 8.3 0 3.6 2 6.2 3.6 8.8 1.4 2.4 2.1 5.1 2.4 7.9.2 1.8 2.5 2.1 3 .3.8-2.6 1.5-5.2 3.3-7.3 1-1.2 2.6-1.2 3.6 0 1.8 2.1 2.5 4.7 3.3 7.3.5 1.8 2.8 1.5 3-.3.3-2.8 1-5.5 2.4-7.9 1.6-2.6 3.6-5.2 3.6-8.8 0-4.5-3.5-8.3-8-8.3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9 20.2c2.2-2.2 4.2-2.3 5.7-.5 1.4-1.4 2.9-1.5 4.4-.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24.6" r="1.05" fill="currentColor" />
      <path
        d="M24 27.7c0 2.3-1.2 3.7-2.8 4.2"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Logo({ href = "#top", onClick, className = "" }: LogoProps) {
  const content = (
    <>
      <BrandMark className="brand__mark" />
      <span className="brand__word">Aesthedent</span>
    </>
  );

  if (!href) {
    return <span className={`brand ${className}`}>{content}</span>;
  }

  return (
    <a href={href} onClick={onClick} className={`brand ${className}`} aria-label="Aesthedent — home">
      {content}
    </a>
  );
}
