import type { InputHTMLAttributes, SelectHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-text-secondary">{label}</label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl
          bg-white/5 border border-white/10
          text-text-primary placeholder:text-text-secondary/40
          focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20
          transition-all duration-300
          ${error ? 'border-red-500/50 focus:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: Array<{ value: string; label: string }>
}

export function Select({ label, options, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-text-secondary">{label}</label>
      )}
      <select
        className={`
          w-full px-4 py-3 rounded-xl
          bg-white/5 border border-white/10
          text-text-primary
          focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20
          transition-all duration-300 appearance-none
          bg-no-repeat bg-[length:1.25rem]
          ${className}
        `}
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4a574'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center' }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-bg-secondary text-text-primary">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
