<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-bold text-slate-700">
      {{ label }}
    </label>

    <!-- Single Image Mode (maxFiles === 1) -->
    <div 
      v-if="maxFiles === 1 && previews.length > 0"
      class="relative w-32 h-32 sm:w-48 sm:h-48 rounded-xl border border-slate-200 overflow-hidden group bg-white shadow-sm mx-auto sm:mx-0"
    >
      <img :src="previews[0]" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button 
          @click.prevent="removeImage(0)"
          class="w-10 h-10 rounded-full bg-white/90 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-sm"
          type="button"
          title="حذف الصورة"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Dropzone Area -->
    <div
      v-show="!(maxFiles === 1 && previews.length > 0)"
      class="relative w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-200"
      :class="[
        isDragging ? 'border-indigo-500 bg-indigo-50' : (error ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'),
      ]"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <input
        type="file"
        :multiple="maxFiles !== 1"
        accept="image/*"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        @change="handleFileSelect"
        :disabled="uploading"
      />

      <!-- Uploading State -->
      <div v-if="uploading" class="flex flex-col items-center gap-3 text-indigo-500">
        <svg class="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-sm font-bold">جاري الرفع...</span>
      </div>

      <!-- Idle State -->
      <div v-else class="flex flex-col items-center gap-2 text-slate-500 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-slate-400">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>
        <div class="text-sm font-bold text-slate-700 text-center">اضغط أو اسحب {{ maxFiles === 1 ? 'الصورة' : 'الصور' }} هنا للرفع</div>
        <p class="text-xs text-slate-400">يدعم: JPG, PNG, WEBP (كحد أقصى 5 ميجابايت)</p>
      </div>
    </div>

    <!-- Error Message -->
    <Transition name="fade-down">
      <span v-if="error" class="text-xs font-bold text-red-500 mt-0.5">
        {{ error }}
      </span>
    </Transition>

    <!-- Multi Previews Grid (Only show if maxFiles !== 1) -->
    <div v-if="maxFiles !== 1 && previews.length > 0" class="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
      <div 
        v-for="(preview, index) in previews" 
        :key="index"
        class="relative aspect-square rounded-lg border border-slate-200 overflow-hidden group bg-white shadow-sm"
      >
        <img :src="preview" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            @click.prevent="removeImage(index)"
            class="w-8 h-8 rounded-full bg-white/90 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-sm"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  label?: string
  error?: string
  modelValue?: File[] | string[] | File | string | null
  maxFiles?: number
}>()

const emit = defineEmits(['update:modelValue', 'upload'])

const isDragging = ref(false)
const uploading = ref(false)
const previews = ref<string[]>([])
const filesList = ref<(File | string)[]>([])

// Populate from existing modelValue (for edit mode)
onMounted(() => {
  if (props.modelValue) {
    if (Array.isArray(props.modelValue)) {
      filesList.value = [...props.modelValue]
    } else {
      filesList.value = [props.modelValue]
    }
    // Setup previews for existing string URLs
    previews.value = filesList.value.map(f => typeof f === 'string' ? f : URL.createObjectURL(f))
  }
})

const emitUpdate = () => {
  if (props.maxFiles === 1) {
    emit('update:modelValue', filesList.value.length > 0 ? filesList.value[0] : null)
  } else {
    emit('update:modelValue', [...filesList.value])
  }
}

const processFiles = (files: FileList | null) => {
  if (!files || files.length === 0) return
  
  uploading.value = true
  
  setTimeout(() => {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        if (props.maxFiles === 1) {
          // Replace single image
          if (filesList.value.length > 0 && typeof filesList.value[0] !== 'string') {
            URL.revokeObjectURL(previews.value[0])
          }
          filesList.value = [file]
          previews.value = [URL.createObjectURL(file)]
        } else {
          // Append multiple images
          filesList.value.push(file)
          previews.value.push(URL.createObjectURL(file))
        }
      }
    })
    
    emitUpdate()
    uploading.value = false
  }, 600)
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

const removeImage = (index: number) => {
  const removedFile = filesList.value[index]
  filesList.value.splice(index, 1)
  
  if (typeof removedFile !== 'string') {
    URL.revokeObjectURL(previews.value[index])
  }
  previews.value.splice(index, 1)
  
  emitUpdate()
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
