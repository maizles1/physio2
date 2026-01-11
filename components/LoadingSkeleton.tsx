'use client'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'image'
  width?: string | number
  height?: string | number
  lines?: number
  animated?: boolean
}

export default function LoadingSkeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  lines = 1,
  animated = true,
}: LoadingSkeletonProps) {
  const baseClasses = `bg-gray-200 ${animated ? 'animate-pulse' : ''}`
  
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded',
    card: 'rounded-lg',
    image: 'rounded',
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`} role="status" aria-label="טוען...">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variantClasses.text}`}
            style={{
              ...style,
              width: i === lines - 1 ? '80%' : '100%',
            }}
          />
        ))}
        <span className="sr-only">טוען תוכן...</span>
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      role="status"
      aria-label="טוען..."
    >
      <span className="sr-only">טוען תוכן...</span>
    </div>
  )
}

// Pre-built skeleton components for common use cases
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 space-y-4 ${className}`}>
      <LoadingSkeleton variant="rectangular" height={200} className="w-full" />
      <LoadingSkeleton variant="text" lines={2} />
      <div className="flex gap-2">
        <LoadingSkeleton variant="rectangular" width={100} height={32} />
        <LoadingSkeleton variant="rectangular" width={100} height={32} />
      </div>
    </div>
  )
}

export function ImageSkeleton({ className = '', aspectRatio = '16/9' }: { className?: string; aspectRatio?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      <LoadingSkeleton variant="image" className="absolute inset-0 w-full h-full" />
    </div>
  )
}

export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return <LoadingSkeleton variant="text" lines={lines} className={className} />
}

export function AvatarSkeleton({ size = 40, className = '' }: { size?: number; className?: string }) {
  return <LoadingSkeleton variant="circular" width={size} height={size} className={className} />
}
