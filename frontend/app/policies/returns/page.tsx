import React from "react";
import Link from "next/link";
import { ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* ─────────────────────────────────────────────────────────────
          EDITORIAL HERO BANNER (Matches Home Page Hero Aesthetic)
          ───────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border border-[#e2d5c4]/70 shadow-sm text-center"
        style={{
          background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
        }}
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-semibold text-[#5b5a3a] mb-2.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#b4532f]" />
            <span>Transparent Consumer Terms</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Bespoke &amp; Custom Goods Policy
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            Because personalized crafts are permanently laser-etched, hand-carved, and cast to your unique specifications, our return terms balance customer peace of mind with artisan protection.
          </p>
        </div>
      </section>

      {/* Proof Approval Binding Rule */}
      <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] border-l-4 border-l-[#b4532f] rounded-[28px] p-6 sm:p-8 space-y-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-[#b4532f]" />
          <h2
            className="text-xl font-semibold text-[#3a2418]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            1. The Proof Approval Commitment
          </h2>
        </div>
        <p className="text-xs text-[#7b6a5d] leading-relaxed">
          Before any piece is carved, dyed, or assembled, you must approve the digital proof in our customizer. <b className="text-[#3a2418]">Once you approve the digital proof and your order enters &quot;IN_CRAFTING&quot;, the order cannot be cancelled or refunded for changes of mind</b>, as raw timber has been seasoned and cut to your exact dimensions.
        </p>
      </div>

      {/* When Returns & Free Remakes ARE Granted */}
      <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-6 sm:p-8 space-y-4 shadow-xs">
        <h2
          className="text-xl font-semibold text-[#5f6b35] flex items-center gap-2"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>2. Full Remake &amp; Refund Guarantees</span>
        </h2>
        <p className="text-xs text-[#7b6a5d]">
          CraftVilla guarantees 100% free workshop remake or full refund under the following conditions:
        </p>
        <ul className="space-y-2.5 text-xs text-[#3a2418]">
          <li className="flex items-start gap-2.5 bg-white p-3 rounded-[16px] border border-[#e2d5c4]">
            <span className="text-[#5f6b35] font-bold">✓</span>
            <span><b>Artisan Inscription Error:</b> The spelling or date on the physical piece does not match your approved digital proof.</span>
          </li>
          <li className="flex items-start gap-2.5 bg-white p-3 rounded-[16px] border border-[#e2d5c4]">
            <span className="text-[#5f6b35] font-bold">✓</span>
            <span><b>Transit Damage:</b> The item arrives cracked, chipped, or damaged by courier transport.</span>
          </li>
          <li className="flex items-start gap-2.5 bg-white p-3 rounded-[16px] border border-[#e2d5c4]">
            <span className="text-[#5f6b35] font-bold">✓</span>
            <span><b>Material Flaw:</b> Unacceptable structural defects (e.g. split teak or defective brass casting) prior to delivery.</span>
          </li>
        </ul>
      </div>

      {/* Claim Window & Resolution Stepper */}
      <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-6 sm:p-8 space-y-4 shadow-xs">
        <h2
          className="text-xl font-semibold text-[#3a2418]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          3. How to File a Dispute
        </h2>
        <p className="text-xs text-[#7b6a5d] leading-relaxed">
          Please notify our concierge team within <b className="text-[#3a2418]">48 hours of parcel delivery</b> with clear photographs of the defect and packaging. Our Platform Admin resolves disputes within 2 business days.
        </p>
        <div className="pt-2">
          <Link
            href="/contact"
            className="bg-[#b4532f] hover:bg-[#9e4732] text-white text-xs font-bold py-3 px-6 rounded-full inline-flex items-center gap-2 transition-all shadow-md"
          >
            <span>Contact Support / File Dispute</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
