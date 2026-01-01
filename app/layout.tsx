import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Keep existing imports
import Navbar from "@/components/Navbar"; // Add Navbar import
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import CartSidebar from "@/components/CartSidebar";
import GiftSidebar from "@/components/GiftSidebar";
import LoginModal from "@/components/LoginModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505", // Good practice to add theme color
};

export const metadata: Metadata = {
  title: "Javed Sons | Premium Bakers & Confectioners",
  description: "Since 1985, Javed Sons has been crafting premium sweets, cakes, and baked goods. Experience the luxury of tradition.",
  keywords: ["Bakery", "Sweets", "Cakes", "Lahore", "Javed Sons", "Premium Confectionery"],
  icons: {
    icon: "/js logo.jpg", // Using the logo as favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartSidebar />
            <GiftSidebar />
            <LoginModal />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
