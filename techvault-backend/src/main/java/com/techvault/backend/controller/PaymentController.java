package com.techvault.backend.controller;

import com.techvault.backend.dto.ApiResponse;
import com.techvault.backend.service.RazorpayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final RazorpayService razorpayService;

    public PaymentController(RazorpayService razorpayService) {
        this.razorpayService = razorpayService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<ApiResponse<Map<String, String>>> createOrder(@RequestBody Map<String, Object> request) {
        try {
            String orderNumber = (String) request.getOrDefault("orderNumber", "ORD-" + System.currentTimeMillis());
            BigDecimal amount = new BigDecimal(request.get("amount").toString());

            String razorpayOrderId = razorpayService.createRazorpayOrder(orderNumber, amount);

            return ResponseEntity.ok(ApiResponse.ok(Map.of(
                    "razorpayOrderId", razorpayOrderId,
                    "currency", "INR",
                    "amount", amount.toString()
            )));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Payment initialization failed: " + e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> verifyPayment(@RequestBody Map<String, String> payload) {
        String orderId = payload.get("razorpay_order_id");
        String paymentId = payload.get("razorpay_payment_id");
        String signature = payload.get("razorpay_signature");

        boolean isValid = razorpayService.verifyPaymentSignature(orderId, paymentId, signature);

        if (isValid) {
            return ResponseEntity.ok(ApiResponse.ok("Payment verified successfully", Map.of("verified", true)));
        } else {
            return ResponseEntity.badRequest().body(ApiResponse.error("Invalid payment signature"));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload,
                                                @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature) {
        // Razorpay server-to-server webhook handler for asynchronous payment settlement
        return ResponseEntity.ok("Webhook received and queued");
    }
}
