'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Heart,
  Search,
  SlidersHorizontal,
  User,
  ShieldCheck,
  Zap,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Layers,
  ArrowRight,
  PackageCheck,
  LogOut,
  LogIn,
  MessageSquare
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { INITIAL_CATEGORIES } from '@/lib/data/mockData';
import AuthModal from '@/components/auth/AuthModal';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [localQuery, setLocalQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [catMenuOpen, setCatMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Store selectors with fallback values
  const cartCount = useStore((state) => state.getCartCount());
  const wishlist = useStore((state) => state.wishlist);
  const compareList = useStore((state) => state.compareList);
  const currentUser = useStore((state) => state.currentUser);
  const logout = useStore((state) => state.logout);
  const products = useStore((state) => state.products);

  // Client-side hydration safeguard
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (localQuery.trim().length > 1) {
      const q = localQuery.toLowerCase();
      const filtered = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand.name.toLowerCase().includes(q) ||
            p.category.name.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q)
        )
        .slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [localQuery, products]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setSearchOpen(false);
      setMobileMenuOpen(false);
      router.push(`/products?search=${encodeURIComponent(localQuery)}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        {/* Main Navigation Bar */}
        <nav className="w-full px-3 sm:px-8 lg:px-12 py-2.5 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-6">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <Link href="/" className="flex items-center group">
              <img
                src="/datanexstore-logo.jpg"
                alt="DataNexStore Logo"
                className="h-9 sm:h-11 w-auto object-contain group-hover:opacity-90 transition-opacity"
              />
            </Link>

            {/* Category Dropdown Button (Desktop) */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCatMenuOpen(!catMenuOpen)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 transition"
              >
                <Layers className="w-4 h-4 text-sky-600" />
                <span>Categories</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${catMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              {catMenuOpen && (
                <div
                  onMouseLeave={() => setCatMenuOpen(false)}
                  className="absolute left-0 top-full mt-2 w-[680px] bg-white border border-slate-200 rounded-2xl p-5 shadow-2xl grid grid-cols-3 gap-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="col-span-3 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                      <span>Explore All 26 Electronics Categories</span>
                    </span>
                    <Link
                      href="/products"
                      onClick={() => setCatMenuOpen(false)}
                      className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                    >
                      <span>View Catalog</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {INITIAL_CATEGORIES.slice(0, 15).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      onClick={() => setCatMenuOpen(false)}
                      className="group flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-sky-600 group-hover:text-white transition">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 group-hover:text-sky-600 transition">
                          {cat.name}
                        </div>
                        <div className="text-[10px] text-slate-500 line-clamp-1">
                          {cat.description || `${cat.productCount || 0} products`}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Global Live Search Bar (Desktop) */}
          <div className="hidden sm:flex flex-1 max-w-3xl relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search mechanical keyboards, RTX 4090, 2TB SSD, OLED monitors..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="w-full bg-slate-50 hover:bg-slate-100 text-xs text-slate-900 placeholder-slate-400 pl-9 pr-20 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-none transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition"
              >
                Search
              </button>
            </form>

            {/* Quick Search Preview Dropdown */}
            {searchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl p-2 shadow-2xl z-50 divide-y divide-slate-100">
                <div className="p-2 text-[10px] font-mono text-slate-400 font-bold uppercase">
                  Matching Catalog Results
                </div>
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.slug}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setLocalQuery('');
                    }}
                    className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.images[0]?.imageUrl}
                        alt={item.name}
                        className="w-9 h-9 rounded-lg object-contain bg-slate-100 p-1 border border-slate-200"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-sky-600 font-mono font-semibold">
                          {item.brand.name} • {item.category.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-slate-900 font-mono">
                      ₹{item.basePrice.toLocaleString()}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons (Desktop & Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* WhatsApp Quick Action (Mobile & Desktop) */}
            <a
              href="https://wa.me/919911371218"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-2.5 rounded-xl text-emerald-600 hover:bg-emerald-50 transition"
              title="WhatsApp Desk"
            >
              <MessageSquare className="w-5 h-5" />
            </a>

            {/* Compare (Desktop) */}
            <Link
              href="/compare"
              className="hidden sm:flex relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Compare Products"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {isClient && compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-sky-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Wishlist (Desktop) */}
            <Link
              href="/wishlist"
              className="hidden sm:flex relative p-2.5 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {isClient && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative p-2 sm:p-2.5 rounded-xl text-slate-700 hover:text-sky-600 hover:bg-slate-100 transition-colors"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {isClient && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-sky-600 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account / Sign In Dropdown (Desktop) */}
            {currentUser ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 transition"
                >
                  <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-black">
                    {currentUser.firstName.charAt(0)}
                  </div>
                  <span>{currentUser.firstName}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${accountMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Professional Account Dropdown Popup */}
                {accountMenuOpen && (
                  <div
                    onMouseLeave={() => setAccountMenuOpen(false)}
                    className="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-3xl p-4 shadow-2xl z-50 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    {/* User Identity Card */}
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-blue-700 flex items-center justify-center text-white font-black text-sm shadow-xs">
                        {currentUser.firstName.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-black text-slate-900 truncate">
                          {currentUser.firstName} {currentUser.lastName}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono truncate">
                          {currentUser.email}
                        </div>
                        <div className="text-[9px] text-emerald-700 font-bold font-mono uppercase mt-0.5 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          <span>Verified Customer</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Navigation Links */}
                    <div className="space-y-1 text-xs font-semibold text-slate-700">
                      <Link
                        href="/dashboard"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition"
                      >
                        <div className="flex items-center gap-2.5">
                          <ShoppingBag className="w-4 h-4 text-sky-600" />
                          <span>My Orders & Invoices</span>
                        </div>
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
                          2 Active
                        </span>
                      </Link>

                      <Link
                        href="/track-order"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition"
                      >
                        <PackageCheck className="w-4 h-4 text-emerald-600" />
                        <span>Track Air Shipment</span>
                      </Link>

                      <Link
                        href="/wishlist"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>Saved Wishlist ({isClient ? wishlist.length : 0})</span>
                      </Link>

                      <Link
                        href="/compare"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition"
                      >
                        <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                        <span>Compare Matrix ({isClient ? compareList.length : 0})</span>
                      </Link>

                      <a
                        href="https://wa.me/919911371218"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-emerald-50 text-emerald-700 transition"
                      >
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>WhatsApp Support Desk</span>
                      </a>
                    </div>

                    {/* Footer Actions: Switch / Sign Out */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          setAuthModalOpen(true);
                        }}
                        className="text-xs font-bold text-sky-600 hover:text-sky-700 font-mono"
                      >
                        Switch Account
                      </button>

                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          logout();
                        }}
                        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 font-mono"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition font-mono shadow-xs"
              >
                <LogIn className="w-4 h-4 text-sky-400" />
                <span>Sign In</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Quick Search Bar (Always accessible right below header) */}
        <div className="sm:hidden px-3 pb-2.5 pt-0.5">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search keyboards, SSD, monitors, RTX..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="w-full bg-slate-100/90 text-xs text-slate-900 placeholder-slate-400 pl-9 pr-4 py-2 rounded-xl border border-slate-200/80 focus:bg-white focus:outline-none font-medium"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 p-4 space-y-4 bg-white shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto">
            <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              Quick Navigation
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700">
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-slate-50 flex items-center gap-2.5 border border-slate-100"
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>All Products</span>
              </Link>
              <Link
                href="/compare"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-slate-50 flex items-center gap-2.5 border border-slate-100"
              >
                <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                <span>Compare ({compareList.length})</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-slate-50 flex items-center gap-2.5 border border-slate-100"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Wishlist ({wishlist.length})</span>
              </Link>
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-slate-50 flex items-center gap-2.5 border border-slate-100"
              >
                <PackageCheck className="w-4 h-4 text-emerald-600" />
                <span>Track Order</span>
              </Link>
            </div>

            {/* Hardware Categories List */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2">
                Popular Categories
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {INITIAL_CATEGORIES.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/products?category=${cat.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-sky-50 hover:text-sky-700 transition line-clamp-1"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Auth Button */}
            <div className="pt-3 border-t border-slate-100">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                      {currentUser.firstName.charAt(0)}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {currentUser.firstName} {currentUser.lastName}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {currentUser.email}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center gap-2 border border-red-200 font-mono"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 font-mono shadow-xs"
                >
                  <LogIn className="w-4 h-4 text-sky-400" />
                  <span>Sign In / Create Account</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal Container */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Persistent Mobile Bottom Bar */}
      <MobileBottomNav />
    </>
  );
}
