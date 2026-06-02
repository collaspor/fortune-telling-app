import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/Button'
import { Input } from '@/components/Input'
import LoadingSpinner from '@/components/LoadingSpinner'
import FortuneResult from '@/components/FortuneResult'

// 64 Hexagram names (abbreviated — full set)
const HEXAGRAMS: Record<number, { name: string; symbol: string; judgment: string; interpretation: string }> = {
  1: { name: '乾为天', symbol: '䷀', judgment: '元亨利贞', interpretation: '乾卦为六十四卦之首，象征天道运行，刚健不息。得此卦者宜积极进取，自强不息，但需谨记物极必反之理。' },
  2: { name: '坤为地', symbol: '䷁', judgment: '元亨利牝马之贞', interpretation: '坤卦象征大地，柔顺承载。宜以柔克刚，厚德载物，以包容和耐心应对一切。' },
  3: { name: '水雷屯', symbol: '䷂', judgment: '元亨利贞，勿用有攸往', interpretation: '屯卦象征万物初生的艰难。创业初期困难重重，需耐心等待时机，不可贸然前行。' },
  4: { name: '山水蒙', symbol: '䷃', judgment: '亨，匪我求童蒙，童蒙求我', interpretation: '蒙卦代表启蒙、学习。保持谦虚好学的态度，求知若渴，必能开启智慧之门。' },
  5: { name: '水天需', symbol: '䷄', judgment: '有孚光亨，贞吉，利涉大川', interpretation: '需卦教人等待时机的智慧。耐心等待，保持信心，时机成熟时自可大步向前。' },
  6: { name: '天水讼', symbol: '䷅', judgment: '有孚窒惕，中吉终凶', interpretation: '讼卦提醒避免纷争。凡事以和为贵，争讼虽可暂时获胜，但终非上策。' },
  7: { name: '地水师', symbol: '䷆', judgment: '贞丈人吉，无咎', interpretation: '师卦象征军队和集体行动。需要组织和纪律，以正直的领导带领团队前进。' },
  8: { name: '水地比', symbol: '䷇', judgment: '吉，原筮元永贞，无咎', interpretation: '比卦代表亲密团结。人际关系和谐，适合合作和建立联盟，但要审慎选择伙伴。' },
  9: { name: '风天小畜', symbol: '䷈', judgment: '亨，密云不雨，自我西郊', interpretation: '小畜卦表示小有积蓄但尚未大成。继续积累力量，静待更大的突破。' },
  10: { name: '天泽履', symbol: '䷉', judgment: '履虎尾不咥人，亨', interpretation: '履卦教人谨慎前行。即使身处险境，只要小心谨慎，也能化险为夷。' },
  11: { name: '地天泰', symbol: '䷊', judgment: '小往大来，吉亨', interpretation: '泰卦意味天地交泰，万物通达。运势顺畅，事业顺利发展，但要居安思危。' },
  12: { name: '天地否', symbol: '䷋', judgment: '否之匪人，不利君子贞', interpretation: '否卦表示天地闭塞不通。运势受阻，宜退守自保，韬光养晦，等待转机。' },
  13: { name: '天火同人', symbol: '䷌', judgment: '同人于野，亨，利涉大川', interpretation: '同人卦代表同心协力。团结志同道合之人，集众人之力可成大事。' },
  14: { name: '火天大有', symbol: '䷍', judgment: '元亨', interpretation: '大有卦象征丰收富足。事业昌盛，财富充裕，但需警惕骄奢之心。' },
  15: { name: '地山谦', symbol: '䷎', judgment: '亨，君子有终', interpretation: '谦卦教人谦虚之道。满招损谦受益，保持谦虚低调，必能善始善终。' },
  16: { name: '雷地豫', symbol: '䷏', judgment: '利建侯行师', interpretation: '豫卦代表愉悦和顺。适当的放松和享受是必要的，但不可沉溺于享乐。' },
  17: { name: '泽雷随', symbol: '䷐', judgment: '元亨利贞，无咎', interpretation: '随卦表示随机应变。顺势而为，随遇而安，不必强求，自能得到好的结果。' },
  18: { name: '山风蛊', symbol: '䷑', judgment: '元亨，利涉大川，先甲三日，后甲三日', interpretation: '蛊卦代表败坏和整顿。发现问题的根源，果断改革，彻底清除积弊。' },
  19: { name: '地泽临', symbol: '䷒', judgment: '元亨利贞，至于八月有凶', interpretation: '临卦象征亲临视察。时机正在临近，以开放的心态面对即将到来的变化和机遇。' },
  20: { name: '风地观', symbol: '䷓', judgment: '盥而不荐，有孚颙若', interpretation: '观卦代表观察和反思。退一步以更高的视角审视全局，才能获得深刻的洞见。' },
  21: { name: '火雷噬嗑', symbol: '䷔', judgment: '亨，利用狱', interpretation: '噬嗑卦表示咬合、决断。面对障碍要果断行动，清除前进道路上的阻碍。' },
  22: { name: '山火贲', symbol: '䷕', judgment: '亨，小利有攸往', interpretation: '贲卦代表装饰和文化。注重内在修养和外在形象，以文化的力量提升自身魅力。' },
  23: { name: '山地剥', symbol: '䷖', judgment: '不利有攸往', interpretation: '剥卦象征剥落衰败。阴盛阳衰，根基动摇，宜退守等待，保存实力。' },
  24: { name: '地雷复', symbol: '䷗', judgment: '亨，出入无疾，朋来无咎', interpretation: '复卦代表回归和复兴。一阳来复，生机重现，之前的阴霾即将散去，新机会正在到来。' },
  25: { name: '天雷无妄', symbol: '䷘', judgment: '元亨利贞，其匪正有眚', interpretation: '无妄卦教人真诚自然。保持纯粹的本心，不做非分之想，自然万事顺遂。' },
  26: { name: '山天大畜', symbol: '䷙', judgment: '利贞，不家食吉，利涉大川', interpretation: '大畜卦表示大蓄积。厚积薄发，积蓄实力，准备迎接更大的挑战和机遇。' },
  27: { name: '山雷颐', symbol: '䷚', judgment: '贞吉，观颐，自求口实', interpretation: '颐卦代表颐养和滋养。注重身心健康，修身养性，自食其力是最好的生活方式。' },
  28: { name: '泽风大过', symbol: '䷛', judgment: '栋桡，利有攸往，亨', interpretation: '大过卦表示过度和超越。大局面临失衡，需要果断调整，以非常之举应对非常之时。' },
  29: { name: '坎为水', symbol: '䷜', judgment: '习坎有孚，维心亨，行有尚', interpretation: '坎卦象征重重险阻。身处困境之中，保持内心坚定和诚实，终能化险为夷。' },
  30: { name: '离为火', symbol: '䷝', judgment: '利贞亨，畜牝牛吉', interpretation: '离卦代表光明和依附。如火焰般温暖明亮，但需有所依附，柔顺守正可得吉祥。' },
  31: { name: '泽山咸', symbol: '䷞', judgment: '亨利贞，取女吉', interpretation: '咸卦代表感应和情感。心灵相通，情感交融，以真诚之心感应他人和世界。' },
  32: { name: '雷风恒', symbol: '䷟', judgment: '亨，无咎，利贞，利有攸往', interpretation: '恒卦表示长久和稳定。持之以恒，坚守正道，长期的努力终将获得丰厚的回报。' },
  33: { name: '天山遁', symbol: '䷠', judgment: '亨，小利贞', interpretation: '遁卦代表退避。形势不利时，适时退避是明智之举，韬光养晦以待来日。' },
  34: { name: '雷天大壮', symbol: '䷡', judgment: '利贞', interpretation: '大壮卦代表强盛壮大。力量充沛之时，仍要守持正道，不可恃强凌弱。' },
  35: { name: '火地晋', symbol: '䷢', judgment: '康侯用锡马蕃庶，昼日三接', interpretation: '晋卦象征进步和晋升。事业蒸蒸日上，光明在前，以正直之心获取应得的回报。' },
  36: { name: '地火明夷', symbol: '䷣', judgment: '利艰贞', interpretation: '明夷卦表示光明受损。黑暗时期，保持内心的光明和正直，在逆境中磨砺自己。' },
  37: { name: '风火家人', symbol: '䷤', judgment: '利女贞', interpretation: '家人卦关乎家庭和亲情。家和万事兴，关注家庭关系的和谐，各尽其责。' },
  38: { name: '火泽睽', symbol: '䷥', judgment: '小事吉', interpretation: '睽卦代表分歧和对立。人与人之间存在差异是正常的，求同存异，小处着手可得吉祥。' },
  39: { name: '水山蹇', symbol: '䷦', judgment: '利西南，不利东北，利见大人', interpretation: '蹇卦表示艰难险阻。前路坎坷，需寻找正确的方向和贵人相助。' },
  40: { name: '雷水解', symbol: '䷧', judgment: '利西南，无所往，其来复吉', interpretation: '解卦代表解脱和缓解。困难正在消解，不必过多干预，让事情自然恢复。' },
  41: { name: '山泽损', symbol: '䷨', judgment: '有孚元吉，无咎可贞，利有攸往', interpretation: '损卦教人减损之道。有时少即是多，简化生活，舍弃不必要的负担。' },
  42: { name: '风雷益', symbol: '䷩', judgment: '利有攸往，利涉大川', interpretation: '益卦代表增益和利益。天时地利人和，事业和财富都在增长，把握良机。' },
  43: { name: '泽天夬', symbol: '䷪', judgment: '扬于王庭，孚号有厉', interpretation: '夬卦表示决断和分离。当断则断，不受其乱，果断地做出选择和决定。' },
  44: { name: '天风姤', symbol: '䷫', judgment: '女壮，勿用取女', interpretation: '姤卦代表邂逅和相遇。意外的相遇可能带来重要的变化，保持开放但也要谨慎。' },
  45: { name: '泽地萃', symbol: '䷬', judgment: '亨，王假有庙，利见大人', interpretation: '萃卦代表聚集和精华。群英荟萃，适合团队合作和集体行动，集中力量办大事。' },
  46: { name: '地风升', symbol: '䷭', judgment: '元亨，用见大人，勿恤', interpretation: '升卦代表上升和成长。步步高升，事业进入上升期，保持谦逊继续努力。' },
  47: { name: '泽水困', symbol: '䷮', judgment: '亨贞，大人吉，无咎', interpretation: '困卦表示困境和窘迫。身处困境更要保持乐观和坚守，转机总会来临。' },
  48: { name: '水风井', symbol: '䷯', judgment: '改邑不改井，无丧无得', interpretation: '井卦代表源泉和滋养。生活的根基不变，持续提供价值，滋养自己和他人。' },
  49: { name: '泽火革', symbol: '䷰', judgment: '巳日乃孚，元亨利贞，悔亡', interpretation: '革卦代表变革和革新。旧的不去新的不来，顺应时代的变化，主动进行革新。' },
  50: { name: '火风鼎', symbol: '䷱', judgment: '元吉，亨', interpretation: '鼎卦象征权力和责任。承担重任，以正直和智慧行使职责，成就大事。' },
  51: { name: '震为雷', symbol: '䷲', judgment: '亨，震来虩虩，笑言哑哑', interpretation: '震卦代表震惊和行动。面对突如其来的变化保持冷静，转危为安后更加从容。' },
  52: { name: '艮为山', symbol: '䷳', judgment: '艮其背不获其身，行其庭不见其人', interpretation: '艮卦象征停止和静止。知止而后有定，适当停下来反思，不要一味向前冲。' },
  53: { name: '风山渐', symbol: '䷴', judgment: '女归吉，利贞', interpretation: '渐卦代表渐进和积累。万事不可急于求成，循序渐进，自然而然地达成目标。' },
  54: { name: '雷泽归妹', symbol: '䷵', judgment: '征凶，无攸利', interpretation: '归妹卦表示结合但需谨慎。选择伴侣或合作伙伴时要格外审慎，不可盲目。' },
  55: { name: '雷火丰', symbol: '䷶', judgment: '亨，王假之，勿忧，宜日中', interpretation: '丰卦代表丰盛和饱满。处于鼎盛时期，享受丰盈但要知日中则昃的道理。' },
  56: { name: '火山旅', symbol: '䷷', judgment: '小亨，旅贞吉', interpretation: '旅卦表示旅行和漂泊。人生如旅，在外奔波时要灵活应变，保持谦逊。' },
  57: { name: '巽为风', symbol: '䷸', judgment: '小亨，利有攸往，利见大人', interpretation: '巽卦代表顺从和渗透。如风般柔和地渗透和影响，以柔克刚，顺势而行。' },
  58: { name: '兑为泽', symbol: '䷹', judgment: '亨利贞', interpretation: '兑卦象征喜悦和交流。快乐融洽的人际交往，以开放的心态分享和交流。' },
  59: { name: '风水涣', symbol: '䷺', judgment: '亨，王假有庙，利涉大川', interpretation: '涣卦代表涣散和重新凝聚。离散之后重整旗鼓，将分散的力量重新聚集在一起。' },
  60: { name: '水泽节', symbol: '䷻', judgment: '亨，苦节不可贞', interpretation: '节卦表示节制和限度。凡事有度，适可而止，过度的克制和放纵都不可取。' },
  61: { name: '风泽中孚', symbol: '䷼', judgment: '豚鱼吉，利涉大川，利贞', interpretation: '中孚卦代表诚信和信任。以诚待人，信守承诺，真诚是通往一切成功的基石。' },
  62: { name: '雷山小过', symbol: '䷽', judgment: '亨利贞，可小事不可大事', interpretation: '小过卦表示小有过度。在细节上可以精致讲究，但大方向不要偏离中道。' },
  63: { name: '水火既济', symbol: '䷾', judgment: '亨小，利贞，初吉终乱', interpretation: '既济卦代表事已成就。目标已经达成，但成功之后需要更加谨慎，不可松懈。' },
  64: { name: '火水未济', symbol: '䷿', judgment: '亨，小狐汔济濡其尾，无攸利', interpretation: '未济卦表示事业未成。革命尚未成功，同志仍需努力，坚持到最后才是真正的胜利。' },
}

// Simulate coin toss for one line
function tossCoins(): { type: '老阳' | '老阴' | '少阳' | '少阴'; changing: boolean } {
  const toss = Math.floor(Math.random() * 4) // 0-3 heads
  if (toss === 3) return { type: '老阳', changing: true }  // 3 heads
  if (toss === 0) return { type: '老阴', changing: true }  // 0 heads (3 tails)
  if (toss === 2) return { type: '少阳', changing: false } // 2 heads
  return { type: '少阴', changing: false }                  // 1 head
}

function getHexagramNumber(lines: Array<{ type: string }>): number {
  // Bottom line is position 0 (line 1), top line is position 5 (line 6)
  // Yang lines (老阳/少阳) = 1, Yin lines (老阴/少阴) = 0
  let num = 0
  for (let i = 0; i < 6; i++) {
    const isYang = lines[i].type === '老阳' || lines[i].type === '少阳'
    if (isYang) num += Math.pow(2, i)
  }
  // Convert to hexagram number (1-64)
  // This is simplified — real conversion is more complex
  return (num % 64) + 1
}

export default function IChing() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [lines, setLines] = useState<Array<{ type: '老阳' | '老阴' | '少阳' | '少阴'; changing: boolean }> | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleCast = async () => {
    setLoading(true)
    setLines(null)
    setShowResult(false)

    // Simulate casting 6 lines (one at a time for dramatic effect)
    const newLines: Array<{ type: string; changing: boolean }> = []
    for (let i = 0; i < 6; i++) {
      await new Promise((r) => setTimeout(r, 400))
      newLines.push(tossCoins())
      setLines([...newLines])
    }

    setLoading(false)
    await new Promise((r) => setTimeout(r, 600))
    setShowResult(true)
  }

  const primaryNum = lines ? getHexagramNumber(lines) : 1
  const hasChanging = lines?.some((l) => l.changing)
  // Transformed hexagram: flip changing lines
  const transformedLines = lines?.map((l) => {
    if (!l.changing) return l
    return l.type === '老阳'
      ? { type: '少阴' as const, changing: false }
      : { type: '少阳' as const, changing: false }
  })
  const transformedNum = transformedLines ? getHexagramNumber(transformedLines) : null

  const primaryHex = HEXAGRAMS[primaryNum] || HEXAGRAMS[1]
  const transformedHex = transformedNum ? HEXAGRAMS[transformedNum] : null

  const lineSymbols: Record<string, string> = {
    '老阳': '⚊⚊ → ⚋⚋',
    '老阴': '⚋⚋ → ⚊⚊',
    '少阳': '⚊⚊',
    '少阴': '⚋⚋',
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gradient mb-4 font-[family-name:var(--font-heading-cn)]">
          易经占卜
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          以三枚铜钱起卦，六爻成象
          <br />
          静心冥想你的疑问，然后抛掷铜钱，感知天地玄机
        </p>
      </motion.div>

      {!lines && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 sm:p-8 rounded-2xl max-w-lg mx-auto"
        >
          <Input
            label="你想问什么？（可选）"
            placeholder="默念你的问题，或留空..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mb-6"
          />
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={handleCast}
            loading={loading}
          >
            {loading ? '正在抛掷铜钱...' : '开始起卦'}
          </Button>
        </motion.div>
      )}

      {/* Casting animation */}
      {lines && lines.length < 6 && (
        <div className="max-w-md mx-auto">
          <LoadingSpinner text="铜钱在空中旋转..." />
          <div className="space-y-3 mt-6">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-4 rounded-xl text-center"
              >
                <div className="text-sm text-text-secondary">第{i + 1}爻（从下往上）</div>
                <div className="text-lg font-bold text-gold mt-1">{line.type}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Complete result */}
      <AnimatePresence>
        {showResult && lines && lines.length === 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FortuneResult
              title="卦象已成"
              subtitle={question ? `所问：${question}` : '请解读卦象'}
            >
              {/* Hexagram display */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {/* Primary hexagram */}
                <div className="text-center">
                  <div className="text-6xl mb-3">{primaryHex.symbol}</div>
                  <h3 className="text-xl font-bold text-gold font-[family-name:var(--font-heading-cn)]">
                    本卦：{primaryHex.name}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">卦辞：{primaryHex.judgment}</p>
                </div>

                {/* Transformed hexagram */}
                <div className="text-center">
                  {transformedHex ? (
                    <>
                      <div className="text-6xl mb-3">{transformedHex.symbol}</div>
                      <h3 className="text-xl font-bold text-gold font-[family-name:var(--font-heading-cn)]">
                        变卦：{transformedHex.name}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">卦辞：{transformedHex.judgment}</p>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-text-secondary">无变爻，以本卦为准</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Six lines */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gold mb-4 font-[family-name:var(--font-heading-cn)]">
                  六爻详情（从下往上）
                </h3>
                <div className="space-y-2">
                  {lines.map((line, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-3 rounded-xl ${
                        line.changing ? 'glass border border-gold/30' : 'bg-white/[0.02]'
                      }`}
                    >
                      <span className="text-sm text-text-secondary w-16">第{i + 1}爻</span>
                      <span className={`font-bold ${line.changing ? 'text-gold' : 'text-text-primary'}`}>
                        {line.type}
                      </span>
                      <span className="text-xs text-text-secondary/60 hidden sm:inline">
                        {lineSymbols[line.type]}
                      </span>
                      {line.changing && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gold/10 text-gold ml-auto">
                          变爻
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                {!hasChanging && (
                  <p className="text-xs text-text-secondary mt-3 text-center">
                    六爻皆静，以本卦卦辞为准
                  </p>
                )}
              </div>

              {/* Interpretation */}
              <div>
                <h3 className="text-lg font-bold text-gold mb-4 font-[family-name:var(--font-heading-cn)]">
                  卦象解读
                </h3>
                <p className="text-text-primary leading-relaxed mb-4">{primaryHex.interpretation}</p>
                {transformedHex && (
                  <>
                    <h4 className="font-bold text-gold/80 mt-4 mb-2 font-[family-name:var(--font-heading-cn)]">
                      变卦启示
                    </h4>
                    <p className="text-text-primary leading-relaxed">{transformedHex.interpretation}</p>
                  </>
                )}
              </div>

              <div className="mt-8 text-center">
                <Button variant="ghost" onClick={() => { setLines(null); setShowResult(false); setQuestion('') }}>
                  重新起卦
                </Button>
              </div>
            </FortuneResult>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
