/**
 * Chinese Zodiac (十二生肖) calculator.
 * Determines zodiac animal and element based on birth year.
 */
import type { ZodiacSign } from '@/types'
import { ZODIAC_SIGNS } from '@/data/zodiac/signs'

// Heavenly stems for element calculation
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

// Stem to element mapping
const STEM_ELEMENTS = ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水']

/**
 * Get the zodiac animal based on birth year.
 * Uses year % 12 to determine the animal.
 *
 * Mapping:
 * 0 = 猴 (Monkey), 1 = 鸡 (Rooster), 2 = 狗 (Dog), 3 = 猪 (Pig)
 * 4 = 鼠 (Rat),   5 = 牛 (Ox),    6 = 虎 (Tiger), 7 = 兔 (Rabbit)
 * 8 = 龙 (Dragon), 9 = 蛇 (Snake), 10 = 马 (Horse), 11 = 羊 (Goat)
 */
const ZODIAC_ORDER = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊']

/**
 * Map zodiac Chinese name to the ZodiacSign object.
 */
function getZodiacByName(nameCn: string): ZodiacSign | undefined {
  return ZODIAC_SIGNS.find((z) => z.nameCn === nameCn)
}

/**
 * Get the zodiac sign for a given birth year.
 *
 * @param year - The birth year (e.g., 2000)
 * @returns The matching ZodiacSign or undefined if not found
 */
export function getZodiacByYear(year: number): ZodiacSign | undefined {
  const animalIndex = year % 12
  // Handle negative years (BCE)
  const normalizedIndex = ((animalIndex % 12) + 12) % 12
  const animalName = ZODIAC_ORDER[normalizedIndex]

  const zodiac = getZodiacByName(animalName)
  if (!zodiac) return undefined

  return zodiac
}

/**
 * Get the Five Element (五行) associated with a given year.
 * The element cycles every 10 years following the heavenly stems.
 * Each stem has a yin/yang pair sharing the same element.
 *
 * @param year - The year number
 * @returns The element name in Chinese (木/火/土/金/水)
 */
export function getYearElement(year: number): string {
  const stemIndex = ((year - 4) % 10 + 10) % 10
  return STEM_ELEMENTS[stemIndex]
}

/**
 * Check if two zodiac signs are compatible.
 *
 * @param sign1 - First zodiac sign
 * @param sign2 - Second zodiac sign
 * @returns 'compatible', 'incompatible', or 'neutral'
 */
export function getZodiacCompatibility(
  sign1: ZodiacSign,
  sign2: ZodiacSign
): 'compatible' | 'incompatible' | 'neutral' {
  if (!sign1 || !sign2) return 'neutral'

  // Check if sign2 is in sign1's compatible list
  if (sign1.compatible.includes(sign2.nameCn)) {
    return 'compatible'
  }

  // Check if sign2 is in sign1's incompatible list
  if (sign1.incompatible.includes(sign2.nameCn)) {
    return 'incompatible'
  }

  return 'neutral'
}

/**
 * Get all 12 zodiac signs.
 */
export function getAllZodiacSigns(): ZodiacSign[] {
  return ZODIAC_SIGNS
}

/**
 * Get the astrological stem-branch name for a year.
 * Combines the heavenly stem and earthly branch.
 *
 * @param year - The year number
 * @returns A string like "甲子", "乙丑", etc.
 */
export function getYearStemBranchName(year: number): string {
  const stemIndex = ((year - 4) % 10 + 10) % 10
  const branchIndex = ((year - 4) % 12 + 12) % 12
  const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
  return HEAVENLY_STEMS[stemIndex] + EARTHLY_BRANCHES[branchIndex]
}
