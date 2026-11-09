"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PRODUCTS, HAMPER_PRESETS } from "@/lib/data";
import { formatLKR } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cartStore";
import { useToastStore } from "@/lib/store/toastStore";
import { Gift, Check, Feather, Sparkles, ArrowRight } from "lucide-react";

const BOX_TYPES = [
  {
    id: "pine",
    name: "Pine Wood Keepsake Box",
    price: 800,
    tagline: "Solid pine with sliding lid and aromatic wood shavings lining.",
    emoji: "📦",
  },
  {
    id: "eco-kraft",
    name: "Eco-Kraft Artisanal Box",
    price: 550,
    tagline: "100% recycled biodegradable unbleached board with coconut fiber cushion.",
    emoji: "🌿",
  },
  {
    id: "lacquer",
    name: "Luxury Lacquer Teak Box",
    price: 1500,
    tagline: "High-gloss hand-burnished traditional lacquer finish with brass latch.",
    emoji: "✨",
  },
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

export default function HampersPage() {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();

  const [selectedBox, setSelectedBox] = useState(BOX_TYPES[0]);
  const [selectedProductIndices, setSelectedProductIndices] = useState<Set<number>>(
    new Set([1, 3, 5]) // Initial Birthday preset
  );
  const [waxSealWrap, setWaxSealWrap] = useState<boolean>(true);
  const [cardMessage, setCardMessage] = useState<string>("Wishing you joy and wonderful moments!");

  const toggleProduct = (index: number) => {
    setSelectedProductIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (next.size >= 4) {
          showToast("Maximum 4 crafts in a single keepsake box");
          return prev;
        }
        next.add(index);
      }
      return next;
    });
  };

  const applyPreset = (presetName: string) => {
    const indices = HAMPER_PRESETS[presetName] || [];
    setSelectedProductIndices(new Set(indices));
    showToast(`${presetName} bundle loaded`);
  };

  const itemsSubtotal = Array.from(selectedProductIndices).reduce(
    (acc, idx) => acc + (PRODUCTS[idx]?.basePrice || 0),
    0
  );

  const waxSealPrice = waxSealWrap ? 350 : 0;
  const totalHamperPrice =
    selectedProductIndices.size > 0
      ? itemsSubtotal + selectedBox.price + waxSealPrice
      : 0;

  const handleAddHamper = () => {
    if (selectedProductIndices.size < 2) {
      showToast("Please bundle at least 2 artisan crafts");
      return;
    }

    const itemNames = Array.from(selectedProductIndices).map(
      (idx) => PRODUCTS[idx].name
    );

    const finishDesc = `${selectedBox.name}${waxSealWrap ? " + Red Wax Seal" : ""}`;

    addItem({
      id: "hamper-" + Date.now(),
      productId: "hamper-custom",
      name: "Curated Artisan Gift Hamper",
      text: `${itemNames.join(", ")}${cardMessage ? ` · Note: "${cardMessage}"` : ""}`,
      font: "Handwritten Script",
      finish: finishDesc,
      qty: 1,
      price: totalHamperPrice,
      isHamper: true,
      hamperItems: itemNames,
      proofApproved: true,
    });

    showToast("Curated hamper added to cart!");
    router.push("/cart");
  };

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
            <Gift className="w-3.5 h-3.5 text-[#b4532f]" />
            <span>Curated Gift Box Builder</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Build a Sri Lankan Artisan Hamper
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed mb-5">
            Bundle authentic handcrafted pieces into a luxury presentation box with personal handwritten notes, botanical twine, and lion wax seals.
          </p>

          {/* Quick Preset Pills */}
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              className="bg-[#fbf7f0] hover:bg-white text-[#3a2418] border border-[#e2d5c4] px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs cursor-pointer transition-all"
              onClick={() => applyPreset("Birthday")}
            >
              🎁 Birthday Celebration
            </button>
            <button
              type="button"
              className="bg-[#fbf7f0] hover:bg-white text-[#3a2418] border border-[#e2d5c4] px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs cursor-pointer transition-all"
              onClick={() => applyPreset("Anniversary")}
            >
              ❤️ Heritage Anniversary
            </button>
            <button
              type="button"
              className="bg-[#fbf7f0] hover:bg-white text-[#3a2418] border border-[#e2d5c4] px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs cursor-pointer transition-all"
              onClick={() => applyPreset("Corporate")}
            >
              💼 Executive Corporate
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3-STEP BUILDER CONTAINERS (Soft Rounded Cards)
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-8">
        {/* STEP 1: Select Box Type */}
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#b4532f] text-white font-bold text-xs flex items-center justify-center shrink-0">
              1
            </span>
            <h2
              className="text-2xl font-semibold text-[#3a2418]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Select Keepsake Box Container
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BOX_TYPES.map((box) => {
              const isSelected = selectedBox.id === box.id;
              return (
                <div
                  key={box.id}
                  onClick={() => setSelectedBox(box)}
                  className={`p-5 rounded-[22px] border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-[#b4532f] bg-white shadow-md"
                      : "border-[#e2d5c4] bg-[#f4ede2]/50 hover:border-[#3a2418]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-2xl mb-2">
                      <span>{box.emoji}</span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#b4532f] text-white flex items-center justify-center text-xs">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-[#3a2418]">{box.name}</h3>
                    <p className="text-xs text-[#7b6a5d] mt-1.5 leading-relaxed">
                      {box.tagline}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#e2d5c4] font-bold text-xs text-[#3a2418]">
                    {formatLKR(box.price)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 2: Multi-Item Craft Selection Tray */}
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#b4532f] text-white font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <h2
                className="text-2xl font-semibold text-[#3a2418]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Choose Artisan Crafts ({selectedProductIndices.size} of 4 Selected)
              </h2>
            </div>
            <span className="text-xs text-[#7b6a5d]">
              Pick 2 to 4 handmade pieces to fill the keepsake presentation tray.
            </span>
          </div>

          {/* Tray Grid with Real Photography */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {PRODUCTS.map((product, idx) => {
              const isSelected = selectedProductIndices.has(idx);
              const imageUrl = PRODUCT_IMAGE_MAP[product.id] || "/editorial/hero.jpg";

              return (
                <div
                  key={product.id}
                  onClick={() => toggleProduct(idx)}
                  className={`p-3 rounded-[20px] border-2 cursor-pointer transition-all flex items-center gap-3 ${
                    isSelected
                      ? "border-[#b4532f] bg-white shadow-xs"
                      : "border-[#e2d5c4] bg-[#f4ede2]/40 hover:border-[#3a2418]"
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-[14px] overflow-hidden bg-[#e2d5c4] shrink-0">
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-[#3a2418] truncate">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-[#7b6a5d]">
                      {formatLKR(product.basePrice)}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                      isSelected
                        ? "bg-[#b4532f] text-white border-[#b4532f]"
                        : "border-[#e2d5c4] text-transparent"
                    }`}
                  >
                    ✓
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 3: Handwritten Greeting Note & Wax Seal Packaging */}
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-5 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-[#b4532f] text-white font-bold text-xs flex items-center justify-center shrink-0">
              3
            </span>
            <h2
              className="text-2xl font-semibold text-[#3a2418]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Packaging Embellishments &amp; Greeting Note
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Handwritten Note Area */}
            <div className="md:col-span-7 space-y-2">
              <label
                htmlFor="card-msg"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7b6a5d]"
              >
                <Feather className="w-3.5 h-3.5 text-[#b4532f]" />
                <span>Handwritten Calligraphy Card Inscription</span>
              </label>
              <textarea
                id="card-msg"
                rows={4}
                maxLength={150}
                placeholder="Write your personal message. Our calligrapher writes this with dip pen inside the keepsake box..."
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                className="w-full text-xs p-4 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[18px] text-[#3a2418] placeholder:text-[#7b6a5d]/70 focus:outline-none transition-colors"
              />
              <span className="text-[11px] text-[#7b6a5d] block">
                {cardMessage.length}/150 characters · Inscribed on handmade Ceylon cotton rag paper
              </span>

              {/* Botanical Twine & Wax Seal Checkbox */}
              <label className="flex items-start gap-3 p-4 rounded-[20px] border border-[#e2d5c4] bg-[#f4ede2]/60 cursor-pointer mt-4">
                <input
                  type="checkbox"
                  checked={waxSealWrap}
                  onChange={(e) => setWaxSealWrap(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#b4532f]"
                />
                <div>
                  <b className="text-xs text-[#3a2418] block">
                    Botanical Twine &amp; Red Wax Seal (+ LKR 350)
                  </b>
                  <p className="text-[11px] text-[#7b6a5d] mt-0.5">
                    Sealed by hand with CraftVilla lion insignia wax seal and natural coconut husk ribbon.
                  </p>
                </div>
              </label>
            </div>

            {/* Right: Hamper Summary & Add to Cart */}
            <div className="md:col-span-5 bg-white/80 backdrop-blur-xs p-6 rounded-[24px] border border-[#e2d5c4] shadow-sm space-y-3">
              <h3
                className="text-xl font-semibold text-[#3a2418] pb-2 border-b border-[#e2d5c4]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Hamper Summary
              </h3>

              <div className="flex justify-between items-center text-xs text-[#7b6a5d]">
                <span>Hamper Items ({selectedProductIndices.size})</span>
                <span className="font-semibold text-[#3a2418]">{formatLKR(itemsSubtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#7b6a5d]">
                <span>{selectedBox.name}</span>
                <span className="font-semibold text-[#3a2418]">{formatLKR(selectedBox.price)}</span>
              </div>
              {waxSealWrap && (
                <div className="flex justify-between items-center text-xs text-[#7b6a5d]">
                  <span>Wax Seal &amp; Ribbon</span>
                  <span className="font-semibold text-[#3a2418]">{formatLKR(350)}</span>
                </div>
              )}

              <div className="pt-3 mt-3 border-t border-[#e2d5c4] flex justify-between items-center">
                <span className="font-bold text-sm text-[#3a2418]">Total Hamper</span>
                <span className="text-xl font-bold text-[#8a3a1f]">
                  {formatLKR(totalHamperPrice)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddHamper}
                disabled={selectedProductIndices.size < 2}
                className="w-full bg-[#b4532f] hover:bg-[#9e4732] disabled:opacity-50 text-[#fff6ea] font-bold text-sm py-3.5 px-6 rounded-full transition-all shadow-md mt-3 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Add Custom Hamper to Cart</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
