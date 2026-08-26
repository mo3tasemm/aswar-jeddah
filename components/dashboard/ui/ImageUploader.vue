<template>
  <div class="flex flex-col gap-1.5 w-full">
    <div v-if="label" class="flex items-center justify-between">
      <label class="text-sm font-bold text-slate-700">
        {{ label }}
      </label>
      <button 
        v-if="maxFiles === 1 && !hasImage"
        type="button" 
        @click="showUrlInput = !showUrlInput" 
        class="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
      >
        <i :class="showUrlInput ? 'fa-solid fa-cloud-arrow-up' : 'fa-solid fa-link'"></i>
        <span>{{ showUrlInput ? 'الرفع من الجهاز' : 'استخدام رابط مباشر (URL)' }}</span>
      </button>
    </div>

    <!-- 1. Single Image Mode Preview -->
    <div 
      v-if="maxFiles === 1 && hasImage"
      class="relative w-full rounded-2xl border border-slate-200 overflow-hidden group bg-slate-50 shadow-sm transition-all"
    >
      <div class="relative w-full h-44 sm:h-52 bg-slate-100 flex items-center justify-center overflow-hidden">
        <img 
          :src="currentSinglePreview" 
          alt="Preview" 
          class="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          @error="handleImageError"
        />
        
        <!-- Hover Actions Overlay -->
        <div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs">
          <!-- Replace Button -->
          <label 
            class="px-3.5 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
            title="تغيير الصورة"
          >
            <i class="fa-solid fa-arrows-rotate text-indigo-600"></i>
            <span>تغيير</span>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
          </label>

          <!-- Remove Button -->
          <button 
            @click.prevent="removeImage(0)"
            class="px-3.5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
            type="button"
            title="حذف الصورة"
          >
            <i class="fa-solid fa-trash-can"></i>
            <span>حذف</span>
          </button>
        </div>
      </div>
      
      <div class="px-3 py-2 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span class="truncate max-w-[200px]" dir="ltr">{{ getImageName(0) }}</span>
        <span class="text-emerald-600 font-bold flex items-center gap-1">
          <i class="fa-solid fa-circle-check text-[10px]"></i>
          تمت المعاينة
        </span>
      </div>
    </div>

    <!-- 2. Direct URL Input Mode (Single Image) -->
    <div v-else-if="maxFiles === 1 && showUrlInput" class="space-y-2">
      <div class="flex items-center gap-2">
        <div class="relative flex-1">
          <input
            type="url"
            v-model="urlInputValue"
            placeholder="https://example.com/image.jpg"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 h-[44px] text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-mono"
            dir="ltr"
            @keydown.enter.prevent="applyUrlInput"
          />
        </div>
        <button
          type="button"
          @click="applyUrlInput"
          class="px-4 h-[44px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <i class="fa-solid fa-check text-xs"></i>
          تطبيق
        </button>
      </div>
      <p class="text-[11px] text-slate-400">الصق رابط الصورة الخارجي ثم اضغط على تطبيق.</p>
    </div>

    <!-- 3. Drag & Drop File Upload Area -->
    <div
      v-else-if="!hasImage || maxFiles !== 1"
      class="relative w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer group"
      :class="[
        isDragging ? 'border-indigo-500 bg-indigo-50/70 scale-[0.99]' : (error ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50/80 hover:bg-slate-100/80 hover:border-indigo-300'),
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input
        type="file"
        :multiple="maxFiles !== 1"
        accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        @change="handleFileSelect"
        :disabled="uploading"
      />

      <!-- Uploading Spinner -->
      <div v-if="uploading" class="flex flex-col items-center gap-3 text-indigo-600">
        <svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-xs font-bold">جاري معالجة الصورة...</span>
      </div>

      <!-- Idle Dropzone Instructions -->
      <div v-else class="flex flex-col items-center gap-2 text-slate-500 pointer-events-none">
        <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-xs">
          <i class="fa-solid fa-cloud-arrow-up"></i>
        </div>
        <div class="text-xs font-bold text-slate-700 text-center">
          اضغط هنا لاختيار {{ maxFiles === 1 ? 'صورة' : 'الصور' }} أو اسحبها إلى هنا
        </div>
        <p class="text-[11px] text-slate-400">PNG, JPG, WEBP, SVG (حجم أقصى 5MB)</p>
      </div>
    </div>

    <!-- Error Message -->
    <Transition name="fade-down">
      <span v-if="error" class="text-xs font-bold text-red-500 mt-0.5 flex items-center gap-1">
        <i class="fa-solid fa-circle-exclamation text-[10px]"></i>
        {{ error }}
      </span>
    </Transition>

    <!-- 4. Multiple Images Grid (when maxFiles !== 1) -->
    <div v-if="maxFiles !== 1 && previews.length > 0" class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      <div 
        v-for="(preview, index) in previews" 
        :key="index"
        class="relative aspect-square rounded-xl border border-slate-200 overflow-hidden group bg-slate-50 shadow-xs"
      >
        <img :src="preview" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            @click.prevent="removeImage(index)"
            class="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
            type="button"
            title="حذف"
          >
            <i class="fa-solid fa-trash-can text-xs"></i>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = withDefaults(defineProps<{
  label?: string
  error?: string
  modelValue?: File[] | string[] | File | string | null
  maxFiles?: number
}>(), {
  maxFiles: 1
})

const emit = defineEmits(['update:modelValue', 'upload'])

const isDragging = ref(false)
const uploading = ref(false)
const showUrlInput = ref(false)
const urlInputValue = ref('')
const previews = ref<string[]>([])
const filesList = ref<(File | string)[]>([])

const hasImage = computed(() => {
  return previews.value.length > 0 && Boolean(previews.value[0])
})

const currentSinglePreview = computed(() => {
  return previews.value.length > 0 ? previews.value[0] : ''
})

const getImageName = (index: number): string => {
  const item = filesList.value[index]
  if (!item) return ''
  if (typeof item === 'string') {
    if (item.startsWith('data:image/')) return 'صورة مرفوعة (Base64)'
    try {
      const parsed = new URL(item)
      const pathParts = parsed.pathname.split('/')
      return pathParts[pathParts.length - 1] || item
    } catch (e) {
      return item.length > 35 ? item.substring(0, 32) + '...' : item
    }
  }
  return item.name || 'image.jpg'
}

// Convert File to Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

// Sync state whenever props.modelValue changes
watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      previews.value = []
      filesList.value = []
      return
    }

    if (Array.isArray(newVal)) {
      filesList.value = [...newVal]
      previews.value = newVal.map(item => {
        if (typeof item === 'string') return item
        if (item instanceof File) return URL.createObjectURL(item)
        return ''
      }).filter(Boolean)
    } else {
      filesList.value = [newVal]
      if (typeof newVal === 'string') {
        previews.value = newVal ? [newVal] : []
      } else if (newVal instanceof File) {
        previews.value = [URL.createObjectURL(newVal)]
      } else {
        previews.value = []
      }
    }
  },
  { immediate: true, deep: true }
)

const emitUpdate = () => {
  if (props.maxFiles === 1) {
    const value = filesList.value.length > 0 ? filesList.value[0] : null
    emit('update:modelValue', value)
  } else {
    emit('update:modelValue', [...filesList.value])
  }
}

const processFiles = async (files: FileList | null) => {
  if (!files || files.length === 0) return
  
  uploading.value = true
  
  try {
    const validFiles = Array.from(files).filter(f => f.type.startsWith('image/'))
    
    if (props.maxFiles === 1 && validFiles.length > 0) {
      const file = validFiles[0]
      const base64 = await fileToBase64(file)
      filesList.value = [base64]
      previews.value = [base64]
      emitUpdate()
    } else if (validFiles.length > 0) {
      for (const file of validFiles) {
        const base64 = await fileToBase64(file)
        filesList.value.push(base64)
        previews.value.push(base64)
      }
      emitUpdate()
    }
  } catch (err) {
    console.error('Error processing files in ImageUploader:', err)
  } finally {
    uploading.value = false
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  processFiles(target.files)
  target.value = ''
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  processFiles(event.dataTransfer?.files || null)
}

const applyUrlInput = () => {
  const cleanUrl = urlInputValue.value.trim()
  if (!cleanUrl) return
  
  if (props.maxFiles === 1) {
    filesList.value = [cleanUrl]
    previews.value = [cleanUrl]
  } else {
    filesList.value.push(cleanUrl)
    previews.value.push(cleanUrl)
  }
  
  urlInputValue.value = ''
  showUrlInput.value = false
  emitUpdate()
}

const removeImage = (index: number) => {
  filesList.value.splice(index, 1)
  previews.value.splice(index, 1)
  emitUpdate()
}

const handleImageError = () => {
  // If an image fails to load, gracefully keep placeholder preview
}
</script>

<style scoped>
.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 0.2s ease;
}
.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
