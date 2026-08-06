<template>
  <div class="w-full bg-slate-50/50 min-h-screen pb-24 md:pb-16" dir="rtl">
    
    <!-- Breadcrumbs -->
    <div class="container mx-auto px-4 max-w-7xl pt-4">
      <ShopBreadcrumb :tiers="breadcrumbTiers" />
    </div>

    <!-- Main Product Section (2 Columns) -->
    <div class="w-full px-4 sm:px-6 lg:px-8 max-w-[70rem] mx-auto mt-8 mb-16">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-white rounded-3xl shadow-sm border border-slate-100 p-4 lg:p-8">
        
        <!-- Right Column (Desktop): Product Info & Actions -->
        <div class="min-w-0">
          <ProductInfo :product="product" />
        </div>

        <!-- Left Column (Desktop): Image Gallery -->
        <div class="min-w-0">
          <ProductGallery :images="product.images" :brand="product.brand" :discount-badge="product.discountBadge" />
        </div>

      </div>
    </div>

    <!-- Technical Tabs (Description, Specs, Reviews) -->
    <div class="container mx-auto px-4 max-w-7xl mb-16">
      <ProductTabs :product="product" :reviews="mockReviews" />
    </div>

    <!-- Related Products -->
    <div class="container mx-auto px-4 max-w-7xl mb-16 pt-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-black text-[#0B0E28]">منتجات قد تعجبك أيضاً</h2>
        <NuxtLink to="/shop" class="text-sm font-bold text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1">
          عرض الكل
          <svg class="w-4 h-4 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </NuxtLink>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ProductCard 
          v-for="relProduct in relatedProducts" 
          :key="relProduct.id" 
          :product="relProduct" 
        />
      </div>
    </div>


    <!-- Sticky Mobile Buy Bar -->
    <StickyMobileBuyBar :product="product" />

    <!-- Live Social Proof -->
    <LiveSocialProof :product-title="product.title" />

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

// Import existing components
import ShopBreadcrumb from '~/components/Shop/ShopBreadcrumb.vue'
import ProductCard from '~/components/product/ProductCard.vue'

// Import new specialized product page components
import ProductGallery from '~/components/product/details/ProductGallery.vue'
import ProductInfo from '~/components/product/details/ProductInfo.vue'
import ProductTabs from '~/components/product/details/ProductTabs.vue'
import StickyMobileBuyBar from '~/components/product/details/StickyMobileBuyBar.vue'
import LiveSocialProof from '~/components/product/details/LiveSocialProof.vue'

const route = useRoute()

// Mock Data for the Product
const product = ref({
  id: route.params.id || 'p-1',
  title: 'غسالة سامسونج أوتوماتيكية بفتحة أمامية - 9 كيلو، تقنية EcoBubble، محرك انفرتر، فضي',
  slug: 'samsung-washing-machine-9kg-ecobubble',
  sku: 'SMG-WM-9KG-SLV',
  brand: 'Samsung',
  category: 'الغسالات والمجففات',
  rating: 4.8,
  reviewsCount: 342,
  price: 24500,
  oldPrice: 28900,
  formattedPrice: '24,500.00 EGP',
  formattedOldPrice: '28,900.00 EGP',
  discountPercentage: 15,
  discountBadge: 'خصم 15%',
  inStock: true,
  stockCount: 3, // Low stock urgency trigger
  availabilityStatus: 'متاح بالمخزون',
  description: 'احصل على غسيل نظيف بفعالية بفضل تقنية EcoBubble التي تحول المنظف إلى فقاعات لتخترق الأقمشة بسرعة...',
  specs: [
    { label: 'السعة', value: '9 كيلو جرام' },
    { label: 'سرعة الدوران (RPM)', value: '1400 دورة' },
    { label: 'نوع التحميل', value: 'فتحة أمامية' },
    { label: 'الأبعاد (العرض × الارتفاع × العمق)', value: '600 x 850 x 550 مم' },
    { label: 'تقنية الغسيل', value: 'EcoBubble & Hygiene Steam' },
    { label: 'اللون', value: 'فضي معدني' },
    { label: 'ضمان المحرك', value: '10 سنوات (محرك ديجيتال انفرتر)' }
  ],
  images: [
    'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=800&auto=format&fit=crop', // Using air fryer as placeholder for visual
    'https://images.unsplash.com/photo-1585237722700-1c7b8bc1df84?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop'
  ],
  flashSaleEndTime: new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours from now
})

useHead({
  title: computed(() => `${product.value.title} | أسوار جدة`),
  meta: [
    { name: 'description', content: computed(() => product.value.description) },
    { property: 'og:title', content: computed(() => `${product.value.title} | أسوار جدة`) },
    { property: 'og:description', content: computed(() => product.value.description) },
    { property: 'og:image', content: computed(() => product.value.images[0]) },
    { property: 'product:price:amount', content: computed(() => product.value.price) },
    { property: 'product:price:currency', content: 'SAR' }
  ]
})

const breadcrumbTiers = computed(() => [
  { name: 'الأجهزة الكهربائية', path: '/shop' },
  { name: product.value.category, path: '/category/washing-machines' },
  { name: product.value.title, path: '#' }
])

// Mock Bundles
const bundleProducts = ref([
  {
    id: 'b-1',
    title: 'غطاء غسالة مقاوم للماء ومضاد للأتربة',
    price: 450,
    formattedPrice: '450.00 EGP',
    image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'b-2',
    title: 'مسحوق غسيل أوتوماتيك لافندر - 5 كجم',
    price: 280,
    formattedPrice: '280.00 EGP',
    image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=200&auto=format&fit=crop'
  }
])

// Mock Reviews
const mockReviews = ref([
  { id: 1, author: 'أحمد محمود', rating: 5, date: 'منذ يومين', content: 'غسالة ممتازة وصوتها هادي جداً، وتوصيل أسوار جدة كان سريع جداً والتغليف ممتاز.' },
  { id: 2, author: 'سارة خالد', rating: 4, date: 'منذ أسبوع', content: 'ممتازة في التنظيف بس حجمها كان أكبر شوية من المتوقع، لكن المندوب ساعدنا في التركيب.' },
  { id: 3, author: 'عبدالله يوسف', rating: 5, date: 'منذ شهر', content: 'أفضل استثمار للبيت. تقنية البخار خرافية بتشيل أصعب البقع بدون أي مجهود.' }
])

// Mock Related Products (5 items to match grid-cols-5)
const relatedProducts = ref([
  { id: 11, title: 'ثلاجة شارب انفرتر ديجيتال 450 لتر', formattedPrice: '32,000 EGP', formattedOldPrice: '35,000 EGP', discountBadge: 'خصم 8%', rating: 4.7, images: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=500&auto=format&fit=crop'], brand: 'Sharp', inStock: true, slug: 'sharp-fridge' },
  { id: 12, title: 'ثلاجة توشيبا نوفروست 350 لتر', formattedPrice: '24,500 EGP', rating: 4.5, images: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=500&auto=format&fit=crop'], brand: 'Toshiba', inStock: true, slug: 'toshiba-fridge' },
  { id: 13, title: 'ثلاجة إل جي انفرتر 509 لتر', formattedPrice: '46,200 EGP', formattedOldPrice: '48,500 EGP', discountBadge: 'توفير', rating: 4.6, images: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=500&auto=format&fit=crop'], brand: 'LG', inStock: true, slug: 'lg-fridge' },
  { id: 14, title: 'ثلاجة بوش ستاينلس ستيل 400 لتر', formattedPrice: '38,000 EGP', rating: 4.9, images: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=500&auto=format&fit=crop'], brand: 'Bosch', inStock: true, slug: 'bosch-fridge' },
  { id: 15, title: 'ثلاجة بيكو زجاج أسود 500 لتر', formattedPrice: '41,000 EGP', rating: 4.8, images: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=500&auto=format&fit=crop'], brand: 'Beko', inStock: true, slug: 'beko-fridge' }
])
</script>
