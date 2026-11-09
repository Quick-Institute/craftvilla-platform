"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import { formatLKR } from "@/lib/utils";
import { SlidersHorizontal, RotateCcw, Clock, Sparkles, ArrowRight } from "lucide-react";

const MATERIALS = ["All", "Wood", "Ceramic", "Leather", "Batik", "Metal", "Resin"];
const PERSONALIZATION_TYPES = ["All", "Engraving", "Photo Etching", "Text Stamp", "Hand-painted"];
const LEAD_TIMES = [
  { label: "All Lead Times", value: "all" },
  { label: "⚡ Express Crafting (1-2 days)", value: "express" },
  { label: "⏳ Standard Artisanal (3-5 days)", value: "standard" },
];

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

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialMaterial = searchParams.get("material") || "All";

  const [search, setSearch] = useState(initialQuery);
  const [selectedMaterial, setSelectedMaterial] = useState(initialMaterial);
  const [selectedPersonalization, setSelectedPersonalization] = useState("All");
  const [selectedLeadTime, setSelectedLeadTime] = useState("all");
  const [maxPrice, setMaxPrice] = useState<number>(7500);

  // Faceted Filtering
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Material
      if (selectedMaterial !== "All" && product.material !== selectedMaterial) {
        return false;
      }
      // 2. Personalization Type (inferred from name & description)
      if (selectedPersonalization !== "All") {
        if (
          selectedPersonalization === "Engraving" &&
          !product.name.toLowerCase().includes("plaque") &&
          !product.name.toLowerCase().includes("pen") &&
          !product.name.toLowerCase().includes("tray")
        ) {
          return false;
        }
        if (
          selectedPersonalization === "Photo Etching" &&
          !product.name.toLowerCase().includes("coaster") &&
          !product.name.toLowerCase().includes("plaque")
        ) {
          return false;
        }
        if (
          selectedPersonalization === "Text Stamp" &&
          !product.name.toLowerCase().includes("journal") &&
          !product.name.toLowerCase().includes("lamp")
        ) {
          return false;
        }
      }
      // 3. Price Slider
      if (product.basePrice > maxPrice) {
        return false;
      }
      // 4. Lead Time
      if (selectedLeadTime === "express" && product.leadTimeDays > 2) {
        return false;
      }
      if (selectedLeadTime === "standard" && product.leadTimeDays <= 2) {
        return false;
      }
      // 5. Text Search Query
      if (search.trim()) {
        const q = search.toLowerCase();
        const haystack =
          `${product.name} ${product.material} ${product.occasion} ${product.artisanName} ${product.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [search, selectedMaterial, selectedPersonalization, selectedLeadTime, maxPrice]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedMaterial("All");
    setSelectedPersonalization("All");
    setSelectedLeadTime("all");
    setMaxPrice(7500);
  };

  return (
    <div className="space-y-8">
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
            <span>Authentic Sri Lankan Handicrafts</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            All Handcrafted Creations
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            Explore heirloom quality crafts with customizable inscriptions, fine timber finishes, and verified artisan provenance from Sri Lanka’s master workshops.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FILTER BAR & CATALOG GRID
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left: Faceted Filter Panel (Rounded Card) */}
        <aside className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-6 shadow-xs lg:sticky lg:top-24 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#e2d5c4]">
            <div className="flex items-center gap-2 font-bold text-sm text-[#3a2418]">
              <SlidersHorizontal className="w-4 h-4 text-[#b4532f]" />
              <span>Faceted Filters</span>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-[#7b6a5d] hover:text-[#3a2418] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search within catalog */}
          <div>
            <label htmlFor="cat-search" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] mb-1.5 block">
              Search Keyword
            </label>
            <input
              id="cat-search"
              type="search"
              placeholder="Search by name, wood, maker..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs py-2.5 px-3.5 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] placeholder:text-[#7b6a5d]/70 focus:outline-none transition-colors"
            />
          </div>

          {/* 1. Material Filter (Pill chips) */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] mb-2 block">
              Material Media
            </span>
            <div className="flex flex-wrap gap-1.5">
              {MATERIALS.map((mat) => (
                <button
                  key={mat}
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border-[1.5px] ${
                    selectedMaterial === mat
                      ? "bg-[#3a2418] text-[#f4ede2] border-[#3a2418] shadow-xs"
                      : "bg-[#fbf7f0] text-[#7b6a5d] border-[#e2d5c4] hover:border-[#3a2418] hover:text-[#3a2418]"
                  }`}
                  onClick={() => setSelectedMaterial(mat)}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Personalization Type Filter (Pill chips) */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] mb-2 block">
              Personalization Type
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PERSONALIZATION_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer border-[1.5px] ${
                    selectedPersonalization === type
                      ? "bg-[#3a2418] text-[#f4ede2] border-[#3a2418] shadow-xs"
                      : "bg-[#fbf7f0] text-[#7b6a5d] border-[#e2d5c4] hover:border-[#3a2418] hover:text-[#3a2418]"
                  }`}
                  onClick={() => setSelectedPersonalization(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Price Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#7b6a5d]">
                Max Budget
              </span>
              <span className="font-bold text-[#3a2418]">{formatLKR(maxPrice)}</span>
            </div>
            <input
              type="range"
              min={1500}
              max={7500}
              step={200}
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
              className="w-full accent-[#b4532f] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#7b6a5d] mt-1">
              <span>LKR 1,500</span>
              <span>LKR 7,500</span>
            </div>
          </div>

          {/* 4. Crafting Lead Time */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] mb-2 block flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#b4532f]" />
              <span>Crafting Lead Time</span>
            </span>
            <div className="space-y-1.5 text-xs">
              {LEAD_TIMES.map((lt) => (
                <label
                  key={lt.value}
                  className="flex items-center gap-2 cursor-pointer text-[#3a2418] hover:text-[#b4532f]"
                >
                  <input
                    type="radio"
                    name="leadTime"
                    value={lt.value}
                    checked={selectedLeadTime === lt.value}
                    onChange={(e) => setSelectedLeadTime(e.target.value)}
                    className="accent-[#b4532f]"
                  />
                  <span>{lt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Right: Products Grid (Rounded Cards with Real Photography) */}
        <div className="lg:col-span-3 space-y-5">
          <div className="flex items-center justify-between text-xs text-[#7b6a5d] pb-2 border-b border-[#e2d5c4]">
            <span>
              Showing <b className="text-[#3a2418]">{filteredProducts.length}</b> handcrafted pieces
            </span>
            {(selectedMaterial !== "All" ||
              selectedPersonalization !== "All" ||
              selectedLeadTime !== "all" ||
              search) && (
              <span className="text-[#5f6b35] font-semibold">✓ Filters applied</span>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredProducts.map((product) => {
                const imageUrl = PRODUCT_IMAGE_MAP[product.id] || "/editorial/hero.jpg";

                return (
                  <article
                    key={product.id}
                    className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    {/* Photo Frame (Real Photography) */}
                    <Link
                      href={`/products/${product.id}/customize`}
                      className="relative m-2.5 h-[190px] rounded-[24px] overflow-hidden bg-[#e2d5c4] block group"
                    >
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="absolute top-2.5 right-2.5 bg-[#fbf7f0]/90 backdrop-blur-xs text-[#3a2418] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#e2d5c4] shadow-xs">
                        ⚡ {product.leadTimeDays}d Craft
                      </span>
                    </Link>

                    {/* Card Info */}
                    <div className="p-4 pt-2 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="inline-block bg-[#b4532f]/15 text-[#8a3a1f] rounded-full px-2.5 py-0.5 text-[11px] font-bold mb-1.5">
                          Customizable
                        </span>
                        <h3
                          className="text-xl font-semibold text-[#3a2418] leading-snug truncate"
                          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                        >
                          <Link
                            href={`/products/${product.id}/customize`}
                            className="hover:text-[#b4532f] transition-colors"
                          >
                            {product.name}
                          </Link>
                        </h3>
                        <small className="text-xs text-[#7b6a5d] block mt-0.5">
                          By {product.artisanName} · {product.material}
                        </small>
                        <p className="text-xs text-[#7b6a5d] mt-2 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Bottom Row: Starting price & Pill Action */}
                      <div className="pt-3 mt-3 border-t border-[#e2d5c4]/60 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-[#7b6a5d] block uppercase tracking-wider">
                            Starting at
                          </span>
                          <span className="font-bold text-sm text-[#3a2418]">
                            {formatLKR(product.basePrice)}
                          </span>
                        </div>
                        <Link
                          href={`/products/${product.id}/customize`}
                          className="bg-[#3a2418] hover:bg-[#b4532f] text-[#f4ede2] text-xs font-bold px-4 py-2 rounded-full transition-colors inline-flex items-center gap-1.5"
                          aria-label={`Customize and buy ${product.name}`}
                        >
                          <span>Customize</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-12 text-center space-y-4">
              <p
                className="text-2xl text-[#3a2418] font-medium"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                No crafts match your filter criteria.
              </p>
              <p className="text-sm text-[#7b6a5d] max-w-sm mx-auto">
                Try loosening your price slider or choosing a different craft material.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="bg-transparent hover:bg-white/60 border-[1.5px] border-[#3a2418]/30 hover:border-[#3a2418] text-[#3a2418] font-bold text-xs px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#fbf7f0] border border-[#e2d5c4] rounded-[28px] p-12 text-center text-[#7b6a5d]">
          Loading craft catalog...
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
