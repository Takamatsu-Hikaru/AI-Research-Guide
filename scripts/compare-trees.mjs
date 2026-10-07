// Regression gate: compare two build-output trees by relative path and SHA-256.
// Used to prove a refactor left the published site byte-identical. Portable
// across Windows/Git Bash, unlike `diff -r`. Usage:
//   node scripts/compare-trees.mjs <before-dir> <after-dir> [--exclude <name>]
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const [before, after, ...rest] = process.argv.slice(2);
if (!before || !after) {
  console.error('usage: node scripts/compare-trees.mjs <before-dir> <after-dir> [--exclude <relative-path>]');
  process.exit(2);
}
const excludeFlag = rest.indexOf('--exclude');
const exclude = excludeFlag >= 0 ? rest[excludeFlag + 1] : null;

const walk = (dir, base = dir, acc = new Map()) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(base, full).split(path.sep).join('/');
    if (entry.isDirectory()) walk(full, base, acc);
    else acc.set(rel, crypto.createHash('sha256').update(fs.readFileSync(full)).digest('hex'));
  }
  return acc;
};

const a = walk(before);
const b = walk(after);
const keep = (rel) => !exclude || !(rel === exclude || rel.startsWith(exclude + '/'));

const onlyBefore = [...a.keys()].filter(k => keep(k) && !b.has(k)).sort();
const onlyAfter = [...b.keys()].filter(k => keep(k) && !a.has(k)).sort();
const changed = [...a.keys()].filter(k => keep(k) && b.has(k) && a.get(k) !== b.get(k)).sort();

for (const k of onlyBefore) console.log(`only in before: ${k}`);
for (const k of onlyAfter) console.log(`only in after:  ${k}`);
for (const k of changed) console.log(`changed:        ${k}`);

const checked = [...a.keys()].filter(keep).length;
if (onlyBefore.length || onlyAfter.length || changed.length) {
  console.log(`\nDIFFERS — ${onlyBefore.length} removed, ${onlyAfter.length} added, ${changed.length} changed (of ${checked} checked)`);
  process.exit(1);
}
console.log(`identical — ${checked} files match by SHA-256`);
