"use client";

import React, { useState } from "react";
import { useToastStore } from "@/lib/store/toastStore";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const { showToast } = useToastStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Order Inquiry");
  const [message, setMessage] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showToast("Please fill in all inquiry fields");
      return;
    }
    setTicketId(Math.floor(1000 + Math.random() * 9000).toString());
    setSubmitted(true);
    showToast("Message received! Our team will respond within 4 hours.");
  };

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
            <MessageSquare className="w-3.5 h-3.5 text-[#b4532f]" />
            <span>Customer &amp; Artisan Care</span>
          </span>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight mb-3"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          >
            Direct Support &amp; Concierge
          </h1>

          <p className="text-[#7b6a5d] text-base leading-relaxed">
            Need assistance with a bespoke plaque engraving, corporate hamper curation, or artisan partnership? Our Colombo studio concierge is here to help.
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          CONTACT SPLIT: SUPPORT CARDS & INQUIRY FORM
          ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Support Info Cards */}
        <div className="space-y-4 md:col-span-4">
          <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 space-y-1.5 text-xs shadow-xs">
            <Mail className="w-5 h-5 text-[#b4532f] mb-1" />
            <b className="text-[#3a2418] text-sm block">Email Support</b>
            <p className="text-[#7b6a5d]">support@craftvilla.lk</p>
            <p className="text-[#7b6a5d]">artisans@craftvilla.lk</p>
          </div>

          <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 space-y-1.5 text-xs shadow-xs">
            <Phone className="w-5 h-5 text-[#5f6b35] mb-1" />
            <b className="text-[#3a2418] text-sm block">Hotline &amp; WhatsApp</b>
            <p className="text-[#7b6a5d]">+94 (11) 284-9020</p>
            <p className="text-[#7b6a5d]">+94 (77) 419-8800</p>
          </div>

          <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 space-y-1.5 text-xs shadow-xs">
            <Clock className="w-5 h-5 text-[#8a3a1f] mb-1" />
            <b className="text-[#3a2418] text-sm block">Hours of Operation</b>
            <p className="text-[#7b6a5d]">Mon – Sat: 8:30 AM – 6:30 PM</p>
            <p className="text-[#7b6a5d]">Sunday: Closed for workshop rest</p>
          </div>

          <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[24px] p-5 space-y-1.5 text-xs shadow-xs">
            <MapPin className="w-5 h-5 text-[#b4532f] mb-1" />
            <b className="text-[#3a2418] text-sm block">Headquarters Studio</b>
            <p className="text-[#7b6a5d] leading-relaxed">
              45 Queen&apos;s Road, Colombo 03, Sri Lanka
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] p-6 sm:p-8 md:col-span-8 shadow-xs">
          <h2
            className="text-2xl font-semibold text-[#3a2418] mb-4 pb-2 border-b border-[#e2d5c4]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Send a Direct Message
          </h2>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#5f6b35] mx-auto" />
              <h3
                className="text-2xl font-semibold text-[#3a2418]"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                Thank you, {name}!
              </h3>
              <p className="text-xs text-[#7b6a5d] max-w-sm mx-auto leading-relaxed">
                Your message has been assigned reference ticket <b className="text-[#3a2418]">#TKT-{ticketId}</b>. A concierge specialist will reply to {email} shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage("");
                }}
                className="bg-transparent hover:bg-white/60 border border-[#e2d5c4] text-[#3a2418] text-xs font-bold py-2.5 px-6 rounded-full mt-3 cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="inq-name" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="inq-name"
                    placeholder="Poorni Gamage"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="inq-email" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="inq-email"
                    placeholder="poorni@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="inq-subject" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                  Inquiry Topic
                </label>
                <select
                  id="inq-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none"
                >
                  <option value="Order Inquiry">Order Inscription &amp; Delivery Status</option>
                  <option value="Artisan Partnership">Artisan Storefront Application</option>
                  <option value="Corporate Hampers">Custom Corporate Gift Hampers</option>
                  <option value="Quality Concern">Craft Quality or Dispute Report</option>
                </select>
              </div>

              <div>
                <label htmlFor="inq-msg" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
                  Message
                </label>
                <textarea
                  id="inq-msg"
                  rows={4}
                  placeholder="Describe your inquiry or order reference..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] placeholder:text-[#7b6a5d]/70 focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#b4532f] hover:bg-[#9e4732] text-white font-bold text-sm py-3.5 px-6 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
