import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ARTISANS, PRODUCTS } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { ArrowLeft, ShieldCheck, Star, MapPin, Sparkles, Calendar } from "lucide-react";

interface ArtisanDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTISANS.map((artisan) => ({
    slug: artisan.slug,
  }));
}

const ARTISAN_PHOTOS: Record<string, string> = {
  "kandy-wood-studio": "/editorial/cat-woodwork.jpg",
  "weligama-batik-co": "/editorial/collage-batik.jpg",
  "molagoda-potters": "/editorial/cat-pottery.jpg",
  "galle-leatherworks": "/editorial/collage-leather.jpg",
  "kandyan-brass-house": "/editorial/product-brass-tray.jpg",
  "negombo-resin-lab": "/editorial/cat-resin.jpg",
};

export default async function ArtisanDetailPage({
  params,
}: ArtisanDetailPageProps) {
  const { slug } = await params;
  const artisan = ARTISANS.find((a) => a.slug === slug);

  if (!artisan) {
    notFound();
  }

  const artisanProducts = PRODUCTS.filter((p) => p.artisanSlug === slug);
  const coverPhoto = ARTISAN_PHOTOS[artisan.slug] || "/editorial/hero.jpg";

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/artisans"
          className="bg-[#fbf7f0] border border-[#e2d5c4] rounded-full px-4 py-2 text-xs font-semibold text-[#7b6a5d] hover:text-[#3a2418] hover:border-[#3a2418] inline-flex items-center gap-1.5 transition-all shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Artisans</span>
        </Link>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ARTISAN HERO PROFILE BANNER (Matches Home Page Hero Aesthetic)
          ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#e2d5c4]/70 shadow-sm"
        style={{
          background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
        }}
      >
        {/* Organic Soft Sage Backdrop Blob */}
        <div
          className="absolute right-[-40px] top-[-50px] w-[300px] h-[300px] bg-[#9aa58a] opacity-30 pointer-events-none z-0"
          style={{
            borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Bio & Details */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="uppercase tracking-[0.2em] text-xs font-semibold text-[#5b5a3a] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#b4532f]" />
                <span>{artisan.category} Guild</span>
              </span>

              {artisan.verified && (
                <span className="bg-[#fbf7f0]/90 backdrop-blur-xs text-[#5f6b35] text-[10px] font-bold px-3 py-1 rounded-full border border-[#e2d5c4] shadow-xs inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5f6b35]" />
                  <span>Verified Master Maker</span>
                </span>
              )}
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
            >
              {artisan.name}
            </h1>

            {/* Badges Row */}
            <div className="flex items-center gap-2.5 flex-wrap text-xs text-[#7b6a5d]">
              <span className="bg-[#fbf7f0]/80 px-3 py-1 rounded-full border border-[#e2d5c4] flex items-center gap-1 font-medium text-[#3a2418]">
                <MapPin className="w-3.5 h-3.5 text-[#b4532f]" />
                <span>{artisan.location}, Sri Lanka</span>
              </span>
              <span className="bg-[#fbf7f0]/80 px-3 py-1 rounded-full border border-[#e2d5c4] flex items-center gap-1 font-medium text-[#3a2418]">
                <Star className="w-3.5 h-3.5 text-[#b4532f] fill-current" />
                <span>{artisan.rating} Community Rating</span>
              </span>
              {artisan.joinedYear && (
                <span className="bg-[#fbf7f0]/80 px-3 py-1 rounded-full border border-[#e2d5c4] flex items-center gap-1 font-medium text-[#3a2418]">
                  <Calendar className="w-3.5 h-3.5 text-[#7b6a5d]" />
                  <span>Guild Member Since {artisan.joinedYear}</span>
                </span>
              )}
            </div>

            <p className="text-[#3a2418] max-w-2xl text-base leading-relaxed pt-1">
              {artisan.bio}
            </p>
          </div>

          {/* Right: Studio Cover Image */}
          <div className="lg:col-span-4">
            <div className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden border-2 border-white/70 shadow-md">
              <Image
                src={coverPhoto}
                alt={artisan.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ARTISAN'S PIECES SECTION (Product Cards with Real Photography)
          ───────────────────────────────────────────────────────────── */}
      <section className="space-y-5 pt-2">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Handcrafted by {artisan.name}
          </h2>
          <p className="text-sm text-[#7b6a5d]">
            Every piece is customizable with personal engravings, wood stains, or gift packaging.
          </p>
        </div>

        {artisanProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artisanProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-12 text-center space-y-4">
            <p
              className="text-xl text-[#3a2418] font-medium"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              No active pieces listed currently.
            </p>
            <p className="text-xs text-[#7b6a5d] max-w-sm mx-auto">
              This master workshop is currently at capacity or preparing seasonal crafts. Check back soon.
            </p>
            <Link
              href="/catalog"
              className="bg-[#b4532f] hover:bg-[#9e4732] text-white text-xs font-bold px-6 py-2.5 rounded-full inline-flex items-center gap-1.5 transition-all shadow-md"
            >
              Explore Other Artisans
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
