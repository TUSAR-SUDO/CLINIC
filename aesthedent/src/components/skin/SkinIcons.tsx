import type { SkinIconName } from "@/lib/skin";

type IconProps = { className?: string };

function Base({ children, className = "" }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function AcneIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12.2 3.3c2.9-.6 5.9.9 7.2 3.5 1.2 2.5.7 5.4-1 7.5-1.7 2.2-4.4 3.6-7.2 3.2-2.9-.4-5.4-2.6-6.1-5.4-.7-2.9.6-5.8 3-7.4 1.3-.8 2.7-1.2 4.1-1.4Z" />
      <circle cx="10.2" cy="9.1" r=".55" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="10.2" r=".55" fill="currentColor" stroke="none" />
      <circle cx="11.7" cy="13.4" r=".45" fill="currentColor" stroke="none" />
      <path d="M12.1 6.1c.8-1.5 2-2.3 3.7-2.5" />
    </Base>
  );
}

export function PigmentationIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="m9.1 3.2.7 2.1a1 1 0 0 0 .6.6l2.1.7-2.1.7a1 1 0 0 0-.6.6l-.7 2.1-.7-2.1a1 1 0 0 0-.6-.6L5.7 6.6l2.1-.7a1 1 0 0 0 .6-.6l.7-2.1Z" />
      <path d="m17.4 9.7.5 1.5a1 1 0 0 0 .5.5l1.5.5-1.5.5a1 1 0 0 0-.5.5l-.5 1.5-.5-1.5a1 1 0 0 0-.5-.5l-1.5-.5 1.5-.5a1 1 0 0 0 .5-.5l.5-1.5Z" />
      <path d="m11.4 14.1.6 1.8a1 1 0 0 0 .6.6l1.8.6-1.8.6a1 1 0 0 0-.6.6l-.6 1.8-.6-1.8a1 1 0 0 0-.6-.6l-1.8-.6 1.8-.6a1 1 0 0 0 .6-.6l.6-1.8Z" />
    </Base>
  );
}

export function AntiAgeingIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 6.7v5.5l3.4 2" />
      <path d="M12 3.5v1M20.5 12h-1M12 20.5v-1M3.5 12h1" />
    </Base>
  );
}

export function RejuvenationIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12 3.1s6.4 6.7 6.4 11a6.4 6.4 0 0 1-12.8 0c0-4.3 6.4-11 6.4-11Z" />
      <path d="M8.3 14.6c.2 1.8 1.5 3.1 3.4 3.4" />
    </Base>
  );
}

export function FacialsIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M9.2 3.4h5.6a3 3 0 0 1 3 3v11.2a3 3 0 0 1-3 3H9.2a3 3 0 0 1-3-3V6.4a3 3 0 0 1 3-3Z" />
      <path d="M12 7.4v9.2M7.4 12h9.2" />
    </Base>
  );
}

export function MaintenanceIcon({ className }: IconProps) {
  return (
    <Base className={className}>
      <path d="M12 3.2c4.6 0 8.2 3.4 8.2 7.7 0 4.7-3.4 9.9-8.2 9.9-4.8 0-8.2-5.2-8.2-9.9 0-4.3 3.6-7.7 8.2-7.7Z" />
      <path d="M8.6 10.2c.4-.4.8-.4 1.1 0M14.3 10.2c.4-.4.8-.4 1.1 0" />
      <path d="M9.6 14.7c1.6 1.3 3.3 1.3 4.8 0" />
      <path d="M18.7 4.2c.8-1.1 2-1.5 3.4-1.3-.2 1.4-.6 2.6-1.7 3.4" />
    </Base>
  );
}

export const SKIN_ICONS: Record<SkinIconName, (props: IconProps) => React.ReactElement> = {
  acne: AcneIcon,
  pigmentation: PigmentationIcon,
  "anti-ageing": AntiAgeingIcon,
  rejuvenation: RejuvenationIcon,
  facials: FacialsIcon,
  maintenance: MaintenanceIcon,
};

