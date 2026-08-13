<template>
  <div class="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-amber-400/30 transition-colors shadow-sm group" :dir="layoutDirection">
    
    <!-- Product Image -->
    <NuxtLink :to="`/product/${item.product.slug}`" class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-slate-50 rounded-xl overflow-hidden relative">
      <img 
        :src="itemImage" 
        :alt="itemTitle" 
        class="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
      />
    </NuxtLink>

    <!-- Product Details -->
    <div class="flex-1 flex flex-col justify-between min-w-0">
      
      <!-- Top: Title & Remove -->
      <div class="flex justify-between items-start gap-2">
        <div class="min-w-0 text-start">
          <span v-if="itemCategory" class="text-[10px] text-slate-400 font-medium mb-1 block truncate">{{ itemCategory }}</span>
          <NuxtLink :to="`/product/${item.product.slug}`" class="text-sm font-bold text-[#0B0E28] leading-snug line-clamp-2 hover:text-amber-500 transition-colors">
            {{ itemTitle }}
          </NuxtLink>
        </div>
        
        <button 
          @click="$emit('remove-item', item.product.id || item.id)"
          class="w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors cursor-pointer"
          :title="t('common.delete')"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <!-- Bottom: Price & Quantity -->
      <div class="flex items-end justify-between mt-3">
        <!-- Price -->
        <div class="text-start">
          <span class="text-xs text-slate-500 font-medium block">{{ t('product.price') }}</span>
          <div class="text-base font-black text-[#0B0E28] leading-none mt-1">
            {{ formattedPrice }}
          </div>
        </div>

        <!-- Quantity Controls -->
        <div class="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200" dir="ltr">
          <!-- Decrease -->
          <button 
            @click="decreaseQty"
            :disabled="item.quantity <= 1"
            class="w-7 h-7 flex items-center justify-center rounded bg-white text-slate-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#0B0E28] transition-colors cursor-pointer"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          
          <!-- Value -->
          <span class="w-8 text-center text-sm font-bold text-[#0B0E28]">{{ item.quantity }}</span>
          
          <!-- Increase -->
          <button 
            @click="increaseQty"
            class="w-7 h-7 flex items-center justify-center rounded bg-white text-slate-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#0B0E28] transition-colors cursor-pointer"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-quantity', 'remove-item'])
const { t, formatCurrency, layoutDirection } = useLanguage()

const itemTitle = computed(() => {
  const p = props.item?.product || {}
  if (layoutDirection.value === 'ltr') {
    return p.name_en || p.title_en || p.title || p.name || 'Product'
  }
  return p.title || p.name || p.name_ar || 'منتج'
})

const itemCategory = computed(() => {
  const p = props.item?.product || {}
  return p.category || p.category_name || ''
})

const itemImage = computed(() => {
  const p = props.item?.product || {}
  const img = p.images?.[0] || p.image || p.thumbnail
  if (img && typeof img === 'string') return img
  return '/images/placeholder.png'
})

const formattedPrice = computed(() => {
  const p = props.item?.product || {}
  const rawPrice = p.price || p.unit_price || 0
  return formatCurrency(rawPrice)
})

const decreaseQty = () => {
  if (props.item.quantity > 1) {
    const targetId = props.item.product?.id || props.item.id
    emit('update-quantity', targetId, props.item.quantity - 1)
  }
}

const increaseQty = () => {
  const targetId = props.item.product?.id || props.item.id
  emit('update-quantity', targetId, props.item.quantity + 1)
}
</script>
