import type { Metadata } from "next";
import { Young_Serif, DM_Sans, Caveat, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Toast from "@/components/Toast";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  weight: "400",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  weight: ["600"],
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRAFTVILLA | Objects with a Human Touch",
  description: "Handmade Ceylon ceramics, bespoke teak plaques, and engraved keepsakes for a softer, more considered home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfairDisplay.variable} ${youngSerif.variable} ${dmSans.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#f4ede2] text-[#3a2418] selection:bg-[#b4532f] selection:text-[#fff6ea]">
        <Suspense
          fallback={
            <div className="h-16 border-b border-[#E2D5C4] bg-[#FBF7F0]" />
          }
        >
          <Header />
        </Suspense>
        <main className="site-main">{children}</main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Toast />
      </body>
    </html>
  );
}
