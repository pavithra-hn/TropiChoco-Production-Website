"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";
import ProductDetails from "@/components/ProductDetails";
import BuyNow from "@/components/BuyNow";
import NextFlavor from "@/components/NextFlavor";
import Footer from "@/components/Footer";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const product = products[currentIndex];
  const nextIndex = (currentIndex + 1) % products.length;
  const nextProduct = products[nextIndex];

  // Scroll Reset on flavor change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentIndex]);

  const handleNext = () => setCurrentIndex(nextIndex);
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);

  return (
    <main className="min-h-screen font-sans bg-white relative">
      <Navbar />

      {/* FIXED GLOBAL BACKGROUND — Smooth color transition, no white flash */}
      <div
        className="fixed inset-0 -z-20 transition-all duration-1000 ease-in-out"
        style={{ background: product.gradient }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Note: Background was moved out to prevent flashing during unmount */}

          {/* === SCROLLYTELLING ZONE === */}
          <div className="relative">
            <ProductBottleScroll product={product} />
            <ProductTextOverlays product={product} />
          </div>

          {/* === WHITE CONTENT SECTIONS === */}
          <ProductDetails product={product} />
          <BuyNow product={product} />
          <NextFlavor nextProduct={nextProduct} onClick={handleNext} />
        </motion.div>
      </AnimatePresence>

      {/* Fixed Navigation Controls */}
      <div className="fixed bottom-10 left-0 right-0 z-50 flex items-center justify-center gap-8 pointer-events-none">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="pointer-events-auto w-12 h-12 bg-white/90 shadow-lg backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all border border-gray-200 hover:scale-110"
          aria-label="Previous flavor"
        >
          ←
        </button>

        {/* Pill Menu */}
        <div className="pointer-events-auto bg-white/90 shadow-lg backdrop-blur-xl border border-gray-200 rounded-full px-2 py-2 flex gap-2">
          {products.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase transition-all duration-300 ${currentIndex === idx
                  ? "bg-gray-900 text-white shadow-lg"
                  : "text-gray-400 hover:text-gray-900 hover:bg-gray-100"
                }`}
              aria-label={`Select ${p.name}`}
            >
              {p.id}
            </button>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="pointer-events-auto w-12 h-12 bg-white/90 shadow-lg backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 hover:bg-white transition-all border border-gray-200 hover:scale-110"
          aria-label="Next flavor"
        >
          →
        </button>
      </div>

      <Footer />
    </main>
  );
}
