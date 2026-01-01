"use client";

import { useState, useEffect } from "react";
import MenuGrid from "@/components/MenuGrid";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/lib/menuData";
import { UtensilsCrossed } from "lucide-react";

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);

    const scrollToCategory = (category: string) => {
        // Manually set active category immediately for better UX
        setActiveCategory(category);
        const element = document.getElementById(category);
        if (element) {
            const offset = 100; // Adjust for sticky header
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    // ScrollSpy Effect
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const options = {
            root: null,
            rootMargin: "-100px 0px -50% 0px", // Trigger when section is near top
            threshold: 0
        };

        MENU_CATEGORIES.forEach((category) => {
            const element = document.getElementById(category);
            if (element) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveCategory(category);
                        }
                    });
                }, options);

                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    return (
        <main className="min-h-screen bg-[#050505] pb-24">
            {/* Hero Section */}
            <div className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1920&auto=format&fit=crop')" }}
                />

                <div className="relative z-20 text-center mt-24">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
                        MENU
                    </h1>
                    <div className="h-1 w-24 bg-[#E3B658] mx-auto rounded-full" />
                </div>
            </div>

            {/* Sticky Navigation */}
            <div className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-2 md:justify-center min-w-max py-4">
                        {MENU_CATEGORIES.map((category) => (
                            <button
                                key={category}
                                onClick={() => scrollToCategory(category)}
                                className={`
                                    px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300
                                    ${activeCategory === category
                                        ? "bg-[#E3B658] text-black shadow-[0_0_20px_rgba(227,182,88,0.4)]"
                                        : "text-white/60 hover:text-white hover:bg-white/5"}
                                `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="container mx-auto px-4 py-12 space-y-24">
                {MENU_CATEGORIES.map((category) => {
                    // Filter items for this category
                    const categoryItems = MENU_ITEMS.filter(item => item.category === category);

                    return (
                        <section id={category} key={category} className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-full bg-[#E3B658]/10 text-[#E3B658]">
                                    <UtensilsCrossed size={24} />
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
                                        {category}
                                    </h2>
                                    <p className="text-white/40 text-sm mt-1">
                                        Browse our delicious {category.toLowerCase()}
                                    </p>
                                </div>
                            </div>

                            <MenuGrid items={categoryItems} />
                        </section>
                    );
                })}
            </div>
        </main>
    );
}
