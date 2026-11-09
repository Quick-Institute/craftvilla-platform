"use client";

import React, { useState } from "react";
import KanbanBoard from "@/components/KanbanBoard";
import { useOrderStore } from "@/lib/store/orderStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useToastStore } from "@/lib/store/toastStore";
import { PRODUCTS } from "@/lib/data";
import { formatLKR } from "@/lib/utils";
import { Clock, Star, DollarSign, PackageCheck, ToggleLeft, ToggleRight, Hammer, Settings, Sparkles, X, Plus } from "lucide-react";

export default function ArtisanDashboardPage() {
  const { orders } = useOrderStore();
  const { user } = useAuthStore();
  const { showToast } = useToastStore();

  const [acceptingOrders, setAcceptingOrders] = useState(true);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [productListings, setProductListings] = useState(PRODUCTS.slice(0, 4));
  const [newTitle, setNewTitle] = useState("");
  const [newMaterial, setNewMaterial] = useState("Wood");
  const [newPrice, setNewPrice] = useState(3800);
  const [newLeadDays, setNewLeadDays] = useState(3);

  const activeOrders = orders.filter((o) => o.col < 4);
  const totalCompleted = orders.filter((o) => o.col >= 4).length + 32;
  const pendingPayout = orders.reduce((sum, o) => sum + Math.round(o.total * 0.85), 0) + 142500;

  const handleToggleStatus = () => {
    const next = !acceptingOrders;
    setAcceptingOrders(next);
    showToast(next ? "Studio status: Accepting New Orders ✓" : "Studio status: Capacity Full (Paused)");
  };

  const handleAddNewListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newProd = {
      id: "prod-" + Date.now(),
      name: newTitle,
      material: newMaterial,
      occasion: "Anniversary",
      artisanName: user?.name || "Kandy Wood Studio",
      artisanSlug: "kandy-wood-studio",
      basePrice: newPrice,
      emoji: newMaterial === "Wood" ? "🪵" : newMaterial === "Resin" ? "🔮" : "🎨",
      bgColor: "#e7cfa8",
      description: "Custom hand-carved heritage creation made to order in our verified workshop.",
      dimensions: "Standard 30 × 20 cm",
      leadTimeDays: newLeadDays,
      customizable: true,
    };

    setProductListings([newProd, ...productListings]);
    setNewTitle("");
    showToast(`New listing "${newTitle}" created!`);
    setIsManagerOpen(false);
  };

  const handleUpdateLeadTime = (id: string, days: number) => {
    setProductListings((prev) =>
      prev.map((p) => (p.id === id ? { ...p, leadTimeDays: days } : p))
    );
    showToast("Production lead time updated");
  };

  return (
    <div className="space-y-8 py-2">
      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL HERO BANNER (Matches Home Page Hero Aesthetic)
          ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 border border-[#e2d5c4]/70 shadow-sm"
        style={{
          background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-semibold text-[#5b5a3a]">
              <Hammer className="w-3.5 h-3.5 text-[#b4532f]" />
              <span>Verified Artisan Studio Board</span>
            </span>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
            >
              {user ? user.name : "Kandy Wood Studio Workshop"}
            </h1>

            <p className="text-[#7b6a5d] text-base leading-relaxed">
              Central Province, Sri Lanka · Handcrafted Joinery &amp; Inscriptions · Direct Maker Portal
            </p>
          </div>

          {/* Studio Controls & Status Toggle */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleToggleStatus}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all shadow-xs cursor-pointer ${
                acceptingOrders
                  ? "bg-[#5f6b35] text-white border-[#5f6b35]"
                  : "bg-amber-600 text-white border-amber-600"
              }`}
            >
              {acceptingOrders ? (
                <>
                  <ToggleRight className="w-4 h-4" />
                  <span>Accepting Orders</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="w-4 h-4" />
                  <span>Capacity Full (Paused)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsManagerOpen(true)}
              className="bg-[#fbf7f0] hover:bg-white border border-[#e2d5c4] text-[#3a2418] text-xs font-bold py-2 px-4 rounded-full flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-[#b4532f]" />
              <span>Catalog &amp; Lead Times</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PRODUCTION QUICK METRICS (Soft Rounded 24px Cards)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7b6a5d] mb-1">
            <span className="font-semibold uppercase tracking-wider">Active Pipeline</span>
            <PackageCheck className="w-4 h-4 text-[#b4532f]" />
          </div>
          <b
            className="text-3xl font-medium text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {activeOrders.length}
          </b>
          <span className="text-[11px] text-[#5f6b35] mt-1 font-semibold">In workshop crafting</span>
        </div>

        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7b6a5d] mb-1">
            <span className="font-semibold uppercase tracking-wider">Pending Payouts</span>
            <DollarSign className="w-4 h-4 text-[#5f6b35]" />
          </div>
          <b
            className="text-3xl font-medium text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {formatLKR(pendingPayout)}
          </b>
          <span className="text-[11px] text-[#7b6a5d] mt-1">Disbursed bi-weekly</span>
        </div>

        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7b6a5d] mb-1">
            <span className="font-semibold uppercase tracking-wider">Studio Rating</span>
            <Star className="w-4 h-4 text-[#b4532f] fill-current" />
          </div>
          <b
            className="text-3xl font-medium text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            4.9 ★
          </b>
          <span className="text-[11px] text-[#7b6a5d] mt-1">From 84 customer proofs</span>
        </div>

        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7b6a5d] mb-1">
            <span className="font-semibold uppercase tracking-wider">Completed Crafts</span>
            <Clock className="w-4 h-4 text-[#b4532f]" />
          </div>
          <b
            className="text-3xl font-medium text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {totalCompleted}
          </b>
          <span className="text-[11px] text-[#7b6a5d] mt-1">Heirlooms delivered</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PRODUCTION KANBAN PIPELINE (Soft Rounded Card Container)
          ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-5 shadow-xs">
        <div>
          <h2
            className="text-2xl font-semibold text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Production Kanban Pipeline
          </h2>
          <p className="text-xs text-[#7b6a5d] mt-0.5">
            Advance tickets through each workshop milestone. Customer tracking updates immediately.
          </p>
        </div>

        <KanbanBoard />
      </div>

      {/* Product & Lead Time Manager Drawer / Modal */}
      {isManagerOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#fbf7f0] max-w-2xl w-full p-6 sm:p-8 rounded-[30px] border border-[#e2d5c4] shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2d5c4]">
              <h3
                className="text-xl font-semibold text-[#3a2418]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Studio Catalog &amp; Lead Time Manager
              </h3>
              <button
                type="button"
                onClick={() => setIsManagerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f4ede2] text-[#7b6a5d] hover:text-[#3a2418] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Existing Studio Crafts */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block">
                Active Workshop Offerings
              </span>
              {productListings.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-[18px] border border-[#e2d5c4] bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div>
                    <b className="text-xs text-[#3a2418] block">{p.name}</b>
                    <span className="text-[11px] text-[#7b6a5d]">
                      {p.material} · From {formatLKR(p.basePrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#7b6a5d]">Lead Time:</span>
                    <select
                      value={p.leadTimeDays}
                      onChange={(e) => handleUpdateLeadTime(p.id, parseInt(e.target.value, 10))}
                      className="text-xs py-1 px-2.5 rounded-full border border-[#e2d5c4] bg-[#fbf7f0] text-[#3a2418]"
                    >
                      <option value={1}>1 day (Express)</option>
                      <option value={2}>2 days</option>
                      <option value={3}>3 days (Standard)</option>
                      <option value={5}>5 days</option>
                      <option value={7}>7 days (Bespoke)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            {/* Add New Listing Mini Form */}
            <form onSubmit={handleAddNewListing} className="p-4 rounded-[20px] bg-[#f4ede2]/60 border border-[#e2d5c4] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3a2418] block">
                + Add New Studio Creation
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7b6a5d] block mb-1">Item Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Hand-Carved Teak Bookends"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full text-xs p-2.5 rounded-[12px] bg-[#fbf7f0] border border-[#e2d5c4]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7b6a5d] block mb-1">Craft Medium</label>
                  <select
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-[12px] bg-[#fbf7f0] border border-[#e2d5c4]"
                  >
                    <option value="Wood">Wood</option>
                    <option value="Ceramic">Ceramic</option>
                    <option value="Leather">Leather</option>
                    <option value="Batik">Batik</option>
                    <option value="Metal">Metal</option>
                    <option value="Resin">Resin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-[#7b6a5d] block mb-1">Base Price (LKR)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(parseInt(e.target.value, 10))}
                    className="w-full text-xs p-2.5 rounded-[12px] bg-[#fbf7f0] border border-[#e2d5c4]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#7b6a5d] block mb-1">Crafting Days</label>
                  <input
                    type="number"
                    value={newLeadDays}
                    onChange={(e) => setNewLeadDays(parseInt(e.target.value, 10))}
                    className="w-full text-xs p-2.5 rounded-[12px] bg-[#fbf7f0] border border-[#e2d5c4]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#b4532f] hover:bg-[#9e4732] text-white font-bold text-xs py-2.5 px-4 rounded-full shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Studio Listing</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
