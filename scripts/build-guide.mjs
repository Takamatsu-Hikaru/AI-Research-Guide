// Default guide build: warm paper palette, fixed header, right-hand TOC.
// Content comes from guide-model.mjs; this file owns only the page shell and
// the writes. The uestc-skinned edition is scripts/build-guide-uestc.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STRINGS, escape, filename, groupName, loadGuide, validateGuide, buildSearchData, searchDataJs } from './guide-model.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'public/blog/guide');
const {manifest,all}=loadGuide(root);
const report=validateGuide(all,manifest);
for(const lang of ['zh','en']){
 const pages=all[lang];
 fs.mkdirSync(path.join(out,lang),{recursive:true});
 for(const [index,p] of pages.entries()){
  const t=STRINGS[lang],other=lang==='zh'?'en':'zh';let group='';
  const nav=pages.map(x=>{let h='';if(x.group!==group){group=x.group;h=`<div class="navgroup">${escape(groupName(group,lang))}</div>`;}return h+`<a href="${filename(x.id)}"${x.id===p.id?' aria-current="page"':''}>${escape(x.id==='home'?t.home:x.title)}</a>`}).join('');
  const neighbors=[pages[index-1],pages[index+1]].map((x,i)=>x?`<a href="${filename(x.id)}"><small>${i?t.next:t.prev} ${i?'→':'←'}</small><span>${escape(x.id==='home'?t.home:x.title)}</span></a>`:'<span></span>').join('');
  const html=`<!doctype html>
<html lang="${lang==='zh'?'zh-CN':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${escape(p.title)} · UESTC AI</title><meta name="description" content="${escape(p.plain.slice(p.title.length,190).trim())}"><link rel="icon" href="../favicon.png"><link rel="alternate" hreflang="zh-CN" href="../zh/${filename(p.id)}"><link rel="alternate" hreflang="en" href="../en/${filename(p.id)}"><link rel="stylesheet" href="../guide.css"><link rel="stylesheet" href="../fieldnotes.css"><link rel="stylesheet" href="../guide-motion.css?v=20261006d"><script>try{document.documentElement.dataset.theme=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch{}</script></head>
<body data-lang="${lang}" data-page="${p.id}"${p.id==='home'?' class="home"':''}>
<a class="skip" href="#content">${t.skip}</a><header class="site-header"><a class="wordmark" href="index.html"><img class="club-logo" src="../logo-mark.png" alt="UESTC AI 社"><span class="wordmark-copy"><strong>UESTC AI</strong><small>${lang==='zh'?'AI 科研入门指南':'AI Research Guide'}</small></span></a><a class="header-guide" href="index.html">${t.brand}</a><div class="header-actions"><a id="language" href="../${other}/${filename(p.id)}" lang="${other}" aria-label="${other==='en'?'Read in English':'阅读中文版'}">${other==='en'?'EN':'中文'}</a><button id="theme" class="theme-toggle" aria-label="${t.theme}">◐</button><button id="menu" aria-controls="nav" aria-expanded="false">${t.menu}</button></div></header>
<button class="shade" id="shade" aria-label="${t.close}" hidden></button><aside id="nav" aria-label="${t.menu}"><a class="back-blog" href="https://github.com/Takamatsu-Hikaru/AI-Research-Guide" target="_blank" rel="noopener">← ${t.blog}</a><button id="opensearch" aria-label="${t.label}"><span>${t.search}</span><kbd>Ctrl K</kbd></button>${nav}</aside>
<div class="reading-layout"><main id="content" tabindex="-1"><div class="article-meta"><span>${escape(groupName(p.group,lang))}</span><span>UESTC AI / ${p.updated||'2026-10-04'}</span></div><article>${p.html}</article><nav class="neighbors" aria-label="${lang==='zh'?'前后文章':'Adjacent articles'}">${neighbors}</nav><footer><a href="index.html">${t.home} ↑</a><a href="https://github.com/Takamatsu-Hikaru/AI-Research-Guide/edit/main/content/guide/${lang}/${p.id}.md" target="_blank" rel="noopener">${t.source}</a><a href="https://github.com/Takamatsu-Hikaru/AI-Research-Guide">UESTC AI · GitHub</a></footer></main><nav id="toc" aria-label="${t.onpage}"><strong>${t.onpage}</strong>${p.headings.map(h=>`<a href="#${h.id}">${escape(h.title)}</a>`).join('')}</nav></div>
<button id="mobile-search" aria-label="${t.label}">${t.search}</button><dialog id="searchdialog" aria-label="${t.label}"><div class="searchhead"><input id="searchinput" type="search" placeholder="${t.placeholder}" aria-label="${t.label}"><button id="closesearch">${t.close}</button></div><div id="results" aria-live="polite"></div></dialog><script>window.guideUI=${JSON.stringify(t)};</script><script src="../search-data.js"></script><script src="../guide.js"></script><script src="../fieldnotes.js"></script><script src="../guide-motion.js?v=20261006d"></script><script src="../ama.js"></script></body></html>`;
  fs.writeFileSync(path.join(out,lang,filename(p.id)),html);
 }
}
fs.writeFileSync(path.join(out,'search-data.js'),searchDataJs(buildSearchData(all)));
fs.writeFileSync(path.join(out,'index.html'),'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=zh/index.html"><title>AI 科研入门指南 · UESTC AI</title><a href="zh/index.html">AI 科研入门指南</a> · <a href="en/index.html">AI Research Guide</a></html>');
fs.mkdirSync(path.join(root,'work/guide-review'),{recursive:true});
fs.writeFileSync(path.join(root,'work/guide-review/build.json'),JSON.stringify(report,null,2));
console.log(`Guide built: ${manifest.length} pages × 2 languages; 60 questions and ${report.resourceEntries.zh} catalog entries per language.`);
