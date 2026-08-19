'use client';

import React, { useState, use } from 'react';
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

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const products = useStore((state) => state.products);
  const product = products.find((p) => p.slug === resolvedParams.slug);

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

  React.useEffect(() => {
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
    }
  };

  const currentPrice = selectedVariant ? selectedVariant.price : product.basePrice;
  const currentMrp = selectedVariant ? selectedVariant.mrpPrice : product.mrpPrice;
  const discount = Math.round(((currentMrp - currentPrice) / currentMrp) * 100);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-4 sm:px-8 lg:px-12 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-sky-700">Store</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-sky-700">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-sky-700">
            {product.category.name}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Section (Gallery + Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Gallery (5 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square rounded-3xl bg-white border border-slate-200 p-8 flex items-center justify-center overflow-hidden shadow-xs">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full uppercase font-mono shadow-xs">
                  {discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.imageUrl)}
                  className={`w-20 h-20 rounded-2xl bg-white p-2 border shrink-0 transition shadow-xs ${
                    selectedImage === img.imageUrl
                      ? 'border-sky-600 ring-2 ring-sky-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img
                    src={img.imageUrl}
                    alt="thumbnail"
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Specs, Pricing, Variants & Purchase (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 text-xs font-mono text-slate-500 mb-2">
                <span className="text-sky-700 font-bold uppercase">{product.brand.name}</span>
                <span>SKU: {selectedVariant?.sku || product.sku}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating and Reviews Counter */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1 rounded-xl text-xs font-bold font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{product.ratingAverage.toFixed(1)} / 5.0</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {product.ratingCount} Customer Ratings & {reviews.length} Verified Reviews
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2 shadow-xs">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight font-mono">
                  ₹{currentPrice.toLocaleString()}
                </span>
                <span className="text-base text-slate-400 line-through font-mono">
                  ₹{currentMrp.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-mono">
                  Save ₹{(currentMrp - currentPrice).toLocaleString()} ({discount}%)
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Inclusive of all taxes & 18% GST invoice. Free Express Air Shipping on this order.
              </p>
            </div>

            {/* Variant Selector */}
            {product.variants.length > 1 && (
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                  Select Edition / Variant
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-2xl border text-left transition ${
                        selectedVariant?.id === v.id
                          ? 'bg-sky-50 border-sky-600 ring-2 ring-sky-100'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{v.variantName}</div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        ₹{v.price.toLocaleString()} • {v.stock > 0 ? `${v.stock} in stock` : 'Out of stock'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-slate-600 hover:text-slate-950 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono font-bold text-sm text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-slate-600 hover:text-slate-950 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`flex-1 py-3.5 rounded-2xl font-black text-sm transition flex items-center justify-center gap-2 shadow-md ${
                    added
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20 hover:scale-101'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart — ₹{(currentPrice * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/919911371218?text=${encodeURIComponent(
                    `Hello Datanexstore! I want to order *${product.name}* ${
                      selectedVariant?.variantName ? `(${selectedVariant.variantName})` : ''
                    } (Qty: ${quantity}) for ₹${(currentPrice * quantity).toLocaleString()}. Please confirm availability & payment UPI QR.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-3.5 rounded-2xl transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                  title="Order Directly on WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp Order</span>
                </a>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-2xl border transition shadow-xs ${
                    isClient && isInWishlist
                      ? 'bg-pink-50 border-pink-300 text-pink-600'
                      : 'bg-white border-slate-200 text-slate-400 hover:text-pink-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isClient && isInWishlist ? 'fill-pink-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Pincode Delivery Availability Checker */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-mono">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Check Delivery Pincode & ETA</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter 6-digit Pincode (e.g. 560001)"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  className="bg-slate-50 text-xs text-slate-900 placeholder-slate-400 px-3.5 py-2 rounded-xl border border-slate-200 flex-1 focus:border-sky-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  Check
                </button>
              </form>
              {deliveryStatus && (
                <div className="text-xs text-sky-800 bg-sky-50 p-2.5 rounded-xl border border-sky-200 font-medium">
                  {deliveryStatus}
                </div>
              )}
            </div>

            {/* 3 Pillars Value Proposition */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-sky-600 mx-auto" />
                <div className="text-[11px] font-bold text-slate-900">{product.warrantyInfo}</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
                <Truck className="w-4 h-4 text-emerald-600 mx-auto" />
                <div className="text-[11px] font-bold text-slate-900">Insured Air Express</div>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-slate-200 text-center space-y-1 shadow-xs">
                <MessageSquare className="w-4 h-4 text-emerald-600 mx-auto" />
                <div className="text-[11px] font-bold text-slate-900">WhatsApp Desk +91 9911371218</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Technical Specifications Table */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-600" />
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Technical Specifications & Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.specifications.map((spec, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-xs"
              >
                <span className="font-bold text-slate-600 font-mono">{spec.fieldName}</span>
                <span className="font-bold text-slate-900 text-right">{spec.fieldValue}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews & Ratings Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
                Verified Customer Testimonials
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Product Reviews ({reviews.length})
              </h2>
            </div>

            <button
              onClick={() => setReviewModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  {rev.isVerifiedPurchase && (
                    <span className="text-[10px] font-bold font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">{rev.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-slate-800">{rev.userName}</span>
                  <button
                    onClick={() => toggleReviewLike(rev.id)}
                    className="flex items-center gap-1 text-slate-500 hover:text-sky-600 font-mono"
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rev.likesCount} Helpful</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6 pt-6 border-t border-slate-200">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Related Hardware from {product.category.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Review {product.name}</h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Your Name</label>
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
                <label className="text-xs font-bold text-slate-800 block mb-1">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setReviewRating(num)}
                      className="p-1 text-amber-500"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          num <= reviewRating ? 'fill-amber-500' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Review Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exceptional Build Quality & Speed"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Detailed Feedback</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details on acoustics, thermal performance, ease of setup..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
                >
                  Submit Verified Review
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
