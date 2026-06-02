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
    '木': '仁慈温和，富有创造力与生长力，如春木般生机勃勃。木命之人天生具有慈悲心肠，待人宽厚真诚，善于培育和滋养周围的一切。你拥有不断向上的成长动力，如同树木向阳而生，在逆境中反而能激发出更强的韧性。你的想象力丰富，对美和艺术有天然的感知力，常常能提出新颖的创意和解决方案。',
    '火': '热情开朗，充满活力与感染力，如夏日阳光般温暖明亮。火命之人天生具有强大的感染力，走到哪里都能成为人群的中心，你的热情能点燃他人的希望。你行动力极强，想到就去做，不拖泥带水，但也因此有时显得急躁冲动。你拥有一颗光明磊落的心，厌恶阴暗和虚伪，待人处事坦荡直接，是朋友圈中最值得信赖的那道光。',
    '土': '稳重诚实，包容大度，如大地般承载万物而不言。土命之人是天生的稳定器，无论在家庭还是工作中，你都是那个让人感到安心和踏实的存在。你做事有条不紊，脚踏实地，不急不躁，能够持之以恒地朝着目标前进。你的包容心极强，能接纳不同的人和事，但也容易把太多责任揽在自己身上。你的忠诚和可靠是最宝贵的品质，值得一生珍视。',
    '金': '刚毅果断，重义轻利，如金石般坚硬不屈。金命之人天生具有强烈的正义感和原则性，对于是非对错有清晰的判断，绝不轻易妥协。你做事雷厉风行，意志坚定，一旦下定决心就会全力以赴，不达目的不罢休。你重视承诺和信用，言出必行，在人群中拥有很高的威望。但有时也需注意刚柔并济，过于刚硬反而容易折断，学会适当柔软是一种更高的智慧。',
    '水': '智慧深沉，随形而变，如流水般灵动而富有智慧。水命之人天生具有敏锐的洞察力和深刻的直觉，能看透事物的本质，在复杂的环境中游刃有余。你适应力极强，无论身处何种境地都能找到生存和发展的方式，如同水能适应任何容器的形状。你的内在世界丰富而深邃，喜欢独处和沉思，在安静中汲取力量。但有时情绪波动较大，需要学会让自己的内心保持如镜面般平静。',
  }

  // Build element balance analysis
  const elementAnalysis: Record<string, string> = {
    '木': '木气旺盛，象征生命力与成长能量充沛。您天生具有强烈的进取心和创造力，如同春日破土而出的嫩芽，拥有不可阻挡的向上力量。木旺之人适合从事教育、医疗、文化艺术等需要培育和创造的工作。建议适当增加金的元素来修剪和规范，避免过于发散而失去焦点。生活中多接触白色、金属类物品，有助于平衡命局。',
    '火': '火气旺盛，象征热情与光明的能量充沛。您的生命充满激情和动力，如同熊熊燃烧的火焰，能照亮自己也能温暖他人。火旺之人适合从事演艺、公关、领导等需要感染力和表现力的工作。火过旺则需水来调和，避免热情燃尽或冲动行事。建议多接触水元素，如游泳、养鱼、穿着蓝色系服饰，以达水火既济之妙。',
    '土': '土气旺盛，象征稳重与包容的能量充沛。您如同大地般坚实可靠，是周围人最信赖的依靠。土旺之人适合从事建筑、金融、管理等需要稳健和专业的工作。土过重则可能显得保守或因循守旧，需要适当引入木的能量来突破和生长。多亲近大自然，种植绿色植物，让生机勃勃的木元素为您注入新的活力。',
    '金': '金气旺盛，象征刚毅与正义的能量充沛。您具有强烈的原则性和执行力，如同经过千锤百炼的精金，坚韧而纯粹。金旺之人适合从事法律、军事、工程等需要纪律和精确的工作。金过刚则易折，需要适当以火来熔化锻造，以水来柔化。学会在坚持原则的同时适度变通，让自己的生命既有硬度又有韧性。',
    '水': '水气旺盛，象征智慧与灵动的能量充沛。您的内心世界深不可测，如同浩瀚的海洋，蕴藏着无穷的智慧和创造力。水旺之人适合从事学术研究、心理咨询、艺术创作等需要深度思考的工作。水过盛则可能流于优柔或情绪化，需要土来筑堤引导。多进行户外踏青、登山等活动，让厚重的大地能量为您提供稳定感。',
  }

  // Life advice based on day master element
  const lifeAdvice: Record<string, string> = {
    '木': '人生建议：您的人生如同树木的生长，需要耐心和积累。不要急于求成，每一圈年轮都是岁月的馈赠。在人际关系中，学会适度表达自己的需求，仁爱他人也要善待自己。健康方面注重肝脏和筋骨的养护，保持规律的运动习惯。幸运方位为东方，幸运颜色为绿色系。',
    '火': '人生建议：您的人生如同火焰的燃烧，需要找到持久的燃料和方向。将热情聚焦在少数真正重要的事情上，而非四处点火。在人际关系中，学会倾听和等待，不是每个人都跟得上您的节奏。健康方面注重心脏和血液循环，避免过度劳累。幸运方位为南方，幸运颜色为红色系。',
    '土': '人生建议：您的人生如同大地的积淀，厚积方能薄发。相信自己的节奏，不必与他人比较快慢。在人际关系中，学会适当放手，信任他人也有承担的能力。健康方面注重脾胃的调理，饮食规律是最基本的养生之道。幸运方位为中央，幸运颜色为黄色和棕色系。',
    '金': '人生建议：您的人生如同金石的雕琢，需要经历磨砺才能绽放光芒。在坚守原则的同时，学会换位思考和柔性处理。在人际关系中，表达观点时多一分温和，效果往往会更好。健康方面注重肺部和呼吸系统的保养，多进行有氧运动。幸运方位为西方，幸运颜色为白色和金色系。',
    '水': '人生建议：您的人生如同水流的旅程，顺势而为比逆流而上更有智慧。信任自己的直觉，它往往是正确的导航。在人际关系中，适当打开心扉，让他人看到您的真实感受。健康方面注重肾脏和泌尿系统的养护，保持充足的水分摄入。幸运方位为北方，幸运颜色为蓝色和黑色系。',
  }

  const elementBalance = elementAnalysis[dominant] || ''
  const advice = lifeAdvice[dayElement] || ''

  return `您的日主为${dayElement}，${elementTraits[dayElement] || ''}

从八字整体格局来看，${dominant}元素在您的命盘中最为旺盛，五行分布为：木${elements['木'] || 0}、火${elements['火'] || 0}、土${elements['土'] || 0}、金${elements['金'] || 0}、水${elements['水'] || 0}。${dayElement === dominant ? '日主得令且旺神与日主同气，命局能量充沛而集中，您天生就拥有强烈的自我意识和明确的奋斗方向。这样的格局往往意味着人生目标清晰，只要坚持正道，必能成就一番事业。' : `日主${dayElement}与旺神${dominant}之间形成了独特的能量互动关系。${dayElement === '木' && dominant === '金' ? '金克木的格局赋予您刚柔相济的特质，在创造力之外还具备难得的执行力和纪律性。' : dayElement === '火' && dominant === '水' ? '水克火的格局让您的热情中带着理性和克制，是典型的智勇双全之命。' : dayElement === '土' && dominant === '木' ? '木克土的格局让您在稳重之外还拥有开拓进取的精神，根基深厚又勇于突破。' : dayElement === '金' && dominant === '火' ? '火克金的格局使您经历千锤百炼，每一次挑战都将您淬炼得更加纯粹强大。' : dayElement === '水' && dominant === '土' ? '土克水的格局赋予您在灵动之外多了一份厚重和踏实，智谋与实干兼具。' : '这种组合赋予您独特的性格特质和命运走向，需要您在人生中不断探索和磨合。'}此命格预示着丰富而充实的人生旅程。`}

${elementBalance}

${advice}

此八字排盘结果仅供娱乐参考，命运终究掌握在自己手中。愿您在了解命理的同时，更加珍惜当下，用心经营每一天的生活。`
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
