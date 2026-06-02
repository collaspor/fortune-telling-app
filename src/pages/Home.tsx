import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Compass, Sparkles } from 'lucide-react'
import type { FortuneMeta } from '@/types'

const fortuneMethods: FortuneMeta[] = [
  {
    id: 'bazi', name: 'Ba Zi', nameCn: '八字算命',
    category: 'chinese',
    description: '通过出生年月日时推算四柱八字，解读五行命理，洞悉人生轨迹',
    icon: '☯️', path: '/bazi',
  },
  {
    id: 'iching', name: 'I Ching', nameCn: '易经占卜',
    category: 'chinese',
    description: '以三枚铜钱起卦，得六爻卦象，解天地玄机，明吉凶祸福',
    icon: '📜', path: '/iching',
  },
  {
    id: 'zodiac', name: 'Chinese Zodiac', nameCn: '生肖运势',
    category: 'chinese',
    description: '十二生肖轮转不息，探寻流年运势，了解你与生俱来的生肖密码',
    icon: '🐉', path: '/zodiac',
  },
  {
    id: 'tarot', name: 'Tarot', nameCn: '塔罗牌占卜',
    category: 'western',
    description: '78张神秘塔罗牌，映照内心世界，揭示过去、现在与未来的交织',
    icon: '🃏', path: '/tarot',
  },
  {
    id: 'horoscope', name: 'Horoscope', nameCn: '星座运势',
    category: 'western',
    description: '十二星座的星辰指引，解读性格特质，每日运势一触即知',
    icon: '⭐', path: '/horoscope',
  },
  {
    id: 'numerology', name: 'Numerology', nameCn: '数字命理',
    category: 'western',
    description: '数字蕴含宇宙振动频率，从生命灵数中发掘你的天赋使命',
    icon: '🔢', path: '/numerology',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
}

export default function Home() {
  const chinese = fortuneMethods.filter((f) => f.category === 'chinese')
  const western = fortuneMethods.filter((f) => f.category === 'western')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 px-4">
        {/* Animated stars background */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gold animate-twinkle"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 font-[family-name:var(--font-heading-cn)]">
              <span className="text-gradient">探索命运的奥秘</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              融汇东方智慧与西方神秘学，以古老技艺解读命运密码
              <br />
              每一次占卜，都是一场与自我的对话
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link to="/bazi" className="btn-gold text-lg px-8 py-3">
              开始探索
            </Link>
            <a href="#methods" className="btn-ghost text-lg px-8 py-3">
              查看全部
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gold/30 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-gold/60" />
          </div>
        </motion.div>
      </section>

      {/* Methods Section */}
      <section id="methods" className="max-w-7xl mx-auto px-4 pb-20">
        {/* Chinese Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Compass className="w-8 h-8 text-gold" />
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading-cn)]">
              中国传统占卜
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {chinese.map((method) => (
              <MethodCard key={method.id} method={method} />
            ))}
          </motion.div>
        </div>

        {/* Western Section */}
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <Sparkles className="w-8 h-8 text-gold" />
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading-cn)]">
              西方神秘学占卜
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {western.map((method) => (
              <MethodCard key={method.id} method={method} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function MethodCard({ method }: { method: FortuneMeta }) {
  return (
    <motion.div variants={item}>
      <Link to={method.path}>
        <div className="glass glass-hover p-6 h-full cursor-pointer group">
          <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110">
            {method.icon}
          </div>
          <h3 className="text-xl font-bold text-gold mb-2 font-[family-name:var(--font-heading-cn)]">
            {method.nameCn}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {method.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-gold/60 text-sm group-hover:text-gold transition-colors">
            <span>开始占卜</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
