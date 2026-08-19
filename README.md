# ⚡ Datanexstore — High-End Electronics E-Commerce Platform

> Production-ready electronics retail platform engineered exclusively for computer hardware, enthusiast peripherals, custom mechanical keyboards, displays, NVMe storage, and PC components.

---

## 🌟 Architecture Overview

```
datanexstore/
├── techvault-frontend/                # Next.js 14 App Router + TypeScript + Tailwind CSS
│   ├── src/
│   │   ├── app/                       # App Router Pages & API routes
│   │   │   ├── page.tsx               # Flagship Homepage with Deals & Curated Grid
│   │   │   ├── products/              # Product Listing with Dynamic Technical Filters
│   │   │   ├── products/[slug]/       # Product Detail with Dynamic Specs & Variant Engine
│   │   │   ├── cart/                  # Shopping Cart with Coupon discounts & Save for later
│   │   │   ├── checkout/              # 4-Step Checkout with Razorpay Integration
│   │   │   ├── order-confirmed/       # Confirmation screen with Live Tracking & Invoicing
│   │   │   ├── wishlist/              # Customer Saved Hardware
│   │   │   ├── compare/               # Side-by-side Matrix Comparison Tool
│   │   │   ├── track-order/           # Real-time AWB Carrier Milestone Timeline
│   │   │   ├── dashboard/             # Customer Portal (Orders, Addresses, Profile, Security)
│   │   │   └── admin/                 # Control Center
│   │   │       ├── page.tsx           # Live Analytics Dashboard & Charts (Recharts)
│   │   │       ├── products/          # Full Product CRUD & Dynamic Spec Field Wizard
│   │   │       ├── categories/        # Dynamic Category & Spec Field Builder
│   │   │       ├── orders/            # Order Fulfillment State Machine & Tracking
│   │   │       ├── inventory/         # Stock Replenishment & Low Stock Alerts
│   │   │       ├── coupons/           # Promotional Discount Codes Manager
│   │   │       ├── reviews/           # Review Quality Moderation
│   │   │       └── customers/         # Customer CRM & Purchase History
│   │   ├── components/                # Reusable UI & Layout Components
│   │   ├── lib/                       # Seed Catalog, Utilities & Data
│   │   ├── store/                     # Zustand Central State Management
│   │   └── types/                     # TypeScript Domain Models
│
└── techvault-backend/                 # Java 21 + Spring Boot 3.3.x + Spring Security + JPA
    ├── src/main/java/com/techvault/backend/
    │   ├── config/                    # SecurityConfig, CorsConfig
    │   ├── controller/                # PaymentController, AdminDashboardController, etc.
    │   ├── service/                   # RazorpayService, AuthService, ProductService
    │   ├── security/                  # JwtTokenProvider, JwtAuthenticationFilter
    │   ├── dto/                       # ApiResponse<T>, DTO definitions
    │   └── exception/                 # GlobalExceptionHandler, ResourceNotFoundException
    └── src/main/resources/
        ├── application.properties     # Environment-driven Configuration
        └── db/migration/              # Flyway PostgreSQL Migrations (V1, V2, V3)
```

---

## 🚀 Key Features

### 1. Customer Storefront
- **Dynamic Category Specifications**: Categories automatically define technical attributes (e.g. *Keyboards* have Switch Type & RGB; *SSD* has NVMe PCIe Gen & Read Speed; *Monitors* have Refresh Rate & Panel Type).
- **Multi-Variant Engine**: Seamlessly switch colors, switch types, and storage capacities with live updates to SKU, price, stock, and gallery images.
- **Search with Autocomplete**: Real-time matching across product titles, brands, SKUs, and categories.
- **Multi-Step Checkout**: 4-step streamlined checkout (Address → Delivery Speed → Review → Razorpay Payment).
- **Product Matrix Comparison**: Compare up to 4 hardware products side-by-side with dynamic spec rows.
- **Real-Time Order Tracking**: Interactive shipment timeline with courier checkpoints (Blue Dart / Delhivery).
- **📱 WhatsApp Integration**: Order via WhatsApp (+91 9911371218) with automated confirmations and invoice delivery.

### 2. Admin Control Center (`/admin`)
- **Interactive Analytics**: Real-time sales revenue area chart, category distribution donut, and low-stock counters.
- **Product Management Wizard**: Create and update products without code changes, including dynamic spec assignment and variant generation.
- **Category Spec Field Builder**: Add custom technical fields (select dropdown, text, number, boolean) to any category directly from the UI.
- **Order State Machine**: Progress orders through `PENDING → CONFIRMED → PROCESSING → PACKED → SHIPPED → OUT_FOR_DELIVERY → DELIVERED` with tracking numbers.
- **Inventory Replenishment**: Low-stock threshold alerts with one-click stock adjustment.
- **Coupons & Review Moderation**: Full control over promotional campaigns and verified buyer testimonials.

---

## 🛠️ Quick Start & Running Locally

### Prerequisites
- Node.js v18+ (Node v24 supported)
- Java 21 & Maven 3.9+
- PostgreSQL & Redis (optional for local mock mode)
- Twilio Account (for WhatsApp integration)

### 1. Frontend Setup
```bash
cd techvault-frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Storefront**: [http://localhost:3000](http://localhost:3000)
- **Admin Control Center**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Product Catalog & Filters**: [http://localhost:3000/products](http://localhost:3000/products)
- **Hardware Comparison**: [http://localhost:3000/compare](http://localhost:3000/compare)
- **Shopping Cart**: [http://localhost:3000/cart](http://localhost:3000/cart)

### 2. Backend Setup
```bash
cd techvault-backend
mvn clean spring-boot:run
```
Backend runs on `http://localhost:8080/api` with OpenAPI Swagger docs at `http://localhost:8080/api/swagger-ui.html`.

---

## 📱 WhatsApp Integration

DataNexStore includes full WhatsApp integration for order booking and automated notifications.

**Business WhatsApp Number**: +91 9911371218

### Features:
- 📞 **Order via WhatsApp**: Customers can place orders directly through WhatsApp
- 📄 **Automated Invoices**: Invoice PDFs sent automatically via WhatsApp after order confirmation
- 📦 **Shipment Tracking**: Real-time delivery updates sent to customer's WhatsApp
- 💬 **Direct Contact**: Floating WhatsApp button for instant customer support

### Quick Setup:
1. Create a Twilio account at [twilio.com](https://www.twilio.com/)
2. Get your Account SID, Auth Token, and WhatsApp number
3. Add credentials to `.env`:
   ```env
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
   ```
4. Test the integration using the API endpoint:
   ```bash
   curl -X POST "http://localhost:8080/api/whatsapp/test?phoneNumber=919911371218"
   ```

📖 **Detailed Guide**: See [WHATSAPP_INTEGRATION.md](./WHATSAPP_INTEGRATION.md) for complete setup instructions, API documentation, and troubleshooting.

---

## 📄 License
Datanexstore is proprietary software developed for high-end electronics e-commerce operations.
