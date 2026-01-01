"use client";

import { useCart } from "@/context/CartContext";
import { ShoppingBag, Star, Heart, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const GIFT_HAMPERS = [
    {
        id: "gift-1",
        name: "Premium Celebrations Box",
        description: "A luxurious assortment of our finest pastries, chocolates, and cookies. Perfect for special occasions.",
        price: 3500,
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
        category: "Gift Box"
    },
    {
        id: "gift-2",
        name: "Sweet Tooth Bliss Hamper",
        description: "For the ultimate dessert lover. Includes cupcakes, brownies, and our signature cake jar.",
        price: 2200,
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop",
        category: "Gift Box"
    },
    {
        id: "gift-3",
        name: "Bakery Staples Basket",
        description: "Freshly baked artisan breads, croissants, and jams presented in a rustic basket.",
        price: 1800,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
        category: "Gift Box"
    },
    {
        id: "gift-4",
        name: "Festive Delight Box",
        description: "Seasonal specials including fruit cakes, dry cakes, and traditional biscuits.",
        price: 4000,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop",
        category: "Gift Box"
    }
];

export default function GiftPage() {
    const { addToCart } = useCart();

    return (
        <main className="min-h-screen bg-[#050505] pb-24">
            {/* Hero Section */}
            <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/50 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=1920&auto=format&fit=crop')" }}
                />

                <div className="relative z-20 text-center mt-20 px-4">
                    <div className="flex justify-center mb-4">
                        <Gift size={48} className="text-[#E3B658]" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                        Gifting
                    </h1>
                    <div className="h-1 w-24 bg-[#E3B658] mx-auto rounded-full mb-6" />
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
                        Share the joy of premium flavors with your loved ones. Our curated gift hampers are crafted to impress.
                    </p>
                </div>
            </div>

            {/* Gift Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {GIFT_HAMPERS.map((item) => (
                        <div key={item.id} className="group bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-[#E3B658]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-full">
                            {/* Image */}
                            <div className="relative h-64 w-full overflow-hidden bg-white/5">
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-[#E3B658] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm shadow-lg">
                                        Gift Ready
                                    </span>
                                </div>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col gap-4 flex-grow">
                                <div>
                                    <h3 className="text-white font-serif text-xl group-hover:text-[#E3B658] transition-colors mb-2">{item.name}</h3>
                                    <p className="text-white/40 text-sm line-clamp-3">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                                    <div>
                                        <span className="text-[10px] text-white/40 uppercase tracking-widest">Price</span>
                                        <div className="text-xl font-bold text-white">
                                            <span className="text-[#E3B658] text-sm mr-1">Rs.</span>
                                            {item.price}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => addToCart({ ...item, category: "Gifts", price: item.price } as any)}
                                        className="bg-[#E3B658] text-black px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-[0_0_15px_rgba(227,182,88,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2"
                                    >
                                        <ShoppingBag size={14} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Custom Order CTA */}
            <div className="container mx-auto px-4 pb-20">
                <div className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-8 md:p-12 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3B658]/5 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl font-serif font-bold text-white mb-4">Need a Custom Order?</h2>
                        <p className="text-white/60 mb-6">
                            Looking for bulk corporate gifts or a personalized hamper for a wedding?
                            We specialize in creating bespoke gifting experiences tailored to your needs.
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                            {['Custom Branding', 'Bulk Discounts', 'Personalized Notes', 'Priority Delivery'].map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-[#E3B658]">
                                    <Star size={14} fill="#E3B658" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative z-10 shrink-0">
                        <button className="px-8 py-4 bg-transparent border border-[#E3B658] text-[#E3B658] font-bold uppercase tracking-widest hover:bg-[#E3B658] hover:text-black transition-all duration-300 rounded-sm">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
