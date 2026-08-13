<template>
  <div class="flex flex-col gap-1.5 w-full">
    <!-- Label -->
    <label v-if="label" class="text-xs font-extrabold text-[#0B0E28] block">
      {{ label }}
      <span v-if="required" class="text-rose-500 ms-0.5">*</span>
    </label>

    <!-- Rich Text Editor Container -->
    <div 
      class="border rounded-2xl overflow-hidden bg-slate-50/50 transition-all duration-200"
      :class="isFocused ? 'border-amber-400 bg-white ring-2 ring-amber-400/20' : 'border-slate-200 hover:border-slate-300'"
    >
      <!-- TOOLBAR -->
      <div class="bg-slate-100/80 p-2 border-b border-slate-200 flex flex-wrap items-center gap-1 text-slate-700 text-xs font-bold select-none">
        
        <!-- Text Styling Buttons -->
        <button 
          type="button" 
          @click="execCommand('bold')" 
          class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center font-black transition-colors"
          title="عريض (Bold)"
        >
          B
        </button>

        <button 
          type="button" 
          @click="execCommand('italic')" 
          class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center italic font-serif transition-colors"
          title="مائل (Italic)"
        >
          I
        </button>

        <button 
          type="button" 
          @click="execCommand('underline')" 
          class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center underline transition-colors"
          title="تحته خط (Underline)"
        >
          U
        </button>

        <button 
          type="button" 
          @click="execCommand('strikeThrough')" 
          class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center line-through transition-colors"
          title="مشطوب (Strike)"
        >
          S
        </button>

        <div class="w-px h-5 bg-slate-300 mx-1"></div>

        <!-- Headings Select -->
        <select 
          @change="onHeadingChange" 
          class="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 outline-none cursor-pointer"
        >
          <option value="p">نص عادي</option>
          <option value="h2">عنوان رئيسي (H2)</option>
          <option value="h3">عنوان فرعي (H3)</option>
        </select>

        <div class="w-px h-5 bg-slate-300 mx-1"></div>

        <!-- Lists -->
        <button 
          type="button" 
          @click="execCommand('insertUnorderedList')" 
          class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center transition-colors"
          title="قائمة نقطية"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>

        <button 
          type="button" 
          @click="execCommand('insertOrderedList')" 
          class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center transition-colors"
          title="قائمة رقمية"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 6h13M7 12h13M7 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
        </button>

        <div class="w-px h-5 bg-slate-300 mx-1"></div>

        <!-- Alignment -->
        <button 
          type="button" 
          @click="execCommand('justifyRight')" 
          class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center transition-colors"
          title="محاذاة لليمين"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M10 12h10M6 18h14" /></svg>
        </button>

        <button 
          type="button" 
          @click="execCommand('justifyCenter')" 
          class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center transition-colors"
          title="محاذاة في الوسط"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M7 12h10M5 18h14" /></svg>
        </button>

        <button 
          type="button" 
          @click="execCommand('justifyLeft')" 
          class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center transition-colors"
          title="محاذاة لليسار"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h10M4 18h14" /></svg>
        </button>

        <div class="w-px h-5 bg-slate-300 mx-1 ms-auto"></div>

        <!-- Clear Formatting -->
        <button 
          type="button" 
          @click="execCommand('removeFormat')" 
          class="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 text-[11px] font-bold transition-colors"
          title="إزالة التنسيقات"
        >
          مسح التنسيق
        </button>
      </div>

      <!-- EDITABLE AREA -->
      <div 
        ref="editorRef"
        contenteditable="true"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :dir="dir"
        class="p-4 min-h-[140px] max-h-[300px] overflow-y-auto text-sm font-medium text-[#0B0E28] outline-none prose prose-slate max-w-none focus:outline-none"
        :data-placeholder="placeholder"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  placeholder?: string
  required?: boolean
  dir?: 'rtl' | 'ltr'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  placeholder: 'اكتب وصفاً مفصلاً ومسقاً هنا...',
  required: false,
  dir: 'rtl'
})

const emit = defineEmits(['update:modelValue'])

const editorRef = ref<HTMLDivElement | null>(null)
const isFocused = ref(false)

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue || ''
  }
})

watch(() => props.modelValue, (newVal) => {
  if (editorRef.value && editorRef.value.innerHTML !== newVal) {
    editorRef.value.innerHTML = newVal || ''
  }
})

const onInput = () => {
  if (editorRef.value) {
    emit('update:modelValue', editorRef.value.innerHTML)
  }
}

const execCommand = (command: string, value: string = '') => {
  document.execCommand(command, false, value)
  if (editorRef.value) {
    emit('update:modelValue', editorRef.value.innerHTML)
  }
}

const onHeadingChange = (e: Event) => {
  const select = e.target as HTMLSelectElement
  execCommand('formatBlock', select.value)
}
</script>

<style scoped>
[contenteditable=true]:empty:before {
  content: attr(data-placeholder);
  color: #94a3b8;
  pointer-events: none;
  font-weight: 500;
}
</style>
