# 📱 WhatsApp Integration Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          DataNexStore WhatsApp Integration               │
│                          Business Number: +91 9911371218                 │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│                  │         │                  │         │                  │
│   Customer       │   ◄───► │   Frontend       │   ◄───► │   Backend        │
│   (Browser)      │         │   (Next.js)      │         │   (Spring Boot)  │
│                  │         │                  │         │                  │
└──────────────────┘         └──────────────────┘         └────────┬─────────┘
                                                                    │
                                                                    │ Twilio API
                                                                    ▼
                                                          ┌──────────────────┐
                                                          │                  │
                                                          │   WhatsApp       │
                                                          │   (Twilio)       │
                                                          │                  │
                                                          └────────┬─────────┘
                                                                   │
                                   ┌───────────────────────────────┼──────────────────────────┐
                                   │                               │                          │
                                   ▼                               ▼                          ▼
                            ┌──────────────┐              ┌──────────────┐          ┌──────────────┐
                            │              │              │              │          │              │
                            │  Business    │              │  Customer    │          │  Customer    │
                            │  WhatsApp    │              │  WhatsApp    │          │  WhatsApp    │
                            │ +919911371218│              │ +919876543210│          │ +919123456789│
                            │              │              │              │          │              │
                            └──────────────┘              └──────────────┘          └──────────────┘
```

---

## Order Booking Flow

```
Customer Journey                          System Processing                    WhatsApp Messages
═══════════════════                       ════════════════════                 ═════════════════

1. Browse Products                        Load Product Data
   └─► Product Page                       └─► Display Price,
       [RTX 4090]                             Stock, Details


2. Click "Order via WhatsApp"            Open Modal Component
   └─► WhatsAppOrderModal                ├─► Load WhatsApp Config
       Opens                              └─► Fetch Business Number
                                             from Backend API


3. Fill Order Form                       Validate Form Data
   ├─► Name: Abhishek                   ├─► Check Required Fields
   ├─► Phone: 9876543210                ├─► Validate Phone Format
   ├─► Product: RTX 4090                └─► Calculate Total
   ├─► Qty: 1
   └─► Address: Delhi


4. Submit Form                           POST /api/whatsapp/order-booking
   [Click Submit]                        │
                                         ├─► WhatsAppService.sendOrderBookingRequest()
                                         │   
                                         ├─► Format Order Message
                                         │   (Business Template)
                                         │
                                         └─► Format Confirmation
                                             (Customer Template)


5. Backend Processes                     Twilio API Calls
   ────────────────                      ───────────────
                                         
   ┌─► Send to Business                     ┌──────────────────────────┐
   │   whatsAppService                      │ 🔔 New Order Request     │
   │   .sendWhatsAppMessage()               │                          │
   │   └─► To: +919911371218 ◄─────────────┤ 👤 Abhishek             │
   │                                        │ 📱 9876543210           │
   │                                        │                          │
   │                                        │ 📦 RTX 4090             │
   └─► Send to Customer                    │ Qty: 1 | ₹189,999      │
       whatsAppService                      │                          │
       .sendWhatsAppMessage()               │ 💰 Total: ₹189,999     │
       └─► To: +919876543210                └──────────────────────────┘
                                         
                                                     │
                                                     │
                                                     ▼
                                            ┌──────────────────────────┐
                                            │ ✅ Request Received      │
                                            │                          │
                                            │ Hi Abhishek! 👋         │
                                            │                          │
                                            │ We've received your      │
                                            │ order request.           │
                                            │                          │
                                            │ Our team will contact    │
                                            │ you shortly.             │
                                            │                          │
                                            │ 📞 +919911371218        │
                                            └──────────────────────────┘


6. Show Success                          Return Success Response
   ✓ "Request Sent!"                    {
   └─► Auto-close modal                   "success": true,
       after 3 seconds                    "message": "Order sent!"
                                         }


7. Business Team Responds                Manual WhatsApp Chat
   └─► Chat with customer               ├─► Confirm order details
       on WhatsApp                       ├─► Discuss payment
                                         └─► Schedule delivery
```

---

## Complete Order Lifecycle with WhatsApp

```
Order State          Backend Action                    WhatsApp Message Sent
═══════════          ═════════════                     ════════════════════

1. ORDER_PLACED      orderService.createOrder()       
   │                 └─► Save to database              
   │                                                    
   ▼                                                    
   WhatsApp          whatsAppService                   ┌──────────────────────┐
   Notification      .sendOrderConfirmation()          │ ✅ Order Confirmed   │
   │                                                    │                      │
   │                                                    │ Order: #ORD-001      │
   │                                                    │ Amount: ₹189,999    │
   │                                                    │                      │
   │                                                    │ Products:            │
   │                                                    │ - RTX 4090 x1        │
   │                                                    │                      │
   │                                                    │ Tracking coming soon │
   ▼                                                    └──────────────────────┘


2. PAYMENT_CONFIRMED invoiceService                    
   │                 .generateInvoice()                
   │                 └─► Create PDF                    
   │                                                    
   ▼                                                    
   WhatsApp          whatsAppService                   ┌──────────────────────┐
   Notification      .sendInvoice()                    │ 🧾 Invoice Ready     │
   │                                                    │                      │
   │                                                    │ Order: #ORD-001      │
   │                                                    │ Amount: ₹189,999    │
   │                                                    │                      │
   │                                                    │ 📄 Download:         │
   │                                                    │ [Invoice Link]       │
   ▼                                                    └──────────────────────┘


3. ORDER_SHIPPED     orderService                      
   │                 .updateStatus("SHIPPED")          
   │                 └─► Get tracking number           
   │                                                    
   ▼                                                    
   WhatsApp          whatsAppService                   ┌──────────────────────┐
   Notification      .sendShipmentUpdate()             │ 📦 Order Shipped     │
   │                                                    │                      │
   │                                                    │ Order: #ORD-001      │
   │                                                    │ Courier: Blue Dart   │
   │                                                    │ Tracking: 123456     │
   │                                                    │                      │
   │                                                    │ Status: In Transit   │
   ▼                                                    └──────────────────────┘


4. OUT_FOR_DELIVERY  orderService                      
   │                 .updateStatus("OUT_FOR_DELIVERY") 
   │                                                    
   ▼                                                    
   WhatsApp          whatsAppService                   ┌──────────────────────┐
   Notification      .sendShipmentUpdate()             │ 🚚 Out for Delivery  │
   │                                                    │                      │
   │                                                    │ Your order will be   │
   │                                                    │ delivered today!     │
   │                                                    │                      │
   │                                                    │ Tracking: 123456     │
   ▼                                                    └──────────────────────┘


5. DELIVERED         orderService                      
                     .updateStatus("DELIVERED")        
                     └─► Update delivery date          
                                                        
                     whatsAppService                   ┌──────────────────────┐
                     .sendShipmentUpdate()             │ ✅ Delivered!        │
                                                        │                      │
                                                        │ Your order has been  │
                                                        │ successfully         │
                                                        │ delivered.           │
                                                        │                      │
                                                        │ Thank you! 🙏       │
                                                        └──────────────────────┘
```

---

## API Request/Response Flow

```
Frontend                    Backend API                   WhatsApp Service              Twilio
════════                    ═══════════                   ════════════════              ══════

1. POST /whatsapp/order-booking
   │
   ├─► Request Body:
   │   {
   │     "customerName": "Abhishek",
   │     "phoneNumber": "9876543210",
   │     "items": [{...}]
   │   }
   │
   └──────────────────────────► WhatsAppController
                                .bookOrderViaWhatsApp()
                                        │
                                        ├─► Validate Request
                                        │   (Check required fields)
                                        │
                                        └─► Call WhatsAppService
                                            .sendOrderBookingRequest()
                                                    │
                                                    ├─► Build Business Message
                                                    │   (Format order details)
                                                    │
                                                    ├─► Build Customer Message
                                                    │   (Confirmation text)
                                                    │
                                                    └─► sendWhatsAppMessage()
                                                            │
                                                            ├─► To: +919911371218
                                                            │   Message: Order details
                                                            │       │
                                                            │       └────────────────────► Twilio.createMessage()
                                                            │                                     │
                                                            │                                     └─► WhatsApp API
                                                            │                                             │
                                                            │                                             └─► ✓ Delivered
                                                            │
                                                            └─► To: +919876543210
                                                                Message: Confirmation
                                                                    │
                                                                    └────────────────────► Twilio.createMessage()
                                                                                                  │
                                                                                                  └─► WhatsApp API
                                                                                                          │
                                                                                                          └─► ✓ Delivered
   ◄───────────────────────────────────────────────────────────────
   Response:
   {
     "success": true,
     "message": "Order sent successfully!"
   }
```

---

## Component Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  Layout Component (app/layout.tsx)                         │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────┐          │   │
│  │  │  <WhatsAppButton />                          │          │   │
│  │  │  - Floating button (bottom-right)            │          │   │
│  │  │  - Fetches config from API                   │          │   │
│  │  │  - Opens WhatsApp link                       │          │   │
│  │  └──────────────────────────────────────────────┘          │   │
│  │                                                              │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  Product Page (app/products/[slug]/page.tsx)              │   │
│  │                                                              │   │
│  │  ┌──────────────────────────────────────────────┐          │   │
│  │  │  <WhatsAppOrderModal />                      │          │   │
│  │  │  - Order booking form                        │          │   │
│  │  │  - Multi-product support                     │          │   │
│  │  │  - Validates & submits to API                │          │   │
│  │  │  - Shows success message                     │          │   │
│  │  └──────────────────────────────────────────────┘          │   │
│  │                                                              │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  WhatsApp Utilities (lib/whatsapp.ts)                     │   │
│  │                                                              │   │
│  │  - getWhatsAppConfig()                                      │   │
│  │  - submitWhatsAppOrder()                                    │   │
│  │  - getWhatsAppContactLink()                                 │   │
│  │  - openWhatsAppChat()                                       │   │
│  │  - formatPhoneNumber()                                      │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ HTTP/REST API
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      Backend (Spring Boot)                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  WhatsAppController                                        │   │
│  │  - GET  /api/whatsapp/config                              │   │
│  │  - POST /api/whatsapp/order-booking                       │   │
│  │  - GET  /api/whatsapp/contact-link                        │   │
│  │  - POST /api/whatsapp/test                                │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                │                                    │
│                                ▼                                    │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  WhatsAppService                                           │   │
│  │  - sendOrderConfirmation()                                 │   │
│  │  - sendInvoice()                                           │   │
│  │  - sendOrderBookingRequest()                               │   │
│  │  - sendShipmentUpdate()                                    │   │
│  │  - sendWhatsAppMessage()      ◄── Core method              │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                │                                    │
│                                ▼                                    │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │  WhatsAppConfig                                            │   │
│  │  - Twilio credentials                                      │   │
│  │  - Business number: +919911371218                         │   │
│  │  - Initializes Twilio SDK                                  │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                │ Twilio SDK
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Twilio WhatsApp API                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Message.creator(                                                   │
│    from: "whatsapp:+14155238886",                                   │
│    to: "whatsapp:+919876543210",                                    │
│    body: "Message text..."                                          │
│  ).create()                                                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
                          📱 WhatsApp
                    (Customer & Business)
```

---

## Message Templates Flow

```
Template Type            Trigger Event                Generated Message
═════════════            ═════════════                ═════════════════

ORDER_BOOKING           Customer submits             🔔 New Order Booking Request
(To Business)           WhatsApp order form          
                        └─► WhatsAppService           👤 Customer: {name}
                            .sendOrderBookingRequest() 📱 Phone: {phone}
                                                      
                                                      📦 Products:
                                                      1. {product} x{qty} | ₹{price}
                                                      
                                                      💰 Total: ₹{total}
                                                      📍 Address: {address}
                                                      ────────────────────────────

BOOKING_CONFIRMATION    Customer submits             ✅ Order Request Received
(To Customer)           WhatsApp order form          
                        └─► WhatsAppService           Hi {name}! 👋
                            .sendOrderBookingRequest()
                                                      We've received your order
                                                      request via WhatsApp.
                                                      
                                                      Our team will contact you
                                                      shortly.
                                                      
                                                      📞 +919911371218
                                                      ────────────────────────────

ORDER_CONFIRMATION      Order placed                 ✅ Order Confirmed
(To Customer)           in system                    
                        └─► OrderService              Hi {name}! 🎉
                            .createOrder()            
                            whatsAppService           📦 Order ID: {orderId}
                            .sendOrderConfirmation()  💰 Amount: ₹{amount}
                                                      
                                                      📋 Order Details:
                                                      {productList}
                                                      
                                                      Tracking details coming soon.
                                                      ────────────────────────────

INVOICE_DELIVERY        Invoice generated            🧾 Invoice Ready
(To Customer)           after payment                
                        └─► InvoiceService            Hi {name},
                            .generateInvoice()        
                            whatsAppService           📦 Order: {orderId}
                            .sendInvoice()            💰 Amount: ₹{amount}
                                                      
                                                      📄 Download Invoice:
                                                      {invoiceUrl}
                                                      
                                                      📞 Questions? WhatsApp us.
                                                      ────────────────────────────

SHIPMENT_UPDATE         Order status changes         📦 Shipment Update
(To Customer)           to SHIPPED                   
                        └─► OrderService              📦 Order: {orderId}
                            .updateOrderStatus()      🚚 Courier: {courierName}
                            whatsAppService           🔢 Tracking: {trackingNo}
                            .sendShipmentUpdate()     📍 Status: {status}
                                                      
                                                      Track for real-time updates.
                                                      ────────────────────────────

DELIVERY_UPDATE         Order OUT_FOR_DELIVERY       🚚 Out for Delivery
(To Customer)           or DELIVERED                 
                        └─► OrderService              Your order will be delivered
                            .updateOrderStatus()      today!
                            whatsAppService           
                            .sendShipmentUpdate()     Tracking: {trackingNo}
                                                      Status: {status}
```

---

## Security & Error Handling Flow

```
Request Flow                    Validation                     Error Handling
════════════                    ══════════                     ══════════════

Customer Request
    │
    ├─► Phone Number            ┌─► Regex: ^[+]?[0-9]{10,15}$  ❌ "Invalid phone"
    │   Validation              │   └─► Pass ✓                 └─► Return 400
    │                           │
    ├─► Required Fields         ├─► customerName not empty     ❌ "Name required"
    │   Check                   │   └─► Pass ✓                 └─► Return 400
    │                           │
    ├─► Items Array             └─► items.length > 0           ❌ "No products"
    │   Validation                  └─► Pass ✓                 └─► Return 400
    │
    ▼
Twilio API Call
    │
    ├─► Authentication          ┌─► Valid Account SID?         ❌ "Auth failed"
    │                           │   └─► Pass ✓                 └─► Log & retry
    │                           │
    ├─► Rate Limiting           ├─► Under Twilio limits?       ❌ "Rate limit"
    │                           │   └─► Pass ✓                 └─► Queue & retry
    │                           │
    └─► Message Delivery        └─► WhatsApp reachable?        ❌ "Not delivered"
                                    └─► Pass ✓                 └─► Log warning
                                                                   (Don't fail order)

Error Response Format:
{
  "success": false,
  "message": "Specific error description",
  "timestamp": "2026-08-18T14:30:00",
  "path": "/api/whatsapp/order-booking"
}
```

---

## System Integration Points

```
┌──────────────────────────────────────────────────────────────────────┐
│                    DataNexStore System                               │
└──────────────────────────────────────────────────────────────────────┘

OrderService ──┬─► WhatsAppService.sendOrderConfirmation()
               │   └─► Message: "Order confirmed"
               │
               ├─► EmailService.sendOrderEmail()
               │   └─► Email: Order details
               │
               └─► NotificationService.pushNotification()
                   └─► Push: "Order #123 confirmed"

InvoiceService ──► WhatsAppService.sendInvoice()
                   └─► Message: Invoice PDF link

PaymentService ──► WhatsAppService.sendPaymentConfirmation()
                   └─► Message: "Payment received"

ShippingService ──► WhatsAppService.sendShipmentUpdate()
                    └─► Message: Tracking info

AdminService ──┬─► WhatsAppService.sendOrderBookingRequest()
               │   └─► Message to business: New order
               │
               └─► WhatsAppService.sendAdminAlert()
                   └─► Message: Important notifications
```

---

**This flow diagram covers:**
- ✅ System architecture
- ✅ Order booking process
- ✅ Complete order lifecycle
- ✅ API request/response flow
- ✅ Component architecture
- ✅ Message templates
- ✅ Security & error handling
- ✅ System integration points

**Business WhatsApp**: +91 9911371218
