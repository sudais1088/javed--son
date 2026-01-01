"use client";

import Link from "next/link";
import { Facebook, Instagram, Phone, MapPin, Mail, ArrowUp } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
            {/* Decorative Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E3B658] to-transparent opacity-50" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            {/* Use a simplified text logo or same circle logo if preferred */}
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#E3B658]/30">
                                <Image
                                    src="/js logo.jpg"
                                    alt="Javed Sons Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-serif font-bold text-white uppercase tracking-wider group-hover:text-[#E3B658] transition-colors">Javed Sons</span>
                                <span className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Est. 1985</span>
                            </div>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Crafting moments of joy with our premium baking since 1985. Taste the tradition in every bite.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[#E3B658] font-bold uppercase tracking-widest text-sm mb-6">Explore</h3>
                        <ul className="space-y-4">
                            {['Home', 'Our Menu', 'About Us', 'Contact', 'Gifting'].map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-white/70 hover:text-[#E3B658] transition-colors text-sm hover:pl-2 duration-300 block">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-[#E3B658] font-bold uppercase tracking-widest text-sm mb-6">Contact</h3>
                        <ul className="space-y-4 text-sm text-white/70">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#E3B658] shrink-0 mt-0.5" />
                                <span>123 Baker Street, Food Street,<br />Lahore, Pakistan</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[#E3B658] shrink-0" />
                                <span>+92 300 1234567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[#E3B658] shrink-0" />
                                <span>info@javedsons.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Socials & Connect */}
                    <div>
                        <h3 className="text-[#E3B658] font-bold uppercase tracking-widest text-sm mb-6">Follow Us</h3>
                        <div className="flex items-center gap-4 mb-8">
                            <SocialLink href="#" icon={<Facebook size={20} />} label="Facebook" />
                            <SocialLink href="#" icon={<Instagram size={20} />} label="Instagram" />
                            <SocialLink href="#" icon={<Phone size={20} />} label="WhatsApp" /> {/* Using Phone for Whatsapp generic */}
                        </div>

                        <button className="w-full bg-[#E3B658]/10 border border-[#E3B658]/30 text-[#E3B658] py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#E3B658] hover:text-black transition-all">
                            Subscribe for Offers
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-white/40 text-xs">
                        © {new Date().getFullYear()} Javed Sons. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-white/40 text-xs">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-[#E3B658] transition-colors ml-4 border border-white/10 px-3 py-1 rounded-full">
                            Top <ArrowUp size={12} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#E3B658] hover:text-black transition-all duration-300 group relative"
            aria-label={label}
        >
            {icon}
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {label}
            </span>
        </a>
    );
}
