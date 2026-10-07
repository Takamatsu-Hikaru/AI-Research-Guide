// Page shell for the uestc-skinned edition.
//
// Structure mirrors D:\Project\uestc_ai's app shell (.app-shell / .app-sidebar /
// .app-topbar / .page-title-band / .app-content / .app-footer), but the
// JS-bound containers keep the ids and classes that guide.js, fieldnotes.js and
// guide-motion.js bind to. Two contracts that must not be broken:
//
//   1. Collapsible nav links must be DIRECT children of #nav and siblings of a
//      .navgroup — initNavigation() (guide-motion.js:828) walks forward from
//      each .navgroup, and #nav>a.nav-collapsed is a child selector.
//   2. #theme must exist in the DOM: guide.js:3 is `$('theme').onclick=...` as
//      the IIFE's first statement, so a missing element throws and silently
//      kills the menu, search, QA expansion and paper dialogs. uestc_ai is
//      light-only, so it is emitted `hidden` — see #theme[hidden] in the skin.
import { STRINGS, escape, filename, groupName } from './guide-model.mjs';

// Default is the in-tree layout, where a page sits at guide/guide-uestc/<lang>/
// and reaches the guide root with one extra hop. The standalone build passes
// '../' because there the pages become the package root's zh/ and en/.
export const ASSETS='../../';
export const SKIN=ASSETS+'guide-uestc.css';

export function pageShell({p,pages,index,lang,assets=ASSETS,skin=SKIN}){
 const t=STRINGS[lang],other=lang==='zh'?'en':'zh';
 let group='';
 const nav=pages.map(x=>{let h='';if(x.group!==group){group=x.group;h=`<div class="navgroup" role="button" tabindex="0" aria-expanded="true">${escape(groupName(group,lang))}</div>`;}return h+`<a href="${filename(x.id)}"${x.id===p.id?' aria-current="page"':''}>${escape(x.id==='home'?t.home:x.title)}</a>`}).join('');
 const neighbors=[pages[index-1],pages[index+1]].map((x,i)=>x?`<a href="${filename(x.id)}"><small>${i?t.next:t.prev} ${i?'→':'←'}</small><span>${escape(x.id==='home'?t.home:x.title)}</span></a>`:'<span></span>').join('');
 // The article's <h1> moves into the title band, where uestc_ai sets its
 // Georgia display heading. `plain` already fed the search index during
 // loadGuide, so lifting it here does not change search results.
 const head=p.html.match(/^\s*((?:<img class="home-logo"[^>]*>\s*)?)(<h1>[\s\S]*?<\/h1>)([\s\S]*)$/);
 const band=head?head[1]+head[2]:'';
 const body=head?head[3]:p.html;
 return `<!doctype html>
<html lang="${lang==='zh'?'zh-CN':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${p.id==='ai4x'?`<link rel="stylesheet" href="${assets}ai4x/expanded.css">`:''}<meta name="color-scheme" content="light"><title>${escape(p.title)} · UESTC AI</title><meta name="description" content="${escape(p.plain.slice(p.title.length,190).trim())}"><link rel="icon" href="${assets}favicon.png"><link rel="alternate" hreflang="zh-CN" href="../zh/${filename(p.id)}"><link rel="alternate" hreflang="en" href="../en/${filename(p.id)}"><link rel="stylesheet" href="${assets}guide.css"><link rel="stylesheet" href="${assets}fieldnotes.css"><link rel="stylesheet" href="${assets}guide-motion.css?v=20261006d"><link rel="stylesheet" href="${skin}"></head>
<body data-lang="${lang}" data-page="${p.id}"${p.id==='home'?' class="home"':''}>
<a class="skip" href="#content">${t.skip}</a>
<div class="app-shell">
<button class="sidebar-scrim" id="shade" aria-label="${t.close}" hidden></button>
<aside id="nav" class="app-sidebar" aria-label="${t.menu}"><div class="brand-lockup"><span class="brand-mark"><img src="${assets}logo-mark.png" alt="UESTC AI 社"></span><span class="brand-copy"><strong>UESTC AI</strong><small>${escape(t.brand)}</small></span></div><button id="opensearch" class="search-field" aria-label="${t.label}"><span>${t.search}</span><kbd>Ctrl K</kbd></button>${nav}<div class="sidebar-source"><a href="https://github.com/Takamatsu-Hikaru/AI-Research-Guide" target="_blank" rel="noopener">← ${t.blog}</a></div></aside>
<div class="app-main">
<header class="app-topbar"><button id="menu" class="icon-button mobile-menu" aria-controls="nav" aria-expanded="false" aria-label="${t.menu}">${t.menu}</button><div class="topbar-context"><a href="index.html">${escape(t.home)}</a><i>/</i><strong>${escape(groupName(p.group,lang))}</strong></div><div class="topbar-actions"><a id="language" class="outline-button" href="../${other}/${filename(p.id)}" lang="${other}" aria-label="${other==='en'?'Read in English':'阅读中文版'}">${other==='en'?'EN':'中文'}</a><button id="mobile-search" class="icon-button" aria-label="${t.label}">${t.search}</button><button id="theme" class="icon-button" aria-label="${t.theme}" hidden>◐</button></div></header>
<div class="page-title-band"><div><span class="eyebrow"><i></i>${escape(groupName(p.group,lang))}</span>${band}</div></div>
<main class="app-content" id="content" tabindex="-1">
<div class="article-layout"><article class="markdown-body">${body}</article><aside id="toc" aria-label="${t.onpage}"><strong>${t.onpage}</strong>${p.headings.map(h=>`<a href="#${h.id}">${escape(h.title)}</a>`).join('')}</aside></div>
<nav class="neighbors" aria-label="${lang==='zh'?'前后文章':'Adjacent articles'}">${neighbors}</nav>
</main>
<footer class="app-footer"><span>UESTC AI · ${escape(t.brand)}</span><span><a href="https://github.com/Takamatsu-Hikaru/AI-Research-Guide/edit/main/content/guide/${lang}/${p.id}.md" target="_blank" rel="noopener">${t.source}</a><a href="https://github.com/Takamatsu-Hikaru/AI-Research-Guide" target="_blank" rel="noopener">GitHub</a></span></footer>
</div>
</div>
<dialog id="searchdialog" aria-label="${t.label}"><div class="searchhead"><input id="searchinput" type="search" placeholder="${t.placeholder}" aria-label="${t.label}"><button id="closesearch">${t.close}</button></div><div id="results" aria-live="polite"></div></dialog>
<script>window.guideUI=${JSON.stringify(t)};</script><script src="../search-data.js"></script><script src="${assets}guide.js"></script><script src="${assets}fieldnotes.js"></script><script src="${assets}guide-motion.js?v=20261006d"></script><script src="${assets}ama.js"></script>${p.id==='ai4x'?['motion-core','motion-physical','motion-bio','motion-research','motion-en','motion-player'].map(s=>`<script src="${assets}ai4x/${s}.js"></script>`).join(''):''}</body></html>`;
}

// Root landing page. On hosts that can issue an HTTP redirect this is never
// rendered (the standalone build also ships vercel.json, which 307s "/" to
// "/zh/" at the edge). Where no such redirect exists it is on screen for a
// fraction of a second, so it is painted in the guide's own paper colour —
// otherwise the default browser white with blue underlined links flashes
// before the meta refresh fires.
export const redirectPage=`<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=zh/index.html"><title>AI 科研入门指南 · UESTC AI</title><link rel="canonical" href="zh/"><style>html{background:#f4f1ea}body{margin:0;min-height:100dvh;background:#f4f1ea;color:#20211e;display:flex;align-items:center;justify-content:center;font:14px/1.7 "Avenir Next","Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}p{margin:0}a{color:#a94833;text-decoration:none;border-bottom:1px solid #d5d1c8;margin:0 10px}a:hover{color:#c85c42}</style></head>
<body><p><a href="zh/index.html">AI 科研入门指南</a><a href="en/index.html">AI Research Guide</a></p></body></html>`;

// 307 rather than 308: the default language may change, and browsers cache a
// permanent redirect hard. A rewrite would be wrong — it keeps the URL at "/",
// where the page's relative asset paths (`../figures/…`) stop resolving.
export const vercelConfig=JSON.stringify({redirects:[{source:'/',destination:'/zh/',permanent:false}]},null,2)+'\n';
