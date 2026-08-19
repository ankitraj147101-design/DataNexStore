-- TechVault Database Schema - V2 - Products, Variants, Inventory, Orders, Reviews
-- Migration: V2__products_and_commerce_schema.sql

-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE products (
    id                  BIGSERIAL PRIMARY KEY,
    name                VARCHAR(255) NOT NULL,
    slug                VARCHAR(300) NOT NULL UNIQUE,
    sku                 VARCHAR(100) NOT NULL UNIQUE,
    brand_id            BIGINT REFERENCES brands(id) ON DELETE SET NULL,
    category_id         BIGINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    short_description   TEXT,
    description         TEXT,
    base_price          NUMERIC(12, 2) NOT NULL,
    mrp_price           NUMERIC(12, 2) NOT NULL,
    discount_percentage INT DEFAULT 0,
    is_featured         BOOLEAN NOT NULL DEFAULT FALSE,
    is_trending         BOOLEAN NOT NULL DEFAULT FALSE,
    is_best_seller      BOOLEAN NOT NULL DEFAULT FALSE,
    is_deal_of_the_day  BOOLEAN NOT NULL DEFAULT FALSE,
    is_new_arrival      BOOLEAN NOT NULL DEFAULT TRUE,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    warranty_info       VARCHAR(255) DEFAULT '1 Year Manufacturer Warranty',
    return_policy_days  INT DEFAULT 7,
    meta_title          VARCHAR(255),
    meta_description    TEXT,
    rating_average      NUMERIC(3, 2) DEFAULT 0.00,
    rating_count        INT DEFAULT 0,
    view_count          BIGINT DEFAULT 0,
    sold_count          BIGINT DEFAULT 0,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_price ON products(base_price);
CREATE INDEX idx_products_rating ON products(rating_average);

-- ============================================================
-- PRODUCT IMAGES
-- ============================================================
CREATE TABLE product_images (
    id          BIGSERIAL PRIMARY KEY,
    product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url   VARCHAR(1000) NOT NULL,
    alt_text    VARCHAR(255),
    sort_order  INT NOT NULL DEFAULT 0,
    is_primary  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_images_product ON product_images(product_id);

-- ============================================================
-- PRODUCT VARIANTS
-- ============================================================
CREATE TABLE product_variants (
    id                  BIGSERIAL PRIMARY KEY,
    product_id          BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_name        VARCHAR(150) NOT NULL, -- e.g. "Black / 1TB"
    sku                 VARCHAR(100) NOT NULL UNIQUE,
    price               NUMERIC(12, 2) NOT NULL,
    mrp_price           NUMERIC(12, 2) NOT NULL,
    attributes          JSONB NOT NULL DEFAULT '{}', -- e.g. {"color": "Black", "capacity": "1TB"}
    image_url           VARCHAR(1000),
    is_default          BOOLEAN NOT NULL DEFAULT FALSE,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_variants_product ON product_variants(product_id);

-- ============================================================
-- PRODUCT SPECIFICATIONS (Dynamic technical attributes)
-- ============================================================
CREATE TABLE product_specifications (
    id          BIGSERIAL PRIMARY KEY,
    product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    field_key   VARCHAR(100) NOT NULL,
    field_name  VARCHAR(150) NOT NULL,
    field_value TEXT NOT NULL,
    group_name  VARCHAR(100) DEFAULT 'General',
    sort_order  INT NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_specs_product ON product_specifications(product_id);
CREATE INDEX idx_product_specs_key_val ON product_specifications(field_key, field_value);

-- ============================================================
-- INVENTORY
-- ============================================================
CREATE TABLE inventory (
    id                  BIGSERIAL PRIMARY KEY,
    product_id          BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id          BIGINT REFERENCES product_variants(id) ON DELETE CASCADE,
    sku                 VARCHAR(100) NOT NULL UNIQUE,
    current_stock       INT NOT NULL DEFAULT 0,
    reserved_stock      INT NOT NULL DEFAULT 0,
    sold_quantity       INT NOT NULL DEFAULT 0,
    low_stock_threshold INT NOT NULL DEFAULT 5,
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inventory_product ON inventory(product_id);
CREATE INDEX idx_inventory_low_stock ON inventory(current_stock, low_stock_threshold);

-- ============================================================
-- ADDRESSES
-- ============================================================
CREATE TABLE addresses (
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    full_name       VARCHAR(150) NOT NULL,
    phone           VARCHAR(20) NOT NULL,
    alternate_phone VARCHAR(20),
    address_line1   VARCHAR(255) NOT NULL,
    address_line2   VARCHAR(255),
    landmark        VARCHAR(150),
    city            VARCHAR(100) NOT NULL,
    state           VARCHAR(100) NOT NULL,
    pincode         VARCHAR(10) NOT NULL,
    country         VARCHAR(50) NOT NULL DEFAULT 'India',
    address_type    VARCHAR(20) NOT NULL DEFAULT 'HOME', -- HOME, WORK, OTHER
    is_default      BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_addresses_user ON addresses(user_id);

-- ============================================================
-- CARTS & CART ITEMS
-- ============================================================
CREATE TABLE carts (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT REFERENCES users(id) ON DELETE CASCADE,
    session_id  VARCHAR(255), -- for guest users
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_carts_user ON carts(user_id) WHERE user_id IS NOT NULL;
CREATE INDEX idx_carts_session ON carts(session_id) WHERE session_id IS NOT NULL;

CREATE TABLE cart_items (
    id          BIGSERIAL PRIMARY KEY,
    cart_id     BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id  BIGINT REFERENCES product_variants(id) ON DELETE SET NULL,
    quantity    INT NOT NULL DEFAULT 1,
    saved_for_later BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_cart_item_unique ON cart_items(cart_id, product_id, COALESCE(variant_id, -1));

-- ============================================================
-- WISHLISTS & ITEMS
-- ============================================================
CREATE TABLE wishlists (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE wishlist_items (
    id          BIGSERIAL PRIMARY KEY,
    wishlist_id BIGINT NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
    product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (wishlist_id, product_id)
);

-- ============================================================
-- COUPONS & USAGE
-- ============================================================
CREATE TABLE coupons (
    id                  BIGSERIAL PRIMARY KEY,
    code                VARCHAR(50) NOT NULL UNIQUE,
    title               VARCHAR(150) NOT NULL,
    description         TEXT,
    discount_type       VARCHAR(20) NOT NULL, -- PERCENTAGE, FIXED
    discount_value      NUMERIC(10, 2) NOT NULL,
    min_order_value     NUMERIC(10, 2) DEFAULT 0,
    max_discount_amount NUMERIC(10, 2), -- cap for percentage discount
    usage_limit_total   INT,
    usage_limit_per_user INT DEFAULT 1,
    used_count          INT NOT NULL DEFAULT 0,
    start_date          TIMESTAMPTZ NOT NULL,
    end_date            TIMESTAMPTZ NOT NULL,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE coupon_usage (
    id          BIGSERIAL PRIMARY KEY,
    coupon_id   BIGINT NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id    BIGINT,
    discount_applied NUMERIC(10, 2) NOT NULL,
    used_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ORDERS & ORDER ITEMS
-- ============================================================
CREATE TABLE orders (
    id                  BIGSERIAL PRIMARY KEY,
    order_number        VARCHAR(100) NOT NULL UNIQUE,
    user_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    status              VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    -- PENDING, CONFIRMED, PROCESSING, PACKED, SHIPPED, OUT_FOR_DELIVERY, DELIVERED, CANCELLED, REFUND_REQUESTED, REFUNDED, RETURNED
    subtotal            NUMERIC(12, 2) NOT NULL,
    discount_amount     NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    coupon_id           BIGINT REFERENCES coupons(id),
    shipping_charge     NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    tax_amount          NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount        NUMERIC(12, 2) NOT NULL,
    
    -- Address Snapshot
    shipping_address_json JSONB NOT NULL,
    billing_address_json  JSONB NOT NULL,
    
    -- Delivery & Tracking
    courier_name        VARCHAR(100),
    tracking_number     VARCHAR(100),
    tracking_url        VARCHAR(500),
    estimated_delivery  TIMESTAMPTZ,
    delivered_at        TIMESTAMPTZ,
    
    -- Notes
    customer_notes      TEXT,
    admin_notes         TEXT,
    cancellation_reason TEXT,
    
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);

CREATE TABLE order_items (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id      BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    variant_id      BIGINT REFERENCES product_variants(id) ON DELETE SET NULL,
    product_name    VARCHAR(255) NOT NULL,
    variant_name    VARCHAR(150),
    sku             VARCHAR(100) NOT NULL,
    image_url       VARCHAR(1000),
    unit_price      NUMERIC(12, 2) NOT NULL,
    quantity        INT NOT NULL,
    total_price     NUMERIC(12, 2) NOT NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ============================================================
-- PAYMENTS
-- ============================================================
CREATE TABLE payments (
    id                  BIGSERIAL PRIMARY KEY,
    order_id            BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    payment_method      VARCHAR(50) NOT NULL, -- RAZORPAY, COD, UPI, NETBANKING, CARD
    amount              NUMERIC(12, 2) NOT NULL,
    currency            VARCHAR(10) NOT NULL DEFAULT 'INR',
    status              VARCHAR(50) NOT NULL DEFAULT 'INITIATED', -- INITIATED, SUCCESS, FAILED, REFUNDED
    razorpay_order_id   VARCHAR(255),
    razorpay_payment_id VARCHAR(255),
    razorpay_signature  VARCHAR(500),
    error_code          VARCHAR(100),
    error_description   TEXT,
    refund_id           VARCHAR(255),
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_order ON payments(order_id);
CREATE INDEX idx_payments_razorpay_order ON payments(razorpay_order_id);

-- ============================================================
-- REVIEWS & IMAGES
-- ============================================================
CREATE TABLE reviews (
    id              BIGSERIAL PRIMARY KEY,
    product_id      BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id         BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating          INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title           VARCHAR(200),
    comment         TEXT,
    is_verified_purchase BOOLEAN NOT NULL DEFAULT FALSE,
    is_approved     BOOLEAN NOT NULL DEFAULT TRUE,
    likes_count     INT NOT NULL DEFAULT 0,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reviews_product ON reviews(product_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

CREATE TABLE review_images (
    id          BIGSERIAL PRIMARY KEY,
    review_id   BIGINT NOT NULL REFERENCES reviews(id) ON DELETE CASCADE,
    image_url   VARCHAR(1000) NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- NOTIFICATIONS & AUDIT LOGS
-- ============================================================
CREATE TABLE notifications (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT REFERENCES users(id) ON DELETE CASCADE, -- NULL for broadcast/admin
    type        VARCHAR(50) NOT NULL, -- ORDER_PLACED, PAYMENT_SUCCESS, LOW_STOCK, etc.
    title       VARCHAR(200) NOT NULL,
    message     TEXT NOT NULL,
    link_url    VARCHAR(500),
    is_read     BOOLEAN NOT NULL DEFAULT FALSE,
    for_admin   BOOLEAN NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_admin ON notifications(for_admin, is_read);

CREATE TABLE audit_logs (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT REFERENCES users(id) ON DELETE SET NULL,
    action      VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id   VARCHAR(100),
    details     JSONB,
    ip_address  VARCHAR(50),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
