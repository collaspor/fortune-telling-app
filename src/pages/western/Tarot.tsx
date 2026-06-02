import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/Button'
import LoadingSpinner from '@/components/LoadingSpinner'
import FortuneResult from '@/components/FortuneResult'
import type { TarotCard, TarotSpread } from '@/types'

// 22 Major Arcana cards with full data
const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: 'The Fool', nameCn: '愚者', arcana: 'major', image: '🧑‍🎤', meaning: { upright: '愚者代表着全新的开始和无限的潜能。这张牌预示着一个崭新的旅程即将展开，你需要像孩童一样保持纯真和开放的心态，放下过去的经验和包袱，勇敢地迈出第一步。在爱情方面，暗示一段充满惊喜的新关系正在靠近，或者现有关系将迎来一个全新的阶段，请保持轻松和自然。事业上，这是一个大胆尝试新方向的绝佳时机，创业或转行都会得到宇宙的支持。个人成长方面，愚者邀请你放下对未知的恐惧，相信生命本身的智慧和安排。提醒：保持天真不等于鲁莽，在跳下悬崖之前，至少看清脚下是否有路。', reversed: '逆位的愚者暗示着冲动和不计后果的行为。你可能正急于开始某件事，却没有做好充分的准备，这种莽撞可能会带来不必要的麻烦。在感情中，逆位愚者可能代表一个不愿承诺的人，或者你自己正在逃避一段关系的责任，害怕被束缚。事业上要注意不要同时开启太多项目，缺乏规划和方向会让你最终一事无成。个人成长方面，你需要停下来认真审视自己的动机——是真的在追随内心，还是仅仅在逃避现状？建议在做重大决定之前，听取有经验者的意见，三思而后行。' }, keywords: ['开始', '冒险', '天真', '自由'] },
  { id: 1, name: 'The Magician', nameCn: '魔术师', arcana: 'major', image: '🧙‍♂️', meaning: { upright: '魔术师象征着创造力、技能与意志力的完美结合，你拥有将想法变为现实所需的一切资源和能力。这是行动的最佳时机，宇宙已经将风火水土四大元素都摆在了你的桌面上。在爱情中，你需要主动展现自己的魅力和诚意，单身的你完全有能力吸引到心仪的对象。事业方面，你的专业能力将得到充分展现，适合启动新项目、进行演讲或谈判，你的表现会让所有人刮目相看。个人成长上，这张牌提醒你意识到自己内在的力量——你比自己想象中更有能力。提醒：真正的魔术师知道力量来自专注，分散精力只会让魔法失效。', reversed: '逆位魔术师警示着能力被浪费或滥用的状况。你可能拥有天赋和资源，却缺乏正确的方向或意志力来善用它们。感情中要警惕欺骗和操控，可能有人在利用你的好感，或者你正在用不诚实的方式维护一段关系。事业上可能出现怀才不遇的挫败感，或者你的技能没有用在合适的岗位上，需要重新评估自己的职业方向。个人成长层面，你内心可能有某种恐惧在阻碍你展现真实的才华，是时候直面这种不安了。忠告：与其抱怨怀才不遇，不如审视自己是否真的付出了足够努力。' }, keywords: ['创造', '技能', '自信', '掌控'] },
  { id: 2, name: 'The High Priestess', nameCn: '女祭司', arcana: 'major', image: '🔮', meaning: { upright: '女祭司代表着深邃的直觉、潜意识的智慧和内在的宁静，她告诉你答案不在外面，而在你自己的内心深处。这是一张邀请你向内探索的牌，静坐冥想、倾听内心声音比四处寻求建议更有价值。感情方面，可能有暗恋或被暗恋的情况存在，一段尚未明朗的关系需要你更敏锐地感受其中的信号。事业上暗示着不要急于做决定，等待更多的信息浮出水面，直觉会指引你在正确的时机出手。个人成长中，女祭司鼓励你信任自己的第六感，那是你灵魂与宇宙沟通的秘密通道。忠告：知识的最高形式不是逻辑推理，而是在寂静中领悟到的智慧。', reversed: '逆位女祭司表示你可能正在忽视内心的直觉，过于依赖理性分析而压抑了情感的需求。一些隐藏的秘密即将浮出水面，你可能会发现某些被掩盖的真相。在感情关系中，情感的封闭或冷淡可能导致双方渐行渐远，需要主动打开心扉。事业方面，你可能在忽视一些重要的隐性信息，建议多观察周围人的态度和反应，很多关键线索藏在细节中。个人成长上，你与自己内在智慧的连接暂时断裂了，需要通过独处和反思重新建立这种连接。提醒：不信任自己的直觉，就像关掉了夜航中最亮的导航灯。' }, keywords: ['直觉', '神秘', '智慧', '静默'] },
  { id: 3, name: 'The Empress', nameCn: '女皇', arcana: 'major', image: '👸', meaning: { upright: '女皇是大阿尔卡纳中最丰饶美好的牌之一，代表着创造力、生育力与大自然的丰盛馈赠。这是一个享受生活、感受美好的时期，让感官充分打开，去闻花香、听鸟鸣、感受阳光的温暖。爱情方面预示着关系进入甜蜜丰盛的阶段，是怀孕、结婚或家庭团聚的好时机，单身的你也散发着难以抗拒的吸引力。事业上创造力爆棚，特别适合从事艺术、设计、教育等需要感性投入的工作，你的作品将充满生命力。个人成长中，女皇邀请你学习滋养自己和他人的艺术，明白给予和接受是同一回事。提醒：在照顾他人的同时，别忘了你的丰盛首先来自于对自己的爱。', reversed: '逆位女皇暗示着创造力枯竭或情感上的过度依赖。你可能太过专注于照顾他人而忽略了自己的需求，导致内心空虚和疲惫。感情中可能出现过度保护或控制的问题，你的爱变成了对方的负担，需要学会放手让对方自由呼吸。事业方面，灵感和动力暂时陷入低谷，不适合强行创作或推进，给自己一些休息和充电的时间更为明智。个人成长层面，你需要重新思考"照顾"的真正含义——真正的滋养是让对方成长，而不是让对方依赖。忠告：先把自己的杯子倒满，溢出来的部分才是你可以分享的。' }, keywords: ['丰饶', '母性', '美丽', '滋养'] },
  { id: 4, name: 'The Emperor', nameCn: '皇帝', arcana: 'major', image: '👑', meaning: { upright: '皇帝象征着权威、结构和稳定的力量，代表着用理性和秩序来掌控生活的能力。这是一个需要你展现领导力和担当的时刻，建立规则、制定计划、承担责任将帮助你实现长远目标。感情中暗示着一段稳定而可靠的关系，或者需要一个有担当、成熟的伴侣，真诚的承诺比浪漫的情话更有价值。事业上你可能获得晋升或承担更大的责任，你的组织能力和决策力将得到充分认可。个人成长方面，皇帝提醒你要成为自己生命的主宰，不依赖他人来定义你的人生。提醒：真正的权威来自于自律和智慧，而非强权和压制，以德服人方为长久之道。', reversed: '逆位皇帝警示着权威的滥用或自律的缺乏。你可能正在变得专横或控制欲过强，在人际关系中造成了紧张和反抗。感情中可能问题出在权力争夺上，一方试图控制另一方的生活，导致关系失去平衡和温暖。事业方面，你可能遇到了一个不称职的领导，或者自己正在用错误的方式管理团队。个人成长上，你需要检视自己与权威的关系——是过度依赖权威人物的认可，还是自己正在滥用权力？忠告：铁腕可以让人服从，但只有尊重和公正能赢得人心。' }, keywords: ['权威', '秩序', '领导', '稳定'] },
  { id: 5, name: 'The Hierophant', nameCn: '教皇', arcana: 'major', image: '⛪', meaning: { upright: '教皇代表着传统、信仰体系和精神导师的指引，提醒你有时需要向更有智慧的人寻求建议。这是回归本质、遵循内心准则的时刻，有些古老而恒久的智慧正等待你去发现和践行。感情方面，可能暗示着正式的关系确认、订婚或按照传统方式推进关系，也可能代表一段有精神共鸣的伴侣关系。事业上适合参加培训、考取资格证书或在体制内稳步发展，遵循既定的规则会带来稳定的回报。个人成长中，教皇鼓励你建立自己的精神信仰体系，不一定与宗教有关，而是找到让你内心安定的核心价值。提醒：真正的传统是活的智慧，而非僵化的教条，学会取其精华去其糟粕。', reversed: '逆位教皇代表对传统和权威的反叛，或者被教条主义所束缚。你可能正在质疑长期以来接受的信念和规则，这是必要的觉醒，但不要为了反对而反对。感情中可能出现价值观冲突，双方在生活方式或信仰上的差异成为关系的障碍。事业方面，过于僵化的制度和流程正在扼杀你的创造力，是时候提出革新方案了。个人成长层面，你需要找到属于自己的真理，而不是全盘接受他人灌输的观念。忠告：反叛是为了找到更真实的自己，而不是为了标新立异而迷失方向。' }, keywords: ['传统', '信仰', '指引', '教育'] },
  { id: 6, name: 'The Lovers', nameCn: '恋人', arcana: 'major', image: '💕', meaning: { upright: '恋人牌不仅代表爱情，更象征着重要的选择与灵魂的契合。你面前可能有一个意义重大的抉择，需要追随内心真正的渴望而非外在的期待。在爱情方面，这是一段灵魂层面的深刻连接，真挚的感情将带来双向的成长和幸福，单身者可能遇到生命中的重要之人。事业上可能需要你在两条路径之间做出选择，或与志同道合的伙伴建立重要的合作关系。个人成长中，恋人牌邀请你整合内心的二元对立——理性与感性、物质与精神，找到和谐统一。提醒：真正的选择不是选对或选错，而是选择之后你是否全心全意地投入和担当。', reversed: '逆位恋人暗示着分离、价值观的冲突或错误的选择。一段关系可能正在经历信任危机，双方的核心价值观出现了难以调和的分歧。感情中可能出现第三者介入的情况，或者你正在一段不适合的关系中犹豫不决。事业方面，团队合作出现裂痕，合作伙伴的价值观或目标与你产生了偏离。个人成长上，你可能正面临道德或价值判断上的两难困境，逃避选择只会让问题更加复杂。忠告：不和谐并不意味着关系的终结，但需要双方都有坦诚沟通的勇气和修复意愿。' }, keywords: ['爱情', '选择', '和谐', '关系'] },
  { id: 7, name: 'The Chariot', nameCn: '战车', arcana: 'major', image: '🏇', meaning: { upright: '战车代表着胜利、意志力和克服困难的决定性力量。你正驾驭着对立的力量朝目标前进，坚定的决心是此刻最强大的武器。感情中你可能需要平衡理性与感性的拉扯，或者在两个选择之间做出果断的决定，拖延只会让局面更复杂。事业上是一个高速前进的时期，升职、竞标成功或项目重大突破都在向你招手，全力以赴就会看到胜利的曙光。个人成长方面，战车提醒你最强大的力量来自于自我的掌控——控制情绪、聚焦目标、排除干扰。提醒：战车的速度固然惊人，但也要注意方向是否正确，盲目前进可能南辕北辙。', reversed: '逆位战车警示着失控和方向的迷失。内在的矛盾和冲动正在将你拉向不同的方向，你失去了对局面的掌控。感情中可能充满了争执和权力斗争，双方都不愿意退让，关系陷入拉锯战。事业上计划进展受阻，你可能在错误的方向上用力，或者在关键时刻犹豫不决而错过了最佳时机。个人成长层面，你需要停下来重新审视自己的目标和动机——是真正想要的结果，还是仅仅为了赢？忠告：真正的胜利从来不是征服世界，而是征服自己的冲动和欲望。' }, keywords: ['胜利', '意志', '前进', '征服'] },
  { id: 8, name: 'Strength', nameCn: '力量', arcana: 'major', image: '🦁', meaning: { upright: '力量牌代表的不是肌肉的力量，而是内在的勇气、耐心和以柔克刚的智慧。你拥有驯服内心野兽的能力，用爱和理解而非蛮力来解决眼前的挑战。在爱情中，温柔和包容是化解矛盾的最强力量，对你的伴侣多一点耐心和理解，关系将变得更加深厚。事业上你可能需要以柔性的方式处理棘手的局面，冷静和坚定的态度会让所有人为之折服。个人成长方面，力量牌邀请你接纳自己的全部——包括你的弱点和恐惧，因为在接纳中才能产生真正的力量。提醒：狮子不是被锁链驯服的，而是被信任和爱所感化，对待他人和自己都是如此。', reversed: '逆位力量表示你正在被自我怀疑和恐惧所支配。你可能感觉力不从心，面对挑战时缺乏应有的勇气和信心。感情中可能出现情绪失控的状况，你或伴侣的不安全感正在侵蚀关系的根基。事业方面压力山大，你可能对自己的能力产生了怀疑，或者被工作中的困难吓倒。个人成长上，你内心的"野兽"正在占据上风——可能是愤怒、焦虑或自我批评的声音盖过了理性和自信。忠告：即使在最软弱的时候，你内心仍然有力量的火种，只需要一次深呼吸和一个选择就能重新点燃它。' }, keywords: ['勇气', '力量', '耐心', '包容'] },
  { id: 9, name: 'The Hermit', nameCn: '隐者', arcana: 'major', image: '🧘', meaning: { upright: '隐者呼唤你暂时从喧嚣的世界中抽离，进入内省和独处的阶段，在寂静中找到真正的智慧和方向。这不是孤独，而是一次与自己深度对话的神圣旅程。感情方面，你可能需要一些时间和空间来理清自己对关系的真实感受，独处后的回归往往让感情更加清晰和坚定。事业上适合深度研究和学习，而非忙于社交和表现，沉淀下来的专业能力将在未来发挥巨大的作用。个人成长中，隐者高举的灯不仅照亮自己的路，也将成为他人的指引——你需要在内心找到那盏不灭的灯。提醒：独处是一种能力，但不要让独处变成逃避，修行最终是为了更好地入世。', reversed: '逆位隐者暗示着过度的孤独和社交隔离。你可能在逃避现实中的问题，把自己封闭起来只会让情况变得更糟。感情中可能出现冷战或回避沟通的状况，双方的心墙越筑越高。事业方面，你可能在闭门造车，不愿接受外界的反馈和帮助，导致努力的方向出现偏差。个人成长上，你需要的不是更多的独处，而是重新敞开心扉、连接他人和外部世界。忠告：智者知道何时退隐，也懂得何时回归，真正的智慧要在人与人的互动中才能闪光。' }, keywords: ['内省', '孤独', '智慧', '探索'] },
  { id: 10, name: 'Wheel of Fortune', nameCn: '命运之轮', arcana: 'major', image: '🎡', meaning: { upright: '命运之轮是宇宙变化的象征，预示着你的人生正处在一个关键的转折点，好运和机遇正在向你靠近。命运的齿轮已经开始转动，许多你无法控制的力量正在为你重新排列生活的版图。爱情方面，缘分可能在不经意间降临，顺其自然地跟随命运的安排比强求更有智慧。事业上可能出现意想不到的机遇，保持开放的心态，准备好抓住那个稍纵即逝的机会。个人成长中，命运之轮提醒你一切都是循环——高潮和低谷都是暂时的，保持平常心面对得失。提醒：幸运之神眷顾勇敢的人，当机会来临时不要过度犹豫，果断出击才能把握命运。', reversed: '逆位命运之轮意味着你可能正处在运势的低谷期，好事多磨，计划遭遇意料之外的阻碍。此刻越是强求越是事与愿违，接受暂时的停滞是顺应天道。感情中可能出现分分合合的状况，一段关系在轮回中找不到稳定的节奏。事业上的机遇似乎与你擦肩而过，升职或跳槽的计划暂时看不到进展。个人成长方面，你需要学会在逆境中保持从容，因为轮子终将转回到有利的位置。忠告：低谷时积蓄力量，高峰时保持谦逊，这就是顺应命运之轮的人生智慧。' }, keywords: ['命运', '转折', '机遇', '变化'] },
  { id: 11, name: 'Justice', nameCn: '正义', arcana: 'major', image: '⚖️', meaning: { upright: '正义牌代表着因果法则、公平和真相的显现，你的每一个行动都将得到应有的回报，无论是对过往的奖赏还是纠偏。这是一张提醒你诚实面对自己和他人的牌。在爱情中，公平和互相尊重是关系的基石，一个基于平等和真诚的关系将得到宇宙的祝福。事业方面，法律事务、合同签订或重要决策都会朝着公正的方向发展，你的正直将赢得长远的信任。个人成长中，正义牌邀请你检视自己的因果——你当下的处境，无论是好是坏，都能在过去的选择中找到根源。提醒：天平的刻度从不偏袒任何人，种什么因得什么果，这是宇宙最根本的法则。', reversed: '逆位正义警示着不公、偏见和逃避责任。你可能正在面对不公平的待遇，或者在内心深处逃避自己应尽的义务。感情中可能出现一方付出过多而另一方享受现成的不对等状态，重建平衡是当务之急。事业方面可能遭遇不公正的评判或决策，建议保留证据并寻求正当途径维护权益。个人成长上，你需要诚实地审视自己是否在某件事上不够诚实——对他人的欺骗最终会成为对自己的伤害。忠告：逃避责任只能获得一时的轻松，但内心的天平终将找回平衡，届时付出的代价可能更高。' }, keywords: ['正义', '公平', '真相', '责任'] },
  { id: 12, name: 'The Hanged Man', nameCn: '倒吊人', arcana: 'major', image: '🙃', meaning: { upright: '倒吊人邀请你换一个全新的视角看待世界和当前的困境。有时候最大的智慧不是向前冲，而是停下来、倒过来思考，在看似被动中找到了最佳的角度。感情中你可能需要暂时"悬置"一段关系，给彼此足够的空间去反思和成长，等待比纠缠更有智慧。事业上看似停滞，但实则是重要的酝酿期，利用这段时间深入思考你的职业方向。个人成长层面，倒吊人教导你放下的艺术——放下执念、放下控制、放下"非这样不可"的固执。提醒：倒吊人的表情是安详的，因为他知道悬置不是终点，而是通往更高境界的必经之路。', reversed: '逆位倒吊人表示你在作出无谓的牺牲，或者因为固执己见而拒绝必要的改变。你可能不愿做出本该做出的妥协，导致自己和周围的人都陷入僵局。感情中一方的过度牺牲和讨好并不能换来真正的爱，反而会让关系失去平衡。事业上你可能在坚持一个注定失败的方向，不肯接受现实只会让损失更大。个人成长方面，你需要反思自己坚持不放手的原因——是为了面子，还是为了证明什么？忠告：真正的牺牲是为了更重要的价值，而非为了证明自己有多么能忍受痛苦。' }, keywords: ['牺牲', '等待', '新视角', '放下'] },
  { id: 13, name: 'Death', nameCn: '死神', arcana: 'major', image: '💀', meaning: { upright: '死神牌并不可怕，它代表的是深刻而必要的转变、旧事物的终结以及新生命的开始。正如黎明前的黑暗，某些事物的结束是为了给更美好的事物腾出空间。感情中一段不再适合的关系可能即将结束，或者一种不健康的相处模式需要被彻底埋葬。事业上可能面临工作的变动或职业方向的彻底调整，虽然过程痛苦，却是新生的前奏。个人成长中，死神邀请你彻底放下那些不再服务于你生命成长的人、事、物和信念。提醒：不要抗拒改变，就像落叶不是为了死亡而是化为养料，你生命中某些部分的消逝，恰恰是为了让你绽放出新的姿态。', reversed: '逆位死神揭示了你对改变的抗拒和对过去的执着。紧紧抓住已经腐朽的东西只会延长痛苦，每一次拒绝放手都在消耗你新生的可能。感情中你可能无法接受一段关系的终结，死死纠缠不放，但实际上你只是在延续自己的痛苦。事业上对安全感的过度依赖让你不敢离开不适合的岗位，停滞不前的代价可能比改变更大。个人成长层面，恐惧是你最大的敌人——你害怕未知的空白，却不愿看到空白中蕴含的无限可能。忠告：死亡不是生命的反面，而是生命的一部分。放手不是失败，而是为重生腾出双手。' }, keywords: ['转变', '结束', '重生', '净化'] },
  { id: 14, name: 'Temperance', nameCn: '节制', arcana: 'major', image: '🌊', meaning: { upright: '节制象征着平衡、调和与中庸之道。你需要在两个极端之间找到那一条黄金中道，以温和而持续的方式达成内心的平静与外在的和谐。爱情中暗示着一段成熟而稳定的关系，两个人在给予和索取之间找到了舒适的平衡点。事业方面，你需要在工作与生活之间找到健康的边界，过度投入某一面都会导致整体失衡。个人成长中，节制是一张关于"炼金"的牌——将生命中的矛盾和对立转化为更高层次的和谐与智慧。提醒：节制不是压抑和克制，而是在对立的能量之间建立一条流通的管道，让生命之水源源不断地流动。', reversed: '逆位节制警告着生活正在失去平衡。你可能在某个方面走得太远——过度工作、过度消费、过度情绪化，生活的天平正在严重倾斜。感情中可能出现依赖过重或冷漠疏离两种极端，两者都无法建立健康的亲密关系。事业方面，你可能在无止境地追求完美或成功，却忽略了身体的警告信号和家庭的需求。个人成长上，你需要停下来重新分配自己的精力和时间，找到那个让内心安定的平衡点。忠告：最快的路有时并不是最短的路，走得太快反而需要重新回头，稳扎稳打的节奏才能走得长远。' }, keywords: ['平衡', '调和', '耐心', '中庸'] },
  { id: 15, name: 'The Devil', nameCn: '恶魔', arcana: 'major', image: '😈', meaning: { upright: '恶魔牌提醒你审视那些束缚你的锁链——物质的欲望、不健康的关系、成瘾的习惯或者自我设限的信念。很多时候锁链比你想象的要松，是你自己的恐惧让你不敢挣脱。感情中可能暗示着一段充满占有欲、控制或者纯粹肉体吸引的关系，你需要看清这究竟是爱还是依赖。事业方面，你可能为了金钱和地位出卖了自己的初心和价值观。个人成长层面，恶魔邀请你直面内在的阴暗面——那些你压抑、否认和不愿承认的部分。提醒：恶魔最大的诡计是让你相信你无路可逃，但实际上钥匙就在你自己的手中。', reversed: '逆位恶魔是解脱的象征，你终于意识到那些束缚你的锁链并开始挣脱。一段有毒的关系正在走向终结，你重获了自由和对自己生命的主导权。感情中意味着从一段不健康的关系中觉醒，或者戒掉了一个长期困扰你的情感模式。事业方面，你可能正在跳出功利的思维框架，重新找到工作的意义和热情。个人成长上，这是一个巨大的觉醒时刻——你明白真正的自由不在于外部条件的改变，而在于内心执念的释放。忠告：解脱之后不要急着重蹈覆辙，用这段时间建立健康的边界和自我认知，让自己真正成为自己生命的主人。' }, keywords: ['欲望', '束缚', '阴影', '物质'] },
  { id: 16, name: 'The Tower', nameCn: '高塔', arcana: 'major', image: '🗼', meaning: { upright: '高塔代表着突如其来的剧变和颠覆性的事件，那些建立在虚假地基上的结构正在不可挽回地崩塌。虽然过程令人惊恐和痛苦，但这实际上是宇宙在为你进行一次彻底的大扫除。感情中可能是一次激烈的争吵或真相的爆发，让你看清了一段关系的真面目。事业方面可能是突如其来的裁员、项目失败或公司动荡，让你不得不重新思考职业方向。个人成长上，高塔是觉醒的雷霆——它摧毁的从来不是真实的你，而是你伪装出来的那个虚假自我。提醒：当闪电劈下的时候不要忙着修补废墟，先看看那些倒下的瓦砾中有什么值得带走的真正的宝藏。', reversed: '逆位高塔暗示你正在拼尽全力维持一个即将崩塌的局面。你可能意识到了问题的严重性，却在徒劳地修补裂缝，试图阻止不可避免的改变。感情中你努力维持一段名存实亡的关系，但压抑的问题迟早会以更猛烈的方式爆发。事业方面你可能在一个摇摇欲坠的项目或公司中苦苦支撑，长痛不如短痛。个人成长上，你害怕变化带来的不确定性，但命运已经在敲门，与其被动等待崩塌，不如主动选择改变。忠告：有时候最勇敢的行为不是坚守，而是提前撤离危楼，在更安全的地方重新建造你的城堡。' }, keywords: ['剧变', '觉醒', '崩塌', '启示'] },
  { id: 17, name: 'The Star', nameCn: '星星', arcana: 'major', image: '⭐', meaning: { upright: '星星是大阿尔卡纳中最温柔、最治愈的牌之一，它出现在暴风雨过后，带给你希望、灵感和深深的宁静。宇宙正在以它的方式为你指引方向，你需要做的就是保持信心和开放的心态。爱情中星星是美好的预兆，一段真诚而纯粹的感情正在靠近，或者现有关系进入了一个充满希望的新阶段。事业方面灵感和创造力充沛，适合从事任何需要想象力和美感的项目，你的作品将闪耀着独特的光芒。个人成长上，星星邀请你重新连接内心深处的梦想和渴望，那些被你遗忘在岁月中的初心正在被重新点亮。提醒：星星的光虽然微弱，但它是恒定不变的导航，在迷茫时抬头仰望，你就会找到方向。', reversed: '逆位星星表示你正经历信心危机和灵感的匮乏。你感觉与内心深处的指引失去了连接，对未来充满了迷茫和不安。感情中你可能失去了对爱情的信心和期待，一次次的失望让你不敢再相信美好的可能。事业方面创意枯竭，你对工作的热情在消退，找不到继续前进的动力和意义。个人成长上，你需要给自己一段时间去疗愈——逆位星星不是永恒的黑暗，而是提醒你需要停下来修复内心的创伤。忠告：即使现在看不到星光，也不代表星星不存在，只是暂时被云层遮住了。给自己时间，乌云终将散去。' }, keywords: ['希望', '疗愈', '灵感', '宁静'] },
  { id: 18, name: 'The Moon', nameCn: '月亮', arcana: 'major', image: '🌙', meaning: { upright: '月亮牌代表着潜意识的深处、直觉的指引以及隐藏在表象之下的真实。前方的道路不太明朗，但你的直觉比眼睛看得更远，在这个迷雾重重的时刻，信任你内心的声音比依赖外在的信息更为可靠。感情中可能存在一些不清楚的状况——你或对方的心意尚不明朗，建议不要急于推进，让时间揭开真实的面纱。事业上可能有你不知道的内在运作或办公室政治在影响局势，保持低调和警觉，不要轻易站队。个人成长方面，月亮邀请你潜入自己的潜意识深海，那里有你的恐惧也有你的宝藏。提醒：月光下的影子会放大恐惧，但不要被影子吓倒——它只是光的投影，而非真实的存在。', reversed: '逆位月亮表示迷雾正在逐渐消散，隐藏的真相即将浮出水面。你一直以来的困惑和不安即将得到解答，做好准备面对现实。感情中的暧昧和不明确正在趋于清晰，一段隐藏的关系或被掩盖的情感将显露真容。事业上的不明朗局势将逐步明朗化，你可能终于看清楚谁是真正的盟友谁是隐藏的对手。个人成长方面，你的恐惧正在消退，曾经害怕面对的内心阴影在意识的照耀下反而成为力量的来源。忠告：当真相来临时，无论它是否符合你的期待，勇敢地接受它才能让你继续前行。' }, keywords: ['幻觉', '直觉', '恐惧', '潜意识'] },
  { id: 19, name: 'The Sun', nameCn: '太阳', arcana: 'major', image: '☀️', meaning: { upright: '太阳是大阿尔卡纳中最为光明和积极的牌，它代表着纯粹的幸福、成功和旺盛的生命力，一切都在阳光下清晰而美好。这是一个享受人生、庆祝成果的美妙时刻。爱情中太阳照亮了一切，一段充满温暖和真诚的关系正蓬勃生长，单身者将遇到让你感到如沐春风的人。事业上你的努力和才华将得到充分的认可，成功和成就感充满你的每一天。个人成长方面，太阳鼓励你像孩子一样天真地享受生命的每一刻，回归最简单的快乐——那是你与生俱来的权利。提醒：尽情享受阳光的温暖，但也要记得把这份光明分享给仍在阴霾中的人。', reversed: '逆位太阳表示光明并没有消失，只是暂时被遮住了一部分。成功可能会有一点点延迟，热情可能有一点点减退，但太阳的本质并没有改变。感情中可能经历一段小小的低潮期，或者你的幸福感被一些小事所干扰，但这只是暂时的。事业上的成功比预期来得慢一些，但不必灰心，继续保持正向的努力，结果只是推迟而非取消。个人成长方面，逆位太阳提醒你即使在多云的日子里，太阳依然在云层之上闪耀——你内在的光明从未熄灭。忠告：暂时的阴霾不仅无害，反而让你更加珍惜阳光重现的美好时刻。' }, keywords: ['快乐', '成功', '活力', '光明'] },
  { id: 20, name: 'Judgement', nameCn: '审判', arcana: 'major', image: '📯', meaning: { upright: '审判牌呼唤你听到内心深处的声音，这是觉醒和重生的号角。你正站在人生的重要交叉路口，需要对自己过去的所作所为进行诚实的反思，然后做出关键的生命抉择。爱情中可能意味着旧情复燃或者一段关系的重新定义——你需要判断这段感情是否值得给你第二次机会。事业上可能面临重要的转型或新机会的召唤，你内心深处知道什么是对的，跟随那个声音。个人成长方面，审判邀请你释放过去的遗憾和错误，原谅自己和他人，然后以一个全新的姿态迎接新的人生篇章。提醒：审判的重点不是定罪，而是释放——在彻底清算之后，你可以轻装上阵。', reversed: '逆位审判暗示你正在逃避灵魂的召唤。你拒绝反思过去的错误，不愿面对必须做出的重要决定，逃避只会积压更多的问题。感情中你可能执着于一段已经结束的关系，不愿承认结束的事实，或者拒绝接受对方的改变。事业层面，你可能明知现在的工作不适合自己却不愿意做出改变，或者害怕回应一个新的职业使命。个人成长上，你的内心有一个声音在催促你成长和改变，但你用各种理由和借口来回避它。忠告：你拖延越久，内心的召唤只会越来越响，直到你无法再逃避。' }, keywords: ['觉醒', '召唤', '反思', '重生'] },
  { id: 21, name: 'The World', nameCn: '世界', arcana: 'major', image: '🌍', meaning: { upright: '世界是大阿尔卡纳的终点，也是最圆满的牌，代表着一个重要人生阶段的完美结束和整体性的达成。所有的努力都得到了回报，你感受到与宇宙融为一体的深刻圆满感。爱情中世界预示着一份完整的爱——两个完整的个体共同创造出一个更大的整体，是灵魂伴侣的最高体现。事业方面一个重大项目的圆满完成，或者你到达了职业生涯的一个重要里程碑，值得好好庆祝。个人成长层面，世界邀请你回顾一路走来的旅程，欣赏自己走过的每一步，感受生命本身的完整和美好。提醒：一个旅程的结束意味着另一个旅程的开始，世界既是终点的圆满也是新起点的坐标。', reversed: '逆位世界暗示着距离圆满还差最后一步。你离目标非常接近了，但某个关键的部分还没有到位，需要找到缺失的那一块拼图。感情中一段关系可能接近终点却未能画上句号，双方需要完成最后的沟通或仪式。事业上大功即将告成，但最后的收尾工作需要你投入额外的精力和细心的检查。个人成长方面，你可能急于宣告一个阶段的结束，却忽略了整合和反思的重要性。忠告：不要因为急于求成而跳过最后的步骤，一栋完美的建筑最后也少不了细致的收尾工作。' }, keywords: ['圆满', '完成', '整合', '成功'] },
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
