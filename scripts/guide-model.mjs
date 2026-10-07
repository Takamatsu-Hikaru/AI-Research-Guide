// Theme-neutral content model for the guide. Both the default build and the
// uestc-skinned build consume this, so anchors, question counts, resource ids
// and the search index stay identical between editions.
//
// `assets` is the relative prefix that reaches public/blog/guide/ from a
// generated page's directory: '../' for guide/<lang>/<page>.html (the default,
// which reproduces the original build byte for byte) and '../../' for
// guide/guide-uestc/<lang>/<page>.html.
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { loadFields, fieldNotes, paperLibrary } from './fieldnotes.mjs';
import { enrichDirectory } from './guide-directory.mjs';
import { amaPage } from './ama-page.mjs';

export const GROUPS=['先从这里开始','开始学习','研究方向','做研究时来查','经历与生活','看看外面','资料总索引','交流与提问'];
export const EN_GROUPS=['Start here','Start learning','Research directions','While doing research','Experience & life','Look outside','Resource index','Questions & conversations'];
export const QUESTIONS=60;
export const STRINGS={zh:{brand:'AI 科研入门指南',blog:'GitHub 仓库',search:'搜索',menu:'目录',close:'关闭',onpage:'本页内容',all:'展开全部',collapse:'收起全部',questions:'60 个问题',home:'指南首页',source:'编辑本页',prev:'上一篇',next:'下一篇',placeholder:'搜索文章、问题和资料',hint:'例如：MNIST、联系老师、Scaling Ladder',empty:'没有找到，试试短一点的词。',label:'搜索指南',theme:'切换深浅色',skip:'跳到正文'},en:{brand:'AI Research Guide',blog:'GitHub repository',search:'Search',menu:'Contents',close:'Close',onpage:'On this page',all:'Expand all',collapse:'Collapse all',questions:'60 questions',home:'Guide home',source:'Edit this page',prev:'Previous',next:'Next',placeholder:'Search articles, questions, and resources',hint:'Try MNIST, contacting a supervisor, or Scaling Ladder',empty:'No matches. Try a shorter phrase.',label:'Search the guide',theme:'Toggle color theme',skip:'Skip to content'}};

export const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
export const filename=id=>id==='home'?'index.html':id+'.html';
export const groupName=(g,l)=>l==='zh'?g:EN_GROUPS[GROUPS.indexOf(g)];

// Asset paths authored directly inside Markdown. Templates cannot reach these,
// so they are rewritten here against the same `assets` prefix. With the default
// prefix both replacements are identities, which is what keeps the original
// build's output byte-identical.
const markdownAssets=(html,assets)=>{
 const guideRoot='../../../public/blog/guide/';
 if(!html.includes(guideRoot)&&!html.includes('../chronicle/'))return html;
 return html.replaceAll(guideRoot,assets).replaceAll('../chronicle/',assets+'chronicle/');
};

export function loadGuide(root,assets='../'){
 const content=path.join(root,'content/guide');
 const manifest=JSON.parse(fs.readFileSync(path.join(content,'manifest.json'),'utf8'));
 const fields=loadFields(root);
 const all={zh:[],en:[]};
 for(const lang of ['zh','en'])for(const p of manifest){
  const raw=fs.readFileSync(path.join(content,lang,p.id+'.md'),'utf8');
  const title=raw.match(/^# (.+)$/m)?.[1];if(!title)throw Error('Missing title '+lang+'/'+p.id);
  let n=0;let html=marked.parse(raw,{gfm:true}).replace(/<h([23])>([\s\S]*?)<\/h\1>/g,(_,level,text)=>`<h${level} id="sec-${++n}">${text}</h${level}>`);
  html=markdownAssets(html,assets);
  html=html.replace(/<p>(<a id="[^"]+"><\/a>)<\/p>/g,'$1');
  let resource=0;html=html.replace(/<li>(?=\s*(?:<p>)?\s*<strong><a href="https?:)/g,()=>`<li id="resource-${++resource}">`);
  html=html.replace(/href="(?!https?:)([^"]+)\.md(?:#([^"]+))?"/g,(_,id,anchor)=>`href="${filename(id)}${anchor?'#'+anchor:''}"`);
  html=html.replace(/<a href="(https?:[^"]+)"/g,'<a target="_blank" rel="noopener noreferrer" href="$1"');
  const field=fields.find(f=>f.id===p.id);
  if(field){
   const parts=html.match(/^(<h1>[\s\S]*?<\/h1>)([\s\S]*?)(<h2[\s\S]*)$/);
   if(!parts)throw Error('Missing field introduction or learning route '+lang+'/'+p.id);
   html=parts[1]+fieldNotes(field,lang,parts[2],parts[3],assets);
  }
  if(p.id==='papers')html=html.replace(/(<h1>[\s\S]*?<\/h1>)/,m=>m+paperLibrary(fields,lang,assets));
  if(p.id==='ama')html+=amaPage(lang);
  html=enrichDirectory(p.id,lang,html,assets);
  const headings=[...html.matchAll(/<h2 id="((?!title-)[^"]+)">([\s\S]*?)<\/h2>/g)].map(m=>({id:m[1],title:plain(m[2])}));
  if(p.id==='research'){
   html=html.replace(/<a id="(q\d+)"><\/a>\s*<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<a id="q\d+"|<h2|$)/g,(_,id,q,a)=>`<details class="qa" id="${id}"><summary>${q}</summary><div class="answer">${a}</div></details>\n`);
   if((html.match(/class="qa"/g)||[]).length!==QUESTIONS)throw Error('Question count '+lang);
   html=html.replace('<h2',`<div class="qa-tools"><span>${STRINGS[lang].questions}</span><button id="expand" type="button">${STRINGS[lang].all}</button></div><h2`);
  }
  if(p.id==='home')html=html.replace(/(<h1>[\s\S]*?<\/h1>)/,m=>`<img class="home-logo" src="${assets}logo-mark.png" alt="UESTC AI 社">`+m);
  if(p.id==='home')html=html.replace(/(<h2[^>]*>[\s\S]*?)(?=<h2|$)/g,'<section class="home-section">$1</section>');
  all[lang].push({...p,title,html,headings,plain:plain(html)});
 }
 return {manifest,fields,all};
}

// Broken internal links, resource counts and the external-link inventory.
// Throws rather than reporting, so a broken anchor fails the build.
export function validateGuide(all,manifest){
 const report={pagesPerLanguage:manifest.length,questionsPerLanguage:QUESTIONS,resourceEntries:{},externalLinks:{}};
 for(const lang of ['zh','en']){
  const pages=all[lang];const idsByPage=new Map(pages.map(p=>[filename(p.id),new Set([...p.html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]))]));
  for(const p of pages)for(const m of p.html.matchAll(/href="([^"#:]+\.html)(?:#([^"]+))?"/g)){
   if(m[1].includes('://'))continue;
   if(!idsByPage.has(m[1])||(m[2]&&!idsByPage.get(m[1]).has(m[2])))throw Error(`Broken link ${lang}/${p.id}: ${m[0]}`);
  }
  report.resourceEntries[lang]=pages.filter(p=>p.id.startsWith('catalog-')).reduce((a,p)=>a+(p.html.match(/id="resource-/g)||[]).length,0);
  report.externalLinks[lang]=[...new Set(pages.flatMap(p=>[...p.html.matchAll(/href="(https?:[^"]+)"/g)].map(m=>m[1])))];
 }
 return report;
}

export function buildSearchData(all){
 const searchData={};
 for(const lang of ['zh','en'])searchData[lang]=all[lang].flatMap(p=>{
  const records=[{url:filename(p.id),title:p.title,body:p.plain}];
  if(p.id==='research')for(const m of p.html.matchAll(/<details class="qa" id="([^"]+)"><summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g))records.push({url:filename(p.id)+'#'+m[1],title:plain(m[2]),body:plain(m[3])});
  else for(const m of p.html.matchAll(/<h[23] id="([^"]+)">([\s\S]*?)<\/h[23]>([\s\S]*?)(?=<h[23]|$)/g))records.push({url:filename(p.id)+'#'+(m[1].startsWith('title-')?'paper-'+m[1].slice(6):m[1]),title:plain(m[2]),body:plain(m[3])});
  for(const m of p.html.matchAll(/<li id="(resource-\d+)">([\s\S]*?)<\/li>/g))records.push({url:filename(p.id)+'#'+m[1],title:plain(m[2].match(/<strong>([\s\S]*?)<\/strong>/)?.[1]||m[2]),body:plain(m[2])});
  return records;
 });
 return searchData;
}

export const searchDataJs=searchData=>'window.guideSearch='+JSON.stringify(searchData).replace(/</g,'\\u003c')+';';
