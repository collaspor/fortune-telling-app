import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ScrollText } from 'lucide-react'

interface FortuneResultProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export default function FortuneResult({ title, subtitle, children, className = '' }: FortuneResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`${className}`}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/20 mb-4"
        >
          <ScrollText className="w-8 h-8 text-gold" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gradient font-[family-name:var(--font-heading-cn)] mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-text-secondary text-sm">{subtitle}</p>
        )}
      </div>

      {/* Scroll-like card */}
      <div className="relative glass p-6 sm:p-8 rounded-2xl border border-gold/10 shadow-[0_0_40px_rgba(212,167,116,0.05)]">
        {/* Decorative top border */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative">
          {children}
        </div>
      </div>
    </motion.div>
  )
}
