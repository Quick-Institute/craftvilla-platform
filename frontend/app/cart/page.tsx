"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useOrderStore } from "@/lib/store/orderStore";
import { useToastStore } from "@/lib/store/toastStore";
import { formatLKR } from "@/lib/utils";
import { useIsMounted } from "@/lib/useIsMounted";
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, CreditCard, Gift, Sparkles } from "lucide-react";

export default function CartPage() {
  const router = useRouter();
  const mounted = useIsMounted();
  const {
    items,
    removeItem,
    clearCart,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage,
    deliveryAddress,
    setDeliveryAddress,
    paymentMethod,
    setPaymentMethod,
    getSubtotal,
  } = useCartStore();

  const { user } = useAuthStore();
  const { placeOrder } = useOrderStore();
  const { showToast } = useToastStore();

  if (!mounted) {
    return (
      <div className="py-12 text-center text-[#7b6a5d]">
        <h1
          className="text-3xl font-medium text-[#8a3a1f] mb-2"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Your Bespoke Cart
        </h1>
        <p className="text-sm">Loading your custom craft items...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-8 py-4">
        {/* Empty State Banner */}
        <section
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 border border-[#e2d5c4]/70 shadow-sm text-center max-w-2xl mx-auto"
          style={{
            background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
          }}
        >
          <div className="w-16 h-16 rounded-full bg-white/70 text-[#b4532f] flex items-center justify-center mx-auto text-2xl mb-4 border border-[#e2d5c4] shadow-xs">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1
            className="text-3xl sm:text-4xl font-medium text-[#8a3a1f] mb-2"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Your Cart is Currently Empty
          </h1>
          <p className="text-[#7b6a5d] text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Pick an heirloom piece from a verified Sri Lankan craftsperson, add a bespoke inscription or etched photo, and watch the proof appear live.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/catalog"
              className="bg-[#b4532f] hover:bg-[#9e4732] text-[#fff6ea] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products/teak-name-plaque/customize"
              className="bg-transparent hover:bg-white/60 border-[1.5px] border-[#3a2418]/30 hover:border-[#3a2418] text-[#3a2418] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all"
            >
              Personalize a Gift
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const packagingFee = giftWrap ? 350 : 0;
  const deliveryFee = 450;
  const total = subtotal + packagingFee + deliveryFee;
  const installmentPerMonth = Math.round(total / 3);

  const handlePayAndPlaceOrder = () => {
    if (!user) {
      showToast("Please sign in to place your bespoke order");
      router.push("/login?redirect=cart");
      return;
    }

    if (!deliveryAddress.trim()) {
      showToast("Please add your delivery address");
      document.getElementById("addr")?.focus();
      return;
    }

    const orderName =
      items[0].name + (items.length > 1 ? ` +${items.length - 1} more` : "");

    const newOrder = placeOrder({
      name: orderName,
      items: [...items],
      subtotal,
      packagingFee,
      deliveryFee,
      total,
      deliveryAddress: deliveryAddress.trim(),
      customerName: user.name,
      customerEmail: user.email,
      giftWrap,
      giftMessage: giftMessage.trim() || undefined,
      paymentMethod,
    });

    clearCart();
    showToast(`Order #${newOrder.code} placed successfully!`);
    router.push(`/track/${newOrder.code}`);
  };

  return (
    <div className="space-y-8">
      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL HERO BANNER (Matches Home Page Hero Aesthetic)
          ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 border border-[#e2d5c4]/70 shadow-sm"
        style={{
          background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
        }}
      >
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-semibold text-[#5b5a3a] mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#b4532f]" />
            <span>Secure Bespoke Bag</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-2"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Your Bespoke Cart
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            Review your customized inscriptions, approved digital proofs, packaging options, and island-wide delivery address.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CART ITEMS & ORDER SUMMARY SPLIT
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Itemized Cart Review */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2d5c4]">
              <h2
                className="text-2xl font-semibold text-[#3a2418]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Customized Items ({items.length})
              </h2>
              <span className="text-xs text-[#5f6b35] font-semibold flex items-center gap-1 bg-[#5f6b35]/10 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Digital Proofs Approved</span>
              </span>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-[22px] border border-[#e2d5c4] bg-white/70 flex flex-col sm:flex-row gap-4 justify-between items-start"
                >
                  <div className="flex gap-3.5 items-start">
                    {item.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.imageUrl}
                        alt="Custom Proof"
                        className="w-16 h-16 rounded-[16px] object-cover border border-[#e2d5c4] filter sepia-[0.3] shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-[16px] bg-[#eadccb] border border-[#e2d5c4] flex items-center justify-center text-2xl shrink-0">
                        🎨
                      </div>
                    )}

                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-[#3a2418]">
                        {item.name} <span className="text-xs text-[#7b6a5d] font-normal">× {item.qty}</span>
                      </h3>
                      <p className="text-xs text-[#3a2418] bg-[#f4ede2] px-3 py-1 rounded-[12px] border border-[#e2d5c4]">
                        <b>Inscription:</b> &ldquo;{item.text}&rdquo;
                      </p>
                      <p className="text-[11px] text-[#7b6a5d]">
                        Finish: <span className="font-semibold text-[#3a2418]">{item.finish}</span> · Font: {item.font || "Artisanal"}
                      </p>
                    </div>
                  </div>

                  <div className="sm:text-right flex sm:flex-col justify-between w-full sm:w-auto items-center sm:items-end pt-2 sm:pt-0 border-t sm:border-0 border-[#e2d5c4]">
                    <span className="font-bold text-sm text-[#3a2418]">
                      {formatLKR(item.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 mt-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Eco-Friendly Packaging Toggle */}
            <div className="pt-4 border-t border-[#e2d5c4] space-y-4">
              <label className="flex items-start gap-3 p-4 rounded-[20px] border border-[#e2d5c4] bg-[#f4ede2]/60 cursor-pointer">
                <input
                  type="checkbox"
                  id="wrap"
                  checked={giftWrap}
                  onChange={(e) => setGiftWrap(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-[#b4532f]"
                />
                <div>
                  <b className="text-xs text-[#3a2418] flex items-center gap-1.5">
                    <Gift className="w-4 h-4 text-[#b4532f]" />
                    <span>Eco-friendly gift wrapping with wax seal &amp; botanical twine (+ LKR 350)</span>
                  </b>
                  <p className="text-[11px] text-[#7b6a5d] mt-0.5 leading-relaxed">
                    Hand-wrapped using recycled craft pulp paper, cinnamon bark scent, and dried floral sprigs.
                  </p>
                </div>
              </label>

              <div>
                <label htmlFor="msg" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                  Handwritten Card Message (Optional)
                </label>
                <textarea
                  id="msg"
                  rows={2}
                  maxLength={120}
                  placeholder="Message inscribed on unbleached cotton rag card..."
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] placeholder:text-[#7b6a5d]/70 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="addr" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                  Recipient Delivery Address (Sri Lanka)
                </label>
                <textarea
                  id="addr"
                  rows={2}
                  placeholder="Street address, apartment, city, and postal district (e.g. 14 Flower Road, Colombo 07)"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                  className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] placeholder:text-[#7b6a5d]/70 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="pay" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                  Payment Preference
                </label>
                <select
                  id="pay"
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value as "Card" | "Digital wallet" | "Bank slip upload"
                    )
                  }
                  className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none transition-colors"
                >
                  <option value="Card">Credit / Debit Card (Visa, MasterCard, Amex)</option>
                  <option value="Digital wallet">Digital Wallet (FriMi, Genie, eZ Cash)</option>
                  <option value="Bank slip upload">Direct Bank Transfer Slip Upload</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Installment Panel */}
        <div className="lg:col-span-5 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-5 shadow-xs lg:sticky lg:top-24">
          <h2
            className="text-2xl font-semibold text-[#3a2418] pb-3 border-b border-[#e2d5c4]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Order Summary
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 text-[#7b6a5d]">
              <span>Subtotal ({items.length} crafts)</span>
              <span className="font-semibold text-[#3a2418]">{formatLKR(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center py-1 text-[#7b6a5d]">
              <span>Eco-Friendly Gift Wrap</span>
              <span className="font-semibold text-[#3a2418]">{formatLKR(packagingFee)}</span>
            </div>
            <div className="flex justify-between items-center py-1 text-[#7b6a5d]">
              <span>Island-wide Courier Transit</span>
              <span className="font-semibold text-[#3a2418]">{formatLKR(deliveryFee)}</span>
            </div>
            <div className="pt-3 border-t border-[#e2d5c4] flex justify-between items-center">
              <span className="font-bold text-sm text-[#3a2418]">Total Payable</span>
              <span className="text-xl font-bold text-[#8a3a1f]">{formatLKR(total)}</span>
            </div>
          </div>

          {/* 3-Month Installment Pill Callout */}
          <div className="p-4 rounded-[20px] bg-white/80 border border-[#e2d5c4] text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#3a2418]">
              <CreditCard className="w-3.5 h-3.5 text-[#b4532f]" />
              <span>3-Month Interest-Free Installments</span>
            </div>
            <p className="text-[11px] text-[#7b6a5d] leading-relaxed">
              Or pay <b>3 monthly installments of {formatLKR(installmentPerMonth)}</b> using Koko or Mintpay.
            </p>
          </div>

          <button
            type="button"
            className="w-full bg-[#b4532f] hover:bg-[#9e4732] text-[#fff6ea] font-bold text-sm py-3.5 px-6 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            onClick={handlePayAndPlaceOrder}
          >
            <span>Pay &amp; Place Bespoke Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/checkout"
            className="w-full bg-transparent hover:bg-white/60 border-[1.5px] border-[#3a2418]/30 hover:border-[#3a2418] text-[#3a2418] font-bold text-xs py-2.5 px-4 rounded-full transition-all flex items-center justify-center gap-1.5"
          >
            <span>Proceed to Dedicated Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <p className="text-[11px] text-[#7b6a5d] text-center pt-1">
            🔒 256-bit SSL encrypted checkout. Bespoke items are hand-carved upon proof verification.
          </p>
        </div>
      </div>
    </div>
  );
}
