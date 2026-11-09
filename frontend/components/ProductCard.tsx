import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatLKR } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const PRODUCT_IMAGE_MAP: Record<string, string> = {
  "teak-name-plaque": "/editorial/hero.jpg",
  "batik-wall-hanging": "/editorial/collage-batik.jpg",
  "clay-oil-lamp-set": "/editorial/cat-pottery.jpg",
  "leather-journal": "/editorial/collage-leather.jpg",
  "brass-tea-tray": "/editorial/product-brass-tray.jpg",
  "resin-photo-coaster": "/editorial/cat-resin.jpg",
  "engraved-pen-box": "/editorial/cat-woodwork.jpg",
  "handloom-table-runner": "/editorial/collage-batik.jpg",
};

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = PRODUCT_IMAGE_MAP[product.id] || "/editorial/hero.jpg";

  return (
    <article className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[30px] overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Photo Frame (Real warmly lit photography thumbnail) */}
      <Link
        href={`/products/${product.id}/customize`}
        className="relative m-2.5 h-[200px] rounded-[24px] overflow-hidden bg-[#e2d5c4] block group"
      >
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {product.leadTimeDays && (
          <span className="absolute top-2.5 right-2.5 bg-[#fbf7f0]/90 backdrop-blur-xs text-[#3a2418] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#e2d5c4] shadow-xs">
            ⚡ {product.leadTimeDays}d Craft
          </span>
        )}
      </Link>

      {/* Card Info */}
      <div className="p-4 pt-2 flex-1 flex flex-col justify-between">
        <div>
          <span className="inline-block bg-[#b4532f]/15 text-[#8a3a1f] rounded-full px-2.5 py-0.5 text-[11px] font-bold mb-1.5">
            Customizable
          </span>
          <h3
            className="text-xl sm:text-[22px] font-semibold text-[#3a2418] leading-snug truncate"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <Link
              href={`/products/${product.id}/customize`}
              className="hover:text-[#b4532f] transition-colors"
            >
              {product.name}
            </Link>
          </h3>
          <small className="text-xs text-[#7b6a5d] block mt-0.5">
            By{" "}
            <Link
              href={`/artisans/${product.artisanSlug}`}
              className="hover:underline hover:text-[#3a2418] transition-colors"
            >
              {product.artisanName}
            </Link>{" "}
            · {product.material}
          </small>
        </div>

        {/* Bottom Row: Price & Customize Button */}
        <div className="pt-3 mt-3 border-t border-[#e2d5c4]/60 flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-[#3a2418]">
            From {formatLKR(product.basePrice)}
          </span>

          <Link
            href={`/products/${product.id}/customize`}
            className="bg-[#3a2418] hover:bg-[#b4532f] text-[#f4ede2] text-xs font-bold px-4 py-2 rounded-full transition-colors"
            aria-label={`Customize ${product.name}`}
          >
            Customize
          </Link>
        </div>
      </div>
    </article>
  );
}
