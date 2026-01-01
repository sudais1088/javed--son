"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORIES = [
    { name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop" },
    { name: "Sweets", image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=300&auto=format&fit=crop" },
    { name: "Breads", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=300&auto=format&fit=crop" },
    { name: "Bakery", image: "/bakery 1.jpg" }, // Used user's bakery 1 for generic/dry or similar if needed, user said "bakery 1 in dry items" actually.
    { name: "Cakes", image: "/cake.jpg" },
    { name: "Pastries", image: "/bakery 2.jpg" },
    { name: "Dry Items", image: "/bakery 1.jpg" }, // User said "bakery 1 in area of dry item". I will use it here.
];

export default function MenuCategories() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300; // Adjust scroll distance
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section id="menu" className="py-24 bg-black relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#E3B658]/30 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#E3B658] mb-4">
                        Our Categories
                    </h2>
                    <p className="text-white/60 uppercase tracking-widest text-sm">
                        Swipe to explore delicacies
                    </p>
                </div>

                <div className="relative group">
                    {/* Navigation Buttons (Visible on All Screens) */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/50 border border-[#E3B658]/30 hover:bg-[#E3B658] hover:text-black hover:border-[#E3B658] text-[#E3B658] transition-all duration-300 backdrop-blur-sm -translate-x-2 md:-translate-x-4"
                        aria-label="Scroll Left"
                    >
                        <ChevronLeft size={20} className="md:w-6 md:h-6" />
                    </button>

                    <button
                        onClick={() => scroll("right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/50 border border-[#E3B658]/30 hover:bg-[#E3B658] hover:text-black hover:border-[#E3B658] text-[#E3B658] transition-all duration-300 backdrop-blur-sm translate-x-2 md:translate-x-4"
                        aria-label="Scroll Right"
                    >
                        <ChevronRight size={20} className="md:w-6 md:h-6" />
                    </button>

                    {/* Slider Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto gap-8 py-8 px-4 scrollbar-hide snap-xSnap-mandatory"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            scrollSnapType: 'x mandatory'
                        }}
                    >
                        {CATEGORIES.map((category, index) => (
                            <div key={index} className="flex-shrink-0 snap-center">
                                <CategoryItem category={category} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function CategoryItem({ category }: { category: { name: string; image: string } }) {
    // Use a fixed nicely shaped doodle for consistency in the slider, or keep random
    // Keeping random but pre-calculating might cause hydration mismatch if not careful.
    // Using a stable nice shape for the slider to look clean.
    const shape = "50% 50% 50% 50% / 50% 50% 50% 50%"; // Circle primarily, animating to blob

    return (
        <Link href="/menu">
            <motion.div
                className="group cursor-pointer flex flex-col items-center w-32 md:w-48" // Fixed width for consistent spacing
                whileHover="hover"
                initial="initial"
            >
                {/* Doodle Image Container */}
                <motion.div
                    className="relative w-28 h-28 md:w-40 md:h-40 overflow-hidden border-2 border-[#E3B658]/20 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-black"
                    style={{ borderRadius: "50%" }}
                    animate={{
                        borderRadius: [
                            "60% 40% 30% 70% / 60% 30% 70% 40%",
                            "40% 60% 70% 30% / 40% 50% 60% 50%",
                            "60% 40% 30% 70% / 60% 30% 70% 40%"
                        ]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="absolute inset-0 bg-[#E3B658]/10 group-hover:bg-[#E3B658]/0 transition-colors duration-500 z-10" />
                    <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Inner Border Ring */}
                    <div className="absolute inset-0 border border-white/10 rounded-[inherit] pointer-events-none" />
                </motion.div>

                {/* Title */}
                <div className="mt-6 text-center relative w-full">
                    <motion.h3
                        className="text-lg md:text-xl font-serif text-white/80 group-hover:text-[#E3B658] transition-colors duration-300"
                        variants={{
                            hover: { y: -5 },
                            initial: { y: 0 }
                        }}
                    >
                        {category.name}
                    </motion.h3>
                    <motion.div
                        className="h-px bg-[#E3B658] w-0 mx-auto mt-2"
                        variants={{
                            hover: { width: "50%" },
                            initial: { width: "0%" }
                        }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </motion.div>
        </Link>
    );
}
