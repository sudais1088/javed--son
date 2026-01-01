"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MENU_ITEMS, MenuItem, PizzaPrice } from "@/lib/menuData";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowLeft, Star, AlertCircle, Plus, Minus, Heart, Gift } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const [item, setItem] = useState<MenuItem | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState<'s' | 'm' | 'l' | 'f' | 'p'>('s');
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart, addToGift } = useCart();

    useEffect(() => {
        const foundItem = MENU_ITEMS.find((i) => i.id === id);
        if (foundItem) {
            setItem(foundItem);
        }
    }, [id]);

    if (!item) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    const price = item.isPizza
        ? (item.price as PizzaPrice)[selectedSize]
        : (item.price as number);

    const totalPrice = price * quantity;
    const imageSrc = item.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop";

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Navigation */}
                <div className="mb-8 w-fit">
                    <Link href="/menu" className="flex items-center gap-3 text-white/50 hover:text-[#E3B658] transition-all group py-2 pr-4 pl-0">
                        <div className="p-2.5 rounded-full border border-white/10 bg-white/5 group-hover:border-[#E3B658] group-hover:bg-[#E3B658] group-hover:text-black transition-all">
                            <ArrowLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                        </div>
                        <span className="text-sm uppercase tracking-widest font-bold group-hover:translate-x-1 transition-transform">Back to Menu</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                    {/* Left: Image Section */}
                    <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#121212] group">
                        {/* Pizza Size Badge (if pizza) */}
                        {item.isPizza && (
                            <div className="absolute top-6 left-6 z-20 bg-[#E3B658] text-black font-bold uppercase tracking-widest text-xs px-4 py-2 rounded-full shadow-lg">
                                Size: {selectedSize.toUpperCase()}
                            </div>
                        )}

                        {/* Wishlist Button - Moved to overlay */}
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-[#E3B658] hover:text-black hover:scale-110 shadow-xl"
                        >
                            <Heart
                                size={20}
                                className={`transition-colors duration-300 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                            />
                        </button>

                        <Image
                            src={imageSrc}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority
                        />

                        {/* Subtle Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Right: Details Section */}
                    <div className="flex flex-col space-y-8 lg:py-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="px-3 py-1 rounded-full bg-[#E3B658]/10 text-[#E3B658] border border-[#E3B658]/20 text-xs font-bold uppercase tracking-widest">
                                    {item.category}
                                </span>
                                <div className="flex items-center gap-1.5 text-white/40">
                                    <Star size={14} className="fill-[#E3B658] text-[#E3B658]" />
                                    <span className="text-sm font-medium text-white">4.8</span>
                                    <span className="text-xs">(120+ reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                                {item.name}
                            </h1>
                        </div>

                        <p className="text-white/60 text-lg leading-relaxed font-light border-l-2 border-[#E3B658]/50 pl-6">
                            {item.description || "Experience the authentic taste prepared with fresh ingredients and passion. A perfect choice for food lovers."}
                        </p>

                        {/* Allergens */}
                        {item.allergens && item.allergens.length > 0 && (
                            <div>
                                <h3 className="text-xs uppercase tracking-widest text-white/40 mb-3 font-bold">Allergens Information</h3>
                                <div className="flex flex-wrap gap-3">
                                    {item.allergens.map((allergen) => (
                                        <div key={allergen} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/80 hover:bg-white/10 transition-colors cursor-default">
                                            <AlertCircle size={14} className="text-[#E3B658]" />
                                            <span>{allergen}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="h-px w-full bg-white/5" />

                        {/* Configuration Controls */}
                        <div className="space-y-8">
                            {/* Size Selection for Pizza */}
                            {item.isPizza && (
                                <div>
                                    <label className="block text-sm font-bold uppercase tracking-wider text-white/40 mb-4">Select Size</label>
                                    <div className="flex flex-wrap gap-3">
                                        {(['s', 'm', 'l', 'f', 'p'] as const).map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`
                                                    w-12 h-12 rounded-full border flex items-center justify-center font-bold text-sm transition-all duration-300
                                                    ${selectedSize === size
                                                        ? 'bg-[#E3B658] border-[#E3B658] text-black scale-110 shadow-[0_0_15px_rgba(227,182,88,0.3)]'
                                                        : 'bg-transparent border-white/10 text-white/60 hover:border-white/50 hover:text-white'}
                                                `}
                                            >
                                                {size.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Price and Add to Cart */}
                            {/* Price and Add to Cart */}
                            <div className="bg-[#121212] rounded-2xl p-5 sm:p-8 border border-white/5 shadow-lg w-full">
                                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-6 sm:gap-8 justify-between">
                                    <div className="flex flex-col min-w-[120px] w-full sm:w-auto lg:w-full xl:w-auto text-center sm:text-left lg:text-center xl:text-left">
                                        <span className="text-xs text-white/40 uppercase tracking-widest mb-1 font-bold">Total Price</span>
                                        <div className="text-3xl font-serif font-bold text-white tracking-tight">
                                            <span className="text-[#E3B658] text-xl mr-1">Rs.</span>
                                            {totalPrice.toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="h-12 w-px bg-white/10 hidden sm:block lg:hidden xl:block" />

                                    <div className="w-full sm:w-auto lg:w-full xl:w-auto flex-1 flex items-center justify-center sm:justify-end lg:justify-center xl:justify-end gap-3 sm:gap-4">
                                        {/* Quantity */}
                                        <div className="flex items-center bg-black rounded-full border border-white/10 px-1 h-12 shadow-inner shrink-0">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-full flex items-center justify-center rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-8 text-center font-bold text-lg text-white tabular-nums">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-10 h-full flex items-center justify-center rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>



                                        {/* Action Button */}
                                        <button
                                            onClick={() => addToCart(item, selectedSize, quantity)}
                                            className="flex-1 h-12 bg-gradient-to-r from-[#E3B658] to-[#d4a036] text-black font-bold uppercase tracking-widest rounded-full hover:to-[#E3B658] hover:from-[#d4a036] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(227,182,88,0.3)] hover:shadow-[0_0_35px_rgba(227,182,88,0.5)] whitespace-nowrap px-6"
                                        >
                                            <ShoppingBag size={18} className="fill-black/10" />
                                            <span className="text-xs sm:text-sm">Add to Cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
