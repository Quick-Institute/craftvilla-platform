"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useOrderStore } from "@/lib/store/orderStore";
import Stepper from "@/components/Stepper";
import { formatLKR } from "@/lib/utils";
import { useIsMounted } from "@/lib/useIsMounted";
import { Search, ArrowLeft, ArrowRight, Truck, Sparkles, CheckCircle2 } from "lucide-react";

// Done stages count mapping matching prototype: DONE=[2, 3, 4, 4, 5]
const DONE_STAGES = [2, 3, 4, 4, 5];

function TrackerContent() {
  const params = useParams();
  const router = useRouter();
  const rawOrderId = (params?.orderId as string) || "";
  const mounted = useIsMounted();

  const { getOrderById } = useOrderStore();
  const [searchCode, setSearchCode] = useState(rawOrderId);

  if (!mounted) {
    return (
      <div className="py-12 text-center text-[#7b6a5d]">
        <h1
          className="text-3xl font-medium text-[#8a3a1f] mb-2"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Track Your Order
        </h1>
        <p className="text-sm">Locating order status...</p>
      </div>
    );
  }

  const order = getOrderById(rawOrderId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCode.trim()) {
      router.push(`/track/${searchCode.trim().toUpperCase()}`);
    }
  };

  const doneCount = order ? (DONE_STAGES[order.col] ?? 2) : 0;

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-2">
      {/* Back Link */}
      <div>
        <Link
          href="/track"
          className="bg-[#fbf7f0] border border-[#e2d5c4] rounded-full px-4 py-2 text-xs font-semibold text-[#7b6a5d] hover:text-[#3a2418] hover:border-[#3a2418] inline-flex items-center gap-1.5 transition-all shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Tracker Search</span>
        </Link>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL HERO BANNER (Matches Home Page Hero Aesthetic)
          ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 border border-[#e2d5c4]/70 shadow-sm"
        style={{
          background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
        }}
      >
        <div className="relative z-10">
          <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-semibold text-[#5b5a3a] mb-2.5">
            <Truck className="w-3.5 h-3.5 text-[#b4532f]" />
            <span>Artisan Milestone Pipeline</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-2"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            {order ? `Order #${order.code}` : "Live Order Tracker"}
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            {order
              ? `${order.name} · Recipient: ${order.customerName}`
              : "Enter your order ID or place an order to see live workshop progress."}
          </p>
        </div>
      </section>

      {/* Quick Lookup Bar */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b6a5d]" />
          <input
            type="text"
            placeholder="Look up order (e.g. CV-1024)"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-sm text-[#3a2418] font-mono focus:outline-none"
            aria-label="Order ID lookup"
          />
        </div>
        <button
          type="submit"
          className="bg-[#b4532f] hover:bg-[#9e4732] text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-full transition-all shadow-md shrink-0 cursor-pointer"
        >
          Track
        </button>
      </form>

      {order ? (
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-6 shadow-xs" id="tbody">
          {/* Header row in order card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e2d5c4] gap-2">
            <div>
              <span className="text-xs text-[#7b6a5d] uppercase tracking-wider block">Order Code</span>
              <span className="text-xl font-bold text-[#3a2418]">#{order.code}</span>
            </div>
            <span className="bg-[#5f6b35]/10 text-[#5f6b35] border border-[#5f6b35]/25 px-3.5 py-1.5 rounded-full text-xs font-semibold self-start sm:self-auto flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{order.col === 4 ? "On its way to delivery" : "Estimated dispatch in 2-3 days"}</span>
            </span>
          </div>

          <div className="bg-white/80 p-4 rounded-[20px] border border-[#e2d5c4] text-xs text-[#7b6a5d] space-y-1">
            <p>
              <b>Recipient:</b> <span className="text-[#3a2418] font-medium">{order.customerName}</span>
            </p>
            <p>
              <b>Delivering to:</b> <span className="text-[#3a2418] font-medium">{order.deliveryAddress}</span>
            </p>
          </div>

          {/* Stepper Component */}
          <div className="py-2">
            <Stepper currentStageIndex={doneCount} />
          </div>

          {/* Bottom Row */}
          <div className="mt-8 pt-5 border-t border-[#e2d5c4] flex justify-between items-center flex-wrap gap-4">
            <div>
              <span className="text-xs text-[#7b6a5d] uppercase tracking-wider block">
                Total paid
              </span>
              <span className="font-bold text-lg text-[#3a2418]">
                {formatLKR(order.total)} <span className="text-xs text-[#7b6a5d] font-normal">({order.paymentMethod})</span>
              </span>
            </div>

            <Link
              href="/artisan"
              className="bg-transparent hover:bg-white/60 border-[1.5px] border-[#3a2418]/30 hover:border-[#3a2418] text-[#3a2418] font-bold text-xs px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-1.5"
            >
              <span>Artisan Kanban View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-10 text-center space-y-4">
          <p
            className="text-xl text-[#3a2418] font-medium"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            No order found matching &quot;{rawOrderId}&quot;.
          </p>
          <p className="text-xs text-[#7b6a5d] max-w-sm mx-auto">
            Try tracking CV-1024, CV-1025, CV-1026, or place a new bespoke piece.
          </p>
          <div className="flex gap-3 justify-center flex-wrap pt-2">
            <button
              type="button"
              onClick={() => router.push("/track/CV-1024")}
              className="bg-transparent hover:bg-white/60 border-[1.5px] border-[#3a2418]/30 hover:border-[#3a2418] text-[#3a2418] font-bold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer"
            >
              Demo: Track CV-1024
            </button>
            <Link
              href="/catalog"
              className="bg-[#b4532f] hover:bg-[#9e4732] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-md inline-flex items-center gap-1.5"
            >
              Start shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderTrackPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#fbf7f0] border border-[#e2d5c4] rounded-[28px] p-12 text-center text-[#7b6a5d]">
          Loading order details...
        </div>
      }
    >
      <TrackerContent />
    </Suspense>
  );
}
