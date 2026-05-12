// ===========================================================================
// progress.js — 学习进度: 章节完成 + 检验题自评 → localStorage
// ===========================================================================

const KEY = 'site.progress';

export function readProgress() {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); }
  catch { return {}; }
}
export function writeProgress(obj) {
  localStorage.setItem(KEY, JSON.stringify(obj));
}

export function currentPagePath() {
  const here = location.pathname;
  const m = here.match(/pages\/(.+)$/);
  return m ? m[1] : '';
}

export function initProgress() {
  const path = currentPagePath();

  // mark-done button on lesson pages
  const btn = document.querySelector('[data-mark-done]');
  if (btn && path) {
    const prog = readProgress();
    const done = !!(prog[path] && prog[path].done);
    setBtn(btn, done);
    btn.addEventListener('click', () => {
      const p = readProgress();
      const cur = !!(p[path] && p[path].done);
      p[path] = p[path] || {};
      p[path].done = !cur;
      writeProgress(p);
      setBtn(btn, !cur);
      window.dispatchEvent(new CustomEvent('progress:changed'));
    });
  }

  // topbar mini progress
  refreshTopbarProgress();
  window.addEventListener('progress:changed', refreshTopbarProgress);
}

function setBtn(btn, done) {
  btn.setAttribute('data-done', done ? 'true' : 'false');
  const lang = document.documentElement.getAttribute('data-lang') || 'zh';
  const labels = {
    zh: { done: '已完成 ✓', undo: '标记完成' },
    en: { done: 'Completed ✓', undo: 'Mark as complete' }
  };
  btn.textContent = done ? labels[lang].done : labels[lang].undo;
}

async function refreshTopbarProgress() {
  const el = document.querySelector('[data-progress-bar]');
  const lbl = document.querySelector('[data-progress-label]');
  if (!el && !lbl) return;

  // Count total content chapters from nav-tree
  let total = 0;
  try {
    const r = await fetch(rootPath() + 'assets/data/nav-tree.json?v=' + Date.now(), { cache: 'no-store' });
    const t = await r.json();
    for (const m of t.modules) {
      if (m.id === 'meta') continue;
      total += m.chapters.filter(c => c.n !== '' && c.slug !== 'overview').length;
    }
  } catch { total = 32; }

  const prog = readProgress();
  const done = Object.values(prog).filter(p => p && p.done).length;
  const pct = total > 0 ? Math.round(100 * done / total) : 0;
  if (el) el.style.width = pct + '%';
  if (lbl) lbl.textContent = `${pct}%`;
}

function rootPath() {
  return location.pathname.includes('/pages/') ? '../../' : './';
}
