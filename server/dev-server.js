#!/usr/bin/env node
'use strict';

/**
 * Локальний статичний сервер для сайту «Hoi! Nederlands».
 *
 * Без жодних залежностей — потрібен лише Node.js 18+.
 * Запуск: `npm start` (або `node server/dev-server.js`).
 *
 * Змінні середовища:
 *   PORT      — стартовий порт (типово 4173). Якщо зайнятий, візьме наступний вільний.
 *   HOST      — інтерфейс для прослуховування (типово 127.0.0.1).
 *   SITE_DIR  — тека з index.html (типово визначається автоматично).
 */

const http = require('node:http');
const fs = require('node:fs');
const fsp = require('node:fs/promises');
const path = require('node:path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const HOST = process.env.HOST || '127.0.0.1';
const START_PORT = Number.parseInt(process.env.PORT, 10) || 4173;
const MAX_PORT_ATTEMPTS = 20;

/**
 * Тека, з якої роздаються файли.
 *
 * Визначається автоматично, щоб сервер працював і з пласкою структурою
 * (index.html у корені), і після переїзду статики в `public/`.
 */
const SITE_DIR = resolveSiteDir();

function resolveSiteDir() {
  if (process.env.SITE_DIR) {
    return path.resolve(PROJECT_ROOT, process.env.SITE_DIR);
  }
  const candidates = [path.join(PROJECT_ROOT, 'public'), PROJECT_ROOT];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, 'index.html'))) return dir;
  }
  return PROJECT_ROOT;
}

const MIME_TYPES = new Map(
  Object.entries({
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.webmanifest': 'application/manifest+json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
  })
);

function contentTypeFor(filePath) {
  return MIME_TYPES.get(path.extname(filePath).toLowerCase()) || 'application/octet-stream';
}

/**
 * Перетворює URL запиту на безпечний абсолютний шлях усередині SITE_DIR.
 * Повертає null, якщо шлях намагається вийти за межі теки (path traversal).
 */
function toSafePath(requestUrl) {
  const { pathname } = new URL(requestUrl, 'http://localhost');

  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null; // некоректне %-кодування
  }

  const relative = decoded.replace(/^\/+/, '');
  const resolved = path.resolve(SITE_DIR, relative);

  if (resolved !== SITE_DIR && !resolved.startsWith(SITE_DIR + path.sep)) {
    return null;
  }
  return resolved;
}

async function statOrNull(filePath) {
  try {
    return await fsp.stat(filePath);
  } catch {
    return null;
  }
}

/**
 * Знаходить файл для віддачі: сам файл, index.html у теці,
 * або index.html як fallback для клієнтської маршрутизації.
 */
async function resolveFile(candidate) {
  const stats = await statOrNull(candidate);

  if (stats?.isFile()) return candidate;

  if (stats?.isDirectory()) {
    const indexPath = path.join(candidate, 'index.html');
    if ((await statOrNull(indexPath))?.isFile()) return indexPath;
    return null;
  }

  // Шлях без розширення — віддаємо SPA-оболонку.
  if (!path.extname(candidate)) {
    const shell = path.join(SITE_DIR, 'index.html');
    if ((await statOrNull(shell))?.isFile()) return shell;
  }

  return null;
}

function sendError(res, status, message) {
  const body = `${status} ${message}\n`;
  res.writeHead(status, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

async function handleRequest(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return sendError(res, 405, 'Method Not Allowed');
  }

  const candidate = toSafePath(req.url);
  if (!candidate) return sendError(res, 400, 'Bad Request');

  const filePath = await resolveFile(candidate);
  if (!filePath) return sendError(res, 404, 'Not Found');

  const stats = await statOrNull(filePath);
  if (!stats) return sendError(res, 404, 'Not Found');

  res.writeHead(200, {
    'Content-Type': contentTypeFor(filePath),
    'Content-Length': stats.size,
    // Локальна розробка: браузер не має кешувати правки.
    'Cache-Control': 'no-cache, no-store, must-revalidate',
  });

  if (req.method === 'HEAD') return res.end();

  const stream = fs.createReadStream(filePath);
  stream.on('error', () => res.destroy());
  stream.pipe(res);
}

const server = http.createServer((req, res) => {
  handleRequest(req, res).catch((error) => {
    console.error(`[dev-server] ${req.method} ${req.url}:`, error);
    if (!res.headersSent) sendError(res, 500, 'Internal Server Error');
    else res.destroy();
  });
});

/** Пробує зайняти порт, а якщо він зайнятий — наступні (до MAX_PORT_ATTEMPTS). */
function listen(port, attemptsLeft) {
  server.once('error', (error) => {
    if (error.code === 'EADDRINUSE' && attemptsLeft > 0) {
      console.warn(`[dev-server] Порт ${port} зайнятий, пробую ${port + 1}…`);
      listen(port + 1, attemptsLeft - 1);
      return;
    }
    console.error('[dev-server] Не вдалося запустити сервер:', error.message);
    process.exit(1);
  });

  server.listen(port, HOST, () => {
    console.log('');
    console.log('  Hoi! Nederlands — локальний сервер запущено');
    console.log(`  → http://${HOST}:${port}`);
    console.log(`  Тека: ${SITE_DIR}`);
    console.log('  Зупинити: Ctrl+C');
    console.log('');
  });
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}

listen(START_PORT, MAX_PORT_ATTEMPTS);
