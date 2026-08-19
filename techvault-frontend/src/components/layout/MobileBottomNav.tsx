'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Layers,
  Heart,
  ShoppingBag,
  User,
  LogIn
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import AuthModal from '@/components/auth/AuthModal';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const cartCount = useStore((state) => state.getCartCount());
  const wishlist = useStore((state) => state.wishlist);
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Fixed Bottom App Navigation Bar for Mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] flex items-center justify-around">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition ${
            isActive('/') && pathname === '/'
              ? 'text-sky-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Home className={`w-5 h-5 ${isActive('/') && pathname === '/' ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 font-medium">Home</span>
        </Link>

        {/* Catalog / Categories */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition ${
            isActive('/products')
              ? 'text-sky-600 font-bold'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className={`w-5 h-5 ${isActive('/products') ? 'stroke-[2.5]' : ''}`} />
          <span className="text-[10px] mt-0.5 font-medium">Catalog</span>
        </Link>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition ${
            isActive('/wishlist')
              ? 'text-rose-600 font-bold'
              : 'text-slate-500 hover:text-rose-600'
          }`}
        >
          <Heart className={`w-5 h-5 ${isActive('/wishlist') ? 'fill-rose-500 stroke-rose-500' : ''}`} />
          {isClient && wishlist.length > 0 && (
            <span className="absolute top-0 right-2 bg-rose-500 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] mt-0.5 font-medium">Wishlist</span>
        </Link>

        {/* Cart */}
        <Link
          href="/cart"
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition ${
            isActive('/cart')
              ? 'text-sky-600 font-bold'
              : 'text-slate-500 hover:text-sky-600'
          }`}
        >
          <ShoppingBag className={`w-5 h-5 ${isActive('/cart') ? 'stroke-[2.5]' : ''}`} />
          {isClient && cartCount > 0 && (
            <span className="absolute top-0 right-2 bg-sky-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {cartCount}
            </span>
          )}
          <span className="text-[10px] mt-0.5 font-medium">Cart</span>
        </Link>

        {/* Account / Sign In */}
        {currentUser ? (
          <Link
            href="/dashboard"
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition ${
              isActive('/dashboard')
                ? 'text-sky-600 font-bold'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px] font-black">
              {currentUser.firstName.charAt(0)}
            </div>
            <span className="text-[10px] mt-0.5 font-medium truncate max-w-[48px]">
              {currentUser.firstName}
            </span>
          </Link>
        ) : (
          <button
            onClick={() => setAuthModalOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-slate-500 hover:text-sky-600 transition"
          >
            <LogIn className="w-5 h-5 text-sky-600" />
            <span className="text-[10px] mt-0.5 font-medium text-sky-700 font-bold">Sign In</span>
          </button>
        )}
      </nav>

      {/* Auth Modal for mobile bottom nav */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
