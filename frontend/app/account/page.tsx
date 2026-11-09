"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useOrderStore } from "@/lib/store/orderStore";
import { useToastStore } from "@/lib/store/toastStore";
import { STAGES } from "@/lib/data";
import { formatLKR } from "@/lib/utils";
import { useIsMounted } from "@/lib/useIsMounted";
import { User, Package, ArrowRight, ShieldCheck, Sparkles, LogOut, ExternalLink } from "lucide-react";

const STAGE_PROGRESS = [2, 3, 4, 4, 5];

export default function AccountPage() {
  const router = useRouter();
  const mounted = useIsMounted();
  const { user, logout } = useAuthStore();
  const { orders } = useOrderStore();
  const { showToast } = useToastStore();

  if (!mounted) {
    return (
      <div className="py-12 text-center text-[#7b6a5d]">
        <h1
          className="text-3xl font-medium text-[#8a3a1f] mb-2"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          My Account
        </h1>
        <p className="text-sm">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="space-y-8 py-4">
        <section
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 border border-[#e2d5c4]/70 shadow-sm text-center max-w-lg mx-auto"
          style={{
            background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
          }}
        >
          <div className="w-16 h-16 rounded-full bg-white/70 text-[#b4532f] flex items-center justify-center mx-auto text-2xl mb-4 border border-[#e2d5c4]">
            <User className="w-8 h-8" />
          </div>
          <h1
            className="text-3xl font-medium text-[#8a3a1f] mb-2"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            My Account
          </h1>
          <p className="text-[#7b6a5d] text-sm max-w-sm mx-auto mb-6 leading-relaxed">
            Sign in to view your personalized orders, track workshop delivery milestones, or access your maker studio.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/login"
              className="bg-[#b4532f] hover:bg-[#9e4732] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all shadow-md inline-flex items-center gap-2"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-transparent hover:bg-white/60 border-[1.5px] border-[#3a2418]/30 hover:border-[#3a2418] text-[#3a2418] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-all"
            >
              Create Account
            </Link>
          </div>
        </section>
      </div>
    );
  }

  // Filter orders for this customer
  const myOrders = orders.filter(
    (o) =>
      o.customerEmail.toLowerCase() === user.email.toLowerCase() ||
      user.role === "CUSTOMER"
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL HERO BANNER (Matches Home Page Hero Aesthetic)
          ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 border border-[#e2d5c4]/70 shadow-sm"
        style={{
          background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
        }}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-semibold text-[#5b5a3a] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#b4532f]" />
              <span>Customer &amp; Maker Profile</span>
            </span>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
            >
              Welcome, {user.name}
            </h1>

            <p className="text-[#7b6a5d] text-base leading-relaxed mt-1">
              Manage your credentials, view custom orders, and monitor real-time artisan progress.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => {
                logout();
                showToast("Signed out");
                router.push("/");
              }}
              className="bg-transparent hover:bg-white/60 border-[1.5px] border-[#3a2418]/30 hover:border-[#3a2418] text-[#3a2418] font-bold text-xs px-5 py-2.5 rounded-full transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          USER PROFILE CARD (Soft Rounded 30px Card)
          ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#eadccb] text-[#8a3a1f] font-bold text-xl flex items-center justify-center border border-[#e2d5c4] shrink-0">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2
              className="text-2xl font-semibold text-[#3a2418]"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              {user.name}
            </h2>
            <p className="text-xs text-[#7b6a5d] mt-0.5">
              {user.email} ·{" "}
              <span className="font-semibold text-[#3a2418]">
                {user.role === "ARTISAN"
                  ? "Artisan Maker"
                  : user.role === "ADMIN"
                  ? "Platform Administrator"
                  : "Verified Gift Shopper"}
              </span>
            </p>
          </div>
        </div>

        {/* Portal Shortcuts */}
        <div className="flex gap-2.5 flex-wrap">
          {user.role === "ARTISAN" && (
            <Link
              href="/artisan"
              className="bg-[#b4532f] hover:bg-[#9e4732] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-md inline-flex items-center gap-1.5"
            >
              <span>Artisan Studio Board</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
          {user.role === "ADMIN" && (
            <Link
              href="/admin"
              className="bg-[#3a2418] hover:bg-[#b4532f] text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-md inline-flex items-center gap-1.5"
            >
              <span>Super Admin Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          ORDERS SECTION
          ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Your Handcrafted Orders
          </h2>
          <p className="text-sm text-[#7b6a5d]">
            Real-time status updates directly from our craft workshops.
          </p>
        </div>

        {myOrders.length > 0 ? (
          <div className="space-y-3.5">
            {myOrders.map((order) => {
              const doneCount = STAGE_PROGRESS[order.col] ?? 2;
              const stageLabel = STAGES[Math.max(doneCount - 1, 0)]?.label || order.stage;

              return (
                <div
                  key={order.id}
                  className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[16px] bg-[#eadccb] border border-[#e2d5c4] flex items-center justify-center shrink-0">
                      <Package className="w-6 h-6 text-[#b4532f]" />
                    </div>
                    <div>
                      <b className="text-base text-[#3a2418] block">
                        #{order.code} · {order.name}
                      </b>
                      <div className="flex items-center gap-2 text-xs text-[#7b6a5d] mt-0.5">
                        <span className="bg-[#5f6b35]/10 text-[#5f6b35] font-semibold px-2.5 py-0.5 rounded-full border border-[#5f6b35]/25">
                          {stageLabel}
                        </span>
                        <span>· {formatLKR(order.total)}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/track/${order.code}`}
                    className="bg-[#3a2418] hover:bg-[#b4532f] text-[#f4ede2] text-xs font-bold px-5 py-2.5 rounded-full transition-colors inline-flex items-center gap-1.5 self-end sm:self-auto"
                  >
                    <span>Track Live</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-10 text-center space-y-3">
            <p className="text-sm text-[#7b6a5d]">
              No active orders yet. Your personalized gifts will appear here once commissioned.
            </p>
            <Link
              href="/catalog"
              className="bg-[#b4532f] hover:bg-[#9e4732] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-md inline-flex items-center gap-1.5"
            >
              Explore Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
