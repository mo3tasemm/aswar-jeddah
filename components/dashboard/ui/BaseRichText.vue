<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" class="text-sm font-bold text-slate-700">
      {{ label }}
    </label>
    
    <div 
      class="border rounded-lg overflow-hidden transition-all duration-200 flex flex-col"
      :class="[
        error ? 'border-red-500' : 'border-slate-300 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20'
      ]"
    >
      <!-- Toolbar -->
      <div class="bg-slate-50 border-b border-slate-200 p-2 flex items-center gap-1 shrink-0">
        <button 
          v-for="btn in toolbarButtons" 
          :key="btn.command"
          type="button"
          @click.prevent="format(btn.command, btn.value)"
          class="w-8 h-8 flex items-center justify-center rounded text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          :title="btn.title"
        >
          <span v-html="btn.icon"></span>
        </button>
      </div>

      <!-- Editor Area -->
      <div 
        ref="editorRef"
        class="w-full min-h-[150px] max-h-[300px] overflow-y-auto p-4 text-sm text-slate-800 bg-white outline-none prose prose-sm max-w-none"
        contenteditable="true"
        @input="onInput"
        @blur="onBlur"
        dir="rtl"
      ></div>
    </div>
    
    <!-- Error Message -->
    <Transition name="fade-down">
      <span v-if="error" class="text-xs font-bold text-red-500 mt-0.5">
        {{ error }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  modelValue?: string
  label?: string
  error?: string
}>()

const emit = defineEmits(['update:modelValue', 'blur'])

const editorRef = ref<HTMLElement | null>(null)
let isComposing = false

// Initial value setup
onMounted(() => {
  if (editorRef.value && props.modelValue) {
    editorRef.value.innerHTML = props.modelValue
  }
})

// Watch for external modelValue changes (e.g. form reset or data load)
watch(() => props.modelValue, (newVal) => {
  if (editorRef.value && newVal !== editorRef.value.innerHTML) {
    editorRef.value.innerHTML = newVal || ''
  }
})

const onInput = () => {
  if (editorRef.value) {
    emit('update:modelValue', editorRef.value.innerHTML)
  }
}

const onBlur = () => {
  emit('blur')
}

const format = (command: string, value?: string) => {
  document.execCommand(command, false, value)
  editorRef.value?.focus()
  onInput()
}

// Minimal Toolbar icons (SVG inline for simplicity)
const toolbarButtons = [
  { command: 'bold', title: 'عريض', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>' },
  { command: 'italic', title: 'مائل', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>' },
  { command: 'underline', title: 'تسطير', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>' },
  { command: 'insertUnorderedList', title: 'قائمة نقطية', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' },
  { command: 'insertOrderedList', title: 'قائمة رقمية', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>' },
]
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
