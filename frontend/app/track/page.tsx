"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/lib/store/orderStore";
import { useAuthStore } from "@/lib/store/authStore";
import { formatLKR } from "@/lib/utils";
import { Search, Package, ArrowRight, Truck, Sparkles } from "lucide-react";

export default function TrackLookupPage() {
  const router = useRouter();
  const { orders } = useOrderStore();
  const { user } = useAuthStore();
  const [orderCode, setOrderCode] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderCode.trim()) {
      router.push(`/track/${orderCode.trim().toUpperCase()}`);
    }
  };

  const userOrders = user
    ? orders.filter(
        (o) => o.customerEmail.toLowerCase() === user.email.toLowerCase() || user.role === "CUSTOMER"
      ).slice(0, 4)
    : orders.slice(0, 4);

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-2">
      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL HERO BANNER (Matches Home Page Hero Aesthetic)
          ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 border border-[#e2d5c4]/70 shadow-sm text-center"
        style={{
          background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
        }}
      >
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-semibold text-[#5b5a3a] mb-2.5">
            <Truck className="w-3.5 h-3.5 text-[#b4532f]" />
            <span>Real-time Artisan Tracking</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-2.5"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Track Your Bespoke Order
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            Enter your CraftVilla order reference (e.g. <b>CV-1024</b>) to follow your piece from the master workshop chisel to your doorstep.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ORDER LOOKUP FORM (Rounded Card with Pill Button)
          ───────────────────────────────────────────────────────────── */}
      <form
        onSubmit={handleSearch}
        className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-6 sm:p-8 space-y-3 shadow-xs"
      >
        <label htmlFor="search-order" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block">
          Order Reference Code
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7b6a5d]" />
            <input
              id="search-order"
              type="text"
              placeholder="e.g. CV-1024, CV-1025..."
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-sm text-[#3a2418] placeholder:text-[#7b6a5d]/70 focus:outline-none font-mono"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#b4532f] hover:bg-[#9e4732] text-[#fff6ea] font-bold text-sm px-7 py-3 rounded-full transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>Track Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* ─────────────────────────────────────────────────────────────
          RECENT ORDERS CARD (Soft Rounded 28px Card)
          ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-[#e2d5c4]">
          <h2
            className="text-xl font-semibold text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Recent Workshop Commissions
          </h2>
          <span className="text-xs text-[#7b6a5d]">Select to inspect live milestones</span>
        </div>

        <div className="space-y-3">
          {userOrders.map((o) => (
            <div
              key={o.id}
              onClick={() => router.push(`/track/${o.code}`)}
              className="p-4 rounded-[20px] border border-[#e2d5c4] hover:border-[#b4532f] cursor-pointer transition-all flex items-center justify-between group bg-white/70 hover:shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-[14px] bg-[#eadccb] border border-[#e2d5c4] flex items-center justify-center text-sm font-bold text-[#3a2418] shrink-0">
                  <Package className="w-5 h-5 text-[#b4532f]" />
                </div>
                <div>
                  <b className="text-sm text-[#3a2418] block group-hover:text-[#b4532f] transition-colors">
                    #{o.code} · {o.name}
                  </b>
                  <span className="text-xs text-[#7b6a5d]">
                    Recipient: {o.customerName} · {formatLKR(o.total)}
                  </span>
                </div>
              </div>

              <span className="text-xs font-semibold text-[#b4532f] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>View Milestones</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
