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
  const magic = new Uint8Array([87, 65, 71, 49]);
  const encoder = new TextEncoder();
  let encrypted;

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
    let html = replaceAssetPaths(bundle.html, urls);
    html = html.replace('</head>', '<meta name="robots" content="noindex,nofollow,noarchive"><meta name="referrer" content="no-referrer"><style>.private-lock-control{position:fixed;right:18px;bottom:18px;z-index:1000;padding:9px 15px;border:1px solid #d1dce8;border-radius:6px;background:#ffffffed;color:#3458da;box-shadow:0 3px 20px #172b3112;font:11px system-ui,sans-serif;cursor:pointer}</style></head>');
    html = html.replace('</body>', '<button class="private-lock-control" type="button" onclick="location.reload()" aria-label="Lock the private preview">锁定预览 · Lock</button></body>');
    input.value = '';
    document.open();
    document.write(html);
    document.close();
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!input.value || button.disabled) return;
    if (!window.isSecureContext || !window.crypto?.subtle) {
      status.textContent = '请使用支持加密功能的浏览器，并通过 HTTPS 打开页面。';
      return;
    }
    button.disabled = true;
    button.textContent = '正在解锁…';
    status.textContent = '';
    try {
      if (!encrypted) {
        const response = await fetch('encrypted-survey.bin?v=5', { cache: 'no-store', credentials: 'omit', referrerPolicy: 'no-referrer' });
        if (!response.ok) throw new Error('unavailable');
        encrypted = new Uint8Array(await response.arrayBuffer());
      }
      if (encrypted.length < 48 || magic.some((byte, i) => encrypted[i] !== byte)) throw new Error('unavailable');
      const material = await crypto.subtle.importKey('raw', encoder.encode(input.value), 'PBKDF2', false, ['deriveKey']);
      const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: encrypted.slice(4, 20), iterations: 600000, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
      const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: encrypted.slice(20, 32), additionalData: magic, tagLength: 128 }, key, encrypted.slice(32));
      openPreview(JSON.parse(new TextDecoder().decode(plaintext)));
    } catch (error) {
      status.textContent = error.message === 'unavailable' ? '暂时无法加载预览，请稍后重试。' : '密码不正确，请重试。';
      button.disabled = false;
      button.innerHTML = '解锁预览 <span aria-hidden="true">→</span>';
      input.focus();
    }
  });

  if (urlPassword) {
    input.value = urlPassword;
    urlPassword = null;
    form.requestSubmit();
  }
})();
