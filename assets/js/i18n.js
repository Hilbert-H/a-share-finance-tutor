// ===========================================================================
// i18n.js — 中英双语切换
// 实现极简: 用 html[data-lang] + CSS 控制可见性, 切换状态存 localStorage
// ===========================================================================

const KEY = 'site.lang';

export function initLang() {
  const saved = localStorage.getItem(KEY);
  const lang = (saved === 'zh' || saved === 'en') ? saved : 'zh';
  applyLang(lang);
  // 监听切换按钮(在 topbar 中)
  const btn = document.querySelector('[data-lang-toggle]');
  if (btn) {
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-lang') || 'zh';
      applyLang(cur === 'zh' ? 'en' : 'zh');
    });
  }
}

export function applyLang(lang) {
  document.documentElement.setAttribute('data-lang', lang);
  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
  localStorage.setItem(KEY, lang);
  // 切换 topbar 按钮内 active 高亮
  document.querySelectorAll('.lang-toggle [data-lang-opt]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang-opt') === lang);
  });
  // 通知其他组件重新渲染 (例如 TOC, 因为标题文字会变)
  window.dispatchEvent(new CustomEvent('lang:changed', { detail: { lang } }));
}

export function currentLang() {
  return document.documentElement.getAttribute('data-lang') || 'zh';
}

// 取一个带 lang 子元素的容器的当前文本
export function pickLangText(el) {
  if (!el) return '';
  const lang = currentLang();
  const m = el.querySelector(`[lang="${lang}"]`);
  if (m) return m.textContent.trim();
  return el.textContent.trim();
}
