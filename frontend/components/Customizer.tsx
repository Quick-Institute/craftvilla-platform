"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { FINISHES, FONTS } from "@/lib/data";
import { formatLKR } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cartStore";
import { useToastStore } from "@/lib/store/toastStore";
import PlaquePreview from "./PlaquePreview";
import { UploadCloud, CheckCircle2, Clock, Sparkles, AlertCircle, ArrowRight } from "lucide-react";

interface CustomizerProps {
  product: Product;
}

const DIMENSION_OPTIONS = [
  { id: "standard", label: "Standard Size (30 × 20 cm)", priceDelta: 0 },
  { id: "grand", label: "Grand Keepsake (45 × 30 cm) · +LKR 950", priceDelta: 950 },
  { id: "compact", label: "Compact Desk (20 × 15 cm) · -LKR 400", priceDelta: -400 },
];

export default function Customizer({ product }: CustomizerProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { showToast } = useToastStore();

  const [text, setText] = useState<string>("For Amma, with endless love");
  const [selectedFont, setSelectedFont] = useState<string>(FONTS[0].family);
  const [selectedFinishIndex, setSelectedFinishIndex] = useState<number>(0);
  const [selectedDimension, setSelectedDimension] = useState(DIMENSION_OPTIONS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageNote, setImageNote] = useState<{
    text: string;
    type: "neutral" | "bad" | "good";
  }>({
    text: "Minimum 600 × 600 px for crisp laser etching.",
    type: "neutral",
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [proofApproved, setProofApproved] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const selectedFinish = FINISHES[selectedFinishIndex];

  // Pricing calculations
  const photoAddon = uploadedImage ? 600 : 0;
  const textAddon = text.trim() ? 400 : 0;
  const basePriceWithDim = Math.max(product.basePrice + selectedDimension.priceDelta, 1000);
  const unitPrice = basePriceWithDim + photoAddon + textAddon;
  const totalPrice = unitPrice * quantity;

  // Calculated lead time based on customizations
  const calculatedLeadDays = product.leadTimeDays + (uploadedImage ? 1 : 0);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setProofApproved(false);
  };

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(e.target.value);
    setProofApproved(false);
  };

  const handleFinishSelect = (index: number) => {
    setSelectedFinishIndex(index);
    setProofApproved(false);
  };

  const handleDimensionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = DIMENSION_OPTIONS.find((d) => d.id === e.target.value) || DIMENSION_OPTIONS[0];
    setSelectedDimension(found);
    setProofApproved(false);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new window.Image();
      img.onload = () => {
        if (img.width < 600 || img.height < 600) {
          setImageNote({
            text: `Image resolution too small (${img.width} × ${img.height} px). Minimum required: 600 × 600 px.`,
            type: "bad",
          });
          setUploadedImage(null);
        } else {
          setImageNote({
            text: `High clarity resolution (${img.width} × ${img.height} px) verified for laser engraving.`,
            type: "good",
          });
          setUploadedImage(reader.result as string);
        }
        setProofApproved(false);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleApproveProof = () => {
    if (!text.trim() && !uploadedImage) {
      showToast("Enter custom inscription or upload reference artwork first");
      return;
    }
    setProofApproved(true);
    showToast("Digital proof approved ✓");
  };

  const handleAddToCart = () => {
    if (!proofApproved) return;

    const fontObj = FONTS.find((f) => f.family === selectedFont) || FONTS[0];

    addItem({
      id: "cart-" + Date.now(),
      productId: product.id,
      name: product.name,
      text: text.trim() || "(Custom Proof Image Etching)",
      font: fontObj.name,
      finish: `${selectedFinish.name} (${selectedDimension.label.split(" (")[0]})`,
      qty: quantity,
      price: totalPrice,
      imageUrl: uploadedImage,
      proofApproved: true,
    });

    showToast("Added bespoke craft to cart");
    router.push("/cart");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* ─────────────────────────────────────────────────────────────
          LEFT COLUMN: LIVE 1:1 RENDERING CANVAS (Sticky Preview)
          ───────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
        <div className="flex items-center justify-between text-xs text-[#7b6a5d] px-1">
          <span className="font-semibold uppercase tracking-wider text-[#3a2418] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#b4532f]" />
            <span>Live 1:1 Proof Canvas</span>
          </span>
          <span className="bg-[#fbf7f0] border border-[#e2d5c4] px-3 py-1 rounded-full font-medium">
            {selectedDimension.label.split(" · ")[0]}
          </span>
        </div>

        {/* Live Plaque Canvas */}
        <PlaquePreview
          text={text}
          fontFamily={selectedFont}
          finish={selectedFinish}
          imageUrl={uploadedImage}
        />

        {/* Info Pill Card */}
        <div className="bg-[#fbf7f0] border border-[#e2d5c4] text-xs text-[#7b6a5d] flex items-center justify-between p-4 rounded-[20px] shadow-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#b4532f]" />
            <span>
              Estimated Crafting: <b className="text-[#3a2418]">{calculatedLeadDays} business days</b>
            </span>
          </div>
          <span className="text-[#5f6b35] font-semibold">
            100% Plantation Timber
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          RIGHT COLUMN: CONTROL PANEL SPECIFICATIONS (Soft Rounded Card)
          ───────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-6 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-5 shadow-xs">
        <h2
          className="text-2xl font-semibold text-[#3a2418] pb-3 border-b border-[#e2d5c4]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Customization Studio
        </h2>

        {/* Dimension Select */}
        <div>
          <label htmlFor="dim" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
            Heirloom Dimensions
          </label>
          <select
            id="dim"
            value={selectedDimension.id}
            onChange={handleDimensionChange}
            className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none transition-colors"
          >
            {DIMENSION_OPTIONS.map((dim) => (
              <option key={dim.id} value={dim.id}>
                {dim.label}
              </option>
            ))}
          </select>
        </div>

        {/* Inscription Text Input */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="txt" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-0">
              Custom Inscription Text
            </label>
            <span className="text-xs text-[#7b6a5d]">
              <b className={text.length >= 40 ? "text-red-500" : "text-[#3a2418]"}>
                {text.length}
              </b>
              /40 chars
            </span>
          </div>
          <div className="flex items-center bg-[#f4ede2] px-3.5 py-2.5 rounded-[16px] border border-[#e2d5c4] focus-within:border-[#b4532f] shadow-xs">
            <Sparkles className="w-4 h-4 text-[#b4532f] mr-2 shrink-0" />
            <input
              type="text"
              id="txt"
              value={text}
              onChange={handleTextChange}
              maxLength={40}
              placeholder="e.g. For Amma, with endless love"
              className="w-full text-xs text-[#3a2418] bg-transparent focus:outline-none border-none p-0 font-sans"
            />
          </div>
        </div>

        {/* Font Style Selector */}
        <div>
          <label htmlFor="font" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
            Inscription Font Style
          </label>
          <select
            id="font"
            value={selectedFont}
            onChange={handleFontChange}
            className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none transition-colors"
          >
            {FONTS.map((font) => (
              <option key={font.id} value={font.family}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        {/* Wood Finish Stain Swatches */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d]">
              Material Stain &amp; Finish
            </span>
            <span className="text-xs font-semibold text-[#3a2418]">
              {selectedFinish.name} Stain
            </span>
          </div>
          <div className="flex gap-2.5" role="radiogroup" aria-label="Wood finish swatches">
            {FINISHES.map((finish, idx) => (
              <button
                key={finish.id}
                type="button"
                role="radio"
                aria-checked={selectedFinishIndex === idx}
                aria-label={`${finish.name} stain`}
                onClick={() => handleFinishSelect(idx)}
                className={`w-9 h-9 rounded-full border-2 transition-all cursor-pointer shadow-xs ${
                  selectedFinishIndex === idx
                    ? "ring-2 ring-[#3a2418] ring-offset-2 scale-105"
                    : "border-white/80 hover:scale-105"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${finish.startColor}, ${finish.endColor})`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Image Dropzone Upload */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
            Reference Photo or Crest (Optional +LKR 600)
          </label>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-[20px] p-4 text-center cursor-pointer transition-colors ${
              isDragging
                ? "border-[#b4532f] bg-[#b4532f]/5"
                : "border-[#e2d5c4] hover:border-[#3a2418] bg-white/50"
            }`}
            onClick={() => document.getElementById("img")?.click()}
          >
            <UploadCloud className="w-6 h-6 text-[#b4532f] mx-auto mb-1" />
            <p className="text-xs font-bold text-[#3a2418]">
              {uploadedImage ? "✓ Artwork attached! Click to change" : "Click to browse or drop reference photo"}
            </p>
            <p className="text-[11px] text-[#7b6a5d] mt-0.5">
              JPG or PNG (Min 600 × 600 px for laser etching)
            </p>
            <input
              type="file"
              id="img"
              accept="image/png,image/jpeg"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div
            className={`mt-1.5 flex items-center gap-1.5 text-xs ${
              imageNote.type === "bad"
                ? "text-red-600 font-semibold"
                : imageNote.type === "good"
                ? "text-[#5f6b35] font-semibold"
                : "text-[#7b6a5d]"
            }`}
          >
            {imageNote.type === "bad" ? (
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            ) : imageNote.type === "good" ? (
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            ) : null}
            <span>{imageNote.text}</span>
          </div>
        </div>

        {/* Quantity Select */}
        <div>
          <label htmlFor="qty" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
            Quantity
          </label>
          <select
            id="qty"
            value={quantity}
            onChange={handleQuantityChange}
            className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none transition-colors"
          >
            <option value={1}>1 bespoke piece</option>
            <option value={2}>2 bespoke pieces</option>
            <option value={3}>3 bespoke pieces</option>
            <option value={4}>4 bespoke pieces</option>
            <option value={5}>5 bespoke pieces</option>
          </select>
        </div>

        {/* Price Breakdown */}
        <div className="pt-3 border-t border-[#e2d5c4] flex justify-between items-center">
          <div>
            <span className="block text-xs font-bold text-[#7b6a5d] uppercase tracking-wider">
              Calculated Total
            </span>
            <span className="text-[11px] text-[#7b6a5d]">
              Base {formatLKR(basePriceWithDim)} {text ? "+ Text LKR 400" : ""} {uploadedImage ? "+ Photo LKR 600" : ""}
            </span>
          </div>
          <span className="text-2xl font-bold text-[#8a3a1f]">
            {formatLKR(totalPrice)}
          </span>
        </div>

        {/* Actions: Approve Proof Pill then Add to Cart Pill */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            className={`w-full py-3 px-6 rounded-full text-xs font-bold border-[1.5px] transition-all cursor-pointer flex items-center justify-center gap-2 ${
              proofApproved
                ? "bg-[#5f6b35] text-white border-[#5f6b35] shadow-xs"
                : "bg-transparent hover:bg-white/60 border-[#3a2418]/30 hover:border-[#3a2418] text-[#3a2418]"
            }`}
            onClick={handleApproveProof}
            aria-pressed={proofApproved}
          >
            {proofApproved ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Digital Proof Approved ✓</span>
              </>
            ) : (
              <span>Review &amp; Approve Proof Preview</span>
            )}
          </button>

          <button
            type="button"
            disabled={!proofApproved}
            onClick={handleAddToCart}
            className="w-full bg-[#b4532f] hover:bg-[#9e4732] disabled:opacity-50 text-[#fff6ea] font-bold text-sm py-3.5 px-6 rounded-full transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Add to Cart</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="text-center text-[11px] text-[#7b6a5d]">
            {proofApproved
              ? "Proof locked. Artisan workshop will receive your exact inscription upon checkout."
              : "Please approve your digital proof preview above to unlock Add to Cart."}
          </p>
        </div>
      </div>
    </div>
  );
}
