// ===========================================================================
// quiz.js — 检验题折叠 + 自评进度记录
// ===========================================================================

import { currentPagePath, readProgress, writeProgress } from './progress.js';

export function initQuiz() {
  const items = document.querySelectorAll('.quiz-item');
  if (!items.length) return;

  const path = currentPagePath();
  const prog = readProgress();
  const pageProg = prog[path] || (prog[path] = {});
  const quizState = pageProg.quizzes || (pageProg.quizzes = {});

  items.forEach((el, i) => {
    const qid = el.getAttribute('data-qid') || `q${i + 1}`;
    // restore self-eval state
    const saved = quizState[qid];
    if (saved) {
      const b = el.querySelector(`.quiz-self button[data-state="${saved}"]`);
      if (b) {
        el.querySelectorAll('.quiz-self button').forEach(x => x.removeAttribute('data-active'));
        b.setAttribute('data-active', '1');
      }
    }
    // toggle answer
    const tog = el.querySelector('.quiz-toggle');
    if (tog) {
      tog.addEventListener('click', () => {
        const open = el.getAttribute('data-open') === 'true';
        el.setAttribute('data-open', open ? 'false' : 'true');
      });
    }
    // self-eval
    el.querySelectorAll('.quiz-self button').forEach(btn => {
      btn.addEventListener('click', () => {
        const state = btn.getAttribute('data-state');
        quizState[qid] = state;
        el.querySelectorAll('.quiz-self button').forEach(x => x.removeAttribute('data-active'));
        btn.setAttribute('data-active', '1');
        writeProgress(prog);
        window.dispatchEvent(new CustomEvent('progress:changed'));
      });
    });
  });
}
