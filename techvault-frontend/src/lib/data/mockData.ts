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
      { id: 1, imageUrl: '/products/wd-blue-500gb-front.png', isPrimary: true, sortOrder: 1 },
      { id: 2, imageUrl: '/products/wd-blue-500gb-back.png', isPrimary: false, sortOrder: 2 }
    ],
    variants: [
      { id: 1, productId: 1, variantName: '500GB SATA 3.5" Desktop HDD', sku: 'HDD-WD-500GB-AZRZ', price: 1899, mrpPrice: 2999, attributes: { capacity: '500GB', rpm: '5400 RPM' }, isDefault: true, stock: 45 }
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
    id: 2,
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
      { id: 3, imageUrl: '/products/wd-blue-1tb-front.png', isPrimary: true, sortOrder: 1 },
      { id: 4, imageUrl: '/products/wd-blue-1tb-back.png', isPrimary: false, sortOrder: 2 }
    ],
    variants: [
      { id: 2, productId: 2, variantName: '1TB 7200 RPM 3.5" Desktop HDD', sku: 'HDD-WD-1TB-EZEX', price: 3499, mrpPrice: 4999, attributes: { capacity: '1TB', rpm: '7200 RPM' }, isDefault: true, stock: 60 }
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
    title: 'Reliable 500GB HDD for Office & Desktop Backup',
    comment: 'Authentic Western Digital WD Blue 500GB drive. Operates very quietly and reliably for storing office documents and software backups.',
    isVerifiedPurchase: true,
    isApproved: true,
    createdAt: '2026-08-15T14:30:00Z',
    likesCount: 28
  },
  {
    id: 2,
    productId: 2,
    userId: 3,
    userName: 'Vikramaditya Nair',
    rating: 5,
    title: 'High Speed 7200 RPM & Excellent Value',
    comment: 'Installed this 1TB WD Blue HDD as my secondary storage drive. 7200 RPM speed makes bulk file transfers and game installs quick.',
    isVerifiedPurchase: true,
    isApproved: true,
    createdAt: '2026-08-18T09:15:00Z',
    likesCount: 34
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
    subtotal: 3499,
    discountAmount: 0,
    couponCode: undefined,
    shippingCharge: 0,
    taxAmount: 629.82,
    totalAmount: 3499,
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
      amount: 3499,
      currency: 'INR',
      status: 'SUCCESS',
      paidAt: '2026-08-18T12:04:22Z'
    },
    items: [
      {
        id: 1,
        productId: 2,
        productName: 'WD Blue 1TB Internal Desktop Hard Drive 7200 RPM (WD10EZEX)',
        variantName: '1TB 7200 RPM 3.5" Desktop HDD',
        sku: 'HDD-WD-1TB-EZEX',
        imageUrl: '/products/wd-blue-1tb-front.png',
        unitPrice: 3499,
        quantity: 1,
        totalPrice: 3499
      }
    ],
    courierName: 'Blue Dart Air Express',
    trackingNumber: 'BLUEDART-882941029',
    trackingUrl: 'https://www.bluedart.com',
    whatsappConfirmed: true,
    whatsappConfirmedAt: '2026-08-18T12:10:00Z',
    deliveredAt: '2026-08-20T15:20:00Z',
    createdAt: '2026-08-18T12:00:00Z',
    updatedAt: '2026-08-20T15:20:00Z'
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
    { id: 2, name: 'WD Blue 1TB Internal Desktop Hard Drive 7200 RPM', soldCount: 1250, revenue: 4373750 },
    { id: 1, name: 'WD Blue 500GB Internal Desktop Hard Drive', soldCount: 640, revenue: 1215360 }
  ]
};
