import { ref } from 'vue'
import type { CategoryItem } from '~/types/category'

export const useCategories = () => {
  const categories = ref<CategoryItem[]>([
    {
      id: 1,
      name: 'الشاشات',
      imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&q=80',
      linkUrl: '/category/screens',
    },
    {
      id: 2,
      name: 'التكييفات',
      imageUrl: 'https://images.unsplash.com/photo-1527359443443-84a48aec73d2?w=800&q=80',
      linkUrl: '/category/ac',
    },
    {
      id: 3,
      name: 'الغسالات',
      imageUrl: 'https://images.unsplash.com/photo-1626806819282-2c1dc0ed0fce?w=800&q=80',
      linkUrl: '/category/washing-machines',
    },
    {
      id: 4,
      name: 'الثلاجات',
      imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80',
      linkUrl: '/category/refrigerators',
    },
    {
      id: 5,
      name: 'أجهزة المطبخ',
      imageUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80',
      linkUrl: '/category/kitchen',
    },
    {
      id: 6,
      name: 'خلاطات',
      imageUrl: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800&q=80',
      linkUrl: '/category/blenders',
    },
    {
      id: 7,
      name: 'قلايات هوائية',
      imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80',
      linkUrl: '/category/air-fryers',
    },
    {
      id: 8,
      name: 'صانعة القهوة',
      imageUrl: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=800&q=80',
      linkUrl: '/category/coffee-makers',
    },
    {
      id: 9,
      name: 'عناية شخصية',
      imageUrl: 'https://images.unsplash.com/photo-1598971846467-9c9444458b29?w=800&q=80',
      linkUrl: '/category/personal-care',
    }
  ])

  return {
    categories
  }
}
