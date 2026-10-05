import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { loadFields, fieldNotes, paperLibrary } from './fieldnotes.mjs';
import { enrichDirectory } from './guide-directory.mjs';
import { amaPage } from './ama-page.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const content=path.join(root,'content/guide'),out=path.join(root,'public/blog/guide');
const manifest=JSON.parse(fs.readFileSync(path.join(content,'manifest.json'),'utf8'));
const groups=['先从这里开始','开始学习','研究方向','做研究时来查','经历与生活','看看外面','资料总索引','交流与提问'];
const enGroups=['Start here','Start learning','Research directions','While doing research','Experience & life','Look outside','Resource index','Questions & conversations'];
const fields=loadFields(root);
const groupName=(g,l)=>l==='zh'?g:enGroups[groups.indexOf(g)];
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
const filename=id=>id==='home'?'index.html':id+'.html';
const strings={zh:{brand:'AI 科研入门指南',blog:'GitHub 仓库',search:'搜索',menu:'目录',close:'关闭',onpage:'本页内容',all:'展开全部',collapse:'收起全部',questions:'60 个问题',home:'指南首页',source:'文章源文件',prev:'上一篇',next:'下一篇',placeholder:'搜索文章、问题和资料',hint:'例如：MNIST、联系老师、Scaling Ladder',empty:'没有找到，试试短一点的词。',label:'搜索指南',theme:'切换深浅色',skip:'跳到正文'},en:{brand:'AI Research Guide',blog:'GitHub repository',search:'Search',menu:'Contents',close:'Close',onpage:'On this page',all:'Expand all',collapse:'Collapse all',questions:'60 questions',home:'Guide home',source:'Article source',prev:'Previous',next:'Next',placeholder:'Search articles, questions, and resources',hint:'Try MNIST, contacting a supervisor, or Scaling Ladder',empty:'No matches. Try a shorter phrase.',label:'Search the guide',theme:'Toggle color theme',skip:'Skip to content'}};
const all={zh:[],en:[]};
for(const lang of ['zh','en'])for(const p of manifest){
 const raw=fs.readFileSync(path.join(content,lang,p.id+'.md'),'utf8');
 const title=raw.match(/^# (.+)$/m)?.[1];if(!title)throw Error('Missing title '+lang+'/'+p.id);
 let n=0;let html=marked.parse(raw,{gfm:true}).replace(/<h([23])>([\s\S]*?)<\/h\1>/g,(_,level,text)=>`<h${level} id="sec-${++n}">${text}</h${level}>`);
 html=html.replace(/<p>(<a id="[^"]+"><\/a>)<\/p>/g,'$1');
 let resource=0;html=html.replace(/<li>(?=\s*(?:<p>)?\s*<strong><a href="https?:)/g,()=>`<li id="resource-${++resource}">`);
 html=html.replace(/href="(?!https?:)([^"]+)\.md(?:#([^"]+))?"/g,(_,id,anchor)=>`href="${filename(id)}${anchor?'#'+anchor:''}"`);
 html=html.replace(/<a href="(https?:[^"]+)"/g,'<a target="_blank" rel="noopener noreferrer" href="$1"');
 const field=fields.find(f=>f.id===p.id);
 if(field){
  const parts=html.match(/^(<h1>[\s\S]*?<\/h1>)([\s\S]*?)(<h2[\s\S]*)$/);
  if(!parts)throw Error('Missing field introduction or learning route '+lang+'/'+p.id);
  html=parts[1]+fieldNotes(field,lang,parts[2],parts[3]);
 }
 if(p.id==='papers')html=html.replace(/(<h1>[\s\S]*?<\/h1>)/,m=>m+paperLibrary(fields,lang));
 if(p.id==='ama')html+=amaPage(lang);
 html=enrichDirectory(p.id,lang,html);
 const headings=[...html.matchAll(/<h2 id="((?!title-)[^"]+)">([\s\S]*?)<\/h2>/g)].map(m=>({id:m[1],title:plain(m[2])}));
 if(p.id==='research'){
  html=html.replace(/<a id="(q\d+)"><\/a>\s*<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<a id="q\d+"|<h2|$)/g,(_,id,q,a)=>`<details class="qa" id="${id}"><summary>${q}</summary><div class="answer">${a}</div></details>\n`);
  if((html.match(/class="qa"/g)||[]).length!==60)throw Error('Question count '+lang);
  html=html.replace('<h2',`<div class="qa-tools"><span>${strings[lang].questions}</span><button id="expand" type="button">${strings[lang].all}</button></div><h2`);
 }
 if(p.id==='home')html=html.replace(/(<h1>[\s\S]*?<\/h1>)/,m=>'<img class="home-logo" src="../logo.png" alt="UESTC AI 社">'+m);
 if(p.id==='home')html=html.replace(/(<h2[^>]*>[\s\S]*?)(?=<h2|$)/g,'<section class="home-section">$1</section>');
 all[lang].push({...p,title,html,headings,plain:plain(html)});
}
const report={pagesPerLanguage:manifest.length,questionsPerLanguage:60,resourceEntries:{},externalLinks:{}};
for(const lang of ['zh','en']){
 const pages=all[lang];const idsByPage=new Map(pages.map(p=>[filename(p.id),new Set([...p.html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))]));
 for(const p of pages)for(const m of p.html.matchAll(/href="([^"#:]+\.html)(?:#([^"]+))?"/g)){
  if(m[1].includes('://'))continue;
  if(!idsByPage.has(m[1])||(m[2]&&!idsByPage.get(m[1]).has(m[2])))throw Error(`Broken link ${lang}/${p.id}: ${m[0]}`);
 }
 report.resourceEntries[lang]=pages.filter(p=>p.id.startsWith('catalog-')).reduce((a,p)=>a+(p.html.match(/id="resource-/g)||[]).length,0);
 report.externalLinks[lang]=[...new Set(pages.flatMap(p=>[...p.html.matchAll(/href="(https?:[^"]+)"/g)].map(m=>m[1])))];
 fs.mkdirSync(path.join(out,lang),{recursive:true});
 for(const [index,p] of pages.entries()){
  const t=strings[lang],other=lang==='zh'?'en':'zh';let group='';
  const nav=pages.map(x=>{let h='';if(x.group!==group){group=x.group;h=`<div class="navgroup">${escape(groupName(group,lang))}</div>`;}return h+`<a href="${filename(x.id)}"${x.id===p.id?' aria-current="page"':''}>${escape(x.id==='home'?t.home:x.title)}</a>`}).join('');
  const neighbors=[pages[index-1],pages[index+1]].map((x,i)=>x?`<a href="${filename(x.id)}"><small>${i?t.next:t.prev} ${i?'→':'←'}</small><span>${escape(x.id==='home'?t.home:x.title)}</span></a>`:'<span></span>').join('');
  const html=`<!doctype html>
<html lang="${lang==='zh'?'zh-CN':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${escape(p.title)} · UESTC AI</title><meta name="description" content="${escape(p.plain.slice(p.title.length,190).trim())}"><link rel="icon" href="../logo.png"><link rel="alternate" hreflang="zh-CN" href="../zh/${filename(p.id)}"><link rel="alternate" hreflang="en" href="../en/${filename(p.id)}"><link rel="stylesheet" href="../guide.css"><link rel="stylesheet" href="../fieldnotes.css"><link rel="stylesheet" href="../guide-motion.css?v=20261006d"><script>try{document.documentElement.dataset.theme=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch{}</script></head>
<body data-lang="${lang}" data-page="${p.id}"${p.id==='home'?' class="home"':''}>
<a class="skip" href="#content">${t.skip}</a><header class="site-header"><a class="wordmark" href="index.html"><img class="club-logo" src="../logo.png" alt="UESTC AI 社"><span class="wordmark-copy"><strong>UESTC AI</strong><small>${lang==='zh'?'AI 科研入门指南':'AI Research Guide'}</small></span></a><a class="header-guide" href="index.html">${t.brand}</a><div class="header-actions"><a id="language" href="../${other}/${filename(p.id)}" lang="${other}" aria-label="${other==='en'?'Read in English':'阅读中文版'}">${other==='en'?'EN':'中文'}</a><button id="theme" class="theme-toggle" aria-label="${t.theme}">◐</button><button id="menu" aria-controls="nav" aria-expanded="false">${t.menu}</button></div></header>
<button class="shade" id="shade" aria-label="${t.close}" hidden></button><aside id="nav" aria-label="${t.menu}"><a class="back-blog" href="https://github.com/Takamatsu-Hikaru/AI-Research-Guide" target="_blank" rel="noopener">← ${t.blog}</a><button id="opensearch" aria-label="${t.label}"><span>${t.search}</span><kbd>Ctrl K</kbd></button>${nav}</aside>
<div class="reading-layout"><main id="content" tabindex="-1"><div class="article-meta"><span>${escape(groupName(p.group,lang))}</span><span>UESTC AI / ${p.updated||'2026-10-04'}</span></div><article>${p.html}</article><nav class="neighbors" aria-label="${lang==='zh'?'前后文章':'Adjacent articles'}">${neighbors}</nav><footer><a href="index.html">${t.home} ↑</a><a href="https://github.com/Takamatsu-Hikaru/AI-Research-Guide">UESTC AI · GitHub</a></footer></main><nav id="toc" aria-label="${t.onpage}"><strong>${t.onpage}</strong>${p.headings.map(h=>`<a href="#${h.id}">${escape(h.title)}</a>`).join('')}</nav></div>
<button id="mobile-search" aria-label="${t.label}">${t.search}</button><dialog id="searchdialog" aria-label="${t.label}"><div class="searchhead"><input id="searchinput" type="search" placeholder="${t.placeholder}" aria-label="${t.label}"><button id="closesearch">${t.close}</button></div><div id="results" aria-live="polite"></div></dialog><script>window.guideUI=${JSON.stringify(t)};</script><script src="../search-data.js"></script><script src="../guide.js"></script><script src="../fieldnotes.js"></script><script src="../guide-motion.js?v=20261006d"></script><script src="../ama.js"></script></body></html>`;
  fs.writeFileSync(path.join(out,lang,filename(p.id)),html);
 }
}
const searchData={};
for(const lang of ['zh','en'])searchData[lang]=all[lang].flatMap(p=>{
 const records=[{url:filename(p.id),title:p.title,body:p.plain}];
 if(p.id==='research')for(const m of p.html.matchAll(/<details class="qa" id="([^"]+)"><summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g))records.push({url:filename(p.id)+'#'+m[1],title:plain(m[2]),body:plain(m[3])});
 else for(const m of p.html.matchAll(/<h[23] id="([^"]+)">([\s\S]*?)<\/h[23]>([\s\S]*?)(?=<h[23]|$)/g))records.push({url:filename(p.id)+'#'+(m[1].startsWith('title-')?'paper-'+m[1].slice(6):m[1]),title:plain(m[2]),body:plain(m[3])});
 for(const m of p.html.matchAll(/<li id="(resource-\d+)">([\s\S]*?)<\/li>/g))records.push({url:filename(p.id)+'#'+m[1],title:plain(m[2].match(/<strong>([\s\S]*?)<\/strong>/)?.[1]||m[2]),body:plain(m[2])});
 return records;
});
fs.writeFileSync(path.join(out,'search-data.js'),'window.guideSearch='+JSON.stringify(searchData).replace(/</g,'\\u003c')+';');
fs.writeFileSync(path.join(out,'index.html'),'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=zh/index.html"><title>AI 科研入门指南 · UESTC AI</title><a href="zh/index.html">AI 科研入门指南</a> · <a href="en/index.html">AI Research Guide</a></html>');
fs.mkdirSync(path.join(root,'work/guide-review'),{recursive:true});
fs.writeFileSync(path.join(root,'work/guide-review/build.json'),JSON.stringify(report,null,2));
console.log(`Guide built: ${manifest.length} pages × 2 languages; 60 questions and ${report.resourceEntries.zh} catalog entries per language.`);
