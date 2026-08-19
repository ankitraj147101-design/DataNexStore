'use client';

import React from 'react';
import { Star, ShieldCheck, ThumbsUp } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function CustomerReviews() {
  const reviews = useStore((state) => state.reviews);
  const products = useStore((state) => state.products);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Verified Customer Reviews & Feedback
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((rev) => {
          const product = products.find((p) => p.id === rev.productId);
          return (
            <div
              key={rev.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-mono font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Purchase</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{rev.userName}</div>
                  {product && (
                    <div className="text-[10px] text-sky-700 font-mono font-medium line-clamp-1 max-w-[200px]">
                      {product.name}
                    </div>
                  )}
                </div>

                <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 font-mono">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.likesCount || 12}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
