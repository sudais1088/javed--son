import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

// Dynamic imports for below-the-fold components
const MenuCategories = dynamic(() => import("@/components/MenuCategories"));
const FeaturedItems = dynamic(() => import("@/components/FeaturedItems"));
const GiftingSection = dynamic(() => import("@/components/GiftingSection"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-black">
            <Hero />
            <MenuCategories />
            <FeaturedItems />
            <GiftingSection />
            <AboutSection />
            <Footer />
        </main>
    );
}
