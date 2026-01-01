"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/lib/menuData";

export interface CartItem extends MenuItem {
    quantity: number;
    selectedSize?: 's' | 'm' | 'l' | 'f' | 'p'; // For pizzas
}

interface CartContextType {
    cart: CartItem[];
    isCartOpen: boolean;
    addToCart: (item: MenuItem, size?: 's' | 'm' | 'l' | 'f' | 'p', quantity?: number) => void;
    removeFromCart: (itemId: string, size?: string) => void;
    updateQuantity: (itemId: string, delta: number, size?: string) => void;
    toggleCart: () => void;
    cartTotal: number;
    cartCount: number;

    // Gift Cart
    giftCart: CartItem[];
    isGiftCartOpen: boolean;
    addToGift: (item: MenuItem, size?: 's' | 'm' | 'l' | 'f' | 'p', quantity?: number) => void;
    removeFromGift: (itemId: string, size?: string) => void;
    updateGiftQuantity: (itemId: string, delta: number, size?: string) => void;
    toggleGiftCart: () => void;
    giftTotal: number;
    giftCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    // Personal Cart State
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Gift Cart State
    const [giftCart, setGiftCart] = useState<CartItem[]>([]);
    const [isGiftCartOpen, setIsGiftCartOpen] = useState(false);

    // Load carts from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        const savedGiftCart = localStorage.getItem("giftCart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        if (savedGiftCart) {
            try {
                setGiftCart(JSON.parse(savedGiftCart));
            } catch (e) {
                console.error("Failed to parse gift cart", e);
            }
        }
    }, []);

    // Save carts to local storage whenever they change
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("giftCart", JSON.stringify(giftCart));
    }, [giftCart]);

    // Personal Cart Actions
    const addToCart = (item: MenuItem, size: 's' | 'm' | 'l' | 'f' | 'p' = 's', quantity: number = 1) => {
        setCart((prev) => {
            const existingItemIndex = prev.findIndex(
                (i) => i.id === item.id && (item.isPizza ? i.selectedSize === size : true)
            );

            if (existingItemIndex > -1) {
                const newCart = [...prev];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prev, { ...item, quantity, selectedSize: item.isPizza ? size : undefined }];
            }
        });
        // Auto-open removed per previous request
    };

    const removeFromCart = (itemId: string, size?: string) => {
        setCart((prev) => prev.filter((i) => !(i.id === itemId && (i.isPizza ? i.selectedSize === size : true))));
    };

    const updateQuantity = (itemId: string, delta: number, size?: string) => {
        setCart((prev) => {
            return prev.map((item) => {
                if (item.id === itemId && (item.isPizza ? item.selectedSize === size : true)) {
                    return { ...item, quantity: Math.max(1, item.quantity + delta) };
                }
                return item;
            });
        });
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    // Gift Cart Actions
    const addToGift = (item: MenuItem, size: 's' | 'm' | 'l' | 'f' | 'p' = 's', quantity: number = 1) => {
        setGiftCart((prev) => {
            const existingItemIndex = prev.findIndex(
                (i) => i.id === item.id && (item.isPizza ? i.selectedSize === size : true)
            );

            if (existingItemIndex > -1) {
                const newCart = [...prev];
                newCart[existingItemIndex].quantity += quantity;
                return newCart;
            } else {
                return [...prev, { ...item, quantity, selectedSize: item.isPizza ? size : undefined }];
            }
        });
        // Auto-open logic: User asked "cart should not opened itself". Assuming same for gift cart.
        // However, "when they click on cart they should be forwarded to cart".
        // Let's NOT auto-open gift sidebar on add either.
    };

    const removeFromGift = (itemId: string, size?: string) => {
        setGiftCart((prev) => prev.filter((i) => !(i.id === itemId && (i.isPizza ? i.selectedSize === size : true))));
    };

    const updateGiftQuantity = (itemId: string, delta: number, size?: string) => {
        setGiftCart((prev) => {
            return prev.map((item) => {
                if (item.id === itemId && (item.isPizza ? item.selectedSize === size : true)) {
                    return { ...item, quantity: Math.max(1, item.quantity + delta) };
                }
                return item;
            });
        });
    };

    const toggleGiftCart = () => setIsGiftCartOpen(!isGiftCartOpen);

    // Calculations
    const calculateTotal = (items: CartItem[]) => {
        return items.reduce((total, item) => {
            let price = 0;
            if (item.isPizza && item.selectedSize) {
                if (typeof item.price === 'object') {
                    price = (item.price as any)[item.selectedSize];
                } else {
                    price = item.price as number;
                }
            } else {
                price = item.price as number;
            }
            return total + price * item.quantity;
        }, 0);
    };

    const cartTotal = calculateTotal(cart);
    const giftTotal = calculateTotal(giftCart);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const giftCount = giftCart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart, isCartOpen, addToCart, removeFromCart, updateQuantity, toggleCart, cartTotal, cartCount,
            giftCart, isGiftCartOpen, addToGift, removeFromGift, updateGiftQuantity, toggleGiftCart, giftTotal, giftCount
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
