import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ARTISANS } from "@/lib/data";
import { Sparkles, ArrowRight, ShieldCheck, Star, MapPin } from "lucide-react";

const ARTISAN_PHOTOS: Record<string, string> = {
  "kandy-wood-studio": "/editorial/cat-woodwork.jpg",
  "weligama-batik-co": "/editorial/collage-batik.jpg",
  "molagoda-potters": "/editorial/cat-pottery.jpg",
  "galle-leatherworks": "/editorial/collage-leather.jpg",
  "kandyan-brass-house": "/editorial/product-brass-tray.jpg",
  "negombo-resin-lab": "/editorial/cat-resin.jpg",
};

export default function ArtisansPage() {
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
            <span>Verified Heritage Guild</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Meet the Masters of Ceylon Craft
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            Every artisan on CraftVilla is thoroughly verified before they can list. We ensure fair-trade compensation, preserving multi-generational Sri Lankan traditions with each bespoke commission.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ARTISAN CARDS GRID (Soft Rounded 30px Cards)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTISANS.map((artisan) => {
          const photoUrl = ARTISAN_PHOTOS[artisan.slug] || "/editorial/hero.jpg";

          return (
            <article
              key={artisan.id}
              className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Workshop Photo Header */}
              <div className="relative m-2.5 h-[170px] rounded-[24px] overflow-hidden bg-[#e2d5c4]">
                <Image
                  src={photoUrl}
                  alt={artisan.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Verified Badge */}
                {artisan.verified && (
                  <span className="absolute top-2.5 left-2.5 bg-[#fbf7f0]/95 backdrop-blur-xs text-[#5f6b35] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#e2d5c4] shadow-xs flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#5f6b35]" />
                    <span>Verified Studio</span>
                  </span>
                )}

                {/* Rating Badge */}
                <span className="absolute top-2.5 right-2.5 bg-[#fbf7f0]/95 backdrop-blur-xs text-[#3a2418] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#e2d5c4] shadow-xs flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#b4532f] fill-current" />
                  <span>{artisan.rating}</span>
                </span>

                {/* Category Pill Over Photo */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
                  <span className="bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                    {artisan.category} Craft
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-white/90">
                    <MapPin className="w-3 h-3" />
                    {artisan.location}
                  </span>
                </div>
              </div>

              {/* Artisan Details */}
              <div className="p-5 pt-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    className="text-2xl font-semibold text-[#3a2418] mb-1.5"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    <Link
                      href={`/artisans/${artisan.slug}`}
                      className="hover:text-[#b4532f] transition-colors"
                    >
                      {artisan.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#7b6a5d] leading-relaxed line-clamp-3">
                    {artisan.bio}
                  </p>
                </div>

                {/* View Pieces Pill Button */}
                <div className="mt-5 pt-3 border-t border-[#e2d5c4]/60">
                  <Link
                    href={`/artisans/${artisan.slug}`}
                    className="w-full bg-[#3a2418] hover:bg-[#b4532f] text-[#f4ede2] text-xs font-bold py-2.5 px-4 rounded-full transition-colors flex items-center justify-center gap-2 group"
                  >
                    <span>Explore Workshop Pieces</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          CALL TO ACTION (Artisan Onboarding Panel)
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[32px] p-8 sm:p-10 shadow-xs flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="uppercase tracking-[0.2em] text-[11px] font-bold text-[#b4532f]">
            Partner with CraftVilla
          </span>
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Do you craft authentic pieces by hand?
          </h2>
          <p className="text-sm text-[#7b6a5d] max-w-lg">
            Open your dedicated digital storefront, receive custom customer proof specifications, and keep over 85% of each sale.
          </p>
        </div>

        <Link
          href="/artisan/register"
          className="bg-[#b4532f] hover:bg-[#9e4732] text-[#fff6ea] font-bold text-sm px-7 py-3.5 rounded-full transition-all shadow-md shrink-0 inline-flex items-center gap-2"
        >
          <span>Apply as an Artisan</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
