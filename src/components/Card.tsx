import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

export default function Card({ children, className = '', hover = true, glow = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        glass p-6 rounded-2xl
        ${hover ? 'glass-hover cursor-pointer' : ''}
        ${glow ? 'shadow-[0_0_30px_rgba(212,167,116,0.1)]' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
