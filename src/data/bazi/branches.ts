// Earthly Branches (地支) with their Five Elements (五行), animals, and hours
export interface BranchData {
  branch: string
  element: string // main element
  animal: string
  hourRange: string // Chinese hour name
  hourStart: number // 0-23
  hiddenStems: string[] // 藏干
}

export const EARTHLY_BRANCHES: BranchData[] = [
  { branch: '子', element: '水', animal: '鼠', hourRange: '子时', hourStart: 23, hiddenStems: ['癸'] },
  { branch: '丑', element: '土', animal: '牛', hourRange: '丑时', hourStart: 1, hiddenStems: ['己', '癸', '辛'] },
  { branch: '寅', element: '木', animal: '虎', hourRange: '寅时', hourStart: 3, hiddenStems: ['甲', '丙', '戊'] },
  { branch: '卯', element: '木', animal: '兔', hourRange: '卯时', hourStart: 5, hiddenStems: ['乙'] },
  { branch: '辰', element: '土', animal: '龙', hourRange: '辰时', hourStart: 7, hiddenStems: ['戊', '乙', '癸'] },
  { branch: '巳', element: '火', animal: '蛇', hourRange: '巳时', hourStart: 9, hiddenStems: ['丙', '庚', '戊'] },
  { branch: '午', element: '火', animal: '马', hourRange: '午时', hourStart: 11, hiddenStems: ['丁', '己'] },
  { branch: '未', element: '土', animal: '羊', hourRange: '未时', hourStart: 13, hiddenStems: ['己', '丁', '乙'] },
  { branch: '申', element: '金', animal: '猴', hourRange: '申时', hourStart: 15, hiddenStems: ['庚', '壬', '戊'] },
  { branch: '酉', element: '金', animal: '鸡', hourRange: '酉时', hourStart: 17, hiddenStems: ['辛'] },
  { branch: '戌', element: '土', animal: '狗', hourRange: '戌时', hourStart: 19, hiddenStems: ['戊', '辛', '丁'] },
  { branch: '亥', element: '水', animal: '猪', hourRange: '亥时', hourStart: 21, hiddenStems: ['壬', '甲'] },
]

// Map branch character to element
export const BRANCH_ELEMENT: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水',
}

// Map branch character to animal
export const BRANCH_ANIMAL: Record<string, string> = {
  '子': '鼠', '丑': '牛', '寅': '虎', '卯': '兔',
  '辰': '龙', '巳': '蛇', '午': '马', '未': '羊',
  '申': '猴', '酉': '鸡', '戌': '狗', '亥': '猪',
}
