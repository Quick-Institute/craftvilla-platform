"use client";

import React from "react";
import { FinishOption } from "@/lib/types";

interface PlaquePreviewProps {
  text: string;
  fontFamily: string;
  finish: FinishOption;
  imageUrl?: string | null;
  className?: string;
  style?: React.CSSProperties;
}

export default function PlaquePreview({
  text,
  fontFamily,
  finish,
  imageUrl,
  className = "",
  style = {},
}: PlaquePreviewProps) {
  const backgroundStyle = {
    background: `linear-gradient(135deg, ${finish.startColor}, ${finish.endColor})`,
    ...style,
  };

  return (
    <div
      className={`relative aspect-[4/3] w-full rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_24px_48px_-20px_rgba(60,30,15,0.45)] border-[2.5px] border-white/70 flex flex-col items-center justify-center p-6 text-center transition-all ${className}`}
      style={backgroundStyle}
      aria-label={`Custom engraving preview with ${finish.name} finish`}
    >
      {/* Subtle Wood Grain Overlay Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(92deg, transparent 0 14px, rgba(0,0,0,0.12) 14px 15px, transparent 15px 30px, rgba(255,255,255,0.08) 30px 31px)",
        }}
        aria-hidden="true"
      />

      {/* Floating Plaque Header Badge */}
      <div className="absolute top-4 left-5 right-5 flex items-center justify-between text-[9px] tracking-[0.22em] uppercase text-[rgba(50,24,5,0.85)] font-bold pb-2 border-b border-[rgba(50,24,5,0.2)]">
        <span>CEYLON PROOF</span>
        <span>{finish.name}</span>
      </div>

      {/* Inscription Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-sm px-4">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="Customer submitted reference engraving"
            className="w-[84px] h-[84px] object-cover rounded-full border-[3px] border-[rgba(50,24,5,0.6)] mb-3 filter sepia-[0.7] contrast-[0.9] shadow-md"
          />
        ) : null}

        <span
          style={{ fontFamily }}
          className="text-[rgba(45,20,5,0.92)] text-2xl sm:text-3xl lg:text-4xl leading-snug tracking-wide transition-all select-none italic font-medium"
        >
          &ldquo;{text || "For Amma, with endless love"}&rdquo;
        </span>

        <span className="text-[10px] tracking-[0.16em] uppercase text-[rgba(50,24,5,0.7)] font-semibold mt-3">
          Hand-Carved &amp; Oiled in Sri Lanka
        </span>
      </div>
    </div>
  );
}
