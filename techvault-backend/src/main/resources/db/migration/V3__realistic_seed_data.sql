-- TechVault Database Seed Data - V3
-- Migration: V3__realistic_seed_data.sql

-- 1. Insert Initial Admin and Demo Customer Accounts (Password: Password@123)
-- BCrypt hash for 'Password@123' is $2a$12$N30iJm0s.c1y6yH.3D8Ld.0O3V6J7S.yK7N6a7X7W8U7z6T5S4R32 (or standard Spring BCrypt)
-- Hash below is standard BCrypt for 'Password@123'
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, is_active, is_email_verified)
VALUES 
    (1, 'admin@techvault.in', '$2a$10$w8.gV4z4hYcE8V64kMeq3eE0Q9U0H0lPfxhXJk/w3g1J7gNfK.Wv2', 'Admin', 'User', '+91 9876543210', true, true),
    (2, 'customer@techvault.in', '$2a$10$w8.gV4z4hYcE8V64kMeq3eE0Q9U0H0lPfxhXJk/w3g1J7gNfK.Wv2', 'Abhishek', 'Kumar', '+91 9123456789', true, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role_id)
VALUES 
    (1, 2), -- ROLE_ADMIN
    (1, 3), -- ROLE_SUPER_ADMIN
    (2, 1)  -- ROLE_CUSTOMER
ON CONFLICT DO NOTHING;

-- 2. Insert Products
-- Product 1: Keychron Q1 Pro Wireless Custom Mechanical Keyboard
INSERT INTO products (id, name, slug, sku, brand_id, category_id, short_description, description, base_price, mrp_price, discount_percentage, is_featured, is_trending, is_best_seller, is_deal_of_the_day, is_new_arrival, warranty_info, rating_average, rating_count, sold_count)
VALUES (
    1,
    'Keychron Q1 Pro QMK/VIA Wireless Custom Mechanical Keyboard',
    'keychron-q1-pro-wireless-custom-mechanical-keyboard',
    'KB-KEY-Q1PRO-001',
    (SELECT id FROM brands WHERE slug='keychron'),
    (SELECT id FROM categories WHERE slug='keyboards'),
    '75% layout full-metal wireless custom mechanical keyboard with CNC aluminum body, double-gasket design, and hot-swappable switches.',
    'The Keychron Q1 Pro is a groundbreaking full metal QMK/VIA wireless custom mechanical keyboard. Engineered with an ultra-premium CNC machined 6063 aluminum body, double-gasket mount structure for an unparalleled acoustic experience, and south-facing RGB backlight. Connect up to 3 devices seamlessly with Broadcom Bluetooth 5.1 or plug in via Type-C with 1000Hz polling rate in wired mode.',
    17999.00,
    21999.00,
    18,
    true, true, true, false, false,
    '1 Year Brand Replacement Warranty',
    4.9, 148, 520
);

-- Images for Product 1
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(1, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80', 'Keychron Q1 Pro Angle View', 1, true),
(1, 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80', 'Keychron Q1 Pro Top Down', 2, false),
(1, 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=80', 'Keychron Q1 Pro Switch Detail', 3, false);

-- Variants for Product 1
INSERT INTO product_variants (id, product_id, variant_name, sku, price, mrp_price, attributes, is_default) VALUES
(1, 1, 'Carbon Black / Red Switch', 'KB-Q1PRO-BLK-RED', 17999.00, 21999.00, '{"color": "Carbon Black", "switch": "Keychron K Pro Red"}', true),
(2, 1, 'Carbon Black / Brown Switch', 'KB-Q1PRO-BLK-BRN', 17999.00, 21999.00, '{"color": "Carbon Black", "switch": "Keychron K Pro Brown"}', false),
(3, 1, 'Silver Grey / Banana Switch', 'KB-Q1PRO-SLV-BAN', 18499.00, 22499.00, '{"color": "Silver Grey", "switch": "Keychron K Pro Banana"}', false);

-- Specs for Product 1
INSERT INTO product_specifications (product_id, field_key, field_name, field_value, group_name, sort_order) VALUES
(1, 'switch_type', 'Switch Type', 'Hot-Swappable Keychron K Pro Mechanical Switches', 'Hardware', 1),
(1, 'layout', 'Layout', '75% Compact (81 Keys)', 'Design', 2),
(1, 'connection', 'Connection', 'Bluetooth 5.1 & Type-C Wired', 'Connectivity', 3),
(1, 'rgb', 'RGB Backlight', 'South-Facing 22 RGB Backlight Modes', 'Lighting', 4),
(1, 'polling_rate', 'Polling Rate', '1000 Hz (Wired) / 90 Hz (Wireless)', 'Performance', 5),
(1, 'key_count', 'Key Count', '81 Keys with Programmable Aluminum Knob', 'Design', 6),
(1, 'hot_swappable', 'Hot Swappable', 'Yes (3-pin & 5-pin MX support)', 'Hardware', 7);

-- Inventory for Product 1
INSERT INTO inventory (product_id, variant_id, sku, current_stock, reserved_stock, sold_quantity, low_stock_threshold) VALUES
(1, 1, 'KB-Q1PRO-BLK-RED', 24, 2, 310, 5),
(1, 2, 'KB-Q1PRO-BLK-BRN', 18, 0, 150, 5),
(1, 3, 'KB-Q1PRO-SLV-BAN', 9, 1, 60, 4);

-- Product 2: Logitech G Pro X Superlight 2 Wireless Gaming Mouse
INSERT INTO products (id, name, slug, sku, brand_id, category_id, short_description, description, base_price, mrp_price, discount_percentage, is_featured, is_trending, is_best_seller, is_deal_of_the_day, is_new_arrival, warranty_info, rating_average, rating_count, sold_count)
VALUES (
    2,
    'Logitech G PRO X SUPERLIGHT 2 Wireless Gaming Mouse',
    'logitech-g-pro-x-superlight-2-wireless-gaming-mouse',
    'MS-LOG-GPX2-002',
    (SELECT id FROM brands WHERE slug='logitech-g'),
    (SELECT id FROM categories WHERE slug='mouse'),
    '60g ultralight wireless championship mouse with LIGHTFORCE hybrid optical switches and HERO 2 32K sensor.',
    'Engineered with the world’s top esports pros, the PRO X SUPERLIGHT 2 represents the next evolution of our championship-winning 60g mouse. Features LIGHTFORCE hybrid optical-mechanical switches for crisp speed and reliability, the revolutionary HERO 2 sensor with sub-micron precision tracking up to 32,000 DPI, and lightning-fast 2000Hz polling rate via LIGHTSPEED wireless.',
    14495.00,
    16995.00,
    15,
    true, true, true, true, false,
    '2 Years Limited Hardware Warranty',
    4.8, 312, 1420
);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(2, 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80', 'Logitech G Pro X Superlight 2 Top', 1, true),
(2, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80', 'Logitech Mouse Desk Setup', 2, false);

INSERT INTO product_variants (id, product_id, variant_name, sku, price, mrp_price, attributes, is_default) VALUES
(4, 2, 'Matte Black', 'MS-GPX2-BLK', 14495.00, 16995.00, '{"color": "Matte Black"}', true),
(5, 2, 'White', 'MS-GPX2-WHT', 14495.00, 16995.00, '{"color": "White"}', false),
(6, 2, 'Magenta', 'MS-GPX2-MGN', 14995.00, 17495.00, '{"color": "Magenta"}', false);

INSERT INTO product_specifications (product_id, field_key, field_name, field_value, group_name, sort_order) VALUES
(2, 'max_dpi', 'Max DPI', '32000 DPI', 'Sensor', 1),
(2, 'sensor', 'Sensor', 'HERO 2 Next-Gen Optical Sensor', 'Sensor', 2),
(2, 'connection', 'Connection', 'LIGHTSPEED Wireless / USB-C', 'Connectivity', 3),
(2, 'polling_rate', 'Polling Rate', '2000 Hz / 0.5 ms', 'Performance', 4),
(2, 'weight', 'Weight', '60 grams ultra-lightweight', 'Physical', 5),
(2, 'buttons', 'Number of Buttons', '5 Programmable Buttons', 'Hardware', 6),
(2, 'ergonomics', 'Ergonomics', 'Ambidextrous Shape', 'Design', 7),
(2, 'rgb', 'RGB', 'No (Optimized for weight & battery life)', 'Lighting', 8);

INSERT INTO inventory (product_id, variant_id, sku, current_stock, reserved_stock, sold_quantity, low_stock_threshold) VALUES
(2, 4, 'MS-GPX2-BLK', 45, 3, 900, 10),
(2, 5, 'MS-GPX2-WHT', 22, 1, 420, 8),
(2, 6, 'MS-GPX2-MGN', 8, 0, 100, 4);

-- Product 3: Samsung 990 PRO NVMe M.2 SSD 2TB with Heatsink
INSERT INTO products (id, name, slug, sku, brand_id, category_id, short_description, description, base_price, mrp_price, discount_percentage, is_featured, is_trending, is_best_seller, is_deal_of_the_day, is_new_arrival, warranty_info, rating_average, rating_count, sold_count)
VALUES (
    3,
    'Samsung 990 PRO PCIe 4.0 NVMe M.2 Internal SSD with Heatsink 2TB',
    'samsung-990-pro-nvme-m2-ssd-2tb-heatsink',
    'SSD-SAM-990P-2TB',
    (SELECT id FROM brands WHERE slug='samsung'),
    (SELECT id FROM categories WHERE slug='ssd'),
    'Blazing fast PCIe 4.0 NVMe SSD with up to 7,450 MB/s sequential read, smart thermal control and PS5 compatibility.',
    'Reach near max performance of PCIe 4.0. The in-house controller’s smart heat control delivers supreme power efficiency while maintaining ferocious speed and performance. Sequential read/write speeds up to 7,450/6,900 MB/s. Comes with a slim futuristic heatsink compatible with PlayStation 5 and high-end desktop gaming motherboards.',
    16999.00,
    23999.00,
    29,
    true, true, true, false, false,
    '5 Years Brand Limited Warranty or 1200 TBW',
    4.9, 520, 2100
);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(3, 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=80', 'Samsung 990 Pro Heatsink SSD', 1, true);

INSERT INTO product_variants (id, product_id, variant_name, sku, price, mrp_price, attributes, is_default) VALUES
(7, 3, '1TB with Heatsink', 'SSD-990P-1TB-HS', 10499.00, 14999.00, '{"capacity": "1TB", "heatsink": "Yes"}', false),
(8, 3, '2TB with Heatsink', 'SSD-990P-2TB-HS', 16999.00, 23999.00, '{"capacity": "2TB", "heatsink": "Yes"}', true),
(9, 3, '4TB with Heatsink', 'SSD-990P-4TB-HS', 32999.00, 44999.00, '{"capacity": "4TB", "heatsink": "Yes"}', false);

INSERT INTO product_specifications (product_id, field_key, field_name, field_value, group_name, sort_order) VALUES
(3, 'capacity', 'Capacity', '2TB (2000 GB)', 'General', 1),
(3, 'interface', 'Interface', 'PCIe Gen 4.0 x4, NVMe 2.0', 'Performance', 2),
(3, 'form_factor', 'Form Factor', 'M.2 (2280) with Integrated Heatsink', 'Physical', 3),
(3, 'read_speed', 'Sequential Read', 'Up to 7,450 MB/s', 'Performance', 4),
(3, 'write_speed', 'Sequential Write', 'Up to 6,900 MB/s', 'Performance', 5),
(3, 'nand_type', 'NAND Type', 'Samsung V-NAND TLC', 'Architecture', 6),
(3, 'dram_cache', 'DRAM Cache', '2GB LPDDR4', 'Architecture', 7),
(3, 'tbw', 'Endurance (TBW)', '1200 TBW', 'Reliability', 8);

INSERT INTO inventory (product_id, variant_id, sku, current_stock, reserved_stock, sold_quantity, low_stock_threshold) VALUES
(3, 7, 'SSD-990P-1TB-HS', 30, 2, 700, 5),
(3, 8, 'SSD-990P-2TB-HS', 50, 5, 1150, 10),
(3, 9, 'SSD-990P-4TB-HS', 12, 1, 250, 3);

-- Product 4: Corsair Vengeance RGB DDR5 32GB (2x16GB) 6000MHz CL30
INSERT INTO products (id, name, slug, sku, brand_id, category_id, short_description, description, base_price, mrp_price, discount_percentage, is_featured, is_trending, is_best_seller, is_deal_of_the_day, is_new_arrival, warranty_info, rating_average, rating_count, sold_count)
VALUES (
    4,
    'Corsair Vengeance RGB DDR5 32GB (2x16GB) 6000MHz CL30 AMD EXPO & Intel XMP RAM Kit',
    'corsair-vengeance-rgb-ddr5-32gb-6000mhz-cl30',
    'RAM-COR-DDR5-32G',
    (SELECT id FROM brands WHERE slug='corsair'),
    (SELECT id FROM categories WHERE slug='ram'),
    'High-performance DDR5 memory with panoramic ten-zone dynamic RGB lighting and AMD EXPO / Intel XMP 3.0 support.',
    'Push the limits of your desktop system with CORSAIR VENGEANCE RGB DDR5 memory, delivering higher frequencies and greater capacities optimized for Intel & AMD motherboards while illuminating your PC with dynamic, individually addressable ten-zone RGB lighting.',
    10999.00,
    14500.00,
    24,
    true, false, true, false, false,
    'Limited Lifetime Warranty',
    4.8, 230, 890
);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(4, 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=1200&q=80', 'Corsair DDR5 Memory Module', 1, true);

INSERT INTO product_variants (id, product_id, variant_name, sku, price, mrp_price, attributes, is_default) VALUES
(10, 4, '32GB (2x16GB) 6000MHz Black', 'RAM-VEN-RGB-32-BLK', 10999.00, 14500.00, '{"capacity": "32GB (2x16GB)", "speed": "6000MHz", "color": "Black"}', true),
(11, 4, '32GB (2x16GB) 6000MHz White', 'RAM-VEN-RGB-32-WHT', 11499.00, 14999.00, '{"capacity": "32GB (2x16GB)", "speed": "6000MHz", "color": "White"}', false),
(12, 4, '64GB (2x32GB) 6000MHz Black', 'RAM-VEN-RGB-64-BLK', 20999.00, 26999.00, '{"capacity": "64GB (2x32GB)", "speed": "6000MHz", "color": "Black"}', false);

INSERT INTO product_specifications (product_id, field_key, field_name, field_value, group_name, sort_order) VALUES
(4, 'capacity', 'Capacity', '32GB (2 x 16GB)', 'General', 1),
(4, 'speed', 'Speed Rating', 'DDR5-6000 (PC5-48000)', 'Performance', 2),
(4, 'type', 'Memory Type', 'DDR5 SDRAM', 'General', 3),
(4, 'cas_latency', 'Tested Latency', 'CL30-36-36-76', 'Timing', 4),
(4, 'rgb', 'RGB Lighting', 'Dynamic 10-Zone Addressable RGB', 'Lighting', 5);

INSERT INTO inventory (product_id, variant_id, sku, current_stock, reserved_stock, sold_quantity, low_stock_threshold) VALUES
(4, 10, 'RAM-VEN-RGB-32-BLK', 38, 2, 600, 8),
(4, 11, 'RAM-VEN-RGB-32-WHT', 15, 1, 200, 4),
(4, 12, 'RAM-VEN-RGB-64-BLK', 9, 0, 90, 3);

-- Product 5: ASUS ROG Swift OLED PG27AQDM 27-inch 240Hz 1440p Gaming Monitor
INSERT INTO products (id, name, slug, sku, brand_id, category_id, short_description, description, base_price, mrp_price, discount_percentage, is_featured, is_trending, is_best_seller, is_deal_of_the_day, is_new_arrival, warranty_info, rating_average, rating_count, sold_count)
VALUES (
    5,
    'ASUS ROG Swift OLED PG27AQDM 27-inch QHD 240Hz 0.03ms Gaming Monitor',
    'asus-rog-swift-oled-pg27aqdm-27-inch-240hz',
    'MON-ASUS-PG27AQDM',
    (SELECT id FROM brands WHERE slug='asus'),
    (SELECT id FROM categories WHERE slug='monitors'),
    '27-inch 1440p OLED gaming monitor with 240Hz refresh rate, 0.03ms response time, custom heatsink, and 99% DCI-P3 gamut.',
    'Featuring a 27-inch 1440p OLED panel with 240Hz refresh rate and 0.03ms gray-to-gray (GTG) response time, the ROG Swift OLED PG27AQDM is one of the fastest and most responsive monitors available. Inside, a custom heatsink and intelligent voltage optimization reduce the risk of burn-in to ensure OLED longevity.',
    78999.00,
    99999.00,
    21,
    true, true, false, false, true,
    '3 Years Manufacturer Warranty with Burn-in Coverage',
    4.9, 87, 180
);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(5, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80', 'ASUS ROG OLED Monitor', 1, true);

INSERT INTO product_variants (id, product_id, variant_name, sku, price, mrp_price, attributes, is_default) VALUES
(13, 5, '27-inch 240Hz QHD OLED', 'MON-PG27AQDM-STD', 78999.00, 99999.00, '{"size": "27-inch", "panel": "OLED", "refresh": "240Hz"}', true);

INSERT INTO product_specifications (product_id, field_key, field_name, field_value, group_name, sort_order) VALUES
(5, 'screen_size', 'Screen Size', '26.5 Inches (67.3 cm)', 'Display', 1),
(5, 'resolution', 'Resolution', '2560 x 1440 (QHD)', 'Display', 2),
(5, 'refresh_rate', 'Refresh Rate', '240 Hz', 'Performance', 3),
(5, 'panel_type', 'Panel Type', 'OLED (Anti-Glare)', 'Display', 4),
(5, 'response_time', 'Response Time', '0.03 ms (GTG)', 'Performance', 5),
(5, 'hdr', 'HDR Support', 'HDR10 with 1000 nits Peak Brightness', 'Display', 6),
(5, 'adaptive_sync', 'Adaptive Sync', 'G-Sync Compatible & FreeSync Premium', 'Performance', 7);

INSERT INTO inventory (product_id, variant_id, sku, current_stock, reserved_stock, sold_quantity, low_stock_threshold) VALUES
(5, 13, 'MON-PG27AQDM-STD', 14, 1, 180, 3);

-- Product 6: AMD Ryzen 7 7800X3D Desktop Processor
INSERT INTO products (id, name, slug, sku, brand_id, category_id, short_description, description, base_price, mrp_price, discount_percentage, is_featured, is_trending, is_best_seller, is_deal_of_the_day, is_new_arrival, warranty_info, rating_average, rating_count, sold_count)
VALUES (
    6,
    'AMD Ryzen 7 7800X3D 8-Core 16-Thread Desktop Processor with 3D V-Cache',
    'amd-ryzen-7-7800x3d-processor',
    'CPU-AMD-7800X3D',
    (SELECT id FROM brands WHERE slug='amd'),
    (SELECT id FROM categories WHERE slug='processors'),
    'The undisputed champion of gaming processors. 8 Cores, 16 Threads, 104MB Cache, 5.0 GHz Max Boost, PCIe 5.0 ready on AM5 socket.',
    'The processor that dominates gaming performance. With AMD 3D V-Cache technology, the AMD Ryzen 7 7800X3D delivers monstrous frame rates in the most demanding titles. Built on the revolutionary 5nm Zen 4 architecture with 120W TDP efficiency.',
    37999.00,
    46999.00,
    19,
    true, true, true, false, false,
    '3 Years Brand Warranty',
    5.0, 420, 1850
);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(6, 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80', 'AMD Ryzen Processor Box', 1, true);

INSERT INTO product_variants (id, product_id, variant_name, sku, price, mrp_price, attributes, is_default) VALUES
(14, 6, 'Ryzen 7 7800X3D (Without Cooler)', 'CPU-7800X3D-BOX', 37999.00, 46999.00, '{"cooler": "None (Liquid Cooler Recommended)"}', true);

INSERT INTO product_specifications (product_id, field_key, field_name, field_value, group_name, sort_order) VALUES
(6, 'brand_name', 'Brand', 'AMD', 'General', 1),
(6, 'socket', 'Socket', 'AM5', 'Compatibility', 2),
(6, 'cores', 'Cores', '8 Cores', 'Performance', 3),
(6, 'threads', 'Threads', '16 Threads', 'Performance', 4),
(6, 'base_clock', 'Base Clock', '4.2 GHz', 'Performance', 5),
(6, 'boost_clock', 'Max Boost Clock', 'Up to 5.0 GHz', 'Performance', 6),
(6, 'tdp', 'TDP', '120 W', 'Power', 7),
(6, 'integrated_graphics', 'Integrated Graphics', 'AMD Radeon Graphics (2 Cores)', 'Graphics', 8);

INSERT INTO inventory (product_id, variant_id, sku, current_stock, reserved_stock, sold_quantity, low_stock_threshold) VALUES
(6, 14, 'CPU-7800X3D-BOX', 28, 4, 1850, 6);

-- Product 7: Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones
INSERT INTO products (id, name, slug, sku, brand_id, category_id, short_description, description, base_price, mrp_price, discount_percentage, is_featured, is_trending, is_best_seller, is_deal_of_the_day, is_new_arrival, warranty_info, rating_average, rating_count, sold_count)
VALUES (
    7,
    'Sony WH-1000XM5 Wireless Noise Cancelling Headphones with Auto NC Optimizer',
    'sony-wh-1000xm5-wireless-noise-cancelling-headphones',
    'HP-SONY-XM5-001',
    (SELECT id FROM brands WHERE slug='sony'),
    (SELECT id FROM categories WHERE slug='headphones'),
    'Flagship noise cancelling headphones with 2 processors, 8 microphones, LDAC Hi-Res Audio, and 30-hour battery life.',
    'With two processors controlling 8 microphones, Auto NC Optimizer for automatically optimizing noise cancelling based on your wearing conditions and environment, and a specially designed driver unit, WH-1000XM5 headphones with industry-leading noise canceling rewrite the rules for distraction-free listening.',
    28990.00,
    34990.00,
    17,
    true, true, true, false, false,
    '1 Year Brand Warranty',
    4.7, 850, 3200
);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(7, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80', 'Sony WH-1000XM5 Black', 1, true);

INSERT INTO product_variants (id, product_id, variant_name, sku, price, mrp_price, attributes, is_default) VALUES
(15, 7, 'Midnight Black', 'HP-XM5-BLK', 28990.00, 34990.00, '{"color": "Midnight Black"}', true),
(16, 7, 'Silver / Platinum', 'HP-XM5-SLV', 28990.00, 34990.00, '{"color": "Silver"}', false),
(17, 7, 'Smoky Pink', 'HP-XM5-PNK', 29990.00, 34990.00, '{"color": "Smoky Pink"}', false);

INSERT INTO product_specifications (product_id, field_key, field_name, field_value, group_name, sort_order) VALUES
(7, 'type', 'Form Factor', 'Over-Ear Wireless', 'Design', 1),
(7, 'connection', 'Connection', 'Bluetooth 5.2 / 3.5mm Aux', 'Connectivity', 2),
(7, 'noise_cancellation', 'Active Noise Cancellation', 'Yes (Dual Processor V1 + QN1 HD NC)', 'Audio', 3),
(7, 'battery_life', 'Battery Life', '30 Hours with ANC ON / 40 Hours ANC OFF', 'Power', 4),
(7, 'microphone', 'Built-in Mic', '4 Beamforming Microphones with AI Noise Reduction', 'Audio', 5);

INSERT INTO inventory (product_id, variant_id, sku, current_stock, reserved_stock, sold_quantity, low_stock_threshold) VALUES
(7, 15, 'HP-XM5-BLK', 40, 2, 2100, 8),
(7, 16, 'HP-XM5-SLV', 18, 0, 950, 5),
(7, 17, 'HP-XM5-PNK', 8, 1, 150, 3);

-- Product 8: TP-Link Archer AXE75 Tri-Band Wi-Fi 6E Router
INSERT INTO products (id, name, slug, sku, brand_id, category_id, short_description, description, base_price, mrp_price, discount_percentage, is_featured, is_trending, is_best_seller, is_deal_of_the_day, is_new_arrival, warranty_info, rating_average, rating_count, sold_count)
VALUES (
    8,
    'TP-Link Archer AXE75 AXE5400 Tri-Band Gigabit Wi-Fi 6E Router',
    'tp-link-archer-axe75-tri-band-wifi-6e-router',
    'NET-TPL-AXE75',
    (SELECT id FROM brands WHERE slug='tp-link'),
    (SELECT id FROM categories WHERE slug='wifi-routers'),
    'Tri-Band Wi-Fi 6E router with speeds up to 5400 Mbps, 6GHz band, 1.7 GHz quad-core CPU, and USB 3.0 port.',
    'Experience uncongested next-generation networking with the TP-Link Archer AXE75. Offering a clean 6GHz dedicated high-speed band, 6 external high-gain antennas, and OFDMA + MU-MIMO technology to simultaneously connect over 200 devices without lag.',
    11999.00,
    16999.00,
    29,
    false, false, true, true, true,
    '3 Years Brand Replacement Warranty',
    4.6, 92, 430
);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary) VALUES
(8, 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80', 'TP Link Wi-Fi 6E Router', 1, true);

INSERT INTO product_variants (id, product_id, variant_name, sku, price, mrp_price, attributes, is_default) VALUES
(18, 8, 'AXE5400 Tri-Band Standard', 'NET-AXE75-STD', 11999.00, 16999.00, '{"bands": "Tri-Band 6GHz+5GHz+2.4GHz"}', true);

INSERT INTO product_specifications (product_id, field_key, field_name, field_value, group_name, sort_order) VALUES
(8, 'wireless_speed', 'Wireless Speed', '5400 Mbps (2402 Mbps 6GHz + 2402 Mbps 5GHz + 574 Mbps 2.4GHz)', 'Performance', 1),
(8, 'antennas', 'Antennas', '6 External High-Performance Antennas', 'Hardware', 2),
(8, 'ports', 'Ethernet Ports', '1x 1Gbps WAN + 4x 1Gbps LAN + 1x USB 3.0', 'Connectivity', 3);

INSERT INTO inventory (product_id, variant_id, sku, current_stock, reserved_stock, sold_quantity, low_stock_threshold) VALUES
(8, 18, 'NET-AXE75-STD', 25, 1, 430, 5);

-- 3. Insert Initial Coupons
INSERT INTO coupons (code, title, description, discount_type, discount_value, min_order_value, max_discount_amount, usage_limit_total, usage_limit_per_user, start_date, end_date, is_active)
VALUES 
    ('TECHVAULT10', '10% Welcome Discount', 'Get 10% instant discount on orders above ₹2,000', 'PERCENTAGE', 10.00, 2000.00, 1500.00, 1000, 1, NOW() - INTERVAL '1 day', NOW() + INTERVAL '1 year', true),
    ('FLAT500', 'Flat ₹500 Off', 'Flat ₹500 off on gaming peripherals and electronics above ₹4,999', 'FIXED', 500.00, 4999.00, 500.00, 500, 1, NOW() - INTERVAL '1 day', NOW() + INTERVAL '1 year', true),
    ('SUPERGEAR', '15% Off Flagship Hardware', '15% discount up to ₹3,000 on Monitors, SSDs and CPUs', 'PERCENTAGE', 15.00, 10000.00, 3000.00, 250, 1, NOW() - INTERVAL '1 day', NOW() + INTERVAL '6 months', true);
