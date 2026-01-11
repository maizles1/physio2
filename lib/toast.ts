/**
 * Toast notification utility functions
 * Provides a simple API for showing toast notifications
 */

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration?: number
}

let toastListeners: ((toasts: Toast[]) => void)[] = []
let toasts: Toast[] = []

export function subscribe(listener: (toasts: Toast[]) => void) {
  toastListeners.push(listener)
  return () => {
    toastListeners = toastListeners.filter((l) => l !== listener)
  }
}

function notify() {
  toastListeners.forEach((listener) => listener([...toasts]))
}

function addToast(toast: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substring(2, 9)
  const newToast: Toast = {
    id,
    duration: 5000,
    ...toast,
  }
  toasts.push(newToast)
  notify()

  // Auto remove after duration
  if (newToast.duration && newToast.duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, newToast.duration)
  }

  return id
}

function removeToast(id: string) {
  toasts = toasts.filter((t) => t.id !== id)
  notify()
}

export const toast = {
  success: (message: string, duration?: number) => {
    return addToast({ type: 'success', message, duration })
  },
  error: (message: string, duration?: number) => {
    return addToast({ type: 'error', message, duration: duration || 7000 })
  },
  warning: (message: string, duration?: number) => {
    return addToast({ type: 'warning', message, duration })
  },
  info: (message: string, duration?: number) => {
    return addToast({ type: 'info', message, duration })
  },
  remove: removeToast,
  clear: () => {
    toasts = []
    notify()
  },
}
