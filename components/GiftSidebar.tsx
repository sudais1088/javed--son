"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus, Trash2, ShoppingBag, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MENU_ITEMS, MenuItem } from "@/lib/menuData";

export default function GiftSidebar() {
    const { giftCart, isGiftCartOpen, toggleGiftCart, removeFromGift, updateGiftQuantity, giftTotal, toggleCart } = useCart();
    const [suggestions, setSuggestions] = useState<MenuItem[]>([]);

    // Get 3 random items for suggestions (excluding current items)
    useEffect(() => {
        if (isGiftCartOpen) {
            const randomItems = [...MENU_ITEMS]
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            setSuggestions(randomItems);
        }
    }, [isGiftCartOpen]);

    if (!isGiftCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={toggleGiftCart}
            />

            {/* Sidebar */}
            <div className="relative w-full max-w-md bg-[#121212] h-full shadow-2xl flex flex-col border-l border-[#E3B658]/20 transform transition-transform duration-300">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#1A1A1A]">
                    <div className="flex items-center gap-3">
                        <Gift className="text-[#E3B658]" size={24} />
                        <h2 className="text-xl font-serif font-bold text-white tracking-wide">
                            Your Gift Box
                        </h2>
                    </div>
                    <button
                        onClick={toggleGiftCart}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {giftCart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
                            <Gift size={48} className="text-white/20" />
                            <p className="text-white/60 font-light">Your gift box is empty</p>
                            <button
                                onClick={toggleGiftCart}
                                className="text-[#E3B658] underline underline-offset-4 text-sm hover:text-white transition-colors"
                            >
                                Browse Gifts
                            </button>
                        </div>
                    ) : (
                        giftCart.map((item) => (
                            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                                {/* Image */}
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
                                    <Image
                                        src={item.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200"}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-medium text-white line-clamp-1">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromGift(item.id, item.selectedSize)}
                                                className="text-white/40 hover:text-red-500 transition-colors p-1"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        {item.isPizza && item.selectedSize && (
                                            <p className="text-xs text-[#E3B658] uppercase tracking-wider font-bold mt-1">
                                                Size: {item.selectedSize}
                                            </p>
                                        )}
                                        <p className="text-[#E3B658] font-bold text-sm mt-1">
                                            Rs. {(item.isPizza && typeof item.price === 'object' ? (item.price as any)[item.selectedSize!] : item.price).toLocaleString()}
                                        </p>
                                    </div>

                                    {/* Quantity Controls - Compact */}
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center bg-black rounded-lg border border-white/10 h-8">
                                            <button
                                                onClick={() => updateGiftQuantity(item.id, -1, item.selectedSize)}
                                                className="w-8 h-full flex items-center justify-center hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateGiftQuantity(item.id, 1, item.selectedSize)}
                                                className="w-8 h-full flex items-center justify-center hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-[#1A1A1A] border-t border-white/10 space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-white/60 text-sm">
                            <span>Gift Total</span>
                            <span>Rs. {giftTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xl font-bold text-white">
                            <span>Total</span>
                            <span className="text-[#E3B658]">Rs. {giftTotal.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            toggleGiftCart(); // Close gift cart
                            toggleCart(); // Open main cart where totals are merged
                        }}
                        className="w-full py-4 bg-[#E3B658] text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 rounded-sm"
                    >
                        Check Cart & Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
