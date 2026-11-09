import { CLINIC } from "@/lib/clinic";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function MobileHeroCta() {
  return (
    <div className="hero__mobile-cta">
      <LiquidMetalButton
        label="Book a visit"
        variant="aubergine"
        height={52}
        fullWidth
        href={CLINIC.bookingHref}
        ariaLabel="Book a visit by calling the clinic"
      />
    </div>
  );
}
