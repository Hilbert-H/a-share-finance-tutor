# 视觉与排版定向

## 美学方向 — 学术 paper / 教材风格 (commit)

不走 Bloomberg Terminal。原因：

- 本站 80% 内容是长文本 + 公式 + 推理。Terminal 风格服务交易决策(短时浏览数据流)，不服务长时间深读理论。
- 公式渲染 + 准则引用 + 案例叙述天然适配 Damodaran / Brealey 教材式版面。
- 与典型 A 股资讯网站、券商研报 PPT 形成鲜明区隔，避免廉价感。
- A 股案例数据表用局部 monospace + 琥珀色高亮即可吸收 Bloomberg 的优点，不必整站让步。

## 设计 Tokens (写入 `assets/css/tokens.css`)

### 色彩

```
--paper:        #F7F2E8   /* 主背景 - 暖羊皮纸 */
--paper-deep:   #EFE8D8   /* 次背景 - 卡片/侧栏 */
--ink:          #1A1814   /* 正文墨色 */
--ink-soft:     #4A4540   /* 次级文字 */
--ink-faint:    #8A8378   /* 辅助文字/边框线 */
--rule:         #C9BFA8   /* 章节分隔线 */
--accent:       #8B2C2C   /* 朱砂红 - 强调/印章感 */
--accent-2:     #1F3A5F   /* 群青蓝 - 链接 */
--data-amber:   #B8841E   /* 数据表用 - 借鉴 Terminal */
--callout-bg:   #F2E9D2   /* 公式/定义卡片底色 */
--code-bg:      #2A2620   /* 代码块 - 深色高对比 */
--code-fg:      #E8DCC4
--quiz-bg:      #EDE3CC   /* 检验题底色 */
--warn:         #A6411C   /* 反面案例/造假警示 */
```

### 字体 (Google Fonts CDN)

```
--font-display: 'Cormorant Garamond', 'Noto Serif SC', serif;   /* H1/H2 大字号 */
--font-body:    'Source Serif 4', 'Noto Serif SC', serif;       /* 正文 */
--font-sans:    'Inter Tight', 'Noto Sans SC', sans-serif;      /* UI/导航/标签 */
--font-mono:    'JetBrains Mono', 'IBM Plex Mono', monospace;   /* 代码/数据/公告号 */
```

避开 frontend-design SKILL.md 明确点名禁用的 Inter (体) / Roboto / Space Grotesk。Inter Tight 是 Inter 的紧凑变体，仅用于 UI 小字号，不主导版面。

### Typographic scale

```
--fs-base: 17px;            /* 略大于 web 默认, 教材级阅读密度 */
--lh-base: 1.65;
--measure: 68ch;            /* 主栏阅读宽度上限 */
H1: 2.6rem  letter-spacing -0.02em  weight 500  italic 可选
H2: 1.85rem letter-spacing -0.01em  weight 600
H3: 1.35rem weight 700
小标题: 0.78rem all-caps tracking 0.12em (类 paper section labels)
```

### 装饰元素

- 章节号用罗马数字 (I, II, III) + 中文章名
- H2 下方 `border-bottom: 1px solid var(--rule)` 单线
- 章节首段可选 drop cap (CSS `::first-letter`)
- 整页背景叠加 SVG noise 1-2% opacity 制造纸纹
- "First Principles" 卡片左边竖线 4px solid var(--accent)
- "A 股案例" 卡片右上角放一个仿印章的圆形角标 (CSS only)
- 公式块淡背景 + 等宽编号 `(2.7)` 居右
- 表格用 `font-variant-numeric: tabular-nums` 对齐

### Motion

- 页面加载: stagger 50ms 显示 H1 → meta → 正文段落 (前 3 段)
- 左侧导航展开/折叠: cubic-bezier(0.2, 0.8, 0.2, 1) 220ms
- 检验题答案展开: max-height + opacity 双过渡
- 公式块 hover: 极轻微 elevation (box-shadow 1→3px)
- 不使用滚动视差、不用 framer-motion 那套花活, 教材保持安静

### 图表

- 三大报表勾稽 / DuPont 树 / efficient frontier: 手写 SVG, 配色仅用 ink + accent + data-amber, 描边 1.25px
- 数据图: Chart.js, 自定义主题覆盖 (paper bg, ink lines, amber series)

## 布局 (shell)

```
┌──────────────────────────────────────────────────────────────┐
│  top bar: 站标 + 搜索 + 进度 + 切换主题(可选)                  │
├──────────┬──────────────────────────────────────┬────────────┤
│          │                                      │            │
│  左侧    │       中央内容区                      │  右侧 TOC  │
│  目录树  │       max-width: var(--measure)      │  浮动 +    │
│  240px   │                                      │  AI 按钮   │
│          │                                      │  220px     │
│          │                                      │            │
└──────────┴──────────────────────────────────────┴────────────┘
```

- 1280px+ 三栏
- 1024-1280 隐藏右栏 TOC, 折叠到悬浮按钮
- < 1024 左栏变 drawer (汉堡菜单), TOC 收到顶部
- 打印模式: 隐藏左右栏, 内容居中 A4 友好

## 不做的事

- 不用 Tailwind 那种 utility class 满屏 (写在 components.css 里用语义类名)
- 不用 SaaS 蓝紫渐变
- 不用 Inter / Roboto / Arial / 系统字体作为正文
- 不堆 emoji, 不堆 lucide icon 装饰, 装饰用排版本身 (引号/线/角标)
- 不引入大型 UI 框架 (无 React/Vue), 纯 HTML + 原生 ES module
