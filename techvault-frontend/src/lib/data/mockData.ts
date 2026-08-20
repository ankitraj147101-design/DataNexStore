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
    name: 'Hard Disk Drives (HDD)',
    slug: 'hdd',
    description: 'Genuine Western Digital internal 3.5-inch desktop hard drives for mass storage, video archiving, and reliable backups',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
    sortOrder: 1,
    isActive: true,
    productCount: 5,
    specFields: [
      { id: 1, fieldName: 'Capacity', fieldKey: 'capacity', fieldType: 'select', isFilterable: true, sortOrder: 1, options: ['500GB', '1TB', '2TB', '3TB', '4TB'] },
      { id: 2, fieldName: 'Form Factor', fieldKey: 'form_factor', fieldType: 'select', isFilterable: true, sortOrder: 2, options: ['3.5 Inch'] },
      { id: 3, fieldName: 'Interface', fieldKey: 'interface', fieldType: 'select', isFilterable: true, sortOrder: 3, options: ['SATA', 'SATA 6Gb/s'] },
      { id: 4, fieldName: 'Cache', fieldKey: 'cache', fieldType: 'select', isFilterable: true, sortOrder: 4, options: ['64MB'] }
    ]
  },
  {
    id: 2,
    name: 'RAM (Memory)',
    slug: 'ram',
    description: 'High-speed DDR4 & DDR5 enthusiast RAM modules for desktop gaming PCs and workstation upgrades',
    imageUrl: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=600&q=80',
    sortOrder: 2,
    isActive: true,
    productCount: 0,
    specFields: [
      { id: 5, fieldName: 'Capacity', fieldKey: 'capacity', fieldType: 'select', isFilterable: true, sortOrder: 1, options: ['8GB', '16GB', '32GB', '64GB'] },
      { id: 6, fieldName: 'Memory Type', fieldKey: 'type', fieldType: 'select', isFilterable: true, sortOrder: 2, options: ['DDR5', 'DDR4', 'DDR3'] },
      { id: 7, fieldName: 'Speed', fieldKey: 'speed', fieldType: 'select', isFilterable: true, sortOrder: 3, options: ['3200MHz', '3600MHz', '5600MHz', '6000MHz'] }
    ]
  },
  {
    id: 3,
    name: 'Solid State Drives (SSD)',
    slug: 'ssd',
    description: 'Ultra-fast NVMe M.2 PCIe 4.0 and SATA III solid-state drives for high-performance computing',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=600&q=80',
    sortOrder: 3,
    isActive: true,
    productCount: 0,
    specFields: [
      { id: 8, fieldName: 'Capacity', fieldKey: 'capacity', fieldType: 'select', isFilterable: true, sortOrder: 1, options: ['256GB', '512GB', '1TB', '2TB', '4TB'] },
      { id: 9, fieldName: 'Interface', fieldKey: 'interface', fieldType: 'select', isFilterable: true, sortOrder: 2, options: ['PCIe 4.0 NVMe', 'PCIe 3.0 NVMe', 'SATA III 2.5"'] },
      { id: 10, fieldName: 'Form Factor', fieldKey: 'form_factor', fieldType: 'select', isFilterable: true, sortOrder: 3, options: ['M.2 2280', '2.5 Inch'] }
    ]
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'WD Blue 500GB Internal Desktop Hard Drive (WD5000AZRZ)',
    slug: 'wd-blue-500gb-internal-desktop-hard-drive-wd5000azrz',
    sku: 'HDD-WD-500GB-AZRZ',
    brand: INITIAL_BRANDS[9],
    category: INITIAL_CATEGORIES[0],
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
    category: INITIAL_CATEGORIES[0],
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
  },
  {
    id: 3,
    name: 'WD Green 2TB Internal Desktop Hard Drive (WD20EZRX)',
    slug: 'wd-green-2tb-internal-desktop-hard-drive-wd20ezrx',
    sku: 'HDD-WD-2TB-EZRX',
    brand: INITIAL_BRANDS[9],
    category: INITIAL_CATEGORIES[0],
    shortDescription: 'WD Green 2TB WD20EZRX 3.5-inch Internal Desktop Hard Drive with SATA interface and 64MB cache. Ideal for desktop PCs, high-capacity data storage, backups, photos, videos and everyday computing needs.',
    description: 'WD Green 2TB Internal Desktop Hard Drive provides high-capacity storage for desktop computers. With 2TB of storage, it offers plenty of space for storing documents, photos, videos, music, software, backups and other important files.\n\nThe drive features a SATA interface and 64MB cache, making it suitable for everyday desktop storage requirements. Its 3.5-inch form factor is designed for compatible desktop PC systems.',
    basePrice: 6499,
    mrpPrice: 8999,
    discountPercentage: 28,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isDealOfTheDay: false,
    isNewArrival: true,
    isActive: true,
    warrantyInfo: '2 Years Manufacturer Warranty',
    ratingAverage: 4.8,
    ratingCount: 210,
    soldCount: 890,
    stock: 50,
    createdAt: '2026-08-20T00:00:00Z',
    images: [
      { id: 5, imageUrl: '/products/wd-green-2tb-front.png', isPrimary: true, sortOrder: 1 },
      { id: 6, imageUrl: '/products/wd-green-2tb-back.png', isPrimary: false, sortOrder: 2 }
    ],
    variants: [
      { id: 3, productId: 3, variantName: '2TB SATA 3.5" Desktop HDD', sku: 'HDD-WD-2TB-EZRX', price: 6499, mrpPrice: 8999, attributes: { capacity: '2TB', cache: '64MB' }, isDefault: true, stock: 50 }
    ],
    specifications: [
      { fieldKey: 'brand', fieldName: 'Brand', fieldValue: 'Western Digital (WD)', groupName: 'General' },
      { fieldKey: 'series', fieldName: 'Product Series', fieldValue: 'WD Green', groupName: 'General' },
      { fieldKey: 'model', fieldName: 'Model Number', fieldValue: 'WD20EZRX', groupName: 'General' },
      { fieldKey: 'capacity', fieldName: 'Storage Capacity', fieldValue: '2TB (2,000 GB)', groupName: 'Storage' },
      { fieldKey: 'form_factor', fieldName: 'Form Factor', fieldValue: '3.5 Inch', groupName: 'Physical' },
      { fieldKey: 'interface', fieldName: 'Interface', fieldValue: 'SATA', groupName: 'Performance' },
      { fieldKey: 'cache', fieldName: 'Cache Memory', fieldValue: '64MB', groupName: 'Performance' },
      { fieldKey: 'type', fieldName: 'Drive Type', fieldValue: 'Internal Mechanical HDD', groupName: 'Technical' },
      { fieldKey: 'drive_tech', fieldName: 'Drive Technology', fieldValue: 'Mechanical Hard Disk', groupName: 'Technical' },
      { fieldKey: 'compatibility', fieldName: 'Compatibility', fieldValue: 'Desktop PC / Computer', groupName: 'General' },
      { fieldKey: 'ideal_for', fieldName: 'Ideal For', fieldValue: 'Data Storage, Backup, Documents, Photos, Videos & General Computing', groupName: 'Usage' }
    ]
  },
  {
    id: 4,
    name: 'WD Green 3TB Internal Desktop Hard Drive (WD30EZRX)',
    slug: 'wd-green-3tb-internal-desktop-hard-drive-wd30ezrx',
    sku: 'HDD-WD-3TB-EZRX',
    brand: INITIAL_BRANDS[9],
    category: INITIAL_CATEGORIES[2],
    shortDescription: 'WD Green 3TB WD30EZRX 3.5-inch Internal Desktop Hard Drive with SATA interface and 64MB cache. Ideal for desktop PCs, high-capacity storage, data backup, photos, videos and everyday computing needs.',
    description: 'WD Green 3TB Internal Desktop Hard Drive is designed to provide high-capacity storage for desktop computers. With 3TB of storage capacity, it provides ample space for storing large collections of documents, photos, videos, music, software, backups and other important files.\n\nThe drive features a SATA interface and 64MB cache, making it suitable for everyday desktop storage requirements. Its 3.5-inch form factor is designed for compatible desktop PC systems.',
    basePrice: 7499,
    mrpPrice: 10999,
    discountPercentage: 32,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isDealOfTheDay: true,
    isNewArrival: true,
    isActive: true,
    warrantyInfo: '2 Years Manufacturer Warranty',
    ratingAverage: 4.9,
    ratingCount: 320,
    soldCount: 1120,
    stock: 40,
    createdAt: '2026-08-20T00:00:00Z',
    images: [
      { id: 7, imageUrl: '/products/wd-green-3tb-front.png', isPrimary: true, sortOrder: 1 },
      { id: 8, imageUrl: '/products/wd-green-3tb-back.png', isPrimary: false, sortOrder: 2 }
    ],
    variants: [
      { id: 4, productId: 4, variantName: '3TB SATA 3.5" Desktop HDD', sku: 'HDD-WD-3TB-EZRX', price: 7499, mrpPrice: 10999, attributes: { capacity: '3TB', cache: '64MB' }, isDefault: true, stock: 40 }
    ],
    specifications: [
      { fieldKey: 'brand', fieldName: 'Brand', fieldValue: 'Western Digital (WD)', groupName: 'General' },
      { fieldKey: 'series', fieldName: 'Product Series', fieldValue: 'WD Green', groupName: 'General' },
      { fieldKey: 'model', fieldName: 'Model Number', fieldValue: 'WD30EZRX', groupName: 'General' },
      { fieldKey: 'capacity', fieldName: 'Storage Capacity', fieldValue: '3TB (3,000 GB)', groupName: 'Storage' },
      { fieldKey: 'form_factor', fieldName: 'Form Factor', fieldValue: '3.5 Inch', groupName: 'Physical' },
      { fieldKey: 'interface', fieldName: 'Interface', fieldValue: 'SATA', groupName: 'Performance' },
      { fieldKey: 'cache', fieldName: 'Cache Memory', fieldValue: '64MB', groupName: 'Performance' },
      { fieldKey: 'type', fieldName: 'Drive Type', fieldValue: 'Internal Mechanical HDD', groupName: 'Technical' },
      { fieldKey: 'drive_tech', fieldName: 'Drive Technology', fieldValue: 'Mechanical Hard Disk', groupName: 'Technical' },
      { fieldKey: 'compatibility', fieldName: 'Compatibility', fieldValue: 'Desktop PC / Computer', groupName: 'General' },
      { fieldKey: 'ideal_for', fieldName: 'Ideal For', fieldValue: 'Data Storage, Backup, Photos, Videos, Documents & General Computing', groupName: 'Usage' }
    ]
  },
  {
    id: 5,
    name: 'WD Green 4TB Internal Desktop Hard Drive (WD40EZRX)',
    slug: 'wd-green-4tb-internal-desktop-hard-drive-wd40ezrx',
    sku: 'HDD-WD-4TB-EZRX',
    brand: INITIAL_BRANDS[9],
    category: INITIAL_CATEGORIES[0],
    shortDescription: 'WD Green 4TB WD40EZRX 3.5-inch Internal Desktop Hard Drive with SATA interface and 64MB cache. Ideal for desktop PCs, high-capacity data storage, backups, photos, videos and media storage.',
    description: 'WD Green 4TB Internal Desktop Hard Drive is a high-capacity storage solution designed for compatible desktop computers. With 4TB of storage capacity, it provides plenty of space for large collections of photos, videos, documents, music, software, backups and other digital files.\n\nThe drive features a SATA interface and 64MB cache, making it suitable for general desktop storage and data backup requirements. Its 3.5-inch form factor is designed for compatible desktop PC systems.',
    basePrice: 9999,
    mrpPrice: 13999,
    discountPercentage: 29,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isDealOfTheDay: true,
    isNewArrival: true,
    isActive: true,
    warrantyInfo: '2 Years Manufacturer Warranty',
    ratingAverage: 4.9,
    ratingCount: 410,
    soldCount: 1450,
    stock: 35,
    createdAt: '2026-08-20T00:00:00Z',
    images: [
      { id: 9, imageUrl: '/products/wd-green-4tb-front.png', isPrimary: true, sortOrder: 1 },
      { id: 10, imageUrl: '/products/wd-green-4tb-back.png', isPrimary: false, sortOrder: 2 }
    ],
    variants: [
      { id: 5, productId: 5, variantName: '4TB SATA 3.5" Desktop HDD', sku: 'HDD-WD-4TB-EZRX', price: 9999, mrpPrice: 13999, attributes: { capacity: '4TB', cache: '64MB' }, isDefault: true, stock: 35 }
    ],
    specifications: [
      { fieldKey: 'brand', fieldName: 'Brand', fieldValue: 'Western Digital (WD)', groupName: 'General' },
      { fieldKey: 'series', fieldName: 'Product Series', fieldValue: 'WD Green', groupName: 'General' },
      { fieldKey: 'model', fieldName: 'Model Number', fieldValue: 'WD40EZRX', groupName: 'General' },
      { fieldKey: 'capacity', fieldName: 'Storage Capacity', fieldValue: '4TB (4,000 GB)', groupName: 'Storage' },
      { fieldKey: 'form_factor', fieldName: 'Form Factor', fieldValue: '3.5 Inch', groupName: 'Physical' },
      { fieldKey: 'interface', fieldName: 'Interface', fieldValue: 'SATA', groupName: 'Performance' },
      { fieldKey: 'cache', fieldName: 'Cache Memory', fieldValue: '64MB', groupName: 'Performance' },
      { fieldKey: 'type', fieldName: 'Drive Type', fieldValue: 'Internal Mechanical HDD', groupName: 'Technical' },
      { fieldKey: 'drive_tech', fieldName: 'Drive Technology', fieldValue: 'Mechanical Hard Disk', groupName: 'Technical' },
      { fieldKey: 'compatibility', fieldName: 'Compatibility', fieldValue: 'Desktop PC / Computer', groupName: 'General' },
      { fieldKey: 'ideal_for', fieldName: 'Ideal For', fieldValue: 'High-Capacity Storage, Data Backup, Photos, Videos, Documents & Media', groupName: 'Usage' }
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
    description: 'Special 15% discount on custom PC builds and premium hardware',
    discountType: 'PERCENTAGE',
    discountValue: 15,
    minOrderValue: 7999,
    maxDiscountAmount: 3000,
    isActive: true,
    expiryDate: '2027-12-31'
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
  },
  {
    id: 3,
    productId: 3,
    userId: 4,
    userName: 'Kunal Singhal',
    rating: 5,
    title: 'Silent & Reliable 2TB Storage for Desktop PC',
    comment: 'WD Green 2TB is whisper quiet and runs cool. Perfect for mass media storage and system backups. Great price from DataNexStore!',
    isVerifiedPurchase: true,
    isApproved: true,
    createdAt: '2026-08-19T11:20:00Z',
    likesCount: 19
  },
  {
    id: 4,
    productId: 4,
    userId: 5,
    userName: 'Manish Verma',
    rating: 5,
    title: 'Ample 3TB Capacity & 64MB Cache',
    comment: 'Installed the 3TB WD Green HDD in my workstation. Formatted instantly and transferring huge 4K video files smoothly.',
    isVerifiedPurchase: true,
    isApproved: true,
    createdAt: '2026-08-20T08:45:00Z',
    likesCount: 25
  },
  {
    id: 5,
    productId: 5,
    userId: 6,
    userName: 'Pradeep Chawla',
    rating: 5,
    title: 'Monster 4TB Storage for Video Editing & Backups',
    comment: 'Massive 4TB storage space for my RAW footage and backup archives. Works flawlessly on SATA with 64MB cache. Highly recommended!',
    isVerifiedPurchase: true,
    isApproved: true,
    createdAt: '2026-08-20T14:10:00Z',
    likesCount: 31
  }
];

export const INITIAL_ORDERS: Order[] = [];

export const INITIAL_ADMIN_STATS: AdminDashboardStats = {
  totalRevenue: 0,
  todayRevenue: 0,
  totalOrders: 0,
  pendingOrders: 0,
  totalCustomers: 0,
  totalProducts: 5,
  lowStockCount: 0,
  outOfStockCount: 0,
  revenueHistory: [
    { date: '15 Aug', revenue: 0, orders: 0 },
    { date: '16 Aug', revenue: 0, orders: 0 },
    { date: '17 Aug', revenue: 0, orders: 0 },
    { date: '18 Aug', revenue: 0, orders: 0 },
    { date: '19 Aug', revenue: 0, orders: 0 },
    { date: '20 Aug', revenue: 0, orders: 0 },
    { date: '21 Aug', revenue: 0, orders: 0 }
  ],
  categorySales: [
    { category: 'Hard Disk Drives (HDD)', value: 0, count: 5 }
  ],
  topSellingProducts: [
    { id: 5, name: 'WD Green 4TB Internal Desktop Hard Drive (WD40EZRX)', soldCount: 0, revenue: 0 },
    { id: 4, name: 'WD Green 3TB Internal Desktop Hard Drive (WD30EZRX)', soldCount: 0, revenue: 0 },
    { id: 3, name: 'WD Green 2TB Internal Desktop Hard Drive (WD20EZRX)', soldCount: 0, revenue: 0 },
    { id: 2, name: 'WD Blue 1TB Internal Desktop Hard Drive 7200 RPM (WD10EZEX)', soldCount: 0, revenue: 0 },
    { id: 1, name: 'WD Blue 500GB Internal Desktop Hard Drive (WD5000AZRZ)', soldCount: 0, revenue: 0 }
  ]
};
