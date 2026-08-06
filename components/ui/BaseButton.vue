<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center font-medium uppercase tracking-widest transition-all duration-300 ease-in-out',
      sizeClasses[size],
      variantClasses[variant],
      { 'opacity-50 cursor-not-allowed': disabled || loading }
    ]"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
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
  variant?: 'primary' | 'secondary' | 'outline' | 'gold'
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
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const variantClasses = {
  primary: 'bg-luxury-black text-luxury-cream hover:bg-gray-800',
  secondary: 'bg-gray-200 text-luxury-black hover:bg-gray-300',
  outline: 'border-2 border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-luxury-cream',
  gold: 'bg-luxury-gold text-luxury-black hover:brightness-110',
}
</script>
