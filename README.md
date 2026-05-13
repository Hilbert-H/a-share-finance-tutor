# From Accounting to Investments — 从会计学到证券投资学

本地 HTML 教学站点。面向**数理基础扎实、金融会计零基础**的成人读者,目标是让你能独立分析任意 A 股上市公司的财报与公告,并构建自己的投资决策框架。

零依赖、零构建步骤、原生 HTML + ES module + KaTeX。可直接 `python3 -m http.server` 启动。

---

## 教学思想 (Pedagogy)

每一章用**三层结构**逐级加深, 让同一个主题对零基础到从业者都成立:

| Layer | 角色 | 写法 |
|---|---|---|
| **Layer 0** *(可选)* | 起点段 | 零先决条件, 1-2 个最基本原子 |
| **Layer 1** | 直觉 | **第二人称 + 老王面馆贯穿场景**, 5-7 笔交易/决策, 每笔后回核 (例 A=L+E)。术语"先描述事实 → 提问 → 揭晓"作答, 用 `<dfn>` / `<strong>`。Layer 1 禁止工科类比 (封闭系统/KCL/守恒律) 与独立成块 LaTeX |
| **Layer 2** | 形式化 | 抽象类比 (能量守恒、协方差矩阵、Kalman 滤波器), LaTeX 推导, CAS / IFRS / Brealey / Markowitz / Fama-French 等经典引用 |
| **Layer 3** | A股案例 | 真实公司 (茅台 600519 / 招行 600036 / 比亚迪 002594 等) + 报告期 + 具体数字, 跨度从财务造假到投资风格 |

写作准则: [docs/NARRATIVE_STYLE.md](docs/NARRATIVE_STYLE.md) (核心理念 / 分层 checklist / 双语规则 / Before-After 对照样例)。

### 主角弧 (Character Arc)

整个站点用**一个虚构主角 老王**贯穿 4 个模块, 让读者跟随同一个人从零到投资者:

- **M1 (会计学)**: 老王开牛肉面馆——日常记账, 6 笔交易演示 A=L+E, 引出三表勾稽
- **M2 (公司财务)**: 老王想扩张——决定借多少 / 分多少红 / 何时开第二家店, 学 TVM、WACC、NPV、MM
- **M3 (证券投资学)**: 老王把利润存的 ¥100k 拿出来投 A 股——学 MPT、CAPM、DCF、价值投资
- **A 股特化**: 老王 navigate 中国独有的制度——T+1、涨跌幅、注册制、信息披露、看门人体系

配角 (小张 = 出资人, 老李 = 餐饮老板邻居) 跨章复用, 保持人物记忆连续性。

---

## 启动

```bash
cd ~/Desktop/a-share-finance-tutor
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000/
```

> 用 `file://` 直接打开会让 `fetch()` (导航树 / 搜索索引) 失败, 必须 HTTP 服务器。

---

## AI 问答

右下浮动按钮。第一次使用填入 Anthropic API Key (`sk-ant-...`), 存于浏览器 `localStorage`。模型 `claude-opus-4-7`。请求直连 `api.anthropic.com` (启用 `anthropic-dangerous-direct-browser-access`), 不经过任何中间服务。

API Key 来源: <https://console.anthropic.com/settings/keys>

---

## 内容进度 (47 章全部完成)

### Module I · 会计学 (12 章)

| Ch | 主题 | 行数 |
|---|---|---|
| 00 | 模块导览 | 500 |
| 01 | 财报的五个原子 (五原子) | 934 |
| 02 | 会计恒等式与复式记账 | 704 |
| 03 | 三大报表与勾稽 | 608 |
| 04 | 会计基本原则 | 408 |
| 05 | 收入确认 (五步法) | 595 |
| 06 | 资产计量与减值 | 607 |
| 07 | 负债与权益分类 | 477 |
| 08 | 合并报表 | 403 |
| 09 | 现金流量表 | 515 |
| 10 | CAS vs IFRS 差异 | 464 |
| 11 | 附注与重大事项 | 631 |

### Module II · 公司财务 (11 章)

| Ch | 主题 | 行数 |
|---|---|---|
| 00 | 模块导览 | 382 |
| 01 | 时间价值 (TVM / PV / FV) | 392 |
| 02 | 风险与收益 | 561 (含 Layer 0) |
| 03 | WACC 与 MM 定理 | 542 (含 Layer 0) |
| 04 | 资本预算 (NPV / IRR) | 365 |
| 05 | 资本结构 (杠杆 / 税盾 / 破产成本) | 338 |
| 06 | 股利政策 (MM 红利无关 / 信号 / 税效应) | 334 |
| 07 | 营运资本 (CCC = DIO + DSO − DPO) | 240 |
| 08 | DuPont 拆解 | 226 |
| 09 | 财务比率 (流动 / 速动 / 周转 / 杠杆) | 259 |
| 10 | 财务造假信号 (M-score / Z-score 入门) | 318 |

### Module III · 证券投资学 (10 章, 全部扩展至 350+ 行)

| Ch | 主题 | 行数 |
|---|---|---|
| 00 | 模块导览 (4 步框架 + 工具链 + 8 大散户错误) | 373 |
| 01 | MPT 现代投资组合理论 (Markowitz) | 476 |
| 02 | CAPM · APT · Fama-French | 456 |
| 03 | EMH 有效市场假说 (弱 / 半强 / 强) | 445 |
| 04 | 行为金融 (锚定 / 损失厌恶 / 处置 / 羊群) | 350 |
| 05 | DCF 估值 (FCFF / FCFE / 终值) | 409 |
| 06 | 相对估值 (P/E · P/B · EV/EBITDA · PEG) | 417 |
| 07 | 价值投资 (Graham / Buffett / 护城河) | 471 |
| 08 | 财务质量 (Sloan / Beneish M / Altman Z) | 463 |
| 09 | 公告与事件研究 (Event Study · PEAD · SUE) | 472 |

### A 股特化 (5 章, 全部加全 3 层结构)

| Ch | 主题 | 行数 |
|---|---|---|
| 01 | 监管框架 (CSRC / 沪深北 / 注册制) | 597 |
| 02 | 信息披露体系 (年报 / 临时 / 重大事项) | 661 |
| 03 | A 股特色规则 (T+1 / 涨跌幅 / 北向南向 / 限售股) | 715 |
| 04 | 财务造假经典案例 (康得新 / 康美 / 瑞幸 / 辉山) | 593 |
| 05 | 看门人体系 (审计 / 投行 / 评级 / 媒体) | 542 |

### Meta

- Glossary / References / About / Progress 4 页

---

## 目录结构

```
.
├── README.md
├── index.html
├── docs/
│   ├── NARRATIVE_STYLE.md       # ★ 写作风格指南 (本轮新增)
│   ├── DESIGN_DIRECTION.md
│   ├── SITEMAP.md
│   └── CASE_STUDIES.md
├── assets/
│   ├── css/    tokens · base · layout · components · chat · print
│   ├── js/     i18n · nav · toc · quiz · progress · chat · search · katex-auto · main
│   ├── data/   nav-tree.json
│   └── img/
└── pages/
    ├── m1-accounting/    00–11  (12 章)
    ├── m2-corp-finance/  00–10  (11 章)
    ├── m3-investments/   00–09  (10 章)
    ├── a-share/          01–05  (5 章)
    └── meta/             glossary · references · about · progress
```

---

## 章节模板与必须保留的 HTML 钩子

每章使用统一模板 (参考 [pages/m1-accounting/02-equation.html](pages/m1-accounting/02-equation.html))。任何新章 / 改写时, 以下 HTML 钩子**少一个都算违规** (CSS / JS 依赖):

**页面结构**: `.lesson`, `.lesson-meta`, `.lesson-subtitle`, `.objectives`, `.section-label`, `.layer`, `.layer-num`
**内容卡片**: `.callout`, `.callout--def`, `.callout--formula`, `.callout--principle`, `.callout--warn`, `.callout-label`
**公式**: `.eq`, `.num`, KaTeX `$...$` 或 `$$...$$`
**案例**: `.case`, `.case-head`, `.ticker`, `.company`, `.period`, `.case-table`, `.case-link`, `.case--warn`
**思维模型 + 测试**: `.model-card`, `.roman`, `.quiz`, `.quiz-list`, `.quiz-item[data-qid]`, `.quiz-q`, `.quiz-toggle`, `.quiz-a`, `.quiz-a-inner`, `.quiz-self`
**底部**: `.lesson-foot`, `.mark-done`, `.chap-nav`
**外围 (不要碰)**: `<head>` (含 KaTeX size lock 内联 `<style>`), `.topbar`, `aside.nav`, `aside.toc`, `.chat-fab`, `.chat-panel`, 底部 `<script>`

**永远不要改的文件**: `assets/css/*`, `assets/js/*`, `assets/data/nav-tree.json`。

**双语规则**: 每段都有 `<p lang="zh">...</p>` + `<p lang="en">...</p>` (zh 先)。Layer 1 叙事段可"中文流畅 + 英文同质量重写" (不逐句直译); Layer 2 / 3 维持逐句并排。

---

## 后续追加章节

1. 复制 [pages/m1-accounting/02-equation.html](pages/m1-accounting/02-equation.html) 作为模板
2. 按 [docs/NARRATIVE_STYLE.md](docs/NARRATIVE_STYLE.md) 的 checklist 写作 (Layer 1 narrative / Layer 2 formal / Layer 3 case)
3. 把新章节加进 `assets/data/nav-tree.json` 的 `chapters` 数组 (不动现有 entry)
4. 提交格式: `narrative: <module>/<chapter> Layer 1 重写` 或 `深度扩展: <module>/<chapter> +N 行`

---

## 设计原则

- **学术 paper 风格** (详 [docs/DESIGN_DIRECTION.md](docs/DESIGN_DIRECTION.md))。Bloomberg 风格仅局部出现在数据表里。
- **字体**: Cormorant Garamond + Source Serif 4 + Noto Serif SC + JetBrains Mono + Inter Tight。明确避开 Inter / Roboto / Space Grotesk / Arial。
- **中英双语**: 每段写一对 `<p lang="zh">` 与 `<p lang="en">`, 顶栏切换。
- **无构建步骤、无前端框架**: 原生 HTML + ES module + KaTeX CDN。

---

## License

教学用途, 私人项目。
