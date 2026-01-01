"use client";

import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react"; // Removed 'Gift' for now, using Trash2 for delete
import Image from "next/image";
import { MENU_ITEMS } from "@/lib/menuData"; // For suggestions
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
    const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, cartTotal, addToCart, giftTotal } = useCart();
    const { user, openLoginModal } = useAuth();
    const router = useRouter();
    const [suggestions, setSuggestions] = useState(MENU_ITEMS.slice(0, 4));

    const handleCheckout = () => {
        toggleCart(); // Close sidebar
        if (user) {
            router.push("/checkout");
        } else {
            openLoginModal("/checkout");
        }
    };

    // Simple random suggestions (can be improved)
    useEffect(() => {
        if (isCartOpen) {
            const shuffled = [...MENU_ITEMS].sort(() => 0.5 - Math.random());
            setSuggestions(shuffled.slice(0, 4));
        }
    }, [isCartOpen]);


    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
                onClick={toggleCart}
            />

            {/* Sidebar */}
            <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#121212] border-l border-white/10 shadow-2xl z-[101] flex flex-col transform transition-transform duration-300">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#000000]">
                    <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                        <ShoppingBag className="text-[#E3B658]" />
                        Your Cart
                        <span className="text-sm font-sans text-white/50 font-normal">({cart.length} items)</span>
                    </h2>
                    <button onClick={toggleCart} className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full">
                        <X size={24} />
                    </button>
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {cart.length === 0 ? (
                        <div className="text-center py-20 opacity-50">
                            <ShoppingBag size={48} className="mx-auto mb-4 text-white/20" />
                            <p className="text-lg">Your cart is empty</p>
                            <button onClick={toggleCart} className="mt-4 text-[#E3B658] hover:underline">Start Shopping</button>
                        </div>
                    ) : (
                        cart.map((item) => {
                            const price = item.isPizza && typeof item.price === 'object'
                                ? (item.price as any)[item.selectedSize || 's']
                                : item.price as number;

                            // Image placeholder fallback
                            const img = item.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop";

                            return (
                                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                                    <div className="relative w-20 h-20 bg-white/5 rounded-lg overflow-hidden shrink-0 border border-white/10">
                                        <Image src={img} fill className="object-cover" alt={item.name} />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-white font-medium line-clamp-1">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.selectedSize)}
                                                    className="text-white/30 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            {item.isPizza && (
                                                <span className="text-xs text-[#E3B658] uppercase tracking-wider">Size: {item.selectedSize?.toUpperCase()}</span>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="text-white font-bold">
                                                <span className="text-[#E3B658] text-xs mr-1">Rs.</span>
                                                {price * item.quantity}
                                            </div>

                                            {/* Qty Control */}
                                            <div className="flex items-center bg-white/5 rounded border border-white/10 h-8">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1, item.selectedSize)}
                                                    className="w-8 h-full flex items-center justify-center hover:bg-white/10 text-white/70"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1, item.selectedSize)}
                                                    className="w-8 h-full flex items-center justify-center hover:bg-white/10 text-white/70"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {/* Suggestions Section */}
                    <div className="pt-8 mt-8 border-t border-white/10">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#E3B658] mb-4">You might also like</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                            {suggestions.map((sug) => (
                                <div key={sug.id} className="min-w-[150px] bg-white/5 rounded-lg p-3 border border-white/5 snap-start">
                                    <div className="relative w-full h-24 rounded-md overflow-hidden mb-2 bg-black">
                                        <Image
                                            src={sug.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop"}
                                            fill
                                            className="object-cover"
                                            alt={sug.name}
                                        />
                                    </div>
                                    <h4 className="text-white text-xs font-bold truncate mb-1">{sug.name}</h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#E3B658] text-xs font-bold">
                                            Rs. {typeof sug.price === 'number' ? sug.price : sug.price.s}
                                        </span>
                                        <button
                                            onClick={() => addToCart(sug)}
                                            className="w-6 h-6 rounded bg-[#E3B658] text-black flex items-center justify-center hover:bg-white transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-[#000000] border-t border-white/10 space-y-4">
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-white/60">
                            <span>Personal Cart</span>
                            <span>Rs. {cartTotal.toLocaleString()}</span>
                        </div>
                        {giftTotal > 0 && (
                            <div className="flex justify-between items-center text-[#E3B658]">
                                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#E3B658]" /> Gift Box</span>
                                <span>Rs. {giftTotal.toLocaleString()}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center text-xl font-bold text-white pt-2 border-t border-white/10 mt-2">
                            <span>Total</span>
                            <span className="text-[#E3B658]">
                                Rs. {(cartTotal + giftTotal).toLocaleString()}
                            </span>
                        </div>
                    </div>
                    <button 
                        onClick={handleCheckout}
                        className="w-full py-4 bg-[#E3B658] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors rounded shadow-[0_0_20px_rgba(227,182,88,0.3)]"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </>
    );
}
