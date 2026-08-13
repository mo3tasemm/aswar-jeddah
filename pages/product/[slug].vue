<template>
  <div class="w-full bg-slate-50/50 min-h-screen pb-24 md:pb-16 selection:bg-amber-500 selection:text-white" :dir="layoutDirection">
    
    <!-- 1. LOADING STATE: Skeleton & Spinner -->
    <div v-if="pending" class="container mx-auto px-4 max-w-7xl pt-12 text-center space-y-6">
      <div class="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-sm font-bold text-slate-500">{{ t('common.loading') }}</p>
    </div>

    <!-- 2. ERROR STATE: Product Not Available -->
    <div v-else-if="error || !product" class="container mx-auto px-4 max-w-xl pt-16 text-center space-y-4">
      <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl">
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
      <h2 class="text-xl font-bold text-slate-800">{{ layoutDirection === 'ltr' ? 'Product Currently Unavailable' : 'المنتج غير متاح حالياً' }}</h2>
      <p class="text-xs text-slate-500">{{ error || (layoutDirection === 'ltr' ? 'Could not access product details.' : 'لم نتمكن من الوصول لتفاصيل هذا المنتج.') }}</p>
      <NuxtLink to="/shop" class="inline-block px-5 py-2.5 bg-[#0B0E28] text-amber-400 font-bold text-xs rounded-xl shadow-sm hover:bg-[#151a42] transition-colors">
        {{ t('cart.back_to_shop') }}
      </NuxtLink>
    </div>

    <!-- 3. DATA STATE: Product Details Display -->
    <div v-else>
      <!-- Breadcrumbs -->
      <div class="container mx-auto px-4 max-w-7xl pt-4">
        <Breadcrumbs :items="[
          { label: t('nav.home'), to: '/' },
          { label: t('nav.shop'), to: '/shop' },
          { label: product?.category || t('nav.categories'), to: '/shop' },
          { label: displayProductTitle }
        ]" />
      </div>

      <!-- Main Product Section (2 Columns: Image Gallery at Start, Info at End) -->
      <div class="w-full px-4 sm:px-6 lg:px-8 max-w-[70rem] mx-auto mt-8 mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-white rounded-3xl shadow-sm border border-slate-100 p-4 lg:p-8">
          
          <!-- Column 1 (Start Side): Image Gallery (Left in LTR, Right in RTL) -->
          <div class="min-w-0">
            <ProductGallery :images="product.images || [product.thumbnail]" :brand="product.brand" :discount-badge="product.discountBadge" />
          </div>

          <!-- Column 2 (End Side): Product Info & Actions (Right in LTR, Left in RTL) -->
          <div class="min-w-0">
            <ProductInfo :product="product" />
          </div>

        </div>
      </div>

      <!-- Technical Tabs (Description, Specs, Reviews) -->
      <div class="container mx-auto px-4 max-w-7xl mb-16">
        <ProductTabs 
          :product="product" 
          :reviews="productReviews" 
          @reload-reviews="product?.id && loadProductReviews(product.id)"
        />
      </div>

      <!-- Related Products Section -->
      <div class="container mx-auto px-4 max-w-7xl mb-16 pt-8" v-if="relatedProducts.length > 0">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-black text-[#0B0E28]">{{ layoutDirection === 'ltr' ? 'Related Products' : 'منتجات ذات صلة' }}</h2>
          <NuxtLink to="/shop" class="text-sm font-bold text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1">
            <span>{{ t('common.view_all') }}</span>
            <svg class="w-4 h-4 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </NuxtLink>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      <LiveSocialProof :product-title="displayProductTitle" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '~/composables/useProducts'
import { useLanguage } from '~/composables/useLanguage'

// Import components
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import ShopBreadcrumb from '~/components/Shop/ShopBreadcrumb.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import ProductGallery from '~/components/product/details/ProductGallery.vue'
import ProductInfo from '~/components/product/details/ProductInfo.vue'
import ProductTabs from '~/components/product/details/ProductTabs.vue'
import StickyMobileBuyBar from '~/components/product/details/StickyMobileBuyBar.vue'
import LiveSocialProof from '~/components/product/details/LiveSocialProof.vue'

const route = useRoute()
const { t, layoutDirection, currentLanguage } = useLanguage()

// Composables
const { currentProduct, productReviews, pending, error, loadProductBySlug, loadProductReviews, products: allProducts, loadProducts } = useProducts()

const product = computed(() => currentProduct.value)
const relatedProducts = computed(() => allProducts.value.filter(p => String(p.id) !== String(product.value?.id)).slice(0, 4))

// Active Route Slug or ID
const productSlug = computed(() => String(route.params.slug || route.params.id || ''))

const displayProductTitle = computed(() => {
  if (!product.value) return t('common.loading')
  if (layoutDirection.value === 'ltr') {
    return (product.value as any).name_en || (product.value as any).title_en || (product.value as any).en_name || product.value.title || product.value.name
  }
  return product.value.title || product.value.name
})

// Fetch single product detail by slug from API
const fetchProductDetails = async () => {
  if (!productSlug.value) return
  await loadProductBySlug(productSlug.value)
  loadProducts({ limit: 6 })
}

// Watchers: Auto-refetch when locale or route slug changes
watch([currentLanguage, productSlug], () => {
  fetchProductDetails()
})

onMounted(() => {
  fetchProductDetails()
})

// Set Dynamic Page Head Title
useHead({
  title: computed(() => product.value ? `${displayProductTitle.value} | أسوار جدة` : 'تفاصيل المنتج')
})
</script>
