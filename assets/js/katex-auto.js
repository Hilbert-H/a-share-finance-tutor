// ===========================================================================
// katex-auto.js — KaTeX auto-render glue
// 等待 KaTeX 全局加载后, 渲染 .lesson 内的 $...$ 与 $$...$$
// ===========================================================================

export function initKatex() {
  const trigger = () => {
    if (window.renderMathInElement) {
      const root = document.querySelector('.lesson') || document.body;
      try {
        window.renderMathInElement(root, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
          ],
          throwOnError: false,
          ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
        });
      } catch (e) { console.warn('KaTeX render error:', e); }
    } else {
      // KaTeX still loading — retry
      setTimeout(trigger, 60);
    }
  };
  if (document.readyState === 'complete') trigger();
  else window.addEventListener('load', trigger);
  window.addEventListener('lang:changed', () => setTimeout(trigger, 30));
}
