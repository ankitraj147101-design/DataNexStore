package com.techvault.backend.controller;

import com.techvault.backend.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/dashboard")
@PreAuthorize("hasAnyRole('ADMIN', 'SUPER_ADMIN')")
public class AdminDashboardController {

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getDashboardStats() {
        Map<String, Object> stats = Map.of(
                "totalRevenue", 2845900,
                "todayRevenue", 148500,
                "totalOrders", 184,
                "pendingOrders", 12,
                "totalCustomers", 1240,
                "totalProducts", 26,
                "lowStockCount", 3,
                "outOfStockCount", 0,
                "revenueHistory", List.of(
                        Map.of("date", "11 Aug", "revenue", 210000, "orders", 14),
                        Map.of("date", "12 Aug", "revenue", 340000, "orders", 22),
                        Map.of("date", "13 Aug", "revenue", 290000, "orders", 19),
                        Map.of("date", "14 Aug", "revenue", 410000, "orders", 28),
                        Map.of("date", "15 Aug", "revenue", 580000, "orders", 36),
                        Map.of("date", "16 Aug", "revenue", 480000, "orders", 31),
                        Map.of("date", "17 Aug", "revenue", 535900, "orders", 34)
                )
        );

        return ResponseEntity.ok(ApiResponse.ok(stats));
    }
}
