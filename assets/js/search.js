// ===========================================================================
// search.js — 顶栏全文搜索 (简易 indexOf)
// 一期: 从 nav-tree + 各页 <meta name="keywords"> 构建本地静态索引
// 二期: 可换 Lunr.js
// ===========================================================================

let index = null;     // [{path, title_zh, title_en, keywords, module}]

async function ensureIndex() {
  if (index) return index;
  const root = location.pathname.includes('/pages/') ? '../../' : './';
  try {
    const r = await fetch(root + 'assets/data/search-index.json?v=' + Date.now(), { cache: 'no-store' });
    if (r.ok) { index = await r.json(); return index; }
  } catch {}
  // Fallback — build from nav-tree
  try {
    const r2 = await fetch(root + 'assets/data/nav-tree.json?v=' + Date.now(), { cache: 'no-store' });
    const t = await r2.json();
    index = [];
    for (const mod of t.modules) {
      for (const ch of mod.chapters) {
        const fn = ch.n ? `${ch.n}-${ch.slug}.html` : `${ch.slug}.html`;
        index.push({
          path: `${mod.path}/${fn}`,
          title_zh: ch.title_zh,
          title_en: ch.title_en,
          module_zh: mod.title_zh,
          module_en: mod.title_en,
          keywords: `${ch.title_zh} ${ch.title_en} ${mod.title_zh} ${mod.title_en}`.toLowerCase()
        });
      }
    }
    return index;
  } catch (e) { console.error(e); index = []; return index; }
}

export function initSearch() {
  const input = document.querySelector('[data-search-input]');
  const out = document.querySelector('.search-results');
  if (!input || !out) return;
  let lastT;

  async function run() {
    const q = input.value.trim().toLowerCase();
    if (!q || q.length < 1) { out.classList.remove('open'); return; }
    const idx = await ensureIndex();
    const lang = document.documentElement.getAttribute('data-lang') || 'zh';
    const hits = idx.filter(it =>
      (it.keywords || '').includes(q) ||
      (it.title_zh || '').toLowerCase().includes(q) ||
      (it.title_en || '').toLowerCase().includes(q)
    ).slice(0, 12);
    if (!hits.length) {
      out.innerHTML = `<div class="hit" style="cursor:default"><div class="hit-snippet">${lang === 'zh' ? '没有命中。' : 'No matches.'}</div></div>`;
      out.classList.add('open');
      return;
    }
    const root = location.pathname.includes('/pages/') ? '../../' : './';
    out.innerHTML = hits.map(h => {
      const title = lang === 'zh' ? h.title_zh : h.title_en;
      const mod = lang === 'zh' ? h.module_zh : h.module_en;
      const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`(${safeQ})`, 'ig');
      const ttl = title.replace(re, '<mark>$1</mark>');
      return `<a class="hit" href="${root}${h.path}">
        <div class="hit-title">${ttl}</div>
        <div class="hit-path">${mod} · ${h.path}</div>
      </a>`;
    }).join('');
    out.classList.add('open');
  }

  input.addEventListener('input', () => { clearTimeout(lastT); lastT = setTimeout(run, 140); });
  input.addEventListener('focus', run);
  document.addEventListener('click', (e) => {
    if (!out.contains(e.target) && e.target !== input) out.classList.remove('open');
  });
}
