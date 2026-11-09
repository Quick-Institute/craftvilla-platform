"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cartStore";
import { useAuthStore } from "@/lib/store/authStore";
import { useToastStore } from "@/lib/store/toastStore";
import { useIsMounted } from "@/lib/useIsMounted";
import { PRODUCTS } from "@/lib/data";
import {
  Search,
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  User as UserIcon,
  RotateCcw,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const mounted = useIsMounted();
  const { getTotalCount } = useCartStore();
  const { user } = useAuthStore();
  const { showToast } = useToastStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase());
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchResults = debouncedQuery
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(debouncedQuery) ||
          p.material.toLowerCase().includes(debouncedQuery) ||
          p.artisanName.toLowerCase().includes(debouncedQuery)
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
  };

  const cartCount = mounted ? getTotalCount() : 0;

  const isActive = (path: string) => {
    if (path === "/catalog") return pathname.startsWith("/catalog");
    if (path === "/artisans") return pathname.startsWith("/artisan");
    if (path === "/customizer")
      return pathname.includes("customize") || pathname.startsWith("/customizer");
    if (path === "/hampers") return pathname.startsWith("/hamper");
    if (path === "/track") return pathname.startsWith("/track");
    if (path === "/account") return pathname.startsWith("/account") || pathname.startsWith("/login");
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBF7F0]/95 backdrop-blur-md border-b border-[#E2D5C4] transition-all">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand Logo in Title-Case Serif Cormorant Garamond */}
        <Link
          href="/"
          className="text-[28px] sm:text-[32px] font-medium text-[#8a3a1f] hover:opacity-90 transition-opacity select-none leading-none tracking-tight flex items-center gap-1.5"
          style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
          aria-label="CraftVilla Home"
        >
          <span>Craft</span> <span>Villa</span>
        </Link>

        {/* Desktop Navigation Links: Exact Spec (SHOP, ARTISANS, ✦ CUSTOMIZER, HAMPERS, TRACK ORDER, SHOPPER, Cart) */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1.5 overflow-x-auto">
          <Link
            href="/catalog"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all ${
              isActive("/catalog")
                ? "bg-[#3A2418] text-[#F4EDE2]"
                : "text-[#7B6A5D] hover:text-[#3A2418] hover:bg-[#3A2418]/5"
            }`}
          >
            SHOP
          </Link>

          <Link
            href="/artisans"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all ${
              isActive("/artisans")
                ? "bg-[#3A2418] text-[#F4EDE2]"
                : "text-[#7B6A5D] hover:text-[#3A2418] hover:bg-[#3A2418]/5"
            }`}
          >
            ARTISANS
          </Link>

          <Link
            href="/products/teak-name-plaque/customize"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all flex items-center gap-1 ${
              isActive("/customizer")
                ? "bg-[#B2533E] text-white"
                : "text-[#B2533E] hover:bg-[#B2533E]/10"
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#B2533E] fill-current" />
            <span>✦ CUSTOMIZER</span>
          </Link>

          <Link
            href="/hampers"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all ${
              isActive("/hampers")
                ? "bg-[#3A2418] text-[#F4EDE2]"
                : "text-[#7B6A5D] hover:text-[#3A2418] hover:bg-[#3A2418]/5"
            }`}
          >
            HAMPERS
          </Link>

          <Link
            href="/track"
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all ${
              isActive("/track")
                ? "bg-[#3A2418] text-[#F4EDE2]"
                : "text-[#7B6A5D] hover:text-[#3A2418] hover:bg-[#3A2418]/5"
            }`}
          >
            TRACK ORDER
          </Link>

          {/* SHOPPER Link */}
          {mounted && user ? (
            <Link
              href="/account"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all flex items-center gap-1 ${
                isActive("/account")
                  ? "bg-[#3A2418] text-[#F4EDE2]"
                  : "text-[#7B6A5D] hover:text-[#3A2418] hover:bg-[#3A2418]/5"
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>SHOPPER</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.1em] transition-all flex items-center gap-1 ${
                isActive("/account")
                  ? "bg-[#3A2418] text-[#F4EDE2]"
                  : "text-[#7B6A5D] hover:text-[#3A2418] hover:bg-[#3A2418]/5"
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>SHOPPER</span>
            </Link>
          )}

          {/* Search Toggle Icon */}
          <div ref={searchContainerRef} className="relative">
            <button
              type="button"
              onClick={handleOpenSearch}
              className="p-2 text-[#7B6A5D] hover:text-[#3A2418] hover:bg-[#3A2418]/5 rounded-full transition-colors cursor-pointer"
              aria-label="Search catalog"
            >
              <Search className="w-4 h-4" />
            </button>

            {isSearchOpen && (
              <form
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-full mt-2 w-72 bg-[#FBF7F0] border border-[#E2D5C4] rounded-2xl p-2 shadow-xl z-50 flex items-center"
              >
                <Search className="w-3.5 h-3.5 text-[#7B6A5D] ml-2 mr-2" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search craft, maker, clay..."
                  className="w-full text-xs bg-transparent text-[#3A2418] placeholder:text-[#7B6A5D]/60 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-2 py-1 bg-[#B2533E] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider ml-1"
                >
                  Go
                </button>
              </form>
            )}
          </div>

          {/* Cart Pill Button */}
          <Link
            href="/cart"
            className="ml-2 inline-flex items-center gap-1.5 bg-[#3A2418] text-[#F4EDE2] hover:bg-[#241913] px-4 py-2 rounded-full text-xs font-bold tracking-wider transition-all shadow-xs"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Cart</span>
            <b
              id="cc"
              className="bg-[#B2533E] text-white rounded-full px-1.5 py-0.2 text-[11px] font-bold min-w-[18px] text-center ml-0.5"
            >
              {cartCount}
            </b>
          </Link>
        </nav>

        {/* Mobile Header Controls */}
        <div className="flex lg:hidden items-center gap-2.5">
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 bg-[#3A2418] text-[#F4EDE2] px-3 py-1.5 rounded-full text-xs font-bold tracking-wider"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="bg-[#B2533E] text-white rounded-full px-1.5 text-[11px]">
              {cartCount}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#3A2418] hover:text-[#B2533E] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2D5C4] bg-[#FBF7F0] px-4 py-4 space-y-2">
          <Link
            href="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-bold uppercase tracking-wider text-[#3A2418]"
          >
            SHOP
          </Link>
          <Link
            href="/artisans"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-bold uppercase tracking-wider text-[#3A2418]"
          >
            ARTISANS
          </Link>
          <Link
            href="/products/teak-name-plaque/customize"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-bold uppercase tracking-wider text-[#B2533E] flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B2533E]" />
            <span>✦ CUSTOMIZER</span>
          </Link>
          <Link
            href="/hampers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-bold uppercase tracking-wider text-[#3A2418]"
          >
            HAMPERS
          </Link>
          <Link
            href="/track"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-bold uppercase tracking-wider text-[#3A2418]"
          >
            TRACK ORDER
          </Link>
          <Link
            href={user ? "/account" : "/login"}
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-bold uppercase tracking-wider text-[#7B6A5D]"
          >
            SHOPPER
          </Link>
        </div>
      )}
    </header>
  );
}
