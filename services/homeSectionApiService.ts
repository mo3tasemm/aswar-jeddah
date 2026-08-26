import { useApi } from './api'

export interface HomeSectionItem {
  id: string | number
  type: string
  title?: string
  sort_order?: number
  is_active?: boolean | number
  data?: Record<string, any>
  [key: string]: any
}

export interface HomeSectionsApiResponse {
  status?: boolean
  message?: string
  data?: HomeSectionItem[] | { sections?: HomeSectionItem[] }
  sections?: HomeSectionItem[]
}

// Fallback layout sections in case API is offline or returns empty
const defaultFallbackSections: HomeSectionItem[] = [
  {
    id: 'sec-hero-1',
    type: 'hero_slider',
    sort_order: 1,
    is_active: 1,
    data: {
      slides: [
        {
          id: 1,
          imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
          mobileImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
          linkUrl: '/category/ac',
          altText: 'أقوى التخفيضات على المكيفات',
        },
        {
          id: 2,
          imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&q=80',
          mobileImageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
          linkUrl: '/category/kitchen-appliances',
          altText: 'جدد مطبخك بأحدث الأجهزة',
        },
        {
          id: 3,
          imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1600&q=80',
          mobileImageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
          linkUrl: '/category/screens',
          altText: 'شاشات ذكية بدقة 4K',
        }
      ]
    }
  },
  {
    id: 'sec-cat-slider-1',
    type: 'category_slider',
    sort_order: 2,
    is_active: 1,
    data: {
      title: 'تسوق حسب القسم',
      limit: 12
    }
  },
  {
    id: 'sec-brand-1',
    type: 'brand_showcase',
    sort_order: 3,
    is_active: 1,
    data: {
      brandName: 'PHILIPS',
      title: 'منتجات فيليبس العالمية',
      viewAllUrl: '/brand/philips',
      bgColor: 'bg-[#1a66cc]'
    }
  },
  {
    id: 'sec-brand-2',
    type: 'brand_showcase',
    sort_order: 4,
    is_active: 1,
    data: {
      brandName: 'NUTRICOOK',
      title: 'منتجات NutriCook العالمية',
      subtitle: 'أكل أكثر ذكاءً وصحة',
      viewAllUrl: '/brand/nutricook',
      bgColor: 'bg-[#111827]',
      btnColor: 'bg-[#f97316] text-white hover:bg-orange-600'
    }
  },
  {
    id: 'sec-new-arrivals-1',
    type: 'new_arrivals',
    sort_order: 5,
    is_active: 1,
    data: {
      title: 'أجهزة كهربائية وصلت حديثاً',
      subtitle: 'اكتشف أحدث الأجهزة المنزلية بأفضل الأسعار',
      shopUrl: '/new-arrivals'
    }
  },
  {
    id: 'sec-campaign-1',
    type: 'brand_campaign',
    sort_order: 6,
    is_active: 1,
    data: {
      title: 'خصومات Tineco',
      btnText: 'منتجات Tineco',
      targetUrl: '/brand/tineco',
      bannerImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1600&q=80',
      category: 'أجهزة المطبخ',
      limit: 5
    }
  },
  {
    id: 'sec-side-banner-1',
    type: 'side_banner',
    sort_order: 7,
    is_active: 1,
    data: {
      sideBannerImage: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop',
      sideBannerImages: [
        'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
        'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80'
      ],
      sideBannerUrl: '/brand/smeg',
      category: 'أجهزة المطبخ',
      limit: 5
    }
  },
  {
    id: 'sec-side-banner-2',
    type: 'side_banner',
    sort_order: 8,
    is_active: 1,
    data: {
      sideBannerImage: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80',
      sideBannerImages: [
        'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80',
        'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop'
      ],
      sideBannerUrl: '/brand/philips',
      brandName: 'PHILIPS',
      limit: 10
    }
  },
  {
    id: 'sec-campaign-2',
    type: 'brand_campaign',
    sort_order: 9,
    is_active: 1,
    data: {
      title: 'مجموعة أجهزة دايسون الحديثة',
      btnText: 'تسوق دايسون',
      targetUrl: '/brand/dyson',
      bannerImage: 'https://makka.store/wp-content/uploads/2026/06/sage-homebanner-desktop.webp',
      category: 'أجهزة المطبخ',
      limit: 5
    }
  },
  {
    id: 'sec-brand-3',
    type: 'brand_showcase',
    sort_order: 10,
    is_active: 1,
    data: {
      brandName: 'JBL',
      title: 'منتجات JBL العالمية',
      subtitle: 'سماعات وأصوات بجودة لا مثيل لها',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/JBL_logo.svg',
      bgColor: 'bg-[#FF3300]',
      viewAllUrl: '/brand/jbl'
    }
  },
  {
    id: 'sec-features-1',
    type: 'store_features',
    sort_order: 11,
    is_active: 1,
    data: {}
  },
  {
    id: 'sec-brands-ticker-1',
    type: 'brands_ticker',
    sort_order: 12,
    is_active: 1,
    data: {}
  },
  {
    id: 'sec-guarantees-1',
    type: 'store_guarantees',
    sort_order: 13,
    is_active: 1,
    data: {}
  },
  {
    id: 'sec-location-1',
    type: 'store_location',
    sort_order: 14,
    is_active: 1,
    data: {}
  }
]

export const fetchPublicHomeSections = async (): Promise<HomeSectionItem[]> => {
  const api = useApi()
  try {
    const res = await api.get<any>('/api/v1/home-sections')
    
    let rawList: any[] = []
    if (Array.isArray(res)) {
      rawList = res
    } else if (res && Array.isArray(res.data)) {
      rawList = res.data
    } else if (res && res.data && Array.isArray(res.data.sections)) {
      rawList = res.data.sections
    } else if (res && Array.isArray(res.sections)) {
      rawList = res.sections
    }

    if (rawList && rawList.length > 0) {
      // Filter active and sort ascending by sort_order
      return rawList
        .filter((sec: any) => sec.is_active === undefined || sec.is_active === true || sec.is_active === 1 || sec.is_active === '1')
        .sort((a: any, b: any) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))
        .map((sec: any) => {
          // Normalize data object
          let sectionData = sec.data
          if (typeof sectionData === 'string') {
            try {
              sectionData = JSON.parse(sectionData)
            } catch (e) {
              sectionData = {}
            }
          }
          return {
            ...sec,
            data: sectionData || {}
          }
        })
    }

    return defaultFallbackSections
  } catch (error) {
    console.warn('Failed to fetch home sections from API, using fallback layout:', error)
    return defaultFallbackSections
  }
}

export { adminHomeSectionsApiService } from './adminHomeSectionsApiService'

