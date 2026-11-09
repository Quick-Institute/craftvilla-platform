import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/data";
import { formatLKR } from "@/lib/utils";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "teak-name-plaque": "/editorial/hero.jpg",
  "batik-wall-hanging": "/editorial/collage-batik.jpg",
  "clay-oil-lamp-set": "/editorial/cat-pottery.jpg",
  "leather-journal": "/editorial/collage-leather.jpg",
  "brass-tea-tray": "/editorial/product-brass-tray.jpg",
  "resin-photo-coaster": "/editorial/cat-resin.jpg",
  "engraved-pen-box": "/editorial/cat-woodwork.jpg",
  "handloom-table-runner": "/editorial/collage-batik.jpg",
};

export default function CustomizerHubPage() {
  const customizableProducts = PRODUCTS.filter((p) => p.customizable);

  return (
    <div className="space-y-10">
      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL HERO BANNER (Matches Home Page Hero Aesthetic)
          ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#e2d5c4]/70 shadow-sm"
        style={{
          background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
        }}
      >
        {/* Organic Soft Sage Backdrop Blob */}
        <div
          className="absolute right-[-40px] top-[-50px] w-[260px] h-[260px] bg-[#9aa58a] opacity-30 pointer-events-none z-0"
          style={{
            borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-semibold text-[#5b5a3a] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#b4532f]" />
            <span>Interactive Bespoke Studio</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Personalized Gifts &amp; Inscriptions
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            Select an authentic Sri Lankan craft piece below to launch our live 1:1 preview canvas. Inscribe heartfelt words, dates, or upload photo medallions with real-time proofing.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          HOW IT WORKS PILLARS (Soft Rounded Card)
          ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] p-6 sm:p-8 rounded-[30px] grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-[#b4532f] text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-xs">
            1
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#3a2418]">Choose Heirloom Medium</h3>
            <p className="text-xs text-[#7b6a5d] mt-1 leading-relaxed">
              Pick aged plantation teak, cast botanical resin, terracotta, or vegetable-tanned leather.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-[#b4532f] text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-xs">
            2
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#3a2418]">Live Real-Time Proofing</h3>
            <p className="text-xs text-[#7b6a5d] mt-1 leading-relaxed">
              Watch serif fonts, photo medallions, and timber oil stains update instantly as you type.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3.5">
          <div className="w-8 h-8 rounded-full bg-[#5f6b35] text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-xs">
            3
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#3a2418]">Approve Before Carving</h3>
            <p className="text-xs text-[#7b6a5d] mt-1 leading-relaxed">
              The master artisan will only begin hand carving after you review and approve the digital proof.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CUSTOMIZABLE PRODUCTS GRID (30px Rounded Cards)
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-5">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Select a Piece to Personalize
          </h2>
          <p className="text-sm text-[#7b6a5d]">
            Click any craft to customize in our digital workshop studio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {customizableProducts.map((p) => {
            const imageUrl = PRODUCT_IMAGE_MAP[p.id] || "/editorial/hero.jpg";

            return (
              <article
                key={p.id}
                className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="relative m-2.5 h-[190px] rounded-[24px] overflow-hidden bg-[#e2d5c4]">
                    <Image
                      src={imageUrl}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <span className="absolute top-2.5 right-2.5 bg-[#fbf7f0]/90 backdrop-blur-xs text-[#5f6b35] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#e2d5c4] flex items-center gap-1 shadow-xs">
                      <CheckCircle2 className="w-3 h-3 text-[#5f6b35]" />
                      <span>Live Proof Ready</span>
                    </span>
                  </div>

                  <div className="p-4 pt-1">
                    <h3
                      className="text-xl font-semibold text-[#3a2418] leading-snug"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      <Link
                        href={`/products/${p.id}/customize`}
                        className="hover:text-[#b4532f] transition-colors"
                      >
                        {p.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#7b6a5d] mt-0.5">By {p.artisanName}</p>
                    <p className="text-xs text-[#7b6a5d] mt-2 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-3 mt-auto border-t border-[#e2d5c4]/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7b6a5d] block uppercase tracking-wider">
                      From
                    </span>
                    <span className="font-bold text-sm text-[#3a2418]">
                      {formatLKR(p.basePrice)}
                    </span>
                  </div>
                  <Link
                    href={`/products/${p.id}/customize`}
                    className="bg-[#3a2418] hover:bg-[#b4532f] text-[#f4ede2] text-xs font-bold px-4 py-2 rounded-full transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Personalize</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
