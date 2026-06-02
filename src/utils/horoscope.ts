/**
 * Western astrology (Horoscope) calculator.
 * Determines sun sign from birth date, generates daily horoscopes,
 * and checks sign compatibility.
 */
import type { HoroscopeSign } from '@/types'
import { HOROSCOPE_SIGNS, HOROSCOPE_DATE_RANGES } from '@/data/horoscope/signs'

/**
 * Get the horoscope (sun) sign from a birth month and day.
 *
 * Standard tropical zodiac date ranges:
 * Aries: 3/21 - 4/19
 * Taurus: 4/20 - 5/20
 * Gemini: 5/21 - 6/21
 * Cancer: 6/22 - 7/22
 * Leo: 7/23 - 8/22
 * Virgo: 8/23 - 9/22
 * Libra: 9/23 - 10/23
 * Scorpio: 10/24 - 11/22
 * Sagittarius: 11/23 - 12/21
 * Capricorn: 12/22 - 1/19
 * Aquarius: 1/20 - 2/18
 * Pisces: 2/19 - 3/20
 *
 * @param month - Month (1-12)
 * @param day - Day of month (1-31)
 * @returns The matching HoroscopeSign or undefined if invalid date
 */
export function getHoroscopeByDate(month: number, day: number): HoroscopeSign | undefined {
  // Validate input
  if (month < 1 || month > 12) {
    return undefined
  }
  if (day < 1 || day > 31) {
    return undefined
  }

  // Check each date range
  for (const range of HOROSCOPE_DATE_RANGES) {
    // Handle cross-year boundary (Capricorn: 12/22 - 1/19)
    if (range.startMonth > range.endMonth) {
      // Crosses year boundary (e.g., 12/22 - 1/19)
      if (
        (month === range.startMonth && day >= range.startDay) ||
        (month === range.endMonth && day <= range.endDay)
      ) {
        return HOROSCOPE_SIGNS.find((s) => s.name === range.name)
      }
      // Also handle month between them (January is after December for Capricorn)
      if (month > range.startMonth || month < range.endMonth) {
        return HOROSCOPE_SIGNS.find((s) => s.name === range.name)
      }
    } else {
      // Normal range within same year
      if (
        (month === range.startMonth && day >= range.startDay) ||
        (month === range.endMonth && day <= range.endDay) ||
        (month > range.startMonth && month < range.endMonth)
      ) {
        return HOROSCOPE_SIGNS.find((s) => s.name === range.name)
      }
    }
  }

  return undefined
}

/**
 * Pre-built daily horoscope variation templates for each sign.
 * When getDailyHoroscope is called, it randomly selects one variant
 * and personalizes it with the current date.
 */
const DAILY_HOROSCOPE_VARIANTS: Record<string, string[]> = {
  'Aries': [
    '今天火星带给你充沛的活力，适合开始新项目。工作上主动出击会取得意外收获。感情方面保持热情但不要太过强势。幸运颜色：红色。',
    '今天能量集中，适合解决积压已久的问题。你的决断力会帮助你在团队中脱颖而出。注意不要忽视身边人的感受。财运小吉。',
    '创造力爆棚的一天！勇敢表达你的想法，会得到意想不到的支持。健康方面适合运动，让身体充满活力。',
  ],
  'Taurus': [
    '金星守护着你，今天适合享受生活的美好。工作上稳扎稳打，你的耐心会有回报。财运稳定，可能有小收入进账。',
    '今天宜守不宜攻。保持现有的节奏，不要被外界打乱。感情上适合安静的相处方式。美食能给你带来好心情。',
    '务实的一天，适合处理财务和具体事务。你的可靠性会让身边人更信任你。晚上适合给自己一些小奖励。',
  ],
  'Gemini': [
    '水星带给你灵活的思维，今天适合沟通和学习。可能会有意外的消息或访客。注意不要一心多用，专注最重要的事。',
    '社交运旺盛的一天！你会有机会结识新朋友或收到有趣的邀约。工作上头脑风暴特别有效。注意保护嗓子。',
    '今天好奇心会引导你发现新的兴趣点。多和不同的人交流，灵感会在对话中迸发。避免做太大的承诺。',
  ],
  'Cancer': [
    '月亮的力量让你今天特别敏感和细腻。适合处理家庭事务和情感关系。直觉会非常准确，相信你的第六感。',
    '今天适合待在自己舒适的区域。你的温柔会治愈身边的人。晚上适合泡个热水澡放松身心。',
    '情感丰富的一天。适合表达你对家人和朋友的爱。工作上注意保护自己的边界，不要被情绪消耗太多。',
  ],
  'Leo': [
    '太阳的光辉照耀着你，今天你就是主角！工作上会有展示自己的机会，充满自信地去做吧。感情上你的魅力无人能挡。',
    '今天特别有创造力和表现欲。适合发表演讲、演出或展示你的才华。注意不要太过自我中心，多关心团队。',
    '自信满满的一天，你的领导气质会自然吸引追随者。适合推动重要事项，推进率极高。财运佳。',
  ],
  'Virgo': [
    '水星帮你保持清晰的头脑，今天适合处理细节和整理事务。你的专业能力会得到认可。健康方面关注作息规律。',
    '今天是整理和优化的一天。无论是工作流程还是生活空间，都能通过你的巧手变得井井有条。注意适当放松标准。',
    '你的洞察力特别敏锐，适合分析复杂问题和制定计划。在工作中能帮助同事发现问题。注意不要过度批评。',
  ],
  'Libra': [
    '金星带给你和谐的能量，今天适合社交和建立关系。工作上的谈判和协调会特别顺利。魅力值爆表的一天。',
    '今天适合处理需要美感和平衡的事务。你的审美和公正感会赢得大家的好评。人际关系有新进展。',
    '社交活跃的一天！聚会、约会或商务社交都会有愉快的体验。注意在做选择时相信自己的第一直觉。',
  ],
  'Scorpio': [
    '冥王星的力量让你今天特别深刻和有洞察力。适合深入研究和挖掘真相。直觉异常准确，相信你的判断。',
    '今天你的直觉非常强大。适合处理需要深度思考的问题。感情上深入的交流会让关系更进一步。',
    '能量神秘而强烈的一天。适合独处和反思，你会对某些事情有全新的理解。避免卷入他人的权力游戏中。',
  ],
  'Sagittarius': [
    '木星给你带来幸运和乐观的能量。今天适合学习新知识和探索未知领域。可能有旅行或远方的消息。',
    '今天是充满希望和可能性的一天。保持开放的心态，机遇就藏在转角处。幽默感是你最好的社交工具。',
    '冒险精神在召唤你！今天适合跨出舒适区去尝试新事物。你的热情会感染身边的人。注意平衡理想与现实。',
  ],
  'Capricorn': [
    '土星带给你坚韧和自律的力量。今天适合制定长远计划和处理重要事务。坚持就会有收获。财运稳定上升。',
    '今天是高效率的一天。你的自律和专注会帮助你完成重要任务。在职场中表现出色，容易被上司注意到。',
    '务实而坚定的一天。适合处理需要耐心和毅力的事务。虽然可能有些辛苦，但每份努力都会积累成未来的成功。',
  ],
  'Aquarius': [
    '天王星带给你创新的思维。今天可能会有灵光一现的想法，记录下来！社交圈有新的变化，认识有趣的人。',
    '今天你的思维特别活跃和前卫。适合探索新科技、新理念或参加社群活动。保持独立精神但不要孤立自己。',
    '灵感涌动的一天！你的独特视角会为解决难题带来新思路。朋友需要你的建议时，慷慨分享。',
  ],
  'Pisces': [
    '海王星带给你梦幻和灵感。今天适合艺术创作和冥想。你的同情心和直觉会非常敏锐。注意保持边界感。',
    '今天是充满灵感和温柔的一天。适合听音乐、绘画或写日记。你的敏感能细腻地感知他人的情绪。',
    '灵性充实的一天。适合独处思考和感受内心世界。你的直觉会引导你走向正确的方向。注意保持脚踏实地的习惯。',
  ],
}

/**
 * Get a daily horoscope for a given sign.
 * Randomly selects one of the pre-built daily horoscope templates
 * and adds a date stamp for personalization.
 *
 * @param sign - The horoscope sign to get the daily horoscope for
 * @returns A string containing the daily horoscope reading
 */
export function getDailyHoroscope(sign: HoroscopeSign): string {
  const variants = DAILY_HOROSCOPE_VARIANTS[sign.name]

  if (!variants || variants.length === 0) {
    // Fallback generic horoscope
    return sign.dailyHoroscope
  }

  // Pick a random variant
  const index = Math.floor(Math.random() * variants.length)
  const today = new Date()
  const dateString = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`

  return `【${sign.nameCn}今日运势 - ${dateString}】\n${variants[index]}`
}

/**
 * Check compatibility between two horoscope signs.
 * Returns a detailed Chinese compatibility reading.
 *
 * @param sign1 - First horoscope sign
 * @param sign2 - Second horoscope sign
 * @returns A description of their compatibility
 */
export function getCompatibility(sign1: HoroscopeSign, sign2: HoroscopeSign): string {
  if (!sign1 || !sign2) {
    return '请提供有效的星座信息。'
  }

  // Check if they are compatible based on sign1's compatible list
  const isCompatible = sign1.compatible.includes(sign2.nameCn)
  const isSign2Compatible = sign2.compatible.includes(sign1.nameCn)

  // Check element matching
  const fireSigns = ['白羊座', '狮子座', '射手座']
  const earthSigns = ['金牛座', '处女座', '摩羯座']
  const airSigns = ['双子座', '天秤座', '水瓶座']
  const waterSigns = ['巨蟹座', '天蝎座', '双鱼座']

  const sign1Element = fireSigns.includes(sign1.nameCn) ? '火' :
    earthSigns.includes(sign1.nameCn) ? '土' :
    airSigns.includes(sign1.nameCn) ? '风' :
    waterSigns.includes(sign1.nameCn) ? '水' : ''

  const sign2Element = fireSigns.includes(sign2.nameCn) ? '火' :
    earthSigns.includes(sign2.nameCn) ? '土' :
    airSigns.includes(sign2.nameCn) ? '风' :
    waterSigns.includes(sign2.nameCn) ? '水' : ''

  const elementCompatible: Record<string, string[]> = {
    '火': ['风', '火'],
    '土': ['水', '土'],
    '风': ['火', '风'],
    '水': ['土', '水'],
  }

  const elementsMatch = sign1Element && sign2Element &&
    elementCompatible[sign1Element]?.includes(sign2Element)

  // Build compatibility result
  let result = `${sign1.nameCn}与${sign2.nameCn}的配对分析：\n\n`

  if (isCompatible && isSign2Compatible) {
    result += '你们是天生一对！双方都在对方的兼容星座列表中。'
    result += `同属${sign1Element}象星座，有共同的价值观和相处方式。`
    result += '这种组合拥有很高的默契度，值得好好珍惜。'
  } else if (isCompatible) {
    result += `${sign2.nameCn}在${sign1.nameCn}的相配星座列表中。`
    result += '这个组合有不错的潜力，但需要双方多沟通和理解。'
    if (elementsMatch) {
      result += '好在你们拥有相合的元素属性，这会在相处中加分不少。'
    }
  } else if (isSign2Compatible) {
    result += `${sign1.nameCn}在${sign2.nameCn}的相配星座列表中。`
    result += '虽然需要一些磨合，但你们的组合本质上是有潜力的。'
  } else if (elementsMatch) {
    result += '虽然你们不在各自的第一选择中，但元素的相合让你们的相处还是很舒适的。'
    result += '彼此包容和理解会让关系更长久。'
  } else {
    result += '你们的星座组合比较特殊，可能需要更多的耐心和理解。'
    result += '但这不代表没有可能——在占星学中，完整的星盘比太阳星座更重要。'
    result += '建议多方面了解彼此，真心的付出比星座速配更重要。'
  }

  // Add element insight
  if (sign1Element && sign2Element) {
    result += `\n\n${sign1.nameCn}属${sign1Element}象，${sign2.nameCn}属${sign2Element}象。`
  }

  return result
}

/**
 * Get a horoscope sign by its English name.
 */
export function getHoroscopeByName(name: string): HoroscopeSign | undefined {
  return HOROSCOPE_SIGNS.find((s) => s.name === name)
}

/**
 * Get all 12 horoscope signs.
 */
export function getAllHoroscopeSigns(): HoroscopeSign[] {
  return HOROSCOPE_SIGNS
}
