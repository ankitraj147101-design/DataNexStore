'use client';

import React from 'react';
import Link from 'next/link';
import {
  SlidersHorizontal,
  Trash2,
  Check,
  X,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ComparePage() {
  const compareList = useStore((state) => state.compareList);
  const products = useStore((state) => state.products);
  const removeFromCompare = useStore((state) => state.removeFromCompare);
  const clearCompare = useStore((state) => state.clearCompare);
  const addToCart = useStore((state) => state.addToCart);

  const compareProducts = products.filter((p) => compareList.includes(p.id));

  // Extract all unique spec keys across compared products
  const allSpecKeys: { key: string; name: string }[] = [];
  compareProducts.forEach((p) => {
    p.specifications.forEach((s) => {
      if (!allSpecKeys.some((k) => k.key === s.fieldKey)) {
        allSpecKeys.push({ key: s.fieldKey, name: s.fieldName });
      }
    });
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-3 sm:px-8 lg:px-12 py-4 sm:py-8 space-y-6 pb-24 sm:pb-8">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
              Hardware Decision Matrix
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span>Compare Hardware Specifications</span>
              <span className="text-xs bg-slate-200 text-slate-700 font-mono px-2.5 py-1 rounded-full font-bold">
                {compareProducts.length} / 4 Products
              </span>
            </h1>
          </div>

          {compareProducts.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs text-red-600 hover:text-red-700 font-bold"
            >
              Clear Matrix
            </button>
          )}
        </div>

        {compareProducts.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto shadow-xs">
            <SlidersHorizontal className="w-10 h-10 text-slate-400 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900">No hardware selected to compare</h2>
            <p className="text-xs text-slate-500">
              Add up to 4 keyboards, mice, monitors or SSDs from the catalog to see side-by-side spec alignment.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-xs"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="p-5 w-48 bg-slate-50 font-mono text-slate-500 font-bold uppercase text-[10px]">
                      Product Details
                    </th>
                    {compareProducts.map((product) => (
                      <th key={product.id} className="p-5 w-64 min-w-[220px] align-top bg-white border-l border-slate-200">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-sky-700 font-bold uppercase">
                              {product.brand.name}
                            </span>
                            <button
                              onClick={() => removeFromCompare(product.id)}
                              className="p-1 rounded-lg text-slate-400 hover:text-red-600"
                              title="Remove"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="aspect-square rounded-2xl bg-slate-50 p-3 border border-slate-100 flex items-center justify-center">
                            <img
                              src={product.images[0]?.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="font-bold text-slate-900 line-clamp-2 leading-snug">
                            {product.name}
                          </div>

                          <div className="font-mono font-black text-sm text-slate-950">
                            ₹{product.basePrice.toLocaleString()}
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {/* Category */}
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 bg-slate-50 font-bold text-slate-600">Category</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-4 border-l border-slate-200 text-slate-800">
                        {p.category.name}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 bg-slate-50 font-bold text-slate-600">Rating</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-4 border-l border-slate-200 text-amber-700 font-bold">
                        ★ {p.ratingAverage.toFixed(1)} / 5 ({p.ratingCount} reviews)
                      </td>
                    ))}
                  </tr>

                  {/* Warranty */}
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 bg-slate-50 font-bold text-slate-600">Warranty</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="p-4 border-l border-slate-200 text-slate-800">
                        {p.warrantyInfo}
                      </td>
                    ))}
                  </tr>

                  {/* Dynamic Technical Specs Rows */}
                  {allSpecKeys.map((specKey) => (
                    <tr key={specKey.key} className="hover:bg-slate-50">
                      <td className="p-4 bg-slate-50 font-bold text-slate-600">{specKey.name}</td>
                      {compareProducts.map((p) => {
                        const spec = p.specifications.find((s) => s.fieldKey === specKey.key);
                        return (
                          <td key={p.id} className="p-4 border-l border-slate-200 text-slate-800">
                            {spec ? spec.fieldValue : '—'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
