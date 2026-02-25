"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 py-4 shadow-sm"
                    : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 relative">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full text-orange-500"
                        >
                            <path
                                d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 uppercase tracking-wider">
                        Nano Banana
                    </span>
                </Link>

                <button
                    className={`relative px-6 py-2 rounded-full font-bold text-sm overflow-hidden group transition-all ${isScrolled
                            ? "bg-gray-900 text-white hover:bg-gray-800 shadow-lg"
                            : "bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:shadow-[0_0_20px_rgba(255,165,0,0.5)]"
                        }`}
                >
                    <span className="relative z-10">Order Now</span>
                </button>
            </div>
        </motion.nav>
    );
}
