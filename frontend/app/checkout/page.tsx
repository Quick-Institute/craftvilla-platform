"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useOrderStore } from "@/lib/store/orderStore";
import { useToastStore } from "@/lib/store/toastStore";
import { formatLKR } from "@/lib/utils";
import { useIsMounted } from "@/lib/useIsMounted";
import { CreditCard, UploadCloud, ShieldCheck, CheckCircle2, Building, Sparkles, Gift, ArrowRight } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const mounted = useIsMounted();
  const {
    items,
    clearCart,
    giftWrap,
    setGiftWrap,
    giftMessage,
    setGiftMessage,
    deliveryAddress,
    setDeliveryAddress,
    setPaymentMethod,
    getSubtotal,
  } = useCartStore();

  const { user } = useAuthStore();
  const { placeOrder } = useOrderStore();
  const { showToast } = useToastStore();

  const [bankSlipRef, setBankSlipRef] = useState("");
  const [bankSlipUploaded, setBankSlipUploaded] = useState(false);
  const [installmentPlan, setInstallmentPlan] = useState<"koko" | "mintpay">("koko");
  const [selectedGateway, setSelectedGateway] = useState<"card" | "installments" | "bank">("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recipientDistrict, setRecipientDistrict] = useState("Colombo");

  if (!mounted) {
    return (
      <div className="py-12 text-center text-[#7b6a5d]">
        <h1
          className="text-3xl font-medium text-[#8a3a1f] mb-2"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Secure Bespoke Checkout
        </h1>
        <p className="text-sm">Loading secure payment gateway...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-8 py-4">
        <section
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 border border-[#e2d5c4]/70 shadow-sm text-center max-w-lg mx-auto"
          style={{
            background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
          }}
        >
          <h1
            className="text-3xl font-medium text-[#8a3a1f] mb-2"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Bespoke Checkout
          </h1>
          <p className="text-sm text-[#7b6a5d] mb-6">
            No bespoke crafts in cart to checkout.
          </p>
          <Link
            href="/catalog"
            className="bg-[#b4532f] hover:bg-[#9e4732] text-[#fff6ea] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Browse All Crafts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const packagingFee = giftWrap ? 350 : 0;
  const deliveryFee = 450;
  const total = subtotal + packagingFee + deliveryFee;
  const monthlyInstallment = Math.round(total / 3);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      showToast("Please sign in to place your order");
      router.push("/login?redirect=checkout");
      return;
    }

    if (!deliveryAddress.trim()) {
      showToast("Please provide a recipient delivery address");
      document.getElementById("checkout-addr")?.focus();
      return;
    }

    setIsSubmitting(true);

    const orderName =
      items[0].name + (items.length > 1 ? ` +${items.length - 1} more` : "");

    const finalPaymentMethod =
      selectedGateway === "card"
        ? "Card"
        : selectedGateway === "installments"
        ? "Digital wallet"
        : "Bank slip upload";

    setTimeout(() => {
      const newOrder = placeOrder({
        name: orderName,
        items: [...items],
        subtotal,
        packagingFee,
        deliveryFee,
        total,
        deliveryAddress: `${deliveryAddress.trim()}, ${recipientDistrict} District`,
        customerName: user.name,
        customerEmail: user.email,
        giftWrap,
        giftMessage: giftMessage.trim() || undefined,
        paymentMethod: finalPaymentMethod,
      });

      clearCart();
      setIsSubmitting(false);
      showToast(`Order #${newOrder.code} confirmed! Milestone tracking activated.`);
      router.push(`/track/${newOrder.code}`);
    }, 500);
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
            <ShieldCheck className="w-3.5 h-3.5 text-[#5f6b35]" />
            <span>PayHere &amp; Bank Verified Gateway</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-2"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Finalize Bespoke Order
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            Verify recipient shipping details, artisanal packaging, and select your preferred Sri Lankan payment method.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CHECKOUT SPLIT LAYOUT
          ───────────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-7 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Section 1: Delivery Details */}
          <div>
            <h2
              className="text-xl font-semibold text-[#3a2418] pb-2 border-b border-[#e2d5c4] mb-4"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              1. Recipient &amp; Delivery Address
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor="customer-name" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  id="customer-name"
                  defaultValue={user?.name || "Shopper"}
                  readOnly
                  className="w-full text-xs py-2.5 px-3 bg-[#f4ede2] border-[1.5px] border-[#e2d5c4] rounded-[14px] text-[#3a2418] opacity-80"
                />
              </div>
              <div>
                <label htmlFor="customer-email" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                  Confirmation Email
                </label>
                <input
                  type="email"
                  id="customer-email"
                  defaultValue={user?.email || "shopper@craftvilla.lk"}
                  readOnly
                  className="w-full text-xs py-2.5 px-3 bg-[#f4ede2] border-[1.5px] border-[#e2d5c4] rounded-[14px] text-[#3a2418] opacity-80"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div className="sm:col-span-2">
                <label htmlFor="checkout-addr" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                  Street Address &amp; House No.
                </label>
                <input
                  type="text"
                  id="checkout-addr"
                  placeholder="e.g. 45/2 Peradeniya Road"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                  className="w-full text-xs py-2.5 px-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[14px] text-[#3a2418] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="district" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                  Postal District
                </label>
                <select
                  id="district"
                  value={recipientDistrict}
                  onChange={(e) => setRecipientDistrict(e.target.value)}
                  className="w-full text-xs py-2.5 px-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[14px] text-[#3a2418] focus:outline-none"
                >
                  <option value="Colombo">Colombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Galle">Galle</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Matara">Matara</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Jaffna">Jaffna</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Eco-friendly Gift Wrap & Card */}
          <div>
            <h2
              className="text-xl font-semibold text-[#3a2418] pb-2 border-b border-[#e2d5c4] mb-4"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              2. Packaging &amp; Handwritten Inscription
            </h2>

            <label className="flex items-start gap-3 p-4 rounded-[20px] border border-[#e2d5c4] bg-[#f4ede2]/60 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#b4532f]"
              />
              <div>
                <b className="text-xs text-[#3a2418] flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#b4532f]" />
                  <span>Eco-Friendly Kraft Packaging &amp; Red Wax Seal (+ LKR 350)</span>
                </b>
                <p className="text-[11px] text-[#7b6a5d] mt-0.5 leading-relaxed">
                  Artisanal unbleached recycled board, cinnamon aroma cushion, and stamped insignia wax.
                </p>
              </div>
            </label>

            <div>
              <label htmlFor="checkout-msg" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                Greeting Card Inscription (Optional)
              </label>
              <textarea
                id="checkout-msg"
                rows={2}
                maxLength={120}
                placeholder="Message inscribed by our studio calligrapher on unbleached card..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] placeholder:text-[#7b6a5d]/70 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Section 3: Multi-Gateway Checkout */}
          <div>
            <h2
              className="text-xl font-semibold text-[#3a2418] pb-2 border-b border-[#e2d5c4] mb-4"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              3. Payment Gateway Selection
            </h2>

            {/* Gateway Selector Tabs (Rounded Pill Cards) */}
            <div className="grid grid-cols-3 gap-2.5 mb-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedGateway("card");
                  setPaymentMethod("Card");
                }}
                className={`p-3.5 rounded-[20px] border-2 text-left transition-all cursor-pointer ${
                  selectedGateway === "card"
                    ? "border-[#b4532f] bg-white font-bold shadow-xs"
                    : "border-[#e2d5c4] bg-[#f4ede2]/50 hover:border-[#3a2418]"
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#b4532f] mb-1" />
                <p className="text-xs text-[#3a2418]">PayHere Card</p>
                <p className="text-[10px] text-[#7b6a5d]">Visa / Master / Amex</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedGateway("installments");
                  setPaymentMethod("Digital wallet");
                }}
                className={`p-3.5 rounded-[20px] border-2 text-left transition-all cursor-pointer ${
                  selectedGateway === "installments"
                    ? "border-[#b4532f] bg-white font-bold shadow-xs"
                    : "border-[#e2d5c4] bg-[#f4ede2]/50 hover:border-[#3a2418]"
                }`}
              >
                <Sparkles className="w-5 h-5 text-[#b4532f] mb-1" />
                <p className="text-xs text-[#3a2418]">3-Mo Installments</p>
                <p className="text-[10px] text-[#7b6a5d]">Koko / Mintpay</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedGateway("bank");
                  setPaymentMethod("Bank slip upload");
                }}
                className={`p-3.5 rounded-[20px] border-2 text-left transition-all cursor-pointer ${
                  selectedGateway === "bank"
                    ? "border-[#b4532f] bg-white font-bold shadow-xs"
                    : "border-[#e2d5c4] bg-[#f4ede2]/50 hover:border-[#3a2418]"
                }`}
              >
                <Building className="w-5 h-5 text-[#5f6b35] mb-1" />
                <p className="text-xs text-[#3a2418]">Bank Transfer</p>
                <p className="text-[10px] text-[#7b6a5d]">Direct Slip Upload</p>
              </button>
            </div>

            {/* PayHere Card Simulator Container */}
            {selectedGateway === "card" && (
              <div className="p-4 rounded-[20px] bg-white/80 border border-[#e2d5c4] space-y-3 shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#7b6a5d] pb-2 border-b border-[#e2d5c4]">
                  <span className="font-bold text-[#3a2418]">PayHere Sandbox Integration</span>
                  <span className="text-[#5f6b35] font-semibold">✓ Secure SSL Active</span>
                </div>
                <div>
                  <label htmlFor="card-sim-num" className="text-xs font-bold text-[#7b6a5d] block mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-sim-num"
                    defaultValue="4111 2222 3333 4444"
                    className="w-full text-xs py-2 px-3 bg-[#fbf7f0] border border-[#e2d5c4] rounded-[12px] font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="card-sim-exp" className="text-xs font-bold text-[#7b6a5d] block mb-1">
                      Expires
                    </label>
                    <input
                      type="text"
                      id="card-sim-exp"
                      defaultValue="12/28"
                      className="w-full text-xs py-2 px-3 bg-[#fbf7f0] border border-[#e2d5c4] rounded-[12px] font-mono"
                    />
                  </div>
                  <div>
                    <label htmlFor="card-sim-cvv" className="text-xs font-bold text-[#7b6a5d] block mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="card-sim-cvv"
                      defaultValue="982"
                      className="w-full text-xs py-2 px-3 bg-[#fbf7f0] border border-[#e2d5c4] rounded-[12px] font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Installments Breakdown Simulator */}
            {selectedGateway === "installments" && (
              <div className="p-4 rounded-[20px] bg-white/80 border border-[#e2d5c4] space-y-3 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#3a2418]">Choose BNPL Provider:</span>
                  <button
                    type="button"
                    onClick={() => setInstallmentPlan("koko")}
                    className={`text-xs px-3 py-1 rounded-full border font-bold cursor-pointer transition-all ${
                      installmentPlan === "koko"
                        ? "bg-[#3a2418] text-[#f4ede2] border-[#3a2418]"
                        : "bg-[#fbf7f0] border-[#e2d5c4] text-[#7b6a5d]"
                    }`}
                  >
                    Koko (3x)
                  </button>
                  <button
                    type="button"
                    onClick={() => setInstallmentPlan("mintpay")}
                    className={`text-xs px-3 py-1 rounded-full border font-bold cursor-pointer transition-all ${
                      installmentPlan === "mintpay"
                        ? "bg-[#3a2418] text-[#f4ede2] border-[#3a2418]"
                        : "bg-[#fbf7f0] border-[#e2d5c4] text-[#7b6a5d]"
                    }`}
                  >
                    Mintpay (3x)
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-3 rounded-[16px] bg-[#f4ede2] border border-[#e2d5c4]">
                    <span className="text-[10px] text-[#7b6a5d] block">Month 1 (Today)</span>
                    <b className="text-[#3a2418]">{formatLKR(monthlyInstallment)}</b>
                  </div>
                  <div className="p-3 rounded-[16px] bg-[#f4ede2] border border-[#e2d5c4]">
                    <span className="text-[10px] text-[#7b6a5d] block">Month 2 (Day 30)</span>
                    <b className="text-[#3a2418]">{formatLKR(monthlyInstallment)}</b>
                  </div>
                  <div className="p-3 rounded-[16px] bg-[#f4ede2] border border-[#e2d5c4]">
                    <span className="text-[10px] text-[#7b6a5d] block">Month 3 (Day 60)</span>
                    <b className="text-[#3a2418]">{formatLKR(monthlyInstallment)}</b>
                  </div>
                </div>
                <p className="text-[11px] text-[#7b6a5d] text-center">
                  Zero interest or hidden fees. Verified with any Sri Lankan debit/credit card.
                </p>
              </div>
            )}

            {/* Direct Bank Transfer & Slip Upload */}
            {selectedGateway === "bank" && (
              <div className="p-4 rounded-[20px] bg-white/80 border border-[#e2d5c4] space-y-3 shadow-xs">
                <div className="text-xs text-[#7b6a5d] space-y-1 p-3.5 bg-[#f4ede2] rounded-[16px] border border-[#e2d5c4]">
                  <p className="font-bold text-[#3a2418]">Commercial Bank of Ceylon (Kandy Branch)</p>
                  <p>Account Name: <b>CraftVilla Artisanal Marketplace PLC</b></p>
                  <p>Account No: <b className="font-mono text-[#3a2418]">8100 2938 4710</b></p>
                </div>

                <div>
                  <label htmlFor="slip-ref" className="text-xs font-bold text-[#7b6a5d] block mb-1">
                    Deposit Slip Reference Number
                  </label>
                  <input
                    type="text"
                    id="slip-ref"
                    placeholder="e.g. SLIP-20261021-009"
                    value={bankSlipRef}
                    onChange={(e) => setBankSlipRef(e.target.value)}
                    className="w-full text-xs py-2 px-3 bg-[#fbf7f0] border border-[#e2d5c4] rounded-[12px]"
                  />
                </div>

                <div
                  onClick={() => setBankSlipUploaded(true)}
                  className="border-2 border-dashed border-[#e2d5c4] p-5 rounded-[18px] text-center cursor-pointer hover:border-[#b4532f] transition-colors"
                >
                  <UploadCloud className="w-6 h-6 text-[#b4532f] mx-auto mb-1" />
                  <p className="text-xs font-bold text-[#3a2418]">
                    {bankSlipUploaded ? "✓ Receipt slip attached successfully!" : "Click to upload deposit slip photograph (PNG / JPG / PDF)"}
                  </p>
                  <p className="text-[11px] text-[#7b6a5d] mt-0.5">Admin will verify within 2 hours</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Itemized Review & Confirm Button */}
        <div className="lg:col-span-5 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-5 shadow-xs lg:sticky lg:top-24">
          <div className="flex items-center justify-between pb-3 border-b border-[#e2d5c4]">
            <h2
              className="text-2xl font-semibold text-[#3a2418]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Order Items ({items.length})
            </h2>
            <Link href="/cart" className="text-xs text-[#b4532f] hover:underline font-semibold">
              Edit Cart
            </Link>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="text-xs flex justify-between items-start pb-2.5 border-b border-[#e2d5c4]/60">
                <div className="space-y-0.5 max-w-[200px]">
                  <b className="text-[#3a2418] block truncate">{item.name}</b>
                  <p className="text-[11px] text-[#7b6a5d] truncate">
                    {item.isHamper ? item.text : `“${item.text}” (${item.finish})`}
                  </p>
                  <span className="text-[10px] text-[#7b6a5d]">Qty: {item.qty}</span>
                </div>
                <span className="font-bold text-[#3a2418] shrink-0">
                  {formatLKR(item.price)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Math */}
          <div className="space-y-2 text-xs pt-1">
            <div className="flex justify-between items-center py-1 text-[#7b6a5d]">
              <span>Items Subtotal</span>
              <span className="font-semibold text-[#3a2418]">{formatLKR(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center py-1 text-[#7b6a5d]">
              <span>Eco-Friendly Packaging</span>
              <span className="font-semibold text-[#3a2418]">{formatLKR(packagingFee)}</span>
            </div>
            <div className="flex justify-between items-center py-1 text-[#7b6a5d]">
              <span>Island-wide Express Courier</span>
              <span className="font-semibold text-[#3a2418]">{formatLKR(deliveryFee)}</span>
            </div>
            <div className="pt-3 border-t border-[#e2d5c4] flex justify-between items-center">
              <span className="font-bold text-sm text-[#3a2418]">Total Payable</span>
              <span className="text-xl font-bold text-[#8a3a1f]">{formatLKR(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#b4532f] hover:bg-[#9e4732] disabled:opacity-50 text-[#fff6ea] font-bold text-sm py-3.5 px-6 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? "Authorizing..." : `Authorize & Place Order · ${formatLKR(total)}`}
          </button>

          <div className="p-3.5 bg-white/80 rounded-[18px] border border-[#e2d5c4] text-[11px] text-[#7b6a5d] space-y-1">
            <p className="flex items-center gap-1 font-semibold text-[#5f6b35]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#5f6b35]" />
              <span>Artisan Lead Time Notice</span>
            </p>
            <p className="leading-relaxed">
              Your personalized piece will be allocated immediately to the master artisan workshop. You can follow live progress in real-time.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
