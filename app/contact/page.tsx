"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="h-24 bg-black/50" /> {/* Spacer for Navbar */}

            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#E3B658] mb-6">Contact Us</h1>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Have a question or feedback? We'd love to hear from you. Fill out the form below or reach out to us directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-[#121212] p-8 rounded-2xl border border-white/10">
                            <h3 className="text-2xl font-serif font-bold text-white mb-6">Get in Touch</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-[#E3B658]/10 text-[#E3B658]">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm uppercase tracking-widest text-white/40 font-bold mb-1">Phone</h4>
                                        <p className="text-lg text-white font-medium">+92 300 1234567</p>
                                        <p className="text-white/60">Mon-Sun, 9am - 11pm</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-[#E3B658]/10 text-[#E3B658]">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm uppercase tracking-widest text-white/40 font-bold mb-1">Email</h4>
                                        <p className="text-lg text-white font-medium">hello@javedsons.com</p>
                                        <p className="text-white/60">We reply within 24 hours</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-full bg-[#E3B658]/10 text-[#E3B658]">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm uppercase tracking-widest text-white/40 font-bold mb-1">Location</h4>
                                        <p className="text-lg text-white font-medium">Main Boulevard, Gulberg III</p>
                                        <p className="text-white/60">Lahore, Pakistan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-[#121212] p-8 md:p-10 rounded-2xl border border-white/10">
                        {isSubmitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                <div className="w-20 h-20 bg-[#E3B658] rounded-full flex items-center justify-center mb-6 animate-in zoom-in">
                                    <Send className="text-black" size={40} />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-white/60 mb-8">Thank you for contacting us. We will get back to you shortly.</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-[#E3B658] hover:underline uppercase tracking-widest text-sm font-bold"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <h3 className="text-2xl font-serif font-bold text-white mb-2">Send Message</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Name</label>
                                        <input required type="text" placeholder="Your Name" className="w-full bg-black border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Email</label>
                                        <input required type="email" placeholder="you@example.com" className="w-full bg-black border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Phone</label>
                                    <input required type="tel" placeholder="0300 1234567" className="w-full bg-black border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Message / Problem</label>
                                    <textarea required rows={5} placeholder="How can we help you?" className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors resize-none" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 bg-[#E3B658] text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50"
                                >
                                    {isLoading ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={18} /></>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
