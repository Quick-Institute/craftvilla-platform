"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useToastStore } from "@/lib/store/toastStore";
import { Hammer, UploadCloud, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function ArtisanRegisterPortal() {
  const router = useRouter();
  const { register } = useAuthStore();
  const { showToast } = useToastStore();

  const [studioName, setStudioName] = useState("");
  const [makerName, setMakerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("Kandy");
  const [category, setCategory] = useState("Woodwork & Carvings");
  const [experienceYears, setExperienceYears] = useState("10+ years");
  const [bio, setBio] = useState("");
  const [portfolioUploaded, setPortfolioUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!studioName || !makerName || !email || !password) {
      showToast("Please fill in all essential workshop credentials");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Register with ARTISAN role
      register(`${makerName} (${studioName})`, email, "ARTISAN");
      setIsSubmitting(false);
      showToast("Artisan application submitted! Studio portal unlocked.");
      router.push("/artisan");
    }, 600);
  };

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
            <Hammer className="w-3.5 h-3.5 text-[#b4532f]" />
            <span>Artisan Studio Onboarding</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-2.5"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Open Your Craft Storefront
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            Keep over 85% of every sale. Receive bespoke customer specifications, approve digital proofs, and craft with guaranteed fair payment.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          APPLICATION FORM (Soft Rounded 32px Card)
          ───────────────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[32px] p-6 sm:p-10 space-y-6 shadow-xs">
        {/* Section 1 */}
        <div className="space-y-4">
          <h2
            className="text-xl font-semibold text-[#3a2418] pb-2 border-b border-[#e2d5c4]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            1. Workshop &amp; Maker Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="studio-name" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                Workshop / Studio Name
              </label>
              <input
                type="text"
                id="studio-name"
                placeholder="e.g. Kandy Teak Guild"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                required
                className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="maker-name" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                Master Craftsperson Name
              </label>
              <input
                type="text"
                id="maker-name"
                placeholder="e.g. Bandara Weerasinghe"
                value={makerName}
                onChange={(e) => setMakerName(e.target.value)}
                required
                className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="art-email" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                Studio Contact Email
              </label>
              <input
                type="email"
                id="art-email"
                placeholder="studio@craftvilla.lk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="art-pw" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                Portal Password
              </label>
              <input
                type="password"
                id="art-pw"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Craft Discipline & Location */}
        <div className="space-y-4">
          <h2
            className="text-xl font-semibold text-[#3a2418] pb-2 border-b border-[#e2d5c4]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            2. Craft Heritage &amp; Location
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="craft-loc" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                Workshop Province
              </label>
              <select
                id="craft-loc"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none"
              >
                <option value="Kandy">Kandy (Central)</option>
                <option value="Weligama">Weligama (Southern)</option>
                <option value="Galle Fort">Galle Fort (Southern)</option>
                <option value="Kegalle">Kegalle (Sabaragamuwa)</option>
                <option value="Negombo">Negombo (Western)</option>
                <option value="Matale">Matale (Central)</option>
                <option value="Anuradhapura">Anuradhapura (North Central)</option>
              </select>
            </div>

            <div>
              <label htmlFor="craft-cat" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                Primary Discipline
              </label>
              <select
                id="craft-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none"
              >
                <option value="Woodwork & Carvings">Woodwork &amp; Joinery</option>
                <option value="Resin Floral Art">Resin Botanical Art</option>
                <option value="Wheel-Thrown Pottery">Wheel-Thrown Pottery</option>
                <option value="Wax-Resist Batik">Wax-Resist Dyed Batik</option>
                <option value="Handmade Leather">Hand-Stitched Leather</option>
                <option value="Brass & Metal">Chased Brass &amp; Metal</option>
              </select>
            </div>

            <div>
              <label htmlFor="craft-exp" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                Studio Experience
              </label>
              <select
                id="craft-exp"
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none"
              >
                <option value="3-5 years">3–5 years</option>
                <option value="5-10 years">5–10 years</option>
                <option value="10+ years">10+ years (Master)</option>
                <option value="Generational (2+ gens)">Multi-generational</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="art-bio" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
              Workshop Story &amp; Technique Summary
            </label>
            <textarea
              id="art-bio"
              rows={3}
              placeholder="Tell shoppers about your timber seasoning, wheel-thrown techniques, natural dyes, and workshop heritage..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] placeholder:text-[#7b6a5d]/70 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Section 3: Portfolio & Workshop Photos */}
        <div className="space-y-4">
          <h2
            className="text-xl font-semibold text-[#3a2418] pb-2 border-b border-[#e2d5c4]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            3. Workshop Verification &amp; Portfolio
          </h2>

          <div
            onClick={() => {
              setPortfolioUploaded(true);
              showToast("Portfolio photos attached ✓");
            }}
            className="border-2 border-dashed border-[#e2d5c4] p-6 rounded-[22px] text-center cursor-pointer hover:border-[#b4532f] bg-white/60 transition-colors"
          >
            <UploadCloud className="w-8 h-8 text-[#b4532f] mx-auto mb-1.5" />
            <p className="text-xs font-bold text-[#3a2418]">
              {portfolioUploaded
                ? "✓ 3 Workshop sample photos attached!"
                : "Click to upload photos of your workshop, tools, and recent pieces"}
            </p>
            <p className="text-[11px] text-[#7b6a5d] mt-0.5">
              PNG / JPG (Min 2 photos required for verification badge)
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#b4532f] hover:bg-[#9e4732] disabled:opacity-50 text-white font-bold text-sm py-3.5 px-6 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{isSubmitting ? "Submitting Workshop Credentials..." : "Submit Artisan Application"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-[11px] text-[#7b6a5d]">
          Our verification team will review your workshop submission within 24 hours. Once verified, your pieces will be published to the catalog.
        </p>
      </form>
    </div>
  );
}
