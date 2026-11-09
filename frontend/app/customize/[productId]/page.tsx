import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/data";
import Customizer from "@/components/Customizer";
import { ArrowLeft, Sparkles, Clock, ShieldCheck } from "lucide-react";

interface CustomizePageProps {
  params: Promise<{ productId: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    productId: product.id,
  }));
}

export default async function CustomizePage({ params }: CustomizePageProps) {
  const { productId } = await params;
  const product = PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e2d5c4]">
        <Link
          href="/catalog"
          className="bg-[#fbf7f0] border border-[#e2d5c4] rounded-full px-4 py-2 text-xs font-semibold text-[#7b6a5d] hover:text-[#3a2418] hover:border-[#3a2418] inline-flex items-center gap-1.5 transition-all shadow-xs shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Craft Catalog</span>
        </Link>

        {/* Quick customizable craft switcher */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7b6a5d] mr-1 shrink-0">
            Switch:
          </span>
          {PRODUCTS.slice(0, 5).map((p) => (
            <Link
              key={p.id}
              href={`/customize/${p.id}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all border-[1.5px] ${
                p.id === productId
                  ? "bg-[#3a2418] text-[#f4ede2] border-[#3a2418] shadow-xs"
                  : "bg-[#fbf7f0] text-[#7b6a5d] border-[#e2d5c4] hover:border-[#3a2418] hover:text-[#3a2418]"
              }`}
            >
              {p.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Hero Banner */}
      <section
        className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 border border-[#e2d5c4]/70 shadow-sm"
        style={{
          background: "linear-gradient(120deg, var(--h1, #eadccb), var(--h2, #cdb4a6))",
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-semibold text-[#5b5a3a]">
              <Sparkles className="w-3.5 h-3.5 text-[#b4532f]" />
              <span>Interactive Bespoke Studio</span>
            </span>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-medium text-[#8a3a1f] tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
            >
              Personalize: {product.name}
            </h1>

            <p className="text-[#7b6a5d] text-base leading-relaxed">
              Handcrafted by <b className="text-[#3a2418]">{product.artisanName}</b> · {product.material}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xs border border-[#e2d5c4] px-4 py-2.5 rounded-full text-xs shadow-xs shrink-0">
            <div className="flex items-center gap-1.5 text-[#3a2418] font-semibold">
              <Clock className="w-4 h-4 text-[#b4532f]" />
              <span>{product.leadTimeDays}d Crafting</span>
            </div>
            <div className="border-l border-[#e2d5c4] pl-3 flex items-center gap-1.5 text-[#5f6b35] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#5f6b35]" />
              <span>Proof Approval Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      <Customizer product={product} />
    </div>
  );
}
