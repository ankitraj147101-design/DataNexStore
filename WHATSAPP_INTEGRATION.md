# 📱 WhatsApp Integration Guide - DataNexStore

## Overview
This document covers the WhatsApp integration for **order booking** and **invoice delivery** via WhatsApp using Twilio's WhatsApp Business API.

**Business WhatsApp Number:** +91 9911371218

---

## 🚀 Features

### 1. **Order Booking via WhatsApp**
- Customers can submit order requests directly via WhatsApp
- Order details are sent to business WhatsApp number
- Automatic confirmation message sent to customer
- Multi-product support with SKU, quantity, and pricing

### 2. **Automated Notifications**
- ✅ Order confirmation messages
- 📄 Invoice delivery with download links
- 📦 Shipment tracking updates
- 🚚 Delivery status notifications

### 3. **Direct Customer Contact**
- Floating WhatsApp button on website
- Click-to-chat functionality
- Pre-filled messages for common queries

---

## 🛠️ Backend Implementation

### Dependencies Added
```xml
<!-- Twilio WhatsApp SDK -->
<dependency>
    <groupId>com.twilio.sdk</groupId>
    <artifactId>twilio</artifactId>
    <version>10.1.5</version>
</dependency>
```

### Configuration (application.properties)
```properties
# WhatsApp (Twilio)
twilio.account-sid=${TWILIO_ACCOUNT_SID:your_twilio_account_sid}
twilio.auth-token=${TWILIO_AUTH_TOKEN:your_twilio_auth_token}
twilio.whatsapp-number=${TWILIO_WHATSAPP_NUMBER:whatsapp:+14155238886}
app.whatsapp.business-number=+919911371218
app.whatsapp.order-booking-enabled=true
```

### Files Created

#### Backend Java Files:
1. **`WhatsAppConfig.java`** - Configuration class for Twilio initialization
2. **`WhatsAppService.java`** - Core service for sending WhatsApp messages
3. **`WhatsAppController.java`** - REST API endpoints for WhatsApp operations
4. **`WhatsAppOrderRequest.java`** - DTO for order booking requests

#### Frontend TypeScript Files:
5. **`WhatsAppButton.tsx`** - Floating WhatsApp contact button component
6. **`WhatsAppOrderModal.tsx`** - Order booking form modal
7. **`lib/whatsapp.ts`** - WhatsApp utility functions and API client

---

## 📡 API Endpoints

### 1. Get WhatsApp Configuration
```http
GET /api/whatsapp/config
```

**Response:**
```json
{
  "success": true,
  "message": "WhatsApp configuration retrieved successfully",
  "data": {
    "businessWhatsAppNumber": "+919911371218",
    "orderBookingEnabled": true,
    "whatsAppLink": "https://wa.me/919911371218"
  }
}
```

### 2. Submit Order Booking Request
```http
POST /api/whatsapp/order-booking
Content-Type: application/json
```

**Request Body:**
```json
{
  "customerName": "Abhishek Kumar",
  "phoneNumber": "9876543210",
  "items": [
    {
      "productName": "ROG Strix GeForce RTX 4090",
      "productSku": "GPU-RTX4090-001",
      "quantity": 1,
      "price": 149999.00
    }
  ],
  "deliveryAddress": "123, MG Road, Bangalore - 560001",
  "notes": "Please call before delivery"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order booking request sent successfully! Our team will contact you shortly on WhatsApp.",
  "data": "Order request submitted for: Abhishek Kumar"
}
```

### 3. Get WhatsApp Contact Link
```http
GET /api/whatsapp/contact-link?message=Hello,%20I%20need%20help
```

**Response:**
```json
{
  "success": true,
  "message": "WhatsApp contact link generated",
  "data": {
    "whatsappLink": "https://wa.me/919911371218?text=Hello,%20I%20need%20help",
    "phoneNumber": "+919911371218"
  }
}
```

### 4. Test WhatsApp Message
```http
POST /api/whatsapp/test?phoneNumber=919876543210&message=Test%20message
```

---

## 🎨 Frontend Components

### 1. WhatsApp Floating Button
Add to your main layout:

```tsx
import WhatsAppButton from '@/components/WhatsAppButton';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
```

### 2. WhatsApp Order Modal
Use in product pages or cart:

```tsx
import WhatsAppOrderModal from '@/components/WhatsAppOrderModal';
import { useState } from 'react';

export default function ProductPage() {
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowWhatsAppModal(true)}>
        Order via WhatsApp
      </button>

      <WhatsAppOrderModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        prefilledItems={[
          {
            productName: "Product Name",
            productSku: "SKU-001",
            quantity: 1,
            price: 49999
          }
        ]}
      />
    </>
  );
}
```

### 3. Direct WhatsApp Link
```tsx
import { openWhatsAppChat } from '@/lib/whatsapp';

<button onClick={() => openWhatsAppChat('+919911371218', 'Hi, I need help!')}>
  Chat on WhatsApp
</button>
```

---

## 🔧 Setup Instructions

### Step 1: Create Twilio Account
1. Sign up at [Twilio](https://www.twilio.com/)
2. Navigate to **Console → WhatsApp**
3. Get your:
   - Account SID
   - Auth Token
   - WhatsApp Sandbox Number (for testing)

### Step 2: WhatsApp Business API (Production)
For production with your own number (+919911371218):
1. Apply for [WhatsApp Business API](https://www.twilio.com/whatsapp/request-access)
2. Complete Meta verification
3. Get your business number approved
4. Update `TWILIO_WHATSAPP_NUMBER` in environment

### Step 3: Environment Configuration
Create `.env` file in backend:

```env
# Twilio WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### Step 4: Test Integration
```bash
# Start backend
cd techvault-backend
mvn spring-boot:run

# Test endpoint
curl -X POST "http://localhost:8080/api/whatsapp/test?phoneNumber=919911371218&message=Test"
```

---

## 📋 Message Templates

### Order Confirmation
```
✅ Order Confirmed - DataNexStore

Hi {CustomerName}! 🎉

Your order has been confirmed!

📦 Order ID: {OrderId}
💰 Total Amount: ₹{Amount}

📋 Order Details:
{ProductList}

We'll send you tracking details once your order is shipped.

📞 Need help? Contact us on WhatsApp: +91 9911371218
```

### Invoice Message
```
🧾 Invoice - DataNexStore

Hi {CustomerName},

Your invoice is ready!

📦 Order ID: {OrderId}
💰 Amount: ₹{Amount}

📄 Download Invoice:
{InvoiceURL}

📞 Questions? WhatsApp us: +91 9911371218
```

### Order Booking Notification (To Business)
```
🔔 New Order Booking Request

👤 Customer: {Name}
📱 Phone: {Phone}
🕐 Time: {DateTime}

📦 Products:
1. {ProductName} (SKU: {SKU})
   Qty: {Qty} | ₹{Price}

💰 Estimated Total: ₹{Total}

📍 Delivery Address:
{Address}

📝 Notes: {Notes}

✅ Please confirm and process this order.
```

---

## 🧪 Testing Guide

### Test with Twilio Sandbox
1. Join Twilio WhatsApp Sandbox:
   - Send "join {your-sandbox-keyword}" to +1 415 523 8886
2. Test order booking:
   ```bash
   curl -X POST http://localhost:8080/api/whatsapp/order-booking \
     -H "Content-Type: application/json" \
     -d '{
       "customerName": "Test User",
       "phoneNumber": "919911371218",
       "items": [{
         "productName": "Test Product",
         "quantity": 1,
         "price": 1000
       }]
     }'
   ```

### Frontend Testing
1. Start frontend: `npm run dev`
2. Look for floating WhatsApp button (bottom-right)
3. Click "Order via WhatsApp" on any product
4. Fill form and submit

---

## 🔐 Security Considerations

1. **Rate Limiting**: Implement rate limits on WhatsApp endpoints
2. **Phone Validation**: Always validate phone numbers
3. **Message Sanitization**: Sanitize user input before sending
4. **API Keys**: Never expose Twilio credentials in frontend
5. **CORS**: Configure CORS properly for API access

---

## 💰 Twilio Pricing (Approximate)

- **WhatsApp Messages**: $0.005 - $0.01 per message (varies by country)
- **India Pricing**: ~₹0.40 per message
- **Free Tier**: $15 credit for testing

**Monthly Estimate for 1000 orders:**
- 2 messages per order (confirmation + invoice) = 2000 messages
- Cost: ~₹800/month

---

## 🐛 Troubleshooting

### Issue: Messages not sending
**Solution:**
- Check Twilio credentials
- Verify phone number format (+91xxxxxxxxxx)
- Check Twilio console for errors
- Ensure WhatsApp number is joined to sandbox (testing)

### Issue: "Not authorized" error
**Solution:**
- Verify Twilio Auth Token
- Check Account SID
- Ensure WhatsApp API is enabled in Twilio

### Issue: Customer not receiving messages
**Solution:**
- Verify customer's WhatsApp number is correct
- Check if customer has blocked Twilio number
- Review Twilio message logs

---

## 📞 Support

For WhatsApp integration support:
- **Business WhatsApp**: +91 9911371218
- **Email**: support@datanexstore.in
- **Twilio Docs**: https://www.twilio.com/docs/whatsapp

---

## 🚀 Next Steps

1. ✅ Setup Twilio account
2. ✅ Configure environment variables
3. ✅ Test with sandbox number
4. ⬜ Apply for WhatsApp Business API
5. ⬜ Get business number (+919911371218) verified
6. ⬜ Deploy to production
7. ⬜ Monitor message delivery rates

---

## 📝 Notes

- WhatsApp Business API approval can take 1-2 weeks
- During testing, use Twilio Sandbox
- Always handle WhatsApp failures gracefully (don't block orders)
- Consider implementing message queue for high volume
- Store message delivery status in database for tracking

---

**Last Updated**: 2026-08-18
**Version**: 1.0.0
