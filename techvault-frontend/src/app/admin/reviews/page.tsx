'use client';

import React from 'react';
import { Star, CheckCircle2, Trash2, Check, X, MessageSquare } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function AdminReviewsPage() {
  const reviews = useStore((state) => state.reviews);
  const products = useStore((state) => state.products);

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
          Quality & Moderation
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <span>Customer Review Moderation</span>
          <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2.5 py-1 rounded-full font-bold border border-slate-200">
            {reviews.length} Reviews
          </span>
        </h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-mono text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Product Reviewed</th>
                <th className="p-4">Rating & Headline</th>
                <th className="p-4">Detailed Comment</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reviews.map((rev) => {
                const product = products.find((p) => p.id === rev.productId);
                return (
                  <tr key={rev.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{rev.userName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {new Date(rev.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-sky-700 max-w-xs truncate">
                      {product?.name || `Product #${rev.productId}`}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-1 text-amber-600 font-bold mb-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{rev.rating} / 5</span>
                      </div>
                      <div className="font-bold text-slate-800">{rev.title}</div>
                    </td>

                    <td className="p-4 text-slate-600 max-w-md line-clamp-2">
                      {rev.comment}
                    </td>

                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold font-mono">
                        APPROVED
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-1.5 rounded-lg border border-emerald-200 transition">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button className="bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-lg border border-red-200 transition">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
