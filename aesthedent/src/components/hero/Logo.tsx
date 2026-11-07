import Image from "next/image";
import { CLINIC } from "@/lib/clinic";

/** The supplied brand mark: a tooth holding a face in profile. */
export const BRAND_MARK = "/images/logo/aesthedent-mark.png";

interface LogoProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src={BRAND_MARK}
      alt=""
      aria-hidden="true"
      width={512}
      height={512}
      priority
      className={className}
    />
  );
}

export default function Logo({ href = "#top", onClick, className = "" }: LogoProps) {
  const content = (
    <>
      <BrandMark className="brand__mark" />
      <span className="brand__text-group">
        <span className="brand__word">{CLINIC.name}</span>
        <span className="brand__tagline">DENTAL · SKIN · HAIR · PMU</span>
      </span>
    </>
  );

  if (!href) {
    return <span className={`brand ${className}`}>{content}</span>;
  }

  return (
    <a href={href} onClick={onClick} className={`brand ${className}`} aria-label={`${CLINIC.name} — home`}>
      {content}
    </a>
  );
}
