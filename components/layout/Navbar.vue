<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <!-- Mobile menu button -->
      <button class="md:hidden p-2 -ml-2 text-luxury-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <!-- We can add an image here later if needed: <img src="/logo.webp" alt="شركة أسوار جدة" class="h-10 w-auto" /> -->
        <span class="text-2xl md:text-3xl font-extrabold text-luxury-black tracking-tighter group-hover:text-luxury-gold transition-colors duration-300">أسوار <span class="font-light text-luxury-gold">جدة</span></span>
      </NuxtLink>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8">
        <NuxtLink to="/new" class="text-sm font-medium tracking-wider text-luxury-black hover:text-luxury-gold transition-colors">New Arrivals</NuxtLink>
        <NuxtLink to="/collections" class="text-sm font-medium tracking-wider text-luxury-black hover:text-luxury-gold transition-colors">Collections</NuxtLink>
        <NuxtLink to="/about" class="text-sm font-medium tracking-wider text-luxury-black hover:text-luxury-gold transition-colors">House</NuxtLink>
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center space-x-4 md:space-x-6">
        <button class="p-2 text-luxury-black hover:text-luxury-gold transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
        <button @click="toggleCart" class="p-2 text-luxury-black hover:text-luxury-gold transition-colors relative">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span v-if="cartCount > 0" class="absolute top-0 right-0 w-4 h-4 bg-luxury-gold text-luxury-black text-[10px] font-bold rounded-full flex items-center justify-center">
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'

const { toggleCart, cartCount } = useCart()
</script>
