interface LoadingSpinnerProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function LoadingSpinner({ text = '命运之力正在运转...', size = 'md' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      {/* Mystical spinning ring */}
      <div className={`relative ${sizes[size]}`}>
        <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-gold animate-spin" style={{ animationDuration: '1.5s' }} />
        <div className="absolute inset-4 rounded-full border border-gold/10 animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-gold text-xl">☯</span>
        </div>
      </div>

      <p className="text-text-secondary text-sm animate-pulse">{text}</p>
    </div>
  )
}
