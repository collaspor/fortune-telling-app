import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { Select } from '@/components/Input'
import FortuneResult from '@/components/FortuneResult'

const ZODIAC_DATA = [
  { name: 'Rat', nameCn: '鼠', element: '水', years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032], traits: ['聪明', '机智', '适应力强', '善于社交'], compatible: ['牛', '龙', '猴'], incompatible: ['马'], fortune: '2026丙午马年，鼠人运势稳中有升。事业上贵人相助，财运有意外之喜，但需注意人际关系中的小摩擦，保持低调谦和。' },
  { name: 'Ox', nameCn: '牛', element: '土', years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033], traits: ['勤奋', '踏实', '坚韧', '可靠'], compatible: ['鼠', '蛇', '鸡'], incompatible: ['羊'], fortune: '2026马年，牛人稳扎稳打。工作上有望得到重要项目主导权，但压力也随之增大，注意劳逸结合，健康才是最大的财富。' },
  { name: 'Tiger', nameCn: '虎', element: '木', years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034], traits: ['勇敢', '自信', '热情', '冒险精神'], compatible: ['马', '狗'], incompatible: ['猴'], fortune: '2026马年，虎人如虎添翼。事业激情澎湃，但需谨防冲动决策带来的损失。感情方面桃花运旺，单身者有望遇到心仪对象。' },
  { name: 'Rabbit', nameCn: '兔', element: '木', years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035], traits: ['温柔', '优雅', '敏感', '有品味'], compatible: ['羊', '猪'], incompatible: ['鸡'], fortune: '2026马年，兔人运势平稳。工作中保持自己的节奏即可，不需过度焦虑。财运方面宜保守理财，避免高风险投资。' },
  { name: 'Dragon', nameCn: '龙', element: '土', years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036], traits: ['自信', '有魄力', '领导力', '追求完美'], compatible: ['鼠', '猴', '鸡'], incompatible: ['狗'], fortune: '2026马年，龙人运势大开大合。事业发展迎来重要机遇，但需要足够的耐心和准备。感情关系趋于稳定，适合建立长期承诺。' },
  { name: 'Snake', nameCn: '蛇', element: '火', years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037], traits: ['智慧', '神秘', '直觉敏锐', '深思熟虑'], compatible: ['牛', '鸡'], incompatible: ['猪'], fortune: '2026马年，蛇人迎来智慧之年。以不变应万变，你的洞察力将成为最大的优势。财运上宜分散投资，不宜孤注一掷。' },
  { name: 'Horse', nameCn: '马', element: '火', years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038], traits: ['自由', '活力', '热情奔放', '独立'], compatible: ['虎', '羊', '狗'], incompatible: ['鼠'], fortune: '2026本命年，马人值太岁。运势多有起伏，宜静不宜动，重大决策需三思而后行。建议佩戴红色辟邪物，多行善事积福。' },
  { name: 'Goat', nameCn: '羊', element: '土', years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039], traits: ['温和', '善良', '有创造力', '富有同情心'], compatible: ['兔', '马', '猪'], incompatible: ['牛'], fortune: '2026马年，羊人运势回暖。之前的困扰逐渐解开，事业有新方向出现。家庭关系和睦，是建立家庭或改善居住环境的好时机。' },
  { name: 'Monkey', nameCn: '猴', element: '金', years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040], traits: ['聪明伶俐', '灵活多变', '好奇心强', '善于创新'], compatible: ['鼠', '龙'], incompatible: ['虎'], fortune: '2026马年，猴人灵动机智大放异彩。新的学习机会和旅行计划将丰富你的生活。财运方面有偏财进账，但不要贪心。' },
  { name: 'Rooster', nameCn: '鸡', element: '金', years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041], traits: ['勤奋', '守时', '追求完美', '直言不讳'], compatible: ['牛', '龙', '蛇'], incompatible: ['兔'], fortune: '2026马年，鸡人勤奋终有回报。之前积累的努力将在今年开花结果，升职加薪有望。注意沟通方式，话到嘴边留三分。' },
  { name: 'Dog', nameCn: '狗', element: '土', years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042], traits: ['忠诚', '正直', '可靠', '勇敢'], compatible: ['虎', '马', '兔'], incompatible: ['龙'], fortune: '2026马年，狗人运势上扬。你的忠诚和正直将赢得重要人物的信任。感情关系迎来甜蜜期，适合求婚或确定关系。' },
  { name: 'Pig', nameCn: '猪', element: '水', years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043], traits: ['善良', '宽容', '乐观', '慷慨'], compatible: ['兔', '羊'], incompatible: ['蛇'], fortune: '2026马年，猪人福星高照。好运不断，许多事情都能心想事成。但需警惕过度乐观导致的疏忽，细节决定成败。' },
]

export default function Zodiac() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null)
  const [result, setResult] = useState<typeof ZODIAC_DATA[0] | null>(null)

  const handleCalculate = () => {
    if (!selectedYear) return
    const idx = selectedYear % 12
    // Rat=0 in our array if 2020%12=4... Let's find by year
    const zodiac = ZODIAC_DATA.find((z) => z.years.includes(selectedYear))
    setResult(zodiac || null)
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4 font-[family-name:var(--font-heading-cn)]">
          生肖运势
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          十二生肖轮转不息，每年都有不同的运势变化
          <br />
          选择你的出生年份，了解你的生肖密码和2026年年运
        </p>
      </motion.div>

      {!result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 sm:p-8 rounded-2xl max-w-lg mx-auto"
        >
          <Select
            label="选择你的出生年份"
            options={years.map((y) => ({ value: String(y), label: `${y} 年` }))}
            value={selectedYear ? String(selectedYear) : ''}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          />
          <Button
            variant="gold"
            size="lg"
            className="w-full mt-6"
            onClick={handleCalculate}
            disabled={!selectedYear}
          >
            查看运势
          </Button>
        </motion.div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FortuneResult title={`属${result.nameCn} — ${result.element}命`} subtitle={`${result.nameCn}年出生的人`}>
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

            {/* 2026 Fortune */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gold mb-3 font-[family-name:var(--font-heading-cn)]">
                2026 马年运势
              </h3>
              <p className="text-text-primary leading-relaxed">{result.fortune}</p>
            </div>

            {/* Compatibility */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-green-400/80 mb-2 font-[family-name:var(--font-heading-cn)]">
                  最佳配对
                </h3>
                <div className="flex gap-2">
                  {result.compatible.map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-400/80 mb-2 font-[family-name:var(--font-heading-cn)]">
                  需注意
                </h3>
                <div className="flex gap-2">
                  {result.incompatible.map((c) => (
                    <span key={c} className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="ghost" onClick={() => { setResult(null); setSelectedYear(null) }}>
                查看其他生肖
              </Button>
            </div>
          </FortuneResult>
        </motion.div>
      )}
    </div>
  )
}
