<template>
  <div class="max-w-[1550px] mx-auto px-4 lg:px-6 my-10 relative overflow-hidden bg-slate-50/50 py-10 rounded-3xl border border-slate-100">
    <!-- Title -->
    <div class="text-center mb-8">
      <h2 class="text-xl md:text-2xl font-bold text-slate-800">أهم الماركات العالمية في مكة ستور</h2>
      <div class="w-16 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
    </div>

    <!-- Ticker Wrapper -->
    <div class="relative flex overflow-hidden group/ticker">
      <!-- Left Fade -->
      <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
      <!-- Right Fade -->
      <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
      
      <!-- Track -->
      <div class="flex animate-marquee group-hover/ticker:[animation-play-state:paused] w-max">
        <template v-for="loop in 2" :key="loop">
          <div class="flex gap-4 md:gap-6 pl-4 md:pl-6">
            <NuxtLink 
              v-for="brand in brands" 
              :key="brand.slug"
              :to="`/brands/${brand.slug}`"
              class="h-20 w-[140px] md:w-[180px] px-4 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-slate-300 hover:-translate-y-1 group shrink-0 cursor-pointer"
            >
              <img 
                :src="brand.logo" 
                :alt="brand.name"
                class="max-h-10 max-w-full object-contain filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              />
            </NuxtLink>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const brands = [
  { name: 'Dyson', slug: 'dyson', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Dyson_logo.svg' },
  { name: 'DeLonghi', slug: 'delonghi', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/De%27Longhi_logo.svg' },
  { name: 'JBL', slug: 'jbl', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/JBL_logo.svg' },
  { name: 'Philips', slug: 'philips', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Philips_logo.svg' },
  { name: 'Bissell', slug: 'bissell', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Bissell_logo.svg' },
  { name: 'Samsung', slug: 'samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'LG', slug: 'lg', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg' },
  { name: 'Sony', slug: 'sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sony_logo.svg' },
  { name: 'Kenwood', slug: 'kenwood', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Kenwood_logo.svg' },
]
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Translate exactly half the width for a seamless loop */
    transform: translateX(50%); 
  }
}

.animate-marquee {
  animation: marquee 35s linear infinite;
}
</style>
