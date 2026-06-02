import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import LoadingSpinner from '@/components/LoadingSpinner'
import FortuneResult from '@/components/FortuneResult'

const NUMBER_MEANINGS: Record<number, string> = {
  1: '领袖者，独立自信，开创先锋。你天生具有领导才能，善于开拓和创新。人生课题：学会合作，放下自我中心。',
  2: '调解者，温和敏感，善于合作。你天生懂得平衡和协调，是优秀的团队润滑剂。人生课题：建立自信，不要过度依赖他人。',
  3: '表达者，创意无限，乐观开朗。你天生具有艺术天赋和社交能力，善于用各种方式表达自己。人生课题：专注深度，避免表面化。',
  4: '建设者，踏实稳健，注重秩序。你天生擅长构建系统和框架，一步一个脚印地达成目标。人生课题：学会变通，接纳变化。',
  5: '自由者，热爱冒险，追求多样。你生来就是为了体验生命的丰富多彩，不愿被束缚。人生课题：专注和自律，找到真正的自由。',
  6: '呵护者，充满爱心，责任感强。你天生是照顾者和守护者，家庭和社区对你意义重大。人生课题：学会放手，不要过度牺牲。',
  7: '探索者，深思熟虑，灵性追求。你天生具有分析能力和哲学思维，喜欢探究事物背后的真相。人生课题：连接他人，平衡理性与情感。',
  8: '成就者，追求成功，管理能力强。你天生对权力和财富有强烈的驱动力，善于掌控大局。人生课题：保持正直，财富与精神平衡。',
  9: '奉献者，人道主义，博爱精神。你天生具有大爱和同理心，渴望为世界做出贡献。人生课题：接纳过去，放下执念。',
  11: '启灵者，直觉超强，精神领袖。你拥有极高的灵性感知力，是引领他人觉醒的灯塔。人生课题：相信自己，克服内心的不安。',
  22: '大师建造者，宏大愿景，实践能力。你兼具远见和执行力，能够将伟大的梦想变为现实。人生课题：平衡宏大与细节。',
  33: '神圣导师，无条件的爱，宇宙智慧。你具有最高的灵性频率，生命使命是服务全人类。人生课题：接纳自己的全部，以身作则。',
}

const LETTER_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
}

function reduceToDigit(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = String(num).split('').reduce((sum, d) => sum + Number(d), 0)
  }
  return num
}

function calculateLifePath(birthDate: string): number {
  const digits = birthDate.replace(/-/g, '').split('').map(Number)
  const sum = digits.reduce((a, b) => a + b, 0)
  return reduceToDigit(sum)
}

function calculateDestiny(name: string): number {
  const cleaned = name.toUpperCase().replace(/[^A-Z]/g, '')
  const sum = cleaned.split('').reduce((total, char) => total + (LETTER_VALUES[char] || 0), 0)
  return reduceToDigit(sum)
}

function calculateSoulUrge(name: string): number {
  const vowels = ['A', 'E', 'I', 'O', 'U']
  const cleaned = name.toUpperCase().replace(/[^A-Z]/g, '')
  const sum = cleaned.split('')
    .filter((c) => vowels.includes(c))
    .reduce((total, char) => total + (LETTER_VALUES[char] || 0), 0)
  return sum > 0 ? reduceToDigit(sum) : 1
}

function calculatePersonality(name: string): number {
  const vowels = ['A', 'E', 'I', 'O', 'U']
  const cleaned = name.toUpperCase().replace(/[^A-Z]/g, '')
  const sum = cleaned.split('')
    .filter((c) => !vowels.includes(c))
    .reduce((total, char) => total + (LETTER_VALUES[char] || 0), 0)
  return sum > 0 ? reduceToDigit(sum) : 1
}

export default function Numerology() {
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{
    lifePath: number
    destiny: number
    soulUrge: number
    personality: number
  } | null>(null)

  const handleCalculate = async () => {
    if (!name || !birthDate) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setResult({
      lifePath: calculateLifePath(birthDate),
      destiny: calculateDestiny(name),
      soulUrge: calculateSoulUrge(name),
      personality: calculatePersonality(name),
    })
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4 font-[family-name:var(--font-heading-cn)]">
          数字命理
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          每个数字都蕴含着独特的宇宙振动频率
          <br />
          通过你的姓名和生日，揭示生命灵数与天赋使命
        </p>
      </motion.div>

      {!result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 sm:p-8 rounded-2xl max-w-lg mx-auto"
        >
          <div className="space-y-4 mb-6">
            <Input
              label="你的名字（拼音或英文）"
              placeholder="如：Zhang San 或 John"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="出生日期"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={handleCalculate}
            disabled={!name || !birthDate}
          >
            计算灵数
          </Button>
        </motion.div>
      )}

      {loading && <LoadingSpinner text="正在计算你的生命密码..." />}

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FortuneResult title="你的数字命盘" subtitle={`${name} · ${birthDate}`}>
            {/* Numbers grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {([
                { label: '生命灵数', value: result.lifePath, desc: '代表你此生的核心使命' },
                { label: '命运数字', value: result.destiny, desc: '揭示你的天赋与潜能' },
                { label: '灵魂渴望', value: result.soulUrge, desc: '反映你的内心真正渴望' },
                { label: '个性数字', value: result.personality, desc: '展现你给外界的第一印象' },
              ]).map(({ label, value, desc }) => (
                <motion.div
                  key={label}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  className="glass p-4 text-center"
                >
                  <div className={`text-4xl font-bold mb-2 font-[family-name:var(--font-heading-en)] ${
                    value === 11 || value === 22 || value === 33 ? 'text-gradient' : 'text-gold'
                  }`}>
                    {value}
                  </div>
                  <div className="text-sm font-bold text-gold/80 mb-1">{label}</div>
                  <div className="text-xs text-text-secondary">{desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Interpretations */}
            <div className="space-y-6">
              <NumberInterpretation label="生命灵数" value={result.lifePath} />
              <NumberInterpretation label="命运数字" value={result.destiny} />
              <NumberInterpretation label="灵魂渴望" value={result.soulUrge} />
              <NumberInterpretation label="个性数字" value={result.personality} />
            </div>

            <div className="mt-8 text-center">
              <Button variant="ghost" onClick={() => { setResult(null); setName(''); setBirthDate('') }}>
                重新计算
              </Button>
            </div>
          </FortuneResult>
        </motion.div>
      )}
    </div>
  )
}

function NumberInterpretation({ label, value }: { label: string; value: number }) {
  const meaning = NUMBER_MEANINGS[value] || '一个独特的数字组合，蕴含着属于你自己的独特能量。'

  return (
    <div className="border-b border-white/5 last:border-0 pb-4 last:pb-0">
      <h4 className="font-bold text-gold mb-2 font-[family-name:var(--font-heading-cn)]">
        {label} — 数字 {value}
        {(value === 11 || value === 22 || value === 33) && (
          <span className="text-xs ml-2 px-1.5 py-0.5 rounded bg-gold/20 text-gold">大师数字</span>
        )}
      </h4>
      <p className="text-text-primary leading-relaxed text-sm">{meaning}</p>
    </div>
  )
}
