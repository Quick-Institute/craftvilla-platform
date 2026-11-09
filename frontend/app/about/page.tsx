import React from "react";
import Link from "next/link";
import { HeartHandshake, ShieldCheck, Sparkles, MapPin, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-2">
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
            <HeartHandshake className="w-3.5 h-3.5 text-[#b4532f]" />
            <span>Our Heritage &amp; Fair-Trade Mission</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Empowering the Hands That Shape Sri Lanka
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            CraftVilla bridges rural Sri Lankan master craftspersons with personalized modern gifting, giving makers over 85% of each sale directly to their workshops.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          ORIGIN STORY (Soft Rounded 30px Card)
          ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-4 shadow-xs">
        <h2
          className="text-2xl font-semibold text-[#3a2418]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          The CraftVilla Story
        </h2>
        <p className="text-sm text-[#7b6a5d] leading-relaxed">
          Across the valleys of Kandy, the coastal villages of Weligama, and the red clay riverbanks of Kegalle, master artisans carry centuries of wood joinery, wheel-thrown terracotta, and wax-resist batik. Yet for generations, middlemen took up to 80% of sales, while modern consumers lacked any way to personalize handcrafted gifts.
        </p>
        <p className="text-sm text-[#7b6a5d] leading-relaxed">
          CraftVilla reimagines this model. By offering our proprietary digital 1:1 customizer with proof approval, buyers can inscribe names and etch memories into heirloom pieces, while our verified artisans receive guaranteed fair-trade payment directly to their workshops.
        </p>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3 CORE PILLARS (Soft Rounded 28px Cards)
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-6 text-center space-y-2.5 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#5f6b35]/10 flex items-center justify-center mx-auto text-[#5f6b35] mb-1">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#3a2418]">100% Ethical Pay</h3>
          <p className="text-xs text-[#7b6a5d] leading-relaxed">
            All artisans set their own base prices and retain dignity of labour with prompt bi-weekly disbursements.
          </p>
        </div>

        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-6 text-center space-y-2.5 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#b4532f]/10 flex items-center justify-center mx-auto text-[#b4532f] mb-1">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#3a2418]">Material Authenticity</h3>
          <p className="text-xs text-[#7b6a5d] leading-relaxed">
            Certified sustainable plantation timber, chemical-free vegetable tanned leather, and natural plant dyes.
          </p>
        </div>

        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[28px] p-6 text-center space-y-2.5 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#8a3a1f]/10 flex items-center justify-center mx-auto text-[#8a3a1f] mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-[#3a2418]">Zero Guesswork Proofs</h3>
          <p className="text-xs text-[#7b6a5d] leading-relaxed">
            Every customer reviews and approves their bespoke digital proof before an artisan lifts a chisel or wax pen.
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          REGIONAL CENTERS (Soft Rounded 30px Card)
          ───────────────────────────────────────────────────────────── */}
      <div id="standards" className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 space-y-4 shadow-xs">
        <h2
          className="text-2xl font-semibold text-[#3a2418]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Artisanal Regional Hubs
        </h2>
        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3.5 p-4 rounded-[20px] bg-white border border-[#e2d5c4] shadow-xs">
            <MapPin className="w-5 h-5 text-[#b4532f] shrink-0 mt-0.5" />
            <div>
              <b className="text-[#3a2418] block text-sm">Central Province (Kandy &amp; Matale)</b>
              <p className="text-[#7b6a5d] mt-0.5 leading-relaxed">
                Traditional Teak &amp; Mahogany woodcarving, chased brass platters, and ritual oil lamp casting.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-[20px] bg-white border border-[#e2d5c4] shadow-xs">
            <MapPin className="w-5 h-5 text-[#b4532f] shrink-0 mt-0.5" />
            <div>
              <b className="text-[#3a2418] block text-sm">Southern Coast (Galle &amp; Weligama)</b>
              <p className="text-[#7b6a5d] mt-0.5 leading-relaxed">
                Vegetable-tanned leather journals inside Galle Fort and hand-waxed coastal cotton batik tapestries.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-[20px] bg-white border border-[#e2d5c4] shadow-xs">
            <MapPin className="w-5 h-5 text-[#b4532f] shrink-0 mt-0.5" />
            <div>
              <b className="text-[#3a2418] block text-sm">Western River Valleys (Kegalle &amp; Negombo)</b>
              <p className="text-[#7b6a5d] mt-0.5 leading-relaxed">
                Alluvial wheel-thrown clay terracotta pottery and pressed-flower botanical UV resin coasters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center pt-2">
        <Link
          href="/artisans"
          className="bg-[#b4532f] hover:bg-[#9e4732] text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all shadow-md inline-flex items-center gap-2"
        >
          <span>Explore Verified Artisan Profiles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
