"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";
import { useToastStore } from "@/lib/store/toastStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useIsMounted } from "@/lib/useIsMounted";
import {
  Search,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Check,
  Menu,
  X,
  User as UserIcon,
  RotateCcw,
} from "lucide-react";

interface CatalogItem {
  id: string;
  name: string;
  material: string;
  occasion: string;
  artisan: string;
  price: number;
  image: string;
  bgTone: string;
}

const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "teak-name-plaque",
    name: "Teak name plaque",
    material: "Wood",
    occasion: "Anniversary",
    artisan: "Kandy Wood Studio",
    price: 3500,
    image: "/editorial/hero.jpg",
    bgTone: "#d9a58a",
  },
  {
    id: "batik-wall-hanging",
    name: "Batik wall hanging",
    material: "Batik",
    occasion: "Birthday",
    artisan: "Weligama Batik Co.",
    price: 5200,
    image: "/editorial/collage-batik.jpg",
    bgTone: "#b9b48e",
  },
  {
    id: "clay-oil-lamp-set",
    name: "Clay oil lamp set",
    material: "Ceramic",
    occasion: "Corporate",
    artisan: "Molagoda Potters",
    price: 2400,
    image: "/editorial/cat-pottery.jpg",
    bgTone: "#dcc4bb",
  },
  {
    id: "leather-journal",
    name: "Leather journal",
    material: "Leather",
    occasion: "Birthday",
    artisan: "Galle Leatherworks",
    price: 4100,
    image: "/editorial/collage-leather.jpg",
    bgTone: "#cdbfb1",
  },
  {
    id: "brass-tea-tray",
    name: "Brass tea tray",
    material: "Metal",
    occasion: "Anniversary",
    artisan: "Kandyan Brass House",
    price: 6800,
    image: "/editorial/product-brass-tray.jpg",
    bgTone: "#eadccb",
  },
  {
    id: "resin-photo-coaster",
    name: "Resin photo coaster",
    material: "Resin",
    occasion: "Birthday",
    artisan: "Negombo Resin Lab",
    price: 1900,
    image: "/editorial/cat-resin.jpg",
    bgTone: "#bfe3e0",
  },
  {
    id: "engraved-pen-box",
    name: "Engraved pen box",
    material: "Wood",
    occasion: "Corporate",
    artisan: "Kandy Wood Studio",
    price: 2900,
    image: "/editorial/cat-woodwork.jpg",
    bgTone: "#d9a58a",
  },
  {
    id: "handloom-table-runner",
    name: "Handloom table runner",
    material: "Batik",
    occasion: "Anniversary",
    artisan: "Weligama Batik Co.",
    price: 3300,
    image: "/editorial/collage-batik.jpg",
    bgTone: "#d9c9ef",
  },
];

const COLLAGE_ITEMS = [
  {
    label: "Wood",
    origin: "Kandy Studio",
    image: "/editorial/cat-woodwork.jpg",
    gridClass: "col-start-1 col-end-2 row-start-1 row-end-3",
  },
  {
    label: "Batik",
    origin: "Southern Looms",
    image: "/editorial/collage-batik.jpg",
    gridClass: "col-start-2 col-end-3 row-start-1 row-end-4",
  },
  {
    label: "Clay",
    origin: "Kegalle Kilns",
    image: "/editorial/cat-pottery.jpg",
    gridClass: "col-start-3 col-end-4 row-start-1 row-end-2",
  },
  {
    label: "Leather",
    origin: "Galle Fort",
    image: "/editorial/collage-leather.jpg",
    gridClass: "col-start-3 col-end-4 row-start-2 row-end-4",
  },
];

const FILTER_CHIPS = [
  "All",
  "Wood",
  "Ceramic",
  "Leather",
  "Batik",
  "Metal",
  "Resin",
  "Anniversary",
  "Birthday",
  "Corporate",
];

export default function HomePage() {
  const mounted = useIsMounted();
  const { addItem, getTotalCount } = useCartStore();
  const { showToast } = useToastStore();
  const { user } = useAuthStore();

  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [liveInscription, setLiveInscription] = useState("For Amma, with endless love");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const cartCount = mounted ? getTotalCount() : 0;

  // Filter products based on active chip and search query
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CATALOG_ITEMS.filter((item) => {
      const matchesFilter =
        activeFilter === "All" ||
        item.material === activeFilter ||
        item.occasion === activeFilter;

      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.material.toLowerCase().includes(q) ||
        item.artisan.toLowerCase().includes(q) ||
        item.occasion.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const handleQuickAdd = (product: CatalogItem) => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      text: "Standard Studio Edition",
      font: "Serif",
      finish: "Natural Sandstone",
      proofApproved: true,
      imageUrl: product.image,
      isHamper: false,
    });
    setAddedItem(product.id);
    showToast(`Added ${product.name} to shopping bag`);
    setTimeout(() => setAddedItem(null), 2500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSent(true);
      showToast("Thank you for joining our journey");
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSent(false);
      }, 4000);
    }
  };

  const scrollToShop = () => {
    const el = document.getElementById("shop");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="craftvilla-home-page"
      className="relative w-full min-h-screen bg-[#f4ede2] text-[#3a2418] font-sans antialiased selection:bg-[#b4532f] selection:text-[#fff6ea] overflow-x-hidden"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(120,90,60,0.03) 0 1px, transparent 1px 4px)",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          ORGANIC BACKGROUND BLOBS (Earthy mood board)
          Using organic border-radius blobs behind content, not hard rectangles
          ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute top-12 right-[-100px] sm:right-[-140px] w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] bg-[#9aa58a] opacity-20 pointer-events-none z-0 blur-xs"
        style={{
          borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[850px] left-[-80px] w-[380px] h-[380px] bg-[#b4532f] opacity-15 pointer-events-none z-0 blur-xs"
        style={{
          borderRadius: "48% 52% 38% 62% / 60% 35% 65% 40%",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-[1800px] right-[-60px] w-[360px] h-[360px] bg-[#9aa58a] opacity-15 pointer-events-none z-0 blur-xs"
        style={{
          borderRadius: "58% 42% 63% 37% / 44% 58% 42% 56%",
        }}
        aria-hidden="true"
      />



      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER
          ───────────────────────────────────────────────────────────── */}
      <main className="relative z-10 w-full max-w-[1160px] mx-auto px-4 sm:px-6 pt-6 pb-20 sm:pb-28">

        {/* ───────────────────────────────────────────────────────────
            1. LARGE HERO WITH PRODUCT STILL-LIFE PHOTOGRAPHY
            (Form / Clay Aesthetic: 44px radius, organic blob backdrop, real still life)
            ─────────────────────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden rounded-[28px] sm:rounded-[44px] p-6 sm:p-10 lg:p-14 mb-14 shadow-lg border border-[#e2d5c4]/60"
          style={{
            background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
          }}
        >
          {/* Organic Sage Blob in Hero (From Reference CSS) */}
          <div
            className="absolute left-[-70px] bottom-[-100px] w-[320px] h-[320px] bg-[#9aa58a] opacity-40 pointer-events-none z-0"
            style={{
              borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Column (Editorial Headline & Content) */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="inline-block uppercase tracking-[0.22em] text-xs font-medium text-[#5b5a3a] mb-3.5">
                Handmade in Sri Lanka
              </span>

              <h1
                className="text-4xl sm:text-5xl lg:text-[76px] leading-[0.96] text-[#8a3a1f] font-medium tracking-tight mb-5"
                style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
              >
                Objects with
                <br />
                a human touch.
              </h1>

              <p className="text-[#7b6a5d] text-base sm:text-lg leading-relaxed max-w-[46ch] mb-7 font-normal">
                Pick a piece from a Sri Lankan craftsperson, add a name or a photo, check the proof, and follow it from the workshop to your door.
              </p>

              {/* Action Buttons: Gold Pill & Ghost Pill */}
              <div className="flex flex-wrap items-center gap-3.5 mb-6">
                <Link
                  href="/products/teak-name-plaque/customize"
                  className="bg-[#b4532f] hover:bg-[#9e4732] text-[#fff6ea] font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all shadow-md inline-flex items-center gap-2 group"
                >
                  <span>Personalize a gift</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={scrollToShop}
                  className="bg-transparent hover:bg-white/50 border-[1.5px] border-[#3a2418]/30 hover:border-[#3a2418] text-[#3a2418] font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-all cursor-pointer"
                >
                  Browse the catalog
                </button>
              </div>

              {/* Live Inscription Tester Pill */}
              <div className="w-full max-w-md bg-white/75 backdrop-blur-xs p-3.5 rounded-[20px] border border-[#e2d5c4] shadow-xs">
                <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-[#7b6a5d] font-semibold mb-1.5">
                  <span>Live Engraving Preview</span>
                  <span className="text-[#b4532f] lowercase font-mono">live proof</span>
                </div>
                <div className="flex items-center bg-[#f4ede2] px-3 py-1.5 rounded-full border border-[#e2d5c4] focus-within:border-[#b4532f]">
                  <Sparkles className="w-3.5 h-3.5 text-[#b4532f] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={liveInscription}
                    onChange={(e) => setLiveInscription(e.target.value)}
                    maxLength={36}
                    placeholder="Type your inscription..."
                    className="w-full text-xs text-[#3a2418] bg-transparent focus:outline-none border-none p-0 font-sans"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Real Warmly Lit Product Still-Life Photography (Form / Clay) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] w-full rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-[0_30px_50px_-28px_rgba(60,30,15,0.6)] border-[2px] border-white/60 bg-[#e2d5c4] group">
                <Image
                  src="/editorial/hero-still-life.jpg"
                  alt="Editorial still life of handmade Ceylon ceramics, wheel-thrown terracotta, and teak wood plaque in warm morning light"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Floating Tactile Inscribed Keepsake Plaque Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#fbf7f0]/95 backdrop-blur-md p-4 rounded-[22px] border border-[#e2d5c4] shadow-xl">
                  <div className="flex items-center justify-between text-[9px] tracking-[0.2em] uppercase text-[#5b5a3a] font-semibold pb-1 border-b border-[#e2d5c4] mb-2">
                    <span>CEYLON TEAK PROOF</span>
                    <span>EST. 2026</span>
                  </div>
                  <p
                    className="text-base sm:text-lg text-[#3a2418] italic text-center py-0.5 leading-snug truncate"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                  >
                    &ldquo;{liveInscription || "For Amma, with endless love"}&rdquo;
                  </p>
                  <div className="flex items-center justify-between pt-1.5 text-[10px] text-[#7b6a5d] uppercase tracking-wider border-t border-[#e2d5c4]/50 mt-1.5">
                    <span>Hand-oiled Teak</span>
                    <Link
                      href="/products/teak-name-plaque/customize"
                      className="text-[#b4532f] font-semibold hover:underline"
                    >
                      Customize →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────
            2. CATALOG SECTION (Filter by Material / Occasion & Real Photos)
            ─────────────────────────────────────────────────────────── */}
        <section id="shop" className="space-y-6 pt-2">
          
          {/* Section Header */}
          <div>
            <h2
              className="text-3xl sm:text-4xl text-[#3a2418] font-medium tracking-tight mb-1"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
            >
              Catalog
            </h2>
            <p className="text-sm text-[#7b6a5d]">
              Filter by material or occasion.
            </p>
          </div>

          {/* Search Bar (Rounded 12-16px, background surface) */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b6a5d]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gifts, materials or artisans..."
              className="w-full pl-11 pr-10 py-3.5 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-sm text-[#3a2418] placeholder:text-[#7b6a5d]/70 focus:outline-none transition-colors shadow-xs"
              aria-label="Search catalog"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#7b6a5d] hover:text-[#3a2418] p-1"
                aria-label="Clear search"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Chips (Pill Buttons 99px radius) */}
          <div className="flex gap-2 flex-wrap pb-2">
            {FILTER_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setActiveFilter(chip)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border-[1.5px] ${
                  activeFilter === chip
                    ? "bg-[#3a2418] text-[#f4ede2] border-[#3a2418] shadow-xs"
                    : "bg-[#fbf7f0] text-[#7b6a5d] border-[#e2d5c4] hover:border-[#3a2418] hover:text-[#3a2418]"
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Product Grid: Soft Rounded Cards (30px radius) with Real Photography (NO EMOJIS) */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProducts.map((p) => (
                <article
                  key={p.id}
                  className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Photo Frame (Real warmly lit photography thumbnail) */}
                  <Link
                    href={`/products/${p.id}/customize`}
                    className="relative m-2 h-[200px] rounded-[24px] overflow-hidden bg-[#e2d5c4] block group"
                  >
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  {/* Card Info */}
                  <div className="p-4 pt-2 flex-1 flex flex-col gap-1.5 justify-between">
                    <div>
                      <span className="self-start inline-block bg-[#b4532f]/15 text-[#8a3a1f] rounded-[6px] px-2 py-0.5 text-xs font-bold mb-1">
                        Customizable
                      </span>
                      <h3
                        className="text-xl sm:text-[22px] font-semibold text-[#3a2418] leading-snug truncate"
                        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                      >
                        <Link href={`/products/${p.id}/customize`} className="hover:text-[#b4532f] transition-colors">
                          {p.name}
                        </Link>
                      </h3>
                      <small className="text-xs text-[#7b6a5d] block">
                        {p.artisan} · {p.material}
                      </small>
                    </div>

                    {/* Bottom Row: Price & Customize Button */}
                    <div className="pt-3 mt-2 border-t border-[#e2d5c4]/60 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[#3a2418]">
                        From LKR {p.price.toLocaleString()}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <Link
                          href={`/products/${p.id}/customize`}
                          className="bg-[#3a2418] hover:bg-[#b4532f] text-[#f4ede2] text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors"
                        >
                          Customize
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleQuickAdd(p)}
                          className={`w-7 h-7 rounded-full border border-[#e2d5c4] flex items-center justify-center transition-all cursor-pointer ${
                            addedItem === p.id
                              ? "bg-[#5f6b35] border-[#5f6b35] text-white"
                              : "text-[#7b6a5d] hover:bg-[#3a2418] hover:text-white hover:border-[#3a2418]"
                          }`}
                          aria-label={`Add ${p.name} to cart`}
                        >
                          {addedItem === p.id ? (
                            <Check className="w-3.5 h-3.5" />
                          ) : (
                            <ShoppingBag className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] py-14 text-center px-4">
              <p className="text-sm text-[#7b6a5d] mb-4">
                No gifts match your search. Clear the search or pick another filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter("All");
                  setSearchQuery("");
                }}
                className="bg-[#3a2418] text-[#f4ede2] text-xs font-bold px-5 py-2.5 rounded-full"
              >
                Reset all filters
              </button>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────
              3. DEEP RUST SECTION (#7a2410, 48px radius)
              (Lepka Ceramic School: rounded-48px, mosaic of 4 rounded photo tiles)
              ───────────────────────────────────────────────────────── */}
          <section className="mt-14 bg-[#7a2410] text-[#f4ede2] rounded-[32px] sm:rounded-[48px] p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-xl">
            {/* Subtle atmospheric organic glow */}
            <div
              className="absolute -top-20 -right-20 w-80 h-80 bg-[#b4532f] opacity-25 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Lead Statement */}
            <p
              className="max-w-[34ch] mb-8 font-normal leading-[1.2] text-2xl sm:text-3xl lg:text-[34px] ml-auto text-right"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
            >
              Every week our makers carve, throw, weave and stitch pieces that carry your words, your faces and your stories.
            </p>

            {/* Photo Collage of 4 Rounded Tiles (30px radius, Real Photography - NO EMOJIS) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-3 gap-3.5 h-auto sm:h-[360px]">
              {COLLAGE_ITEMS.map((tile) => (
                <div
                  key={tile.label}
                  className={`relative overflow-hidden rounded-[30px] min-h-[140px] sm:min-h-0 border border-white/20 shadow-md group ${tile.gridClass}`}
                >
                  <Image
                    src={tile.image}
                    alt={tile.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle gradient for text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Tile Label */}
                  <div className="absolute left-4 bottom-3 text-left">
                    <span className="text-[11px] font-mono tracking-[0.16em] uppercase text-[#fff6ea] font-medium block">
                      {tile.label}
                    </span>
                    <span className="text-[9px] text-[#f4ede2]/75 uppercase tracking-wider">
                      {tile.origin}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Caption */}
            <p className="max-w-[32ch] mt-6 opacity-90 text-sm font-light leading-relaxed">
              Warm makers, cozy workshops, and a proof that is always yours to approve.
            </p>
          </section>

          {/* ─────────────────────────────────────────────────────────
              4. TRIO OUTLINED ICON CARDS (40px radius, uppercase labels)
              (Lepka Ceramic School: border-1.5 solid #8a3a1f, color #8a3a1f, rounded-[40px])
              ───────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            
            {/* Card 1: Local Workshops */}
            <div className="border-[1.5px] border-[#8a3a1f] text-[#8a3a1f] rounded-[40px] p-7 text-center bg-[#fbf7f0]/40 hover:bg-[#fbf7f0] transition-colors flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 48 48"
                width="46"
                height="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mb-2"
              >
                <path d="M8 42V20l16-11 16 11v22zM18 42V30h12v12M20 22h8" />
              </svg>
              <b className="block mt-2 uppercase tracking-[0.08em] text-[13px] font-bold text-[#8a3a1f]">
                Made in local workshops
              </b>
              <small className="text-xs text-[#7b6a5d] mt-0.5">
                Every maker is verified
              </small>
            </div>

            {/* Card 2: Proof Before Crafting */}
            <div className="border-[1.5px] border-[#8a3a1f] text-[#8a3a1f] rounded-[40px] p-7 text-center bg-[#fbf7f0]/40 hover:bg-[#fbf7f0] transition-colors flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 48 48"
                width="46"
                height="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mb-2"
              >
                <path d="M8 12h32v28H8zM8 20h32M16 6v10M32 6v10M24 36l-6-6a3.6 3.6 0 015-5l1 1 1-1a3.6 3.6 0 015 5z" />
              </svg>
              <b className="block mt-2 uppercase tracking-[0.08em] text-[13px] font-bold text-[#8a3a1f]">
                Proof before crafting
              </b>
              <small className="text-xs text-[#7b6a5d] mt-0.5">
                Nothing starts until you approve
              </small>
            </div>

            {/* Card 3: 1–5 Days to Craft */}
            <div className="border-[1.5px] border-[#8a3a1f] text-[#8a3a1f] rounded-[40px] p-7 text-center bg-[#fbf7f0]/40 hover:bg-[#fbf7f0] transition-colors flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 48 48"
                width="46"
                height="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
                aria-hidden="true"
                className="mb-2"
              >
                <path d="M18 6h12M20 6c0 9-9 11-9 22 0 8 6 14 13 14s13-6 13-14c0-11-9-13-9-22" />
              </svg>
              <b className="block mt-2 uppercase tracking-[0.08em] text-[13px] font-bold text-[#8a3a1f]">
                1–5 days to craft
              </b>
              <small className="text-xs text-[#7b6a5d] mt-0.5">
                Track every stage live
              </small>
            </div>

          </div>

          {/* ─────────────────────────────────────────────────────────
              5. OUR PROCESS BAND (Olive / Terracotta, 48px radius)
              (Form Clay Process band with Cormorant Garamond title & stats)
              ───────────────────────────────────────────────────────── */}
          <section className="mt-14 rounded-[32px] sm:rounded-[48px] bg-[#5b5a3a] text-[#f4ede2] grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-14 shadow-lg">
            
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col justify-center items-start">
              <span className="uppercase tracking-[0.22em] text-xs font-medium text-[#e6d9b8] mb-2.5">
                Our process
              </span>

              <h2
                className="text-3xl sm:text-4xl text-[#f4ede2] font-normal leading-tight mb-3"
                style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
              >
                Rooted in natural materials.
              </h2>

              <p className="text-[#f4ede2]/85 text-sm sm:text-base leading-relaxed max-w-[44ch] mb-6 font-light">
                Every piece is shaped by a maker we know by name, from teak, clay, brass and cloth, then finished with your words.
              </p>

              <Link
                href="/artisans"
                className="bg-[#b4532f] hover:bg-[#9e4732] text-[#fff6ea] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-sm"
              >
                Meet the makers
              </Link>
            </div>

            {/* Right Column: Values */}
            <div className="lg:col-span-5 grid gap-3 content-center">
              <div className="border border-[#f4ede2]/30 p-3.5 sm:p-4 rounded-[16px] bg-black/10">
                <b
                  className="block text-2xl sm:text-3xl text-[#f4ede2] font-normal"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  1–5 days
                </b>
                <span className="text-xs text-[#f4ede2]/80 uppercase tracking-wider">
                  crafting time
                </span>
              </div>

              <div className="border border-[#f4ede2]/30 p-3.5 sm:p-4 rounded-[16px] bg-black/10">
                <b
                  className="block text-2xl sm:text-3xl text-[#f4ede2] font-normal"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  100%
                </b>
                <span className="text-xs text-[#f4ede2]/80 uppercase tracking-wider">
                  proofs approved by you
                </span>
              </div>

              <div className="border border-[#f4ede2]/30 p-3.5 sm:p-4 rounded-[16px] bg-black/10">
                <b
                  className="block text-2xl sm:text-3xl text-[#f4ede2] font-normal"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                >
                  Fair
                </b>
                <span className="text-xs text-[#f4ede2]/80 uppercase tracking-wider">
                  low commission for makers
                </span>
              </div>
            </div>

          </section>

        </section>
      </main>
    </div>
  );
}
