"use client";

import { motion } from "framer-motion";
import { Product } from "@/data/products";

interface Props {
    product: Product;
}

export default function BuyNow({ product }: Props) {
    return (
        <section className="bg-white pb-32 pt-16 relative z-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border border-gray-200 rounded-3xl p-12 text-center relative overflow-hidden group shadow-lg"
                    style={{ background: product.gradient }}
                >
                    <div className="absolute inset-0 bg-white/80 group-hover:bg-white/70 transition-all duration-500" />

                    <div className="relative z-10">
                        <h2 className="text-5xl font-bold text-gray-900 mb-2">
                            {product.buyNowSection.price}
                        </h2>
                        <p className="text-gray-500 mb-8">{product.buyNowSection.unit}</p>

                        <button className="w-full md:w-auto px-12 py-4 font-bold text-lg text-white rounded-full hover:scale-105 transition-transform duration-300 mb-8 shadow-lg"
                            style={{ background: product.gradient }}
                        >
                            Add to Cart
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-sm text-gray-500 border-t border-gray-200 pt-8 mt-8">
                            <div>
                                <strong className="text-gray-900 block mb-2">
                                    Delivery Promise
                                </strong>
                                {product.buyNowSection.deliveryPromise}
                            </div>
                            <div>
                                <strong className="text-gray-900 block mb-2">
                                    Return Policy
                                </strong>
                                {product.buyNowSection.returnPolicy}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
