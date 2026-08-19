package com.techvault.backend.service;

import com.techvault.backend.config.WhatsAppConfig;
import com.techvault.backend.dto.WhatsAppOrderRequest;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
@Slf4j
public class WhatsAppService {

    private final WhatsAppConfig whatsAppConfig;

    /**
     * Send order confirmation via WhatsApp
     */
    public void sendOrderConfirmation(String orderId, String customerPhone, String customerName, 
                                      Double totalAmount, String orderDetails) {
        try {
            String messageBody = buildOrderConfirmationMessage(orderId, customerName, totalAmount, orderDetails);
            sendWhatsAppMessage(customerPhone, messageBody);
            log.info("Order confirmation sent to {} for order {}", customerPhone, orderId);
        } catch (Exception e) {
            log.error("Failed to send WhatsApp order confirmation: {}", e.getMessage(), e);
            // Don't throw exception - notification failure shouldn't break order flow
        }
    }

    /**
     * Send invoice via WhatsApp
     */
    public void sendInvoice(String orderId, String customerPhone, String customerName, 
                           String invoiceUrl, Double totalAmount) {
        try {
            String messageBody = buildInvoiceMessage(orderId, customerName, invoiceUrl, totalAmount);
            sendWhatsAppMessage(customerPhone, messageBody);
            log.info("Invoice sent to {} for order {}", customerPhone, orderId);
        } catch (Exception e) {
            log.error("Failed to send WhatsApp invoice: {}", e.getMessage(), e);
        }
    }

    /**
     * Send WhatsApp order booking request to business number
     */
    public void sendOrderBookingRequest(WhatsAppOrderRequest request) {
        try {
            String messageBody = buildOrderBookingMessage(request);
            
            // Send to business WhatsApp number
            sendWhatsAppMessage(whatsAppConfig.getBusinessWhatsappNumber(), messageBody);
            
            // Send confirmation to customer
            String customerConfirmation = buildCustomerConfirmationMessage(request.getCustomerName());
            sendWhatsAppMessage(request.getPhoneNumber(), customerConfirmation);
            
            log.info("Order booking request sent for customer: {}", request.getCustomerName());
        } catch (Exception e) {
            log.error("Failed to send order booking request: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to send WhatsApp order booking request", e);
        }
    }

    /**
     * Send shipment tracking update
     */
    public void sendShipmentUpdate(String customerPhone, String orderId, String trackingNumber, 
                                   String status, String courierName) {
        try {
            String messageBody = buildShipmentUpdateMessage(orderId, trackingNumber, status, courierName);
            sendWhatsAppMessage(customerPhone, messageBody);
            log.info("Shipment update sent to {} for order {}", customerPhone, orderId);
        } catch (Exception e) {
            log.error("Failed to send shipment update: {}", e.getMessage(), e);
        }
    }

    /**
     * Core method to send WhatsApp message via Twilio
     */
    private void sendWhatsAppMessage(String toPhoneNumber, String messageBody) {
        try {
            // Format phone number for WhatsApp
            String formattedTo = formatWhatsAppNumber(toPhoneNumber);
            
            Message message = Message.creator(
                    new PhoneNumber(formattedTo),
                    new PhoneNumber(whatsAppConfig.getWhatsappNumber()),
                    messageBody
            ).create();
            
            log.debug("WhatsApp message sent successfully. SID: {}", message.getSid());
        } catch (Exception e) {
            log.error("Failed to send WhatsApp message to {}: {}", toPhoneNumber, e.getMessage());
            throw e;
        }
    }

    /**
     * Format phone number for WhatsApp (add whatsapp: prefix if needed)
     */
    private String formatWhatsAppNumber(String phoneNumber) {
        String cleaned = phoneNumber.replaceAll("[^0-9+]", "");
        if (!cleaned.startsWith("+")) {
            cleaned = "+91" + cleaned; // Default to India if no country code
        }
        return "whatsapp:" + cleaned;
    }

    /**
     * Build order confirmation message
     */
    private String buildOrderConfirmationMessage(String orderId, String customerName, 
                                                 Double totalAmount, String orderDetails) {
        return String.format(
            "✅ *Order Confirmed - DataNexStore*\n\n" +
            "Hi %s! 🎉\n\n" +
            "Your order has been confirmed!\n\n" +
            "📦 *Order ID:* %s\n" +
            "💰 *Total Amount:* ₹%.2f\n\n" +
            "📋 *Order Details:*\n%s\n\n" +
            "We'll send you tracking details once your order is shipped.\n\n" +
            "📞 Need help? Contact us on WhatsApp: %s\n\n" +
            "Thank you for shopping with DataNexStore! 🛒",
            customerName, orderId, totalAmount, orderDetails, 
            whatsAppConfig.getBusinessWhatsappNumber()
        );
    }

    /**
     * Build invoice message
     */
    private String buildInvoiceMessage(String orderId, String customerName, 
                                      String invoiceUrl, Double totalAmount) {
        return String.format(
            "🧾 *Invoice - DataNexStore*\n\n" +
            "Hi %s,\n\n" +
            "Your invoice is ready!\n\n" +
            "📦 *Order ID:* %s\n" +
            "💰 *Amount:* ₹%.2f\n\n" +
            "📄 *Download Invoice:*\n%s\n\n" +
            "📞 Questions? WhatsApp us: %s\n\n" +
            "Thank you for your business! 🙏",
            customerName, orderId, totalAmount, invoiceUrl,
            whatsAppConfig.getBusinessWhatsappNumber()
        );
    }

    /**
     * Build order booking message for business
     */
    private String buildOrderBookingMessage(WhatsAppOrderRequest request) {
        StringBuilder message = new StringBuilder();
        message.append("🔔 *New Order Booking Request*\n\n");
        message.append(String.format("👤 *Customer:* %s\n", request.getCustomerName()));
        message.append(String.format("📱 *Phone:* %s\n", request.getPhoneNumber()));
        message.append(String.format("🕐 *Time:* %s\n\n", 
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a"))));
        
        message.append("📦 *Products:*\n");
        double total = 0.0;
        for (int i = 0; i < request.getItems().size(); i++) {
            WhatsAppOrderRequest.OrderItem item = request.getItems().get(i);
            message.append(String.format("%d. %s", i + 1, item.getProductName()));
            if (item.getProductSku() != null) {
                message.append(String.format(" (SKU: %s)", item.getProductSku()));
            }
            if (item.getQuantity() != null) {
                message.append(String.format("\n   Qty: %d", item.getQuantity()));
            }
            if (item.getPrice() != null) {
                message.append(String.format(" | ₹%.2f", item.getPrice()));
                total += item.getPrice() * (item.getQuantity() != null ? item.getQuantity() : 1);
            }
            message.append("\n");
        }
        
        if (total > 0) {
            message.append(String.format("\n💰 *Estimated Total:* ₹%.2f\n", total));
        }
        
        if (request.getDeliveryAddress() != null && !request.getDeliveryAddress().isEmpty()) {
            message.append(String.format("\n📍 *Delivery Address:*\n%s\n", request.getDeliveryAddress()));
        }
        
        if (request.getNotes() != null && !request.getNotes().isEmpty()) {
            message.append(String.format("\n📝 *Notes:* %s\n", request.getNotes()));
        }
        
        message.append("\n✅ Please confirm and process this order.");
        
        return message.toString();
    }

    /**
     * Build customer confirmation message
     */
    private String buildCustomerConfirmationMessage(String customerName) {
        return String.format(
            "✅ *Order Request Received - DataNexStore*\n\n" +
            "Hi %s! 👋\n\n" +
            "We've received your order request via WhatsApp.\n\n" +
            "Our team will contact you shortly to confirm your order details and payment.\n\n" +
            "📞 *Business WhatsApp:* %s\n\n" +
            "Thank you for choosing DataNexStore! 🛒",
            customerName,
            whatsAppConfig.getBusinessWhatsappNumber()
        );
    }

    /**
     * Build shipment update message
     */
    private String buildShipmentUpdateMessage(String orderId, String trackingNumber, 
                                             String status, String courierName) {
        String statusEmoji = getStatusEmoji(status);
        return String.format(
            "%s *Shipment Update - DataNexStore*\n\n" +
            "📦 *Order ID:* %s\n" +
            "🚚 *Courier:* %s\n" +
            "🔢 *Tracking:* %s\n" +
            "📍 *Status:* %s\n\n" +
            "Track your shipment for real-time updates.\n\n" +
            "📞 Need help? WhatsApp: %s",
            statusEmoji, orderId, courierName, trackingNumber, status,
            whatsAppConfig.getBusinessWhatsappNumber()
        );
    }

    /**
     * Get emoji based on order status
     */
    private String getStatusEmoji(String status) {
        return switch (status.toUpperCase()) {
            case "SHIPPED", "IN_TRANSIT" -> "📦";
            case "OUT_FOR_DELIVERY" -> "🚚";
            case "DELIVERED" -> "✅";
            case "PENDING", "PROCESSING" -> "⏳";
            default -> "📋";
        };
    }

    /**
     * Get business WhatsApp number for frontend
     */
    public String getBusinessWhatsAppNumber() {
        return whatsAppConfig.getBusinessWhatsappNumber();
    }

    /**
     * Check if order booking is enabled
     */
    public boolean isOrderBookingEnabled() {
        return whatsAppConfig.isOrderBookingEnabled();
    }
}
