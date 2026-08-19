package com.techvault.backend.config;

import com.twilio.Twilio;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class WhatsAppConfig {

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.whatsapp-number}")
    private String whatsappNumber;

    @Value("${app.whatsapp.business-number}")
    private String businessWhatsappNumber;

    @Value("${app.whatsapp.order-booking-enabled:true}")
    private boolean orderBookingEnabled;

    @PostConstruct
    public void initTwilio() {
        try {
            Twilio.init(accountSid, authToken);
        } catch (Exception e) {
            // Log error but don't fail startup
            System.err.println("Failed to initialize Twilio: " + e.getMessage());
        }
    }
}
