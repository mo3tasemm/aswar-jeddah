<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-bold transition-all duration-200 ease-in-out whitespace-nowrap outline-none focus:ring-2 focus:ring-offset-1',
      sizeClasses[size],
      variantClasses[variant],
      (disabled || loading) ? 'opacity-60 cursor-not-allowed' : 'active:scale-[0.98]'
    ]"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin -mr-1 ml-2 h-4 w-4 text-current"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  loading: false,
  disabled: false,
})

defineEmits(['click'])

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-8 py-3.5 text-base rounded-xl',
}

const variantClasses = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm shadow-indigo-200',
  secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-400',
  outline: 'border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 focus:ring-slate-300',
  danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400 shadow-sm shadow-red-200',
}
</script>
