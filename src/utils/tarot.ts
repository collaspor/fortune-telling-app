/**
 * Tarot card drawing engine.
 * Supports Fisher-Yates shuffle and three spread types: single, three-card, and Celtic Cross.
 */
import type { TarotCard, TarotSpread } from '@/types'
import { TAROT_CARDS } from '@/data/tarot/cards'

/**
 * Fisher-Yates (Knuth) shuffle algorithm.
 * Returns a new shuffled array of all 78 tarot cards.
 */
export function shuffleCards(): TarotCard[] {
  const cards = [...TAROT_CARDS]
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

/**
 * Determine if a drawn card is reversed (50% chance).
 */
function getRandomReversed(): boolean {
  return Math.random() < 0.5
}

/**
 * Draw a single card reading.
 * Returns a TarotSpread with one card at the "当下" (present) position.
 */
export function drawSingle(): TarotSpread {
  const shuffled = shuffleCards()
  const card = shuffled[0]
  const reversed = getRandomReversed()

  return {
    type: 'single',
    cards: [
      {
        card,
        position: '当下',
        reversed,
      },
    ],
  }
}

/**
 * Draw a three-card spread representing past, present, and future.
 * Card positions: 过去 (Past), 现在 (Present), 未来 (Future)
 */
export function drawThreeCard(): TarotSpread {
  const shuffled = shuffleCards()
  const cards = [
    {
      card: shuffled[0],
      position: '过去',
      reversed: getRandomReversed(),
    },
    {
      card: shuffled[1],
      position: '现在',
      reversed: getRandomReversed(),
    },
    {
      card: shuffled[2],
      position: '未来',
      reversed: getRandomReversed(),
    },
  ]

  return {
    type: 'three',
    cards,
  }
}

/**
 * Draw a full Celtic Cross spread (10 cards).
 *
 * Celtic Cross positions:
 * 1. 现状 (Present / The Querent) — current situation
 * 2. 阻碍 (Challenge) — what crosses or challenges
 * 3. 根源 (Foundation / Past) — the root or distant past
 * 4. 过去 (Recent Past) — what is passing away
 * 5. 目标 (Crown / Goal) — potential or best outcome
 * 6. 将来 (Near Future) — what is approaching
 * 7. 自我 (The Querent's Attitude) — self-perception
 * 8. 环境 (Environment) — external influences
 * 9. 希望与恐惧 (Hopes and Fears) — inner hopes or fears
 * 10. 结果 (Outcome) — final result
 */
export function drawCelticCross(): TarotSpread {
  const shuffled = shuffleCards()

  const celticCrossPositions = [
    '现状',         // Position 1: Present situation
    '阻碍',         // Position 2: Challenge / crossing
    '根源',         // Position 3: Foundation / distant past
    '过去',         // Position 4: Recent past
    '目标',         // Position 5: Goal / potential
    '将来',         // Position 6: Near future
    '自我',         // Position 7: Self-perception / attitude
    '环境',         // Position 8: Environment / external influences
    '希望与恐惧',   // Position 9: Hopes and fears
    '结果',         // Position 10: Outcome
  ]

  const cards = celticCrossPositions.map((position, index) => ({
    card: shuffled[index],
    position,
    reversed: getRandomReversed(),
  }))

  return {
    type: 'celtic-cross',
    cards,
  }
}
