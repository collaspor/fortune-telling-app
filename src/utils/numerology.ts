/**
 * Numerology calculator based on Pythagorean system.
 * Calculates Life Path, Destiny, Soul Urge, and Personality numbers
 * from a person's name and birth date.
 */
import type { NumerologyResult } from '@/types'

/**
 * Reduce a number to a single digit, preserving master numbers (11, 22, 33).
 * Master numbers are considered spiritually significant and are not reduced further.
 *
 * @param num - The number to reduce
 * @returns The reduced number (preserving 11, 22, 33)
 */
export function reduceToDigit(num: number): number {
  if (num === 11 || num === 22 || num === 33) {
    return num
  }

  while (num > 9) {
    num = String(num)
      .split('')
      .map(Number)
      .reduce((sum, digit) => sum + digit, 0)
  }

  return num
}

/**
 * Convert a letter to its numerology number (A=1, B=2, ..., Z=8).
 * Pythagorean system mapping:
 * 1: A, J, S
 * 2: B, K, T
 * 3: C, L, U
 * 4: D, M, V
 * 5: E, N, W
 * 6: F, O, X
 * 7: G, P, Y
 * 8: H, Q, Z
 * 9: I, R
 */
function letterToNumber(letter: string): number {
  const char = letter.toUpperCase()
  const code = char.charCodeAt(0)

  // A=1, B=2, ..., I=9, J=1, K=2, ..., R=9, S=1, T=2, ..., Z=8
  if (code >= 65 && code <= 90) {
    const position = code - 64 // A=1, B=2, ... Z=26
    return ((position - 1) % 9) + 1
  }

  return 0
}

/**
 * Check if a letter is a vowel (A, E, I, O, U).
 */
function isVowel(letter: string): boolean {
  const vowels = ['A', 'E', 'I', 'O', 'U']
  return vowels.includes(letter.toUpperCase())
}

/**
 * Check if a letter is a consonant.
 */
function isConsonant(letter: string): boolean {
  const upper = letter.toUpperCase()
  const code = upper.charCodeAt(0)
  if (code < 65 || code > 90) return false
  return !isVowel(upper)
}

/**
 * Calculate the Destiny Number (also called Expression Number).
 * Sum all letters in the full name and reduce.
 */
function calculateDestiny(name: string): number {
  let sum = 0
  for (const char of name) {
    const num = letterToNumber(char)
    if (num > 0) {
      sum += num
    }
  }
  return reduceToDigit(sum)
}

/**
 * Calculate the Soul Urge Number (also called Heart's Desire).
 * Sum only the vowels in the full name and reduce.
 */
function calculateSoulUrge(name: string): number {
  let sum = 0
  for (const char of name) {
    if (isVowel(char)) {
      sum += letterToNumber(char)
    }
  }
  return reduceToDigit(sum)
}

/**
 * Calculate the Personality Number.
 * Sum only the consonants in the full name and reduce.
 */
function calculatePersonality(name: string): number {
  let sum = 0
  for (const char of name) {
    if (isConsonant(char)) {
      sum += letterToNumber(char)
    }
  }
  return reduceToDigit(sum)
}

/**
 * Calculate the Life Path Number from a birth date.
 * Sum all digits of the birth date (YYYY-MM-DD or similar format) and reduce.
 *
 * @param birthDate - Birth date string (e.g., "1990-05-15" or "19900515")
 * @returns The life path number
 */
function calculateLifePath(birthDate: string): number {
  // Remove non-numeric characters
  const digits = birthDate.replace(/\D/g, '')

  if (digits.length === 0) {
    return 0
  }

  let sum = 0
  for (const char of digits) {
    sum += parseInt(char, 10)
  }

  return reduceToDigit(sum)
}

/**
 * Numerological interpretations for each number (1-9, 11, 22, 33).
 */
const NUMBER_INTERPRETATIONS: Record<number, string> = {
  1: '领导者——独立、开创、进取。具有强烈的个人主义色彩，是天生的领袖和先锋。适合独立创业和领导岗位。',
  2: '协调者——合作、和谐、敏感。善于调解和建立关系，是最佳的合作者和外交家。在团队中不可或缺的润滑剂。',
  3: '表达者——创意、社交、乐观。富有艺术天赋和表达能力，是天生的表演者和沟通者。快乐的能量来源。',
  4: '建设者——稳定、务实、勤勉。脚踏实地的工作者，重视秩序和纪律。是构建长久事业的中坚力量。',
  5: '自由者——冒险、多变、自由。热爱探索和旅行，追求自由的生活方式。适应力极强，是天生的探险家。',
  6: '守护者——责任、关爱、平衡。强烈的家庭观念和责任心，是天生的照顾者和教导者。追求美的和谐。',
  7: '探索者——智慧、内省、神秘。对真理和知识有着深度的追求。适合研究、哲学和灵性探索的道路。',
  8: '成就者——权力、财富、权威。具有强大的执行力和商业头脑。在物质世界中能取得显著成就。',
  9: '奉献者——博爱、慈悲、完成。具有高度的人道主义精神，愿意为更大的理想而奉献。是智慧的集大成者。',
  11: '启发者——灵性、直觉、启明。拥有高度的直觉力和灵性天赋，是精神领域的引路人。使命是启迪人心。',
  22: '大师建设者——远见、实践、建造。能将宏大梦想化为现实的大师级建设者。兼具理想主义和执行力。',
  33: '大师导师——无私、慈爱、教导。以无私奉献和爱为主导的大师级精神导师。用爱与智慧服务众生。',
}

/**
 * Core numerological meanings for each aspect.
 */
const ASPECT_MEANINGS: Record<string, string> = {
  lifePath: '生命灵数是人生道路的核心指引，揭示了你的天赋使命、人生课题和发展方向。如同你此生的导航图。',
  destiny: '命运数字代表你天生的才能和潜能，反映了你的外在表达方式和人生目标。是你给世界的第一印象。',
  soulUrge: '灵魂渴望数字揭示了你内心深处的渴望和真正动机。了解它会帮助你找到真正的满足和幸福。',
  personality: '个性数字代表你在他人面前的形象，是你呈现给外在世界的面纱。反映了你的社交风格。',
}

/**
 * Generate interpretations for all numerological aspects.
 */
function generateInterpretations(result: Omit<NumerologyResult, 'interpretations'>): Record<string, string> {
  const interpretations: Record<string, string> = {}

  const aspects: Array<{ key: string; value: number; label: string }> = [
    { key: 'lifePath', value: result.lifePath, label: '生命灵数' },
    { key: 'destiny', value: result.destiny, label: '命运数字' },
    { key: 'soulUrge', value: result.soulUrge, label: '灵魂渴望' },
    { key: 'personality', value: result.personality, label: '个性数字' },
  ]

  for (const aspect of aspects) {
    const numberInterpretation = NUMBER_INTERPRETATIONS[aspect.value]
    const aspectMeaning = ASPECT_MEANINGS[aspect.key]

    if (numberInterpretation && aspectMeaning) {
      interpretations[aspect.key] = `【${aspect.label}：${aspect.value}】\n${aspectMeaning}\n\n核心特质：${numberInterpretation}`
    } else if (aspectMeaning) {
      interpretations[aspect.key] = `【${aspect.label}：${aspect.value}】\n${aspectMeaning}`
    } else {
      interpretations[aspect.key] = `【${aspect.label}：${aspect.value}】\n独特的能量组合，蕴含着你的个人密码。`
    }
  }

  return interpretations
}

/**
 * Calculate a complete numerology profile from name and birth date.
 *
 * @param name - Full birth name (can include spaces, e.g., "John Smith")
 * @param birthDate - Birth date string (e.g., "1990-05-15")
 * @returns A complete numerology result with all core numbers and interpretations
 *
 * @throws Will throw if name is empty or birth date has no digits
 */
export function calculateNumerology(name: string, birthDate: string): NumerologyResult {
  // Validate inputs
  if (!name || name.trim().length === 0) {
    throw new Error('名字不能为空，请输入您的姓名。')
  }

  const digits = birthDate.replace(/\D/g, '')
  if (digits.length === 0) {
    throw new Error('生日不能为空，请输入您的出生日期。')
  }

  // Calculate all core numbers
  const lifePath = calculateLifePath(birthDate)
  const destiny = calculateDestiny(name.trim())
  const soulUrge = calculateSoulUrge(name.trim())
  const personality = calculatePersonality(name.trim())

  // Generate interpretations
  const interpretations = generateInterpretations({ lifePath, destiny, soulUrge, personality })

  return {
    lifePath,
    destiny,
    soulUrge,
    personality,
    interpretations,
  }
}

/**
 * Get the interpretation text for a specific number.
 */
export function getNumberInterpretation(num: number): string {
  return NUMBER_INTERPRETATIONS[num] || '独特的数字能量，需要根据具体情境解读。'
}

/**
 * Check if a number is a master number (11, 22, or 33).
 */
export function isMasterNumber(num: number): boolean {
  return num === 11 || num === 22 || num === 33
}
