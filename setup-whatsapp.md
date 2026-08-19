# 🚀 Quick WhatsApp Setup Guide

## Step-by-Step Setup for +91 9911371218

### 1️⃣ Create Twilio Account (5 minutes)

1. Go to [https://www.twilio.com/try-twilio](https://www.twilio.com/try-twilio)
2. Sign up with your email
3. Verify your phone number
4. You'll get **$15 free credit** for testing

### 2️⃣ Get Your Credentials (2 minutes)

1. After login, go to Twilio Console Dashboard
2. Find these values:
   ```
   Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   Auth Token: [Click "Show" to reveal]
   ```
3. Copy both values

### 3️⃣ Setup WhatsApp Sandbox for Testing (3 minutes)

1. In Twilio Console, go to **Messaging → Try it out → Send a WhatsApp message**
2. You'll see a WhatsApp Sandbox number like: `+1 415 523 8886`
3. **Join the sandbox**:
   - Open WhatsApp on your phone
   - Send "join [your-sandbox-code]" to +1 415 523 8886
   - Example: `join happy-mountain`
4. You'll receive a confirmation message

### 4️⃣ Configure Backend (2 minutes)

1. Create `.env` file in `techvault-backend/` folder:

```env
# Database (use your existing settings)
DB_URL=jdbc:postgresql://localhost:5432/datanexstore
DB_USERNAME=postgres
DB_PASSWORD=postgres

# JWT (use existing or generate new)
JWT_SECRET=your-existing-jwt-secret

# Razorpay (use your existing credentials)
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret

# Twilio WhatsApp (ADD THESE NEW LINES)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

2. **Replace** with your actual Twilio credentials from Step 2

### 5️⃣ Configure Frontend (1 minute)

1. Create or update `.env.local` in `techvault-frontend/` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 6️⃣ Install Backend Dependency (2 minutes)

The Maven dependency is already added in `pom.xml`. Just rebuild:

```bash
cd techvault-backend
mvn clean install
```

### 7️⃣ Test the Integration (3 minutes)

#### Start Backend:
```bash
cd techvault-backend
mvn spring-boot:run
```

#### Test WhatsApp Message:
```bash
# Replace with your WhatsApp number (must be joined to sandbox)
curl -X POST "http://localhost:8080/api/whatsapp/test?phoneNumber=919911371218&message=Hello%20from%20DataNexStore"
```

✅ **You should receive a WhatsApp message!**

#### Start Frontend:
```bash
cd techvault-frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and look for:
- 💬 **Floating WhatsApp button** (bottom-right corner)
- 📱 **"Order via WhatsApp"** button on product pages

---

## 🧪 Test Order Booking

### Using the Frontend:
1. Go to any product page
2. Click **"Order via WhatsApp"** button
3. Fill in the form:
   - Name: Your name
   - Phone: 9911371218 (your number joined to sandbox)
   - Product: Test Product
4. Submit

### What Happens:
1. 📲 Business number (+91 9911371218) receives order details
2. 💬 Customer receives confirmation message
3. Both messages arrive on WhatsApp!

### Using API (Alternative):
```bash
curl -X POST http://localhost:8080/api/whatsapp/order-booking \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Abhishek",
    "phoneNumber": "9911371218",
    "items": [
      {
        "productName": "ROG Strix RTX 4090",
        "productSku": "GPU-001",
        "quantity": 1,
        "price": 149999
      }
    ],
    "deliveryAddress": "123 MG Road, Bangalore",
    "notes": "Urgent delivery needed"
  }'
```

---

## 📱 For Production (Your Own Number)

### Current Setup (Sandbox):
- ✅ Works for testing
- ❌ Only works for numbers that joined sandbox
- ❌ Uses Twilio's number (+1 415 523 8886)

### Production Setup (+91 9911371218):
To use **your own number** (+91 9911371218):

1. **Apply for WhatsApp Business API**:
   - Go to [Twilio WhatsApp Request](https://www.twilio.com/whatsapp/request-access)
   - Fill business details
   - Submit Facebook Business verification

2. **Verification** (1-2 weeks):
   - Meta reviews your business
   - Phone number verification
   - Business profile setup

3. **Once Approved**:
   - Update `.env`:
     ```env
     TWILIO_WHATSAPP_NUMBER=whatsapp:+919911371218
     ```
   - No need for sandbox joining
   - Works with any customer WhatsApp number

---

## 💰 Pricing

### Testing (Current):
- **Free** $15 credit from Twilio
- Enough for ~1500 messages

### Production:
- ~₹0.40 per WhatsApp message
- 1000 orders/month = ~₹800/month
- Much cheaper than SMS!

---

## 🐛 Troubleshooting

### ❌ "Unable to create record: The From phone number is not a valid"
**Solution**: Make sure `TWILIO_WHATSAPP_NUMBER` includes `whatsapp:` prefix
```env
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886  ✅
TWILIO_WHATSAPP_NUMBER=+14155238886           ❌
```

### ❌ "Message not received"
**Solution**: 
1. Check if phone number joined Twilio sandbox (send "join [code]" to sandbox number)
2. Verify phone number format: `919911371218` (no + or spaces in API calls)
3. Check Twilio console logs for delivery status

### ❌ "Authentication failed"
**Solution**: 
1. Verify `TWILIO_ACCOUNT_SID` and `TWILIO_AUTH_TOKEN` are correct
2. No extra spaces in `.env` file
3. Restart backend after changing `.env`

### ❌ WhatsApp button not showing
**Solution**:
1. Check frontend `.env.local` has correct API URL
2. Clear browser cache
3. Check browser console for errors
4. Verify backend is running on port 8080

---

## 📞 Need Help?

### Twilio Support:
- Documentation: https://www.twilio.com/docs/whatsapp
- Support: https://support.twilio.com
- Status: https://status.twilio.com

### Check Configuration:
```bash
# Verify API is working
curl http://localhost:8080/api/whatsapp/config

# Expected response:
{
  "success": true,
  "data": {
    "businessWhatsAppNumber": "+919911371218",
    "orderBookingEnabled": true,
    "whatsAppLink": "https://wa.me/919911371218"
  }
}
```

---

## ✅ Checklist

- [ ] Twilio account created
- [ ] Account SID and Auth Token copied
- [ ] Joined WhatsApp sandbox on phone
- [ ] `.env` file created in backend
- [ ] `.env.local` created in frontend
- [ ] Backend dependency installed (`mvn clean install`)
- [ ] Backend started successfully
- [ ] Frontend started successfully
- [ ] Test message sent and received
- [ ] WhatsApp button visible on website
- [ ] Order booking tested

---

## 🎉 You're All Set!

Your DataNexStore now has full WhatsApp integration:
- ✅ Order booking via WhatsApp
- ✅ Automated invoice delivery
- ✅ Shipment tracking notifications
- ✅ Direct customer chat

**Next**: Apply for WhatsApp Business API to use your own number in production!

---

**Business WhatsApp**: +91 9911371218  
**Setup Time**: ~20 minutes total  
**Cost**: Free for testing, ~₹800/month for 1000 orders in production
