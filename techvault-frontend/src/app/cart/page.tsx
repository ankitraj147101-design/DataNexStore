'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Bookmark,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw,
  Sparkles,
  Check,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function CartPage() {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const toggleSaveForLater = useStore((state) => state.toggleSaveForLater);
  const appliedCoupon = useStore((state) => state.appliedCoupon);
  const applyCoupon = useStore((state) => state.applyCoupon);
  const removeCoupon = useStore((state) => state.removeCoupon);
  const getCartSubtotal = useStore((state) => state.getCartSubtotal);
  const getCartDiscount = useStore((state) => state.getCartDiscount);
  const getCartTotal = useStore((state) => state.getCartTotal);

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const activeItems = cart.filter((item) => !item.savedForLater);
  const savedItems = cart.filter((item) => item.savedForLater);

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shippingCharge = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const taxAmount = (subtotal - discount) * 0.18;
  const finalTotal = getCartTotal() + shippingCharge;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      const res = applyCoupon(couponInput.trim());
      setCouponMessage({ text: res.message, isError: !res.success });
      if (res.success) setCouponInput('');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-3 sm:px-8 lg:px-12 py-4 sm:py-8 space-y-6 pb-24 sm:pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Link href="/" className="hover:text-sky-700">Store</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-bold">Shopping Cart ({activeItems.length} items)</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Your Shopping Cart
        </h1>

        {activeItems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <h2 className="text-lg font-bold text-slate-900">Your cart is empty</h2>
            <p className="text-xs text-slate-500">
              Explore our performance hardware, keyboards, SSDs and gaming gear.
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Active Line Items (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {activeItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 transition shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.images[0]?.imageUrl}
                      alt={item.product.name}
                      className="w-20 h-20 object-contain rounded-2xl bg-slate-50 p-2 border border-slate-100 shrink-0"
                    />
                    <div className="space-y-1">
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="text-sm font-bold text-slate-900 hover:text-sky-600 transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      {item.selectedVariant && (
                        <div className="text-xs text-slate-500 font-mono font-medium">
                          Variant: <strong className="text-slate-800">{item.selectedVariant.variantName}</strong>
                        </div>
                      )}
                      <div className="text-xs text-sky-700 font-mono font-bold">
                        ₹{item.unitPrice.toLocaleString()} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 font-mono font-bold text-xs text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-black text-sm text-slate-950">
                        ₹{item.totalPrice.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSaveForLater(item.id)}
                        title="Save for Later"
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 transition"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        title="Remove from Cart"
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Saved For Later Drawer */}
              {savedItems.length > 0 && (
                <div className="pt-6 space-y-4">
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider font-mono">
                    Saved for Later ({savedItems.length})
                  </h3>
                  <div className="space-y-3">
                    {savedItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-4 shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.product.images[0]?.imageUrl}
                            alt={item.product.name}
                            className="w-12 h-12 object-contain rounded-xl bg-slate-50 p-1 border border-slate-100"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900">{item.product.name}</div>
                            <div className="text-[11px] font-mono text-sky-700 font-bold">
                              ₹{item.unitPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleSaveForLater(item.id)}
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition shadow-xs"
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Summary, Coupon & Checkout (5 Cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Promo Code Input Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-mono">
                  <Tag className="w-4 h-4 text-sky-600" />
                  <span>Apply Promotional Coupon</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3 rounded-2xl">
                    <div>
                      <div className="text-xs font-bold text-emerald-900 font-mono">
                        {appliedCoupon.code} APPLIED
                      </div>
                      <div className="text-[11px] text-emerald-700">
                        {appliedCoupon.title}
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:text-red-700 font-bold font-mono"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. DATANEX500, DATANEX10, DATANEXVIP"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="bg-slate-50 text-xs text-slate-900 uppercase font-mono px-3.5 py-2.5 rounded-xl border border-slate-200 flex-1 focus:border-sky-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponMessage && (
                  <div
                    className={`text-xs p-2.5 rounded-xl font-mono ${
                      couponMessage.isError
                        ? 'bg-red-50 text-red-800 border border-red-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {couponMessage.text}
                  </div>
                )}
              </div>

              {/* Order Calculation Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-xs">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Order Summary
                </h2>

                <div className="space-y-2.5 text-xs text-slate-600 font-mono">
                  <div className="flex justify-between">
                    <span>Cart Subtotal</span>
                    <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Coupon Discount</span>
                      <span>- ₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Express Air Shipping</span>
                    <span className="font-bold text-slate-900">
                      {shippingCharge === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE</span>
                      ) : (
                        `₹${shippingCharge}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Estimated 18% GST (Included)</span>
                    <span>₹{taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
                    <span className="text-sm font-black text-slate-900">Final Total</span>
                    <span className="text-2xl font-black text-slate-950">
                      ₹{finalTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-black text-sm py-4 rounded-2xl transition flex items-center justify-center gap-2 shadow-md shadow-sky-600/20 hover:scale-101"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Insured Air Courier</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
