"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuItem, PizzaPrice } from "../lib/menuData";
import { ShoppingBag, Star, Heart, Gift } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

interface MenuGridProps {
    items: MenuItem[];
}

export default function MenuGrid({ items }: MenuGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
                <MenuCard key={item.id} item={item} />
            ))}
        </div>
    );
}

function MenuCard({ item }: { item: MenuItem }) {
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart, addToGift } = useCart();
    const isPizza = item.isPizza;
    const priceDisplay = isPizza
        ? (item.price as PizzaPrice).s
        : (item.price as number);

    // Placeholder image logic if no image is provided - using one of the pizza images for now or generic
    const imageSrc = item.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop";

    return (
        <Link href={`/menu/${item.id}`} className="block h-full">
            <div className="group bg-[#121212] border border-white/5 rounded-xl overflow-hidden hover:border-[#E3B658]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full flex flex-col">
                {/* Image Area */}
                <div className="relative h-48 w-full overflow-hidden bg-white/5">
                    {/* Wishlist Heart Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation(); // Prevent navigation when clicking heart
                            setIsLiked(!isLiked);
                        }}
                        className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white transition-all duration-300 hover:bg-[#E3B658] hover:text-black group/heart"
                        aria-label="Add to wishlist"
                    >
                        <Heart
                            size={16}
                            className={`transition-colors duration-300 ${isLiked ? "fill-red-500 text-red-500 group-hover/heart:text-black group-hover/heart:fill-black" : ""}`}
                        />
                    </button>

                    <Image
                        src={imageSrc}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay cart button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <button className="bg-[#E3B658] text-black px-4 py-2 rounded-full font-bold uppercase tracking-wider text-[10px] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-white">
                            <ShoppingBag size={14} />
                            View Details
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col gap-2 flex-grow">
                    <div className="flex justify-between items-start">
                        <h3 className="text-white font-serif text-lg leading-tight group-hover:text-[#E3B658] transition-colors">{item.name}</h3>
                        {/* Rating placeholder to match design */}
                        <div className="flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded text-[10px]">
                            <Star size={10} className="fill-[#E3B658] text-[#E3B658]" />
                            <span className="text-white/80 font-bold">4.5</span>
                        </div>
                    </div>

                    <p className="text-white/40 text-xs line-clamp-2 min-h-[2.5em]">
                        {item.description || "Delicious prepared with fresh ingredients."}
                    </p>

                    <div className="mt-auto pt-3 border-t border-white/10 flex flex-col gap-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 uppercase tracking-widest">
                                {isPizza ? "Starts from" : "Price"}
                            </span>
                            <div className="text-lg font-bold text-white">
                                <span className="text-[#E3B658] text-xs mr-1">Rs.</span>
                                {priceDisplay}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 w-full">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToCart(item);
                                }}
                                className="col-span-full bg-white/10 hover:bg-[#E3B658] hover:text-black text-white h-10 rounded-md text-[10px] uppercase font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-white/5 hover:border-[#E3B658]"
                            >
                                <ShoppingBag size={14} />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
