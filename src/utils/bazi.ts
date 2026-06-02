/**
 * BaZi (Eight Characters / Four Pillars of Destiny) calculator.
 * Calculates the four pillars based on birth year, month, day, and hour.
 */
import type { BaZiInput, BaZiResult, Pillar } from '@/types'
import { STEM_ELEMENT } from '@/data/bazi/stems'
import { BRANCH_ELEMENT } from '@/data/bazi/branches'
import {
  getYearStemBranch,
  getMonthStemIndex,
  getMonthBranchIndex,
  getDayStemBranch,
  getHourBranchIndex,
  getHourStemIndex,
  getYearStemIndex,
} from './lunarCalendar'

/**
 * Determine the element of a pillar from its stem.
 * Mapping: 甲乙=木, 丙丁=火, 戊己=土, 庚辛=金, 壬癸=水
 */
function getPillarElement(stem: string): string {
  return STEM_ELEMENT[stem] || '未知'
}

/**
 * Build a single pillar from its stem and branch.
 */
function buildPillar(stem: string, branch: string): Pillar {
  return {
    stem,
    branch,
    element: getPillarElement(stem),
  }
}

/**
 * Count the occurrences of each Five Element across all pillars.
 */
function countElements(pillars: Pillar[]): Record<string, number> {
  const counts: Record<string, number> = {
    '木': 0,
    '火': 0,
    '土': 0,
    '金': 0,
    '水': 0,
  }

  for (const pillar of pillars) {
    // Count stem element
    const stemElem = pillar.element
    if (counts[stemElem] !== undefined) {
      counts[stemElem]++
    }
    // Count branch element
    const branchElem = BRANCH_ELEMENT[pillar.branch]
    if (branchElem && counts[branchElem] !== undefined) {
      counts[branchElem]++
    }
  }

  return counts
}

/**
 * Generate a Chinese summary text based on the element distribution and day master.
 * The day master (日主) is the heavenly stem of the day pillar, representing the self.
 */
function generateSummary(
  dayStem: string,
  elements: Record<string, number>
): string {
  const dayElement = STEM_ELEMENT[dayStem]
  const totalElements = Object.values(elements).reduce((a, b) => a + b, 0)

  // Build a detailed Chinese summary
  const elementNames: Record<string, string> = {
    '木': '木', '火': '火', '土': '土', '金': '金', '水': '水',
  }
  const elementDescriptions: Record<string, string> = {
    '木': '象征生长、仁慈、向上',
    '火': '象征热情、文明、礼仪',
    '土': '象征诚信、稳重、包容',
    '金': '象征义气、果断、变革',
    '水': '象征智慧、灵活、深远',
  }

  // Find dominant element
  let dominantElement = ''
  let maxCount = 0
  for (const [elem, count] of Object.entries(elements)) {
    if (count > maxCount) {
      maxCount = count
      dominantElement = elem
    }
  }

  // Find weakest elements
  const weakElements = Object.entries(elements)
    .filter(([, c]) => c === 0 || c === 1)
    .map(([e]) => e)

  let summary = `命主日主为${dayStem}（${dayElement}命）。`

  // Describe element distribution
  summary += `八字五行分布：`
  const elementParts = Object.entries(elements)
    .filter(([, count]) => count > 0)
    .map(([elem, count]) => `${elem}${count}个`)
  summary += elementParts.join('，') + '。'

  // Dominant element insight
  if (dominantElement) {
    summary += `五行中${dominantElement}最旺，${elementDescriptions[dominantElement] || ''}。`
  }

  // Balance analysis
  if (weakElements.length > 0 && weakElements.length <= 2) {
    summary += `八字中${weakElements.join('和')}偏弱，`
    summary += `建议通过后天补益来平衡五行。`
    summary += `可以在生活中多接触${weakElements.join('和')}相关的颜色、方位和事物。`
  } else if (weakElements.length > 2) {
    summary += `八字五行较为分散，需注意培养专长和方向。`
  } else {
    summary += `八字五行较为平衡，命格中和，人生发展较为顺利。`
  }

  // Day master characterization
  const dayMasterTraits: Record<string, string> = {
    '甲': '甲木参天，性格刚直，有领导才能，如同参天大树。',
    '乙': '乙木柔韧，性格温和，适应力强，如同藤萝花草。',
    '丙': '丙火炎上，性格热情开朗，光明磊落，如同太阳之火。',
    '丁': '丁火柔中，性格细腻温和，内秀有礼，如同灯烛之火。',
    '戊': '戊土厚重，性格诚实稳重，包容力强，如同城墙之土。',
    '己': '己土卑湿，性格温和谦逊，助人为乐，如同田园之土。',
    '庚': '庚金刚健，性格果断刚强，讲义气，如同刀剑之金。',
    '辛': '辛金柔润，性格细腻，追求完美，如同珠玉之金。',
    '壬': '壬水浩荡，性格豁达大度，聪明灵活，如同江河之水。',
    '癸': '癸水至柔，性格沉静内敛，洞察力强，如同雨露之水。',
  }

  if (dayMasterTraits[dayStem]) {
    summary += dayMasterTraits[dayStem]
  }

  return summary
}

/**
 * Calculate the complete BaZi (Four Pillars of Destiny) from birth data.
 *
 * @param input - The birth date and hour
 * @returns The four pillars, element counts, and a Chinese summary
 */
export function calculateBaZi(input: BaZiInput): BaZiResult {
  const { year, month, day, hour } = input

  // Validate inputs
  if (month < 1 || month > 12) {
    throw new Error(`Invalid month: ${month}. Month must be between 1 and 12.`)
  }
  if (day < 1 || day > 31) {
    throw new Error(`Invalid day: ${day}. Day must be between 1 and 31.`)
  }
  if (hour < 0 || hour > 23) {
    throw new Error(`Invalid hour: ${hour}. Hour must be between 0 and 23.`)
  }

  // Year pillar: based on year stem-branch
  // Note: In traditional BaZi, the year pillar changes at the Start of Spring (立春),
  // not at Chinese New Year. For simplicity, we use the calendar year.
  const { stem: yearStem, branch: yearBranch } = getYearStemBranch(year)
  const yearStemIdx = getYearStemIndex(year)

  // Month pillar: based on solar month (节气 based, approximately Gregorian month + 1)
  const monthStemIdx = getMonthStemIndex(yearStemIdx, month)
  const monthBranchIdx = getMonthBranchIndex(month)
  const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
  const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

  const monthStem = HEAVENLY_STEMS[monthStemIdx]
  const monthBranch = EARTHLY_BRANCHES[monthBranchIdx]

  // Day pillar: based on day stem-branch
  const { stem: dayStem, branch: dayBranch } = getDayStemBranch(year, month, day)

  // Hour pillar: based on hour branch and day stem
  const hourBranchIdx = getHourBranchIndex(hour)
  const dayStemIdx = HEAVENLY_STEMS.indexOf(dayStem)
  const hourStemIdx = getHourStemIndex(dayStemIdx, hourBranchIdx)
  const hourStem = HEAVENLY_STEMS[hourStemIdx]
  const hourBranch = EARTHLY_BRANCHES[hourBranchIdx]

  // Build pillars
  const yearPillar = buildPillar(yearStem, yearBranch)
  const monthPillar = buildPillar(monthStem, monthBranch)
  const dayPillar = buildPillar(dayStem, dayBranch)
  const hourPillar = buildPillar(hourStem, hourBranch)

  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar]

  // Count elements
  const elements = countElements(pillars)

  // Generate summary
  const summary = generateSummary(dayStem, elements)

  return {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    elements,
    summary,
  }
}
