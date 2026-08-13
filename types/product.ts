/**
 * Product & Cart Type Definitions for WedgetStore Live Integration
 */

export interface ApiProduct {
  id: number | string;
  name?: string;
  name_ar?: string;
  name_en?: string;
  title?: string;
  title_en?: string;
  slug?: string;
  sku?: string;
  details?: string;
  details_en?: string;
  description?: string;
  description_en?: string;
  price?: number;
  unit_price?: number;
  discounted_price?: number;
  purchase_price?: number;
  current_stock?: number;
  category_id?: number | string;
  category_name?: string;
  category?: {
    id?: number | string;
    name?: string;
    name_ar?: string;
    name_en?: string;
  } | string;
  brand_id?: number | string;
  brand?: {
    id?: number | string;
    name?: string;
    name_ar?: string;
    name_en?: string;
    logo?: string;
  } | string;
  thumbnail?: string;
  thumbnail_full_url?: {
    key?: string;
    path?: string;
  };
  image?: string;
  image_full_url?: {
    key?: string;
    path?: string;
  };
  images?: (string | { path?: string })[];
  images_full_url?: {
    key?: string;
    path?: string;
  }[];
  rating?: number;
  rating_count?: number;
  reviews_count?: number;
}

export interface ApiProductsResponse {
  total_size?: number;
  limit?: number;
  offset?: number;
  products?: ApiProduct[];
  data?: ApiProduct[];
}

export interface ProductFetchParams {
  guest_id?: string;
  locale?: string;
  limit?: number;
  offset?: number;
  page?: number;
  category_id?: number | string;
  brand_id?: number | string;
  min_price?: number;
  max_price?: number;
  search?: string;
  sort_by?: 'latest' | 'price_low_high' | 'price_high_low' | 'rating' | 'bestseller';
}

export interface ProductBrand {
  id: number | string;
  name: string;
  logo?: string;
}

export interface Product {
  id: string | number;
  title: string;
  slug: string;
  sku: string;
  price: number;              // Final price after discount (discounted_price)
  originalPrice: number;       // Original unit price (unit_price)
  discountPercentage: number;  // Calculated discount percentage e.g. 20%
  hasDiscount: boolean;
  formattedPrice: string;      // e.g. "499 SAR" or "499 ر.س"
  formattedOriginalPrice?: string; 
  discountBadge?: string;      
  thumbnail: string;           
  images: string[];            
  description: string;
  category: string;
  categoryId?: number | string;
  brand: ProductBrand | string; 
  brandId?: number | string;   
  brandName: string;           
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

/**
 * Utility Mapper: Converts raw API Product JSON into standardized Product UI Model with dynamic locale title, description & currency
 */
export const mapApiProductToProduct = (rawInput: any): Product => {
  const lang = (process.client ? localStorage.getItem('aswar_lang') : 'ar') || 'ar'

  // Unwrap inner product object from any wrapper property (e.g. productFullInfo, product_full_info, product, product_details)
  const apiProd: ApiProduct = (
    rawInput?.productFullInfo || 
    rawInput?.product_full_info || 
    rawInput?.product || 
    rawInput?.product_details || 
    rawInput?.product_all_status || 
    rawInput?.details_product || 
    rawInput
  ) as ApiProduct

  if (!apiProd || typeof apiProd !== 'object') {
    return {
      id: Math.random().toString(36).substring(7),
      title: lang === 'en' ? 'Featured Product' : 'منتج مميز',
      slug: '',
      sku: '',
      price: 0,
      originalPrice: 0,
      discountPercentage: 0,
      hasDiscount: false,
      formattedPrice: lang === 'en' ? '0 SAR' : '0 ر.س',
      thumbnail: '/images/placeholder.png',
      images: [],
      description: '',
      category: lang === 'en' ? 'General' : 'عام',
      brand: '',
      brandName: '',
      inStock: true,
      stockCount: 5,
      rating: 0,
      reviewCount: 0
    }
  }

  // 1. Localized Title Extraction
  let prodTitle = ''
  if (lang === 'en') {
    prodTitle = (apiProd as any).name_en || (apiProd as any).title_en || (apiProd as any).en_name || apiProd.name || apiProd.title || 'Featured Product'
  } else {
    prodTitle = apiProd.name || (apiProd as any).name_ar || apiProd.title || (apiProd as any).title_ar || 'منتج مميز'
  }

  // 2. Localized Description Extraction
  let prodDesc = ''
  if (lang === 'en') {
    prodDesc = (apiProd as any).details_en || (apiProd as any).description_en || apiProd.details || apiProd.description || ''
  } else {
    prodDesc = apiProd.details || apiProd.description || (apiProd as any).details_ar || (apiProd as any).description_ar || ''
  }

  // 3. Image Path Extraction with Null Safety & Base URL normalization
  let imagePath = ''
  if (apiProd.thumbnail_full_url?.path && typeof apiProd.thumbnail_full_url.path === 'string') {
    imagePath = apiProd.thumbnail_full_url.path
  } else if (apiProd.image_full_url?.path && typeof apiProd.image_full_url.path === 'string') {
    imagePath = apiProd.image_full_url.path
  } else if (typeof apiProd.thumbnail === 'string' && apiProd.thumbnail) {
    imagePath = apiProd.thumbnail
  } else if (typeof apiProd.image === 'string' && apiProd.image) {
    imagePath = apiProd.image
  } else if (Array.isArray(apiProd.images_full_url) && apiProd.images_full_url.length > 0) {
    const valid = apiProd.images_full_url.find(i => i?.path && typeof i.path === 'string')
    if (valid?.path) imagePath = valid.path
  } else if (Array.isArray(apiProd.images) && apiProd.images.length > 0) {
    const valid = apiProd.images[0]
    if (typeof valid === 'string') imagePath = valid
    else if (typeof valid === 'object' && (valid as any)?.path) imagePath = (valid as any).path
  }

  if (imagePath && !imagePath.startsWith('http://') && !imagePath.startsWith('https://')) {
    imagePath = `https://wedgetstore.com/${imagePath.replace(/^\/+/, '')}`
  }

  if (!imagePath) {
    imagePath = '/images/placeholder.png'
  }

  // 4. Images Array
  const images = (apiProd.images_full_url || [])
    .map(img => img?.path)
    .filter((p): p is string => Boolean(p && typeof p === 'string'))
    .map(p => (p.startsWith('http://') || p.startsWith('https://')) ? p : `https://wedgetstore.com/${p.replace(/^\/+/, '')}`)

  if (images.length === 0) images.push(imagePath)

  // 5. Price Calculations
  const originalPrice = Number(apiProd.unit_price || apiProd.price || apiProd.purchase_price || apiProd.discounted_price) || 0
  const price = Number(apiProd.discounted_price || apiProd.price || apiProd.unit_price) || originalPrice
  const hasDiscount = originalPrice > price

  let discountPercentage = 0
  if (hasDiscount && originalPrice > 0) {
    discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  // 6. Category Extraction
  let categoryName = lang === 'en' ? 'General' : 'عام'
  let categoryId = apiProd.category_id

  if (typeof apiProd.category === 'object' && apiProd.category?.name) {
    categoryName = lang === 'en' ? (apiProd.category.name_en || apiProd.category.name) : apiProd.category.name
    if (apiProd.category.id) categoryId = apiProd.category.id
  } else if (typeof apiProd.category === 'string' && apiProd.category.trim() !== '') {
    categoryName = apiProd.category
  }

  // 7. Dynamic Brand Extraction
  let brandId = apiProd.brand_id
  if (!brandId && apiProd.brand && typeof apiProd.brand === 'object' && apiProd.brand?.id) {
    brandId = apiProd.brand.id
  }

  let brandNameStr = ''
  if (apiProd.brand && typeof apiProd.brand === 'object' && apiProd.brand?.name) {
    brandNameStr = lang === 'en' ? (apiProd.brand.name_en || apiProd.brand.name) : apiProd.brand.name
  } else if (typeof apiProd.brand === 'string' && apiProd.brand.trim() !== '') {
    brandNameStr = apiProd.brand.trim()
  } else if ((apiProd as any).brand_name && typeof (apiProd as any).brand_name === 'string') {
    brandNameStr = (apiProd as any).brand_name.trim()
  }

  if (!brandNameStr && categoryName && categoryName !== 'عام' && categoryName !== 'General') {
    brandNameStr = categoryName
  }

  const brandObj: ProductBrand = {
    id: brandId || 0,
    name: brandNameStr || ''
  }

  // 8. Dynamic Currency Formatter
  const formatCurrency = (val: number) => {
    try {
      if (lang === 'en') {
        return `${val.toLocaleString('en-US')} SAR`
      }
      return `${val.toLocaleString('ar-SA')} ر.س`
    } catch {
      return lang === 'en' ? `${val} SAR` : `${val} ر.س`
    }
  }

  // 9. Rating & Review Count extraction
  const extractedRating = Number(
    apiProd.rating || 
    (apiProd as any).rating_average || 
    (apiProd as any).reviews_avg_rating || 
    (apiProd as any).rating_avg || 
    (apiProd as any).avg_rating || 
    0
  ) || 0

  const extractedReviewCount = Number(
    apiProd.reviews_count || 
    apiProd.rating_count || 
    (apiProd as any).reviewsCount || 
    (apiProd as any).reviewCount || 
    0
  ) || 0

  const resolvedId = apiProd.id || (rawInput as any)?.product_id || (rawInput as any)?.id || Math.random().toString(36).substring(7)

  return {
    id: resolvedId,
    title: prodTitle,
    slug: apiProd.slug || `product-${resolvedId}`,
    sku: apiProd.sku || `SKU-${resolvedId}`,
    price,
    originalPrice,
    discountPercentage,
    hasDiscount,
    formattedPrice: formatCurrency(price),
    formattedOriginalPrice: hasDiscount ? formatCurrency(originalPrice) : undefined,
    discountBadge: hasDiscount ? (lang === 'en' ? `${discountPercentage}% OFF` : `خصم ${discountPercentage}%`) : undefined,
    thumbnail: imagePath,
    images,
    description: prodDesc,
    category: categoryName,
    categoryId,
    brand: brandObj,
    brandId,
    brandName: brandNameStr || '',
    inStock: (apiProd.current_stock ?? 1) > 0,
    stockCount: apiProd.current_stock ?? 5,
    rating: extractedRating,
    reviewCount: extractedReviewCount
  }
}
