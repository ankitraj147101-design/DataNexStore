# WhatsApp API Examples - DataNexStore

Complete examples for testing WhatsApp integration endpoints.

## Base URL
```
http://localhost:8080/api
```

---

## 1. Get WhatsApp Configuration

### Request
```bash
curl -X GET http://localhost:8080/api/whatsapp/config
```

### Response
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

---

## 2. Book Order via WhatsApp

### Simple Order (Single Product)
```bash
curl -X POST http://localhost:8080/api/whatsapp/order-booking \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Abhishek Kumar",
    "phoneNumber": "9911371218",
    "items": [
      {
        "productName": "ASUS ROG Strix GeForce RTX 4090",
        "productSku": "GPU-RTX4090-STRIX",
        "quantity": 1,
        "price": 189999.00
      }
    ]
  }'
```

### Complete Order (Multiple Products with Address)
```bash
curl -X POST http://localhost:8080/api/whatsapp/order-booking \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Abhishek Kumar",
    "phoneNumber": "9911371218",
    "items": [
      {
        "productName": "ASUS ROG Strix GeForce RTX 4090",
        "productSku": "GPU-RTX4090-STRIX",
        "quantity": 1,
        "price": 189999.00
      },
      {
        "productName": "Corsair Vengeance RGB 32GB DDR5",
        "productSku": "RAM-CORSAIR-32GB",
        "quantity": 2,
        "price": 18999.00
      },
      {
        "productName": "Samsung 990 PRO 2TB NVMe SSD",
        "productSku": "SSD-990PRO-2TB",
        "quantity": 1,
        "price": 24999.00
      }
    ],
    "deliveryAddress": "Flat 302, Tower B, Green Valley Apartments, Sector 18, Noida, Uttar Pradesh - 201301",
    "notes": "Please call 30 minutes before delivery. Available after 6 PM on weekdays."
  }'
```

### Response
```json
{
  "success": true,
  "message": "Order booking request sent successfully! Our team will contact you shortly on WhatsApp.",
  "data": "Order request submitted for: Abhishek Kumar"
}
```

### WhatsApp Messages Sent:

**To Business (+919911371218):**
```
🔔 New Order Booking Request

👤 Customer: Abhishek Kumar
📱 Phone: 9911371218
🕐 Time: 18 Aug 2026, 02:30 PM

📦 Products:
1. ASUS ROG Strix GeForce RTX 4090 (SKU: GPU-RTX4090-STRIX)
   Qty: 1 | ₹189999.00
2. Corsair Vengeance RGB 32GB DDR5 (SKU: RAM-CORSAIR-32GB)
   Qty: 2 | ₹18999.00
3. Samsung 990 PRO 2TB NVMe SSD (SKU: SSD-990PRO-2TB)
   Qty: 1 | ₹24999.00

💰 Estimated Total: ₹252996.00

📍 Delivery Address:
Flat 302, Tower B, Green Valley Apartments, Sector 18, Noida, Uttar Pradesh - 201301

📝 Notes: Please call 30 minutes before delivery. Available after 6 PM on weekdays.

✅ Please confirm and process this order.
```

**To Customer (9911371218):**
```
✅ Order Request Received - DataNexStore

Hi Abhishek Kumar! 👋

We've received your order request via WhatsApp.

Our team will contact you shortly to confirm your order details and payment.

📞 Business WhatsApp: +919911371218

Thank you for choosing DataNexStore! 🛒
```

---

## 3. Get WhatsApp Contact Link

### Basic Link
```bash
curl -X GET http://localhost:8080/api/whatsapp/contact-link
```

**Response:**
```json
{
  "success": true,
  "message": "WhatsApp contact link generated",
  "data": {
    "whatsappLink": "https://wa.me/919911371218",
    "phoneNumber": "+919911371218"
  }
}
```

### Link with Pre-filled Message
```bash
curl -X GET "http://localhost:8080/api/whatsapp/contact-link?message=Hi,%20I%20need%20help%20with%20my%20order"
```

**Response:**
```json
{
  "success": true,
  "message": "WhatsApp contact link generated",
  "data": {
    "whatsappLink": "https://wa.me/919911371218?text=Hi%2C%20I%20need%20help%20with%20my%20order",
    "phoneNumber": "+919911371218"
  }
}
```

---

## 4. Test WhatsApp Message

### Send Test Message
```bash
curl -X POST "http://localhost:8080/api/whatsapp/test?phoneNumber=9911371218&message=Testing%20WhatsApp%20integration"
```

### Response
```json
{
  "success": true,
  "message": "Test WhatsApp message sent successfully to 9911371218"
}
```

---

## 5. Integration with Order Flow

### Typical Order Journey:

#### Step 1: Customer Places Order
```bash
# Customer submits checkout
POST /api/orders/checkout
```

#### Step 2: Send Order Confirmation (Backend automatically calls)
```java
// In OrderService.java
whatsAppService.sendOrderConfirmation(
    order.getId(),
    customer.getPhoneNumber(),
    customer.getName(),
    order.getTotalAmount(),
    orderDetails
);
```

**WhatsApp Message:**
```
✅ Order Confirmed - DataNexStore

Hi Abhishek Kumar! 🎉

Your order has been confirmed!

📦 Order ID: ORD-20260818-001
💰 Total Amount: ₹189999.00

📋 Order Details:
- ASUS ROG Strix GeForce RTX 4090 x1

We'll send you tracking details once your order is shipped.

📞 Need help? Contact us on WhatsApp: +919911371218

Thank you for shopping with DataNexStore! 🛒
```

#### Step 3: Generate and Send Invoice
```java
// After payment confirmation
whatsAppService.sendInvoice(
    order.getId(),
    customer.getPhoneNumber(),
    customer.getName(),
    invoiceUrl,
    order.getTotalAmount()
);
```

**WhatsApp Message:**
```
🧾 Invoice - DataNexStore

Hi Abhishek Kumar,

Your invoice is ready!

📦 Order ID: ORD-20260818-001
💰 Amount: ₹189999.00

📄 Download Invoice:
https://datanexstore.in/invoices/ORD-20260818-001.pdf

📞 Questions? WhatsApp us: +919911371218

Thank you for your business! 🙏
```

#### Step 4: Shipment Update
```java
// When order is shipped
whatsAppService.sendShipmentUpdate(
    customer.getPhoneNumber(),
    order.getId(),
    "1234567890",
    "SHIPPED",
    "Blue Dart"
);
```

**WhatsApp Message:**
```
📦 Shipment Update - DataNexStore

📦 Order ID: ORD-20260818-001
🚚 Courier: Blue Dart
🔢 Tracking: 1234567890
📍 Status: SHIPPED

Track your shipment for real-time updates.

📞 Need help? WhatsApp: +919911371218
```

---

## Frontend Integration Examples

### 1. React/Next.js Component

```typescript
import { useState } from 'react';
import { submitWhatsAppOrder } from '@/lib/whatsapp';

function ProductPage({ product }) {
  const [loading, setLoading] = useState(false);

  const handleWhatsAppOrder = async () => {
    setLoading(true);
    
    const orderRequest = {
      customerName: "Abhishek Kumar",
      phoneNumber: "9911371218",
      items: [
        {
          productName: product.name,
          productSku: product.sku,
          quantity: 1,
          price: product.price
        }
      ]
    };

    const result = await submitWhatsAppOrder(orderRequest);
    
    if (result.success) {
      alert("Order request sent! Check your WhatsApp.");
    } else {
      alert(result.message);
    }
    
    setLoading(false);
  };

  return (
    <button 
      onClick={handleWhatsAppOrder}
      disabled={loading}
      className="bg-green-500 text-white px-6 py-3 rounded-lg"
    >
      {loading ? "Sending..." : "Order via WhatsApp"}
    </button>
  );
}
```

### 2. Direct WhatsApp Link (HTML)

```html
<!-- Simple contact link -->
<a href="https://wa.me/919911371218" target="_blank">
  Chat on WhatsApp
</a>

<!-- With pre-filled message -->
<a href="https://wa.me/919911371218?text=Hi,%20I%20want%20to%20order%20RTX%204090" 
   target="_blank">
  Order RTX 4090 via WhatsApp
</a>

<!-- Product-specific inquiry -->
<a href="https://wa.me/919911371218?text=Hi,%20I'm%20interested%20in%20${productName}%20(${productSku}).%20Is%20it%20in%20stock?" 
   target="_blank">
  Check Stock on WhatsApp
</a>
```

### 3. Floating WhatsApp Button

```html
<!-- Add to your layout -->
<div id="whatsapp-float" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
  <a href="https://wa.me/919911371218?text=Hi,%20I%20need%20help!" 
     target="_blank"
     style="display: flex; align-items: center; justify-content: center; 
            width: 60px; height: 60px; border-radius: 50%; 
            background: #25D366; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
      <!-- WhatsApp Icon SVG Path -->
      <path d="M16 0C7.164 0 0 7.164 0 16c0 2.838.745 5.508 2.048 7.82L.705 31.29l7.74-2.292C10.716 30.32 13.276 31 16 31c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.2c-2.542 0-4.95-.72-6.984-1.968l-.5-.296-5.18 1.532 1.552-5.028-.324-.52A13.15 13.15 0 012.8 16c0-7.28 5.92-13.2 13.2-13.2S29.2 8.72 29.2 16 23.28 29.2 16 29.2z"/>
    </svg>
  </a>
</div>
```

---

## Error Handling

### Invalid Phone Number
```json
{
  "success": false,
  "message": "Invalid phone number format"
}
```

### WhatsApp Disabled
```json
{
  "success": false,
  "message": "WhatsApp order booking is currently disabled"
}
```

### Twilio Error
```json
{
  "success": false,
  "message": "Failed to send WhatsApp order booking request: Authentication failed"
}
```

---

## Testing Checklist

- [ ] Get configuration endpoint working
- [ ] Test simple order booking (1 product)
- [ ] Test multiple products order
- [ ] Test with delivery address and notes
- [ ] Verify business receives message
- [ ] Verify customer receives confirmation
- [ ] Test contact link generation
- [ ] Test direct WhatsApp link opening
- [ ] Test floating button on website
- [ ] Verify invoice sending (after order)
- [ ] Test shipment tracking message

---

## Production Deployment

### Environment Variables (.env)
```env
# Production Twilio
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_production_auth_token
TWILIO_WHATSAPP_NUMBER=whatsapp:+919911371218

# Or keep sandbox for testing
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886
```

### Health Check
```bash
# Check if WhatsApp is configured
curl https://api.datanexstore.in/whatsapp/config

# Test message delivery
curl -X POST "https://api.datanexstore.in/whatsapp/test?phoneNumber=9911371218"
```

---

**Business WhatsApp**: +91 9911371218  
**API Documentation**: http://localhost:8080/api/swagger-ui.html  
**Support**: Open an issue on GitHub or contact via WhatsApp
