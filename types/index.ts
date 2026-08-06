export interface Product {
  id: string | number;
  title: string;
  slug: string;
  price: number;
  formattedPrice: string;
  images: string[];
  description: string;
  category: string;
  inStock: boolean;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  sku?: string;
  availabilityStatus?: string;
  features?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}
