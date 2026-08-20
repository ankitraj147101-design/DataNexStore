import { Category, Brand, Product, Coupon, Order, Review, AdminDashboardStats } from '@/types';

export const INITIAL_BRANDS: Brand[] = [
  { id: 1, name: 'Keychron', slug: 'keychron', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&q=80', description: 'Premium Custom & Mechanical Keyboards' },
  { id: 2, name: 'Logitech G', slug: 'logitech-g', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&q=80', description: 'Professional Esports Gaming Peripherals' },
  { id: 3, name: 'Samsung', slug: 'samsung', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=100&q=80', description: 'High-Performance Solid State Drives & Displays' },
  { id: 4, name: 'Corsair', slug: 'corsair', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=100&q=80', description: 'High-Speed Memory Kits & Performance Hardware' },
  { id: 5, name: 'ASUS ROG', slug: 'asus', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&q=80', description: 'Flagship Gaming Monitors & Components' },
  { id: 6, name: 'AMD', slug: 'amd', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=100&q=80', description: 'High-Performance Desktop Processors' },
  { id: 7, name: 'Sony', slug: 'sony', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80', description: 'Industry-Leading Active Noise-Canceling Audio' },
  { id: 8, name: 'TP-Link', slug: 'tp-link', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=100&q=80', description: 'Next-Generation Wi-Fi 6E & Wi-Fi 7 Networking' },
  { id: 9, name: 'Razer', slug: 'razer', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&q=80', description: 'Precision Gaming Hardware & Ergonomics' },
  { id: 10, name: 'Western Digital', slug: 'western-digital', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=100&q=80', description: 'Enterprise Storage & Reliable NVMe Drives' },
  { id: 11, name: 'Intel', slug: 'intel', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=100&q=80', description: 'Multi-Core Workstation & Desktop CPUs' },
  { id: 12, name: 'MSI', slug: 'msi', isActive: true, logoUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=100&q=80', description: 'High-Performance Motherboards & Graphics Cards' }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Keyboards',
    slug: 'keyboards',
    description: 'Custom mechanical, wireless, and optical keyboards engineered for tactile precision and acoustics',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
    sortOrder: 1,
    isActive: true,
    productCount: 14,
    specFields: [
      { id: 1, fieldName: 'Switch Type', fieldKey: 'switch_type', fieldType: 'select', isFilterable: true, sortOrder: 1, options: ['Cherry MX Red', 'Gateron Yellow', 'Keychron K Pro Red', 'Optical Linear', 'Tactile Brown'] },
      { id: 2, fieldName: 'Layout', fieldKey: 'layout', fieldType: 'select', isFilterable: true, sortOrder: 2, options: ['Full Size (100%)', 'TKL (80%)', '75%', '65%', '60%'] },
      { id: 3, fieldName: 'Connection', fieldKey: 'connection', fieldType: 'select', isFilterable: true, sortOrder: 3, options: ['Wired', 'Wireless', 'Bluetooth + 2.4GHz + Wired'] },
      { id: 4, fieldName: 'Hot Swappable', fieldKey: 'hot_swappable', fieldType: 'boolean', isFilterable: true, sortOrder: 4 },
      { id: 5, fieldName: 'RGB Backlight', fieldKey: 'rgb', fieldType: 'boolean', isFilterable: true, sortOrder: 5 }
    ]
  },
  {
    id: 2,
    name: 'Gaming Mice',
    slug: 'mouse',
    description: 'Ultralight esports mice, optical sensors up to 32,000 DPI, and sub-millisecond polling rates',
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    sortOrder: 2,
    isActive: true,
    productCount: 18,
    specFields: [
      { id: 6, fieldName: 'Max DPI', fieldKey: 'max_dpi', fieldType: 'number', isFilterable: true, sortOrder: 1, unit: 'DPI' },
      { id: 7, fieldName: 'Weight', fieldKey: 'weight', fieldType: 'number', isFilterable: true, sortOrder: 2, unit: 'g' },
      { id: 8, fieldName: 'Connection', fieldKey: 'connection', fieldType: 'select', isFilterable: true, sortOrder: 3, options: ['Wireless', 'Wired', 'Dual Mode'] },
      { id: 9, fieldName: 'Polling Rate', fieldKey: 'polling_rate', fieldType: 'select', isFilterable: true, sortOrder: 4, options: ['1000Hz', '2000Hz', '4000Hz', '8000Hz'] },
      { id: 10, fieldName: 'Ergonomics', fieldKey: 'ergonomics', fieldType: 'select', isFilterable: true, sortOrder: 5, options: ['Right-handed', 'Ambidextrous'] }
    ]
  },
  {
    id: 3,
    name: 'NVMe Solid State Drives',
    slug: 'ssd',
    description: 'High-speed PCIe 4.0 & PCIe 5.0 M.2 SSDs with heatsinks for gaming PCs, laptops, and PS5',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
    sortOrder: 3,
    isActive: true,
    productCount: 22,
    specFields: [
      { id: 11, fieldName: 'Capacity', fieldKey: 'capacity', fieldType: 'select', isFilterable: true, sortOrder: 1, options: ['500GB', '1TB', '2TB', '4TB'] },
      { id: 12, fieldName: 'Interface', fieldKey: 'interface', fieldType: 'select', isFilterable: true, sortOrder: 2, options: ['PCIe 4.0 NVMe', 'PCIe 5.0 NVMe', 'SATA III'] },
      { id: 13, fieldName: 'Form Factor', fieldKey: 'form_factor', fieldType: 'select', isFilterable: true, sortOrder: 3, options: ['M.2 2280', '2.5 inch'] },
      { id: 14, fieldName: 'Read Speed', fieldKey: 'read_speed', fieldType: 'number', isFilterable: true, sortOrder: 4, unit: 'MB/s' }
    ]
  },
  {
    id: 4,
    name: 'DDR5 & DDR4 Memory',
    slug: 'ram',
    description: 'Enthusiast desktop RAM kits featuring low latency timings and AMD EXPO / Intel XMP 3.0 support',
    imageUrl: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=600&q=80',
    sortOrder: 4,
    isActive: true,
    productCount: 16,
    specFields: [
      { id: 15, fieldName: 'Capacity', fieldKey: 'capacity', fieldType: 'select', isFilterable: true, sortOrder: 1, options: ['16GB', '32GB', '64GB', '96GB'] },
      { id: 16, fieldName: 'Type', fieldKey: 'type', fieldType: 'select', isFilterable: true, sortOrder: 2, options: ['DDR5', 'DDR4'] },
      { id: 17, fieldName: 'Speed', fieldKey: 'speed', fieldType: 'select', isFilterable: true, sortOrder: 3, options: ['5600MHz', '6000MHz', '6400MHz', '7200MHz'] },
      { id: 18, fieldName: 'RGB', fieldKey: 'rgb', fieldType: 'boolean', isFilterable: true, sortOrder: 4 }
    ]
  },
  {
    id: 5,
    name: 'Gaming & Studio Monitors',
    slug: 'monitors',
    description: 'High-refresh rate 144Hz - 360Hz Fast IPS, Mini-LED, and 0.03ms OLED displays with HDR support',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    sortOrder: 5,
    isActive: true,
    productCount: 12,
    specFields: [
      { id: 19, fieldName: 'Screen Size', fieldKey: 'screen_size', fieldType: 'select', isFilterable: true, sortOrder: 1, options: ['24-inch', '27-inch', '32-inch', '34-inch Ultrawide', '49-inch Super Ultrawide'] },
      { id: 20, fieldName: 'Resolution', fieldKey: 'resolution', fieldType: 'select', isFilterable: true, sortOrder: 2, options: ['1080p FHD', '1440p QHD', '4K UHD'] },
      { id: 21, fieldName: 'Refresh Rate', fieldKey: 'refresh_rate', fieldType: 'select', isFilterable: true, sortOrder: 3, options: ['144Hz', '165Hz', '240Hz', '360Hz'] },
      { id: 22, fieldName: 'Panel Type', fieldKey: 'panel_type', fieldType: 'select', isFilterable: true, sortOrder: 4, options: ['OLED', 'Fast IPS', 'Mini-LED', 'VA'] }
    ]
  },
  {
    id: 6,
    name: 'Processors & CPUs',
    slug: 'processors',
    description: 'Latest AMD Ryzen 7000/9000 Series and Intel Core 14th Gen processors for gaming and compute',
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=600&q=80',
    sortOrder: 6,
    isActive: true,
    productCount: 9,
    specFields: [
      { id: 23, fieldName: 'Brand', fieldKey: 'brand_name', fieldType: 'select', isFilterable: true, sortOrder: 1, options: ['AMD', 'Intel'] },
      { id: 24, fieldName: 'Socket', fieldKey: 'socket', fieldType: 'select', isFilterable: true, sortOrder: 2, options: ['AM5', 'AM4', 'LGA1700', 'LGA1851'] },
      { id: 25, fieldName: 'Cores', fieldKey: 'cores', fieldType: 'number', isFilterable: true, sortOrder: 3 }
    ]
  },
  {
    id: 7,
    name: 'Studio Audio & Headsets',
    slug: 'headphones',
    description: 'Audiophile spatial sound, active noise cancellation, and high-fidelity wireless Bluetooth headsets',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    sortOrder: 7,
    isActive: true,
    productCount: 15,
    specFields: [
      { id: 26, fieldName: 'Type', fieldKey: 'type', fieldType: 'select', isFilterable: true, sortOrder: 1, options: ['Over-ear', 'In-ear', 'True Wireless'] },
      { id: 27, fieldName: 'Noise Cancellation', fieldKey: 'noise_cancellation', fieldType: 'boolean', isFilterable: true, sortOrder: 2 },
      { id: 28, fieldName: 'Connection', fieldKey: 'connection', fieldType: 'select', isFilterable: true, sortOrder: 3, options: ['Bluetooth 5.3', 'Wireless 2.4GHz + Bluetooth', 'Wired 3.5mm'] }
    ]
  },
  {
    id: 8,
    name: 'Networking & Mesh Routers',
    slug: 'wifi-routers',
    description: 'Tri-Band Wi-Fi 6E and Wi-Fi 7 mesh routers with gigabit ethernet and multi-device MU-MIMO support',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    sortOrder: 8,
    isActive: true,
    productCount: 8
  },
  { id: 9, name: 'Graphics Cards', slug: 'graphics-cards', description: 'NVIDIA GeForce RTX 40-Series & AMD Radeon RX 7000 Series GPUs', imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80', sortOrder: 9, isActive: true, productCount: 11 },
  { id: 10, name: 'Motherboards', slug: 'motherboards', description: 'Intel Z790 & AMD X670E / B650 enthusiast workstation motherboards', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', sortOrder: 10, isActive: true, productCount: 14 },
  { id: 11, name: 'PC Cabinets & Cases', slug: 'pc-cases', description: 'High-airflow panoramic tempered glass chassis for custom desktop builds', imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=600&q=80', sortOrder: 11, isActive: true, productCount: 10 },
  { id: 12, name: 'Modular Power Supplies', slug: 'power-supplies', description: '80 PLUS Gold & Platinum ATX 3.0 PCIe 5.0 fully modular power supplies', imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80', sortOrder: 12, isActive: true, productCount: 8 },
  { id: 13, name: 'Liquid Coolers & Fans', slug: 'cooling-fans', description: '360mm AIO liquid coolers and high static-pressure PWM ARGB fans', imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80', sortOrder: 13, isActive: true, productCount: 15 },
  { id: 14, name: 'Thermal Compounds', slug: 'thermal-paste', description: 'High thermal conductivity compounds and premium liquid metal interfaces', imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80', sortOrder: 14, isActive: true, productCount: 6 },
  { id: 15, name: 'Flash Drives', slug: 'pendrives', description: 'Ultra-fast USB 3.2 Gen 2 flash drives with read speeds up to 1,000 MB/s', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', sortOrder: 15, isActive: true, productCount: 12 },
  { id: 16, name: 'Memory Cards', slug: 'memory-cards', description: 'UHS-II & V90 certified high-bitrate SD and microSD storage cards', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', sortOrder: 16, isActive: true, productCount: 9 },
  { id: 17, name: 'Thunderbolt Docks & Hubs', slug: 'usb-hubs', description: 'Multi-port Thunderbolt 4 docking stations with dual 4K display output', imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80', sortOrder: 17, isActive: true, productCount: 7 },
  { id: 18, name: 'Streaming Webcams', slug: 'webcams', description: 'Ultra HD 4K 60fps streaming webcams with auto-framing and dual mics', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80', sortOrder: 18, isActive: true, productCount: 6 },
  { id: 19, name: 'Desktop Speakers', slug: 'speakers', description: 'Hi-Fi 2.1 studio monitors with optical inputs and Bluetooth connectivity', imageUrl: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=600&q=80', sortOrder: 19, isActive: true, productCount: 5 },
  { id: 20, name: 'Studio Microphones', slug: 'microphones', description: 'Broadcast-grade XLR & USB condenser microphones for streaming and recording', imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80', sortOrder: 20, isActive: true, productCount: 8 },
  { id: 21, name: 'Enterprise Hard Drives', slug: 'hdd', description: 'High-capacity 7,200 RPM CMR enterprise and surveillance hard disk drives', imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80', sortOrder: 21, isActive: true, productCount: 7 },
  { id: 22, name: 'Network Switches', slug: 'network-accessories', description: 'Managed gigabit switches, SFP+ transceivers, and PoE power injectors', imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80', sortOrder: 22, isActive: true, productCount: 6 },
  { id: 23, name: 'Cables & Interconnects', slug: 'cables', description: 'Braided HDMI 2.1 48Gbps, DisplayPort 2.1, and 240W USB-C fast charging cables', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', sortOrder: 23, isActive: true, productCount: 14 },
  { id: 24, name: 'Power Adapters & GaN Chargers', slug: 'adapters', description: 'High-wattage GaN fast charging bricks and multi-display display converters', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', sortOrder: 24, isActive: true, productCount: 11 },
  { id: 25, name: 'Laptop Stands & Accessories', slug: 'laptop-accessories', description: 'Ergonomic aluminum laptop risers and active cooling pads', imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80', sortOrder: 25, isActive: true, productCount: 9 },
  { id: 26, name: 'Desk Accessories & Matting', slug: 'other-accessories', description: 'Micro-woven extended desk pads, cable management trays, and anti-static toolkits', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80', sortOrder: 26, isActive: true, productCount: 18 }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard',
    slug: 'keychron-q1-pro-wireless-custom-mechanical-keyboard',
    sku: 'KB-KEY-Q1PRO-001',
    brand: INITIAL_BRANDS[0],
    category: INITIAL_CATEGORIES[0],
    shortDescription: '75% compact layout wireless custom mechanical keyboard crafted with a full CNC 6063 aluminum chassis and double-gasket acoustic mounting.',
    description: 'The Keychron Q1 Pro sets a benchmark for custom mechanical keyboards. Engineered with precision-machined 6063 aerospace aluminum, an acoustic double-gasket mount structure for deep typing resonance, south-facing RGB illumination, and hot-swappable 5-pin PCB sockets. Seamlessly switch between up to 3 devices via Broadcom Bluetooth 5.1 or plug in via USB Type-C with an ultra-responsive 1,000Hz polling rate.',
    basePrice: 17999,
    mrpPrice: 21999,
    discountPercentage: 18,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isDealOfTheDay: false,
    isNewArrival: false,
    isActive: true,
    warrantyInfo: '1 Year Manufacturer Warranty',
    ratingAverage: 4.9,
    ratingCount: 148,
    soldCount: 520,
    stock: 51,
    createdAt: '2026-07-01T00:00:00Z',
    images: [
      { id: 1, imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80', isPrimary: true, sortOrder: 1 },
      { id: 2, imageUrl: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80', isPrimary: false, sortOrder: 2 },
      { id: 3, imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=80', isPrimary: false, sortOrder: 3 }
    ],
    variants: [
      { id: 1, productId: 1, variantName: 'Carbon Black / Red Linear Switch', sku: 'KB-Q1PRO-BLK-RED', price: 17999, mrpPrice: 21999, attributes: { color: 'Carbon Black', switch: 'Keychron K Pro Red' }, isDefault: true, stock: 24 },
      { id: 2, productId: 1, variantName: 'Carbon Black / Brown Tactile Switch', sku: 'KB-Q1PRO-BLK-BRN', price: 17999, mrpPrice: 21999, attributes: { color: 'Carbon Black', switch: 'Keychron K Pro Brown' }, isDefault: false, stock: 18 },
      { id: 3, productId: 1, variantName: 'Silver Grey / Banana Tactile Switch', sku: 'KB-Q1PRO-SLV-BAN', price: 18499, mrpPrice: 22499, attributes: { color: 'Silver Grey', switch: 'Keychron K Pro Banana' }, isDefault: false, stock: 9 }
    ],
    specifications: [
      { fieldKey: 'switch_type', fieldName: 'Switch Mechanism', fieldValue: 'Keychron K Pro Red (Linear, 45gf Operating Force)', groupName: 'Hardware' },
      { fieldKey: 'layout', fieldName: 'Key Layout', fieldValue: '75% Compact (81 Keys with Programmable Knob)', groupName: 'Design' },
      { fieldKey: 'connection', fieldName: 'Connectivity', fieldValue: 'Tri-Mode (Bluetooth 5.1, 2.4GHz Wireless & Type-C Wired)', groupName: 'Connectivity' },
      { fieldKey: 'rgb', fieldName: 'Illumination', fieldValue: 'South-Facing Per-Key Dynamic RGB (22 Presets)', groupName: 'Lighting' },
      { fieldKey: 'polling_rate', fieldName: 'Polling Rate', fieldValue: '1000 Hz (Wired) / 90 Hz (Bluetooth)', groupName: 'Performance' },
      { fieldKey: 'hot_swappable', fieldName: 'PCB Sockets', fieldValue: 'Hot-Swappable (Compatible with 3-Pin and 5-Pin MX Switches)', groupName: 'Hardware' }
    ]
  },
  {
    id: 2,
    name: 'Logitech G PRO X SUPERLIGHT 2 Wireless Gaming Mouse',
    slug: 'logitech-g-pro-x-superlight-2-wireless-gaming-mouse',
    sku: 'MS-LOG-GPX2-002',
    brand: INITIAL_BRANDS[1],
    category: INITIAL_CATEGORIES[1],
    shortDescription: 'Championship-grade 60g ultralight wireless gaming mouse featuring LIGHTFORCE hybrid optical-mechanical switches and HERO 2 sensor.',
    description: 'Designed in close collaboration with elite esports professionals, the PRO X SUPERLIGHT 2 represents the pinnacle of competitive mouse engineering. Packed with LIGHTFORCE optical-mechanical hybrid switches for instantaneous responsiveness, the ultra-precise HERO 2 optical sensor with sub-micron 32,000 DPI tracking, and a lightning-fast 2,000Hz polling rate via LIGHTSPEED wireless technology.',
    basePrice: 14495,
    mrpPrice: 16995,
    discountPercentage: 15,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isDealOfTheDay: true,
    isNewArrival: false,
    isActive: true,
    warrantyInfo: '2 Years Manufacturer Warranty',
    ratingAverage: 4.8,
    ratingCount: 312,
    soldCount: 1420,
    stock: 75,
    createdAt: '2026-07-05T00:00:00Z',
    images: [
      { id: 4, imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=80', isPrimary: true, sortOrder: 1 },
      { id: 5, imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80', isPrimary: false, sortOrder: 2 }
    ],
    variants: [
      { id: 4, productId: 2, variantName: 'Matte Black Edition', sku: 'MS-GPX2-BLK', price: 14495, mrpPrice: 16995, attributes: { color: 'Matte Black' }, isDefault: true, stock: 45 },
      { id: 5, productId: 2, variantName: 'Glacier White Edition', sku: 'MS-GPX2-WHT', price: 14495, mrpPrice: 16995, attributes: { color: 'White' }, isDefault: false, stock: 22 },
      { id: 6, productId: 2, variantName: 'Magenta Special Edition', sku: 'MS-GPX2-MGN', price: 14995, mrpPrice: 17495, attributes: { color: 'Magenta' }, isDefault: false, stock: 8 }
    ],
    specifications: [
      { fieldKey: 'max_dpi', fieldName: 'Sensor Resolution', fieldValue: '100 - 32,000 DPI (Configurable)', groupName: 'Sensor' },
      { fieldKey: 'sensor', fieldName: 'Optical Sensor', fieldValue: 'Logitech HERO 2 (Sub-Micron Precision)', groupName: 'Sensor' },
      { fieldKey: 'connection', fieldName: 'Connectivity', fieldValue: 'LIGHTSPEED 2.4GHz Wireless & USB-C Wired', groupName: 'Connectivity' },
      { fieldKey: 'polling_rate', fieldName: 'Report Rate', fieldValue: '2,000 Hz / 0.5 ms Latency', groupName: 'Performance' },
      { fieldKey: 'weight', fieldName: 'Chassis Weight', fieldValue: '60 grams (Ultra-Lightweight Design)', groupName: 'Physical' },
      { fieldKey: 'ergonomics', fieldName: 'Shape & Grip', fieldValue: 'Symmetrical Ergonomic Shell', groupName: 'Design' }
    ]
  },
  {
    id: 3,
    name: 'Samsung 990 PRO PCIe 4.0 NVMe M.2 SSD with Heatsink 2TB',
    slug: 'samsung-990-pro-nvme-m2-ssd-2tb-heatsink',
    sku: 'SSD-SAM-990P-2TB',
    brand: INITIAL_BRANDS[2],
    category: INITIAL_CATEGORIES[2],
    shortDescription: 'Ultimate PCIe 4.0 NVMe M.2 SSD delivering sequential read speeds up to 7,450 MB/s with advanced thermal heatsink cooling.',
    description: 'Unlock maximum throughput on PCIe Gen 4.0. Featuring in-house Samsung Pascal controller architecture and Nickel-coated thermal heatsink technology, the 990 PRO sustains sequential read/write speeds of up to 7,450 / 6,900 MB/s. Certified for high-end gaming desktop motherboards, content creation workstations, and Sony PlayStation 5 consoles.',
    basePrice: 16999,
    mrpPrice: 23999,
    discountPercentage: 29,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isDealOfTheDay: false,
    isNewArrival: false,
    isActive: true,
    warrantyInfo: '5 Years Manufacturer Warranty (1,200 TBW)',
    ratingAverage: 4.9,
    ratingCount: 520,
    soldCount: 2100,
    stock: 92,
    createdAt: '2026-06-20T00:00:00Z',
    images: [
      { id: 6, imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=80', isPrimary: true, sortOrder: 1 }
    ],
    variants: [
      { id: 7, productId: 3, variantName: '1TB Capacity with Heatsink', sku: 'SSD-990P-1TB-HS', price: 10499, mrpPrice: 14999, attributes: { capacity: '1TB', heatsink: 'Yes' }, isDefault: false, stock: 30 },
      { id: 8, productId: 3, variantName: '2TB Capacity with Heatsink', sku: 'SSD-990P-2TB-HS', price: 16999, mrpPrice: 23999, attributes: { capacity: '2TB', heatsink: 'Yes' }, isDefault: true, stock: 50 },
      { id: 9, productId: 3, variantName: '4TB Capacity with Heatsink', sku: 'SSD-990P-4TB-HS', price: 32999, mrpPrice: 44999, attributes: { capacity: '4TB', heatsink: 'Yes' }, isDefault: false, stock: 12 }
    ],
    specifications: [
      { fieldKey: 'capacity', fieldName: 'Usable Storage', fieldValue: '2TB (2,000 GB NVMe)', groupName: 'General' },
      { fieldKey: 'interface', fieldName: 'Host Interface', fieldValue: 'PCIe Gen 4.0 x4, NVMe 2.0 Protocol', groupName: 'Performance' },
      { fieldKey: 'form_factor', fieldName: 'Form Factor', fieldValue: 'M.2 2280 with Slim Aerodynamic Heatsink', groupName: 'Physical' },
      { fieldKey: 'read_speed', fieldName: 'Sequential Read', fieldValue: 'Up to 7,450 MB/s', groupName: 'Performance' },
      { fieldKey: 'write_speed', fieldName: 'Sequential Write', fieldValue: 'Up to 6,900 MB/s', groupName: 'Performance' },
      { fieldKey: 'nand_type', fieldName: 'Flash Architecture', fieldValue: 'Samsung 3D V-NAND TLC', groupName: 'Architecture' }
    ]
  },
  {
    id: 4,
    name: 'Corsair Vengeance RGB DDR5 32GB (2x16GB) 6000MHz CL30 RAM Kit',
    slug: 'corsair-vengeance-rgb-ddr5-32gb-6000mhz-cl30',
    sku: 'RAM-COR-DDR5-32G',
    brand: INITIAL_BRANDS[3],
    category: INITIAL_CATEGORIES[3],
    shortDescription: 'High-frequency DDR5-6000 desktop memory featuring low CL30 latency, aluminum heatspreaders, and ten-zone addressable RGB.',
    description: 'Maximize your system memory bandwidth with CORSAIR VENGEANCE RGB DDR5. Engineered with hand-sorted high-frequency memory ICs for tight CL30-36-36 timings, onboard voltage regulation for fine overclocking, and dynamic ten-zone per-module RGB lighting customizable through CORSAIR iCUE software.',
    basePrice: 10999,
    mrpPrice: 14500,
    discountPercentage: 24,
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isDealOfTheDay: false,
    isNewArrival: false,
    isActive: true,
    warrantyInfo: 'Limited Lifetime Manufacturer Warranty',
    ratingAverage: 4.8,
    ratingCount: 230,
    soldCount: 890,
    stock: 62,
    createdAt: '2026-06-25T00:00:00Z',
    images: [
      { id: 7, imageUrl: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=1200&q=80', isPrimary: true, sortOrder: 1 }
    ],
    variants: [
      { id: 10, productId: 4, variantName: '32GB (2x16GB) 6000MHz CL30 Black', sku: 'RAM-VEN-RGB-32-BLK', price: 10999, mrpPrice: 14500, attributes: { capacity: '32GB', speed: '6000MHz', color: 'Black' }, isDefault: true, stock: 38 },
      { id: 11, productId: 4, variantName: '32GB (2x16GB) 6000MHz CL30 White', sku: 'RAM-VEN-RGB-32-WHT', price: 11499, mrpPrice: 14999, attributes: { capacity: '32GB', speed: '6000MHz', color: 'White' }, isDefault: false, stock: 15 },
      { id: 12, productId: 4, variantName: '64GB (2x32GB) 6000MHz CL30 Black', sku: 'RAM-VEN-RGB-64-BLK', price: 20999, mrpPrice: 26999, attributes: { capacity: '64GB', speed: '6000MHz', color: 'Black' }, isDefault: false, stock: 9 }
    ],
    specifications: [
      { fieldKey: 'capacity', fieldName: 'Kit Configuration', fieldValue: '32GB (2 x 16GB Dual-Channel Kit)', groupName: 'General' },
      { fieldKey: 'speed', fieldName: 'Rated Frequency', fieldValue: 'DDR5-6000 MHz (PC5-48000)', groupName: 'Performance' },
      { fieldKey: 'type', fieldName: 'Memory Standard', fieldValue: '288-Pin DDR5 SDRAM', groupName: 'General' },
      { fieldKey: 'cas_latency', fieldName: 'Tested Timings', fieldValue: 'CL30-36-36-76 (1.35V)', groupName: 'Timing' },
      { fieldKey: 'rgb', fieldName: 'Lighting Zones', fieldValue: 'Individually Addressable 10-Zone RGB', groupName: 'Lighting' }
    ]
  },
  {
    id: 5,
    name: 'ASUS ROG Swift OLED PG27AQDM 27-inch 1440p 240Hz Gaming Monitor',
    slug: 'asus-rog-swift-oled-pg27aqdm-27-inch-240hz',
    sku: 'MON-ASUS-PG27AQDM',
    brand: INITIAL_BRANDS[4],
    category: INITIAL_CATEGORIES[4],
    shortDescription: '27-inch QHD OLED display featuring 240Hz refresh rate, 0.03ms response time, 1000-nit peak HDR brightness, and custom heatsink thermal dissipation.',
    description: 'Experience unparalleled motion clarity with the ROG Swift OLED PG27AQDM. Engineered with a 26.5-inch 1440p OLED panel running at a native 240Hz refresh rate and an instantaneous 0.03ms GTG response time. Built with an intelligent custom heatsink architecture to prevent panel burn-in and deliver 99% DCI-P3 cinematic color accuracy.',
    basePrice: 78999,
    mrpPrice: 99999,
    discountPercentage: 21,
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isDealOfTheDay: false,
    isNewArrival: true,
    isActive: true,
    warrantyInfo: '3 Years Manufacturer Warranty with Panel Coverage',
    ratingAverage: 4.9,
    ratingCount: 87,
    soldCount: 180,
    stock: 14,
    createdAt: '2026-07-15T00:00:00Z',
    images: [
      { id: 8, imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80', isPrimary: true, sortOrder: 1 }
    ],
    variants: [
      { id: 13, productId: 5, variantName: '27-inch 240Hz QHD OLED Standard', sku: 'MON-PG27AQDM-STD', price: 78999, mrpPrice: 99999, attributes: { size: '27-inch', panel: 'OLED', refresh: '240Hz' }, isDefault: true, stock: 14 }
    ],
    specifications: [
      { fieldKey: 'screen_size', fieldName: 'Display Diagonal', fieldValue: '26.5 Inches (67.3 cm)', groupName: 'Display' },
      { fieldKey: 'resolution', fieldName: 'Native Resolution', fieldValue: '2560 x 1440 Pixels (QHD 2K)', groupName: 'Display' },
      { fieldKey: 'refresh_rate', fieldName: 'Refresh Rate', fieldValue: '240 Hz Native', groupName: 'Performance' },
      { fieldKey: 'panel_type', fieldName: 'Panel Technology', fieldValue: 'Micro-OLED with Anti-Glare Micro-Texture Coating', groupName: 'Display' },
      { fieldKey: 'response_time', fieldName: 'Response Time', fieldValue: '0.03 ms Gray-to-Gray (GTG)', groupName: 'Performance' },
      { fieldKey: 'hdr', fieldName: 'High Dynamic Range', fieldValue: 'HDR10 with 1,000 Nits Peak Brightness', groupName: 'Display' }
    ]
  },
  {
    id: 6,
    name: 'AMD Ryzen 7 7800X3D 8-Core 16-Thread Desktop Processor',
    slug: 'amd-ryzen-7-7800x3d-processor',
    sku: 'CPU-AMD-7800X3D',
    brand: INITIAL_BRANDS[5],
    category: INITIAL_CATEGORIES[5],
    shortDescription: 'The flagship gaming processor powered by AMD 3D V-Cache packaging, 104MB ultra-low latency cache, and 5.0 GHz boost on Socket AM5.',
    description: 'The world’s premier gaming processor. Leveraging 2nd-generation AMD 3D V-Cache stacking technology, the Ryzen 7 7800X3D delivers groundbreaking framerates and frametime consistency across modern simulation and competitive gaming titles. Built on the 5nm Zen 4 architecture with 120W TDP thermal efficiency.',
    basePrice: 37999,
    mrpPrice: 46999,
    discountPercentage: 19,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isDealOfTheDay: false,
    isNewArrival: false,
    isActive: true,
    warrantyInfo: '3 Years Manufacturer Boxed Warranty',
    ratingAverage: 5.0,
    ratingCount: 420,
    soldCount: 1850,
    stock: 28,
    createdAt: '2026-06-10T00:00:00Z',
    images: [
      { id: 9, imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=80', isPrimary: true, sortOrder: 1 }
    ],
    variants: [
      { id: 14, productId: 6, variantName: 'AMD Ryzen 7 7800X3D Boxed Edition', sku: 'CPU-7800X3D-BOX', price: 37999, mrpPrice: 46999, attributes: { socket: 'AM5' }, isDefault: true, stock: 28 }
    ],
    specifications: [
      { fieldKey: 'brand_name', fieldName: 'Processor Manufacturer', fieldValue: 'AMD (Advanced Micro Devices)', groupName: 'General' },
      { fieldKey: 'socket', fieldName: 'CPU Socket', fieldValue: 'Socket AM5 (LGA 1718)', groupName: 'Compatibility' },
      { fieldKey: 'cores', fieldName: 'Core / Thread Count', fieldValue: '8 Performance Cores / 16 Threads', groupName: 'Performance' },
      { fieldKey: 'base_clock', fieldName: 'Clock Frequency', fieldValue: '4.2 GHz Base / 5.0 GHz Max Boost', groupName: 'Performance' },
      { fieldKey: 'tdp', fieldName: 'Thermal Design Power', fieldValue: '120 Watts (TDP)', groupName: 'Power' }
    ]
  },
  {
    id: 7,
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    slug: 'sony-wh-1000xm5-wireless-noise-cancelling-headphones',
    sku: 'HP-SONY-XM5-001',
    brand: INITIAL_BRANDS[6],
    category: INITIAL_CATEGORIES[6],
    shortDescription: 'Flagship active noise-canceling headphones powered by dual V1/QN1 processors, 8 microphones, and 30-hour battery life.',
    description: 'Equipped with two dedicated processors controlling eight beamforming microphones, Auto NC Optimizer for environment-adaptive noise cancellation, and a lightweight carbon-fiber composite driver unit, the WH-1000XM5 delivers pristine Hi-Res Audio wireless reproduction over Sony LDAC.',
    basePrice: 28990,
    mrpPrice: 34990,
    discountPercentage: 17,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isDealOfTheDay: false,
    isNewArrival: false,
    isActive: true,
    warrantyInfo: '1 Year Manufacturer Warranty',
    ratingAverage: 4.7,
    ratingCount: 850,
    soldCount: 3200,
    stock: 66,
    createdAt: '2026-06-15T00:00:00Z',
    images: [
      { id: 10, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80', isPrimary: true, sortOrder: 1 }
    ],
    variants: [
      { id: 15, productId: 7, variantName: 'Midnight Black Edition', sku: 'HP-XM5-BLK', price: 28990, mrpPrice: 34990, attributes: { color: 'Midnight Black' }, isDefault: true, stock: 40 },
      { id: 16, productId: 7, variantName: 'Platinum Silver Edition', sku: 'HP-XM5-SLV', price: 28990, mrpPrice: 34990, attributes: { color: 'Silver' }, isDefault: false, stock: 18 },
      { id: 17, productId: 7, variantName: 'Smoky Pink Edition', sku: 'HP-XM5-PNK', price: 29990, mrpPrice: 34990, attributes: { color: 'Smoky Pink' }, isDefault: false, stock: 8 }
    ],
    specifications: [
      { fieldKey: 'type', fieldName: 'Acoustic Structure', fieldValue: 'Closed-Back Over-Ear Wireless ANC', groupName: 'Design' },
      { fieldKey: 'connection', fieldName: 'Wireless Codecs', fieldValue: 'Bluetooth 5.2 / LDAC / AAC / SBC / 3.5mm Aux', groupName: 'Connectivity' },
      { fieldKey: 'noise_cancellation', fieldName: 'Active NC Engine', fieldValue: 'Integrated Processor V1 + HD Noise Cancelling QN1', groupName: 'Audio' },
      { fieldKey: 'battery_life', fieldName: 'Battery Endurance', fieldValue: '30 Hours (ANC Active) / 40 Hours (ANC Off)', groupName: 'Power' }
    ]
  },
  {
    id: 8,
    name: 'TP-Link Archer AXE75 AXE5400 Tri-Band Gigabit Wi-Fi 6E Router',
    slug: 'tp-link-archer-axe75-tri-band-wifi-6e-router',
    sku: 'NET-TPL-AXE75',
    brand: INITIAL_BRANDS[7],
    category: INITIAL_CATEGORIES[7],
    shortDescription: 'Tri-Band Wi-Fi 6E router with speeds up to 5,400 Mbps, 6GHz ultra-clean band, 1.7 GHz quad-core processor, and gigabit WAN/LAN ports.',
    description: 'Experience interference-free networking with the Archer AXE75. Utilizing the dedicated 6GHz frequency band, six external high-gain beamforming antennas, and OFDMA + MU-MIMO technology to handle simultaneous 4K/8K media streaming and low-latency gaming across 200+ connected devices.',
    basePrice: 11999,
    mrpPrice: 16999,
    discountPercentage: 29,
    isFeatured: false,
    isTrending: false,
    isBestSeller: true,
    isDealOfTheDay: true,
    isNewArrival: true,
    isActive: true,
    warrantyInfo: '3 Years Manufacturer Replacement Warranty',
    ratingAverage: 4.6,
    ratingCount: 92,
    soldCount: 430,
    stock: 25,
    createdAt: '2026-07-20T00:00:00Z',
    images: [
      { id: 11, imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80', isPrimary: true, sortOrder: 1 }
    ],
    variants: [
      { id: 18, productId: 8, variantName: 'AXE5400 Tri-Band Standard Edition', sku: 'NET-AXE75-STD', price: 11999, mrpPrice: 16999, attributes: { bands: 'Tri-Band 6GHz + 5GHz + 2.4GHz' }, isDefault: true, stock: 25 }
    ],
    specifications: [
      { fieldKey: 'wireless_speed', fieldName: 'Aggregated Speed', fieldValue: '5400 Mbps (2402 Mbps 6GHz + 2402 Mbps 5GHz + 574 Mbps 2.4GHz)', groupName: 'Performance' },
      { fieldKey: 'antennas', fieldName: 'Antenna Array', fieldValue: '6 High-Gain External Beamforming Antennas', groupName: 'Hardware' },
      { fieldKey: 'ports', fieldName: 'Physical Ports', fieldValue: '1x Gigabit WAN + 4x Gigabit LAN + 1x USB 3.0 Port', groupName: 'Connectivity' }
    ]
  },
  {
    id: 9,
    name: 'WD Blue 500GB Internal Desktop Hard Drive (WD5000AZRZ)',
    slug: 'wd-blue-500gb-internal-desktop-hard-drive-wd5000azrz',
    sku: 'HDD-WD-500GB-AZRZ',
    brand: INITIAL_BRANDS[9],
    category: INITIAL_CATEGORIES[2],
    shortDescription: 'WD Blue 500GB 3.5-inch internal desktop hard drive featuring SATA 6Gb/s interface, 64MB cache and 5400 RPM class performance.',
    description: 'WD Blue 500GB Internal Desktop Hard Drive is designed to provide reliable storage for desktop computers. With 500GB capacity, it offers ample space for storing documents, photos, videos, applications and other important data.\n\nThe drive features a SATA 6Gb/s interface, 64MB cache and 5400 RPM class rotational speed, making it suitable for everyday desktop storage requirements. Its 3.5-inch form factor is designed for compatible desktop PC systems.',
    basePrice: 1899,
    mrpPrice: 2999,
    discountPercentage: 36,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isDealOfTheDay: false,
    isNewArrival: true,
    isActive: true,
    warrantyInfo: '2 Years Manufacturer Warranty',
    ratingAverage: 4.7,
    ratingCount: 148,
    soldCount: 640,
    stock: 45,
    createdAt: '2026-08-20T00:00:00Z',
    images: [
      { id: 12, imageUrl: '/products/wd-blue-500gb-front.png', isPrimary: true, sortOrder: 1 },
      { id: 13, imageUrl: '/products/wd-blue-500gb-back.png', isPrimary: false, sortOrder: 2 }
    ],
    variants: [
      { id: 19, productId: 9, variantName: '500GB SATA 3.5" Desktop HDD', sku: 'HDD-WD-500GB-AZRZ', price: 1899, mrpPrice: 2999, attributes: { capacity: '500GB', rpm: '5400 RPM' }, isDefault: true, stock: 45 }
    ],
    specifications: [
      { fieldKey: 'brand', fieldName: 'Brand', fieldValue: 'Western Digital (WD)', groupName: 'General' },
      { fieldKey: 'series', fieldName: 'Product Series', fieldValue: 'WD Blue', groupName: 'General' },
      { fieldKey: 'model', fieldName: 'Model Number', fieldValue: 'WD5000AZRZ', groupName: 'General' },
      { fieldKey: 'capacity', fieldName: 'Storage Capacity', fieldValue: '500GB', groupName: 'Storage' },
      { fieldKey: 'form_factor', fieldName: 'Form Factor', fieldValue: '3.5 Inch – Desktop Internal HDD', groupName: 'Physical' },
      { fieldKey: 'interface', fieldName: 'Interface', fieldValue: 'SATA 6Gb/s', groupName: 'Performance' },
      { fieldKey: 'cache', fieldName: 'Cache Memory', fieldValue: '64MB', groupName: 'Performance' },
      { fieldKey: 'speed', fieldName: 'Speed', fieldValue: '5400 RPM Class', groupName: 'Performance' },
      { fieldKey: 'type', fieldName: 'Product Type', fieldValue: 'Internal Hard Disk Drive (HDD)', groupName: 'Technical' },
      { fieldKey: 'compatibility', fieldName: 'Compatibility', fieldValue: 'Desktop PC / Computer & Storage Upgrade', groupName: 'General' }
    ]
  },
  {
    id: 10,
    name: 'WD Blue 1TB Internal Desktop Hard Drive 7200 RPM (WD10EZEX)',
    slug: 'wd-blue-1tb-internal-desktop-hard-drive-7200rpm-wd10ezex',
    sku: 'HDD-WD-1TB-EZEX',
    brand: INITIAL_BRANDS[9],
    category: INITIAL_CATEGORIES[2],
    shortDescription: 'WD Blue 1TB 3.5-inch Internal Desktop Hard Drive with SATA interface, 64MB cache and 7200 RPM Class performance for high-speed storage.',
    description: 'WD Blue 1TB Internal Desktop Hard Drive is a reliable storage solution designed for desktop computers. With 1TB of storage capacity, it provides sufficient space for storing documents, photos, videos, software, games and other important data.\n\nFeaturing 64MB cache and 7200 RPM Class performance, this hard drive is suitable for everyday desktop computing and storage requirements. Its 3.5-inch form factor makes it compatible with desktop PC systems that support standard 3.5-inch internal drives.',
    basePrice: 3499,
    mrpPrice: 4999,
    discountPercentage: 30,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isDealOfTheDay: true,
    isNewArrival: true,
    isActive: true,
    warrantyInfo: '2 Years Manufacturer Warranty',
    ratingAverage: 4.8,
    ratingCount: 380,
    soldCount: 1250,
    stock: 60,
    createdAt: '2026-08-20T00:00:00Z',
    images: [
      { id: 14, imageUrl: '/products/wd-blue-1tb-front.png', isPrimary: true, sortOrder: 1 },
      { id: 15, imageUrl: '/products/wd-blue-1tb-back.png', isPrimary: false, sortOrder: 2 }
    ],
    variants: [
      { id: 20, productId: 10, variantName: '1TB 7200 RPM 3.5" Desktop HDD', sku: 'HDD-WD-1TB-EZEX', price: 3499, mrpPrice: 4999, attributes: { capacity: '1TB', rpm: '7200 RPM' }, isDefault: true, stock: 60 }
    ],
    specifications: [
      { fieldKey: 'brand', fieldName: 'Brand', fieldValue: 'Western Digital (WD)', groupName: 'General' },
      { fieldKey: 'series', fieldName: 'Product Series', fieldValue: 'WD Blue', groupName: 'General' },
      { fieldKey: 'model', fieldName: 'Model Number', fieldValue: 'WD10EZEX', groupName: 'General' },
      { fieldKey: 'capacity', fieldName: 'Storage Capacity', fieldValue: '1TB (1,000 GB)', groupName: 'Storage' },
      { fieldKey: 'form_factor', fieldName: 'Form Factor', fieldValue: '3.5 Inch', groupName: 'Physical' },
      { fieldKey: 'interface', fieldName: 'Interface', fieldValue: 'SATA 6Gb/s', groupName: 'Performance' },
      { fieldKey: 'cache', fieldName: 'Cache Memory', fieldValue: '64MB', groupName: 'Performance' },
      { fieldKey: 'speed', fieldName: 'Speed', fieldValue: '7200 RPM Class', groupName: 'Performance' },
      { fieldKey: 'type', fieldName: 'Drive Technology', fieldValue: 'Internal Mechanical Hard Disk Drive (HDD)', groupName: 'Technical' },
      { fieldKey: 'compatibility', fieldName: 'Compatibility', fieldValue: 'Desktop PC / Computer / Storage & Backup', groupName: 'General' }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 1,
    code: 'DATANEX10',
    title: '10% Welcome Discount',
    description: 'Enjoy an instant 10% discount on electronics orders above ₹2,000',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    minOrderValue: 2000,
    maxDiscountAmount: 2000,
    isActive: true,
    expiryDate: '2027-12-31'
  },
  {
    id: 2,
    code: 'DATANEX500',
    title: 'Flat ₹500 Hardware Savings',
    description: 'Apply flat ₹500 discount on cart value above ₹4,999',
    discountType: 'FIXED',
    discountValue: 500,
    minOrderValue: 4999,
    maxDiscountAmount: 500,
    isActive: true,
    expiryDate: '2027-12-31'
  },
  {
    id: 3,
    code: 'DATANEXVIP',
    title: '15% Component Upgrade Offer',
    description: 'Save up to ₹3,500 on Processors, NVMe SSDs, and Custom Keyboards',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minOrderValue: 10000,
    maxDiscountAmount: 3500,
    isActive: true,
    expiryDate: '2027-06-30'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    productId: 1,
    userId: 2,
    userName: 'Rohan Sharma',
    rating: 5,
    title: 'Flawless CNC Machining & Rich Acoustic Resonance',
    comment: 'The solid CNC aluminum chassis provides incredible desktop stability. The double-gasket acoustics deliver a deep, satisfying tactile thock right out of the box. Verified dispatch and tracking was provided promptly on WhatsApp.',
    isVerifiedPurchase: true,
    isApproved: true,
    createdAt: '2026-07-28T14:30:00Z',
    likesCount: 28
  },
  {
    id: 2,
    productId: 2,
    userId: 3,
    userName: 'Vikramaditya Nair',
    rating: 5,
    title: '60g Featherweight Shell with Pinpoint 2000Hz Tracking',
    comment: 'Upgraded from the original Superlight. The LIGHTFORCE optical-mechanical hybrid switches are instant, and the 2,000Hz polling rate delivers noticeably smoother tracking in competitive FPS titles.',
    isVerifiedPurchase: true,
    isApproved: true,
    createdAt: '2026-08-02T09:15:00Z',
    likesCount: 21
  },
  {
    id: 3,
    productId: 3,
    userId: 4,
    userName: 'Sameer Verma',
    rating: 5,
    title: 'Sustained 7,450 MB/s Speeds Under Continuous Heavy Load',
    comment: 'Installed in my 4K video editing workstation rig. The heatsink keeps temperatures under 54°C during continuous heavy ProRes rendering without thermal throttling. Exceptional build quality.',
    isVerifiedPurchase: true,
    isApproved: true,
    createdAt: '2026-08-10T18:00:00Z',
    likesCount: 42
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: 'DNX-2026-89412',
    userId: 2,
    customerName: 'Rohan Sharma',
    customerEmail: 'customer@datanexstore.in',
    customerPhone: '+91 9911371218',
    status: 'DELIVERED',
    subtotal: 17999,
    discountAmount: 1500,
    couponCode: 'DATANEX10',
    shippingCharge: 0,
    taxAmount: 2969.82,
    totalAmount: 16499,
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Rohan Sharma',
      phone: '+91 9911371218',
      addressLine1: 'Flat 402, Skyline Residency, Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      country: 'India',
      addressType: 'HOME',
      isDefault: true
    },
    billingAddress: {
      id: 'addr-1',
      fullName: 'Rohan Sharma',
      phone: '+91 9911371218',
      addressLine1: 'Flat 402, Skyline Residency, Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      country: 'India',
      addressType: 'HOME'
    },
    payment: {
      id: 'pay_wa_9821738',
      paymentMethod: 'WHATSAPP_PAYMENT',
      amount: 16499,
      currency: 'INR',
      status: 'SUCCESS',
      paidAt: '2026-08-01T12:04:22Z'
    },
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard',
        variantName: 'Carbon Black / Red Linear Switch',
        sku: 'KB-Q1PRO-BLK-RED',
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=300&q=80',
        unitPrice: 17999,
        quantity: 1,
        totalPrice: 17999
      }
    ],
    courierName: 'Blue Dart Air Express',
    trackingNumber: 'BLUEDART-882941029',
    trackingUrl: 'https://www.bluedart.com',
    whatsappConfirmed: true,
    whatsappConfirmedAt: '2026-08-01T12:10:00Z',
    deliveredAt: '2026-08-04T15:20:00Z',
    createdAt: '2026-08-01T12:00:00Z',
    updatedAt: '2026-08-04T15:20:00Z'
  },
  {
    id: 2,
    orderNumber: 'DNX-2026-90145',
    userId: 2,
    customerName: 'Vikramaditya Nair',
    customerEmail: 'customer@datanexstore.in',
    customerPhone: '+91 9911371218',
    status: 'SHIPPED',
    subtotal: 31494,
    discountAmount: 3000,
    couponCode: 'DATANEXVIP',
    shippingCharge: 0,
    taxAmount: 5128.92,
    totalAmount: 28494,
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Vikramaditya Nair',
      phone: '+91 9911371218',
      addressLine1: 'Flat 402, Skyline Residency, Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      country: 'India',
      addressType: 'HOME',
      isDefault: true
    },
    billingAddress: {
      id: 'addr-1',
      fullName: 'Vikramaditya Nair',
      phone: '+91 9911371218',
      addressLine1: 'Flat 402, Skyline Residency, Outer Ring Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560103',
      country: 'India',
      addressType: 'HOME'
    },
    payment: {
      id: 'pay_wa_9821890',
      paymentMethod: 'WHATSAPP_PAYMENT',
      amount: 28494,
      currency: 'INR',
      status: 'SUCCESS',
      paidAt: '2026-08-15T10:11:00Z'
    },
    items: [
      {
        id: 2,
        productId: 2,
        productName: 'Logitech G PRO X SUPERLIGHT 2 Wireless Gaming Mouse',
        variantName: 'Matte Black Edition',
        sku: 'MS-GPX2-BLK',
        imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=300&q=80',
        unitPrice: 14495,
        quantity: 1,
        totalPrice: 14495
      },
      {
        id: 3,
        productId: 3,
        productName: 'Samsung 990 PRO PCIe 4.0 NVMe M.2 SSD 2TB',
        variantName: '2TB Capacity with Heatsink',
        sku: 'SSD-990P-2TB-HS',
        imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=300&q=80',
        unitPrice: 16999,
        quantity: 1,
        totalPrice: 16999
      }
    ],
    courierName: 'Blue Dart Air Express',
    trackingNumber: 'BLUEDART-993821094',
    trackingUrl: 'https://www.bluedart.com',
    whatsappConfirmed: true,
    whatsappConfirmedAt: '2026-08-15T10:20:00Z',
    estimatedDelivery: '2026-08-19T18:00:00Z',
    createdAt: '2026-08-15T10:05:00Z',
    updatedAt: '2026-08-16T11:00:00Z'
  }
];

export const INITIAL_ADMIN_STATS: AdminDashboardStats = {
  totalRevenue: 3485000,
  todayRevenue: 248900,
  totalOrders: 218,
  pendingOrders: 8,
  totalCustomers: 1540,
  totalProducts: 26,
  lowStockCount: 3,
  outOfStockCount: 0,
  revenueHistory: [
    { date: '12 Aug', revenue: 340000, orders: 22 },
    { date: '13 Aug', revenue: 290000, orders: 19 },
    { date: '14 Aug', revenue: 410000, orders: 28 },
    { date: '15 Aug', revenue: 580000, orders: 36 },
    { date: '16 Aug', revenue: 480000, orders: 31 },
    { date: '17 Aug', revenue: 635900, orders: 42 },
    { date: '18 Aug', revenue: 749000, orders: 48 }
  ],
  categorySales: [
    { category: 'Keyboards', value: 1120000, count: 58 },
    { category: 'NVMe SSDs', value: 920000, count: 64 },
    { category: 'Gaming Monitors', value: 780000, count: 12 },
    { category: 'Gaming Mice', value: 510000, count: 44 },
    { category: 'Desktop CPUs', value: 385000, count: 10 }
  ],
  topSellingProducts: [
    { id: 6, name: 'AMD Ryzen 7 7800X3D Desktop Processor', soldCount: 950, revenue: 36099050 },
    { id: 2, name: 'Logitech G PRO X SUPERLIGHT 2', soldCount: 1620, revenue: 2348190 },
    { id: 3, name: 'Samsung 990 PRO 2TB NVMe SSD', soldCount: 1350, revenue: 2294865 },
    { id: 1, name: 'Keychron Q1 Pro Wireless Keyboard', soldCount: 680, revenue: 12239320 }
  ]
};
