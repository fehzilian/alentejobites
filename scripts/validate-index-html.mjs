import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');

const startsLikeHtml = /^\ufeff?\s*(?:<!doctype\s+html>|<html\b)/i.test(html);
if (!startsLikeHtml) {
  const preview = html.slice(0, 120).replace(/\n/g, '\\n');
  console.error(`❌ index.html does not start with valid HTML. Preview: ${preview}`);
  process.exit(1);
}

const forbiddenMarkers = [
  'git apply --3way',
  'diff --git a/index.html b/index.html',
  '*** Begin Patch',
  '*** End Patch',
  '<<<<<<<',
  '=======',
  '>>>>>>>',
];

const marker = forbiddenMarkers.find((item) => html.includes(item));
if (marker) {
  console.error(`❌ index.html contains patch/conflict marker: ${marker}`);
  process.exit(1);
}

if (!/<\/html\s*>/i.test(html)) {
  console.error('❌ index.html is missing closing </html> tag.');
  process.exit(1);
}

console.log('✅ index.html validation passed.');
