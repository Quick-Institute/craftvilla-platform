"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useToastStore } from "@/lib/store/toastStore";
import { UserRole } from "@/lib/types";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  const { login } = useAuthStore();
  const { showToast } = useToastStore();

  const [role, setRole] = useState<UserRole>("CUSTOMER");
  const [email, setEmail] = useState<string>("shopper@craftvilla.lk");
  const [password, setPassword] = useState<string>("craft123");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const em = email.trim();

    if (!/^\S+@\S+\.\S+$/.test(em)) {
      setError("Enter a valid email, like name@example.com.");
      return;
    }

    if (password.length < 6) {
      setError("Password needs at least 6 characters.");
      return;
    }

    setError("");
    const user = login(em, role);
    showToast(`Welcome, ${user.name}`);

    if (redirect === "cart") {
      router.push("/cart");
    } else if (redirect === "checkout") {
      router.push("/checkout");
    } else if (role === "ARTISAN") {
      router.push("/artisan");
    } else if (role === "ADMIN") {
      router.push("/admin");
    } else {
      router.push("/account");
    }
  };

  return (
    <div className="bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] rounded-[32px] p-8 sm:p-10 max-w-md mx-auto shadow-sm space-y-6">
      {/* Pill Tab Switcher */}
      <div className="flex gap-2 p-1.5 bg-[#f4ede2] rounded-full border border-[#e2d5c4]">
        <Link
          href="/login"
          className="flex-1 py-2 text-center rounded-full text-xs font-bold bg-[#3a2418] text-[#f4ede2] shadow-xs transition-all"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="flex-1 py-2 text-center rounded-full text-xs font-semibold text-[#7b6a5d] hover:text-[#3a2418] transition-all"
        >
          Create Account
        </Link>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
            I am signing in as a
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none transition-colors"
          >
            <option value="CUSTOMER">Gift Shopper</option>
            <option value="ARTISAN">Artisan Maker</option>
            <option value="ADMIN">Platform Administrator</option>
          </select>
        </div>

        <div>
          <label htmlFor="em" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="em"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label htmlFor="pw" className="text-xs font-bold uppercase tracking-wider text-[#7b6a5d] block mb-1">
            Password
          </label>
          <input
            type="password"
            id="pw"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-xs p-3 bg-[#fbf7f0] border-[1.5px] border-[#e2d5c4] focus:border-[#b4532f] rounded-[16px] text-[#3a2418] focus:outline-none transition-colors"
          />
        </div>

        {error && (
          <div className="p-3 rounded-[14px] bg-red-50 border border-red-200 text-xs text-red-700" role="alert">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#b4532f] hover:bg-[#9e4732] text-white font-bold text-sm py-3.5 px-6 rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <span>Sign In to Account</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-[11px] text-[#7b6a5d] pt-1">
          Demo mode: Select any role above. Use any email and 6+ character password to sign in.
        </p>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6 py-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 uppercase tracking-[0.22em] text-xs font-semibold text-[#5b5a3a]">
          <Sparkles className="w-3.5 h-3.5 text-[#b4532f]" />
          <span>Access CraftVilla</span>
        </span>
        <h1
          className="text-3xl sm:text-4xl font-medium text-[#8a3a1f] tracking-tight"
          style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
        >
          Welcome Back to CraftVilla
        </h1>
        <p className="text-sm text-[#7b6a5d] max-w-sm mx-auto">
          Sign in to track orders, manage your artisan workshop, or access the admin portal.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="bg-[#fbf7f0] border border-[#e2d5c4] rounded-[28px] p-8 text-center text-[#7b6a5d]">
            Loading sign in...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
