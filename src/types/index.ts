// Shared types for the fortune-telling app

export interface BaZiInput {
  year: number
  month: number
  day: number
  hour: number // 0-23, maps to 时辰
}

export interface Pillar {
  stem: string // 天干
  branch: string // 地支
  element: string // 五行
}

export interface BaZiResult {
  yearPillar: Pillar
  monthPillar: Pillar
  dayPillar: Pillar
  hourPillar: Pillar
  elements: Record<string, number> // 五行 counts
  summary: string
}

export interface IChingLine {
  position: number // 1-6 (bottom to top)
  type: '老阳' | '老阴' | '少阳' | '少阴'
  changing: boolean
}

export interface IChingResult {
  primaryHexagram: Hexagram
  transformedHexagram: Hexagram | null
  lines: IChingLine[]
  question?: string
}

export interface Hexagram {
  number: number
  name: string
  symbol: string // unicode hexagram symbol
  judgment: string
  image: string
  lines: string[]
}

export interface TarotCard {
  id: number
  name: string
  nameCn: string
  arcana: 'major' | 'minor'
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles'
  rank?: string
  image: string // emoji or symbol
  meaning: {
    upright: string
    reversed: string
  }
  keywords: string[]
}

export interface TarotSpread {
  type: 'single' | 'three' | 'celtic-cross'
  cards: Array<{
    card: TarotCard
    position: string
    reversed: boolean
  }>
}

export interface ZodiacSign {
  name: string
  nameCn: string
  animal: string
  years: number[]
  element: string
  traits: string[]
  compatible: string[]
  incompatible: string[]
  fortune: string
}

export interface HoroscopeSign {
  name: string
  nameCn: string
  symbol: string
  dateRange: string
  element: string
  rulingPlanet: string
  traits: string[]
  compatible: string[]
  dailyHoroscope: string
}

export interface NumerologyResult {
  lifePath: number
  destiny: number
  soulUrge: number
  personality: number
  interpretations: Record<string, string>
}

export type FortuneMethod = 'bazi' | 'iching' | 'zodiac' | 'tarot' | 'horoscope' | 'numerology'

export interface FortuneMeta {
  id: FortuneMethod
  name: string
  nameCn: string
  category: 'chinese' | 'western'
  description: string
  icon: string
  path: string
}
