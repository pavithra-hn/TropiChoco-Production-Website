"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Product } from "@/data/products";

interface Props {
    product: Product;
}

interface SectionProps {
    title: string;
    subtitle: string;
    opacity: MotionValue<number>;
    y: MotionValue<number>;
    align?: "left" | "center" | "right";
}

function Section({ title, subtitle, opacity, y, align = "center" }: SectionProps) {
    return (
        <motion.div
            style={{ opacity, y }}
            className={`fixed top-1/2 -translate-y-1/2 w-full px-6 pointer-events-none z-20 flex ${align === "left"
                    ? "justify-start md:pl-32"
                    : align === "right"
                        ? "justify-end md:pr-32"
                        : "justify-center text-center"
                }`}
        >
            <div className="max-w-xl">
                <h2 className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg leading-tight text-white">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-xl md:text-2xl font-light text-white/90 drop-shadow-md">
                        {subtitle}
                    </p>
                )}
            </div>
        </motion.div>
    );
}

export default function ProductTextOverlays({ product }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const useFade = (start: number, end: number) => {
        return useTransform(
            scrollYProgress,
            [start, start + 0.05, end - 0.05, end],
            [0, 1, 1, 0]
        );
    };

    const useY = (start: number, end: number) => {
        return useTransform(scrollYProgress, [start, end], [50, -50]);
    };

    const opacity1 = useFade(0, 0.2);
    const y1 = useY(0, 0.2);
    const opacity2 = useFade(0.25, 0.45);
    const y2 = useY(0.25, 0.45);
    const opacity3 = useFade(0.5, 0.7);
    const y3 = useY(0.5, 0.7);
    const opacity4 = useFade(0.75, 0.95);
    const y4 = useY(0.75, 0.95);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 h-[500vh] pointer-events-none"
        >
            <Section title={product.section1.title} subtitle={product.section1.subtitle} opacity={opacity1} y={y1} />
            <Section title={product.section2.title} subtitle={product.section2.subtitle} opacity={opacity2} y={y2} align="left" />
            <Section title={product.section3.title} subtitle={product.section3.subtitle} opacity={opacity3} y={y3} align="right" />
            <Section title={product.section4.title} subtitle={product.section4.subtitle} opacity={opacity4} y={y4} />
        </div>
    );
}
