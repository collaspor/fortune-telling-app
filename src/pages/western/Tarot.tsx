import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/Button'
import LoadingSpinner from '@/components/LoadingSpinner'
import FortuneResult from '@/components/FortuneResult'
import type { TarotCard, TarotSpread } from '@/types'

// 22 Major Arcana cards with full data
const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: 'The Fool', nameCn: '愚者', arcana: 'major', image: '🧑‍🎤', meaning: { upright: '新的开始，冒险精神，纯真无畏。一段未知的旅程即将展开，跟随你的直觉勇敢前行。', reversed: '鲁莽冲动，缺乏方向，犹豫不决。需要停下来重新审视自己的选择，避免草率决定。' }, keywords: ['开始', '冒险', '天真', '自由'] },
  { id: 1, name: 'The Magician', nameCn: '魔术师', arcana: 'major', image: '🧙‍♂️', meaning: { upright: '创造力、技能、意志力的展现。你拥有实现目标所需的一切资源，现在就是行动的最佳时机。', reversed: '欺骗、能力不足、机会被浪费。注意是否有人在利用你，或者你正在浪费自己的天赋。' }, keywords: ['创造', '技能', '自信', '掌控'] },
  { id: 2, name: 'The High Priestess', nameCn: '女祭司', arcana: 'major', image: '🔮', meaning: { upright: '直觉、潜意识、神秘智慧。答案在你的内心深处，静下心来倾听内在的声音，而非向外寻求。', reversed: '忽视直觉、秘密被揭露、情感封闭。可能过于依赖理性分析，忽视了内心的真实感受。' }, keywords: ['直觉', '神秘', '智慧', '静默'] },
  { id: 3, name: 'The Empress', nameCn: '女皇', arcana: 'major', image: '👸', meaning: { upright: '丰饶、母性、自然之美。创造力蓬勃发展的时期，享受生活的美好，滋养身心和身边的人。', reversed: '依赖、创造力枯竭、情感窒息。可能过度保护或控制他人，需要学会放手和信任。' }, keywords: ['丰饶', '母性', '美丽', '滋养'] },
  { id: 4, name: 'The Emperor', nameCn: '皇帝', arcana: 'major', image: '👑', meaning: { upright: '权威、稳定、领导力。建立秩序和规则的时刻，以理性和坚定的意志掌控局面，实现长远目标。', reversed: '专制、缺乏自律、滥用权力。过于僵化或控制欲过强可能导致关系紧张，需要学会灵活变通。' }, keywords: ['权威', '秩序', '领导', '稳定'] },
  { id: 5, name: 'The Hierophant', nameCn: '教皇', arcana: 'major', image: '⛪', meaning: { upright: '传统、信仰、精神指引。遵从内心的信仰和道德准则，向有智慧的人寻求建议和指导。', reversed: '反叛传统、教条主义、盲目追随。需要质疑现有的规则和观念，找到属于自己的信仰体系。' }, keywords: ['传统', '信仰', '指引', '教育'] },
  { id: 6, name: 'The Lovers', nameCn: '恋人', arcana: 'major', image: '💕', meaning: { upright: '爱、和谐、重要选择。面对内心真正渴望的选择，真诚的关系将带来深刻的成长和幸福。', reversed: '分离、价值观冲突、错误选择。关系中可能出现不和谐，需要坦诚沟通，面对内心的真实感受。' }, keywords: ['爱情', '选择', '和谐', '关系'] },
  { id: 7, name: 'The Chariot', nameCn: '战车', arcana: 'major', image: '🏇', meaning: { upright: '胜利、意志力、克服困难。以坚定的决心驾驭对立的力量，勇往直前，克服一切障碍达成目标。', reversed: '失控、失败、失去方向。内心的冲突和冲动可能让你偏离轨道，需要停下来重新审视目标。' }, keywords: ['胜利', '意志', '前进', '征服'] },
  { id: 8, name: 'Strength', nameCn: '力量', arcana: 'major', image: '🦁', meaning: { upright: '勇气、内在力量、耐心。以柔克刚，用爱与包容驯服内心的野兽，真正的力量源于温和与坚定。', reversed: '软弱、自我怀疑、情绪失控。可能正在被恐惧和不安全感所支配，需要重拾内心的勇气和信心。' }, keywords: ['勇气', '力量', '耐心', '包容'] },
  { id: 9, name: 'The Hermit', nameCn: '隐者', arcana: 'major', image: '🧘', meaning: { upright: '内省、独处、寻求真理。暂时退出喧嚣的世界，在独处中找到内在的智慧和方向。', reversed: '孤独、逃避现实、过于封闭。可能过度隔离自己，需要重新连接他人和外部世界。' }, keywords: ['内省', '孤独', '智慧', '探索'] },
  { id: 10, name: 'Wheel of Fortune', nameCn: '命运之轮', arcana: 'major', image: '🎡', meaning: { upright: '命运转折、机遇、循环变化。幸运之神向你微笑，命运的齿轮转向有利的方向，抓住稍纵即逝的机会。', reversed: '厄运、抵抗变化、循环停滞。事与愿违的时刻，接受不可改变的事物，等待运势的再次轮回。' }, keywords: ['命运', '转折', '机遇', '变化'] },
  { id: 11, name: 'Justice', nameCn: '正义', arcana: 'major', image: '⚖️', meaning: { upright: '公正、真相、因果关系。你的行动将得到应有的回报，诚实和公平是解决问题的关键。', reversed: '不公平、逃避责任、偏见。可能正在面对不公正的待遇，或者自己正在逃避应尽的责任和义务。' }, keywords: ['正义', '公平', '真相', '责任'] },
  { id: 12, name: 'The Hanged Man', nameCn: '倒吊人', arcana: 'major', image: '🙃', meaning: { upright: '牺牲、换个角度、顺其自然。以全新的视角看待世界，放手和等待可能比强行推进更有智慧。', reversed: '停滞、固执、无谓的牺牲。可能不愿做出必要的改变或妥协，导致局面僵持不下。' }, keywords: ['牺牲', '等待', '新视角', '放下'] },
  { id: 13, name: 'Death', nameCn: '死神', arcana: 'major', image: '💀', meaning: { upright: '转变、结束、新的开始。旧的事物正在消亡，为新的成长腾出空间，拥抱变化而非抗拒它。', reversed: '抗拒改变、停滞不前、恐惧终结。紧抓过去不放只会延长痛苦，学会放手才能迎来重生。' }, keywords: ['转变', '结束', '重生', '净化'] },
  { id: 14, name: 'Temperance', nameCn: '节制', arcana: 'major', image: '🌊', meaning: { upright: '平衡、调和、耐心等待。在对立的两极之间找到中间道路，以温和的方式达成和谐与圆满。', reversed: '失衡、过度、缺乏节制。可能在生活的某个方面走得太远，需要重新找回平衡和节奏。' }, keywords: ['平衡', '调和', '耐心', '中庸'] },
  { id: 15, name: 'The Devil', nameCn: '恶魔', arcana: 'major', image: '😈', meaning: { upright: '束缚、欲望、物质主义。看清那些束缚你的锁链——它们可能比你以为的更容易挣脱。面对内心的欲望和阴影。', reversed: '解脱、觉醒、打破束缚。正在从不良的关系或习惯中挣脱，重获自由和自我掌控的力量。' }, keywords: ['欲望', '束缚', '阴影', '物质'] },
  { id: 16, name: 'The Tower', nameCn: '高塔', arcana: 'major', image: '🗼', meaning: { upright: '突然的变故、颠覆、真相大白。建立在虚假基础上的事物正在崩塌，这是必要的清理，为新事物创造条件。', reversed: '逃避改变、维持假象、崩溃延迟。试图阻止不可避免的改变只会让最终的崩塌更加猛烈。' }, keywords: ['剧变', '觉醒', '崩塌', '启示'] },
  { id: 17, name: 'The Star', nameCn: '星星', arcana: 'major', image: '⭐', meaning: { upright: '希望、疗愈、灵感降临。暴风雨过后的宁静与美好，保持信心和希望，宇宙正在为你指引方向。', reversed: '绝望、失去信心、灵感枯竭。感觉与内心的指引失去了连接，需要时间重新找回希望和方向。' }, keywords: ['希望', '疗愈', '灵感', '宁静'] },
  { id: 18, name: 'The Moon', nameCn: '月亮', arcana: 'major', image: '🌙', meaning: { upright: '幻觉、直觉、潜意识。前方的道路不太清晰，相信直觉胜过表象，在迷雾中谨慎前行。', reversed: '恐惧消散、真相浮现、迷惑解除。迷雾正在散去，隐藏的真相即将浮出水面，准备面对现实。' }, keywords: ['幻觉', '直觉', '恐惧', '潜意识'] },
  { id: 19, name: 'The Sun', nameCn: '太阳', arcana: 'major', image: '☀️', meaning: { upright: '幸福、成功、生命力。阳光普照，一切都清晰明朗，充满喜悦和活力，享受当下的美好时光。', reversed: '暂时的阴霾、热情减退、延迟的成功。光明只是暂时被遮蔽，不要失去信心，太阳终将再次升起。' }, keywords: ['快乐', '成功', '活力', '光明'] },
  { id: 20, name: 'Judgement', nameCn: '审判', arcana: 'major', image: '📯', meaning: { upright: '觉醒、重生、回应召唤。听到内心深处的召唤，对自己的过往进行反思，做出重要的生命抉择。', reversed: '逃避召唤、自责、拒绝反思。不愿面对过去的错误或人生的重大决定，需要勇敢地做出选择。' }, keywords: ['觉醒', '召唤', '反思', '重生'] },
  { id: 21, name: 'The World', nameCn: '世界', arcana: 'major', image: '🌍', meaning: { upright: '完成、圆满、整合统一。一个生命周期的圆满结束，所有的努力都得到了回报，感受与宇宙融为一体的圆满。', reversed: '未完成、延迟、缺少关键一环。离目标只有一步之遥，需要找到缺失的部分才能完成最后的整合。' }, keywords: ['圆满', '完成', '整合', '成功'] },
]

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function drawCards(count: number): Array<{ card: TarotCard; position: string; reversed: boolean }> {
  const shuffled = shuffle(MAJOR_ARCANA)
  return shuffled.slice(0, count).map((card, i) => ({
    card,
    position: '',
    reversed: Math.random() > 0.5,
  }))
}

type SpreadType = 'single' | 'three' | 'celtic-cross'

export default function Tarot() {
  const [spreadType, setSpreadType] = useState<SpreadType | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TarotSpread | null>(null)
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set())

  const handleDraw = useCallback(async (type: SpreadType) => {
    setSpreadType(type)
    setLoading(true)
    setRevealedCards(new Set())
    await new Promise((r) => setTimeout(r, 1200))

    let cards: Array<{ card: TarotCard; position: string; reversed: boolean }>
    if (type === 'single') {
      cards = drawCards(1)
      cards[0].position = '今日指引'
    } else if (type === 'three') {
      cards = drawCards(3)
      cards[0].position = '过去'
      cards[1].position = '现在'
      cards[2].position = '未来'
    } else {
      cards = drawCards(10)
      const positions = ['现状', '阻碍', '基础', '过去', '目标', '未来', '自我', '环境', '希望与恐惧', '结果']
      cards.forEach((c, i) => (c.position = positions[i] || `位置${i + 1}`))
    }
    setResult({ type, cards })
    setLoading(false)
  }, [])

  const revealCard = (index: number) => {
    setRevealedCards((prev) => new Set([...prev, index]))
  }

  const reset = () => {
    setSpreadType(null)
    setResult(null)
    setRevealedCards(new Set())
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4 font-[family-name:var(--font-heading-cn)]">
          塔罗牌占卜
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          78张神秘塔罗牌，映照你的内心世界
          <br />
          静心冥想你的问题，然后选择一种牌阵开始占卜
        </p>
      </motion.div>

      {/* Spread Selection */}
      {!spreadType && !result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {([
            { type: 'single' as const, title: '单张牌', desc: '快速指引\n了解今日宇宙给你的信息', icon: '🃏' },
            { type: 'three' as const, title: '三张牌阵', desc: '过去·现在·未来\n解读事物发展的完整脉络', icon: '🎴' },
            { type: 'celtic-cross' as const, title: '凯尔特十字', desc: '十张牌完整解读\n深入探索复杂问题的方方面面', icon: '🔯' },
          ]).map(({ type, title, desc, icon }) => (
            <motion.div
              key={type}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDraw(type)}
              className="glass glass-hover p-6 text-center cursor-pointer"
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-xl font-bold text-gold mb-2 font-[family-name:var(--font-heading-cn)]">
                {title}
              </h3>
              <p className="text-sm text-text-secondary whitespace-pre-line">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {loading && <LoadingSpinner text="正在洗牌，感应宇宙能量..." />}

      {/* Results */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Cards Grid */}
            <div
              className={`grid gap-4 mb-8 ${
                result.type === 'single'
                  ? 'grid-cols-1 max-w-xs mx-auto'
                  : result.type === 'three'
                    ? 'grid-cols-3 max-w-lg mx-auto'
                    : 'grid-cols-2 sm:grid-cols-5 max-w-3xl mx-auto'
              }`}
            >
              {result.cards.map((item, index) => {
                const isRevealed = revealedCards.has(index)
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, rotateY: 180 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateY: isRevealed ? 0 : 180,
                    }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="cursor-pointer perspective-[800px]"
                    onClick={() => !isRevealed && revealCard(index)}
                    style={{ minHeight: result.type === 'single' ? '240px' : '200px' }}
                  >
                    <div className="relative w-full h-full transition-transform duration-600" style={{
                      transformStyle: 'preserve-3d',
                      transform: isRevealed ? 'rotateY(0deg)' : 'rotateY(180deg)',
                    }}>
                      {/* Card Back */}
                      {!isRevealed && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 glass rounded-xl border border-gold/20 bg-gradient-to-br from-bg-secondary to-bg-primary cursor-pointer hover:border-gold/40 transition-colors">
                          <div className="text-3xl mb-1">🃏</div>
                          <div className="text-xs text-gold/60">点击翻开</div>
                          <div className="text-xs text-text-secondary mt-2">{item.position}</div>
                        </div>
                      )}
                      {/* Card Front */}
                      {isRevealed && (
                        <div className="p-3 glass rounded-xl border border-gold/20">
                          <div className="text-center mb-2">
                            <div className="text-3xl mb-1">{item.card.image}</div>
                            <div className={`text-xs font-bold ${item.reversed ? 'text-red-400' : 'text-gold'}`}>
                              {item.card.nameCn}
                              {item.reversed && ' (逆位)'}
                            </div>
                          </div>
                          <div className="text-xs text-text-secondary text-center">{item.position}</div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Reveal all button */}
            {revealedCards.size < result.cards.length && (
              <div className="text-center mb-8">
                <Button variant="ghost" onClick={() => {
                  const all = new Set<number>()
                  result.cards.forEach((_, i) => all.add(i))
                  setRevealedCards(all)
                }}>
                  全部翻开
                </Button>
              </div>
            )}

            {/* Interpretations */}
            {revealedCards.size > 0 && (
              <FortuneResult
                title={spreadType === 'single' ? '单张牌解读' : spreadType === 'three' ? '三张牌解读' : '凯尔特十字解读'}
                subtitle="请静心体会牌的指引"
              >
                <div className="space-y-6">
                  {result.cards.map((item, index) => {
                    if (!revealedCards.has(index)) return null
                    const meaning = item.reversed ? item.card.meaning.reversed : item.card.meaning.upright
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border-b border-white/5 last:border-0 pb-4 last:pb-0"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <span className="text-2xl">{item.card.image}</span>
                          <div>
                            <h4 className="font-bold text-gold font-[family-name:var(--font-heading-cn)]">
                              {item.position} — {item.card.nameCn}
                              {item.reversed && <span className="text-red-400 text-sm ml-1">逆位</span>}
                            </h4>
                            <p className="text-sm text-text-secondary leading-relaxed mt-1">{meaning}</p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {item.card.keywords.map((kw) => (
                                <span key={kw} className="px-2 py-0.5 text-xs rounded-full bg-gold/10 text-gold/80 border border-gold/10">
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-8 text-center space-x-4">
                  <Button variant="gold" onClick={reset}>
                    重新占卜
                  </Button>
                  <Button variant="ghost" onClick={() => {
                    handleDraw(spreadType!)
                    setResult(null)
                  }}>
                    再抽一次
                  </Button>
                </div>
              </FortuneResult>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
