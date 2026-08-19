package com.techvault.backend.controller;

import com.techvault.backend.dto.ApiResponse;
import com.techvault.backend.dto.WhatsAppOrderRequest;
import com.techvault.backend.service.WhatsAppService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/whatsapp")
@RequiredArgsConstructor
@Tag(name = "WhatsApp", description = "WhatsApp integration APIs for order booking and notifications")
public class WhatsAppController {

    private final WhatsAppService whatsAppService;

    /**
     * Get WhatsApp business number and configuration
     */
    @GetMapping("/config")
    @Operation(summary = "Get WhatsApp configuration", description = "Returns business WhatsApp number and booking status")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getWhatsAppConfig() {
        Map<String, Object> config = Map.of(
            "businessWhatsAppNumber", whatsAppService.getBusinessWhatsAppNumber(),
            "orderBookingEnabled", whatsAppService.isOrderBookingEnabled(),
            "whatsAppLink", "https://wa.me/" + whatsAppService.getBusinessWhatsAppNumber().replace("+", "")
        );
        
        return ResponseEntity.ok(
            ApiResponse.<Map<String, Object>>builder()
                .success(true)
                .message("WhatsApp configuration retrieved successfully")
                .data(config)
                .build()
        );
    }

    /**
     * Submit order booking request via WhatsApp
     */
    @PostMapping("/order-booking")
    @Operation(summary = "Book order via WhatsApp", description = "Submit order details for WhatsApp booking")
    public ResponseEntity<ApiResponse<String>> bookOrderViaWhatsApp(
            @Valid @RequestBody WhatsAppOrderRequest request) {
        
        if (!whatsAppService.isOrderBookingEnabled()) {
            return ResponseEntity.badRequest().body(
                ApiResponse.<String>builder()
                    .success(false)
                    .message("WhatsApp order booking is currently disabled")
                    .build()
            );
        }

        try {
            whatsAppService.sendOrderBookingRequest(request);
            
            return ResponseEntity.ok(
                ApiResponse.<String>builder()
                    .success(true)
                    .message("Order booking request sent successfully! Our team will contact you shortly on WhatsApp.")
                    .data("Order request submitted for: " + request.getCustomerName())
                    .build()
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                ApiResponse.<String>builder()
                    .success(false)
                    .message("Failed to send order booking request: " + e.getMessage())
                    .build()
            );
        }
    }

    /**
     * Test WhatsApp connectivity
     */
    @PostMapping("/test")
    @Operation(summary = "Test WhatsApp message", description = "Send a test message to verify WhatsApp integration")
    public ResponseEntity<ApiResponse<String>> testWhatsAppMessage(
            @RequestParam String phoneNumber,
            @RequestParam(required = false, defaultValue = "Test message from DataNexStore") String message) {
        
        try {
            whatsAppService.sendOrderConfirmation(
                "TEST-" + System.currentTimeMillis(),
                phoneNumber,
                "Test Customer",
                0.0,
                message
            );
            
            return ResponseEntity.ok(
                ApiResponse.<String>builder()
                    .success(true)
                    .message("Test WhatsApp message sent successfully to " + phoneNumber)
                    .build()
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(
                ApiResponse.<String>builder()
                    .success(false)
                    .message("Failed to send test message: " + e.getMessage())
                    .build()
            );
        }
    }

    /**
     * Get WhatsApp direct link for quick contact
     */
    @GetMapping("/contact-link")
    @Operation(summary = "Get WhatsApp contact link", description = "Returns WhatsApp deep link for direct messaging")
    public ResponseEntity<ApiResponse<Map<String, String>>> getWhatsAppContactLink(
            @RequestParam(required = false) String message) {
        
        String phoneNumber = whatsAppService.getBusinessWhatsappNumber().replace("+", "");
        String link = "https://wa.me/" + phoneNumber;
        
        if (message != null && !message.isEmpty()) {
            link += "?text=" + java.net.URLEncoder.encode(message, java.nio.charset.StandardCharsets.UTF_8);
        }
        
        Map<String, String> response = Map.of(
            "whatsappLink", link,
            "phoneNumber", whatsAppService.getBusinessWhatsappNumber()
        );
        
        return ResponseEntity.ok(
            ApiResponse.<Map<String, String>>builder()
                .success(true)
                .message("WhatsApp contact link generated")
                .data(response)
                .build()
        );
    }
}
