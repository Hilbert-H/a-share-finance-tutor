# 章节正文叙事化风格指南 — NARRATIVE_STYLE

本项目目标读者: 工科背景、零会计基础的成人。本指南把 Layer 1 (直觉层) 的写作标准定为
《世界上最简单的会计书》(达雷尔·穆利斯) 的水平: 不依赖任何先验术语就能读完, 同时不
削减 Layer 2 / Layer 3 的专业深度。

适用范围: `pages/**/*.html` 章节正文。**禁止**改动 `assets/css/*`、`assets/js/*`、
`assets/data/nav-tree.json`、HTML `<head>` 区块 (含 KaTeX 加载、字体加载、内联
`<style>` 与 `__debug_v6` 调试角标)。

---

## 一、 四条核心理念 (Layer 1 必须全部满足)

1. **从场景里长出术语** — 先描述一个具体的事实, 再问一句, 然后才揭晓术语。术语是
   "答案", 不是"前提"。
2. **每加一笔交易, 立刻回核等式** — 每个 transaction 后写一行: "现在 A = ?, L = ?,
   E = ? — 等式还成立吗?成立。" 把"等式不会塌"建成肌肉记忆。
3. **第二人称 + 一个贯穿全章的具体场景** — "你"或一个固定主角 (如老王) 是故事的主体。
   主角和场景在整个 module 内应尽量延续 (M1 用老王牛肉面馆)。
4. **提问驱动** — 在揭晓术语前问读者: "这是收入吗?", "这是负债吗?" 让读者答出来再
   往下走。

---

## 二、 Layer 分工 checklist

### Layer 1 — 直觉 / Intuition

**必须做:**

- [ ] 用一个具体场景 (人 + 动作 + 金额) 贯穿整层, 主角与上一章保持一致 (除非有刻意切换)。
- [ ] 每个新术语首次出现的格式: <em>事实描述 → 提问 → 揭晓术语作答</em>, 术语名用
      `<strong>` 或 `<dfn>` 包裹。
- [ ] 每一笔交易后给出"等式回核"一行 (zh + en 各一)。
- [ ] zh 段写流畅再写 en 段, 段落配对 (`<p lang="zh">` ... `</p><p lang="en">` ... `</p>`),
      不强求逐句直译。

**禁止:**

- [ ] 工科类比 (封闭系统 / KCL / 守恒律 / 代数对偶 / 能量守恒 / 动量守恒) ——
      全部下移到 Layer 2。
- [ ] 独立成块的 LaTeX (`$$...$$` 或 `.eq` 块)。整层 inline LaTeX 数量 0-2 处,
      仅允许结尾收束句中出现 1 次 `$A = L + E$` 或同类核心等式。
- [ ] 未经定义就使用的术语 (借贷、累计折旧、无形资产 ...)。如果非要提到, 先描述事实。
- [ ] 抽象主语 ("公司"、"系统"、"实体")。永远用具体主角 ("老王"、"你") 代替。

### Layer 2 — 定义与公式 / Definitions

**必须做:**

- [ ] 开头一句衔接 Layer 1, 模板: "Layer 1 用 ___ 场景 ___, 现在我们形式化它。"
- [ ] 之前从 Layer 1 下移的工科类比 (封闭系统、KCL、守恒律) 在这里作为"形式化论证"
      的支撑出现, 而不是开篇即用。
- [ ] 保留所有 `.callout.callout--formula` / `.eq` / `.num` / `.cite` 结构, 公式编号
      `(1.1)`、`(1.2)` 等一字不动。
- [ ] 维持现有逐句中英并排。

### Layer 3 — A 股案例 / Case

**必须做:**

- [ ] 开头一句把案例对回 Layer 1 主角, 模板: "贵州茅台的 ___ ≈ 你 ___。" 让数量级
      跳跃 (从 ¥1,500 到 ¥484 亿) 不显得突兀。
- [ ] A 股公司名 + 股票代码 + 报告期 + 具体数字 + 数据出处链接, 一字不删、一字不动。
- [ ] 保留 `.case` / `.case-head` / `.ticker` / `.company` / `.period` / `.case-table` /
      `.case-link` 结构。

---

## 三、 双语规则

- **Layer 1 叙事段**: 中文先写流畅 → 英文同质量重写 (不逐句直译, 表达可微调以适应
      英文语序)。段落以语种配对出现 (zh 段紧接 en 段)。
- **Layer 2 / Layer 3**: 维持当前逐句中英并排, 与历史章节保持一致。
- **数字格式**: 中文/英文都用半角千位逗号 (¥1,500、¥28,550)。避免在 Layer 1 用
      LaTeX 写数字 (`$28{,}550$` → 改成普通文字 `28,550`)。

---

## 四、 必须保留的 HTML 钩子 (少一个就算违规)

页面结构类:
`.lesson`, `.lesson-meta`, `.lesson-subtitle`, `.objectives`, `.section-label`,
`.layer`, `.layer-num`,
`.callout`, `.callout--formula`, `.callout-label`,
`.eq`, `.num`, `.figure`, `.muted`, `.measure`,
`.case`, `.case-head`, `.ticker`, `.company`, `.period`, `.case-table`, `.case-link`,
`.cite`, `.model-card`, `.roman`,
`.quiz`, `.quiz-list`, `.quiz-item[data-qid]`, `.quiz-q`, `.quiz-toggle`, `.quiz-a`,
`.quiz-a-inner`, `.quiz-self`, `.lesson-foot`, `.mark-done`, `.chap-nav`.

属性与全局: 所有 `lang="zh"` / `lang="en"`、`data-qid`、`data-state`、`data-open`、
`data-mark-done`、`data-progress-bar`、`data-search-input`、`data-lang-toggle` 等。

公式与编号: `A = L + E`、`(1.1)`、`(1.2)`、`(1.3)`、`(1.4)`、`(1.5)`、
`$E_t = E_{t-1} + \mathrm{NI}_t - D_t$` 等 Layer 2/3 中所有带编号或带 KaTeX 的等式。

引用: `.cite` 中的 CAS / IFRS / Brealey / 其他文献引用一字不删。

---

## 五、 禁止改动的文件

- `assets/css/*` (tokens / base / layout / components / chat / print 全部)
- `assets/js/*` (main / nav / chat / quiz / progress / toc / search / i18n / katex-auto)
- `assets/data/nav-tree.json`
- 所有 HTML `<head>` 区块 (含字体、KaTeX CDN、`__debug_v6` 调试角标 CSS、KaTeX size lock)
- 章节 `<body>` 的 `header.topbar`、`aside.nav`、`aside.toc`、`button.chat-fab`、
  `div.chat-panel`、底部 `<script>` 区块

---

## 六、 章节字数约束

每章总字数 (中 + 英, 不含 HTML 标记) 浮动 ±20% 以内。Layer 1 prose 部分建议
700–1000 字之间 (中 + 英合计)。Layer 2 / 3 字数变化 < 5%。

---

## 七、 Before / After 对照样例

样例取自 [pages/m1-accounting/02-equation.html](../pages/m1-accounting/02-equation.html)
Layer 1 第一段。

### Before (违反 4 条理念)

```html
<p lang="zh">把一家公司当作一个封闭系统。任何价值进入这个系统, 必有<em>来源</em>;
任何价值留在系统里, 必有<em>形态</em>。来源和形态的总和恒相等 — 这就是会计恒等式。
和能量守恒、动量守恒同一种性质: 把"价值"作为守恒量。</p>

<p lang="zh">想象时间从 $t_0$ 开始:</p>
<ol>
  <li lang="zh">公司还不存在: $A = L = E = 0$。</li>
  <li lang="zh">创始人投入 100 万元自有资金: 银行账户上多出 100 ... → $A = 100$,
      $E = 100$, $L = 0$。等式仍成立。</li>
  ...
</ol>
```

### After (满足 4 条理念)

```html
<p lang="zh">上一章里, 老王店开张那天结束时, 账上 A = 28,550 元 (现金 5,750 + 面粉
牛肉 2,800 + 设备 20,000), L = 12,000 元, E = 16,550 元。今天 (第二天) 店还没开门,
一连串事情就找上门来。我们一笔一笔看, 每笔结束都问同一个问题: "店里现在'有什么'
是不是还等于'谁给的钱'?"</p>

<p lang="zh"><strong>1. 早上 8 点, 送牛肉的来了。</strong> 1,500 元一批, 老王说"老
规矩, 3 天后付钱"。仓库里多了一批 1,500 元的牛肉, 现金一分没动。但是 — 老王现在欠
对方 1,500 元。现在 A = 30,050, L = 13,500, E = 16,550 — 等式还成立吗?成立。"先
拿货后付钱"的这种欠款, 会计学叫 <strong>应付账款 (accounts payable)</strong>。</p>
```

### 5 处差异 (对照 checklist)

| # | 维度 | Before | After |
|---|---|---|---|
| 1 | **主角** | "公司" (抽象) | "老王" (具体, 与 Ch.01 衔接) |
| 2 | **术语顺序** | "封闭系统/守恒律"先于场景 | 事实 → 提问 → 术语作答 (应付账款) |
| 3 | **LaTeX 数量** | 5 处 (`$t_0$, $A=L=E=0$, $A=100$, $L=0$, $A=300$`) | 0 处 |
| 4 | **提问** | 无 (陈述式给出) | "等式还成立吗?" |
| 5 | **回核** | 散落在列表项里 | 每笔交易后一行明确回核 |

---

## 八、 落地工作流

1. 打开目标章节, 检查现有 Layer 结构:
   - 已有 Layer 0 起点段 (如 M2 Ch.02/03) → 只重写 Layer 1, Layer 0 不动。
   - 无 Layer 0, Layer 1 抽象 → 按本指南重写 Layer 1。
   - Layer 1 已经口语化 (如 Ch.01) → 跳过或微调。
2. Layer 1 完全重写; Layer 2 加 1-2 句衔接 + 接收下移的抽象类比; Layer 3 加 1 句桥接。
3. 用 `grep` 验证所有"必须保留的 HTML 钩子"在改写后仍存在 (见第四节)。
4. 浏览器目视: 中英切换、quiz 折叠、KaTeX 渲染、SVG 显示均无破版。
5. 单次 commit, 标题格式 `narrative: <module>/<chapter> Layer 1 重写`。
