(function(root){
const normalize=s=>String(s||'').normalize('NFKC').toLowerCase().replace(/[‐‑–—]/g,'-');
const compact=s=>normalize(s).replace(/[\s\p{P}\p{S}]/gu,'');
const segmenter=typeof Intl.Segmenter==='function'?new Intl.Segmenter('zh',{granularity:'word'}):null;
const stop=new Set(['的','了','是','什么','怎么','怎样','如何','一个','一下','这个','那个','和','与','或','the','a','an','of','in','and','to','for']);
const compound=['大语言模型','强化学习','机器学习','计算机视觉','自然语言','世界模型','机器人','检查点','预训练','后训练','中期训练','多智能体','图神经网络','知识图谱','模型权重','开源模型'];
function tokenize(text){
 const s=normalize(text),out=[];
 if(segmenter)for(const seg of segmenter.segment(s)){if(seg.isWordLike&&!stop.has(seg.segment))out.push(seg.segment)}
 else out.push(...(s.match(/[a-z0-9]+|[\u3400-\u9fff]+/g)||[]));
 for(const chunk of s.match(/[\u3400-\u9fff]{2,}/g)||[])for(let i=0;i<chunk.length-1;i++)out.push(chunk.slice(i,i+2));
 out.push(...compound.filter(t=>s.includes(t)));return [...new Set(out)];
}
function queryTokens(text){let s=normalize(text);const found=[];for(const t of compound)if(s.includes(t)){found.push(t);s=s.split(t).join(' ')}const ts=segmenter?[...segmenter.segment(s)].filter(x=>x.isWordLike).map(x=>x.segment):(s.match(/[a-z0-9]+|[\u3400-\u9fff]+/g)||[]);return [...new Set([...found,...ts.filter(t=>!stop.has(t)&&(ts.length===1||t.length>1||/^[a-z0-9]$/.test(t)))])]}
const groupAliases={'机器人':'robotics robot embodied 具身','机器学习':'machine learning ml','自然语言':'nlp language','视觉':'vision cv','多媒体':'multimedia','强化学习':'reinforcement learning rl','系统':'systems infra','语音':'speech audio','图形':'graphics','医学':'medical medicine','检索':'retrieval search','推荐':'recommendation','金融':'finance','训练':'training'};
function createSearch(entries,categories){
 const catMap=Object.fromEntries(categories.map(c=>[c.id,c]));
 const docs=entries.map(e=>{let context=[catMap[e.category]?.name,e.group,e.kind==='conference'?'会议 conference':e.kind==='journal'?'期刊 journal':''].join(' ');for(const [key,value] of Object.entries(groupAliases))if(context.includes(key))context+=' '+value;return {...e,aliases:e.aliases.join(' '),detail:e.detail.join(' '),searchContext:context}});
 const mini=new MiniSearch({fields:['term','zh','aliases','summary','detail','searchContext'],tokenize,processTerm:t=>stop.has(t)?null:t,searchOptions:{boost:{term:12,zh:11,aliases:12,summary:2,detail:.65,searchContext:1.5},prefix:t=>t.length>=2,fuzzy:t=>/^[a-z]+$/.test(t)&&t.length>=4?.2:false,combineWith:'OR'}});
 mini.addAll(docs);const byId=new Map(entries.map(e=>[e.id,e])),docById=new Map(docs.map(d=>[d.id,d]));
 function search(query,{category='',kind='',group=''}={}){
  const q=normalize(query).trim(),c=compact(q);let scored=q?mini.search(q,{tokenize:queryTokens}).map(r=>({e:byId.get(r.id),score:r.score,matched:r.queryTerms||[]})):entries.map(e=>({e,score:0}));
  const seen=new Set(scored.map(r=>r.e.id));
  if(q)for(const e of entries){if([e.term,e.zh,...e.aliases].some(a=>compact(a)===c)&&!seen.has(e.id))scored.push({e,score:0})}
  const qTokens=queryTokens(q);
  const typeIntent=qTokens.length>1?(/会议|\bconference\b/.test(q)?'conference':/期刊|\bjournal\b/.test(q)?'journal':''):'';
  for(const r of scored){const names=[r.e.term,r.e.zh,...r.e.aliases].map(compact);if(c&&names.includes(c))r.score+=10000;else if(c&&names.some(n=>n.startsWith(c)))r.score+=150;
   if(qTokens.length>1){const bag=normalize([r.e.term,r.e.zh,...r.e.aliases,r.e.summary,docById.get(r.e.id).searchContext,...r.e.detail].join(' '));const coverage=qTokens.filter(t=>bag.includes(t)).length/qTokens.length;r.coverage=coverage;r.score*=coverage*coverage;if(typeIntent){const context=normalize(docById.get(r.e.id).searchContext);r.score*=qTokens.every(t=>context.includes(t))?8:1;}}
  }
  const exactFound=scored.some(r=>r.score>=10000);
  return scored.filter(({e,score,coverage})=>(!category||e.categories.includes(category))&&(!kind||e.kind===kind)&&(!group||e.group===group)&&(exactFound||!typeIntent||e.kind===typeIntent)&&(!q||((coverage===undefined||coverage>=.6)&&(!exactFound||score>=10000)))).sort((a,b)=>b.score-a.score).map(r=>r.e);
 }
 return {search,tokenize,compact,mini};
}
root.WikiSearch={createSearch,tokenize,normalize,compact};
})(typeof window!=='undefined'?window:globalThis);
