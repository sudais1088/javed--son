"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingBag, User, Menu, X, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { MENU_ITEMS, MenuItem } from "@/lib/menuData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isCartOpen, toggleCart, cartCount } = useCart();
  const { user, openLoginModal, logout } = useAuth();

  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MenuItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = MENU_ITEMS.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled || isMobileMenuOpen
          ? "bg-black/95 backdrop-blur-md border-primary/20 py-2"
          : "bg-transparent border-transparent py-4"
          }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 xs:px-6 sm:px-8 h-20 sm:h-24 flex items-center justify-between relative">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-6 flex-1 justify-start">
            {/* Mobile Menu Button - Gold Accent */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-primary hover:text-white transition-colors p-1"
              aria-label="Open Menu"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>

            {/* Desktop Navigation - Left */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/menu">Menu</NavLink>
              <NavLink href="#about">About Us</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>

            {/* Mobile Search - Placed next to Menu Button */}
            <div className={`relative flex lg:hidden items-center transition-all duration-300 ml-2 ${isSearchOpen ? 'w-48 bg-black border border-[#E3B658] rounded-full px-3 py-1.5' : 'w-auto'}`}>
              {isSearchOpen ? (
                <div className="flex items-center w-full">
                  <Search size={18} className="text-[#E3B658] min-w-[18px]" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={(e) => {
                      setTimeout(() => {
                        if (!searchQuery) setIsSearchOpen(false);
                      }, 200);
                    }}
                    className="bg-transparent border-none text-white text-sm ml-2 w-full focus:outline-none placeholder:text-white/30"
                  />
                  <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="text-white/50 hover:text-white ml-2">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-primary hover:text-white transition-colors p-1"
                >
                  <Search size={24} strokeWidth={1.5} />
                </button>
              )}

              {/* Dropdown Results (Mobile) */}
              {searchQuery && isSearchOpen && (
                <div className="absolute top-full left-0 mt-4 w-64 bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 z-[60]" onMouseDown={(e) => e.preventDefault()}>
                  {searchResults.length > 0 ? (
                    searchResults.map(item => (
                      <Link key={item.id} href={`/menu/${item.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-white/5 shrink-0">
                          <Image
                            src={item.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop"}
                            fill
                            className="object-cover"
                            alt={item.name}
                          />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium text-white truncate group-hover:text-[#E3B658] transition-colors">{item.name}</span>
                          <span className="text-[10px] text-white/50 uppercase tracking-widest">{item.category}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-white/40 text-sm">No items found</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CENTER SECTION - LOGO IMAGE + TEXT */}
          <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center items-center group cursor-pointer ${isSearchOpen ? 'hidden lg:flex' : 'flex'}`} onClick={() => setIsMobileMenuOpen(false)}>
            <Link href="/" className="flex items-center gap-3 md:gap-4">
              {/* Logo Image */}
              <div className={`relative overflow-hidden rounded-full border-2 border-primary/50 shadow-[0_0_15px_rgba(227,182,88,0.3)] transition-all duration-300 ${isScrolled ? 'w-12 h-12' : 'w-14 h-14 md:w-16 md:h-16'}`}>
                <Image
                  src="/js logo.jpg"
                  alt="Javed Sons Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Text Branding - Hidden on mobile */}
              <div className="hidden md:flex flex-col items-start text-left">
                <span className={`font-serif text-lg sm:text-2xl font-bold tracking-[0.1em] text-primary transition-all duration-300 whitespace-nowrap`}>
                  JAVED SONS
                </span>
                <span className={`text-[0.4rem] sm:text-[0.55rem] tracking-[0.25em] text-white/80 uppercase border-t border-primary/30 pt-0.5 transition-all duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                  Sweet | Bakers | Confectionery
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT SECTION - ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-6 flex-1 justify-end">

            {/* Search - Icon by default, expands on click */}
            <div className={`relative hidden lg:flex items-center transition-all duration-300 ${isSearchOpen ? 'w-full sm:w-64 bg-black border border-[#E3B658] rounded-full px-3 py-1.5' : 'w-auto'}`}>
              {isSearchOpen ? (
                <div className="flex items-center w-full">
                  <Search size={18} className="text-[#E3B658] min-w-[18px]" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={(e) => {
                      // Delay closing to allow clicking results
                      setTimeout(() => {
                        if (!searchQuery) setIsSearchOpen(false);
                      }, 200);
                    }}
                    className="bg-transparent border-none text-white text-sm ml-2 w-full focus:outline-none placeholder:text-white/30"
                  />
                  <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className="text-white/50 hover:text-white ml-2">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-white/60 hover:text-[#E3B658] transition-colors p-1"
                >
                  <Search size={20} />
                </button>
              )}

              {/* Dropdown Results (Absolute, same as before) */}
              {searchQuery && isSearchOpen && (
                <div className="absolute top-full right-0 mt-4 w-72 bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 z-[60]" onMouseDown={(e) => e.preventDefault()}> {/* Prevent blur on click */}
                  {searchResults.length > 0 ? (
                    searchResults.map(item => (
                      <Link key={item.id} href={`/menu/${item.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}>
                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-white/5 shrink-0">
                          <Image
                            src={item.image || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=200&auto=format&fit=crop"}
                            fill
                            className="object-cover"
                            alt={item.name}
                          />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-medium text-white truncate group-hover:text-[#E3B658] transition-colors">{item.name}</span>
                          <span className="text-[10px] text-white/50 uppercase tracking-widest">{item.category}</span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-white/40 text-sm">No items found</div>
                  )}
                </div>
              )}
            </div>



            {/* Cart Button (Moved before Login) */}
            <button
              onClick={toggleCart}
              className="relative group text-primary hover:text-white transition-colors p-1"
            >
              <ShoppingBag size={24} strokeWidth={1.5} className="sm:w-[26px] sm:h-[26px]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black group-hover:bg-primary transition-colors">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop Login - At very right */}
            <button
              onClick={() => user ? logout() : openLoginModal()}
              className="hidden md:flex group relative px-6 py-2 items-center justify-center overflow-hidden rounded-sm font-medium text-primary transition-all duration-300 hover:text-black hover:bg-primary"
            >
              <span className="absolute inset-0 w-full h-full border border-primary/40 rounded-sm group-hover:border-primary transition-colors"></span>
              <span className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                <User size={16} />
                {user ? "Logout" : "Login"}
              </span>
            </button>

            {/* Mobile User Icon */}
            <button
              onClick={() => user ? logout() : openLoginModal()}
              className="md:hidden text-primary hover:text-white transition-colors p-1"
            >
              <User size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 bottom-0 z-50 w-[80%] sm:w-[50%] bg-[#080808] border-r border-primary/20 transition-transform duration-500 ease-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

          <div className="h-32 flex items-center justify-between px-8 border-b border-white/5 bg-black/50">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/40">
                <Image
                  src="/js logo.jpg"
                  alt="Javed Sons Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-widest text-primary uppercase font-serif">Javed Sons</span>
                <span className="text-[0.6rem] tracking-[0.2em] text-zinc-500 uppercase">Est. 1985</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-8 gap-6 z-10">
            <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
            <MobileNavLink href="#menu" onClick={() => setIsMobileMenuOpen(false)}>Our Menu</MobileNavLink>
            <MobileNavLink href="/gift" onClick={() => setIsMobileMenuOpen(false)}>Gifting</MobileNavLink>
            <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>About Us</MobileNavLink>
            <MobileNavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>

            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full my-4"></div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                user ? logout() : openLoginModal();
              }}
              className="flex items-center gap-4 text-sm uppercase tracking-widest text-primary hover:text-white transition-colors font-bold group"
            >
              <div className="p-2 rounded-full border border-primary/30 group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all">
                <User size={18} />
              </div>
              {user ? "Logout" : "Login / Register"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-xs xl:text-sm font-bold uppercase tracking-[0.2em] text-white/70 hover:text-primary transition-colors relative group py-2"
    >
      {children}
      <span className="absolute -bottom-2 left-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-1/2 group-hover:-translate-x-1/2 opacity-0 group-hover:opacity-100"></span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-lg font-medium uppercase tracking-[0.15em] text-zince-300 text-white/80 hover:text-primary hover:pl-2 transition-all duration-300 border-l-2 border-transparent hover:border-primary pl-0"
    >
      {children}
    </Link>
  );
}
