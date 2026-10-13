import { readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve, relative, extname, join } from 'node:path';
import { randomBytes, webcrypto } from 'node:crypto';

// Run locally. Plaintext input and the generated password must stay outside Git.
// Optional --password-stdin reads a password without putting it in command arguments.
const args = process.argv.slice(2);
const value = name => args[args.indexOf(name) + 1];
for (const name of ['--html', '--assets', '--output']) {
  if (!args.includes(name) || !value(name)) throw new Error('Required: --html PATH --assets DIRECTORY --output PATH');
}
let password;
if (args.includes('--password-stdin')) {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  password = Buffer.concat(chunks).toString('utf8').replace(/\r?\n$/, '');
  if (password.length < 20) throw new Error('Use a password of at least 20 characters.');
} else {
  password = randomBytes(16).toString('hex').match(/.{8}/g).join('-');
}
const types = { '.css': 'text/css', '.js': 'text/javascript', '.pdf': 'application/pdf', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.txt': 'text/plain' };
const assets = {};
const root = resolve(value('--assets'));
async function collect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await collect(path);
    else if (entry.isFile()) assets[relative(root, path).split('\\').join('/')] = { type: types[extname(path)] || 'application/octet-stream', data: (await readFile(path)).toString('base64') };
  }
}
await collect(root);
let html = await readFile(resolve(value('--html')), 'utf8');
html = html.replace(/<meta\b[^>]*(?:property=["']og:|name=["']twitter:)[^>]*>/gi, '');
const payload = Buffer.from(JSON.stringify({ version: 1, html, assets }));
const magic = Buffer.from('WAG1');
const salt = randomBytes(16);
const iv = randomBytes(12);
const material = await webcrypto.subtle.importKey('raw', Buffer.from(password), 'PBKDF2', false, ['deriveKey']);
const key = await webcrypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 600000, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
const encrypted = Buffer.from(await webcrypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: magic, tagLength: 128 }, key, payload));
const recovered = await webcrypto.subtle.decrypt({ name: 'AES-GCM', iv, additionalData: magic, tagLength: 128 }, key, encrypted);
if (!Buffer.from(recovered).equals(payload)) throw new Error('Round-trip verification failed');
const tampered = Buffer.from(encrypted);
tampered[0] ^= 1;
let rejected = false;
try { await webcrypto.subtle.decrypt({ name: 'AES-GCM', iv, additionalData: magic, tagLength: 128 }, key, tampered); } catch { rejected = true; }
if (!rejected) throw new Error('Integrity verification failed');
const output = Buffer.concat([magic, salt, iv, encrypted]);
await writeFile(resolve(value('--output')), output);
console.log(JSON.stringify({ ...(args.includes('--password-stdin') ? {} : { password }), bytes: output.length, assets: Object.keys(assets).length, integrity: 'verified' }));
