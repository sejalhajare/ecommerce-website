export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  images: string[];
  features: string[];
  color: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  discountBadge?: string;
  deliveryDate: string;
}

export const CATEGORIES = ['Electronics', 'Audio', 'Wearables', 'Laptops', 'Cameras', 'Accessories'];
export const BRANDS = ['Apple', 'Sony', 'Samsung', 'Bose', 'Dell', 'Logitech', 'DJI'];
export const COLORS = ['Black', 'White', 'Silver', 'Blue', 'Red', 'Green'];

export const mockProducts: Product[] = [
  {
    id: 'p_1',
    name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
    description: 'Industry-leading noise cancellation optimized to you. Magnificent Sound, engineered to perfection. Crystal clear hands-free calling. Up to 30-hour battery life with quick charging.',
    price: 348.00,
    originalPrice: 398.00,
    category: 'Audio',
    brand: 'Sony',
    rating: 4.8,
    reviewsCount: 12450,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Industry leading noise cancellation', '30 hours battery life', 'Touch sensor controls'],
    color: 'Silver',
    isBestSeller: true,
    discountBadge: '13% OFF',
    deliveryDate: 'Tomorrow, by 10 PM'
  },
  {
    id: 'p_2',
    name: 'MacBook Pro 16-inch (M3 Max)',
    description: 'The most advanced Mac ever. Featuring the blazing fast M3 Max chip, up to 128GB of unified memory, and up to 22 hours of battery life.',
    price: 3499.00,
    category: 'Laptops',
    brand: 'Apple',
    rating: 4.9,
    reviewsCount: 3420,
    stock: 12,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Apple M3 Max chip', '16.2-inch Liquid Retina XDR display', 'Up to 22 hours battery'],
    color: 'Space Black',
    isTrending: true,
    deliveryDate: 'Wednesday'
  },
  {
    id: 'p_3',
    name: 'DJI Mini 4 Pro Drone',
    description: 'Mini 4 Pro is our most advanced mini-camera drone to date. It integrates powerful imaging capabilities, omnidirectional obstacle sensing, and ActiveTrack 360°.',
    price: 959.00,
    originalPrice: 1099.00,
    category: 'Cameras',
    brand: 'DJI',
    rating: 4.7,
    reviewsCount: 1890,
    stock: 8,
    images: [
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Under 249 g', '4K/60fps HDR True Vertical Shooting', 'Omnidirectional Obstacle Sensing'],
    color: 'Gray',
    isNewArrival: true,
    discountBadge: 'Save $140',
    deliveryDate: 'Thursday'
  },
  {
    id: 'p_4',
    name: 'Apple Watch Ultra 2',
    description: 'The most rugged and capable Apple Watch pushes the limits again. Featuring the all-new S9 SiP. A magical new way to use your watch without touching the screen.',
    price: 799.00,
    category: 'Wearables',
    brand: 'Apple',
    rating: 4.8,
    reviewsCount: 5670,
    stock: 150,
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Always-On Retina display', 'S9 SiP', 'Water resistant 100m'],
    color: 'Titanium',
    isTrending: true,
    deliveryDate: 'Tomorrow, by 8 PM'
  },
  {
    id: 'p_5',
    name: 'Logitech MX Master 3S',
    description: 'Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor.',
    price: 99.00,
    originalPrice: 109.00,
    category: 'Accessories',
    brand: 'Logitech',
    rating: 4.6,
    reviewsCount: 22000,
    stock: 200,
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Quiet Clicks', '8,000 DPI Sensor', 'MagSpeed Scrolling'],
    color: 'Graphite',
    isBestSeller: true,
    discountBadge: '9% OFF',
    deliveryDate: 'Friday'
  },
  {
    id: 'p_6',
    name: 'Bose Smart Soundbar 900',
    description: 'The most immersive Bose voice control soundbar yet. Two custom-engineered upfiring dipole speakers work with Bose technologies to make it feel as if sound is coming from every direction.',
    price: 749.00,
    originalPrice: 899.00,
    category: 'Audio',
    brand: 'Bose',
    rating: 4.5,
    reviewsCount: 1500,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800'
    ],
    features: ['Dolby Atmos', 'Built-in voice assistants', 'Wi-Fi & Bluetooth connectivity'],
    color: 'Black',
    discountBadge: '$150 OFF',
    deliveryDate: 'Next Week'
  }
];
