"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSent(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setNewsletterSent(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#7a2410] text-[#f4ede2] rounded-t-[32px] sm:rounded-t-[44px] transition-colors mt-12 sm:mt-16">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/15">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="text-[32px] font-medium text-[#f4ede2] block mb-2 leading-none"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
            >
              <span>Craft</span> <span>Villa</span>
            </Link>
            <p className="text-xs text-[#f4ede2]/85 leading-relaxed font-light max-w-sm">
              Handmade gifts from Sri Lanka’s finest craftspeople, personalized by you.
            </p>
          </div>

          {/* Column 2: Shop Links */}
          <div className="lg:col-span-2">
            <h4
              className="text-[20px] font-semibold text-[#f4ede2] mb-3"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Shop
            </h4>
            <ul className="space-y-2 text-xs text-[#f4ede2]/85">
              <li>
                <Link href="/catalog" className="hover:text-white transition-colors">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/hampers" className="hover:text-white transition-colors">
                  Gift hampers
                </Link>
              </li>
              <li>
                <Link href="/products/teak-name-plaque/customize" className="hover:text-white transition-colors">
                  Customizer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Makers Links */}
          <div className="lg:col-span-2">
            <h4
              className="text-[20px] font-semibold text-[#f4ede2] mb-3"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Makers
            </h4>
            <ul className="space-y-2 text-xs text-[#f4ede2]/85">
              <li>
                <Link href="/artisans" className="hover:text-white transition-colors">
                  Our artisans
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Sell with us
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-white transition-colors">
                  Track an order
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-4">
            <h4
              className="text-[20px] font-semibold text-[#f4ede2] mb-2"
              style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
            >
              Join our journey
            </h4>
            <p className="text-xs text-[#f4ede2]/85 leading-relaxed font-light mb-3">
              New pieces and maker stories, now and then.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full px-4 py-2.5 bg-transparent border border-[#f4ede2]/50 text-xs text-[#f4ede2] placeholder:text-[#f4ede2]/70 focus:outline-none focus:border-[#f4ede2] transition-colors rounded-xs"
              />
              <button
                type="submit"
                className="mt-2 text-xs font-bold uppercase tracking-wider text-[#f4ede2] hover:underline cursor-pointer block"
              >
                {newsletterSent ? "Thank you ✓" : "Subscribe →"}
              </button>
            </form>
          </div>

        </div>

        {/* Legal Bar */}
        <div className="pt-6 text-xs text-[#f4ede2]/80 text-center sm:text-left">
          © 2026 CraftVilla · Made by hand in Sri Lanka
        </div>

      </div>
    </footer>
  );
}
