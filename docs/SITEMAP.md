# Sitemap — 从会计学到证券投资学

## 站点总览

```
index.html                                首页 / 学习地图

pages/m1-accounting/                      Module I — 会计学
  00-overview.html                          模块导览 + 思维模型 + 专家分歧
  01-equation.html                          会计恒等式 & 复式记账
  02-three-statements.html                  三大报表结构与勾稽
  03-principles.html                        accrual / matching / 谨慎 / 实质重于形式
  04-revenue.html                           收入确认 CAS 14 / IFRS 15 五步法
  05-assets.html                            资产计量: 公允/历史/摊余, 流动 vs 非流动
  06-liab-equity.html                       负债 vs 权益 (永续债/优先股等灰色)
  07-consolidation.html                    合并报表 & 长投权益法/成本法
  08-cashflow.html                          现金流量表深度: 间接法构造
  09-cas-vs-ifrs.html                       CAS / IFRS / US GAAP 关键差异
  10-notes-events.html                      附注、关联交易、或有事项、期后事项

pages/m2-corp-finance/                    Module II — 公司财务
  00-overview.html                          模块导览 + 思维模型 + 专家分歧
  01-time-value.html                        PV/FV/年金/永续年金
  02-risk-return.html                       方差/协方差/CAPM 推导
  03-wacc-mm.html                           WACC + Modigliani-Miller (含税/无税)
  04-capital-budgeting.html                 NPV / IRR / payback / real options
  05-capital-structure.html                 trade-off / pecking order / agency
  06-dividend.html                          股利政策: MM 无关性 / signaling / clientele / 回购
  07-working-capital.html                   CCC / AR-INV-AP
  08-dupont.html                            DuPont 三层 / 五层分解
  09-ratios.html                            流动/偿债/营运/盈利/估值 五大类比率
  10-fraud-detection.html                   Beneish M-Score / Altman Z / 应计质量 / F-Score

pages/m3-investments/                     Module III — 证券投资学
  00-overview.html                          模块导览 + 思维模型 + 专家分歧
  01-mpt.html                               MPT / 有效前沿 / 协方差矩阵
  02-capm-apt-ff.html                       CAPM / APT / Fama-French 3-5 因子
  03-emh.html                               EMH 强/半强/弱 与行为金融张力
  04-behavioral.html                        锚定/过度自信/处置效应/羊群/反身性
  05-dcf.html                               DCF: FCFF / FCFE / DDM 推导
  06-relative-valuation.html                PE / PB / EV-EBITDA / PS + 清算价值
  07-value-investing.html                   margin of safety / moat / 能力圈 / Mr. Market
  08-financial-quality.html                 投资中应用财报: 质量/成长/估值三角
  09-announcements.html                     业绩预告/定增/回购/限售/ST/退市/问询函

pages/a-share/                            A 股特化(贯穿后亦独立成章)
  01-regulation.html                        监管: CSRC / 沪深北 / 注册制
  02-disclosure.html                        定期 + 临时 + 自愿性披露
  03-china-specifics.html                   商誉雷 / 应收质量 / 关联占用 / 股权质押
  04-fraud-cases.html                       康美/康得新/獐子岛/瑞幸/乐视/天神/华谊
  05-gatekeepers.html                       审计师非标意见 / 问询函 / 监管函

pages/meta/
  glossary.html                             中英术语词典
  references.html                           参考文献 (CAS / Brealey / Bodie / Damodaran ...)
  about.html                                本站说明 + 学习路径建议
  progress.html                             学习进度仪表板 (localStorage)

assets/
  css/{tokens, base, layout, components, print, prism-academic}.css
  js/{nav, toc, search, quiz, progress, chat, katex-auto}.js
  img/                                      手绘 SVG: 报表勾稽 / DuPont 树 / efficient frontier ...
  data/{search-index.json, cases/*.json}    搜索索引 + 案例数据

docs/                                     规划/设计文档(不进站点)
README.md                                 启动方式 + 后续追加内容方式
```

## 每页通用模板

每个内容页都用同一框架，保证三层讲解全覆盖：

```
H1: 章节标题 (附英文)
─────────────────────────────────────────────────────
META: 模块·章节号 · 阅读时长 · 前置概念 · 后续概念
─────────────────────────────────────────────────────

§ 学习目标
  3-5 条可验证的目标 (能算、能识别、能解释……)

§ Layer 1 — 直觉与类比
  日常/工程/物理类比, 建立 mental picture, 无公式

§ Layer 2 — 专业定义与公式
  正式定义 + LaTeX 公式 + 准则/教材引用
  (CAS 第 X 号; Brealey ch.X; Bodie ch.X; Damodaran ch.X)

§ Layer 3 — A 股真实案例
  公司名 + 股票代码 + 原始数字 + 巨潮链接 (若可)
  解读"数字背后的经济实质"

§ 涉及的思维模型
  本章用到的 mental models 卡片 + 链接至该模型档案

§ 常见陷阱 (optional)
  反例 + 错误推理

§ 理解检验题
  3-5 道反直觉/陷阱题, 答案折叠

§ 延伸阅读 / 下一章
```

## 模块顶页 (00-overview.html) 结构

```
H1: Module I — 会计学 / Accounting

§ 模块地图
  - 本模块要回答的核心问题
  - 章节依赖图 (SVG)

§ 本模块的 first-principles 思维模型 (清单 + 卡片)

§ 本领域专家最激烈的分歧 (清单)
  每条: 焦点 / 阵营 A (代表人物 + 文献) / 阵营 B / 经验证据现状

§ 学习路径建议
  - 快速通道 (8 小时): 必读章节
  - 系统通道 (40 小时): 全读 + 习题

§ 模块完成度 (从 localStorage 读)
```

## 章节依赖图

```
M1 必学序: 01 → 02 → 03 → 08 → (04, 05, 06, 07 并行) → 09 → 10
M2 必学序: 01 → 02 → 03 → 04 → (05, 06, 07) → 08 → 09 → 10
M3 必学序: 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09

跨模块依赖:
  M2.01 (时间价值) → M3.05 (DCF)
  M1.02 (三表勾稽) → M2.08 (DuPont) → M3.08 (财报应用)
  M1.10 (附注) → M2.10 (造假识别) → M3.09 (公告解读)
  M1.04 (收入确认) → M2.10 (造假识别 - Beneish DSRI)
```

## 交互细节

### 左侧导航
- 三大模块 + A 股特化 + Meta 五个一级节点
- 当前章高亮 + 父节点自动展开
- 折叠状态用 localStorage 记忆
- URL hash 同步: `pages/m1-accounting/04-revenue.html#step-5` 直接跳锚

### 右侧浮动 TOC
- 自动从页面 H2/H3 生成
- IntersectionObserver 高亮当前节
- AI 问答悬浮按钮固定右下

### 顶栏搜索
- 简单 indexOf 实现 (一期); 命中后弹出列表显示页名 + 摘要
- 命中后跳转并 highlight (URL hash + JS 加 mark)
- 二期可换 Lunr.js

### AI 问答
- 右下 FAB 点开 chat panel
- 首次使用提示输入 Anthropic API Key, 存 localStorage
- 调用 `anthropic.messages.create`, model = `claude-sonnet-4-20250514` (按你指定保留)
- system prompt 模板:
  ```
  你是 A 股财报教学助手. 用户正在学习的当前章节是: {currentPageTitle}.
  当前章节的核心概念: {currentPageKeywords}.
  规则:
  1) 优先基于本站章节回答, 必要时引用具体章节路径 (例: 见 m1-accounting/08-cashflow.html).
  2) 涉及 A 股案例时引用具体公司+代码+年度.
  3) 数学/会计推导用 LaTeX (KaTeX) 标记.
  4) 若用户问题超出本站覆盖, 明确说明并指出可参考的章节或外部文献.
  ```
- 流式输出 (stream: true), 用 SSE 解析
- 头像/气泡: 用户右侧 ink, 助手左侧 paper-deep, 等宽数字

### 进度系统
- 每页底部一个 "标记完成" 按钮 → localStorage
- 每道检验题答对/答错 → localStorage
- 模块顶页和 progress.html 显示完成度环
- 模块完成度 = 已完成章节 / 总章节 × 0.7 + 已答正确题 / 总题数 × 0.3

### 打印
- @media print: 隐藏左右栏 + chat + 进度
- 公式块去掉背景, 用边框替代
- 页眉显示章节路径, 页脚显示页码
- A4: max-width 165mm, font-size 11pt

## 文件命名约定

- 内容页: `NN-kebab-case.html`, NN 是章节序
- CSS: 按职责分文件, 不混
- JS: 一文件一职责 + 默认 export, `<script type="module">` 加载
- 中英术语: glossary 数据以 JSON 存 `assets/data/glossary.json`, glossary.html 渲染
