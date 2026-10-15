(() => {
  'use strict';

  function takeUrlPassword() {
    const url = new URL(window.location.href);
    let password = url.searchParams.get('password');
    let changed = url.searchParams.has('password');
    url.searchParams.delete('password');

    const fragment = new URLSearchParams(url.hash.slice(1));
    if (fragment.has('password')) {
      password = fragment.get('password');
      fragment.delete('password');
      url.hash = fragment.toString();
      changed = true;
    }

    if (changed) history.replaceState(history.state, '', url.pathname + url.search + url.hash);
    return password;
  }

  let urlPassword = takeUrlPassword();
  const form = document.getElementById('unlock-form');
  const input = document.getElementById('password');
  const button = document.getElementById('unlock-button');
  const status = document.getElementById('status');
  const toggle = document.getElementById('toggle-password');
  const progress = document.getElementById('download-progress');
  const baseUrl = new URL('.', location.href);
  const magic = new Uint8Array([87, 65, 71, 49]);
  const encoder = new TextEncoder();
  let encrypted;

  function failure(code) {
    const error = new Error(code);
    error.code = code;
    return error;
  }

  async function download(url, report, expectedBytes) {
    // Encrypted files can be cached safely; never cache a password or plaintext.
    for (let attempt = 0; attempt < 2; attempt++) {
      const controller = new AbortController();
      let idleTimer;
      const resetIdle = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => controller.abort(), 20000);
      };
      const deadline = setTimeout(() => controller.abort(), 180000);
      try {
        report(0, expectedBytes || 0, attempt);
        resetIdle();
        const response = await fetch(url, {
          cache: 'default', credentials: 'omit', referrerPolicy: 'no-referrer',
          signal: controller.signal
        });
        if (!response.ok) throw failure('network');
        const total = expectedBytes || Number(response.headers.get('content-length')) || 0;
        let bytes;
        if (response.body?.getReader) {
          const reader = response.body.getReader();
          const chunks = [];
          let received = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            received += value.length;
            resetIdle();
            report(received, total, attempt);
          }
          bytes = new Uint8Array(received);
          let offset = 0;
          for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
        } else {
          bytes = new Uint8Array(await response.arrayBuffer());
        }
        if (!bytes.length || (expectedBytes && bytes.length !== expectedBytes)) throw failure('network');
        report(bytes.length, bytes.length, attempt);
        return bytes;
      } catch {
        controller.abort();
        if (attempt === 1) throw failure('network');
      } finally {
        clearTimeout(idleTimer);
        clearTimeout(deadline);
      }
    }
  }

  function showProgress(element, received, total) {
    if (!element) return;
    element.hidden = false;
    if (total) { element.max = total; element.value = received; }
    else element.removeAttribute('value');
  }

  function downloadLabel(received, total) {
    return total ? Math.min(100, Math.round(received / total * 100)) + '%'
      : Math.round(received / 1024) + ' KB';
  }

  toggle.addEventListener('click', () => {
    const visible = input.type === 'password';
    input.type = visible ? 'text' : 'password';
    toggle.textContent = visible ? '隐藏' : '显示';
    toggle.setAttribute('aria-label', visible ? '隐藏密码' : '显示密码');
    toggle.setAttribute('aria-pressed', String(visible));
  });

  function decodeAsset(base64) {
    const data = atob(base64);
    const bytes = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) bytes[i] = data.charCodeAt(i);
    return bytes;
  }

  function replaceAssetPaths(text, urls) {
    for (const [path, url] of Object.entries(urls)) {
      text = text.split('https://enjundu.com/blog/working_agents/' + path).join(url);
      text = text.split('/blog/working_agents/' + path).join(url);
    }
    return text;
  }

  function openPreview(bundle) {
    const urls = {};
    const styles = [];
    for (const [path, asset] of Object.entries(bundle.assets)) {
      if (asset.type === 'text/css') styles.push([path, asset]);
      else urls[path] = URL.createObjectURL(new Blob([decodeAsset(asset.data)], { type: asset.type }));
    }
    for (const [path, asset] of styles) {
      const css = replaceAssetPaths(new TextDecoder().decode(decodeAsset(asset.data)), urls);
      urls[path] = URL.createObjectURL(new Blob([css], { type: 'text/css' }));
    }
    const documents = Object.entries(bundle.deferredAssets || {});
    const documentUrls = Object.fromEntries(documents.map(([path], i) => [path, '#private-document-' + i]));
    let html = replaceAssetPaths(replaceAssetPaths(bundle.html, documentUrls), urls);
    html = html.replace('</head>', '<meta name="robots" content="noindex,nofollow,noarchive"><meta name="referrer" content="no-referrer"><style>.private-lock-control{position:fixed;right:18px;bottom:18px;z-index:1000;padding:9px 15px;border:1px solid #d1dce8;border-radius:6px;background:#ffffffed;color:#3458da;box-shadow:0 3px 20px #172b3112;font:11px system-ui,sans-serif;cursor:pointer}</style></head>');
    html = html.replace('</body>', '<button class="private-lock-control" type="button" onclick="location.reload()" aria-label="Lock the private preview">锁定预览 · Lock</button></body>');
    input.value = '';
    document.open();
    document.write(html);
    document.close();
    installDocuments(documents);
  }

  function installDocuments(documents) {
    const ready = new Map();
    let busy = false;
    let notice;
    function notify(message, received, total) {
      if (!notice) {
        notice = document.createElement('div');
        notice.setAttribute('role', 'status');
        notice.setAttribute('aria-live', 'polite');
        notice.className = 'private-document-status';
        notice.style.cssText = 'position:fixed;bottom:65px;left:50%;transform:translateX(-50%);z-index:1001;max-width:calc(100vw - 36px);width:360px;padding:14px 18px;border:1px solid #d1dce8;border-radius:10px;background:#fff;color:#182b31;box-shadow:0 8px 30px #172b3120;font:14px/1.6 system-ui,sans-serif';
        notice.append(document.createElement('span'), document.createElement('progress'));
        notice.lastChild.style.cssText = 'display:block;width:100%;height:5px;margin-top:10px;accent-color:#3458da';
        document.body.append(notice);
      }
      notice.hidden = false;
      notice.firstChild.textContent = message;
      if (received === undefined) notice.lastChild.hidden = true;
      else showProgress(notice.lastChild, received, total);
    }
    document.addEventListener('click', async event => {
      const link = event.target.closest?.('a[href^="#private-document-"]');
      if (!link) return;
      event.preventDefault();
      if (busy) return;
      const match = link.getAttribute('href').match(/^#private-document-(\d+)(#.*)?$/);
      if (!match || !documents[Number(match[1])]) return;
      const index = Number(match[1]);
      const asset = documents[index][1];
      const fragment = match[2] || '';
      const popup = window.open('about:blank', '_blank');
      if (popup) {
        popup.opener = null;
        popup.document.title = 'Loading private paper…';
        popup.document.body.style.cssText = 'font:16px/1.7 system-ui;padding:10vh 10vw;color:#182b31;background:#f8faf8';
        popup.document.body.textContent = '正在加载加密论文… Loading the private paper…';
        const referrer = popup.document.createElement('meta');
        referrer.name = 'referrer'; referrer.content = 'no-referrer';
        popup.document.head.append(referrer);
      }
      busy = true;
      link.setAttribute('aria-busy', 'true');
      try {
        if (!ready.has(index)) {
          const bytes = await download(new URL(asset.file, baseUrl), (received, total, attempt) => {
            const message = (attempt ? '正在重试加载论文 ' : '正在加载论文 ') + downloadLabel(received, total);
            notify(message, received, total);
            try { if (popup && !popup.closed) popup.document.body.textContent = message; } catch {}
          }, asset.bytes);
          const documentMagic = new Uint8Array([87, 65, 70, 49]);
          if (bytes.length < 32 || documentMagic.some((byte, i) => bytes[i] !== byte)) throw failure('document');
          const key = await crypto.subtle.importKey('raw', decodeAsset(asset.key), 'AES-GCM', false, ['decrypt']);
          const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: bytes.slice(4, 16), additionalData: documentMagic, tagLength: 128 }, key, bytes.slice(16));
          ready.set(index, URL.createObjectURL(new Blob([plaintext], { type: asset.type })));
        }
        const url = ready.get(index) + fragment;
        link.href = url;
        if (popup && !popup.closed) {
          popup.location.replace(url);
          if (notice) notice.hidden = true;
        } else notify('论文已准备好，请再次点击论文链接打开。');
      } catch (error) {
        const message = error.code === 'network'
          ? '论文下载中断，请再次点击重试。网页仍可正常阅读。'
          : '论文加载失败，请刷新页面后重试。';
        notify(message);
        try { if (popup && !popup.closed) popup.document.body.textContent = message; } catch {}
      } finally {
        busy = false;
        link.removeAttribute('aria-busy');
      }
    });
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const password = input.value.trim();
    if (!password || button.disabled) return;
    if (!window.isSecureContext || !window.crypto?.subtle) {
      status.textContent = '请使用支持加密功能的浏览器，并通过 HTTPS 打开页面。';
      return;
    }
    button.disabled = true;
    input.readOnly = true;
    form.setAttribute('aria-busy', 'true');
    button.textContent = '正在加载预览…';
    status.style.color = '#6b7d86';
    try {
      if (!encrypted) {
        encrypted = await download(new URL('encrypted-preview.bin?v=9', baseUrl), (received, total, attempt) => {
          button.textContent = (attempt ? '正在重试 ' : '正在加载预览 ') + downloadLabel(received, total);
          status.textContent = '首次打开需要下载加密页面，请稍候。';
          showProgress(progress, received, total);
        });
      }
      if (encrypted.length < 48 || magic.some((byte, i) => encrypted[i] !== byte)) { encrypted = null; throw failure('unavailable'); }
      button.textContent = '正在验证密码…';
      status.textContent = '下载完成，正在本机解密。';
      const material = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: encrypted.slice(4, 20), iterations: 600000, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
      let plaintext;
      try {
        plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: encrypted.slice(20, 32), additionalData: magic, tagLength: 128 }, key, encrypted.slice(32));
      } catch (error) {
        if (error.name === 'OperationError') throw failure('password');
        throw error;
      }
      button.textContent = '正在打开页面…';
      openPreview(JSON.parse(new TextDecoder().decode(plaintext)));
    } catch (error) {
      status.style.color = '#a44f42';
      status.textContent = error.code === 'password' ? '密码不正确，请重试。'
        : error.code === 'network' ? '网络连接中断，未能完成下载。请点击解锁重试，无需更换密码。'
        : '预览文件未能正常打开，请刷新页面后重试。';
      button.disabled = false;
      input.readOnly = false;
      form.setAttribute('aria-busy', 'false');
      if (progress) progress.hidden = true;
      button.innerHTML = '解锁预览 <span aria-hidden="true">→</span>';
      input.focus();
    }
  });

  function unlockFromPasswordLink(password) {
    if (!password || button.disabled) return;
    input.value = password;
    form.requestSubmit();
  }

  // Pasting a fragment link into an already open lock screen does not reload it.
  window.addEventListener('hashchange', () => unlockFromPasswordLink(takeUrlPassword()));
  unlockFromPasswordLink(urlPassword);
  urlPassword = null;
})();
