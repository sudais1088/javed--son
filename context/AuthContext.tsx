"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    phone: string;
}

interface AuthContextType {
    user: User | null;
    isLoginOpen: boolean;
    login: (phone: string) => void;
    logout: () => void;
    openLoginModal: (redirectUrl?: string) => void;
    closeLoginModal: () => void;
    redirectAfterLogin: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);
    const router = useRouter();

    // Check localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("js_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (phone: string) => {
        const newUser = { phone };
        setUser(newUser);
        localStorage.setItem("js_user", JSON.stringify(newUser));

        // Handle redirect
        if (redirectAfterLogin) {
            router.push(redirectAfterLogin);
            setRedirectAfterLogin(null);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("js_user");
        router.push("/");
    };

    const openLoginModal = (redirectUrl?: string) => {
        if (redirectUrl) setRedirectAfterLogin(redirectUrl);
        setIsLoginOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginOpen(false);
        // Clear redirect if closed without logging in? 
        // Better keep it effectively resets on next open if overwritten, 
        // or we can leave it. 
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoginOpen,
            login,
            logout,
            openLoginModal,
            closeLoginModal,
            redirectAfterLogin
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
