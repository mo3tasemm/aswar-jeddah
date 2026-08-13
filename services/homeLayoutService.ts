import { ref } from 'vue'

export interface HomeSection {
  id: string
  type: string
  [key: string]: any
}

// Global state to simulate a database for the current session
const layoutState = ref<HomeSection[]>([
    {
      id: 'sec-hero-1',
      type: 'hero',
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
    },
    {
      id: 'sec-cat-slider-1',
      type: 'category_slider'
    },
    {
      id: 'sec-brand-1',
      type: 'brand_showcase',
      brandName: 'PHILIPS',
      title: 'منتجات فيليبس العالمية',
      viewAllUrl: '/brand/philips',
      bgColor: 'bg-[#1a66cc]'
    },
    {
      id: 'sec-brand-2',
      type: 'brand_showcase',
      brandName: 'NUTRICOOK',
      title: 'منتجات NutriCook العالمية',
      subtitle: 'أكل أكثر ذكاءً وصحة',
      viewAllUrl: '/brand/nutricook',
      bgColor: 'bg-[#111827]',
      btnColor: 'bg-[#f97316] text-white hover:bg-orange-600'
    },
    {
      id: 'sec-new-arrivals-1',
      type: 'new_arrivals',
      shopUrl: '/new-arrivals'
    },
    {
      id: 'sec-campaign-1',
      type: 'brand_campaign',
      title: 'خصومات Tineco',
      btnText: 'منتجات Tineco',
      targetUrl: '/brand/tineco',
      bannerImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1600&q=80',
      category: 'أجهزة المطبخ',
      limit: 5
    },
    {
      id: 'sec-side-banner-1',
      type: 'side_banner',
      sideBannerImage: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop',
      sideBannerImages: [
        'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
        'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80'
      ],
      sideBannerUrl: '/brand/smeg',
      category: 'أجهزة المطبخ',
      limit: 5
    },
    {
      id: 'sec-side-banner-2',
      type: 'side_banner',
      sideBannerImage: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80',
      sideBannerImages: [
        'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80',
        'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop'
      ],
      sideBannerUrl: '/brand/philips',
      brandName: 'PHILIPS',
      limit: 10
    },
    {
      id: 'sec-campaign-2',
      type: 'brand_campaign',
      title: 'مجموعة أجهزة دايسون الحديثة',
      btnText: 'تسوق دايسون',
      targetUrl: '/brand/dyson',
      bannerImage: 'https://makka.store/wp-content/uploads/2026/06/sage-homebanner-desktop.webp',
      category: 'أجهزة المطبخ',
      limit: 5
    },
    {
      id: 'sec-brand-3',
      type: 'brand_showcase',
      brandName: 'JBL',
      title: 'منتجات JBL العالمية',
      subtitle: 'سماعات وأصوات بجودة لا مثيل لها',
      brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/JBL_logo.svg',
      bgColor: 'bg-[#FF3300]',
      viewAllUrl: '/brand/jbl'
    },
    {
      id: 'sec-features-1',
      type: 'store_features'
    },
    {
      id: 'sec-brands-ticker-1',
      type: 'brands_ticker'
    },
    {
      id: 'sec-guarantees-1',
      type: 'store_guarantees'
    },
    {
      id: 'sec-location-1',
      type: 'store_location'
    }
  ]
)

export const fetchHomeLayout = async (): Promise<HomeSection[]> => {
  return layoutState.value
}

export const saveHomeLayout = async (newLayout: HomeSection[]): Promise<boolean> => {
  // Deep clone to simulate backend save
  layoutState.value = JSON.parse(JSON.stringify(newLayout))
  return true
}
