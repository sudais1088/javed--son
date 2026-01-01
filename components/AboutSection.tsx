"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="py-16 md:py-24 bg-[#080808] relative overflow-hidden">
            {/* Subtle Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />

            <div className="container mx-auto px-4 xs:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Left Side: Story & Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 text-left order-2 lg:order-1 w-full"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-px w-8 bg-[#E3B658]" />
                            <span className="text-[#E3B658] uppercase tracking-[0.2em] text-xs font-bold">
                                Since 1985
                            </span>
                        </div>

                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6 md:mb-8 leading-tight">
                            Preserving the Art of <br />
                            <span className="text-[#E3B658]">Traditional Baking</span>
                        </h2>

                        <div className="space-y-6 text-white/70 text-sm md:text-lg leading-relaxed font-light">
                            <p>
                                For over three decades, <strong>Javed Sons</strong> has been a cornerstone of sweetness in the community. What started as a small family bakery has grown into a beloved confectionery destination, but our core values haven't changed.
                            </p>
                            <p>
                                We believe in the magic of hand-kneaded dough, the aroma of fresh ovens, and the smile that a perfect pastry brings. Every item on our shelf is a testament to our commitment to quality, heritage, and innovation.
                            </p>
                        </div>

                        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                "Master Chefs",
                                "Premium Ingredients",
                                "Fresh Daily",
                                "Custom Orders"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-[#E3B658]" />
                                    <span className="text-white/90 text-sm tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 md:mt-12 flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl text-white italic">Javed Ahmed</span>
                                <span className="text-xs uppercase tracking-widest text-[#E3B658] mt-1">Founder & Master Baker</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Image Masonry (Team Photos) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full order-1 lg:order-2"
                    >
                        <div className="relative w-full h-[400px] md:h-[600px]">
                            {/* Main Large Image (Portrait) - Left */}
                            <div className="absolute left-0 top-0 w-[60%] h-[90%] z-10 rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a] group">
                                <Image
                                    src="/team 3 (1).jpg"
                                    alt="Our Expert Team"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Secondary Image (Landscape/Square) - Top Right */}
                            <div className="absolute right-0 top-8 w-[35%] h-[40%] z-20 rounded-lg overflow-hidden border-2 border-[#080808] shadow-xl bg-[#1a1a1a] group">
                                <Image
                                    src="/team 3 (2).jpg"
                                    alt="Baking Process"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Tertiary Image (Landscape/Square) - Bottom Right */}
                            <div className="absolute right-4 bottom-8 w-[35%] h-[35%] z-20 rounded-lg overflow-hidden border-2 border-[#080808] shadow-xl bg-[#1a1a1a] group">
                                <Image
                                    src="/team 3 (3).jpg"
                                    alt="Team Work"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute right-[10%] top-[5%] w-[30%] h-[30%] opacity-50 z-0">
                                <div className="w-full h-full border-2 border-[#E3B658] rounded-lg rotate-12" />
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
