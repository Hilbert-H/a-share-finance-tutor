// ===========================================================================
// toc.js — 右侧浮动 TOC, 自动从 .lesson 内 H2/H3 生成
// IntersectionObserver 高亮当前节
// ===========================================================================

export function initToc() {
  const tocEl = document.querySelector('.toc');
  const lesson = document.querySelector('.lesson');
  if (!tocEl || !lesson) return;

  buildToc(tocEl, lesson);
  window.addEventListener('lang:changed', () => buildToc(tocEl, lesson));
}

function buildToc(tocEl, lesson) {
  const headings = lesson.querySelectorAll('h2, h3');
  if (!headings.length) { tocEl.style.display = 'none'; return; }

  const lang = document.documentElement.getAttribute('data-lang') || 'zh';
  const tocTitle = lang === 'zh' ? '本页索引' : 'On this page';

  let html = `<div class="toc-title">${tocTitle}</div><ol>`;
  headings.forEach((h, i) => {
    if (!h.id) h.id = slug(textForLang(h, lang), i);
    const level = h.tagName.toLowerCase();
    const txt = textForLang(h, lang);
    html += `<li class="${level}"><a href="#${h.id}">${escapeHtml(txt)}</a></li>`;
  });
  html += '</ol>';
  tocEl.innerHTML = html;

  // IntersectionObserver to highlight current section
  const links = Array.from(tocEl.querySelectorAll('a'));
  const map = new Map();
  links.forEach(a => map.set(a.getAttribute('href').slice(1), a));

  const seen = new Set();
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      const a = map.get(en.target.id);
      if (!a) return;
      if (en.isIntersecting) seen.add(en.target.id);
      else seen.delete(en.target.id);
    });
    // mark the topmost visible heading
    links.forEach(l => l.classList.remove('active'));
    for (const h of headings) {
      if (seen.has(h.id)) {
        map.get(h.id).classList.add('active');
        break;
      }
    }
  }, { rootMargin: '-80px 0px -70% 0px', threshold: 0 });

  headings.forEach(h => obs.observe(h));
}

function textForLang(h, lang) {
  // Prefer matching lang span text
  const m = h.querySelector(`[lang="${lang}"]`);
  if (m) return m.textContent.trim();
  return h.textContent.trim();
}

function slug(s, i) {
  return 's-' + (i + 1) + '-' + s.toLowerCase()
    .replace(/[^一-龥a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
}

function escapeHtml(s) {
  return s.replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
}
