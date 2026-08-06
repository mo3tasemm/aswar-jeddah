import { computed } from 'vue';
import type { CartItem, Product } from '~/types';

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => [
    {
      product: {
        id: '201',
        title: 'تريم سميج - غلاية ماء بسعة 1.7 لتر - أسود',
        slug: 'smeg-kettle-1-7l-black',
        price: 29999,
        formattedPrice: '29.999,00 EGP',
        images: ['https://images.unsplash.com/photo-1585659722983-38ca899af4e3?w=800&q=80'],
        description: 'غلاية ماء سميج بتصميم أنيق كلاسيكي.',
        category: 'أجهزة المطبخ',
        inStock: true,
        brand: 'SMEG',
        sku: 'KLF03BLEU',
      },
      quantity: 1,
    }
  ]);
  const isCartOpen = useState<boolean>('isCartOpen', () => false);

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };

  const openCart = () => {
    isCartOpen.value = true;
  };

  const closeCart = () => {
    isCartOpen.value = false;
  };

  const addToCart = (product: Product, quantity: number = 1, size?: string, color?: string) => {
    const existingItemIndex = cart.value.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
    );

    if (existingItemIndex > -1) {
      cart.value[existingItemIndex].quantity += quantity;
    } else {
      cart.value.push({
        product,
        quantity,
        selectedSize: size,
        selectedColor: color,
      });
    }
  };

  const removeFromCart = (productId: string | number) => {
    cart.value = cart.value.filter((item) => item.product.id !== productId);
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    const item = cart.value.find((item) => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    }
  };

  const cartCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
  });

  const formattedCartTotal = computed(() => {
    const total = cartTotal.value;
    return total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' EGP';
  });

  return {
    cart,
    isCartOpen,
    toggleCart,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal,
    formattedCartTotal,
  };
};
