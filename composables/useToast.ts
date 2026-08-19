import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  title: string
  message: string
  type: ToastType
  duration?: number
}

// Global state for toasts
const toasts = ref<Toast[]>([])

export const useToast = () => {
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: Toast = { ...toast, id, duration: toast.duration || 3000 }
    
    toasts.value.push(newToast)

    if (newToast.duration! > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (title: string, message: string = '', duration: number = 3000) => {
    addToast({ title, message, type: 'success', duration })
  }

  const error = (title: string, message: string = '', duration: number = 4000) => {
    addToast({ title, message, type: 'error', duration })
  }

  const info = (title: string, message: string = '', duration: number = 3000) => {
    addToast({ title, message, type: 'info', duration })
  }

  const warning = (title: string, message: string = '', duration: number = 4000) => {
    addToast({ title, message, type: 'warning', duration })
  }

  const showToast = (options: { type?: ToastType; title?: string; message: string; duration?: number }) => {
    addToast({
      title: options.title || (options.type === 'success' ? 'نجاح' : options.type === 'error' ? 'خطأ' : 'تنبيه'),
      message: options.message || '',
      type: options.type || 'info',
      duration: options.duration || 3500
    })
  }

  return {
    toasts,
    addToast,
    showToast,
    removeToast,
    success,
    error,
    info,
    warning
  }
}
