import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/Button'
import { Select } from '@/components/Input'
import FortuneResult from '@/components/FortuneResult'

const HOROSCOPE_SIGNS = [
  { name: 'Aries', nameCn: '白羊座', symbol: '♈', dateRange: '3月21日 — 4月19日', element: '火', rulingPlanet: '火星', traits: ['勇敢', '热情', '直率', '领导力'], compatible: ['狮子座', '射手座', '双子座'], dailyHoroscope: '今天你的精力充沛饱满，整个人散发出一种难以忽视的活力与自信。适合开启新项目或推进那些需要勇气和果断的事情，早上的第一个直觉往往是对的。但在沟通中要注意语气和方式，过于直率可能在无意中刺痛敏感的人，说话之前在心里默数三秒。今天适合穿红色系的衣服，幸运数字为7。', weeklyHoroscope: '本周白羊座将在事业上迎来一个关键的突破点，周中左右可能收到一个让你心跳加速的好消息或重要邀约。工作上你的领导力将得到充分发挥，团队对你的信任和依赖明显增强，这是建立职业声望的好时机。财运方面本周不宜大额消费，但可以考虑为自我提升方面的投入。感情方面坦诚的沟通是本周的关键词，如果你心中有话一直想说却犹豫不决，周末是一个适合打开心扉的好时机。健康上需注意运动前做好充分热身，避免因急躁而导致的肌肉拉伤。周末适合安排一次短途户外活动，大自然的能量会给你的下周注入新的活力。' },
  { name: 'Taurus', nameCn: '金牛座', symbol: '♉', dateRange: '4月20日 — 5月20日', element: '土', rulingPlanet: '金星', traits: ['耐心', '务实', '可靠', '享受生活'], compatible: ['处女座', '摩羯座', '巨蟹座'], dailyHoroscope: '今天非常适合处理与财务和物质相关的事务，你的务实和细致会带来意想不到的收获。这是一个稳扎稳打的节奏最能产生成效的日子，不必急于求成，一步一个脚印会让结果更加扎实。花一点时间犒赏自己——一份精致的美食或一个舒适的小憩都是对自己最好的奖励。今天幸运色为绿色，适合佩戴木质或玉石饰品。', weeklyHoroscope: '本周金牛座的财运相当不错，周初可能会有意料之外的收入或让你满意的财务进展。工作上你的坚持和耐心开始显现成果，之前埋下的努力种子正在悄悄发芽，周三前后是展示成果的好时机。感情方面星象提示你需要多一些灵活和变通，过于固执可能会让一段美好的关系产生不必要的摩擦，试着站在对方的角度思考问题。家庭事务本周可能需要你多花一些精力，某个家人的需求值得你用心关注。健康方面注意饮食的营养均衡，本周特别适合开始一个新的健康习惯，比如晨间瑜伽或健康饮食计划。周末建议留出时间整理一下居家环境，整洁的空间会让你的心态更加舒展。' },
  { name: 'Gemini', nameCn: '双子座', symbol: '♊', dateRange: '5月21日 — 6月21日', element: '风', rulingPlanet: '水星', traits: ['聪明', '好奇', '善于沟通', '多才多艺'], compatible: ['天秤座', '水瓶座', '白羊座'], dailyHoroscope: '社交运势在今天达到一个小高峰，你的谈吐幽默和智慧火花将吸引有趣的人靠近。这是约朋友喝咖啡或参加社交活动的好日子，一场轻松的交谈可能带来意想不到的灵感或机会。但受水星影响，今天要特别注意不要同时处理过多任务，专注一件事反而效率更高。今天幸运色为黄色，随身携带笔记本记录闪过的灵感会很有帮助。', weeklyHoroscope: '本周双子座的头脑特别活跃，创意和灵感如同泉水般源源不断涌现，是头脑风暴和学习新技能的最佳时机。工作上适合提出创新方案或开启一个新的学习计划，你的多才多艺将在团队中获得认可。财运方面本周建议暂缓重大投资决策，先用你敏锐的思维做好充分的调研和比较。感情生活轻松愉快，单身的双子可能在书店、咖啡馆或线上课程中遇到思想同频的人。需注意的是本周兴趣点太多容易导致浅尝辄止，选定两三个重点深入下去，不要因为好奇而分散了宝贵的时间和精力。健康方面注意肩颈的紧张和眼疲劳，长时间面对屏幕后要做一些伸展运动。周末适合安排一场文化之旅——博物馆、艺术展或一场好电影都会让你的内心充实而愉悦。' },
  { name: 'Cancer', nameCn: '巨蟹座', symbol: '♋', dateRange: '6月22日 — 7月22日', element: '水', rulingPlanet: '月亮', traits: ['温柔', '敏感', '顾家', '直觉力强'], compatible: ['天蝎座', '双鱼座', '金牛座'], dailyHoroscope: '今天你的情感雷达特别敏锐，能捕捉到周围人最细微的情绪变化。适合与家人共度温馨时光，或给远方的亲人打一个电话，情感连接会给你带来深深的满足感和安全感。在照顾他人的同时，别忘了留一份温柔给自己。今天幸运色为银白色，一杯温热的茶和一个安静的空间是最好的充电方式。', weeklyHoroscope: '本周巨蟹座的心情将更多聚集在家庭和内在世界的整理上。一件搁置已久的家务事或家庭事务可能终于得到妥善解决，让你卸下心头一块大石。工作上本周偏重内部事务而非对外拓展，整理文件、优化流程或为团队提供一个温暖的氛围都是你的重要贡献。财运方面本周开销可能偏多，大多与家庭和居住环境相关，做好预算管理是关键。感情上你对安全感的渴望会变得更加强烈，适时向伴侣表达你的需要，而非憋在心里默默期待对方能够猜中。健康方面多关注情绪波动对肠胃的影响，学会用健康的方式释放压力。周末最适合宅家烹饪一顿丰盛的晚餐，邀请最亲近的人一起分享，家的温暖是你最大的能量补给站。' },
  { name: 'Leo', nameCn: '狮子座', symbol: '♌', dateRange: '7月23日 — 8月22日', element: '火', rulingPlanet: '太阳', traits: ['自信', '慷慨', '有魅力', '创造力'], compatible: ['白羊座', '射手座', '天秤座'], dailyHoroscope: '今天你就是人群中最耀眼的存在，你的自信和魅力如阳光般自然散发。适合做公开演讲、展示才艺或主导重要的会议，你的表现将让所有人刮目相看。但也不要忘记给身边的人留出舞台，真正的王者是能让身边人一起发光的人。今天幸运色为金色，白天多晒晒太阳能为你带来一整天的好运。', weeklyHoroscope: '本周狮子座在创意和领导方面将发挥出耀眼的光芒，是全力以赴展现自我的好时机。工作上可能获得上级或重要人物的认可与赞赏，你的一个大创意或方案可能成为本周的亮点，大胆推进你的想法。财运方面本周偏财运不错，可能收到小礼物或有意外的小惊喜。感情上要注意的是，你的光芒固然耀眼，但也要给对方足够的空间和尊重，不要因为过于专注于自我的表现而忽略了伴侣的感受。单身狮子本周魅力不可挡，但真正的吸引力来自于你内心的温暖和慷慨，而不仅仅是外在的光环。健康方面精力充沛，适合开启一个新的健身计划或挑战一项运动目标。周末适合安排一些有仪式感的活动，如一顿精致的晚餐或一场高质量的艺术演出，让自己充分享受生活之美。' },
  { name: 'Virgo', nameCn: '处女座', symbol: '♍', dateRange: '8月23日 — 9月22日', element: '土', rulingPlanet: '水星', traits: ['细心', '完美主义', '分析力强', '务实'], compatible: ['金牛座', '摩羯座', '天蝎座'], dailyHoroscope: '今天你的分析能力和细致观察力处于巅峰状态，非常适合处理需要精密和严谨的任务。在工作中你能发现别人忽略的细节问题，这将为你带来意外的赞赏。但记得对自己和身边人多一分宽容——不是所有的事情都需要做到一百分，有时候八十分也是圆满。今天幸运色为米色，整理一下工作桌面可以帮你清空杂念。', weeklyHoroscope: '本周处女座在工作上的精益求精将带来可观的成果回报。你的严谨和专业是你的金字招牌，周中前后可能有项目验收或成果展示的机会，一切都将有条不紊地推进。财运方面本周适合整理账单、评估资产和制定新的储蓄计划，你对细节的敏感能帮助你发现很多省钱的小窍门。感情中需要提醒你的是：放下完美主义会让你轻松很多，不要用显微镜去看伴侣的缺点，你选择的不是完美的人，而是值得你爱的人。健康方面需要特别注意消化系统的调理和保养，规律饮食和细嚼慢咽是最简单有效的养生之道。本周也适合进行一次全面的身体检查。周末可以安排一场断舍离——清理掉不再需要的物品和思绪，让生活空间和内心都重新变得洁净有序。' },
  { name: 'Libra', nameCn: '天秤座', symbol: '♎', dateRange: '9月23日 — 10月23日', element: '风', rulingPlanet: '金星', traits: ['优雅', '公正', '善于合作', '追求和谐'], compatible: ['双子座', '水瓶座', '狮子座'], dailyHoroscope: '今天你在人际交往中如鱼得水，你的公正和优雅感染着身边每一个人。适合处理和调解人际关系相关的事务，你的调解能力能巧妙地化解矛盾、带来和谐。但在需要做决定的事情上，不要过于犹豫不决，信任你的第一直觉。今天幸运色为粉色，一个小小的善意举动会为你带来意想不到的美好回报。', weeklyHoroscope: '本周天秤座的人际魅力和社交运势处于上升通道，是拓展人脉和加深友谊的好时期。工作中可能有新的合作机会出现，你的协调能力和公正态度将使你成为团队中最受欢迎的人。财运方面本周适合团队合作创造价值而非单打独斗，可能通过合作伙伴带来经济上的好消息。感情上星象提示你必须在选择面前更加果断——平衡固然是美德，但过度的犹豫可能会让你与良机擦肩而过，有些决定必须在时间的压力下做出。单身天秤的社交生活丰富多彩，一段新的缘分可能正在一个不经意的社交场合中萌芽。健康方面注意因社交频繁而导致的睡眠不足，美固然重要，但充足的休息才是最美的基础。周末适合参加一场有品质的聚会或文化活动，与有趣的人进行有深度的对话会让你神清气爽。' },
  { name: 'Scorpio', nameCn: '天蝎座', symbol: '♏', dateRange: '10月24日 — 11月22日', element: '水', rulingPlanet: '冥王星', traits: ['深沉', '忠诚', '洞察力强', '意志坚定'], compatible: ['巨蟹座', '双鱼座', '处女座'], dailyHoroscope: '今天你的直觉异常敏锐，能穿透表象看到事物深层的真相。这是一个适合深入思考、冥想和研究的时刻，你可能会获得一个重要的人生领悟。不要急于和人分享你的发现，先在内心沉淀和酝酿，时机成熟时自然会发挥力量。今天幸运色为深红色，保持一点神秘感是你今天最好的魅力武器。', weeklyHoroscope: '本周天蝎座将经历一次意义深刻的内心转变和觉醒。一段旧的情感记忆可能重新浮现在你的脑海中，不是来困扰你，而是来帮助你完成一次迟到的释怀和领悟。事业上有望突破一个长期困扰你的瓶颈，本周的某一个关键对话或决策将改变接下来半年的工作格局。财运方面适合进行深度的财务梳理，你敏锐的直觉可能会帮你在投资中规避一个潜在风险或发现一个被忽视的机会。感情方面坦诚和深度连接是你的需求——本周适合与伴侣进行一次走心的交流，不要害怕展示你的脆弱，它是你真正的力量。健康方面多关注情绪对身体的影响，深度的呼吸练习或温水浴有助于释放积压的紧张。周末适合独自安静地阅读一本好书，在独处中重新汲取力量。' },
  { name: 'Sagittarius', nameCn: '射手座', symbol: '♐', dateRange: '11月23日 — 12月21日', element: '火', rulingPlanet: '木星', traits: ['乐观', '热爱自由', '坦率', '冒险精神'], compatible: ['白羊座', '狮子座', '水瓶座'], dailyHoroscope: '今天充满了冒险和探索的能量，是你尝试新鲜事物、拓展舒适区的好时机。不论是报名一个新课程、尝试一条从未走过的路，还是品尝一种异国美食，都能给你带来纯粹的快乐和成长。注意不要因为过度乐观而做出轻率的承诺。今天幸运色为紫色，保持开放的心态会吸引意想不到的美好。', weeklyHoroscope: '本周射手座的学习运和旅行运双双在线，是开阔眼界和增长智慧的绝佳一周。如果有出行计划正在酝酿中，大胆出发吧，你在旅途中的收获将远超预期。工作上你的乐观和坦率感染着整个团队，适合提出前瞻性的想法和拓展业务边界。财运方面本周可能有意外之喜——一笔迟到的还款或一个意料之外的奖金，但收到之后不要因为兴奋而过度消费。感情中单身的射手可能在旅途中或学习场合遇到有趣的人，异国风情和文化差异将成为吸引力的加分项；已有伴侣的射手适合一起规划一场未来旅行。健康方面精力旺盛，但需注意运动过量的问题，适度是最好的养生之道。周末不妨去探索一个你从未去过的地方，哪怕是城市里一个陌生的街区，新鲜感将是最好的充电方式。' },
  { name: 'Capricorn', nameCn: '摩羯座', symbol: '♑', dateRange: '12月22日 — 1月19日', element: '土', rulingPlanet: '土星', traits: ['自律', '有抱负', '耐心', '务实'], compatible: ['金牛座', '处女座', '天蝎座'], dailyHoroscope: '今天特别适合制定长期计划和梳理人生目标。你的自律和专注力如同精确的钟表，让你能高效完成那些已经拖延了一段时间的重要任务。记得工作之余给自己一个短暂的休息，即使是最坚固的山峰也需要沐浴在阳光下。今天幸运色为棕色，一杯优质的咖啡或茶是你下午最好的伴侣。', weeklyHoroscope: '本周摩羯座在事业发展上稳健前行，长期坚持和默默耕耘终于开始显现出令人欣慰的成果。周中前后可能收到意外的认可或奖励，你的专业态度和责任感深入人心。财运方面本周是审视长期投资策略和退休理财规划的好时机，你的务实让你能做出明智的判断。感情上星象轻轻提醒你：稍微放松一点会更开心。不要总是把工作放在第一位，留出一些纯粹的时间给爱你的人，你的温柔远比成就更能加深感情的厚度。家庭中长辈的事可能需要你花些时间关照，你的稳重是他们最安心的依靠。健康方面注意骨骼和关节的保养，长时间坐着工作要定时起身活动。周末建议放下工作和手机，去爬一座小山或漫步在自然中，大自然是最好的心灵疗愈师。' },
  { name: 'Aquarius', nameCn: '水瓶座', symbol: '♒', dateRange: '1月20日 — 2月18日', element: '风', rulingPlanet: '天王星', traits: ['独立', '创新', '人道主义', '理性'], compatible: ['双子座', '天秤座', '射手座'], dailyHoroscope: '今天你的创新思维异常活跃，脑中充满了突破常规的新奇想法。适合参加头脑风暴、讨论前瞻性话题或探索新科技，不要害怕与众不同，你的独特视角正是今天的最大价值。社交方面，一个偶然的线上互动可能带来有趣的连接。今天幸运色为蓝色，在人群中保持你的独立思考是最迷人的态度。', weeklyHoroscope: '本周水瓶座的社交圈将有令人兴奋的新变化和拓展。可能结识到志同道合的新朋友或加入一个让你充满热情的社群团体，这些人将在未来给你带来重要的启发和支持。工作上你的创新想法终于得到了团队和上级的认真对待，本周是推进你那"不按常理出牌"的计划的好时机。财运方面群体活动和团队项目中可能蕴含不错的机会，但需注意与朋友间的金钱往来要清楚明确。感情方面独立和自由是你最珍视的东西，但真正的亲密也值得你打开一小扇门，即使只是分享一个最近的心情。健康方面关注循环系统和脚踝的护理，本周适合游泳或水中运动来放松身心。周末尝试一件你从未做过的事——无论是学一个新技能还是去一个之前不敢去的地方，突破舒适区的体验会让你感到生而为人的自由。' },
  { name: 'Pisces', nameCn: '双鱼座', symbol: '♓', dateRange: '2月19日 — 3月20日', element: '水', rulingPlanet: '海王星', traits: ['浪漫', '富有同情心', '艺术天赋', '直觉敏锐'], compatible: ['巨蟹座', '天蝎座', '摩羯座'], dailyHoroscope: '今天你的想象力和直觉达到了一个美丽的高峰，内心世界比外部世界更加丰富而生动。适合做艺术创作、沉浸在音乐中、或仅仅是安静地做一场白日梦——这些都是滋养你灵魂的方式。注意不要因为过度敏感而误解他人的无心之言。今天幸运色为海蓝色，靠近水的地方会给你带来内心的平静和灵感。', weeklyHoroscope: '本周双鱼座的灵感和创造力如同潮水般丰沛涌动，是艺术创作和情感表达的黄金时期。梦境可能变得异常生动且富有深意，建议在床头放一个本子记录梦中的意象，它们可能包含着你潜意识深处的智慧指引。工作上你的同理心和创造力是团队宝贵的财富，适合从事需要美感和人文关怀的项目。财运方面直觉是你的好帮手，但做重大决策时还是需要结合理性的分析和数据。感情方面与伴侣的灵魂连接更加深入，一次深夜的真诚对话可能让你们的关系实现质的飞跃；单身双鱼本周的吸引力神秘而迷人，可能在艺术场合或慈善活动中遇到让你心动的人。健康方面注意足部护理和淋巴循环，泡一个舒服的热水澡可以洗净一周的疲惫。周末适合放空自己——也许是在湖边坐一个下午，也许是画一幅画或写一首诗，让创造力自然流淌。' },
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
