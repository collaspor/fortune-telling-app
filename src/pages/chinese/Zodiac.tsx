import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { Select } from '@/components/Input'
import FortuneResult from '@/components/FortuneResult'

const ZODIAC_DATA = [
  { name: 'Rat', nameCn: '鼠', element: '水', years: [1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032], traits: ['聪明', '机智', '适应力强', '善于社交'], compatible: ['牛', '龙', '猴'], incompatible: ['马'], fortune: '2026丙午马年，属鼠之人运势稳中有升，整体呈现积极向好的态势。事业方面，今年贵人运旺盛，尤其在春夏之交有望得到重要人物的提携和赏识，适合主动争取升职或跳槽机会。财运方面有意外之喜，投资理财眼光独到，但需警惕年底时段的冲动消费，做好储蓄规划。感情运势平稳，单身者社交圈扩大，通过朋友介绍有较高几率遇到心仪对象；已婚者家庭和睦，但小摩擦难免，多一分耐心和倾听会让关系更加甜蜜。健康方面总体良好，但工作压力可能影响睡眠质量，建议养成规律作息和适度运动的习惯。幸运贴士：今年的幸运方位为西北，可在办公桌上放置一个小型水晶饰品以增强贵人运。' },
  { name: 'Ox', nameCn: '牛', element: '土', years: [1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033], traits: ['勤奋', '踏实', '坚韧', '可靠'], compatible: ['鼠', '蛇', '鸡'], incompatible: ['羊'], fortune: '2026马年对于属牛之人而言，是稳扎稳打、厚积薄发的一年。事业上有望获得重要项目的负责人角色，你的专业能力和踏实态度将赢得上下一致的认可，但需要警惕过度承担导致的身心透支。财运方面正财稳定增长，适合进行房产或长期理财方面的规划，避免高风险短线操作。感情运势稳中向好，单身者可能在职场或学习环境中遇到志趣相投的人；已有伴侣的牛人今年适合考虑订婚、结婚或改善居住环境等家庭大事。健康方面需要重点关注颈椎和消化系统，长期伏案工作者务必定时起身活动，劳逸结合方能持久。幸运贴士：今年的幸运色为黄色和棕色，在南方位摆放一盆绿色植物有助于提升整体运势。' },
  { name: 'Tiger', nameCn: '虎', element: '木', years: [1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034], traits: ['勇敢', '自信', '热情', '冒险精神'], compatible: ['马', '狗'], incompatible: ['猴'], fortune: '2026马年，属虎之人如虎添翼，事业激情澎湃，整体运势强劲上扬。事业方面充满了新机遇和挑战，你的领导力和感染力将成为团队的核心驱动力，但需谨防冲动决策和大意冒进造成的损失。财运方面上半年偏财运势较旺，副业或投资收益可期，但下半年建议收敛投资规模，以稳为主。感情运势热闹非凡，桃花运旺盛，单身者有望在社交活动中遇到多个心仪对象，需慎重选择而非急于确定关系；已婚者需注意与其他异性的边界感，避免不必要的误会。健康方面精力充沛，但需注意运动损伤和肝胆系统的保养，激烈运动前务必充分热身。幸运贴士：今年的幸运色为绿色，佩戴木质饰品或在家中东方摆放富贵竹有助事业腾飞。' },
  { name: 'Rabbit', nameCn: '兔', element: '木', years: [1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035], traits: ['温柔', '优雅', '敏感', '有品味'], compatible: ['羊', '猪'], incompatible: ['鸡'], fortune: '2026马年对属兔之人而言，是平稳中蕴含转机的一年。事业方面不必追求激进的变化，保持自己的优雅节奏和稳定的工作质量，年末有望迎来一个意想不到的好机会。财运方面宜守不宜攻，保守理财是今年的明智之选，尤其需避免高风险的股票投机和借贷担保事宜。感情运势温馨甜美，已有伴侣的兔人将享受细水长流的幸福，适合安排短途旅行增进感情；单身者桃花虽不浓烈，但通过共同兴趣爱好结识的对象反而更加可靠长久。健康方面整体良好，但需关注季节交替时的过敏问题和呼吸系统健康，适当增加户外有氧运动。幸运贴士：今年的幸运色为粉色，在卧室中放置柔和的熏香或香薰蜡烛有助于稳定情绪和吸引良缘。' },
  { name: 'Dragon', nameCn: '龙', element: '土', years: [1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036], traits: ['自信', '有魄力', '领导力', '追求完美'], compatible: ['鼠', '猴', '鸡'], incompatible: ['狗'], fortune: '2026马年，属龙之人运势大开大合，机遇与挑战并存。事业发展迎来一个重要的转折窗口，上半年适合大胆开拓和主动出击，你的魄力和远见将成为最大的竞争优势。财运方面上半年有较大进账，但年中时段可能需要应对一笔意料之外的大额支出，建议提前做好资金准备。感情关系趋于稳定和深化，已经历磨合期的伴侣感情越发坚固，适合商谈婚嫁或共同投资置业；单身龙人今年魅力四射，但需要更多耐心去真正了解一个人而非仅限于表面光环。健康方面需注意心脑血管系统和情绪管理，高强度工作之后的彻底放松与高质量睡眠同样重要。幸运贴士：今年的幸运方位为南方，佩戴金色饰品或在家中南方位摆放一尊小金龙可增旺事业运和贵人运。' },
  { name: 'Snake', nameCn: '蛇', element: '火', years: [1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037], traits: ['智慧', '神秘', '直觉敏锐', '深思熟虑'], compatible: ['牛', '鸡'], incompatible: ['猪'], fortune: '2026马年，属蛇之人迎来以智取胜的一年。事业上你的洞察力和策略思维将成为最大的优势，在他人还看不清局势时你已抢占先机，尤其适合从事战略规划、研究分析和创意类工作。财运方面宜分散布局，将资金合理配置在不同类型的资产中，下半年可能有来自意想不到渠道的额外收入。感情运势细水长流，已有伴侣的蛇人关系更加默契深厚，一个眼神就能读懂彼此；单身者需要走出舒适区，多参加线下活动而非宅在家中等待缘分。健康方面需要关注皮肤保养和内分泌调节，保持充足的水分摄入和规律的运动对你有特别的好处。幸运贴士：今年的幸运色为红色和紫色，随身携带一枚紫水晶有助于增强直觉力和决策的准确度。' },
  { name: 'Horse', nameCn: '马', element: '火', years: [1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038], traits: ['自由', '活力', '热情奔放', '独立'], compatible: ['虎', '羊', '狗'], incompatible: ['鼠'], fortune: '2026年是属马之人的本命年，值太岁，运势多有起伏和变数。事业方面宜静不宜动，今年不适合辞职创业或重大转型，踏实做好手头工作、巩固现有阵地才是上策，年中时段尤其需防范职场中的口舌是非。财运上本命年开销较大，建议提前做好财务预算，避免冲动消费和高风险投资。感情方面易受太岁影响而产生情绪波动，已婚者需要更多的包容和理解来化解小摩擦；单身者桃花运较为复杂，需擦亮眼睛分辨真假缘分。健康是今年的重中之重，注意防范意外伤害和突发疾病，避免高危运动和夜间独自外出，同时关注心脏和血液循环系统的健康。幸运贴士：本命年建议全年佩戴红色辟邪物——红色手绳、红色内衣或红色袜子均可，多行善事积福积德也能有效化解太岁的不利影响。' },
  { name: 'Goat', nameCn: '羊', element: '土', years: [1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039], traits: ['温和', '善良', '有创造力', '富有同情心'], compatible: ['兔', '马', '猪'], incompatible: ['牛'], fortune: '2026马年，属羊之人运势回暖，之前的阴霾和困扰逐渐散去，新的方向正在浮现。事业上可能遇到一个让你眼前一亮的全新机会，也许是团队重组后的新角色，或者是一个意想不到的合作邀请，勇敢尝试会带来惊喜。财运方面逐步回升，之前的债务或财务压力将得到缓解，适合重新规划长期的财务目标。感情和家庭运势格外温暖，家庭关系和睦融洽，是建立家庭、添丁进口或购置新居的大好时机，家人是你今年最大的精神支柱和力量来源。健康方面需注意脾胃调理和饮食规律，今年容易因情绪起伏而导致暴饮暴食，保持平和心态对身体健康至关重要。幸运贴士：今年的幸运方位为西南，在家中西南角放置一个陶瓷饰品或摆放鲜花，有助于稳定家宅气场和吸引福气。' },
  { name: 'Monkey', nameCn: '猴', element: '金', years: [1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040], traits: ['聪明伶俐', '灵活多变', '好奇心强', '善于创新'], compatible: ['鼠', '龙'], incompatible: ['虎'], fortune: '2026马年，属猴之人灵动机智将在今年大放异彩。事业上你的创意和灵活应变能力让你在团队中脱颖而出，适合从事需要快速反应和创新思维的领域，也有望获得海外或远程工作的机会。财运方面偏财运旺，兼职、投资或副业可能带来意外的可观收入，但切忌贪心，见好就收才是明智之举。感情生活丰富多彩，单身猴人今年魅力难以抵挡，社交场合中桃花不断，但需要时间来区分一时的新鲜感和真正的契合；已有伴侣者适合一起学习新技能或计划一次长途旅行。健康方面整体良好但需注意神经系统和睡眠质量，过度活跃的大脑可能需要通过冥想或瑜伽来放松。幸运贴士：今年的幸运色为白色和银色，佩戴金属饰品或随身携带一枚古铜钱有助于稳固财运和防止小人暗算。' },
  { name: 'Rooster', nameCn: '鸡', element: '金', years: [1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041], traits: ['勤奋', '守时', '追求完美', '直言不讳'], compatible: ['牛', '龙', '蛇'], incompatible: ['兔'], fortune: '2026马年，属鸡之人勤奋耕耘终将迎来丰收。事业方面之前积累的努力将在今年开花结果，升职加薪或获得业内认可的几率非常高，尤其在上半年有重要的展示机会。财运方面正财收入稳定增长，但偏财不宜过多参与，容易因贪心而得不偿失。感情运势值得注意——你的直率坦诚是优点，但有时话到嘴边需要留三分，今年特别容易因表达方式不当而引发误会，学会用心倾听比急于表达更重要。单身鸡人在专业场合或培训中更容易遇到思想契合的对象。健康方面需注意嗓子和呼吸道保养，今年容易因过度劳累而引发感冒或咽炎，同时关注骨骼和牙齿方面的定期检查。幸运贴士：今年的幸运色为黄色，在办公室或书房摆放一个铜质装饰品有助于提升事业运势和决策力。' },
  { name: 'Dog', nameCn: '狗', element: '土', years: [1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042], traits: ['忠诚', '正直', '可靠', '勇敢'], compatible: ['虎', '马', '兔'], incompatible: ['龙'], fortune: '2026马年，属狗之人运势昂扬向上，忠诚和正直的品格将在今年被重要人物看见并认可。事业方面你的可靠和担当精神会让你成为团队中不可替代的核心成员，贵人运强劲，可能在关键时刻获得强力支持。财运稳中有升，适合进行长期的价值投资和固定资产配置，年底财库充盈。感情运势迎来甜蜜的高峰期，已有伴侣者关系更加深厚和亲密，是求婚、结婚或迎接新家庭成员的大好时机；单身狗人今年桃花质量颇高，通过公益或志愿活动结识的对象最为真诚可靠。健康方面总体良好，但需注意规律饮食和适当运动，今年容易因社交应酬增多而导致体重增加和身体负担。幸运贴士：今年的幸运色为红色，在居家或办公的西北方放置一盏温暖的小台灯，有助于点亮贵人运和感情运势。' },
  { name: 'Pig', nameCn: '猪', element: '水', years: [1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043], traits: ['善良', '宽容', '乐观', '慷慨'], compatible: ['兔', '羊'], incompatible: ['蛇'], fortune: '2026马年，属猪之人福星高照，好运连连，许多事情都能心想事成。事业方面贵人运旺盛，关键时候总有人出手相助，你的善良和乐观为你积累了深厚的福报。财运方面利好不断，正财偏财皆有收获，但需警惕过度乐观而忽视细节——签合同前多看两遍、投资前多做调研，不要在细节上栽跟头。感情运势温馨美好，单身猪人以最好的状态遇见缘分，可能在旅行中邂逅一段浪漫；已婚者家庭生活幸福美满，与家人共度的时光是最珍贵的财富。健康方面需注意适度——美食虽好不宜过量，享受生活的同时也要坚持定期体检和适度运动。幸运贴士：今年的幸运色为蓝色和黑色，在家中北方位放置一个小型水景装饰或鱼缸，有助于持续吸引好运和稳定财运。' },
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
