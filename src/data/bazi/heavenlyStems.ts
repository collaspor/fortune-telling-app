export interface HeavenlyStem {
  name: string;
  pinyin: string;
  element: string;
  yinYang: '阳' | '阴';
  direction: string;
  season: string;
  color: string;
  organ: string;
  characteristic: string;
}

export const heavenlyStems: HeavenlyStem[] = [
  {
    name: '甲',
    pinyin: 'jiǎ',
    element: '木',
    yinYang: '阳',
    direction: '东',
    season: '春',
    color: '青',
    organ: '胆',
    characteristic: '甲木为阳木，象征参天大树，刚直不阿，有向上生长的强大力量。命中甲木旺者通常性格正直果敢，善于领导和开拓，但有时也显得固执己见。甲木需要庚金的修剪方能成材，喜癸水滋润而不宜过多。'
  },
  {
    name: '乙',
    pinyin: 'yǐ',
    element: '木',
    yinYang: '阴',
    direction: '东',
    season: '春',
    color: '绿',
    organ: '肝',
    characteristic: '乙木为阴木，象征柔韧的花草藤蔓，婉转柔美善于依附和攀爬。命中乙木旺者性情温和灵活，具有很强的适应力和艺术天赋。乙木以丙火为花朵绽放的必要条件，喜癸水滋养，忌辛金克伐过甚。'
  },
  {
    name: '丙',
    pinyin: 'bǐng',
    element: '火',
    yinYang: '阳',
    direction: '南',
    season: '夏',
    color: '赤',
    organ: '小肠',
    characteristic: '丙火为阳火，象征太阳之火，光明正大、热情奔放。命中丙火旺者为人热诚开朗，有领导才能和感染力，如同阳光普照大地。丙火喜壬水来映照光耀，忌癸水阴雨遮蔽，需要适当的木来维持燃烧。'
  },
  {
    name: '丁',
    pinyin: 'dīng',
    element: '火',
    yinYang: '阴',
    direction: '南',
    season: '夏',
    color: '红',
    organ: '心',
    characteristic: '丁火为阴火，象征星烛之火，柔和持久而内敛。命中丁火旺者心思细腻，洞察力强，善于在暗处指引他人。丁火虽不张扬但生命力顽强，喜甲木来引燃，庚金助其光芒。'
  },
  {
    name: '戊',
    pinyin: 'wù',
    element: '土',
    yinYang: '阳',
    direction: '中央',
    season: '长夏',
    color: '黄',
    organ: '胃',
    characteristic: '戊土为阳土，象征城墙高山之土，厚重稳固能承载万物。命中戊土旺者诚实守信，有大局观和担当精神，重情重义。戊土喜甲木梳理以防板结，需要癸水滋润才能孕育生机。'
  },
  {
    name: '己',
    pinyin: 'jǐ',
    element: '土',
    yinYang: '阴',
    direction: '中央',
    season: '长夏',
    color: '黄',
    organ: '脾',
    characteristic: '己土为阴土，象征田园耕作之土，细腻肥沃适合滋养万物。命中己土旺者性情温和包容，善于照顾和管理细节。己土喜丙火温暖土壤以增其生机，需甲木疏松，不可过湿。'
  },
  {
    name: '庚',
    pinyin: 'gēng',
    element: '金',
    yinYang: '阳',
    direction: '西',
    season: '秋',
    color: '白',
    organ: '大肠',
    characteristic: '庚金为阳金，象征刀剑斧钺之金，刚硬锋利，能砍伐断割。命中庚金旺者果断勇敢，有强烈的正义感和执行力，不畏艰难。庚金需丁火淬炼才能成器，喜壬水冲洗以显其光泽，忌过燥断裂。'
  },
  {
    name: '辛',
    pinyin: 'xīn',
    element: '金',
    yinYang: '阴',
    direction: '西',
    season: '秋',
    color: '白',
    organ: '肺',
    characteristic: '辛金为阴金，象征首饰珠玉之金，精致细腻富有光泽。命中辛金旺者追求完美，品味高雅，对细节有着苛刻的要求。辛金喜壬水淘洗以显其光润，需己土润泽以保其洁净，忌厚土掩埋。'
  },
  {
    name: '壬',
    pinyin: 'rén',
    element: '水',
    yinYang: '阳',
    direction: '北',
    season: '冬',
    color: '黑',
    organ: '膀胱',
    characteristic: '壬水为阳水，象征江河湖海之水，奔流不息、气势磅礴。命中壬水旺者胸怀宽广，智慧过人，思维活跃如流水般灵动。壬水喜戊土筑堤引导以成其用，需庚金发源，忌己土污浊阻流。'
  },
  {
    name: '癸',
    pinyin: 'guǐ',
    element: '水',
    yinYang: '阴',
    direction: '北',
    season: '冬',
    color: '黑',
    organ: '肾',
    characteristic: '癸水为阴水，象征雨露甘霖之水，细腻无声、润物潜形。命中癸水旺者直觉敏锐，内心世界丰富深刻，善于潜移默化地影响他人。癸水喜乙木吸纳以发挥其功用，喜辛金生源，忌戊土堵塞。'
  }
];
