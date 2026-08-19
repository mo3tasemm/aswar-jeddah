<template>
  <div class="space-y-4">
    
    <!-- Map Header with Live Places Search & Location Actions -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <!-- Places Search Autocomplete Input -->
      <div class="relative flex-1">
        <div class="relative">
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            @input="handleSearchInput"
            @keydown.enter.prevent="triggerSearch"
            type="text"
            placeholder="ابحث عن حي، شارع، معلم، أو مدينة في السعودية (Google Maps)..."
            class="w-full bg-slate-50 border border-slate-200 rounded-2xl ps-10 pe-10 py-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-all shadow-2xs"
          />
          <span class="absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <span v-if="isSearching" class="absolute end-3.5 top-1/2 -translate-y-1/2">
            <span class="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin block"></span>
          </span>
          <button
            v-else-if="searchQuery"
            @click="searchQuery = ''; searchResults = []"
            class="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- Autocomplete Suggestions Dropdown -->
        <Transition name="fade">
          <div
            v-if="searchResults.length > 0"
            class="absolute z-50 start-0 end-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden max-h-60 overflow-y-auto divide-y divide-slate-100"
          >
            <button
              v-for="(item, idx) in searchResults"
              :key="idx"
              type="button"
              @click="selectSearchResult(item)"
              class="w-full p-3 text-start hover:bg-amber-50/50 flex items-start gap-2.5 transition-colors cursor-pointer text-xs group"
            >
              <svg class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div class="flex-1">
                <p class="font-black text-slate-900 group-hover:text-amber-700">{{ item.name || item.display_name.split(',')[0] }}</p>
                <p class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{{ item.display_name }}</p>
              </div>
            </button>
          </div>
        </Transition>
      </div>

      <!-- Current Location GPS Button -->
      <button
        type="button"
        @click="getCurrentLocation"
        :disabled="isLocating"
        class="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
        title="تحديد موقعي الحالي عبر GPS"
      >
        <span v-if="isLocating" class="w-4 h-4 border-2 border-slate-700 border-t-transparent rounded-full animate-spin"></span>
        <svg v-else class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          <circle cx="12" cy="12" r="3" stroke-width="2" />
        </svg>
        <span>{{ isLocating ? 'جاري التحديد...' : 'موقعي الحالي' }}</span>
      </button>
    </div>

    <!-- Map Canvas Container -->
    <div class="relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
      <!-- Map Mount Point -->
      <div ref="mapContainerRef" class="w-full h-full z-10"></div>

      <!-- Loading State Overlay -->
      <div v-if="!isMapLoaded" class="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center gap-3 z-20">
        <div class="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p class="text-xs font-black text-slate-600">جاري تحميل خريطة الموقع التفاعلية...</p>
      </div>

      <!-- Floating Coordinate Pill (Top-Start) -->
      <div class="absolute top-3 start-3 z-20 bg-[#0B0E28]/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl text-[11px] font-mono font-bold shadow-md flex items-center gap-2 border border-slate-700/50">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Lat: {{ currentLat.toFixed(6) }} | Lng: {{ currentLng.toFixed(6) }}</span>
      </div>

      <!-- Instruction Tip Pill (Bottom-Center) -->
      <div class="absolute bottom-3 start-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-md text-slate-800 px-4 py-1.5 rounded-full text-[11px] font-black shadow-md border border-slate-200 pointer-events-none hidden sm:flex items-center gap-1.5">
        <span class="text-amber-500">📍</span>
        <span>اسحب الدبوس أو اضغط على أي مكان بالخريطة لتحديد الموقع بدقة</span>
      </div>
    </div>

    <!-- Detected Address Badge (Reverse Geocoded) -->
    <div v-if="detectedAddressAr || detectedAddressEn" class="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-950">
      <svg class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div class="flex-1 space-y-1">
        <span class="font-bold text-amber-900 block">العنوان المكتشف تلقائياً من الخريطة:</span>
        <p v-if="detectedAddressAr" class="text-slate-800 text-[11px] leading-relaxed"><span class="font-bold text-slate-900">عربي:</span> {{ detectedAddressAr }}</p>
        <p v-if="detectedAddressEn" class="text-slate-600 text-[11px] leading-relaxed" dir="ltr"><span class="font-bold text-slate-800">EN:</span> {{ detectedAddressEn }}</p>
      </div>
      <button
        type="button"
        @click="applyDetectedAddress"
        class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-[10px] font-black transition-colors shrink-0 cursor-pointer shadow-2xs mt-1"
      >
        اعتماد العنوانين
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

const props = withDefaults(defineProps<{
  latitude: string | number
  longitude: string | number
  addressAr?: string
  addressEn?: string
  address?: string
  apiKey?: string
}>(), {
  latitude: '21.543333',
  longitude: '39.172778',
  addressAr: '',
  addressEn: '',
  address: '',
  apiKey: ''
})

const emit = defineEmits<{
  (e: 'update:latitude', val: string): void
  (e: 'update:longitude', val: string): void
  (e: 'update:addressAr', val: string): void
  (e: 'update:addressEn', val: string): void
  (e: 'update:address', val: string): void
  (e: 'locationChanged', payload: { lat: number; lng: number; addressAr: string; addressEn: string; address: string; city: string }): void
}>()

const mapContainerRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)
const isMapLoaded = ref(false)
const isLocating = ref(false)
const isSearching = ref(false)
const searchQuery = ref('')
const searchResults = ref<any[]>([])
const detectedAddressAr = ref('')
const detectedAddressEn = ref('')
const detectedCity = ref('')

const currentLat = ref<number>(Number(props.latitude) || 21.543333)
const currentLng = ref<number>(Number(props.longitude) || 39.172778)

let mapInstance: any = null
let markerInstance: any = null
let searchTimeout: any = null
let resizeObserver: ResizeObserver | null = null

/**
 * Dynamically load Leaflet Map engine
 */
const loadLeaflet = async (): Promise<any> => {
  if ((window as any).L) return (window as any).L

  if (!document.getElementById('leaflet-css')) {
    const link = document.createElement('link')
    link.id = 'leaflet-css'
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)
  }

  return new Promise((resolve, reject) => {
    if ((window as any).L) return resolve((window as any).L)
    const script = document.createElement('script')
    script.id = 'leaflet-js'
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => resolve((window as any).L)
    script.onerror = reject
    document.body.appendChild(script)
  })
}

/**
 * Initialize Interactive Map
 */
const initMap = async () => {
  if (!mapContainerRef.value || !process.client) return

  try {
    const L = await loadLeaflet()

    const lat = Number(props.latitude) || 21.543333
    const lng = Number(props.longitude) || 39.172778
    currentLat.value = lat
    currentLng.value = lng

    if (mapInstance) {
      mapInstance.remove()
      mapInstance = null
    }

    mapInstance = L.map(mapContainerRef.value, {
      zoomControl: true,
      attributionControl: false
    }).setView([lat, lng], 14)

    // Ultra-clean high resolution tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(mapInstance)

    // Custom Luxury Pin Marker Icon matching Admin Theme
    const customIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `
        <div style="position: relative; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;">
          <div style="width: 32px; height: 32px; background: #0B0E28; border: 3px solid #FBBF24; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 4px 12px rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center;">
            <div style="width: 10px; height: 10px; background: #FBBF24; border-radius: 50%;"></div>
          </div>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 36]
    })

    markerInstance = L.marker([lat, lng], {
      draggable: true,
      icon: customIcon
    }).addTo(mapInstance)

    // Marker Drag End Event
    markerInstance.on('dragend', () => {
      const pos = markerInstance.getLatLng()
      updateLocation(pos.lat, pos.lng)
    })

    // Map Click Listener to re-position marker
    mapInstance.on('click', (e: any) => {
      markerInstance.setLatLng(e.latlng)
      updateLocation(e.latlng.lat, e.latlng.lng)
    })

    isMapLoaded.value = true

    // Initial Reverse Geocode
    reverseGeocode(lat, lng)
  } catch (err) {
    console.warn('[InteractiveMapPicker] Map initialization error:', err)
  }
}

/**
 * Handle Location Changes
 */
const updateLocation = (lat: number, lng: number) => {
  currentLat.value = lat
  currentLng.value = lng

  emit('update:latitude', lat.toFixed(6))
  emit('update:longitude', lng.toFixed(6))

  reverseGeocode(lat, lng)
}

/**
 * Reverse Geocode via OpenStreetMap Nominatim (Dual Arabic and English)
 */
const reverseGeocode = async (lat: number, lng: number) => {
  try {
    const [resAr, resEn] = await Promise.allSettled([
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar&addressdetails=1`),
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=en&addressdetails=1`)
    ])

    let addrAr = ''
    let addrEn = ''
    let cityName = 'جدة'

    if (resAr.status === 'fulfilled' && resAr.value.ok) {
      const dataAr = await resAr.value.json()
      if (dataAr && dataAr.display_name) {
        addrAr = dataAr.display_name
        cityName = dataAr.address?.city || dataAr.address?.state || dataAr.address?.town || 'جدة'
      }
    }

    if (resEn.status === 'fulfilled' && resEn.value.ok) {
      const dataEn = await resEn.value.json()
      if (dataEn && dataEn.display_name) {
        addrEn = dataEn.display_name
      }
    }

    detectedAddressAr.value = addrAr
    detectedAddressEn.value = addrEn
    detectedCity.value = cityName

    if (addrAr) {
      emit('update:addressAr', addrAr)
      emit('update:address', addrAr)
    }
    if (addrEn) {
      emit('update:addressEn', addrEn)
    }

    emit('locationChanged', {
      lat,
      lng,
      addressAr: addrAr,
      addressEn: addrEn,
      address: addrAr || addrEn,
      city: cityName
    })
  } catch (e) {
    // Graceful fallback
  }
}

/**
 * Apply Detected Address to form
 */
const applyDetectedAddress = () => {
  if (detectedAddressAr.value) {
    emit('update:addressAr', detectedAddressAr.value)
    emit('update:address', detectedAddressAr.value)
  }
  if (detectedAddressEn.value) {
    emit('update:addressEn', detectedAddressEn.value)
  }
}

/**
 * Debounced search input handler
 */
const handleSearchInput = () => {
  clearTimeout(searchTimeout)
  if (!searchQuery.value || searchQuery.value.trim().length < 2) {
    searchResults.value = []
    return
  }

  searchTimeout = setTimeout(() => {
    triggerSearch()
  }, 400)
}

/**
 * Trigger Places Search for places in Saudi Arabia
 */
const triggerSearch = async () => {
  if (!searchQuery.value) return
  isSearching.value = true

  try {
    const query = encodeURIComponent(searchQuery.value.trim())
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&countrycodes=sa&accept-language=ar&addressdetails=1&limit=5`
    const res = await fetch(url)
    if (res.ok) {
      const data = await res.json()
      searchResults.value = data || []
    }
  } catch (e) {
    searchResults.value = []
  } finally {
    isSearching.value = false
  }
}

/**
 * Select Autocomplete item
 */
const selectSearchResult = (item: any) => {
  const lat = parseFloat(item.lat)
  const lng = parseFloat(item.lon)

  if (!isNaN(lat) && !isNaN(lng) && mapInstance && markerInstance) {
    mapInstance.flyTo([lat, lng], 16, { duration: 1.2 })
    markerInstance.setLatLng([lat, lng])
    updateLocation(lat, lng)

    if (item.display_name) {
      detectedAddressAr.value = item.display_name
      emit('update:addressAr', item.display_name)
      emit('update:address', item.display_name)
    }
  }

  searchResults.value = []
}

/**
 * Get Current User GPS Location
 */
const getCurrentLocation = () => {
  if (!navigator.geolocation) return
  isLocating.value = true

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude
      const lng = pos.coords.longitude
      if (mapInstance && markerInstance) {
        mapInstance.flyTo([lat, lng], 16, { duration: 1.2 })
        markerInstance.setLatLng([lat, lng])
        updateLocation(lat, lng)
      }
      isLocating.value = false
    },
    (err) => {
      console.warn('[InteractiveMapPicker] Geolocation error:', err)
      isLocating.value = false
    },
    { enableHighAccuracy: true, timeout: 8000 }
  )
}

// Watch props if updated externally
watch(
  () => [props.latitude, props.longitude],
  ([newLat, newLng]) => {
    const lat = Number(newLat)
    const lng = Number(newLng)
    if (!isNaN(lat) && !isNaN(lng) && markerInstance && (lat !== currentLat.value || lng !== currentLng.value)) {
      currentLat.value = lat
      currentLng.value = lng
      markerInstance.setLatLng([lat, lng])
      mapInstance?.setView([lat, lng], mapInstance.getZoom())
    }
  }
)

onMounted(() => {
  initMap()

  // Ensure map tiles properly resize when container changes or becomes visible in tabs
  if (mapContainerRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      if (mapInstance) {
        mapInstance.invalidateSize()
      }
    })
    resizeObserver.observe(mapContainerRef.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  if (mapInstance) {
    mapInstance.remove()
    mapInstance = null
  }
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
