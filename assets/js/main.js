// ===========================================================================
// main.js — Entry point
// 各 import 带 ?v=N 防止 ES module 缓存; 升级各子模块时同步 bump.
// ===========================================================================

import { initLang } from './i18n.js?v=9';
import { initNav } from './nav.js?v=9';
import { initToc } from './toc.js?v=9';
import { initProgress } from './progress.js?v=9';
import { initQuiz } from './quiz.js?v=9';
import { initSearch } from './search.js?v=9';
import { initChat } from './chat.js?v=9';
import { initKatex } from './katex-auto.js?v=9';

document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initNav();
  initToc();
  initProgress();
  initQuiz();
  initSearch();
  initChat();
  initKatex();
});
