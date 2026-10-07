// Invariants for the second (uestc-skinned) edition.
//
// These exist because the skin reuses the first edition's HTML fragments and
// browser JS verbatim, which makes three classes of breakage silent:
//   · a missing JS-bound id — guide.js:3 dereferences #theme first and would
//     throw, killing the menu, search, QA expansion and paper dialogs;
//   · a wrong asset prefix — the second edition sits one directory deeper, and
//     some asset paths are authored in Markdown no template can reach;
//   · a token the skin forgot to define — the fragments then fall back to the
//     first edition's palette (or a JS default) and quietly look wrong.
// Run with: npm test   (node --test, no dependencies)
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { assertAssetsResolve } from '../scripts/guide-verify.mjs';
import { redirectPage, vercelConfig } from '../scripts/guide-shell-uestc.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const guide = path.join(root, 'public/blog/guide');
const uestc = path.join(guide, 'guide-uestc');
const LANGS = ['zh', 'en'];

test('both editions build', () => {
  execFileSync(process.execPath, ['scripts/build-guide.mjs'], { cwd: root, stdio: 'pipe' });
  execFileSync(process.execPath, ['scripts/build-guide-uestc.mjs'], { cwd: root, stdio: 'pipe' });
});

const pagesOf = (dir, lang) =>
  fs.readdirSync(path.join(dir, lang)).filter(f => f.endsWith('.html')).sort();

test('both editions emit the same page set', () => {
  for (const lang of LANGS) {
    const a = pagesOf(guide, lang);
    const b = pagesOf(uestc, lang);
    assert.equal(a.length, 40, `${lang}: expected 40 default pages, got ${a.length}`);
    assert.deepEqual(b, a, `${lang}: page sets differ between editions`);
  }
});

// Derived from the browser JS rather than hardcoded, so adding a binding to
// guide.js/fieldnotes.js/ama.js fails this test until the shell carries it.
const boundIds = () => {
  const ids = new Set();
  for (const file of ['guide.js', 'fieldnotes.js', 'ama.js']) {
    const src = fs.readFileSync(path.join(guide, file), 'utf8');
    for (const m of src.matchAll(/\$\('([A-Za-z][\w-]*)'\)/g)) ids.add(m[1]);
    for (const m of src.matchAll(/getElementById\('([A-Za-z][\w-]*)'\)/g)) ids.add(m[1]);
    for (const m of src.matchAll(/querySelector(?:All)?\('#([A-Za-z][\w-]*)'\)/g)) ids.add(m[1]);
  }
  return [...ids].sort();
};

test('#theme survives — guide.js dereferences it before anything else', () => {
  // guide.js:3 is `$('theme').onclick=...` as the IIFE's first statement. If the
  // element is absent the whole script throws and every other binding is lost.
  for (const lang of LANGS)
    for (const page of pagesOf(uestc, lang)) {
      const html = fs.readFileSync(path.join(uestc, lang, page), 'utf8');
      assert.match(html, /id="theme"/, `${lang}/${page}: missing #theme`);
      // uestc_ai is light-only, so it must also be unclickable.
      assert.match(html, /id="theme"[^>]*\shidden/, `${lang}/${page}: #theme must be hidden`);
    }
});

test('every JS-bound id is present on every page', () => {
  const skip = new Set(['paper-domain', 'paper-query', 'paper-count', 'expand']); // page-specific
  const required = boundIds().filter(id => !skip.has(id) && !id.startsWith('ama-'));
  assert.ok(required.includes('theme') && required.includes('nav'), 'id derivation broke');
  for (const lang of LANGS)
    for (const page of pagesOf(uestc, lang)) {
      const html = fs.readFileSync(path.join(uestc, lang, page), 'utf8');
      for (const id of required)
        assert.match(html, new RegExp(`id="${id}"`), `${lang}/${page}: missing #${id}`);
    }
});

test('page-specific bindings appear where they are used', () => {
  const expect = {
    'research.html': ['expand'],
    'papers.html': ['paper-domain', 'paper-query', 'paper-count'],
    'ama.html': ['ama-app', 'ama-query', 'ama-list', 'ama-refresh', 'ama-notice'],
  };
  for (const lang of LANGS)
    for (const [page, ids] of Object.entries(expect)) {
      const html = fs.readFileSync(path.join(uestc, lang, page), 'utf8');
      for (const id of ids)
        assert.match(html, new RegExp(`id="${id}"`), `${lang}/${page}: missing #${id}`);
    }
});

const VOID = new Set(['img', 'br', 'input', 'hr', 'meta', 'link', 'source', 'track', 'area', 'base', 'col', 'embed', 'param', 'wbr']);
// Direct element children of an HTML fragment, ignoring anything nested.
const directChildren = (inner) => {
  const out = [];
  let depth = 0;
  for (const m of inner.matchAll(/<(\/?)([a-zA-Z][\w-]*)\b([^>]*)>/g)) {
    const [, close, tag, attrs] = m;
    if (close) { depth--; continue; }
    if (depth === 0) out.push({ tag: tag.toLowerCase(), attrs });
    if (!VOID.has(tag.toLowerCase()) && !/\/\s*$/.test(attrs)) depth++;
  }
  return out;
};

test('every direct <a> child of #nav is a nav link', () => {
  // Two contracts decide this. `#nav>a.nav-collapsed` is a child selector, so
  // the links must be direct children. And initNavigation() (guide-motion.js:828)
  // walks FORWARD from each .navgroup toggling .nav-collapsed on its <a>
  // siblings until it reaches the next .navgroup or runs out of siblings — so
  // any other direct <a> child placed after the last group gets swallowed when
  // that group is collapsed. The external GitHub link is wrapped in a <div>
  // for exactly that reason; this test is what keeps it that way.
  for (const lang of LANGS) {
    const html = fs.readFileSync(path.join(uestc, lang, 'index.html'), 'utf8');
    const nav = html.match(/<aside id="nav"[\s\S]*?<\/aside>/)?.[0];
    assert.ok(nav, `${lang}: no #nav`);
    const inner = nav.slice(nav.indexOf('>') + 1, nav.lastIndexOf('</aside>'));
    const links = directChildren(inner).filter(el => el.tag === 'a');
    assert.ok(links.length > 10, `${lang}: expected the nav links as direct children, found ${links.length}`);
    for (const { attrs } of links)
      assert.match(attrs, /href="[a-z0-9-]+\.html"/, `${lang}: a non-page link is a direct child of #nav: <a${attrs}>`);
  }
});

test('every asset reference in the uestc edition resolves', () => {
  assertAssetsResolve(uestc, 'guide-uestc edition');
});

// A wrong prefix is the specific failure this guards: the fragment modules take
// an `assets` argument that defaults to '../' (the first edition's depth), so a
// call site that forgets to thread '../../' produces a plausible-looking but
// dead path. `../search-data.js` and the ../zh/ ../en/ page links are correctly
// one level up and are deliberately not in this list.
test('shared assets are referenced at the deeper prefix', () => {
  const shallow = /(?:src|href|poster)="\.\.\/(?:figures|brands|chronicle|sources)\/|(?:src|href)="\.\.\/logo\.png"/;
  for (const lang of LANGS)
    for (const page of pagesOf(uestc, lang)) {
      const html = fs.readFileSync(path.join(uestc, lang, page), 'utf8');
      const hit = html.match(shallow);
      assert.equal(hit, null, `${lang}/${page}: shared asset referenced at the wrong depth: ${hit?.[0]}`);
    }
});

test('both editions render identical article content', () => {
  // The uestc shell hoists the article's <h1> into the page title band; put it
  // back, normalise the asset depth, and the two must be byte-equal. This is
  // what proves the shared content model has not diverged.
  const normalise = html => html.replaceAll('../../', '../');
  for (const lang of LANGS)
    for (const page of pagesOf(guide, lang)) {
      const a = fs.readFileSync(path.join(guide, lang, page), 'utf8').match(/<article>([\s\S]*)<\/article>/)?.[1];
      const bRaw = fs.readFileSync(path.join(uestc, lang, page), 'utf8');
      const bInner = bRaw.match(/<article class="markdown-body">([\s\S]*)<\/article>/)?.[1];
      const band = bRaw.match(/<div class="page-title-band">[\s\S]*?<span class="eyebrow">[\s\S]*?<\/span>([\s\S]*?)<\/div><\/div>/)?.[1];
      assert.ok(a && bInner, `${lang}/${page}: could not extract article`);
      assert.equal(normalise((band ?? '') + bInner), a, `${lang}/${page}: article content diverged`);
    }
});

test('the skin defines every token the reused fragments need', () => {
  // The whole reuse-by-token approach rests on this: an undefined token makes
  // the fragment fall back to the first edition's palette or a JS default.
  const used = new Set();
  for (const file of ['guide.css', 'fieldnotes.css', 'guide-motion.css']) {
    const src = fs.readFileSync(path.join(guide, file), 'utf8');
    // Only var() with no fallback — a fallback is itself a definition.
    for (const m of src.matchAll(/var\(\s*(--[a-z0-9-]+)\s*\)/g)) used.add(m[1]);
  }
  // guide-motion.js:7-9 reads these by name at setup() and caches the result for
  // the life of the scene, so a stale value miscolours the canvases.
  for (const t of ['--motion-primary', '--motion-result', '--motion-signal', '--motion-line']) used.add(t);
  // Set inline on each element by guide-motion.mjs, not a theme token.
  used.delete('--order');
  const skin = fs.readFileSync(path.join(guide, 'guide-uestc.css'), 'utf8');
  const defined = new Set([...skin.matchAll(/(--[a-z0-9-]+)\s*:/g)].map(m => m[1]));
  const missing = [...used].filter(t => !defined.has(t)).sort();
  assert.deepEqual(missing, [], `guide-uestc.css does not define: ${missing.join(', ')}`);
});

test('the skin breaks at the same width guide.js does', () => {
  // guide.js:4 hardcodes matchMedia('(max-width:800px)'). If the CSS used
  // uestc_ai's 820px, 801-820px would show a hamburger the JS refuses to open.
  const js = fs.readFileSync(path.join(guide, 'guide.js'), 'utf8');
  const jsWidth = js.match(/max-width:\s*(\d+)px/)?.[1];
  const skin = fs.readFileSync(path.join(guide, 'guide-uestc.css'), 'utf8');
  const cssWidths = [...skin.matchAll(/max-width:\s*(\d+)px/g)].map(m => m[1]);
  assert.ok(jsWidth, 'could not read the breakpoint out of guide.js');
  assert.ok(cssWidths.includes(jsWidth), `skin has no ${jsWidth}px breakpoint (found ${cssWidths.join(', ')})`);
});

test('the root landing page is on-brand and still redirects', () => {
  // Visiting "/" used to flash a browser-default white page with two blue
  // underlined links before the meta refresh fired. Vercel now 307s at the edge
  // (vercel.json), so the page never renders there; everywhere else it is
  // painted in the guide's paper colour so the flash is not a white screen.
  assert.match(redirectPage, /http-equiv="refresh" content="0;url=zh\/index\.html"/,
    'the meta-refresh fallback was lost');
  assert.match(redirectPage, /background:#f4f1ea/, 'the landing page is no longer on-brand');
  assert.doesNotMatch(redirectPage, /<a href="zh\/index\.html">[^<]*<\/a>\s*·\s*<a/,
    'the bare "· "-separated link list is back');
  // A rewrite would keep the URL at "/", where the page's relative asset paths
  // stop resolving — this has to stay a redirect.
  assert.deepEqual(JSON.parse(vercelConfig).redirects,
    [{ source: '/', destination: '/zh/', permanent: false }]);
});

test('the skin overrides the FAB styling guide.css gives #menu and #mobile-search', () => {
  // guide.css pins #mobile-search as a floating FAB — position:fixed with
  // bottom/right, an ink pill and a 3px offset shadow — at ID specificity, so
  // .icon-button loses badly. Left unoverridden it floated over the topbar and
  // covered the hamburger (46x28px overlap at 390px), which made the mobile
  // navigation look like it was missing entirely. The override has to be
  // id-level too, hence this guard.
  const skin = fs.readFileSync(path.join(guide, 'guide-uestc.css'), 'utf8');
  const block = skin.match(/#menu,\s*#mobile-search\s*\{[^}]*\}/)?.[0];
  assert.ok(block, 'the id-level #menu/#mobile-search override is gone from the skin');
  for (const decl of ['position: static', 'box-shadow: none', 'background: transparent'])
    assert.ok(block.includes(decl), `the override lost "${decl}"`);
  // ...and both must still be revealed at the drawer breakpoint.
  const mobile = skin.slice(skin.indexOf(`@media (max-width: 800px)`));
  assert.match(mobile, /#menu\s*\{\s*display:\s*inline-flex/, '#menu is not shown at the mobile breakpoint');
  assert.match(mobile, /#mobile-search\s*\{\s*display:\s*inline-flex/, '#mobile-search is not shown at the mobile breakpoint');
});

test('home pages do not emit an orphaned community-directory wrapper', () => {
  // enrichDirectory used to wrap the community block in
  // <section class="community-directory"> on `home` as well, where the shell
  // already wraps every <h2> block in .home-section. The stray unclosed tag made
  // the shell's regex close the wrong element, nesting one .home-section inside
  // the previous one — which pushed the community grid into an implicit column
  // (a 250px hole, cards stuck 400px wide in a 650px column).
  for (const lang of LANGS) {
    for (const dir of [path.join(guide, lang), path.join(uestc, lang)]) {
      const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
      assert.doesNotMatch(html, /<section class="community-directory">\s*<\/section>/,
        `${dir}: orphaned community-directory wrapper is back`);
      // ...but lookout has no .home-section shell, so it must keep its wrapper.
      const lookout = fs.readFileSync(path.join(dir, 'lookout.html'), 'utf8');
      assert.match(lookout, /<section class="community-directory">/,
        `${dir}/lookout.html: lost the community wrapper it still needs`);
    }
  }
});

test('the mobile menu sits at the start of the topbar, as uestc_ai does', () => {
  // uestc_ai's AppShell puts the drawer trigger first in .app-topbar, before
  // .topbar-context, and lets justify-content:space-between form
  // "menu | context | actions". The drawer slides in from the left, so the
  // trigger belongs on that side; the right is for actions. This started out
  // inside .topbar-actions and read wrong on a phone.
  for (const lang of LANGS) {
    const html = fs.readFileSync(path.join(uestc, lang, 'index.html'), 'utf8');
    const bar = html.match(/<header class="app-topbar">([\s\S]*?)<\/header>/)?.[1];
    assert.ok(bar, `${lang}: no .app-topbar`);
    assert.match(bar.trimStart(), /^<button id="menu"/,
      `${lang}: the menu button is no longer the first child of .app-topbar`);
    const actions = bar.match(/<div class="topbar-actions">([\s\S]*?)<\/div>/)?.[1];
    assert.ok(actions, `${lang}: no .topbar-actions`);
    assert.doesNotMatch(actions, /id="menu"/, `${lang}: the menu button drifted back into .topbar-actions`);
  }
});

test('image assets are sized for the role they are used in', () => {
  // The original logo.png was 2048x2048 / 3.1MB and served as both the favicon
  // and a 40px header mark on every page — 3.1MB per page view. These ceilings
  // are what stop a full-resolution source being dropped back in; they are
  // generous next to the current sizes (favicon 9.7KB, mark 197KB, poster 96KB).
  const ICON_MAX = 32 * 1024;
  const IMG_MAX = 512 * 1024;
  const oversize = [];
  for (const edition of [...LANGS, ...LANGS.map(l => `guide-uestc/${l}`)]) {
    const dir = path.join(guide, edition);
    if (!fs.existsSync(dir)) continue;
    const check = (ref, limit, page) => {
      if (/^(https?:|#|data:)/.test(ref)) return;
      const target = path.resolve(dir, decodeURIComponent(ref.split('#')[0].split('?')[0]));
      if (!fs.existsSync(target)) return;   // resolution is covered by its own test
      const size = fs.statSync(target).size;
      if (size > limit) oversize.push(`${edition}/${page} → ${ref} (${Math.round(size / 1024)}KB > ${Math.round(limit / 1024)}KB)`);
    };
    for (const page of fs.readdirSync(dir).filter(f => f.endsWith('.html'))) {
      const html = fs.readFileSync(path.join(dir, page), 'utf8');
      for (const m of html.matchAll(/<link rel="icon" href="([^"]+)"/g)) check(m[1], ICON_MAX, page);
      for (const m of html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/g))
        if (!/loading="lazy"/.test(m[0])) check(m[1], IMG_MAX, page);
      for (const m of html.matchAll(/poster="([^"]+)"/g)) check(m[1], IMG_MAX, page);
    }
  }
  const unique = [...new Set(oversize)];
  assert.deepEqual(unique, [], `oversized image assets:\n  ${unique.join('\n  ')}`);
});

test('dark mode is unreachable from the uestc edition', () => {
  for (const lang of LANGS) {
    const html = fs.readFileSync(path.join(uestc, lang, 'index.html'), 'utf8');
    assert.match(html, /<meta name="color-scheme" content="light">/, `${lang}: color-scheme not pinned`);
    assert.doesNotMatch(html, /dataset\.theme\s*=/, `${lang}: shell still bootstraps a theme`);
  }
});
