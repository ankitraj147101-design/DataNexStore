'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Lock,
  ChevronRight,
  Zap,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Address } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const currentUser = useStore((state) => state.currentUser);
  const updateUserProfile = useStore((state) => state.updateUserProfile);

  // Address State
  const [address, setAddress] = useState<Address>({
    id: 'addr-new',
    fullName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}`.trim() : '',
    phone: currentUser?.phone || '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    addressType: 'HOME',
    isDefault: true
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('express');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [orderNotes, setOrderNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Store Selectors
  const cart = useStore((state) => state.cart);
  const appliedCoupon = useStore((state) => state.appliedCoupon);
  const getCartSubtotal = useStore((state) => state.getCartSubtotal);
  const getCartDiscount = useStore((state) => state.getCartDiscount);
  const getCartTotal = useStore((state) => state.getCartTotal);
  const createOrder = useStore((state) => state.createOrder);

  useEffect(() => {
    setIsClient(true);
    if (currentUser) {
      setAddress((prev) => ({
        ...prev,
        fullName: prev.fullName || `${currentUser.firstName} ${currentUser.lastName}`.trim(),
        phone: prev.phone || currentUser.phone || ''
      }));
      if (currentUser.email) {
        setCustomerEmail(currentUser.email);
      }
    }
  }, [currentUser]);

  const activeItems = useMemo(
    () => (cart ? cart.filter((item) => !item.savedForLater) : []),
    [cart]
  );

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shippingCost = shippingMethod === 'express' ? 0 : 0; // Free express delivery promo
  const taxAmount = (subtotal - discount) * 0.18;
  const finalTotal = Math.max(0, subtotal - discount + shippingCost);

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const generateWhatsAppMessage = (orderNumber: string) => {
    const formattedDate = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const itemsList = activeItems
      .map(
        (item, index) =>
          `🔹 *${index + 1}. ${item.product.name}*\n   └ Edition: ${
            item.selectedVariant?.variantName || 'Standard'
          }\n   └ SKU: \`${item.selectedVariant?.sku || item.product.sku}\`\n   └ Qty: *${
            item.quantity
          }* × ₹${item.unitPrice.toLocaleString()} ═► *₹${item.totalPrice.toLocaleString()}*`
      )
      .join('\n\n');

    const message = `╔══════════════════════════════════════╗
║   🏢 *DATANEXSTORE RETAIL INDIA*     ║
║   🧾 *OFFICIAL ORDER & TAX INVOICE*  ║
╚══════════════════════════════════════╝

📋 *ORDER REFERENCE:* \`#${orderNumber}\`
📅 *DATE & TIME:* ${formattedDate}
🛡️ *STATUS:* Pending WhatsApp Confirmation

────────────────────────────────────────
👤 *CUSTOMER & DELIVERY ADDRESS:*
• *Name:* ${address.fullName}
• *Phone:* ${address.phone}
• *Email:* ${customerEmail}
• *Address:* ${address.addressLine1}
• *City / State:* ${address.city}, ${address.state} - ${address.pincode}

────────────────────────────────────────
🛍️ *ORDERED ITEMS DETAILS:*

${itemsList}

────────────────────────────────────────
💰 *BILLING & INVOICE BREAKDOWN:*
• *Item Subtotal:* ₹${subtotal.toLocaleString()}
• *Express Air Courier:* FREE (₹0)
• *Taxes & Handling:* Included
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 *NET TOTAL PAYABLE:* *₹${finalTotal.toLocaleString()}*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 *CUSTOMER NOTE:* ${orderNotes ? orderNotes : 'Please confirm order acceptance and share official store UPI QR / Bank Transfer details.'}

────────────────────────────────────────
✅ *NEXT STEPS (ADMIN ACTION):*
1. Verify item stock allocation
2. Share Store UPI ID / QR code
3. Update website order status to *CONFIRMED*

📞 *WhatsApp Desk:* +91 9911371218
✉️ *Official Email:* Datanexstore@gmail.com
🌐 *Website:* https://datanexstore.in`;

    return encodeURIComponent(message);
  };

  const handlePlaceOrder = () => {
    if (activeItems.length === 0) return;
    setIsProcessing(true);

    const orderPayload = {
      userId: 2,
      customerName: address.fullName,
      customerEmail: customerEmail,
      customerPhone: address.phone,
      status: 'PENDING' as const,
      subtotal,
      discountAmount: discount,
      couponCode: appliedCoupon?.code,
      shippingCharge: shippingCost,
      taxAmount,
      totalAmount: finalTotal,
      shippingAddress: {
        id: address.id || 'addr-temp-1',
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
        addressType: address.addressType
      },
      billingAddress: {
        id: address.id || 'addr-temp-1',
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
        addressType: address.addressType
      },
      payment: {
        id: 'pay_wa_' + Date.now(),
        paymentMethod: 'WHATSAPP_PAYMENT' as const,
        amount: finalTotal,
        currency: 'INR',
        status: 'INITIATED' as const,
        paidAt: new Date().toISOString()
      },
      items: activeItems.map((item, idx) => ({
        id: idx + 1,
        productId: item.product.id,
        productName: item.product.name,
        variantName: item.selectedVariant?.variantName,
        sku: item.selectedVariant?.sku || item.product.sku,
        imageUrl:
          item.product.images[0]?.imageUrl ||
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80',
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        totalPrice: item.totalPrice
      })),
      courierName: 'Blue Dart Air Express'
    };

    const [fName, ...lNameArr] = address.fullName.trim().split(' ');
    updateUserProfile({
      firstName: fName || 'Customer',
      lastName: lNameArr.join(' ') || '',
      phone: address.phone,
      email: customerEmail || 'customer@datanexstore.in'
    });

    const newOrder = createOrder(orderPayload);
    const waText = generateWhatsAppMessage(newOrder.orderNumber);
    const waUrl = `https://wa.me/919911371218?text=${waText}`;

    // Open WhatsApp in new tab
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }

    setTimeout(() => {
      setIsProcessing(false);
      router.push(`/order-confirmed?orderId=${newOrder.id}&whatsapp=true`);
    }, 600);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (activeItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="inline-block bg-sky-600 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-xs"
          >
            Explore Catalog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full px-3 sm:px-8 lg:px-12 py-4 sm:py-8 space-y-6 pb-24 sm:pb-8">
        {/* Step Progress Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-bold">
            <div
              className={`flex items-center gap-2 ${
                step >= 1 ? 'text-sky-600' : 'text-slate-400'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono ${
                  step >= 1
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                1
              </div>
              <span>Shipping Address</span>
            </div>

            <div className="h-[2px] flex-1 bg-slate-100 mx-3"></div>

            <div
              className={`flex items-center gap-2 ${
                step >= 2 ? 'text-sky-600' : 'text-slate-400'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono ${
                  step >= 2
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                2
              </div>
              <span>Delivery Method</span>
            </div>

            <div className="h-[2px] flex-1 bg-slate-100 mx-3"></div>

            <div
              className={`flex items-center gap-2 ${
                step >= 3 ? 'text-sky-600' : 'text-slate-400'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono ${
                  step >= 3
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                3
              </div>
              <span>WhatsApp Invoice & Order</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Area (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Address Details */}
            {step === 1 && (
              <form
                onSubmit={handleAddressSubmit}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-sky-600" />
                    <h2 className="text-lg font-bold text-slate-900">
                      Step 1: Shipping Details
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">1 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) =>
                        setAddress({ ...address, fullName: e.target.value })
                      }
                      className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      WhatsApp / Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                      }
                      className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Email Address (For Notification & Invoice Copy) *
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Delivery Address (House/Flat, Street, Area) *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.addressLine1}
                    onChange={(e) =>
                      setAddress({ ...address, addressLine1: e.target.value })
                    }
                    className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                      className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Proceed to Delivery Selection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Shipping Options */}
            {step === 2 && (
              <form
                onSubmit={handleShippingSubmit}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-5 h-5 text-sky-600" />
                    <h2 className="text-lg font-bold text-slate-900">
                      Step 2: Shipping Method
                    </h2>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">2 of 3</span>
                </div>

                <div className="space-y-3">
                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      shippingMethod === 'express'
                        ? 'bg-sky-50 border-sky-600 ring-2 ring-sky-100'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Priority Air Express (Blue Dart / Delhivery)
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Estimated Delivery: 24 - 48 Hours with live AWB tracking
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 font-mono">
                      FREE
                    </span>
                  </label>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">
                    Special Order Instructions / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Please call before delivery or share package handling notes..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3.5 rounded-xl transition"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Proceed to WhatsApp Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: WhatsApp Direct Confirmation */}
            {step === 3 && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Step 3: WhatsApp Order & Invoice Dispatch
                      </h2>
                      <div className="text-xs text-slate-500">
                        Official WhatsApp Support Desk: <strong className="text-emerald-700 font-mono">+91 9911371218</strong>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">3 of 3</span>
                </div>

                {/* WhatsApp Notification Process Box */}
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>How WhatsApp Order Confirmation Works:</span>
                  </div>
                  <ul className="text-xs text-emerald-900 space-y-2 list-disc list-inside">
                    <li>
                      A complete <strong>Itemized Invoice Bill</strong> with your address, items, and total amount (₹{finalTotal.toLocaleString()}) will open directly on our official WhatsApp desk: <strong>+91 9911371218</strong>.
                    </li>
                    <li>
                      Our team will instantly accept and confirm your order, share the store payment QR / UPI ID on WhatsApp, and issue your official order invoice.
                    </li>
                    <li>
                      An automated email notification will simultaneously be logged to <strong>Datanexstore@gmail.com</strong> and <strong>{customerEmail}</strong>.
                    </li>
                  </ul>
                </div>

                {/* Delivery Summary */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-1">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    Delivery & Contact Summary
                  </div>
                  <div className="font-bold text-slate-900">{address.fullName} ({address.phone})</div>
                  <div className="text-slate-600">{address.addressLine1}, {address.city}, {address.state} - {address.pincode}</div>
                  <div className="text-slate-500 font-mono">Email: {customerEmail}</div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={isProcessing}
                    className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-4 rounded-xl transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    {isProcessing ? (
                      <span>Opening WhatsApp Desk...</span>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        <span>Place Order via WhatsApp (₹{finalTotal.toLocaleString()})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Area (5 Columns) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between border-b border-slate-100 pb-3">
                <span>Order Summary</span>
                <span className="text-xs font-mono text-sky-700 font-bold">
                  {activeItems.length} Item(s)
                </span>
              </h3>

              {/* Items List */}
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {activeItems.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.images[0]?.imageUrl}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-contain bg-slate-50 p-1 border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1 max-w-[180px]">
                          {item.product.name}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Qty: {item.quantity} {item.selectedVariant?.variantName ? `• ${item.selectedVariant.variantName}` : ''}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-slate-950">
                      ₹{item.totalPrice.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs font-mono border border-slate-200">
                <div className="flex justify-between text-slate-700">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon ({appliedCoupon?.code})</span>
                    <span>- ₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-700">
                  <span>Express Shipping</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Payable</span>
                  <span className="text-sky-700 font-mono">₹{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* WhatsApp Support Direct Box */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1.5">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Datanexstore WhatsApp Desk:</span>
                </div>
                <div className="text-emerald-900 font-mono font-bold text-sm">
                  +91 9911371218
                </div>
                <div className="text-[11px] text-emerald-800">
                  Email: <span className="font-mono font-semibold">Datanexstore@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
