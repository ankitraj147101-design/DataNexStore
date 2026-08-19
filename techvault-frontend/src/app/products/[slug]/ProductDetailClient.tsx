'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Heart,
  SlidersHorizontal,
  Check,
  MapPin,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Share2,
  ChevronRight,
  Zap,
  Clock,
  Layers
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const products = useStore((state) => state.products);
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Variant Selection State
  const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [selectedImage, setSelectedImage] = useState(
    product.images.find((img) => img.isPrimary)?.imageUrl || product.images[0]?.imageUrl
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Pincode Delivery Checker State
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);

  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('');

  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist(product.id));
  const addToCompare = useStore((state) => state.addToCompare);
  const compareList = useStore((state) => state.compareList);
  const inCompare = compareList.includes(product.id);
  const reviews = useStore((state) => state.reviews).filter((r) => r.productId === product.id);
  const addReview = useStore((state) => state.addReview);
  const toggleReviewLike = useStore((state) => state.toggleReviewLike);

  const relatedProducts = products
    .filter((p) => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant?.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setDeliveryStatus('Express Delivery by Tomorrow 8 PM to ' + pincode + ' (Blue Dart Express)');
    } else {
      setDeliveryStatus('Please enter a valid 6-digit Indian PIN code');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewTitle && reviewComment && reviewerName) {
      addReview({
        productId: product.id,
        userId: 2,
        userName: reviewerName,
        rating: reviewRating,
        title: reviewTitle,
        comment: reviewComment,
        isVerifiedPurchase: true
      });
      setReviewModalOpen(false);
      setReviewTitle('');
      setReviewComment('');
      setReviewerName('');
    }
  };

  const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const currentMrp = selectedVariant ? selectedVariant.mrpPrice : product.mrpPrice;
  const discountPercent = Math.round(((currentMrp - currentPrice) / currentMrp) * 100);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-3 sm:px-8 lg:px-12 py-4 sm:py-6 space-y-6 sm:space-y-8 pb-24 sm:pb-8">
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-sky-600 transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-sky-600 transition">
            Catalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link
            href={`/products?category=${product.category.slug}`}
            className="hover:text-sky-600 transition"
          >
            {product.category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-bold truncate max-w-xs sm:max-w-md">
            {product.name}
          </span>
        </div>

        {/* Product Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-slate-200/80 p-8 shadow-xs flex items-center justify-center group">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-xl font-mono">
                {discountPercent}% OFF
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-2xl backdrop-blur-md border transition ${
                    isClient && isInWishlist
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:text-rose-600'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isClient && isInWishlist ? 'fill-rose-500' : ''}`} />
                </button>
                <button
                  onClick={() => addToCompare(product.id)}
                  className={`p-2.5 rounded-2xl backdrop-blur-md border transition ${
                    isClient && inCompare
                      ? 'bg-sky-50 text-sky-600 border-sky-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:text-sky-600'
                  }`}
                  title="Compare"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.imageUrl)}
                    className={`w-20 h-20 rounded-2xl p-2 bg-white border shrink-0 transition ${
                      selectedImage === img.imageUrl
                        ? 'border-sky-600 ring-2 ring-sky-600/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details & Purchase Form */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Brand & Category Strip */}
            <div className="flex items-center gap-2">
              <span className="bg-sky-50 text-sky-800 border border-sky-200 text-xs font-bold px-3 py-1 rounded-xl font-mono">
                {product.brand.name}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                SKU: <strong className="text-slate-800 font-mono">{selectedVariant?.sku || product.sku}</strong>
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Official India Sealed Unit with Comprehensive Warranty Protection
              </p>
            </div>

            {/* Rating Strip */}
            <div className="flex items-center gap-3 py-2 border-y border-slate-100">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="text-xs font-bold text-amber-900 font-mono">
                  {product.ratingAverage.toFixed(1)}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                Based on <strong className="text-slate-800">{product.ratingCount}</strong> verified customer reviews
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-emerald-700 font-bold font-mono">
                {product.soldCount}+ Units Delivered
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-baseline justify-between">
              <div className="space-y-1">
                <div className="text-[11px] text-slate-500 font-mono uppercase tracking-wider">
                  Special Online Price (Inc. 18% GST)
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono tracking-tight">
                    ₹{currentPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400 line-through font-mono">
                    ₹{currentMrp.toLocaleString()}
                  </span>
                  <span className="bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded-lg font-mono">
                    Save ₹{(currentMrp - currentPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200 font-mono">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock</span>
                </span>
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants.length > 1 && (
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider block">
                  Select Hardware Edition / Variant:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-2xl text-left border transition ${
                        selectedVariant?.id === variant.id
                          ? 'bg-sky-50 border-sky-600 text-sky-950 ring-2 ring-sky-600/20'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold">{variant.variantName}</div>
                      <div className="text-xs font-black font-mono mt-1 text-slate-900">
                        ₹{variant.price.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-1.5 w-full sm:w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-slate-700 hover:bg-slate-100"
                >
                  -
                </button>
                <span className="text-xs font-black font-mono text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-black text-slate-700 hover:bg-slate-100"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-3.5 px-6 rounded-2xl transition flex items-center justify-center gap-2 shadow-xs font-mono"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{added ? 'Added to Cart ✓' : 'Add to Cart'}</span>
              </button>

              <Link
                href="/checkout"
                onClick={() => addToCart(product, selectedVariant?.id, quantity)}
                className="flex-1 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-6 rounded-2xl transition flex items-center justify-center gap-2 font-mono"
              >
                <span>Express Buy</span>
              </Link>
            </div>

            {/* Pincode Checker */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 font-mono">
                <Truck className="w-4 h-4 text-sky-600" />
                <span>Check Priority Air Delivery Timeline:</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN Code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                  maxLength={6}
                  className="flex-1 bg-white text-xs text-slate-900 p-2.5 rounded-xl border border-slate-200 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl font-mono"
                >
                  Verify
                </button>
              </form>
              {deliveryStatus && (
                <div className="text-xs font-bold text-emerald-800 font-mono mt-1">
                  {deliveryStatus}
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-600 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                <span>100% Brand Sealed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <Truck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span>Blue Dart Air Dispatch</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <MessageSquare className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <span>WhatsApp Desk Support</span>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Specifications Matrix */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Architectural & Technical Specifications
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Detailed engineering parameters, hardware dimensions, and performance benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.map((spec) => (
              <div
                key={spec.fieldKey}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs"
              >
                <span className="font-mono text-slate-500 uppercase tracking-wider">{spec.fieldName}</span>
                <span className="font-bold text-slate-900 font-mono text-right">{spec.fieldValue}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews & Feedback */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Verified Customer Reviews ({reviews.length})
              </h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Authentic feedback from verified hardware owners across India.
              </p>
            </div>

            <button
              onClick={() => setReviewModalOpen(true)}
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition font-mono shadow-xs"
            >
              Write Review
            </button>
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400 font-mono">
              No reviews yet for this product edition. Be the first to review!
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{rev.title}</span>
                    </div>

                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] font-mono text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800">{rev.userName}</span>
                      {rev.isVerifiedPurchase && (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 text-[9px]">
                          ✓ Verified Purchase
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleReviewLike(rev.id)}
                      className="flex items-center gap-1 text-slate-500 hover:text-sky-600 transition"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{rev.likesCount || 0} Helpful</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products Recommendation */}
        {relatedProducts.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Recommended Hardware in {product.category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Review Modal Form */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 uppercase font-mono">
                Submit Product Review
              </h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-700 font-mono"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan S."
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Star Rating (1 to 5) *</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none font-mono"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 - Outstanding)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3 - Average)</option>
                  <option value={2}>⭐⭐ (2 - Below Average)</option>
                  <option value={1}>⭐ (1 - Unsatisfactory)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Review Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Premium acoustics and tactile feedback"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Detailed Feedback *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share your hands-on experience with this hardware component..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition font-mono"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
