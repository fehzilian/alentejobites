import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const trimmed = html.trimStart();

const hasValidStart = trimmed.startsWith('<!DOCTYPE html>') || trimmed.startsWith('<html');
if (!hasValidStart) {
  console.error('❌ index.html does not start with valid HTML.');
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
  console.error(`❌ index.html contains patch text marker: ${marker}`);
  process.exit(1);
}

if (!html.includes('</html>')) {
  console.error('❌ index.html is missing closing </html> tag.');
  process.exit(1);
}

console.log('✅ index.html validation passed.');
