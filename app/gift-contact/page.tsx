"use client";

import { useState } from "react";
import { Gift, Send, Loader2, Star } from "lucide-react";

export default function GiftContactPage() {
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
            <div className="h-24 bg-black/50" />

            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <div className="inline-flex p-4 rounded-full bg-[#E3B658]/10 text-[#E3B658] mb-6 border border-[#E3B658]/20">
                        <Gift size={32} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                        Custom <span className="text-[#E3B658]">Gifting</span> Inquiry
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Tell us everything about the kind of gift you want. We specialize in creating memorable corporate hampers and wedding favors.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-[#121212] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                    {/* Decorative Blur */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#E3B658]/5 blur-[80px] rounded-full pointer-events-none" />

                    {isSubmitted ? (
                        <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in">
                            <div className="w-24 h-24 bg-[#E3B658] rounded-full flex items-center justify-center mb-8 shadow-lg shadow-[#E3B658]/20">
                                <Send className="text-black" size={48} />
                            </div>
                            <h3 className="text-3xl font-serif font-bold text-white mb-4">Inquiry Received!</h3>
                            <p className="text-white/60 mb-8 max-w-md">
                                Thank you for sharing your requirements. Our gifting specialist will review your request and contact you at the provided number shortly.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="px-8 py-3 rounded-full border border-white/20 text-white hover:border-[#E3B658] hover:text-[#E3B658] uppercase tracking-widest text-xs font-bold transition-all"
                            >
                                Submit Another Request
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Full Name</label>
                                    <input required type="text" placeholder="John Doe" className="w-full bg-black/50 border border-white/10 rounded-xl h-14 px-5 text-white focus:border-[#E3B658] focus:outline-none transition-colors" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Phone Number</label>
                                    <input required type="tel" placeholder="0300 1234567" className="w-full bg-black/50 border border-white/10 rounded-xl h-14 px-5 text-white focus:border-[#E3B658] focus:outline-none transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Email Address</label>
                                <input required type="email" placeholder="john@company.com" className="w-full bg-black/50 border border-white/10 rounded-xl h-14 px-5 text-white focus:border-[#E3B658] focus:outline-none transition-colors" />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs uppercase tracking-widest text-white/40 font-bold ml-1">Event / Gift Details</label>
                                <textarea
                                    required
                                    rows={6}
                                    placeholder="Tell us about the occasion, quantity, preferred items (sweets, cakes, savory), budget, and any customization needs..."
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-5 text-white focus:border-[#E3B658] focus:outline-none transition-colors resize-none leading-relaxed"
                                />
                            </div>

                            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#E3B658]/5 border border-[#E3B658]/20">
                                <Star className="text-[#E3B658] shrink-0" size={24} />
                                <p className="text-sm text-white/80">
                                    <span className="font-bold text-[#E3B658]">Pro Tip:</span> Mentioning the estimated quantity helps us provide a better quote faster!
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-16 bg-[#E3B658] text-black font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(227,182,88,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] text-lg"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <>Submit Inquiry <Send size={20} /></>}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
