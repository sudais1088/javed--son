"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";

export default function GiftingSection() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background Decorative Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#E3B658] via-transparent to-transparent" />

            <div className="container mx-auto px-4 xs:px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* LEFT SIDE IMAGES (Hidden on Mobile initially, or stacked) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="hidden lg:flex flex-col gap-4 col-span-3"
                    >
                        <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 group">
                            <Image
                                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop"
                                alt="Sweets"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 group translate-x-8">
                            <Image
                                src="/cake.jpg"
                                alt="Delicious Cake"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </motion.div>

                    {/* CENTER: CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="col-span-1 lg:col-span-6 text-center flex flex-col items-center"
                    >
                        <div className="flex items-center gap-3 mb-6 justify-center">
                            <div className="p-3 rounded-full bg-[#E3B658]/10 border border-[#E3B658]/20">
                                <Gift className="text-[#E3B658]" size={28} />
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                            Share the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3B658] via-[#ffd700] to-[#bf953f]">Sweetness</span>
                        </h2>

                        <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
                            From elegant gift boxes to customized hampers, make every occasion memorable with Javed Sons. Truly the perfect gesture for weddings, corporate events, and festivals.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link href="/gift">
                                <button className="group bg-[#E3B658] text-black px-10 py-4 rounded-sm font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(227,182,88,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                                    Order A Gift Box
                                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </button>
                            </Link>
                            <Link href="/gift-contact">
                                <button className="px-10 py-4 border border-white/20 text-white hover:border-[#E3B658] hover:text-[#E3B658] rounded-sm font-bold uppercase tracking-widest text-xs transition-all duration-300">
                                    Corporate Enquiries
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE IMAGES */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:flex flex-col gap-4 col-span-3"
                    >
                        <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 group -translate-x-8">
                            <Image
                                src="https://images.unsplash.com/photo-1605270012917-bf157c5a9541?q=80&w=400&auto=format&fit=crop"
                                alt="Celebration"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 group">
                            <Image
                                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop"
                                alt="Pizza share"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        </div>
                    </motion.div>

                    {/* MOBILE IMAGE GRID (Visible only on < lg) */}
                    <div className="lg:hidden col-span-1 grid grid-cols-2 gap-4">
                        <div className="relative h-40 rounded-xl overflow-hidden border border-white/10">
                            <Image src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=300" alt="Item" fill className="object-cover" />
                        </div>
                        <div className="relative h-40 rounded-xl overflow-hidden border border-white/10">
                            <Image src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300" alt="Item" fill className="object-cover" />
                        </div>
                        <div className="relative h-40 rounded-xl overflow-hidden border border-white/10">
                            <Image src="https://images.unsplash.com/photo-1605270012917-bf157c5a9541?q=80&w=300" alt="Item" fill className="object-cover" />
                        </div>
                        <div className="relative h-40 rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-[#E3B658]/10">
                            <span className="text-[#E3B658] font-serif text-sm italic">And more...</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
