"use client";

import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { BASE_PATH } from "@/data/basePath";
import { useState } from "react";

interface Props {
    product: Product;
}

export default function ProductDetails({ product }: Props) {
    // Try to load hero.png, fallback to frame 1.
    // Since we can't check file existence on client easily, we can use an img onError handler
    // or just default to hero.png for all if we are confident they exist.
    // For now, let's stick to the convention: public/images/{flavor}/hero.png

    const [imgSrc, setImgSrc] = useState(`${BASE_PATH}/images/${product.id}/hero.png`);

    const handleImageError = () => {
        // If hero.png doesn't exist, fall back to the first frame of the sequence
        setImgSrc(`${BASE_PATH}${product.folderPath}/1${product.imageExtension}`);
    };

    return (
        <section className="bg-white text-gray-900 relative z-20 py-32 rounded-t-[3rem] -mt-20 border-t border-gray-200 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto px-6">

                {/* Detail 1: The King of Fruits / Flavor Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                            {product.detailsSection.title}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {product.detailsSection.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4">
                            {product.stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-center"
                                >
                                    <div className="text-2xl font-bold text-gray-900 mb-1">
                                        {stat.val}
                                    </div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl"
                        style={{ background: product.gradient }}
                    >
                        <img
                            src={imgSrc}
                            alt={product.detailsSection.imageAlt}
                            onError={handleImageError}
                            className="absolute inset-0 w-full h-full object-contain p-8 hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                </div>

                {/* Freshness Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[400px] w-full rounded-3xl border border-gray-200 flex items-center justify-center order-2 md:order-1 overflow-hidden shadow-lg"
                        style={{ background: product.gradient }}
                    >
                        <div className="text-center p-8">
                            <div className="text-6xl mb-4">❄️</div>
                            <div className="uppercase tracking-widest text-sm text-white/90 font-bold drop-shadow-md">
                                Cold Chain Technology
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-1 md:order-2"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                            {product.freshnessSection.title}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            {product.freshnessSection.description}
                        </p>
                        <ul className="space-y-4">
                            {product.buyNowSection.processingParams.map((param, i) => (
                                <li key={i} className="flex items-center gap-4 text-gray-700">
                                    <span className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0 shadow-sm" />
                                    <span className="font-medium">{param}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
