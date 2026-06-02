import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/Button'
import { Select } from '@/components/Input'
import LoadingSpinner from '@/components/LoadingSpinner'
import FortuneResult from '@/components/FortuneResult'

// Hour options (时辰)
const HOUR_OPTIONS = [
  { value: '0', label: '子时 (23:00-01:00)' },
  { value: '1', label: '丑时 (01:00-03:00)' },
  { value: '2', label: '寅时 (03:00-05:00)' },
  { value: '3', label: '卯时 (05:00-07:00)' },
  { value: '4', label: '辰时 (07:00-09:00)' },
  { value: '5', label: '巳时 (09:00-11:00)' },
  { value: '6', label: '午时 (11:00-13:00)' },
  { value: '7', label: '未时 (13:00-15:00)' },
  { value: '8', label: '申时 (15:00-17:00)' },
  { value: '9', label: '酉时 (17:00-19:00)' },
  { value: '10', label: '戌时 (19:00-21:00)' },
  { value: '11', label: '亥时 (21:00-23:00)' },
]

// Simplified BaZi calculation (no external dependency needed for demo)
interface Pillar {
  stem: string
  branch: string
  element: string
}

const STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const STEM_ELEMENTS: Record<string, string> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
}
const BRANCH_ELEMENTS: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水',
}

function calculateBaZi(year: number, month: number, day: number, hourIndex: number) {
  // Year pillar
  const yearStemIdx = (year - 4) % 10
  const yearBranchIdx = (year - 4) % 12
  const yearPillar: Pillar = {
    stem: STEMS[yearStemIdx],
    branch: BRANCHES[yearBranchIdx],
    element: STEM_ELEMENTS[STEMS[yearStemIdx]],
  }

  // Month pillar (based on year stem and solar month)
  // Month stem = (yearStemIndex * 2 + month) % 10
  const monthStemIdx = (yearStemIdx * 2 + month) % 10
  const monthBranchIdx = (month + 1) % 12 // 寅月=正月
  const monthPillar: Pillar = {
    stem: STEMS[monthStemIdx],
    branch: BRANCHES[monthBranchIdx],
    element: STEM_ELEMENTS[STEMS[monthStemIdx]],
  }

  // Day pillar (simplified: use known base + days elapsed)
  // Base: 1900-01-01 = 甲戌日 (stemIndex=0, branchIndex=10)
  const baseDate = new Date(1900, 0, 1)
  const targetDate = new Date(year, month - 1, day)
  const daysDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (86400000))
  const dayStemIdx = ((daysDiff % 10) + 10) % 10
  const dayBranchIdx = ((daysDiff % 12) + 10) % 12
  const dayPillar: Pillar = {
    stem: STEMS[dayStemIdx],
    branch: BRANCHES[dayBranchIdx],
    element: STEM_ELEMENTS[STEMS[dayStemIdx]],
  }

  // Hour pillar: hour stem = (dayStemIndex * 2 + hourBranchIndex) % 10
  const hourBranchIdx = hourIndex
  const hourStemIdx = (dayStemIdx * 2 + hourBranchIdx) % 10
  const hourPillar: Pillar = {
    stem: STEMS[hourStemIdx],
    branch: BRANCHES[hourBranchIdx],
    element: STEM_ELEMENTS[STEMS[hourStemIdx]],
  }

  // Five elements distribution
  const elements: Record<string, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 }
  ;[yearPillar, monthPillar, dayPillar, hourPillar].forEach((p) => {
    elements[STEM_ELEMENTS[p.stem]]++
    elements[BRANCH_ELEMENTS[p.branch]]++
  })

  // Day master element
  const dayMaster = dayPillar.stem
  const dayElement = STEM_ELEMENTS[dayMaster]

  // Generate summary
  const dominantElement = Object.entries(elements).sort((a, b) => b[1] - a[1])[0][0]
  const summary = generateSummary(dayElement, dominantElement, elements)

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    elements,
    summary,
  }
}

function generateSummary(dayElement: string, dominant: string, elements: Record<string, number>): string {
  const elementNames: Record<string, string> = {
    '木': '木', '火': '火', '土': '土', '金': '金', '水': '水',
  }
  const elementTraits: Record<string, string> = {
    '木': '仁慈温和，富有创造力与生长力，如春木般生机勃勃',
    '火': '热情开朗，充满活力与感染力，如夏日阳光般温暖明亮',
    '土': '稳重诚实，包容大度，如大地般承载万物而不言',
    '金': '刚毅果断，重义轻利，如金石般坚硬不屈',
    '水': '智慧深沉，随形而变，如流水般灵动而富有智慧',
  }

  return `您的日主为${dayElement}，${elementTraits[dayElement] || ''}。
八字中${dominant}元素最为旺盛，五行分布为：木${elements['木'] || 0}、火${elements['火'] || 0}、土${elements['土'] || 0}、金${elements['金'] || 0}、水${elements['水'] || 0}。
${dayElement === dominant ? '日主得令，命局平衡，运势顺畅。' : `日主${dayElement}与旺神${dominant}的互动关系，决定了您命格的主要特征。`}
此八字排盘结果仅供娱乐参考，命运终究掌握在自己手中。`
}

export default function BaZi() {
  const [year, setYear] = useState(2000)
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [hourIdx, setHourIdx] = useState(5) // default 午时
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ReturnType<typeof calculateBaZi> | null>(null)

  const handleCalculate = async () => {
    setLoading(true)
    // Add a small delay for dramatic effect
    await new Promise((r) => setTimeout(r, 800))
    setResult(calculateBaZi(year, month, day, hourIdx))
    setLoading(false)
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4 font-[family-name:var(--font-heading-cn)]">
          八字算命
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          四柱八字，又称子平八字，通过您的出生年月日时推算命盘，
          解码五行生克关系，洞悉性格密码与人生轨迹
        </p>
      </motion.div>

      {!result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 sm:p-8 rounded-2xl max-w-lg mx-auto"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Select
              label="出生年份"
              options={years.map((y) => ({ value: String(y), label: `${y} 年` }))}
              value={String(year)}
              onChange={(e) => setYear(Number(e.target.value))}
            />
            <Select
              label="出生月份"
              options={months.map((m) => ({ value: String(m), label: `${m} 月` }))}
              value={String(month)}
              onChange={(e) => setMonth(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Select
              label="出生日期"
              options={days.map((d) => ({
                value: String(d),
                label: `${d} 日`,
              }))}
              value={String(day)}
              onChange={(e) => setDay(Number(e.target.value))}
            />
            <Select
              label="出生时辰"
              options={HOUR_OPTIONS}
              value={String(hourIdx)}
              onChange={(e) => setHourIdx(Number(e.target.value))}
            />
          </div>

          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={handleCalculate}
          >
            开始排盘
          </Button>
        </motion.div>
      )}

      {loading && <LoadingSpinner text="正在推算八字命盘..." />}

      <AnimatePresence>
        {result && !loading && (
          <motion.div key="result">
            <FortuneResult title="八字命盘" subtitle={`出生于 ${year}年${month}月${day}日`}>
              {/* Four Pillars Table */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4 mb-8">
                {([
                  { label: '年柱', pillar: result.yearPillar },
                  { label: '月柱', pillar: result.monthPillar },
                  { label: '日柱', pillar: result.dayPillar },
                  { label: '时柱', pillar: result.hourPillar },
                ]).map(({ label, pillar }) => (
                  <div key={label} className="text-center">
                    <div className="text-xs text-text-secondary mb-1">{label}</div>
                    <div className="glass p-3 rounded-xl">
                      <div className="text-2xl sm:text-3xl font-bold text-gold font-[family-name:var(--font-heading-cn)] mb-1">
                        {pillar.stem}{pillar.branch}
                      </div>
                      <div className="text-xs text-text-secondary">
                        {pillar.element} · {pillar.stem}{pillar.branch}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Five Elements */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gold mb-4 font-[family-name:var(--font-heading-cn)]">
                  五行分布
                </h3>
                <div className="space-y-2">
                  {Object.entries(result.elements).map(([el, count]) => {
                    const colors: Record<string, string> = {
                      '木': 'bg-emerald-500/20 border-emerald-500/30',
                      '火': 'bg-red-500/20 border-red-500/30',
                      '土': 'bg-amber-500/20 border-amber-500/30',
                      '金': 'bg-yellow-500/20 border-yellow-500/30',
                      '水': 'bg-blue-500/20 border-blue-500/30',
                    }
                    return (
                      <div key={el} className="flex items-center gap-3">
                        <span className="w-8 text-sm text-text-secondary">{el}</span>
                        <div className="flex-1 h-6 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(count / 8) * 100}%` }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className={`h-full rounded-full border ${colors[el] || 'bg-gold/20 border-gold/30'}`}
                          />
                        </div>
                        <span className="text-sm text-text-secondary w-4">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-lg font-bold text-gold mb-4 font-[family-name:var(--font-heading-cn)]">
                  命理解读
                </h3>
                <p className="text-text-primary leading-relaxed">{result.summary}</p>
              </div>

              <div className="mt-8 text-center">
                <Button variant="ghost" onClick={() => { setResult(null) }}>
                  重新排盘
                </Button>
              </div>
            </FortuneResult>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
