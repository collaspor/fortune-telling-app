import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Compass } from 'lucide-react'

const navLinks = [
  { path: '/', label: '首页' },
  {
    label: '中国传统',
    children: [
      { path: '/bazi', label: '八字算命' },
      { path: '/iching', label: '易经占卜' },
      { path: '/zodiac', label: '生肖运势' },
    ],
  },
  {
    label: '西方占卜',
    children: [
      { path: '/tarot', label: '塔罗牌' },
      { path: '/horoscope', label: '星座运势' },
      { path: '/numerology', label: '数字命理' },
    ],
  },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <nav className="sticky top-0 z-50 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Compass className="w-7 h-7 text-gold group-hover:animate-glow-pulse" />
            <span className="text-xl font-bold text-gradient font-[family-name:var(--font-heading-cn)]">
              命理探索
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              if ('path' in item && item.path) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'bg-gold/10 text-gold border border-gold/20'
                        : 'text-text-secondary hover:text-gold hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              }
              // Dropdown group
              const isActive = item.children?.some((c) => location.pathname === c.path)
              return (
                <div key={item.label} className="relative group/dropdown">
                  <span
                    className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'text-gold bg-gold/5'
                        : 'text-text-secondary hover:text-gold hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </span>
                  <div className="absolute top-full left-0 mt-1 w-40 py-2 glass opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all duration-200">
                    {item.children?.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          location.pathname === child.path
                            ? 'text-gold bg-gold/10'
                            : 'text-text-secondary hover:text-gold hover:bg-white/5'
                        }`}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-text-secondary hover:text-gold transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border-subtle bg-bg-primary/95 backdrop-blur-md">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((item) => {
              if ('path' in item && item.path) {
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm transition-all ${
                      location.pathname === item.path
                        ? 'bg-gold/10 text-gold border border-gold/20'
                        : 'text-text-secondary hover:text-gold'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              }
              return (
                <div key={item.label}>
                  <div className="px-4 py-2 text-xs font-semibold text-gold/60 uppercase tracking-wider">
                    {item.label}
                  </div>
                  {item.children?.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block pl-8 pr-4 py-2 rounded-lg text-sm transition-all ${
                        location.pathname === child.path
                          ? 'text-gold bg-gold/10'
                          : 'text-text-secondary hover:text-gold'
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
