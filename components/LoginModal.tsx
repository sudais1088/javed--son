"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Phone, Lock, ArrowRight, Loader2, CheckCircle } from "lucide-react";

export default function LoginModal() {
    const { isLoginOpen, closeLoginModal, login } = useAuth();
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    if (!isLoginOpen) return null;

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length < 10) {
            setError("Please enter a valid phone number");
            return;
        }
        setIsLoading(true);
        setError("");

        // Simulate API
        setTimeout(() => {
            setIsLoading(false);
            setStep("otp");
        }, 1000);
    };

    const handleVerifyOtp = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Dummy OTP Logic
        setTimeout(() => {
            if (otp === "1234") {
                login(phone);
                closeLoginModal();
                // Reset state after close
                setTimeout(() => {
                    setStep("phone");
                    setPhone("");
                    setOtp("");
                }, 300);
            } else {
                setError("Invalid OTP. Try '1234'");
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={closeLoginModal}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-8 animate-in fade-in zoom-in duration-200">
                <button
                    onClick={closeLoginModal}
                    className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#E3B658]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#E3B658]/20">
                        {step === "phone" ? (
                            <Phone className="text-[#E3B658]" size={28} />
                        ) : (
                            <Lock className="text-[#E3B658]" size={28} />
                        )}
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-white mb-2">
                        {step === "phone" ? "Welcome Back" : "Verify Number"}
                    </h2>
                    <p className="text-white/50 text-sm">
                        {step === "phone"
                            ? "Enter your phone number to continue"
                            : `Enter the code sent to ${phone}`
                        }
                    </p>
                </div>

                {step === "phone" ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40 font-bold block text-left">Phone Number</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-mono text-lg">+92</span>
                                <input
                                    type="tel"
                                    placeholder="300 1234567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg h-14 pl-14 pr-4 text-white text-lg font-mono focus:border-[#E3B658] focus:outline-none transition-colors"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-[#E3B658] text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    Send Code
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/40 font-bold block text-left">Done Code</label>
                            <input
                                type="text"
                                placeholder="0000"
                                maxLength={4}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg h-14 text-center text-white text-2xl font-mono tracking-[0.5em] focus:border-[#E3B658] focus:outline-none transition-colors"
                                autoFocus
                            />
                            <p className="text-xs text-white/30 text-center">Use '1234' for demo</p>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-[#E3B658] text-black font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <>
                                    Verify & Login
                                    <CheckCircle size={18} />
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep("phone")}
                            className="w-full text-white/40 text-sm hover:text-white transition-colors"
                        >
                            Change Phone Number
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
