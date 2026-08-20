'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Package,
  Printer,
  ArrowRight,
  Truck,
  MessageSquare,
  Phone,
  Mail,
  ShieldCheck,
  Zap,
  ExternalLink,
  Clock,
  Check,
  AlertCircle
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

function OrderConfirmedContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('orderId');
  const [isClient, setIsClient] = useState(false);

  const orders = useStore((state) => state.orders);
  const confirmOrderViaWhatsApp = useStore((state) => state.confirmOrderViaWhatsApp);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const latestOrder = useMemo(() => {
    if (orderIdParam) {
      const match = orders.find((o) => o.id.toString() === orderIdParam);
      if (match) return match;
    }
    return orders[0] || null;
  }, [orders, orderIdParam]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (!latestOrder) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 max-w-xl mx-auto px-4 py-20 text-center space-y-4">
          <h2 className="text-2xl font-black text-slate-900">No Order Found</h2>
          <p className="text-xs text-slate-500">
            We could not find the requested order in your session.
          </p>
          <Link
            href="/products"
            className="inline-block bg-sky-600 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-xs"
          >
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isConfirmedOnWhatsApp =
    latestOrder.status === 'CONFIRMED' ||
    latestOrder.status === 'PROCESSING' ||
    latestOrder.status === 'SHIPPED' ||
    latestOrder.status === 'DELIVERED' ||
    latestOrder.whatsappConfirmed;

  const generateWhatsAppMessage = () => {
    const formattedDate = new Date(latestOrder.createdAt).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const itemsList = latestOrder.items
      .map(
        (item, index) =>
          `🔹 *${index + 1}. ${item.productName}*\n   └ Edition: ${
            item.variantName || 'Standard'
          }\n   └ SKU: \`${item.sku}\`\n   └ Qty: *${item.quantity}* × ₹${item.unitPrice.toLocaleString()} ═► *₹${item.totalPrice.toLocaleString()}*`
      )
      .join('\n\n');

    const message = `╔══════════════════════════════════════╗
║   🏢 *DATANEXSTORE RETAIL INDIA*     ║
║   🧾 *OFFICIAL ORDER & TAX INVOICE*  ║
╚══════════════════════════════════════╝

📋 *ORDER REFERENCE:* \`#${latestOrder.orderNumber}\`
📅 *DATE & TIME:* ${formattedDate}
🛡️ *STATUS:* ${isConfirmedOnWhatsApp ? '✅ CONFIRMED VIA WHATSAPP' : '⏳ PENDING WHATSAPP VERIFICATION'}

────────────────────────────────────────
👤 *CUSTOMER & DELIVERY ADDRESS:*
• *Name:* ${latestOrder.customerName}
• *Phone:* ${latestOrder.customerPhone}
• *Email:* ${latestOrder.customerEmail}
• *Address:* ${latestOrder.shippingAddress.addressLine1}
• *City / State:* ${latestOrder.shippingAddress.city}, ${latestOrder.shippingAddress.state} - ${latestOrder.shippingAddress.pincode}

────────────────────────────────────────
🛍️ *ORDERED ITEMS DETAILS:*

${itemsList}

────────────────────────────────────────
💰 *BILLING & INVOICE BREAKDOWN:*
• *Item Subtotal:* ₹${latestOrder.subtotal.toLocaleString()}
• *Express Air Courier:* FREE (₹0)
• *Taxes & Handling:* Included
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💵 *NET TOTAL PAYABLE:* *₹${latestOrder.totalAmount.toLocaleString()}*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📞 *WhatsApp Desk:* +91 9911371218
✉️ *Official Email:* Datanexstore@gmail.com
🌐 *Website:* https://datanexstore.in`;

    return encodeURIComponent(message);
  };

  const waUrl = `https://wa.me/919911371218?text=${generateWhatsAppMessage()}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-10 space-y-6 pb-24 sm:pb-10">
        
        {/* Real-time Order & WhatsApp Verification Banner */}
        <div className="text-center space-y-4 bg-white border border-slate-200 rounded-3xl p-8 shadow-xs">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs border border-emerald-100">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          {/* Real-time WhatsApp Verification Pill */}
          <div className="inline-flex items-center gap-2">
            {isConfirmedOnWhatsApp ? (
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>ORDER CONFIRMED & ACCEPTED VIA WHATSAPP DESK</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-4 py-1.5 rounded-full font-mono">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping"></span>
                <span>AWAITING STORE CONFIRMATION ON WHATSAPP (+91 9911371218)</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Order Reference #{latestOrder.orderNumber}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            {isConfirmedOnWhatsApp
              ? 'Your order has been verified and confirmed by our WhatsApp desk. Preparing parcel for express air dispatch.'
              : 'Your order is recorded on our system. Please send the pre-filled invoice message on WhatsApp to complete payment and store confirmation.'}
          </p>

          {/* Big WhatsApp Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm py-3.5 px-6 rounded-2xl transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>
                {isConfirmedOnWhatsApp
                  ? 'Chat with Store on WhatsApp (+91 9911371218)'
                  : 'Send Invoice on WhatsApp (+91 9911371218)'}
              </span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Interactive WhatsApp Confirmation Simulation Button for Testing */}
            {!isConfirmedOnWhatsApp && (
              <button
                onClick={() => confirmOrderViaWhatsApp(latestOrder.id, true)}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3.5 px-4 rounded-2xl transition flex items-center justify-center gap-1.5 font-mono"
                title="Simulate WhatsApp acceptance directly from store"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simulate Store WhatsApp Acceptance</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Multi-Channel Notification Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs font-mono">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WHATSAPP DESK: +91 9911371218</span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Status: <strong className="font-mono">{isConfirmedOnWhatsApp ? '✅ ACCEPTED & CONFIRMED' : '⏳ PENDING MANUAL ACCEPTANCE'}</strong>
              <br />
              All order modifications, payment QR codes, and tracking updates are coordinated directly via WhatsApp.
            </p>
          </div>

          <div className="bg-sky-50/90 border border-sky-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-sky-950 font-bold text-xs font-mono">
              <Mail className="w-4 h-4 text-sky-600" />
              <span>EMAIL ALERT: Datanexstore@gmail.com</span>
            </div>
            <p className="text-xs text-sky-900 leading-relaxed">
              Order notification logged for customer <strong className="font-mono">{latestOrder.customerEmail}</strong> and store desk <strong className="font-mono">Datanexstore@gmail.com</strong>.
            </p>
          </div>
        </div>

        {/* Itemized Order & Invoice Details */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                Official Tax Invoice
              </div>
              <div className="text-base font-bold text-slate-900 font-mono">
                Order #{latestOrder.orderNumber}
              </div>
            </div>
            <button
              onClick={() => typeof window !== 'undefined' && window.print()}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition font-mono"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Tax Invoice</span>
            </button>
          </div>

          {/* Delivery & Billing Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">
                Customer & Delivery Address
              </div>
              <div className="font-bold text-slate-900">{latestOrder.customerName}</div>
              <div className="text-slate-600">{latestOrder.shippingAddress.addressLine1}</div>
              <div className="text-slate-600">
                {latestOrder.shippingAddress.city}, {latestOrder.shippingAddress.state} - {latestOrder.shippingAddress.pincode}
              </div>
              <div className="text-slate-600 font-mono mt-1">Phone: {latestOrder.customerPhone}</div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase mb-1">
                Store Verification Desk
              </div>
              <div className="font-bold text-slate-900">Datanexstore Retail India</div>
              <div className="text-slate-600">WhatsApp Desk: +91 9911371218</div>
              <div className="text-slate-600">Email: Datanexstore@gmail.com</div>
              <div className="text-slate-700 font-mono font-bold mt-1">
                Status: {isConfirmedOnWhatsApp ? '🟢 CONFIRMED VIA WHATSAPP' : '🟡 AWAITING WHATSAPP ACCEPTANCE'}
              </div>
            </div>
          </div>

          {/* Order Items Table */}
          <div className="divide-y divide-slate-100">
            {latestOrder.items.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-12 h-12 rounded-xl object-contain bg-slate-50 p-1 border border-slate-200"
                  />
                  <div>
                    <div className="font-bold text-slate-900">{item.productName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Qty: {item.quantity} {item.variantName ? `• ${item.variantName}` : ''} • SKU: {item.sku}
                    </div>
                  </div>
                </div>
                <div className="font-mono font-bold text-slate-950 text-sm">
                  ₹{item.totalPrice.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Total Breakdown */}
          <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs font-mono border border-slate-200">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>₹{latestOrder.subtotal.toLocaleString()}</span>
            </div>
            {latestOrder.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Discount ({latestOrder.couponCode})</span>
                <span>- ₹{latestOrder.discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Express Air Courier</span>
              <span className="text-emerald-700 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>Taxes & Handling (Included)</span>
              <span>₹{latestOrder.taxAmount.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-base text-slate-900">
              <span>Total Payable Amount</span>
              <span className="text-sky-700 font-black">₹{latestOrder.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Link
              href="/track-order"
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-5 py-3 rounded-xl transition flex items-center gap-2 font-mono"
            >
              <Truck className="w-4 h-4 text-sky-600" />
              <span>Track Order Live Status</span>
            </Link>

            <Link
              href="/products"
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition flex items-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderConfirmedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    }>
      <OrderConfirmedContent />
    </Suspense>
  );
}
