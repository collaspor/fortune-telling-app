# 🔮 命理探索 — Fortune Telling

融汇东方智慧与西方神秘学的在线占卜平台，提供六种经典算命方式。

**🌐 在线体验：**[fortune-telling-collaspor.netlify.app](https://fortune-telling-collaspor.netlify.app)

---

## ✨ 功能

### 🏮 中国传统占卜

| 功能 | 说明 |
|------|------|
| **八字算命** | 根据出生年月日时推算四柱八字，分析五行分布与命理解读 |
| **易经占卜** | 三枚铜钱模拟六爻起卦，提供 64 卦本卦与变卦的详细解读 |
| **生肖运势** | 十二生肖性格特质分析，附 2026 马年流年运势详解 |

### 🔯 西方神秘学占卜

| 功能 | 说明 |
|------|------|
| **塔罗牌** | 22 张大阿卡纳完整解读，支持单张/三张/凯尔特十字三种牌阵 |
| **星座运势** | 十二星座每日运势 + 每周运势，性格分析与星座配对 |
| **数字命理** | 基于姓名与生日的生命灵数分析，含四大核心数字解读 |

---

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19 + TypeScript |
| 构建 | Vite 8 |
| 样式 | Tailwind CSS 4 |
| 路由 | React Router 7 |
| 动画 | Framer Motion |
| 图标 | Lucide React |
| 部署 | Netlify |

---

## 🚀 本地运行

```bash
# 克隆仓库
git clone https://github.com/collaspor/fortune-telling-app.git
cd fortune-telling-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

---

## 📁 项目结构

```
src/
├── components/          # 通用 UI 组件
│   ├── Layout.tsx       # 页面布局（导航 + 页脚）
│   ├── Navbar.tsx       # 顶部导航栏
│   ├── StarryBackground.tsx  # Canvas 星空粒子背景
│   ├── FortuneResult.tsx     # 占卜结果展示容器
│   └── ...
├── pages/
│   ├── Home.tsx         # 首页（Hero + 分类卡片）
│   ├── chinese/         # 中国传统占卜
│   │   ├── BaZi.tsx     # 八字算命
│   │   ├── IChing.tsx   # 易经占卜
│   │   └── Zodiac.tsx   # 生肖运势
│   └── western/         # 西方占卜
│       ├── Tarot.tsx    # 塔罗牌
│       ├── Horoscope.tsx # 星座运势
│       └── Numerology.tsx # 数字命理
├── data/                # 静态数据
├── utils/               # 计算引擎
├── hooks/               # 自定义 Hook
└── types/               # TypeScript 类型定义
```

---

## 📄 免责声明

本网站仅供娱乐参考，所有占卜结果均基于随机算法生成，不代表真实命运预测。请勿过度依赖或将其作为重大决策的依据。命运之书由你亲手书写。

---

## 📜 License

MIT
