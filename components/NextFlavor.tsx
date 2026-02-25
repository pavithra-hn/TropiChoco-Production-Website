"use client";

import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface Props {
    nextProduct: Product;
    onClick: () => void;
}

export default function NextFlavor({ nextProduct, onClick }: Props) {
    return (
        <section className="bg-white py-20 relative z-20">
            <div className="container mx-auto px-6">
                <motion.div
                    onClick={onClick}
                    className="relative h-64 w-full rounded-[3rem] overflow-hidden cursor-pointer group shadow-xl"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {/* Dynamic Background based on next flavor */}
                    <div
                        className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                        style={{ background: nextProduct.gradient }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 transition-transform duration-500 group-hover:-translate-y-2">
                        <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">
                            Next Flavor
                        </p>
                        <h2 className="text-5xl md:text-7xl font-bold">
                            {nextProduct.name}
                        </h2>
                        <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                            <span className="font-bold">Discover</span>
                            <span className="text-xl">→</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
