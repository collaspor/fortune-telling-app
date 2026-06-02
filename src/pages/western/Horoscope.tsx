import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { Select } from '@/components/Input'
import FortuneResult from '@/components/FortuneResult'

const HOROSCOPE_SIGNS = [
  { name: 'Aries', nameCn: '白羊座', symbol: '♈', dateRange: '3月21日 — 4月19日', element: '火', rulingPlanet: '火星', traits: ['勇敢', '热情', '直率', '领导力'], compatible: ['狮子座', '射手座', '双子座'], dailyHoroscope: '今天你的精力充沛，适合开启新项目。但在沟通中要注意语气，避免因直率而伤害他人。幸运色：红色。', weeklyHoroscope: '本周白羊座在工作上将迎来重要突破。周中可能遇到让你重新审视自己目标的契机。感情方面，坦诚的沟通将让关系更进一步。' },
  { name: 'Taurus', nameCn: '金牛座', symbol: '♉', dateRange: '4月20日 — 5月20日', element: '土', rulingPlanet: '金星', traits: ['耐心', '务实', '可靠', '享受生活'], compatible: ['处女座', '摩羯座', '巨蟹座'], dailyHoroscope: '今天适合处理财务相关的事务。稳扎稳打的节奏会给你带来意想不到的收获。幸运色：绿色。', weeklyHoroscope: '本周金牛座的财运不错，可能有额外的收入来源。感情方面需要多一些灵活和变通，固执可能会错失良缘。' },
  { name: 'Gemini', nameCn: '双子座', symbol: '♊', dateRange: '5月21日 — 6月21日', element: '风', rulingPlanet: '水星', traits: ['聪明', '好奇', '善于沟通', '多才多艺'], compatible: ['天秤座', '水瓶座', '白羊座'], dailyHoroscope: '社交运势旺盛的一天。你的谈吐和智慧将吸引有趣的灵魂。但不要同时做太多事，专注才能出成果。幸运色：黄色。', weeklyHoroscope: '本周双子座思维敏捷，创意源源不断。适合头脑风暴和学习新技能。但需注意不要因为兴趣太广泛而半途而废。' },
  { name: 'Cancer', nameCn: '巨蟹座', symbol: '♋', dateRange: '6月22日 — 7月22日', element: '水', rulingPlanet: '月亮', traits: ['温柔', '敏感', '顾家', '直觉力强'], compatible: ['天蝎座', '双鱼座', '金牛座'], dailyHoroscope: '今天你的情感特别丰富，适合与家人共度温馨时光。照顾他人的同时别忘了关爱自己。幸运色：银白色。', weeklyHoroscope: '本周巨蟹座将更加关注家庭和内心世界。可能有一件搁置已久的家务事终于得到解决。感情上需要多一些安全感。' },
  { name: 'Leo', nameCn: '狮子座', symbol: '♌', dateRange: '7月23日 — 8月22日', element: '火', rulingPlanet: '太阳', traits: ['自信', '慷慨', '有魅力', '创造力'], compatible: ['白羊座', '射手座', '天秤座'], dailyHoroscope: '今天你是全场的焦点。你的自信和魅力光芒四射，适合公开演讲或展示自己的才华。幸运色：金色。', weeklyHoroscope: '本周狮子座在创意和领导方面发挥出色。工作上可能获得上级的认可和赏识。感情中要注意给对方足够的空间和尊重。' },
  { name: 'Virgo', nameCn: '处女座', symbol: '♍', dateRange: '8月23日 — 9月22日', element: '土', rulingPlanet: '水星', traits: ['细心', '完美主义', '分析力强', '务实'], compatible: ['金牛座', '摩羯座', '天蝎座'], dailyHoroscope: '今天你的分析能力特别强，适合处理需要细心的任务。不过不要对自己和他人过于苛刻。幸运色：米色。', weeklyHoroscope: '本周处女座在工作上精益求精的态度将带来好结果。健康方面需注意消化系统的调理。爱情中放下完美主义会轻松很多。' },
  { name: 'Libra', nameCn: '天秤座', symbol: '♎', dateRange: '9月23日 — 10月23日', element: '风', rulingPlanet: '金星', traits: ['优雅', '公正', '善于合作', '追求和谐'], compatible: ['双子座', '水瓶座', '狮子座'], dailyHoroscope: '今天适合处理人际关系相关的事务。你的调解能力帮助化解矛盾，带来和谐。幸运色：粉色。', weeklyHoroscope: '本周天秤座在人际关系中如鱼得水。可能有新的合作机会出现。感情方面需要在选择面前果断一些，平衡虽是美德，但犹豫会错失良机。' },
  { name: 'Scorpio', nameCn: '天蝎座', symbol: '♏', dateRange: '10月24日 — 11月22日', element: '水', rulingPlanet: '冥王星', traits: ['深沉', '忠诚', '洞察力强', '意志坚定'], compatible: ['巨蟹座', '双鱼座', '处女座'], dailyHoroscope: '你的直觉今天异常敏锐，能看穿表象下的真相。深度思考和冥想将带来重要的领悟。幸运色：深红色。', weeklyHoroscope: '本周天蝎座将经历一次深刻的内心转变。一段旧的情感可能重新浮现，需要认真面对。事业上有望突破长期以来的瓶颈。' },
  { name: 'Sagittarius', nameCn: '射手座', symbol: '♐', dateRange: '11月23日 — 12月21日', element: '火', rulingPlanet: '木星', traits: ['乐观', '热爱自由', '坦率', '冒险精神'], compatible: ['白羊座', '狮子座', '水瓶座'], dailyHoroscope: '今天充满冒险的能量。尝试新事物、探索未知领域将给你带来快乐和成长。幸运色：紫色。', weeklyHoroscope: '本周射手座的学习运和旅行运都很旺盛。如果有出行计划，将会收获颇丰。财务方面有意外之喜，但不要过度消费。' },
  { name: 'Capricorn', nameCn: '摩羯座', symbol: '♑', dateRange: '12月22日 — 1月19日', element: '土', rulingPlanet: '土星', traits: ['自律', '有抱负', '耐心', '务实'], compatible: ['金牛座', '处女座', '天蝎座'], dailyHoroscope: '今天适合制定长期计划和目标。你的自律和专注将帮助你完成拖延已久的任务。幸运色：棕色。', weeklyHoroscope: '本周摩羯座在事业发展上稳健前行。长期的坚持开始显现成果，可能获得意外的认可或奖励。感情上稍微放松一点会更开心。' },
  { name: 'Aquarius', nameCn: '水瓶座', symbol: '♒', dateRange: '1月20日 — 2月18日', element: '风', rulingPlanet: '天王星', traits: ['独立', '创新', '人道主义', '理性'], compatible: ['双子座', '天秤座', '射手座'], dailyHoroscope: '今天你的创新思维特别活跃，适合脑洞大开的讨论和头脑风暴。不要害怕与众不同。幸运色：蓝色。', weeklyHoroscope: '本周水瓶座的社交圈有新变化。可能结识志同道合的新朋友。工作上创新的想法得到团队的认可，大胆推进你的计划。' },
  { name: 'Pisces', nameCn: '双鱼座', symbol: '♓', dateRange: '2月19日 — 3月20日', element: '水', rulingPlanet: '海王星', traits: ['浪漫', '富有同情心', '艺术天赋', '直觉敏锐'], compatible: ['巨蟹座', '天蝎座', '摩羯座'], dailyHoroscope: '今天你的想象力和直觉达到高峰。适合艺术创作或沉浸在音乐和美的世界中。幸运色：海蓝色。', weeklyHoroscope: '本周双鱼座的灵感和创造力丰沛。可能会有重要的梦境给你启示。感情方面与另一半的心灵连接更加深入，单身者有望遇到灵魂伴侣。' },
]

function getHoroscopeSign(month: number, day: number) {
  const dateStr = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  if (dateStr >= '03-21' && dateStr <= '04-19') return HOROSCOPE_SIGNS[0]
  if (dateStr >= '04-20' && dateStr <= '05-20') return HOROSCOPE_SIGNS[1]
  if (dateStr >= '05-21' && dateStr <= '06-21') return HOROSCOPE_SIGNS[2]
  if (dateStr >= '06-22' && dateStr <= '07-22') return HOROSCOPE_SIGNS[3]
  if (dateStr >= '07-23' && dateStr <= '08-22') return HOROSCOPE_SIGNS[4]
  if (dateStr >= '08-23' && dateStr <= '09-22') return HOROSCOPE_SIGNS[5]
  if (dateStr >= '09-23' && dateStr <= '10-23') return HOROSCOPE_SIGNS[6]
  if (dateStr >= '10-24' && dateStr <= '11-22') return HOROSCOPE_SIGNS[7]
  if (dateStr >= '11-23' && dateStr <= '12-21') return HOROSCOPE_SIGNS[8]
  if (dateStr >= '12-22' || dateStr <= '01-19') return HOROSCOPE_SIGNS[9]
  if (dateStr >= '01-20' && dateStr <= '02-18') return HOROSCOPE_SIGNS[10]
  return HOROSCOPE_SIGNS[11] // Pisces
}

export default function Horoscope() {
  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [result, setResult] = useState<typeof HOROSCOPE_SIGNS[0] | null>(null)

  const handleCalculate = () => {
    setResult(getHoroscopeSign(month, day))
  }

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
          星座运势
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          十二星座的星辰指引，揭示你的性格密码
          <br />
          输入你的生日，了解你的太阳星座、每日运势与性格特质
        </p>
      </motion.div>

      {!result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 sm:p-8 rounded-2xl max-w-lg mx-auto"
        >
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Select
              label="出生月份"
              options={months.map((m) => ({ value: String(m), label: `${m} 月` }))}
              value={String(month)}
              onChange={(e) => setMonth(Number(e.target.value))}
            />
            <Select
              label="出生日期"
              options={days.map((d) => ({ value: String(d), label: `${d} 日` }))}
              value={String(day)}
              onChange={(e) => setDay(Number(e.target.value))}
            />
          </div>
          <Button variant="gold" size="lg" className="w-full" onClick={handleCalculate}>
            查看星座
          </Button>
        </motion.div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FortuneResult
            title={`${result.symbol} ${result.nameCn}`}
            subtitle={`${result.dateRange} · 守护星：${result.rulingPlanet} · ${result.element}象星座`}
          >
            {/* Traits */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gold mb-3 font-[family-name:var(--font-heading-cn)]">
                性格特质
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.traits.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full bg-gold/10 text-gold/80 border border-gold/10 text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Daily Horoscope */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gold mb-3 font-[family-name:var(--font-heading-cn)]">
                今日运势
              </h3>
              <p className="text-text-primary leading-relaxed">{result.dailyHoroscope}</p>
            </div>

            {/* Weekly Horoscope */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gold mb-3 font-[family-name:var(--font-heading-cn)]">
                本周运势
              </h3>
              <p className="text-text-primary leading-relaxed">{result.weeklyHoroscope}</p>
            </div>

            {/* Compatibility */}
            <div>
              <h3 className="text-lg font-bold text-pink-400/80 mb-2 font-[family-name:var(--font-heading-cn)]">
                最佳星座配对
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.compatible.map((c) => (
                  <span key={c} className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-sm">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="ghost" onClick={() => setResult(null)}>
                查看其他星座
              </Button>
            </div>
          </FortuneResult>
        </motion.div>
      )}
    </div>
  )
}
