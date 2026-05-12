# From Accounting to Investments — 从会计学到证券投资学

本地 HTML 教学站点。面向数理基础扎实但金融会计零基础的读者，目标是让你能独立分析任意 A 股上市公司的财报与公告。

## 启动

任意 HTTP 服务器伺服本目录即可。最简单：

```bash
cd ~/Desktop/a-share-finance-tutor
python3 -m http.server 8000
```

然后浏览器访问 <http://localhost:8000/>。

> 提示：用 `file://` 直接打开 HTML 会让某些 `fetch()` (导航树、搜索索引) 失败。一定要用 HTTP 服务器。

## AI 问答

右下浮动按钮。第一次使用需要填入 Anthropic API Key (`sk-ant-...`)，存于浏览器 `localStorage`。模型为 `claude-opus-4-7`。请求直连 `api.anthropic.com`（启用 `anthropic-dangerous-direct-browser-access` 标志），不经过任何中间服务。

API Key 来源：<https://console.anthropic.com/settings/keys>

## 当前进度

- [x] CSS / JS 骨架，bilingual + KaTeX + chat + 进度跟踪
- [x] 首页
- [x] Module I 导览
- [x] Module I 全 11 章 (Ch.01 五原子 / Ch.02 恒等式 / 三表勾稽 / 原则 / 收入 / 资产 / 负债权益 / 合并 / 现金流 / 准则 / 附注)
- [x] Module II 公司财务 全 11 章
- [x] Module III 证券投资学 全 10 章 (深度较浅, 待加强)
- [x] A 股特化 5 章
- [x] Glossary / References / About / Progress
- [ ] Module III 深度提升 (每章扩展到 350+ 行)

## 目录结构

```
.
├── index.html
├── assets/
│   ├── css/    tokens · base · layout · components · chat · print
│   ├── js/     i18n · nav · toc · quiz · progress · chat · search · katex-auto · main
│   ├── data/   nav-tree.json (案例 + 搜索索引后续补)
│   └── img/    (待填)
├── pages/
│   ├── m1-accounting/        (Ch.00 + Ch.01 已就绪)
│   ├── m2-corp-finance/      (待补)
│   ├── m3-investments/       (待补)
│   ├── a-share/              (待补)
│   └── meta/                 (glossary / references / about / progress, 待补)
└── docs/
    ├── SITEMAP.md
    ├── CASE_STUDIES.md
    └── DESIGN_DIRECTION.md
```

## 后续追加章节的方式

每一章遵循同一个 HTML 模板（见 `pages/m1-accounting/01-equation.html`）：

1. `<head>` 字体 / KaTeX / CSS 链 — 直接拷贝
2. shell：topbar + nav + main + toc + chat — 直接拷贝
3. 正文 `<article class="lesson">` 套用：
   - lesson-meta（章节号 / 阅读时长 / 前置 / 后续）
   - H1 + lesson-subtitle (zh / en)
   - `.objectives` 学习目标
   - `<section class="layer">` × 3（Layer 1 / 2 / 3）
   - 「本章涉及的思维模型」`.model-card`
   - 「理解检验题」`<ol class="quiz quiz-list">`
   - `.lesson-foot` 包含 `.mark-done` 和 `.chap-nav`
4. 把新章节加进 `assets/data/nav-tree.json` 的 `chapters` 数组（不动现有 entry）。

可复用的内容卡片：`.callout`, `.callout--def`, `.callout--formula`, `.callout--principle`, `.callout--warn`, `.case`, `.case--warn`, `.dispute`, `.model-card`, `.eq`。

## 设计原则

- 学术 paper 风格（详 `docs/DESIGN_DIRECTION.md`）。Bloomberg 风格只局部出现在数据表里。
- 字体：Cormorant Garamond + Source Serif 4 + Noto Serif SC + JetBrains Mono + Inter Tight。明确避开 Inter / Roboto / Space Grotesk / Arial。
- 中英双语：每段写一对 `<span lang="zh">` 与 `<span lang="en">`，顶栏切换。
- 无构建步骤、无前端框架。原生 HTML + ES module。

## License

教学用途，私人项目。
