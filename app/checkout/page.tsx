"use client";

import { useCart } from "@/context/CartContext";
import { ArrowLeft, CreditCard, Lock, ShieldCheck, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cart, cartTotal, giftCart, giftTotal, toggleCart } = useCart();
    const router = useRouter();
    const grandTotal = cartTotal + giftTotal;

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        cardNumber: "",
        expiry: "",
        cvc: ""
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            setTimeout(() => {
                // Here you would clear cart in a real app
                router.push("/");
            }, 3000);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
                <div className="bg-[#121212] border border-[#E3B658]/20 rounded-3xl p-8 md:p-12 text-center max-w-lg w-full shadow-[0_0_50px_rgba(227,182,88,0.1)]">
                    <div className="w-20 h-20 bg-[#E3B658] rounded-full flex items-center justify-center mx-auto mb-6 text-black shadow-[0_0_20px_rgba(227,182,88,0.4)]">
                        <CheckCircle size={40} strokeWidth={3} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-2">Order Confirmed!</h2>
                    <p className="text-white/60 mb-8">Thank you for your order. We are preparing your delicious items with care.</p>
                    <Link href="/" className="inline-block px-8 py-3 bg-white/10 hover:bg-[#E3B658] hover:text-black text-white rounded-full font-bold uppercase tracking-widest transition-all">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#050505] pt-32 pb-24 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <Link href="/" className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-serif font-bold flex items-center gap-3">
                        Checkout
                        <Lock size={20} className="text-[#E3B658]" />
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Form */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Billing Details */}
                        <section className="bg-[#121212] p-6 md:p-8 rounded-2xl border border-white/5">
                            <h2 className="text-xl font-bold mb-6 text-[#E3B658] uppercase tracking-wider text-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#E3B658]" />
                                Billing & Delivery
                            </h2>
                            <form id="checkout-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">First Name</label>
                                    <input required name="firstName" onChange={handleInput} className="w-full bg-black/50 border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Last Name</label>
                                    <input required name="lastName" onChange={handleInput} className="w-full bg-black/50 border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors" placeholder="Doe" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                                    <input required type="email" name="email" onChange={handleInput} className="w-full bg-black/50 border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors" placeholder="john@example.com" />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Street Address</label>
                                    <input required name="address" onChange={handleInput} className="w-full bg-black/50 border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors" placeholder="123 Bakery Street" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">City</label>
                                    <input required name="city" onChange={handleInput} className="w-full bg-black/50 border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors" placeholder="Lahore" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Zip Code</label>
                                    <input required name="zip" onChange={handleInput} className="w-full bg-black/50 border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors" placeholder="54000" />
                                </div>
                            </form>
                        </section>

                        {/* Payment Details */}
                        <section className="bg-[#121212] p-6 md:p-8 rounded-2xl border border-white/5">
                            <h2 className="text-xl font-bold mb-6 text-[#E3B658] uppercase tracking-wider text-sm flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#E3B658]" />
                                Payment Method
                            </h2>

                            {/* Dummy Card Visual */}
                            <div className="mb-8 relative h-48 w-full max-w-sm mx-auto bg-gradient-to-br from-[#1a1a1a] to-black rounded-xl border border-white/10 shadow-2xl p-6 flex flex-col justify-between overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                                <div className="absolute -right-12 -top-12 w-40 h-40 bg-[#E3B658]/20 rounded-full blur-3xl" />

                                <div className="relative z-10 flex justify-between items-start">
                                    <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" width={40} height={24} alt="Mastercard" />
                                    <CreditCard className="text-white/40" />
                                </div>
                                <div className="relative z-10">
                                    <div className="text-xl font-mono tracking-widest text-white mb-2">
                                        {formData.cardNumber || "•••• •••• •••• ••••"}
                                    </div>
                                    <div className="flex justify-between text-xs text-white/60 uppercase">
                                        <span>Card Holder</span>
                                        <span>Expires</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-bold text-white uppercase tracking-wider">
                                        <span>{formData.firstName || "YOUR"} {formData.lastName || "NAME"}</span>
                                        <span>{formData.expiry || "MM/YY"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Card Number</label>
                                    <div className="relative">
                                        <input required name="cardNumber" maxLength={19} onChange={handleInput} className="w-full bg-black/50 border border-white/10 rounded-lg h-12 pl-12 pr-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors font-mono" placeholder="0000 0000 0000 0000" />
                                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Expiry Date</label>
                                    <input required name="expiry" maxLength={5} onChange={handleInput} className="w-full bg-black/50 border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors font-mono" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">CVC</label>
                                    <input required name="cvc" maxLength={3} type="password" onChange={handleInput} className="w-full bg-black/50 border border-white/10 rounded-lg h-12 px-4 text-white focus:border-[#E3B658] focus:outline-none transition-colors font-mono" placeholder="123" />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-[#121212] rounded-2xl border border-white/5 p-6 md:p-8 sticky top-32">
                            <h2 className="text-xl font-bold mb-6 text-white font-serif">Order Summary</h2>

                            <div className="space-y-4 mb-6 custom-scrollbar max-h-[400px] overflow-y-auto">
                                {[...cart, ...giftCart].map((item, idx) => (
                                    <div key={`${item.id}-${idx}`} className="flex gap-4 py-2 border-b border-white/5 last:border-0">
                                        <div className="relative w-16 h-16 rounded overflow-hidden bg-white/5 shrink-0">
                                            <Image src={item.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"} fill alt={item.name} className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <h4 className="font-medium text-sm text-white line-clamp-1">{item.name}</h4>
                                                <span className="text-sm font-bold">Rs. {((item.isPizza && typeof item.price === 'object' ? (item.price as any)[item.selectedSize!] : item.price as number) * item.quantity).toLocaleString()}</span>
                                            </div>
                                            <p className="text-xs text-white/40 mt-1">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 py-4 border-t border-white/10 text-sm">
                                <div className="flex justify-between text-white/60">
                                    <span>Personal Items</span>
                                    <span>Rs. {cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-white/60">
                                    <span>Gift Items</span>
                                    <span>Rs. {giftTotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-white/60">
                                    <span>Delivery Fee</span>
                                    <span>Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-4 border-t border-white/10 mb-6">
                                <span className="text-lg font-bold">Total Amount</span>
                                <span className="text-2xl font-serif font-bold text-[#E3B658]">Rs. {grandTotal.toLocaleString()}</span>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isProcessing || grandTotal === 0}
                                className="w-full py-4 bg-[#E3B658] text-black font-bold uppercase tracking-widest rounded transition-all hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? "Processing..." : "Place Order"}
                                {!isProcessing && <ShieldCheck size={18} />}
                            </button>

                            <p className="text-center text-[10px] text-white/30 mt-4 uppercase tracking-wider flex items-center justify-center gap-2">
                                <Lock size={10} /> Secure SSL Encryption
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
