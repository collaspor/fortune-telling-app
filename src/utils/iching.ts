/**
 * I Ching (易经) divination engine using the three-coin method.
 * Simulates coin tosses to generate hexagrams and interprets them.
 */
import type { IChingLine, IChingResult, Hexagram } from '@/types'
import { hexagrams as HEXAGRAMS } from '@/data/iching/hexagrams'

/**
 * Map of trigram values to their names.
 * Each trigram is represented by 3 bits: 1=yang (solid), 0=yin (broken).
 * top bit = line 1 (bottom), middle bit = line 2, bottom bit = line 3 (top)
 */
const TRIGRAMS: Record<number, string> = {
  0b111: '乾', // ☰ Heaven
  0b000: '坤', // ☷ Earth
  0b100: '震', // ☳ Thunder
  0b010: '坎', // ☵ Water
  0b001: '艮', // ☶ Mountain
  0b110: '巽', // ☴ Wind
  0b101: '離', // ☲ Fire
  0b011: '兌', // ☱ Lake
}

/**
 * Build a hexagram number from 6 lines (yang=1, yin=0, bottom line first).
 * The hexagram number is computed by combining the lower and upper trigrams.
 */
function buildHexagramNumber(lines: number[]): number {
  // Lower trigram: lines 1,2,3; Upper trigram: lines 4,5,6
  const lowerTrigram = (lines[0] << 2) | (lines[1] << 1) | lines[2]
  const upperTrigram = (lines[3] << 2) | (lines[4] << 1) | lines[5]

  // Find hexagram number by matching trigram pair
  // Hexagram table: upper trigram as row, lower trigram as column
  // The standard ordering (King Wen sequence) maps trigram pairs to numbers 1-64
  const HEXAGRAM_TABLE: number[][] = [
    // Lower: 乾(7) 兌(3) 離(5) 震(4) 巽(6) 坎(2) 艮(1) 坤(0)
    [1, 43, 14, 34, 9, 5, 26, 11],   // Upper: 乾(7)
    [10, 58, 38, 54, 61, 60, 41, 19], // Upper: 兌(3)
    [13, 49, 30, 55, 37, 63, 22, 36], // Upper: 離(5)
    [25, 17, 21, 51, 42, 3, 27, 24],  // Upper: 震(4)
    [44, 28, 50, 32, 57, 48, 18, 46],  // Upper: 巽(6)
    [6, 47, 64, 40, 59, 29, 4, 7],     // Upper: 坎(2)
    [33, 31, 56, 62, 53, 39, 52, 15],  // Upper: 艮(1)
    [12, 45, 35, 16, 20, 8, 23, 2],    // Upper: 坤(0)
  ]

  // Map trigram values to column/row indices
  const trigramToIndex: Record<number, number> = {
    0b111: 0, // 乾
    0b011: 1, // 兌
    0b101: 2, // 離
    0b100: 3, // 震
    0b110: 4, // 巽
    0b010: 5, // 坎
    0b001: 6, // 艮
    0b000: 7, // 坤
  }

  const col = trigramToIndex[lowerTrigram]
  const row = trigramToIndex[upperTrigram]

  if (col !== undefined && row !== undefined) {
    return HEXAGRAM_TABLE[row][col]
  }

  // Fallback: compute from trigram values
  return (upperTrigram * 8 + lowerTrigram) % 64 + 1
}

/**
 * Look up a hexagram by its number (1-64).
 */
export function lookupHexagram(number: number): Hexagram | undefined {
  return HEXAGRAMS.find((h) => h.number === number)
}

/**
 * Cast a hexagram using the three-coin method.
 *
 * The three-coin method simulates tossing three coins six times
 * (once for each line, from bottom to top, positions 1-6).
 *
 * Coin values:
 * - Yang (head) = 3
 * - Yin (tail) = 2
 *
 * Line types:
 * - 3 heads (9) = 老阳 (changing yang → yin)
 * - 3 tails (6) = 老阴 (changing yin → yang)
 * - 2 heads + 1 tail (8) = 少阳 (stable yang)
 * - 2 tails + 1 head (7) = 少阴 (stable yin)
 *
 * @param question - Optional question asked by the user
 * @returns The primary hexagram, transformed hexagram (if any), and line details
 */
export function castHexagram(question?: string): IChingResult {
  const lines: IChingLine[] = []
  const primaryLines: number[] = [] // 1=yang, 0=yin (bottom to top, positions 1-6)
  const transformedLines: number[] = [] // After changing lines are flipped

  // Cast 6 lines, from bottom (position 1) to top (position 6)
  for (let position = 1; position <= 6; position++) {
    // Simulate tossing 3 coins: each coin is randomly heads (yang=3) or tails (yin=2)
    const coin1 = Math.random() < 0.5 ? 3 : 2
    const coin2 = Math.random() < 0.5 ? 3 : 2
    const coin3 = Math.random() < 0.5 ? 3 : 2
    const total = coin1 + coin2 + coin3

    let type: IChingLine['type']
    let changing: boolean
    let lineValue: number // 1=yang, 0=yin

    switch (total) {
      case 9: // 3 heads = 老阳
        type = '老阳'
        changing = true
        lineValue = 1
        break
      case 6: // 3 tails = 老阴
        type = '老阴'
        changing = true
        lineValue = 0
        break
      case 8: // 2 heads + 1 tail = 少阳
        type = '少阳'
        changing = false
        lineValue = 0
        break
      case 7: // 2 tails + 1 head = 少阴
        type = '少阴'
        changing = false
        lineValue = 1
        break
      default:
        type = '少阳'
        changing = false
        lineValue = 0
    }

    lines.push({ position, type, changing })
    primaryLines.push(lineValue)
    // For transformed hexagram: flip changing lines
    transformedLines.push(changing ? (lineValue === 1 ? 0 : 1) : lineValue)
  }

  // Build primary hexagram number and look up data
  const primaryNumber = buildHexagramNumber(primaryLines)
  const primaryHexagram = lookupHexagram(primaryNumber)

  // Check if any lines are changing
  const hasChangingLines = lines.some((l) => l.changing)

  let transformedHexagram: Hexagram | null = null
  if (hasChangingLines) {
    const transformedNumber = buildHexagramNumber(transformedLines)
    transformedHexagram = lookupHexagram(transformedNumber) || null
  }

  // If primary hexagram lookup failed, create a basic placeholder
  const primaryResult: Hexagram = primaryHexagram || {
    number: primaryNumber,
    name: `第${primaryNumber}卦`,
    symbol: getHexagramSymbol(primaryLines),
    judgment: '此卦象需结合具体问题解读。',
    image: '天行健，君子以自强不息。',
    lines: lines.map((l) => `${l.type}之爻`),
  }

  const result: IChingResult = {
    primaryHexagram: primaryResult,
    transformedHexagram,
    lines,
    question,
  }

  return result
}

/**
 * Generate a Unicode hexagram symbol from 6 lines.
 * Each line produces a unicode character:
 * - Yang line: ⚊ (U+268A)
 * - Yin line: ⚋ (U+268B)
 * But the actual hexagram symbols are single Unicode characters.
 * For simplicity, we build a visual representation.
 */
function getHexagramSymbol(lines: number[]): string {
  // Build visual representation: bottom (line 1) to top (line 6)
  const lineChars = lines.map((v) => (v === 1 ? '━━━' : '━ ━'))
  return lineChars.join('\n') // bottom to top
}
