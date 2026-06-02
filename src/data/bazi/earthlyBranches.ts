export interface EarthlyBranch {
  name: string;
  pinyin: string;
  element: string;
  yinYang: '阳' | '阴';
  animal: string;
  animalName: string;
  hour: string;
  hourRange: string;
  month: string;
  monthRange: string;
  direction: string;
  season: string;
  hiddenStems: string[];
  characteristic: string;
}

export const earthlyBranches: EarthlyBranch[] = [
  {
    name: '子',
    pinyin: 'zǐ',
    element: '水',
    yinYang: '阳',
    animal: '鼠',
    animalName: 'Rat',
    hour: '子时',
    hourRange: '23:00 - 01:00',
    month: '十一月',
    monthRange: '大雪至小寒',
    direction: '北',
    season: '冬',
    hiddenStems: ['癸'],
    characteristic: '子水为至阴之水，代表深夜中最寒冷纯净的水源。子水藏癸，为旺盛的阳水之源。命中子水旺者往往聪明机变，思维敏锐如水银泻地，善解人意但心思缜密。'
  },
  {
    name: '丑',
    pinyin: 'chǒu',
    element: '土',
    yinYang: '阴',
    animal: '牛',
    animalName: 'Ox',
    hour: '丑时',
    hourRange: '01:00 - 03:00',
    month: '十二月',
    monthRange: '小雪至大寒',
    direction: '东北',
    season: '冬',
    hiddenStems: ['己', '癸', '辛'],
    characteristic: '丑土为湿土，内藏己癸辛三气，性质寒冷湿润。丑为金库五行属土但有金水之气。命中丑土旺者脚踏实地、任劳任怨，表面木讷其实内心细腻，善于储存和积累。'
  },
  {
    name: '寅',
    pinyin: 'yín',
    element: '木',
    yinYang: '阳',
    animal: '虎',
    animalName: 'Tiger',
    hour: '寅时',
    hourRange: '03:00 - 05:00',
    month: '正月',
    monthRange: '立春至惊蛰',
    direction: '东北',
    season: '春',
    hiddenStems: ['甲', '丙', '戊'],
    characteristic: '寅木为初春之阳木，内藏甲丙戊，兼具木火土三气。寅为火之长生之地，木火相生活力充沛。命中寅木旺者具有虎一般的勇气和魄力，敢作敢当，充满开拓进取的精神。'
  },
  {
    name: '卯',
    pinyin: 'mǎo',
    element: '木',
    yinYang: '阴',
    animal: '兔',
    animalName: 'Rabbit',
    hour: '卯时',
    hourRange: '05:00 - 07:00',
    month: '二月',
    monthRange: '春分至清明',
    direction: '东',
    season: '春',
    hiddenStems: ['乙'],
    characteristic: '卯木为仲春之阴木，藏乙木专气，是花草最茂盛生长的时节。卯月桃花盛开，故卯又名咸池桃花。命中卯木旺者温文尔雅，外表温和似兔却内心坚定，富有审美与艺术才华。'
  },
  {
    name: '辰',
    pinyin: 'chén',
    element: '土',
    yinYang: '阳',
    animal: '龙',
    animalName: 'Dragon',
    hour: '辰时',
    hourRange: '07:00 - 09:00',
    month: '三月',
    monthRange: '清明至立夏',
    direction: '东南',
    season: '春',
    hiddenStems: ['乙', '戊', '癸'],
    characteristic: '辰土为水库，内藏乙戊癸三气，是水之墓库。辰为湿土能生金蓄水。命中辰土旺者气度不凡如龙，胸怀大志，具有很强的包容心和组织能力，但有时也因思虑过深而行事纠结。'
  },
  {
    name: '巳',
    pinyin: 'sì',
    element: '火',
    yinYang: '阴',
    animal: '蛇',
    animalName: 'Snake',
    hour: '巳时',
    hourRange: '09:00 - 11:00',
    month: '四月',
    monthRange: '立夏至芒种',
    direction: '东南',
    season: '夏',
    hiddenStems: ['丙', '戊', '庚'],
    characteristic: '巳火为初夏之阳火，内藏丙戊庚，是金之长生地。巳中戊土燥热，丙火旺盛，庚金得长生。命中巳火旺者心智过人如灵蛇，洞察世事，善于变通谋略，具有独特的智慧和魅力。'
  },
  {
    name: '午',
    pinyin: 'wǔ',
    element: '火',
    yinYang: '阴',
    animal: '马',
    animalName: 'Horse',
    hour: '午时',
    hourRange: '11:00 - 13:00',
    month: '五月',
    monthRange: '芒种至小暑',
    direction: '南',
    season: '夏',
    hiddenStems: ['丁', '己'],
    characteristic: '午火为旺极之火，内藏丁己，是火之帝旺极盛之位。午为至阳之地，火气最旺。命中午火旺者热情奔放、活力四射如骏马奔腾，积极向上，善于带动气氛但也容易急躁冲动。'
  },
  {
    name: '未',
    pinyin: 'wèi',
    element: '土',
    yinYang: '阴',
    animal: '羊',
    animalName: 'Goat',
    hour: '未时',
    hourRange: '13:00 - 15:00',
    month: '六月',
    monthRange: '小暑至立秋',
    direction: '西南',
    season: '夏',
    hiddenStems: ['己', '丁', '乙'],
    characteristic: '未土为木库，内藏己丁乙，是燥热之土。未为花园之土，万物结果时节。命中未土旺者温良和善如羊，内心炽热，重家庭重感情，具有天然的艺术与审美素养。'
  },
  {
    name: '申',
    pinyin: 'shēn',
    element: '金',
    yinYang: '阳',
    animal: '猴',
    animalName: 'Monkey',
    hour: '申时',
    hourRange: '15:00 - 17:00',
    month: '七月',
    monthRange: '立秋至白露',
    direction: '西南',
    season: '秋',
    hiddenStems: ['庚', '壬', '戊'],
    characteristic: '申金为初秋之气，内藏庚壬戊，为水之长生地。申中庚金得禄，壬水长生，戊土为辅。命中申金旺者机智伶俐如灵猴，思维敏捷，善于掌握时机、灵活变通，常为人际网络中的关键节点。'
  },
  {
    name: '酉',
    pinyin: 'yǒu',
    element: '金',
    yinYang: '阴',
    animal: '鸡',
    animalName: 'Rooster',
    hour: '酉时',
    hourRange: '17:00 - 19:00',
    month: '八月',
    monthRange: '白露至寒露',
    direction: '西',
    season: '秋',
    hiddenStems: ['辛'],
    characteristic: '酉金为仲秋之纯金，藏辛金专气，如同精巧的金银细软。酉为金之禄旺位，金气最精最纯。命中酉金旺者精于细节如雄鸡报晓般一丝不苟，自律严格，擅长执行和手工技艺。'
  },
  {
    name: '戌',
    pinyin: 'xū',
    element: '土',
    yinYang: '阳',
    animal: '狗',
    animalName: 'Dog',
    hour: '戌时',
    hourRange: '19:00 - 21:00',
    month: '九月',
    monthRange: '寒露至立冬',
    direction: '西北',
    season: '秋',
    hiddenStems: ['戊', '辛', '丁'],
    characteristic: '戌土为火库，内藏戊辛丁，是燥土含金藏火。戌为晚秋之土，收敛万物。命中戌土旺者忠诚信实如犬，守护心强，坚守规则与底线，但有时过于保守反应迟钝。'
  },
  {
    name: '亥',
    pinyin: 'hài',
    element: '水',
    yinYang: '阴',
    animal: '猪',
    animalName: 'Pig',
    hour: '亥时',
    hourRange: '21:00 - 23:00',
    month: '十月',
    monthRange: '立冬至大雪',
    direction: '西北',
    season: '冬',
    hiddenStems: ['壬', '甲'],
    characteristic: '亥水为初冬之水，内藏壬甲，为木之长生地。亥水蕴含滋养万物的力量，是为生命储备能量的源泉。命中亥水旺者心地纯朴善良如猪，表面憨态可掬实则有深度智慧，乐于享受生活。'
  }
];
