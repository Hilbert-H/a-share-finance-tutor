// ===========================================================================
// nav.js — 左侧导航树渲染 + 当前页高亮 + 折叠态记忆
// ===========================================================================

const OPEN_KEY = 'nav.open';
const PROGRESS_KEY = 'site.progress';   // { "<path>": { done: true, quizzes: {...} } }

function ROOT() {
  const here = location.pathname.replace(/\\/g, '/');
  // detect how deep we are below project root by counting "pages/" segments
  if (here.includes('/pages/')) {
    // pages/m1-accounting/01-xx.html → root is two dirs up
    return '../../';
  }
  return './';
}

function getOpenState() {
  try { return JSON.parse(localStorage.getItem(OPEN_KEY) || '{}'); }
  catch { return {}; }
}
function setOpenState(state) {
  localStorage.setItem(OPEN_KEY, JSON.stringify(state));
}

function getProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'); }
  catch { return {}; }
}

function currentPagePath() {
  // canonical: "m1-accounting/01-equation.html" (relative to /pages/)
  const here = location.pathname;
  const m = here.match(/pages\/(.+)$/);
  return m ? m[1] : '';
}

export async function initNav() {
  const navEl = document.querySelector('.nav');
  if (!navEl) return;

  const root = ROOT();
  let tree;
  try {
    // Bust cache — bumping the version invalidates any previously cached nav-tree
    const r = await fetch(root + 'assets/data/nav-tree.json?v=' + Date.now(), { cache: 'no-store' });
    tree = await r.json();
  } catch (e) {
    console.error('Failed to load nav tree', e);
    return;
  }

  const openState = getOpenState();
  const progress = getProgress();
  const here = currentPagePath();

  const html = renderTree(tree, root, openState, progress, here);
  navEl.innerHTML = html;

  // bind module collapse
  navEl.querySelectorAll('.nav-module').forEach(modEl => {
    const title = modEl.querySelector('.nav-module-title');
    const id = modEl.getAttribute('data-id');
    title.addEventListener('click', () => {
      const open = modEl.getAttribute('data-open') === 'true';
      modEl.setAttribute('data-open', open ? 'false' : 'true');
      const st = getOpenState();
      st[id] = !open;
      setOpenState(st);
    });
  });

  // bind nav toggle (mobile)
  const tog = document.querySelector('[data-nav-toggle]');
  if (tog) tog.addEventListener('click', () => navEl.classList.toggle('open'));

  // re-render labels on lang change
  window.addEventListener('lang:changed', () => {
    navEl.innerHTML = renderTree(tree, root, getOpenState(), getProgress(), currentPagePath());
    initNavBindings(navEl);  // need to rebind
  });
}

function initNavBindings(navEl) {
  navEl.querySelectorAll('.nav-module').forEach(modEl => {
    const title = modEl.querySelector('.nav-module-title');
    const id = modEl.getAttribute('data-id');
    title.addEventListener('click', () => {
      const open = modEl.getAttribute('data-open') === 'true';
      modEl.setAttribute('data-open', open ? 'false' : 'true');
      const st = getOpenState();
      st[id] = !open;
      setOpenState(st);
    });
  });
}

function renderTree(tree, root, openState, progress, here) {
  const lang = document.documentElement.getAttribute('data-lang') || 'zh';
  const navTitle = lang === 'zh' ? '目录' : 'Contents';

  let html = `<div class="nav-section">
    <div class="nav-section-title">${navTitle}</div>`;

  for (const mod of tree.modules) {
    // module is open if any chapter under it matches current path, or saved as open
    const anyCurrent = mod.chapters.some(ch =>
      here === `${mod.id.replace('m', 'm')}-${mod.path.split('/').pop()}/${chapFilename(ch)}` ||
      here === `${mod.path.replace(/^pages\//, '')}/${chapFilename(ch)}`
    );
    const open = (mod.id in openState) ? openState[mod.id] : anyCurrent;
    const title = lang === 'zh' ? mod.title_zh : mod.title_en;
    const altTitle = lang === 'zh' ? mod.title_en : mod.title_zh;

    html += `<div class="nav-module" data-id="${mod.id}" data-open="${open ? 'true' : 'false'}">
      <div class="nav-module-title">
        <span class="roman">${mod.roman}</span>
        <span>${title}</span>
      </div>
      <ul class="nav-children">`;

    for (const ch of mod.chapters) {
      const fn = chapFilename(ch);
      const relPath = `${mod.path.replace(/^pages\//, '')}/${fn}`;
      const isCurrent = here === relPath;
      const url = `${root}${mod.path}/${fn}`;
      const ctitle = lang === 'zh' ? ch.title_zh : ch.title_en;
      const done = (progress[relPath] && progress[relPath].done) ? ' <span class="done">●</span>' : '';
      const num = ch.n ? `<span class="num">${ch.n}</span>` : '';
      if (ch.built) {
        html += `<li><a href="${url}" class="${isCurrent ? 'current' : ''}">${num}${ctitle}${done}</a></li>`;
      } else {
        const soon = lang === 'zh' ? '稍后' : 'soon';
        html += `<li><span class="upcoming" title="${lang === 'zh' ? '本章稍后开放' : 'Coming soon'}">${num}${ctitle}<em class="soon">${soon}</em></span></li>`;
      }
    }
    html += `</ul></div>`;
  }
  html += `</div>`;
  return html;
}

function chapFilename(ch) {
  return ch.n ? `${ch.n}-${ch.slug}.html` : `${ch.slug}.html`;
}
