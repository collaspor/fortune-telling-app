import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import LoadingSpinner from '@/components/LoadingSpinner'
import FortuneResult from '@/components/FortuneResult'

const NUMBER_MEANINGS: Record<number, string> = {
  1: '数字1是太阳的能量，代表开创、独立与领袖精神。你天生具有开拓者的气质，独立自信，勇敢果断，不愿随波逐流而更愿意走出一条属于自己的路。你的核心优势在于原创力和决断力——当别人还在犹豫时，你已经迈出了第一步。你的人生课题是学会合作与接纳，过于强烈的自我意识可能让你忽略了身边人的感受和智慧。职业方面，你适合担任领导者、创业者、艺术家或任何需要独立决策的角色。在关系中，你需要保持一定的自主空间，但也要学会信任和依赖伴侣，真正的亲密不会削弱你的力量反而会倍增它。你的精神成长路径在于：从"我来做"到"我们一起做"，放下对控制的执着，在协作中发现更大的可能性。',
  2: '数字2是月亮的能量，代表和谐、敏感与合作的艺术。你天生具有细腻的感知力和协调能力，是优秀的团队润滑剂和关系桥梁建造者。你的核心优势在于直觉和共情——你能感受到别人忽略的情绪波动，并以温柔的方式调和冲突、达成平衡。你的人生课题是建立自信和自主性，不要过度依赖他人的认可来定义自己的价值。职业方面，你适合从事外交、咨询、心理咨询、调解或任何需要耐心和敏感度的工作。在关系中你是一位体贴入微的伴侣，但需要警惕因为过度迁就而失去自我——健康的爱是两个独立个体的相互陪伴，而非一个人的委曲求全。你的精神成长路径在于：从"你说的对"到"我的感觉也很重要"，学会在温柔中保有力量，在合作中保有自己的立场。',
  3: '数字3是木星的能量，代表表达、创意与喜悦的生命力。你天生具有艺术天赋和社交魅力，善于用言语、文字、色彩或任何方式表达内心丰富多彩的世界。你的核心优势在于创造力和沟通力——你有一种让人感到轻松愉悦的天赋，有你在的场合总是充满欢笑和活力。你的人生课题是专注和深度，过多的兴趣和想法容易让你停留在表面，难以将任何一个才华打磨到极致。职业方面，你适合从事作家、演员、设计师、公关或任何需要创意和表达的工作。在关系中你是一个浪漫而有趣的伴侣，生活的乐趣在你身边从不会缺席，但需注意不要在感情中过于游戏人间。你的精神成长路径在于：从"什么都想试试"到"在专注中发现无限"，学会将喷涌的创造力引向深度的耕耘。',
  4: '数字4是地球的能量，代表秩序、稳定与踏实的建构。你天生具有系统化的思维和坚定可靠品质，是那种可以托付重任的踏实之人。你的核心优势在于组织力和执行力——你擅长将宏大的构想分解成可行的步骤，然后一步一步地把它建成现实。你的人生课题是学会变通和接纳变化，过于固守计划和秩序可能让你错失生活中意外的惊喜和转机。职业方面，你适合从事工程师、建筑师、会计师、项目经理或任何需要精密和可靠性的工作。在关系中你是一位最可靠的伴侣，你的承诺一旦做出就如磐石般坚定，但需要适时放下"一切都是为了你好"的严肃面孔，多一点柔性和浪漫。你的精神成长路径在于：从"一切必须在掌控中"到"相信生命本身的秩序"，学会在稳定中接纳流动。',
  5: '数字5是水星的能量，代表自由、冒险与生命的多样性。你生来就是为了体验这个世界的丰富多彩，不愿被任何单一的模式或关系所束缚。你的核心优势在于适应力和多才多艺——无论把你放在什么环境中，你总能找到生存和发展的方式，而且乐在其中。你的人生课题是专注与自律，真正的自由不是可以随心所欲地做任何事，而是在众多选择中明智地挑选并坚持下去。职业方面，你适合从事记者、销售、导游、自由职业或任何需要变化和多任务处理的工作。在关系中你是一个充满惊喜和新鲜感的伴侣，但需警惕因害怕深入承诺而不断逃离——最深的自由往往来自于最深的承诺。你的精神成长路径在于：从"体验所有可能性"到"在专注中发现真正的自由"，明白风筝的线不是束缚，而是让它飞得更高的依托。',
  6: '数字6是金星的能量，代表爱、责任与无私的呵护。你天生是照顾者和守护者，家庭和社群对你有着最深的意义，你从照顾和陪伴中获得最大的满足。你的核心优势在于一颗温暖的爱心和强烈的责任感——你是那个在别人困难时第一个伸出援手的人。你的人生课题是学会放手和保持边界，过度牺牲自己来满足他人不仅会让你枯竭，也会让对方失去成长的机会。职业方面，你适合从事教师、医生、护理、心理咨询或任何服务型和关怀型的工作。在关系中是理想的人生伴侣，温柔体贴且愿意承担，但需要提醒自己——伴侣不是你全部的世界，保持独立的社交和兴趣才能让关系健康长久。你的精神成长路径在于：从"照顾所有人"到"先照顾自己"，明白只有自己杯中满溢的才能自然地流淌给他人。',
  7: '数字7是海王星的能量，代表智慧、内省与精神追求。你天生具有深刻的思考能力和哲学气质，不满足于事物的表面，总是渴望探究背后的真相和本质。你的核心优势在于分析力和洞察力——你能看穿复杂问题的结构，并找到隐藏其中的规律和智慧。你的人生课题是连接他人和平衡理性与情感，过于沉浸在思维的世界中可能让你与现实和人际关系渐行渐远。职业方面，你适合从事科学家、研究员、分析师、哲学家或任何需要深度思考和钻研的工作。在关系中你是一个深刻而忠诚的伴侣，但有时过于理性或孤僻可能让对方感觉被隔在一道无形的墙外。你的精神成长路径在于：从"独自探索真理"到"在人与人的连接中找到真理"，理解最深的智慧有时藏在最简单的拥抱中。',
  8: '数字8是土星的能量，代表权力、财富与成就的驱动。你天生具有强大的掌控力和实现野心，对物质世界的运作规律有敏锐的理解，善于经营和管理。你的核心优势在于执行力、商业头脑和抗压能力——你能看到大局、做出艰难决定并推动团队达成目标。你的人生课题是保持正直和平衡物质与精神，财富是能量的一种形式但绝非生命的全部，不要为了成功而牺牲掉同样宝贵的东西。职业方面，你适合从事金融、管理、企业创业、投资或任何需要战略思维和领导能力的工作。在关系中你是一个能够提供强大物质和情感支持的伴侣，但需注意不要把工作带进卧室，事业上的成功如果缺少了温暖的陪伴，最终也是一场虚空。你的精神成长路径在于：从"积累更多"到"给予和分享"，明白财富如流水，让它流经而不是囤积，反而会带来更丰盛的循环。',
  9: '数字9是火星的能量，代表圆满、奉献与人道主义的博爱。你天生具有宽广的胸怀和深刻的同理心，你的心不仅装得下身边的人，更装得下全世界受苦的人。你的核心优势在于无私的爱和感召力——你有能力引导他人看到生命的更高意义，并用行动让世界变得更好。你的人生课题是接纳过去和放下执念，数字9意味着一个周期的终结，你需要处理好旧的情感包袱才能轻装上阵迎接新篇章。职业方面，你适合从事慈善事业、教育工作、艺术疗愈、公益活动或任何以服务他人为核心的工作。在关系中你是一个深情而慷慨的伴侣，但需注意不要将"拯救他人"当成爱的模式——健康的爱是并肩同行，而非一人不断施救。你的精神成长路径在于：从"为世界付出一切"到"在奉献中也不忘滋养自己"，明白最大的贡献往往始于对自己彻底的接纳。',
  11: '数字11是一个非凡的大师数字，它携带着双倍数字1的创造力与超凡的直觉力，是直觉的灯塔和精神的桥梁。你天生具有极高的灵性感知力和启发性，能感知到常人无法感知的微妙能量和真理，你的存在本身就具有唤醒他人的力量。你的核心优势在于远见和激励——你不是用道理说服别人，而是用自己的存在点亮他们内在的光。你的人生课题是克服内在的不安和自我怀疑，因为天赋越高、使命越大，你所面对的内心考验也越重。职业方面，你适合成为精神导师、艺术家、发明家、疗愈师或任何需要超凡直觉和创造力的引领性角色。在关系中你追求的是灵魂的连接而非表面的相伴，你对伴侣有一种穿透性的理解力，但这也意味着你需要格外注意边界——不是每个人都准备好被看透。你的精神成长路径在于：从"怀疑自己的直觉"到"全然地信任内在的指引"，在接纳自己的与众不同中找到属于你的独特道路。',
  22: '数字22被称为"大师建造者"，是数字命理学中最强大的数字之一，它兼具数字2的直觉与数字4的实干能力，能将最伟大的宏愿落地为现实。你天生具有将远见变为实际成果的超凡能力，你的梦想不是虚无的幻想而是未来的工程蓝图。你的核心优势在于视野与执行力的完美结合——你是罕见的既能仰望星空又能脚踏实地的人。你的人生课题是平衡宏大愿景与繁琐细节，宏大是你的天赋但细节是你的盟友，不可因急切成事而忽略了关键的琐碎工作。职业方面，你适合成为建筑大师、组织创始人、大型项目领导者、社会改革家或任何能将理想变为现实架构的角色。在关系中你寻求的是能与你并肩建造未来的伴侣，你的责任感让人踏实，但你的宏大有时也让身边人感到压力。你的精神成长路径在于：从"我一个人建造"到"与众人共建"，学会信任团队并将你的愿景与他人共享。',
  33: '数字33是"神圣导师"的振动频率，是数字命理中最高的精神能量之一，代表着无条件的爱与宇宙级的奉献。你来到这个世界上的使命不是个人的成功，而是以你全部的存在去服务、疗愈和提升全人类的意识。你的核心优势在于无条件的爱与感染力——你不需要做什么特别的事，仅仅是你的真诚和慈悲存在就能治愈周围的人。你的人生课题是接纳自己的全部，包括那些你认为"不够好"的部分，因为只有当你完整地接纳了自己的光明与阴影，你才能真正地以完整的状态去拥抱世界。职业方面，你适合成为精神导师、疗愈工作者、教育家、和平倡导者或任何以提升人类福祉为目标的角色。在关系中你的爱是无尽而深邃的，但需要警惕在爱别人时迷失自己——神圣的导师也需要被爱和被呵护。你的精神成长路径在于：从"我为世界奉献一切"到"我在奉献中也允许自己接受爱与丰盛"，理解最深的服务是活出你生命本来的光芒，让每个人在你的光中看见自己的光。',
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
