"use client";

import { useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Product } from "@/data/products";
import { BASE_PATH } from "@/data/basePath";

interface Props {
    product: Product;
}

export default function ProductBottleScroll({ product }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    const imageCount = product.frameCount || 120;
    const ext = product.imageExtension || ".webp";

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, imageCount - 1]);

    // Preload all frame images
    useEffect(() => {
        setImages([]);

        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<HTMLImageElement | null>[] = [];

            for (let i = 1; i <= imageCount; i++) {
                const promise = new Promise<HTMLImageElement | null>((resolve) => {
                    const img = new Image();
                    img.src = `${BASE_PATH}${product.folderPath}/${i}${ext}`;
                    img.onload = () => resolve(img);
                    img.onerror = () => {
                        console.warn(`Failed to load: ${BASE_PATH}${product.folderPath}/${i}${ext}`);
                        resolve(null);
                    };
                    loadedImages[i - 1] = img;
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
        };

        loadImages();
    }, [product.folderPath, imageCount, ext]);

    // Render loop — draws current frame to canvas
    useEffect(() => {
        let animationId: number;

        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas || images.length === 0) {
                animationId = requestAnimationFrame(render);
                return;
            }

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const idx = Math.max(0, Math.min(Math.floor(frameIndex.get()), imageCount - 1));
            const image = images[idx];

            if (image && image.complete && image.naturalWidth > 0) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // "Contain" fit — keeps aspect ratio, centers image
                const hRatio = canvas.width / image.width;
                const vRatio = canvas.height / image.height;
                const ratio = Math.min(hRatio, vRatio);
                const cx = (canvas.width - image.width * ratio) / 2;
                const cy = (canvas.height - image.height * ratio) / 2;

                ctx.drawImage(
                    image,
                    0, 0, image.width, image.height,
                    cx, cy, image.width * ratio, image.height * ratio
                );
            }

            animationId = requestAnimationFrame(render);
        };

        animationId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationId);
    }, [images, frameIndex, imageCount]);

    // Canvas resize handler — keeps canvas crisp at any window size
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[500vh]">
            <div className={`sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden transition-opacity duration-700 ${images.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    );
}
