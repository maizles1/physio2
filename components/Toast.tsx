'use client'

import { useEffect, useState } from 'react'
import { toast as toastUtil, subscribe, type Toast } from '@/lib/toast'

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const unsubscribe = subscribe(setToasts)
    return unsubscribe
  }, [])

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed top-4 left-4 z-[9999] flex flex-col gap-2 max-w-md w-full"
      role="region"
      aria-live="polite"
      aria-label="התראות"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

function ToastItem({ toast }: { toast: Toast }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      setIsVisible(false)
      toastUtil.remove(toast.id)
    }, 300)
  }

  if (!isVisible) return null

  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-900',
      icon: 'text-green-600',
      iconBg: 'bg-green-100',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-900',
      icon: 'text-red-600',
      iconBg: 'bg-red-100',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-900',
      icon: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      icon: 'text-blue-600',
      iconBg: 'bg-blue-100',
    },
  }

  const styles = typeStyles[toast.type]

  return (
    <div
      className={`
        ${styles.bg} ${styles.border} ${styles.text}
        border rounded-lg shadow-lg p-4 flex items-start gap-3
        transition-all duration-300
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
      `}
      role="alert"
      aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
    >
      {/* Icon */}
      <div className={`${styles.iconBg} ${styles.icon} rounded-full p-1.5 flex-shrink-0`}>
        {toast.type === 'success' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {toast.type === 'error' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {toast.type === 'warning' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.154 0 2.082-.785 2.082-1.75 0-.716-.573-1.33-1.37-1.725L12 18l-7.513-4.475c-.797-.395-1.37-1.009-1.37-1.725 0-.965.928-1.75 2.082-1.75h13.856c1.154 0 2.082.785 2.082 1.75z" />
          </svg>
        )}
        {toast.type === 'info' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </div>

      {/* Message */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{toast.message}</p>
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
        aria-label="סגור התראה"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
