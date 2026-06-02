// Heavenly Stems (天干) with their Five Elements (五行) and Yin/Yang attributes
export interface StemData {
  stem: string
  element: string // 木 火 土 金 水
  yinYang: '阴' | '阳'
}

export const HEAVENLY_STEMS: StemData[] = [
  { stem: '甲', element: '木', yinYang: '阳' },
  { stem: '乙', element: '木', yinYang: '阴' },
  { stem: '丙', element: '火', yinYang: '阳' },
  { stem: '丁', element: '火', yinYang: '阴' },
  { stem: '戊', element: '土', yinYang: '阳' },
  { stem: '己', element: '土', yinYang: '阴' },
  { stem: '庚', element: '金', yinYang: '阳' },
  { stem: '辛', element: '金', yinYang: '阴' },
  { stem: '壬', element: '水', yinYang: '阳' },
  { stem: '癸', element: '水', yinYang: '阴' },
]

// Map stem character to element
export const STEM_ELEMENT: Record<string, string> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
}
