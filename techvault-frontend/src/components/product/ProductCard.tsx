'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  ShoppingBag,
  Star,
  SlidersHorizontal,
  Check,
  Zap
} from 'lucide-react';
import { Product } from '@/types';
import { useStore } from '@/store/useStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist(product.id));
  const addToCompare = useStore((state) => state.addToCompare);
  const compareList = useStore((state) => state.compareList);

  const isWishlisted = isClient && isInWishlist;
  const inCompare = isClient && compareList.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCompare(product.id);
  };

  const primaryImage =
    product.images.find((img) => img.isPrimary)?.imageUrl ||
    product.images[0]?.imageUrl ||
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-sky-400 rounded-3xl p-4 flex flex-col justify-between transition-all duration-300 shadow-2xs hover:shadow-lg hover:-translate-y-0.5">
      
      {/* Top Badges & Actions */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex flex-wrap gap-1.5">
          {product.discountPercentage > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md font-mono">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-sky-50 text-sky-800 border border-sky-200 text-[10px] font-bold px-2 py-0.5 rounded-md font-mono">
              Best Seller
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleToggleCompare}
            title={inCompare ? 'In Comparison Matrix' : 'Add to Compare'}
            className={`p-2 rounded-xl border transition ${
              inCompare
                ? 'bg-sky-50 border-sky-300 text-sky-600'
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleToggleWishlist}
            title="Save to Wishlist"
            className={`p-2 rounded-xl border transition ${
              isWishlisted
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'border-slate-200 text-slate-400 hover:text-rose-600 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Product Thumbnail */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative overflow-hidden rounded-2xl bg-slate-50/70 p-4 aspect-square mb-3 group/img border border-slate-100 flex items-center justify-center"
      >
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-contain group-hover/img:scale-106 transition-transform duration-500"
        />
      </Link>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-1">
            <span className="text-sky-700 font-bold uppercase">{product.brand.name}</span>
            <span>{product.category.name}</span>
          </div>

          {/* Title */}
          <Link
            href={`/products/${product.slug}`}
            className="block text-xs sm:text-sm font-bold text-slate-900 hover:text-sky-600 transition line-clamp-2 mb-2 leading-snug"
          >
            {product.name}
          </Link>

          {/* Key Specs */}
          <div className="flex flex-wrap gap-1 mb-2.5">
            {product.specifications.slice(0, 2).map((spec, i) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded-md"
              >
                {spec.fieldName}: <strong className="text-slate-900 font-bold">{spec.fieldValue.split('(')[0].trim()}</strong>
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200 text-amber-900 px-2 py-0.5 rounded-md text-[11px] font-bold font-mono">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.ratingAverage.toFixed(1)}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">({product.ratingCount} verified ratings)</span>
          </div>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-[11px] text-slate-400 line-through font-mono">
              ₹{product.mrpPrice.toLocaleString()}
            </div>
            <div className="text-base sm:text-lg font-black text-slate-950 font-mono">
              ₹{product.basePrice.toLocaleString()}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition shadow-2xs font-mono ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-sky-600 hover:bg-sky-700 text-white'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
