'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  Zap,
  Clock,
  Layers,
  ZoomIn,
  Maximize2,
  X,
  Copy,
  CheckCircle2,
  Eye
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
  
  const allImages = product.images.length > 0
    ? product.images
    : [{ id: 1, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=1200', isPrimary: true, sortOrder: 0 }];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Zoom & Lightbox State
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, activeImageIndex, allImages.length]);

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

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleShareProduct = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
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
  const currentImageUrl = allImages[activeImageIndex]?.imageUrl || product.images[0]?.imageUrl;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      {/* Share Toast */}
      {shareCopied && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-mono animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Product Link Copied to Clipboard!</span>
        </div>
      )}

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
          
          {/* Left Column: High-End Interactive Product Image Showcase */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Interactive Image Frame */}
            <div
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
              className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-b from-slate-50/70 to-white border border-slate-200/90 p-6 sm:p-10 shadow-sm flex items-center justify-center group cursor-crosshair select-none"
            >
              {/* Product Image with Zoom Lens */}
              <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
                <img
                  src={currentImageUrl}
                  alt={product.name}
                  style={{
                    transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    transform: isZooming ? 'scale(2.2)' : 'scale(1)'
                  }}
                  className="w-full h-full object-contain transition-transform duration-150 ease-out pointer-events-none"
                />
              </div>

              {/* Top Left Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {discountPercent > 0 && (
                  <div className="bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-xl font-mono shadow-sm tracking-wide">
                    {discountPercent}% OFF
                  </div>
                )}
                <div className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-0.5 rounded-lg">
                  Genuine Sealed Unit
                </div>
              </div>

              {/* Top Right Actions */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 transition shadow-xs"
                  title="Full Screen High-Res Lightbox"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleShareProduct}
                  className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 hover:text-sky-600 hover:border-sky-300 transition shadow-xs"
                  title="Share Product Link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-2.5 rounded-2xl backdrop-blur-md border transition shadow-xs ${
                    isClient && isInWishlist
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-white/90 text-slate-700 border-slate-200 hover:text-rose-600 hover:border-rose-200'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isClient && isInWishlist ? 'fill-rose-500' : ''}`} />
                </button>
                <button
                  onClick={() => addToCompare(product.id)}
                  className={`p-2.5 rounded-2xl backdrop-blur-md border transition shadow-xs ${
                    isClient && inCompare
                      ? 'bg-sky-50 text-sky-600 border-sky-200'
                      : 'bg-white/90 text-slate-700 border-slate-200 hover:text-sky-600 hover:border-sky-200'
                  }`}
                  title="Compare Hardware"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Navigation Chevrons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
                    title="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Bottom Image Counter & Hover Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <div className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                  <ZoomIn className="w-3 h-3 text-sky-400" />
                  <span>Hover to Zoom • {activeImageIndex + 1}/{allImages.length}</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Carousel Strip with Active Glow */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
                {allImages.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl p-2 bg-white border shrink-0 transition-all duration-200 relative cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-sky-600 ring-4 ring-sky-100 shadow-md scale-105'
                        : 'border-slate-200 hover:border-slate-300 hover:scale-102 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.imageUrl}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute bottom-1 right-1 bg-slate-900/70 text-white text-[9px] font-mono font-bold px-1 rounded">
                      {idx + 1}
                    </span>
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
                100% Original Brand Sealed Unit in Anti-Static Packing
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
                  Special Online Deal Price
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono tracking-tight">
                    ₹{currentPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-400 line-through font-mono">
                    ₹{currentMrp.toLocaleString()}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 font-mono bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Save ₹{(currentMrp - currentPrice).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs font-bold text-emerald-700 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>In Stock</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Ready for Dispatch
                </div>
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants.length > 1 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 font-bold uppercase tracking-wider">Select Edition / Spec</span>
                  <span className="text-sky-600 font-bold">{selectedVariant?.variantName}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-2xl border text-left transition ${
                        selectedVariant?.id === variant.id
                          ? 'border-sky-600 bg-sky-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 truncate">
                        {variant.variantName}
                      </div>
                      <div className="text-xs font-mono font-bold text-sky-700 mt-1">
                        ₹{variant.price.toLocaleString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Cart Action */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold font-mono transition"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold font-mono transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs font-mono transition flex items-center justify-center gap-2 shadow-sm ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-950 hover:bg-slate-800 text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Your Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-sky-400" />
                      <span>Add to Cart • ₹{(currentPrice * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant WhatsApp Order Support */}
              <a
                href={`https://wa.me/919911371218?text=Hello%20DataNexStore,%20I%20want%20to%20order%20${encodeURIComponent(product.name)}%20(₹${currentPrice})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs font-mono transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Instant Order Assistance via WhatsApp (+91 9911371218)</span>
              </a>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 font-mono">
                <MapPin className="w-4 h-4 text-sky-600" />
                <span>Check Express Pincode Availability</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter 6-digit PIN code (e.g. 110001)"
                  className="flex-1 bg-white border border-slate-200 text-xs px-3.5 py-2.5 rounded-xl focus:border-sky-500 focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl font-mono transition"
                >
                  Verify
                </button>
              </form>
              {deliveryStatus && (
                <div className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl">
                  {deliveryStatus}
                </div>
              )}
            </div>

            {/* Assurance Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
              <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <ShieldCheck className="w-5 h-5 text-sky-600 mx-auto" />
                <div className="text-[11px] font-bold text-slate-800 font-mono">100% Genuine</div>
                <div className="text-[10px] text-slate-400">Sealed Pack Unit</div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <Truck className="w-5 h-5 text-emerald-600 mx-auto" />
                <div className="text-[11px] font-bold text-slate-800 font-mono">Free Express</div>
                <div className="text-[10px] text-slate-400">Safe Delivery</div>
              </div>
              <div className="text-center p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <MessageSquare className="w-5 h-5 text-emerald-600 mx-auto" />
                <div className="text-[11px] font-bold text-slate-800 font-mono">WhatsApp Desk</div>
                <div className="text-[10px] text-slate-400">+91 9911371218</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Technical Specifications */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="pt-8 border-t border-slate-200 space-y-6">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-sky-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                Hardware Architecture & Specifications
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((spec, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between font-mono text-xs"
                >
                  <span className="text-slate-500 font-bold uppercase tracking-wider">{spec.fieldName}</span>
                  <span className="text-slate-900 font-black">{spec.fieldValue}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews & Moderation Hub */}
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                Verified Customer Reviews ({reviews.length})
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Real feedback from verified buyers across India
              </p>
            </div>

            <button
              onClick={() => setReviewModalOpen(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-2xl transition flex items-center gap-2 font-mono"
            >
              <MessageSquare className="w-4 h-4 text-sky-400" />
              <span>Write a Review</span>
            </button>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center font-mono">
                      {rev.userName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 font-mono">
                        {rev.userName}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 font-mono">
                        <Check className="w-3 h-3" />
                        <span>Verified Buyer</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-amber-900 font-bold font-mono text-xs">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>{rev.rating}.0</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-900">{rev.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Posted recently</span>
                  <button
                    onClick={() => toggleReviewLike(rev.id)}
                    className="flex items-center gap-1 text-slate-500 hover:text-slate-800 transition"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.likesCount || 0})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Hardware Catalog */}
        {relatedProducts.length > 0 && (
          <div className="pt-8 border-t border-slate-200 space-y-6">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-mono">
              Similar Hardware in {product.category.name}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* High-Resolution Full-Screen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between text-white border-b border-slate-800/80 pb-4">
            <div>
              <h3 className="text-sm sm:text-base font-black font-mono tracking-tight">
                {product.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Image {activeImageIndex + 1} of {allImages.length}
              </p>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Center Image View */}
          <div className="flex-1 relative flex items-center justify-center p-4">
            <img
              src={currentImageUrl}
              alt={product.name}
              className="max-h-[75vh] max-w-[85vw] object-contain drop-shadow-2xl transition-all duration-300"
            />

            {/* Previous & Next Lightbox Chevrons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
                  title="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Bottom Thumbnail Bar */}
          {allImages.length > 1 && (
            <div className="flex items-center justify-center gap-3 overflow-x-auto pt-4 border-t border-slate-800/80">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-2xl p-1.5 bg-slate-900 border transition cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-sky-400 ring-2 ring-sky-400/30 scale-105'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.imageUrl} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Review Creation Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 font-mono">
                Review {product.name}
              </h3>
              <button
                onClick={() => setReviewModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                ✕
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
