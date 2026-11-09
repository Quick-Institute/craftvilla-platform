"use client";

import React, { useState } from "react";
import { useOrderStore } from "@/lib/store/orderStore";
import { useToastStore } from "@/lib/store/toastStore";
import { formatLKR } from "@/lib/utils";
import { ArtisanApplication } from "@/lib/types";
import { BarChart3, ShieldCheck, DollarSign, AlertCircle, Eye, TrendingUp, Sparkles, X, CheckCircle2 } from "lucide-react";

export default function AdminDashboardPage() {
  const {
    orders,
    disputes,
    applications,
    resolveDispute,
    reviewApplication,
  } = useOrderStore();
  const { showToast } = useToastStore();

  const [inspectingApp, setInspectingApp] = useState<ArtisanApplication | null>(null);

  const pendingApps = applications.filter((a) => a.status === "PENDING");
  const openDisputes = disputes.filter((d) => d.status === "OPEN");

  // Revenue & ledger calculations
  const totalGrossSales = 412000 + orders.reduce((acc, o) => acc + o.total, 0);
  const totalCommission = Math.round(totalGrossSales * 0.08);
  const totalArtisanPayouts = totalGrossSales - totalCommission;

  const handleApprove = (appId: string, name: string) => {
    reviewApplication(appId, "APPROVED");
    showToast(`Artisan application for "${name}" approved ✓`);
    setInspectingApp(null);
  };

  const handleReject = (appId: string, name: string) => {
    reviewApplication(appId, "REJECTED");
    showToast(`Application for "${name}" rejected.`);
    setInspectingApp(null);
  };

  const handleResolveDispute = (disputeId: string) => {
    resolveDispute(disputeId);
    showToast("Dispute resolved with customer and artisan.");
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
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-semibold text-[#5b5a3a] mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5f6b35]" />
            <span>Platform Governance &amp; Analytics</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-2"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Super Admin Portal
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            Monitor marketplace sales velocity, verify rural master workshop applications, audit fair-trade ledgers, and resolve customer proof disputes.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          1. PLATFORM ANALYTICS DASHBOARD METRICS (Soft 24px Cards)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7b6a5d] mb-1">
            <span className="font-semibold uppercase tracking-wider">Gross Platform GMV</span>
            <TrendingUp className="w-4 h-4 text-[#5f6b35]" />
          </div>
          <b
            className="text-3xl font-medium text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {formatLKR(totalGrossSales)}
          </b>
          <span className="text-[11px] text-[#5f6b35] font-semibold mt-1">↑ +18.4% this month</span>
        </div>

        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7b6a5d] mb-1">
            <span className="font-semibold uppercase tracking-wider">Net Commission (8%)</span>
            <DollarSign className="w-4 h-4 text-[#b4532f]" />
          </div>
          <b
            className="text-3xl font-medium text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {formatLKR(totalCommission)}
          </b>
          <span className="text-[11px] text-[#7b6a5d] mt-1">Platform operational revenue</span>
        </div>

        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7b6a5d] mb-1">
            <span className="font-semibold uppercase tracking-wider">Artisan Disbursements</span>
            <BarChart3 className="w-4 h-4 text-[#8a3a1f]" />
          </div>
          <b
            className="text-3xl font-medium text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {formatLKR(totalArtisanPayouts)}
          </b>
          <span className="text-[11px] text-[#5f6b35] font-semibold mt-1">Direct to rural workshops</span>
        </div>

        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#7b6a5d] mb-1">
            <span className="font-semibold uppercase tracking-wider">Action Queue</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <b
            className="text-3xl font-medium text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            {pendingApps.length + openDisputes.length}
          </b>
          <span className="text-[11px] text-amber-700 font-semibold mt-1">
            {pendingApps.length} Artisans · {openDisputes.length} Disputes
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ANALYTICS BREAKDOWN & WORKSHOP PERFORMANCE (Rounded Cards)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e2d5c4] pb-3">
            <h2
              className="text-xl font-semibold text-[#3a2418]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Top Selling Craft Materials
            </h2>
            <span className="text-xs text-[#7b6a5d]">By order revenue volume</span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#3a2418] mb-1.5">
                <span>Solid Plantation Teak (Woodwork)</span>
                <span>46% · LKR 189,520</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#f4ede2] overflow-hidden border border-[#e2d5c4]">
                <div className="h-full bg-[#b4532f] rounded-full" style={{ width: "46%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#3a2418] mb-1.5">
                <span>Hand-Waxed Cotton (Batik Tapestries)</span>
                <span>24% · LKR 98,880</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#f4ede2] overflow-hidden border border-[#e2d5c4]">
                <div className="h-full bg-[#8a3a1f] rounded-full" style={{ width: "24%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#3a2418] mb-1.5">
                <span>Terracotta Clay Kilns (Pottery)</span>
                <span>18% · LKR 74,160</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#f4ede2] overflow-hidden border border-[#e2d5c4]">
                <div className="h-full bg-[#5f6b35] rounded-full" style={{ width: "18%" }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#3a2418] mb-1.5">
                <span>Botanical Pressed Floral (Resin Art)</span>
                <span>12% · LKR 49,440</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#f4ede2] overflow-hidden border border-[#e2d5c4]">
                <div className="h-full bg-[#9aa58a] rounded-full" style={{ width: "12%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Operational Quality Ratios */}
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-4 shadow-xs">
          <h2
            className="text-xl font-semibold text-[#3a2418] border-b border-[#e2d5c4] pb-3"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Workshop Performance
          </h2>
          <div className="space-y-3.5 text-xs">
            <div className="p-3.5 rounded-[18px] bg-white/80 border border-[#e2d5c4]">
              <span className="text-[#7b6a5d] block">Proof Approval Rate</span>
              <b
                className="text-2xl text-[#5f6b35] font-semibold"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                99.4%
              </b>
              <p className="text-[10px] text-[#7b6a5d] mt-0.5">Approved prior to carving</p>
            </div>
            <div className="p-3.5 rounded-[18px] bg-white/80 border border-[#e2d5c4]">
              <span className="text-[#7b6a5d] block">Average Lead Time</span>
              <b
                className="text-2xl text-[#3a2418] font-semibold"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                2.8 Days
              </b>
              <p className="text-[10px] text-[#7b6a5d] mt-0.5">From order to dispatch</p>
            </div>
            <div className="p-3.5 rounded-[18px] bg-white/80 border border-[#e2d5c4]">
              <span className="text-[#7b6a5d] block">Dispute Rate</span>
              <b
                className="text-2xl text-[#5f6b35] font-semibold"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                0.6%
              </b>
              <p className="text-[10px] text-[#7b6a5d] mt-0.5">Well under 2% industry cap</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. ARTISAN VERIFICATION QUEUE (Soft 30px Card)
          ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#e2d5c4] pb-3">
          <div>
            <h2
              className="text-xl font-semibold text-[#3a2418]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Artisan Verification Queue
            </h2>
            <p className="text-xs text-[#7b6a5d] mt-0.5">
              Review master workshop credentials and inspect sample craft portfolios before granting storefront access.
            </p>
          </div>
          <span className="bg-[#b4532f]/10 text-[#8a3a1f] text-xs font-bold px-3 py-1 rounded-full border border-[#b4532f]/20">
            {pendingApps.length} Pending Review
          </span>
        </div>

        <div className="divide-y divide-[#e2d5c4]">
          {pendingApps.length > 0 ? (
            pendingApps.map((artisan) => (
              <div
                key={artisan.id}
                className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-white/40 transition-colors rounded-[16px] px-2"
              >
                <div>
                  <b className="text-sm text-[#3a2418] block">{artisan.name}</b>
                  <p className="text-xs text-[#7b6a5d]">
                    {artisan.location} Province · {artisan.category} craft discipline · Submitted today
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setInspectingApp(artisan)}
                    className="bg-transparent hover:bg-white/60 border border-[#e2d5c4] text-[#3a2418] text-xs font-semibold py-1.5 px-3.5 rounded-full inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#b4532f]" />
                    <span>Inspect</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleApprove(artisan.id, artisan.name)}
                    className="bg-[#b4532f] hover:bg-[#9e4732] text-white text-xs font-bold py-1.5 px-4 rounded-full shadow-xs cursor-pointer transition-all"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleReject(artisan.id, artisan.name)}
                    className="bg-transparent hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold py-1.5 px-3.5 rounded-full cursor-pointer transition-all"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-[#7b6a5d]">
              All artisan applications have been reviewed and verified.
            </div>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. FINANCIAL LEDGER & DISPUTES (Soft 30px Cards)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Financial Disbursements Ledger */}
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e2d5c4] pb-2">
            <h2
              className="text-xl font-semibold text-[#3a2418]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Bi-Weekly Payout Ledger
            </h2>
            <span className="text-[11px] text-[#5f6b35] font-semibold bg-[#5f6b35]/10 px-2.5 py-0.5 rounded-full">
              Auto-calculated (85%)
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3.5 rounded-[18px] border border-[#e2d5c4] bg-white flex justify-between items-center shadow-xs">
              <div>
                <b className="text-[#3a2418]">Kandy Wood Studio</b>
                <span className="text-[11px] text-[#7b6a5d] block">Commercial Bank Acc #8102938471</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#3a2418] block">{formatLKR(58400)}</span>
                <span className="text-[10px] text-[#5f6b35] font-semibold">Ready to release</span>
              </div>
            </div>

            <div className="p-3.5 rounded-[18px] border border-[#e2d5c4] bg-white flex justify-between items-center shadow-xs">
              <div>
                <b className="text-[#3a2418]">Weligama Batik Co.</b>
                <span className="text-[11px] text-[#7b6a5d] block">Sampath Bank Acc #109283741</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#3a2418] block">{formatLKR(42100)}</span>
                <span className="text-[10px] text-[#5f6b35] font-semibold">Ready to release</span>
              </div>
            </div>

            <div className="p-3.5 rounded-[18px] border border-[#e2d5c4] bg-white flex justify-between items-center shadow-xs">
              <div>
                <b className="text-[#3a2418]">Molagoda Potters</b>
                <span className="text-[11px] text-[#7b6a5d] block">Bank of Ceylon Acc #7482910</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#3a2418] block">{formatLKR(24650)}</span>
                <span className="text-[10px] text-[#5f6b35] font-semibold">Ready to release</span>
              </div>
            </div>
          </div>
        </div>

        {/* Open Disputes Management */}
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#e2d5c4] pb-2">
            <h2
              className="text-xl font-semibold text-[#3a2418]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Customer Proof Disputes ({openDisputes.length})
            </h2>
            <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              SLA: 48h
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {openDisputes.length > 0 ? (
              openDisputes.map((dispute) => (
                <div
                  key={dispute.id}
                  className="p-3.5 rounded-[18px] border border-[#e2d5c4] bg-white flex items-center justify-between shadow-xs"
                >
                  <div>
                    <b className="text-[#3a2418] block">#{dispute.orderCode}</b>
                    <span className="text-[11px] text-[#7b6a5d]">{dispute.issue}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleResolveDispute(dispute.id)}
                    className="bg-[#5f6b35] hover:bg-[#4f592c] text-white text-[11px] font-bold py-1.5 px-3.5 rounded-full cursor-pointer transition-all shadow-xs"
                  >
                    Resolve &amp; Free Remake
                  </button>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-xs text-[#7b6a5d]">
                No active consumer disputes. Proof approval guarantee active.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Workshop Portfolio Inspection Modal */}
      {inspectingApp && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#fbf7f0] max-w-lg w-full p-6 sm:p-8 rounded-[30px] border border-[#e2d5c4] shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2d5c4]">
              <h3
                className="text-xl font-semibold text-[#3a2418]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Workshop Verification: {inspectingApp.name}
              </h3>
              <button
                type="button"
                onClick={() => setInspectingApp(null)}
                className="w-8 h-8 rounded-full bg-[#f4ede2] text-[#7b6a5d] hover:text-[#3a2418] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p>Location: <b className="text-[#3a2418]">{inspectingApp.location} District</b></p>
              <p>Primary Craft: <b className="text-[#3a2418]">{inspectingApp.category}</b></p>
              <p className="text-[#7b6a5d] leading-relaxed">
                Workshop verified with certified sustainable timber sourcing, local river clay beds, and fair employment terms for master apprentices.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5 py-2">
              <div className="aspect-square bg-[#eadccb] rounded-[16px] border border-[#e2d5c4] flex items-center justify-center text-2xl">
                🪵
              </div>
              <div className="aspect-square bg-[#eadccb] rounded-[16px] border border-[#e2d5c4] flex items-center justify-center text-2xl">
                🔨
              </div>
              <div className="aspect-square bg-[#eadccb] rounded-[16px] border border-[#e2d5c4] flex items-center justify-center text-2xl">
                ✨
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => handleReject(inspectingApp.id, inspectingApp.name)}
                className="bg-transparent hover:bg-red-50 text-red-600 border border-red-200 text-xs font-semibold py-2 px-4 rounded-full cursor-pointer transition-all"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => handleApprove(inspectingApp.id, inspectingApp.name)}
                className="bg-[#b4532f] hover:bg-[#9e4732] text-white text-xs font-bold py-2 px-5 rounded-full shadow-md cursor-pointer transition-all"
              >
                Approve &amp; Grant Verified Badge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
