// ===========================================================================
// chat.js — AI 问答 (Anthropic API, claude-opus-4-7)
// 浏览器直连 https://api.anthropic.com/v1/messages
// 需要 header: anthropic-dangerous-direct-browser-access: true
// Opus 4.7 注意: 不传 temperature/top_p/budget_tokens. 用 thinking:adaptive + effort.
// ===========================================================================

import { currentLang, pickLangText } from './i18n.js';

const MODEL = 'claude-opus-4-7';
const KEY_NAME = 'site.anthropicKey';
const HISTORY_KEY = 'site.chatHistory';
const MAX_HISTORY = 12;

let panel, log, input, sendBtn, setupBox;
let openState = false;
let messages = [];   // [{role, content}]
let inflight = null;

export function initChat() {
  panel = document.querySelector('.chat-panel');
  if (!panel) return;
  log = panel.querySelector('.chat-log');
  input = panel.querySelector('.chat-input textarea');
  sendBtn = panel.querySelector('.chat-input .send');
  setupBox = panel.querySelector('.chat-setup');

  const fab = document.querySelector('.chat-fab');
  if (fab) fab.addEventListener('click', toggle);
  panel.querySelector('[data-chat-close]')?.addEventListener('click', toggle);

  panel.querySelector('[data-key-save]')?.addEventListener('click', saveKey);
  panel.querySelector('[data-key-reset]')?.addEventListener('click', resetKey);

  sendBtn?.addEventListener('click', send);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  input?.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  loadHistory();
  refreshKeyUi();
}

function toggle() {
  openState = !openState;
  panel.classList.toggle('open', openState);
  if (openState) {
    refreshKeyUi();
    input?.focus();
    scrollDown();
  }
}

function refreshKeyUi() {
  const has = !!localStorage.getItem(KEY_NAME);
  setupBox.style.display = has ? 'none' : 'flex';
  log.style.display = has ? 'flex' : 'none';
  panel.querySelector('.chat-input').style.display = has ? 'flex' : 'none';
}

function saveKey() {
  const k = panel.querySelector('[data-key-input]').value.trim();
  if (!k) return;
  if (!k.startsWith('sk-ant-')) {
    alert(currentLang() === 'zh'
      ? '看起来不是 Anthropic API key (sk-ant-...)。'
      : 'Doesn\'t look like an Anthropic API key (sk-ant-...).');
    return;
  }
  localStorage.setItem(KEY_NAME, k);
  refreshKeyUi();
}

function resetKey() {
  if (!confirm(currentLang() === 'zh' ? '清除已保存的 API key?' : 'Clear saved API key?')) return;
  localStorage.removeItem(KEY_NAME);
  refreshKeyUi();
}

function loadHistory() {
  try { messages = JSON.parse(sessionStorage.getItem(HISTORY_KEY) || '[]'); }
  catch { messages = []; }
  log.innerHTML = '';
  // Replay
  for (const m of messages) appendMsg(m.role, m.contentText, false);
  // Greeting if empty
  if (!messages.length) {
    const greet = currentLang() === 'zh'
      ? '你好。我是本站教学助手, 基于当前章节内容回答问题. 比如:「为什么 OCF 加回折旧?」或「Beneish M-Score 第三项的直觉是什么?」'
      : "Hi — I'm the site's tutor. I answer based on the current chapter. Try: 'Why is depreciation added back in OCF?' or 'What's the intuition behind Beneish M-Score\\'s DSRI?'";
    appendMsg('assistant', greet, false);
  }
}

function saveHistory() {
  // trim to last N turns
  const trimmed = messages.slice(-MAX_HISTORY);
  sessionStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
}

function appendMsg(role, text, push = true) {
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  const roleLabel = role === 'user'
    ? (currentLang() === 'zh' ? '你' : 'You')
    : role === 'assistant'
      ? (currentLang() === 'zh' ? '助手' : 'Assistant')
      : (role === 'thinking' ? '...' : role);
  div.innerHTML = `<span class="role">${escapeHtml(roleLabel)}</span><div class="body"></div>`;
  div.querySelector('.body').textContent = text;
  log.appendChild(div);
  if (push) {
    messages.push({ role: role === 'thinking' ? 'assistant' : role, contentText: text });
    saveHistory();
  }
  scrollDown();
  return div;
}

function scrollDown() {
  if (!log) return;
  log.scrollTop = log.scrollHeight;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' }[c]));
}

function pageContext() {
  // Capture title + visible H2 list + lesson meta to bias model toward current chapter
  const h1 = document.querySelector('.lesson h1, .home h1');
  const meta = document.querySelector('.lesson-meta');
  const sections = Array.from(document.querySelectorAll('.lesson h2'))
    .map(h => pickLangText(h)).slice(0, 12);
  const title = h1 ? pickLangText(h1) : 'A-Share Finance Tutor';
  const here = location.pathname.match(/pages\/(.+)$/)?.[1] || 'index';
  const lang = currentLang();
  return { title, meta: meta ? meta.textContent.trim() : '', sections, path: here, lang };
}

function buildSystem() {
  const c = pageContext();
  const langLine = c.lang === 'zh'
    ? '请用中文回答, 保留专业术语的英文原文(如 CAPM, WACC, DSRI 等)。'
    : 'Reply in English. Keep Chinese-only terms (e.g., 关联方) with parenthetical translations on first use.';
  return [
`你是「从会计学到证券投资学」本地教学站点的 AI 助教。读者是工科 PhD, 数理基础好但金融会计零基础, 偏好 first-principles 推导 + 工程/物理类比。

# 角色与立场
- 优先用本站章节内的概念框架回答。需要引用时, 写形如「见 m1-accounting/08-cashflow.html」的相对路径。
- 涉及 A 股案例, 给公司名 + 股票代码 + 报告期 + 具体数字。已退市公司请标注 [已退市]。
- 数学/会计公式使用 LaTeX, 用 $...$ 表示行内, $$...$$ 表示块。
- 不确定的事实直说不知道, 不要编造具体数字。
- 回答要密度高, 跳过 textbook 套话。

# 当前章节上下文
- 路径: ${c.path}
- 章节标题: ${c.title}
- 元信息: ${c.meta}
- 主要小节: ${c.sections.join(' · ')}

# 语言
${langLine}`
  ];
}

async function send() {
  const text = (input?.value || '').trim();
  if (!text || inflight) return;
  const key = localStorage.getItem(KEY_NAME);
  if (!key) { refreshKeyUi(); return; }

  appendMsg('user', text, true);
  input.value = '';
  input.style.height = 'auto';
  sendBtn.setAttribute('disabled', '1');

  const assistantDiv = document.createElement('div');
  assistantDiv.className = 'chat-msg assistant';
  assistantDiv.innerHTML = `<span class="role">${currentLang() === 'zh' ? '助手' : 'Assistant'}</span><div class="body"></div>`;
  log.appendChild(assistantDiv);
  const body = assistantDiv.querySelector('.body');
  scrollDown();

  // Build messages payload (last N + new turn)
  const apiMsgs = messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({ role: m.role, content: [{ type: 'text', text: m.contentText }] }));

  const payload = {
    model: MODEL,
    max_tokens: 4096,
    system: buildSystem(),
    thinking: { type: 'adaptive', display: 'summarized' },
    output_config: { effort: 'high' },
    messages: apiMsgs,
    stream: true
  };

  try {
    inflight = new AbortController();
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify(payload),
      signal: inflight.signal
    });

    if (!resp.ok || !resp.body) {
      let errText = '';
      try { errText = await resp.text(); } catch {}
      throw new Error(`API ${resp.status}: ${errText.slice(0, 500)}`);
    }

    const reader = resp.body.getReader();
    const dec = new TextDecoder();
    let buf = '';
    let collected = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split(/\r?\n/);
      buf = lines.pop() || '';
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        try {
          const ev = JSON.parse(data);
          if (ev.type === 'content_block_delta' && ev.delta?.type === 'text_delta') {
            collected += ev.delta.text;
            body.textContent = collected;
            scrollDown();
          }
          if (ev.type === 'message_stop') { /* end */ }
        } catch { /* swallow malformed */ }
      }
    }

    if (collected) {
      messages.push({ role: 'assistant', contentText: collected });
      saveHistory();
      // Trigger KaTeX render on this new block if it has math
      if (window.renderMathInElement) {
        try {
          window.renderMathInElement(body, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        } catch {}
      }
    } else {
      assistantDiv.classList.add('error');
      body.textContent = currentLang() === 'zh'
        ? '(没收到回复, 请重试或检查 API key)'
        : '(No response — retry or check the API key.)';
    }
  } catch (e) {
    assistantDiv.classList.add('error');
    body.textContent = (currentLang() === 'zh' ? '出错: ' : 'Error: ') + (e.message || String(e));
  } finally {
    inflight = null;
    sendBtn.removeAttribute('disabled');
  }
}
