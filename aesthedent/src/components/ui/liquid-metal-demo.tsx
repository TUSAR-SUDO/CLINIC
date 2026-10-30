"use client";

import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export function LiquidMetalButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 rounded-2xl">
      <div className="flex items-center gap-6">
        <LiquidMetalButton
          label="Book a visit"
          onClick={() => {
            window.location.href = "tel:+919692485602";
          }}
        />
        <LiquidMetalButton viewMode="icon" />
      </div>
    </div>
  );
}

export default LiquidMetalButtonDemo;

