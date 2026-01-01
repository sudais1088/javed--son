"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const HERO_ASSETS = [
    { type: "image", src: "/hero pic 1.jpg" }, // Start with Image for faster LCP
    { type: "video", src: "/hero video 1.mp4" },
    { type: "image", src: "/hero pic 2.jpg" },
    { type: "video", src: "/hero video 2.mp4" },
    { type: "image", src: "/hero pic 3.jpg" },
    { type: "video", src: "/hero video 3.mp4" },
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_ASSETS.length);
        }, 5000); // Faster cycle: 5s

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-screen bg-black overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }} // Reduce scale effect to 1.05 for less GPU work
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }} // Faster transition: 0.8s
                    className="absolute inset-0 w-full h-full"
                >
                    {HERO_ASSETS[currentIndex].type === "video" ? (
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        >
                            <source src={HERO_ASSETS[currentIndex].src} type="video/mp4" />
                        </video>
                    ) : (
                        <div className="relative w-full h-full">
                            <Image
                                src={HERO_ASSETS[currentIndex].src}
                                alt="Javed Sons Hero"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Subtle Dark Overlay for Consistency */}
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Hero Content Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#E3B658] to-[#bf953f] drop-shadow-lg mb-6 tracking-wider">
                        JAVED SONS
                    </h1>
                    <p className="text-white/90 text-lg md:text-2xl uppercase tracking-[0.3em] font-light max-w-2xl mx-auto">
                        Sweet | Bakers | Confectionery
                    </p>

                    <div className="mt-12">
                        <Link href="/menu">
                            <button className="px-8 py-3 md:px-10 md:py-4 border border-[#E3B658] text-[#E3B658] hover:bg-[#E3B658] hover:text-black transition-all duration-300 uppercase tracking-widest font-bold text-sm md:text-base">
                                Explore Our Menu
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
                {HERO_ASSETS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-[#E3B658] w-8" : "bg-white/50 hover:bg-white"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
