-- TechVault Database Schema - V1 - Core Tables
-- Migration: V1__init_core_schema.sql

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- for trigram search
CREATE EXTENSION IF NOT EXISTS "unaccent"; -- for accent-insensitive search

-- ============================================================
-- ROLES
-- ============================================================
CREATE TABLE roles (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO roles (name, description) VALUES
    ('ROLE_CUSTOMER', 'Regular customer account'),
    ('ROLE_ADMIN', 'Store administrator'),
    ('ROLE_SUPER_ADMIN', 'Super administrator with full access');

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
    id                  BIGSERIAL PRIMARY KEY,
    email               VARCHAR(255) NOT NULL UNIQUE,
    password_hash       VARCHAR(255) NOT NULL,
    first_name          VARCHAR(100) NOT NULL,
    last_name           VARCHAR(100),
    phone               VARCHAR(20),
    avatar_url          VARCHAR(500),
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    is_email_verified   BOOLEAN NOT NULL DEFAULT FALSE,
    email_verify_token  VARCHAR(255),
    reset_token         VARCHAR(255),
    reset_token_expiry  TIMESTAMPTZ,
    last_login_at       TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_reset_token ON users(reset_token) WHERE reset_token IS NOT NULL;

-- ============================================================
-- USER ROLES (M2M)
-- ============================================================
CREATE TABLE user_roles (
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- ============================================================
-- REFRESH TOKENS
-- ============================================================
CREATE TABLE refresh_tokens (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token       VARCHAR(500) NOT NULL UNIQUE,
    expires_at  TIMESTAMPTZ NOT NULL,
    is_revoked  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);

-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE categories (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    slug            VARCHAR(200) NOT NULL UNIQUE,
    description     TEXT,
    image_url       VARCHAR(500),
    parent_id       BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    sort_order      INT NOT NULL DEFAULT 0,
    is_active       BOOLEAN NOT NULL DEFAULT TRUE,
    meta_title      VARCHAR(255),
    meta_description VARCHAR(500),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_sort_order ON categories(sort_order);

-- Insert initial categories
INSERT INTO categories (name, slug, description, sort_order) VALUES
    ('Keyboards', 'keyboards', 'Mechanical and membrane keyboards', 1),
    ('Mouse', 'mouse', 'Gaming and office mice', 2),
    ('SSD', 'ssd', 'Solid state drives', 3),
    ('HDD', 'hdd', 'Hard disk drives', 4),
    ('RAM', 'ram', 'System memory modules', 5),
    ('Graphics Cards', 'graphics-cards', 'GPU for gaming and workstations', 6),
    ('Processors', 'processors', 'CPUs - Intel and AMD', 7),
    ('Motherboards', 'motherboards', 'ATX, mATX and ITX motherboards', 8),
    ('Monitors', 'monitors', 'Gaming and professional monitors', 9),
    ('PC Cases', 'pc-cases', 'Computer cabinets and cases', 10),
    ('Power Supplies', 'power-supplies', 'PSU units', 11),
    ('Cooling Fans', 'cooling-fans', 'CPU and case cooling solutions', 12),
    ('Thermal Paste', 'thermal-paste', 'Thermal interface materials', 13),
    ('Pendrives', 'pendrives', 'USB flash drives', 14),
    ('Memory Cards', 'memory-cards', 'SD and microSD cards', 15),
    ('USB Hubs', 'usb-hubs', 'USB hub and docking stations', 16),
    ('Webcams', 'webcams', 'HD and 4K webcams', 17),
    ('Headphones', 'headphones', 'Gaming and audiophile headphones', 18),
    ('Speakers', 'speakers', 'PC and desktop speakers', 19),
    ('Microphones', 'microphones', 'USB and XLR microphones', 20),
    ('Wi-Fi Routers', 'wifi-routers', 'Home and office routers', 21),
    ('Network Accessories', 'network-accessories', 'Network switches and accessories', 22),
    ('Cables', 'cables', 'USB, HDMI, DisplayPort cables', 23),
    ('Adapters', 'adapters', 'Type-C, HDMI and other adapters', 24),
    ('Laptop Accessories', 'laptop-accessories', 'Stands, sleeves and accessories', 25),
    ('Other Computer Accessories', 'other-accessories', 'Miscellaneous computer accessories', 26);

-- ============================================================
-- CATEGORY SPECIFICATION FIELDS (Dynamic spec system)
-- ============================================================
CREATE TABLE category_spec_fields (
    id              BIGSERIAL PRIMARY KEY,
    category_id     BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    field_name      VARCHAR(100) NOT NULL,
    field_key       VARCHAR(100) NOT NULL,
    field_type      VARCHAR(50) NOT NULL DEFAULT 'text', -- text, number, boolean, select, multiselect
    unit            VARCHAR(30),
    options         JSONB,                  -- for select/multiselect: ["option1","option2"]
    is_filterable   BOOLEAN NOT NULL DEFAULT FALSE,
    is_required     BOOLEAN NOT NULL DEFAULT FALSE,
    sort_order      INT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_cat_spec_fields_category ON category_spec_fields(category_id);
CREATE UNIQUE INDEX idx_cat_spec_fields_unique ON category_spec_fields(category_id, field_key);

-- Keyboard spec fields
INSERT INTO category_spec_fields (category_id, field_name, field_key, field_type, options, is_filterable, sort_order)
SELECT c.id, field_name, field_key, field_type, options::jsonb, is_filterable, sort_order
FROM categories c,
(VALUES
    ('Switch Type', 'switch_type', 'select', '["Cherry MX Red","Cherry MX Blue","Cherry MX Brown","Gateron Red","Gateron Yellow","Optical","Others"]', true, 1),
    ('Layout', 'layout', 'select', '["Full Size (100%)","TKL (80%)","75%","65%","60%","40%"]', true, 2),
    ('Connection', 'connection', 'select', '["Wired","Wireless","Wired/Wireless"]', true, 3),
    ('RGB', 'rgb', 'boolean', NULL, true, 4),
    ('Polling Rate', 'polling_rate', 'text', NULL, false, 5),
    ('Key Count', 'key_count', 'number', NULL, false, 6),
    ('Form Factor', 'form_factor', 'text', NULL, false, 7),
    ('Hot Swappable', 'hot_swappable', 'boolean', NULL, true, 8)
) AS t(field_name, field_key, field_type, options, is_filterable, sort_order)
WHERE c.slug = 'keyboards';

-- Mouse spec fields
INSERT INTO category_spec_fields (category_id, field_name, field_key, field_type, options, is_filterable, sort_order)
SELECT c.id, field_name, field_key, field_type, options::jsonb, is_filterable, sort_order
FROM categories c,
(VALUES
    ('Max DPI', 'max_dpi', 'number', NULL, true, 1),
    ('Sensor', 'sensor', 'text', NULL, false, 2),
    ('Connection', 'connection', 'select', '["Wired","Wireless","Wired/Wireless"]', true, 3),
    ('Polling Rate', 'polling_rate', 'number', NULL, false, 4),
    ('Weight', 'weight', 'number', NULL, false, 5),
    ('Number of Buttons', 'buttons', 'number', NULL, false, 6),
    ('Ergonomics', 'ergonomics', 'select', '["Right-handed","Left-handed","Ambidextrous"]', true, 7),
    ('RGB', 'rgb', 'boolean', NULL, true, 8)
) AS t(field_name, field_key, field_type, options, is_filterable, sort_order)
WHERE c.slug = 'mouse';

-- SSD spec fields
INSERT INTO category_spec_fields (category_id, field_name, field_key, field_type, options, is_filterable, sort_order)
SELECT c.id, field_name, field_key, field_type, options::jsonb, is_filterable, sort_order
FROM categories c,
(VALUES
    ('Capacity', 'capacity', 'select', '["120GB","240GB","500GB","1TB","2TB","4TB"]', true, 1),
    ('Interface', 'interface', 'select', '["SATA III","NVMe PCIe 3.0","NVMe PCIe 4.0","NVMe PCIe 5.0"]', true, 2),
    ('Form Factor', 'form_factor', 'select', '["2.5 inch","M.2 2280","M.2 2242"]', true, 3),
    ('Read Speed', 'read_speed', 'number', NULL, false, 4),
    ('Write Speed', 'write_speed', 'number', NULL, false, 5),
    ('NAND Type', 'nand_type', 'select', '["TLC","QLC","MLC","SLC"]', true, 6),
    ('DRAM Cache', 'dram_cache', 'boolean', NULL, false, 7),
    ('TBW', 'tbw', 'number', NULL, false, 8)
) AS t(field_name, field_key, field_type, options, is_filterable, sort_order)
WHERE c.slug = 'ssd';

-- RAM spec fields
INSERT INTO category_spec_fields (category_id, field_name, field_key, field_type, options, is_filterable, sort_order)
SELECT c.id, field_name, field_key, field_type, options::jsonb, is_filterable, sort_order
FROM categories c,
(VALUES
    ('Capacity', 'capacity', 'select', '["4GB","8GB","16GB","32GB","64GB"]', true, 1),
    ('Speed', 'speed', 'select', '["DDR4-2400","DDR4-3200","DDR4-3600","DDR5-4800","DDR5-6000","DDR5-6400"]', true, 2),
    ('Type', 'type', 'select', '["DDR4","DDR5"]', true, 3),
    ('Modules', 'modules', 'select', '["Single (1x)","Dual (2x)","Quad (4x)"]', true, 4),
    ('CAS Latency', 'cas_latency', 'text', NULL, false, 5),
    ('RGB', 'rgb', 'boolean', NULL, true, 6),
    ('ECC', 'ecc', 'boolean', NULL, false, 7),
    ('Form Factor', 'form_factor', 'select', '["DIMM","SO-DIMM"]', true, 8)
) AS t(field_name, field_key, field_type, options, is_filterable, sort_order)
WHERE c.slug = 'ram';

-- Monitor spec fields
INSERT INTO category_spec_fields (category_id, field_name, field_key, field_type, options, is_filterable, sort_order)
SELECT c.id, field_name, field_key, field_type, options::jsonb, is_filterable, sort_order
FROM categories c,
(VALUES
    ('Screen Size', 'screen_size', 'number', NULL, true, 1),
    ('Resolution', 'resolution', 'select', '["1080p FHD","1440p QHD","4K UHD","1080p Ultrawide","1440p Ultrawide"]', true, 2),
    ('Refresh Rate', 'refresh_rate', 'select', '["60Hz","75Hz","144Hz","165Hz","240Hz","360Hz"]', true, 3),
    ('Panel Type', 'panel_type', 'select', '["IPS","VA","TN","OLED","Mini-LED"]', true, 4),
    ('Response Time', 'response_time', 'number', NULL, false, 5),
    ('HDR', 'hdr', 'boolean', NULL, true, 6),
    ('Ports', 'ports', 'text', NULL, false, 7),
    ('Aspect Ratio', 'aspect_ratio', 'text', NULL, false, 8),
    ('G-Sync/FreeSync', 'adaptive_sync', 'select', '["G-Sync","FreeSync","G-Sync Compatible","None"]', true, 9)
) AS t(field_name, field_key, field_type, options, is_filterable, sort_order)
WHERE c.slug = 'monitors';

-- Headphone spec fields
INSERT INTO category_spec_fields (category_id, field_name, field_key, field_type, options, is_filterable, sort_order)
SELECT c.id, field_name, field_key, field_type, options::jsonb, is_filterable, sort_order
FROM categories c,
(VALUES
    ('Type', 'type', 'select', '["Over-ear","On-ear","In-ear","True Wireless"]', true, 1),
    ('Connection', 'connection', 'select', '["Wired","Wireless","Wired/Wireless"]', true, 2),
    ('Driver Size', 'driver_size', 'number', NULL, false, 3),
    ('Frequency Response', 'frequency_response', 'text', NULL, false, 4),
    ('Impedance', 'impedance', 'number', NULL, false, 5),
    ('Microphone', 'microphone', 'boolean', NULL, true, 6),
    ('Noise Cancellation', 'noise_cancellation', 'boolean', NULL, true, 7),
    ('RGB', 'rgb', 'boolean', NULL, true, 8),
    ('Battery Life', 'battery_life', 'number', NULL, false, 9)
) AS t(field_name, field_key, field_type, options, is_filterable, sort_order)
WHERE c.slug = 'headphones';

-- Processor spec fields
INSERT INTO category_spec_fields (category_id, field_name, field_key, field_type, options, is_filterable, sort_order)
SELECT c.id, field_name, field_key, field_type, options::jsonb, is_filterable, sort_order
FROM categories c,
(VALUES
    ('Brand', 'brand_name', 'select', '["Intel","AMD"]', true, 1),
    ('Socket', 'socket', 'select', '["AM4","AM5","LGA1700","LGA1851"]', true, 2),
    ('Cores', 'cores', 'number', NULL, true, 3),
    ('Threads', 'threads', 'number', NULL, false, 4),
    ('Base Clock', 'base_clock', 'number', NULL, false, 5),
    ('Boost Clock', 'boost_clock', 'number', NULL, false, 6),
    ('TDP', 'tdp', 'number', NULL, false, 7),
    ('Integrated Graphics', 'integrated_graphics', 'boolean', NULL, true, 8),
    ('Generation', 'generation', 'text', NULL, true, 9)
) AS t(field_name, field_key, field_type, options, is_filterable, sort_order)
WHERE c.slug = 'processors';

-- ============================================================
-- BRANDS
-- ============================================================
CREATE TABLE brands (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(150) NOT NULL UNIQUE,
    slug        VARCHAR(200) NOT NULL UNIQUE,
    description TEXT,
    logo_url    VARCHAR(500),
    website_url VARCHAR(500),
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_brands_slug ON brands(slug);

INSERT INTO brands (name, slug, logo_url, is_active, sort_order) VALUES
    ('Logitech', 'logitech', NULL, true, 1),
    ('Razer', 'razer', NULL, true, 2),
    ('Corsair', 'corsair', NULL, true, 3),
    ('Samsung', 'samsung', NULL, true, 4),
    ('Western Digital', 'western-digital', NULL, true, 5),
    ('Seagate', 'seagate', NULL, true, 6),
    ('Kingston', 'kingston', NULL, true, 7),
    ('G.Skill', 'gskill', NULL, true, 8),
    ('ASUS', 'asus', NULL, true, 9),
    ('MSI', 'msi', NULL, true, 10),
    ('Gigabyte', 'gigabyte', NULL, true, 11),
    ('NVIDIA', 'nvidia', NULL, true, 12),
    ('AMD', 'amd', NULL, true, 13),
    ('Intel', 'intel', NULL, true, 14),
    ('SteelSeries', 'steelseries', NULL, true, 15),
    ('HyperX', 'hyperx', NULL, true, 16),
    ('Keychron', 'keychron', NULL, true, 17),
    ('Crucial', 'crucial', NULL, true, 18),
    ('TP-Link', 'tp-link', NULL, true, 19),
    ('Logitech G', 'logitech-g', NULL, true, 20),
    ('Sony', 'sony', NULL, true, 21),
    ('Philips', 'philips', NULL, true, 22),
    ('LG', 'lg', NULL, true, 23),
    ('BenQ', 'benq', NULL, true, 24),
    ('AOC', 'aoc', NULL, true, 25);
