'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';

export default function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist);
  const products = useStore((state) => state.products);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-3 sm:px-8 lg:px-12 py-4 sm:py-8 space-y-6 pb-24 sm:pb-8">
        <div className="border-b border-slate-200 pb-4 sm:pb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
            Saved Hardware Items
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>My Wishlist</span>
            <span className="text-xs bg-slate-200 text-slate-700 font-mono px-2.5 py-1 rounded-full font-bold">
              {wishlistProducts.length} Saved
            </span>
          </h1>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center space-y-4 max-w-md mx-auto shadow-xs">
            <Heart className="w-12 h-12 text-slate-300 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900">Your wishlist is empty</h2>
            <p className="text-xs text-slate-500">
              Save your favorite mechanical keyboards, monitors, and components to track price drops.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-xs font-mono"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
