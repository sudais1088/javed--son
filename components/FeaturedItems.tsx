"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Star, Heart, Gift } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

// Mock Data - Optimized and Static
// Mock Data - Optimized and Static
const HOT_SELLERS = [
    {
        id: "burger-1",
        name: "Zinger Burger",
        price: "350",
        image: "/burger (1).jpg",
        category: "Burgers",
        rating: 4.8
    },
    {
        id: "pizza-1",
        name: "J's Special Pizza",
        price: "850",
        image: "/pizza (1).jpg",
        category: "Pizzas",
        rating: 4.9
    },
    {
        id: "pizza-2",
        name: "Chicken Tikka Pizza",
        price: "800",
        image: "/pizza (2).jpg",
        category: "Pizzas",
        rating: 4.7
    },
    {
        id: "cake-1",
        name: "Chocolate Fudge Cake",
        price: "1200",
        image: "/dry (1).jpg",
        category: "Cakes",
        rating: 5.0
    }
];

export default function FeaturedItems() {
    return (
        <section className="py-24 bg-[#050505] relative w-full overflow-hidden">
            {/* Background Glow - Reduced blur radius for better performance */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#E3B658]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#E3B658] mb-4 tracking-tight">
                        Hot Sellers
                    </h2>
                    <div className="h-1 w-24 bg-[#E3B658]/30 mx-auto rounded-full" />
                    <p className="text-white/60 mt-6 uppercase tracking-widest text-xs md:text-sm max-w-lg leading-relaxed mx-auto font-medium">
                        Our most loved items, baked to perfection and served with love.
                    </p>
                </div>

                {/* Product Grid - optimized flex/grid classes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
                    {HOT_SELLERS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Footer Action */}
                <div className="mt-16 text-center">
                    <Link href="/menu">
                        <button className="group relative px-10 py-4 border border-[#E3B658] text-[#E3B658] overflow-hidden transition-all duration-300 hover:text-black hover:bg-[#E3B658]">
                            <span className="relative z-10 text-xs font-bold uppercase tracking-widest">View Full Menu</span>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product }: { product: any }) {
    // Local state for interactivity only where needed
    const [isLiked, setIsLiked] = useState(false);
    const { addToCart, addToGift } = useCart();

    return (
        <Link href={`/menu/${product.id}`} className="block w-full">
            <div className="group relative w-full bg-[#121212] rounded-xl overflow-hidden border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#E3B658]/30 hover:shadow-[0_15px_40px_-15px_rgba(227,182,88,0.1)]">

                {/* Badges & Actions */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-[#E3B658] text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-sm shadow-lg">
                        Hot
                    </span>
                </div>

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsLiked(!isLiked);
                    }}
                    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md text-white transition-all duration-300 hover:bg-[#E3B658] hover:text-black group/heart"
                    aria-label="Add to wishlist"
                >
                    <Heart
                        size={18}
                        className={`transition-colors duration-300 ${isLiked ? "fill-red-500 text-red-500 group-hover/heart:text-black group-hover/heart:fill-black" : ""}`}
                    />
                </button>

                {/* Image Section */}
                <div className="relative h-64 w-full overflow-hidden bg-white/5">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={false}
                    />

                    {/* Overlay Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <span className="bg-[#E3B658] text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                            View Details
                        </span>
                    </div>
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="text-[#E3B658] text-xs uppercase tracking-wider font-medium">
                            {product.category}
                        </span>
                        <div className="flex items-center gap-1 bg-white/5 px-2 py-0.5 rounded-full">
                            <Star size={12} className="fill-[#E3B658] text-[#E3B658]" />
                            <span className="text-white/90 text-xs font-bold">{product.rating}</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-serif text-white group-hover:text-[#E3B658] transition-colors duration-300 leading-tight">
                        {product.name}
                    </h3>

                    <div className="pt-4 mt-auto border-t border-white/10 flex flex-col gap-3">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 uppercase tracking-widest">Price</span>
                            <div className="text-xl font-bold text-white flex items-baseline gap-1">
                                <span className="text-[#E3B658] text-sm">Rs.</span>
                                {product.price}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-2 w-full">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const itemToAdd = {
                                        ...product,
                                        price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
                                    };
                                    addToCart(itemToAdd);
                                }}
                                className="col-span-4 bg-white/10 hover:bg-[#E3B658] hover:text-black text-white h-10 rounded-md text-[10px] uppercase font-bold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 border border-white/5 hover:border-[#E3B658]"
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
