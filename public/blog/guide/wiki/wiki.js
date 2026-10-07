(()=>{
'use strict';const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const {entries,categories}=window.WIKI_DATA,byId=new Map(entries.map(e=>[e.id,e])),catMap=new Map(categories.map(c=>[c.id,c])),engine=WikiSearch.createSearch(entries,categories);
const common=['checkpoint','neurips','harness','pre-training','post-training','sota','model-based','kv-cache','agent','tpami','environment','rlhf'];
const resolve=name=>byId.get(name)||entries.find(e=>[e.term,e.zh,...e.aliases].some(a=>WikiSearch.compact(a)===WikiSearch.compact(name)));
let state={q:'',cat:'',kind:'',group:'',id:'',all:false},limit=24,visible=[],focusIndex=-1,returnFocus=null,returnY=0;
function parse(){const p=new URLSearchParams(location.hash.slice(1));return {q:p.get('q')||'',cat:p.get('cat')||'',kind:p.get('kind')||'',group:p.get('group')||'',id:p.get('term')||'',all:p.get('all')==='1'}}
function encode(s){const p=new URLSearchParams();for(const k of ['q','cat','kind','group'])if(s[k])p.set(k,s[k]);if(s.all)p.set('all','1');if(s.id)p.set('term',s.id);return p.toString()}
function go(patch,{replace=false}={}){const next={...state,...patch};const hash=encode(next);const url=location.pathname+location.search+(hash?'#'+hash:'');history[replace?'replaceState':'pushState']({},'',url);state=next;render()}
function highlight(s){const parts=WikiSearch.tokenize(state.q).filter(t=>t.length>1).sort((a,b)=>b.length-a.length);if(!parts.length)return esc(s);const re=new RegExp('('+parts.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','giu');return String(s).split(re).map((x,i)=>i%2?'<mark>'+esc(x)+'</mark>':esc(x)).join('')}
function nav(){let section='';$('category-list').innerHTML=`<button data-cat="" class="${!state.cat?'active':''}">全部方向<span>${entries.length}</span></button>`+categories.map(c=>{const heading=c.section!==section?`<div class="nav-group">${esc(c.section)}</div>`:'';section=c.section;return heading+`<button data-cat="${c.id}" class="${state.cat===c.id?'active':''}" aria-pressed="${state.cat===c.id}">${esc(c.name)}<span>${entries.filter(e=>e.categories.includes(c.id)).length}</span></button>`}).join('');}
function row(e){const selected=state.id===e.id,kind=e.kind==='conference'?'会议':e.kind==='journal'?'期刊':catMap.get(e.category).short;return `<button class="term-row ${selected?'selected':''}" data-id="${e.id}" aria-expanded="${selected}"><span class="row-top"><strong>${highlight(e.term)}</strong><span class="row-zh">${highlight(e.zh)}</span></span><span class="row-summary">${highlight(e.summary)}</span><span class="row-tags">${esc(kind)} · ${esc(e.group)}</span><span class="row-arrow" aria-hidden="true">↗</span></button>`}
function welcome(){return `<div class="welcome-detail"><div class="detail-top">顺着概念读</div><h2>模型是怎样训练出来的？</h2><div class="concept-chain"><button data-resolve="pre-training">预训练</button><span>→</span><button data-resolve="mid-training">中期训练</button><span>→</span><button data-resolve="post-training">后训练</button></div><p>从大规模文本中学习语言，再加入领域数据、指令和反馈。沿着几个词，看看训练的每一步在做什么。</p><div class="preview-article"><h3>读到这里，顺手查一下</h3><p>一个 <button class="inline-term" data-peek="agent">Agent</button> 会调用工具、查看结果，再决定下一步。<button class="inline-term" data-peek="harness">Harness</button> 负责让这个过程持续运行，并管理执行中的状态和上下文。</p><a class="preview-link" href="../zh/agent.html" target="_blank" rel="noopener">继续读 Agent 介绍 ↗</a></div></div>`}
function detail(){const e=byId.get(state.id),pane=$('detail');pane.classList.toggle('open',!!e);document.body.classList.toggle('detail-open',!!e);const modal=!!e&&matchMedia('(max-width:950px)').matches;if(modal){pane.setAttribute('role','dialog');pane.setAttribute('aria-modal','true')}else{pane.removeAttribute('role');pane.removeAttribute('aria-modal')}if(!e){pane.innerHTML=welcome();return;}
const cat=catMap.get(e.category),rels=e.related.map(resolve).filter(r=>r&&r.id!==e.id);const sources=e.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener"><span>${esc(s.title)}</span><span aria-hidden="true">↗</span></a>`).join('');
pane.innerHTML=`<div class="detail-top"><span>${esc(cat.short)} · ${esc(e.group)}</span><div class="detail-tools"><button id="copy-term" aria-label="复制词条链接">复制链接</button><button id="close-detail" aria-label="返回词条列表">返回</button></div></div><h2 class="detail-title" tabindex="-1">${esc(e.term)}</h2><p class="detail-zh">${esc(e.zh)}</p>${e.aliases.length?`<p class="alias-line">${e.aliases.slice(0,7).map(esc).join(' / ')}</p>`:''}<p class="definition">${esc(e.summary)}</p><div class="explanation">${e.detail.map(p=>`<p>${esc(p)}</p>`).join('')}</div>${rels.length?`<h3 class="detail-section-title">相关概念</h3><div class="related">${[...new Map(rels.map(r=>[r.id,r])).values()].slice(0,6).map(r=>`<button data-id="${r.id}">${esc(r.term)}</button>`).join('')}</div>`:''}<h3 class="detail-section-title">继续了解</h3><div class="source-links">${sources}<a href="${esc(cat.guide)}" target="_blank" rel="noopener"><span>${esc(cat.guideTitle)}</span><span>↗</span></a></div>`;
}
function render(){nav();if($('query').value!==state.q)$('query').value=state.q;$('clear').hidden=!state.q;
 const c=catMap.get(state.cat);$('section-title').textContent=state.q?'搜索结果':c?c.name:state.all?'全部词条':'常用词条';$('all-terms').hidden=!!state.cat||state.all||!!state.q;
 const venue=state.cat==='venues';$('kind-filter').hidden=!venue;$('kind').value=state.kind;
 const groups=c?[...new Set(entries.filter(e=>e.categories.includes(c.id)&&(!state.kind||e.kind===state.kind)).map(e=>e.group))]:[];
 $('group-filter').hidden=!c||groups.length<2;$('group').innerHTML='<option value="">全部主题</option>'+groups.map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join('');$('group').value=state.group;
 let result=engine.search(state.q,{category:state.cat,kind:state.kind,group:state.group});
 if(!state.q&&!state.cat&&!state.all)result=common.map(resolve).filter(Boolean);
 if(!state.q&&state.cat)result.sort((a,b)=>a.group.localeCompare(b.group,'zh')||0);
 visible=result.slice(0,limit);$('result-count').textContent=`${result.length} 个词条`;
 let lastGroup='';$('results').innerHTML=visible.map(e=>{const h=!state.q&&state.cat&&!state.group&&e.group!==lastGroup?`<h3 class="group-heading">${esc(e.group)}</h3>`:'';lastGroup=e.group;return h+row(e)}).join('');
 if(!result.length)$('results').innerHTML=`<div class="empty"><h3>没有找到匹配的词条</h3><p>${state.cat?'可以扩大到全部方向，或换一个关键词。':'试试中文名称、英文全称或缩写。'}</p>${state.cat?'<button id="search-everywhere">搜索全部方向</button>':''}<a href="https://github.com/Takamatsu-Hikaru/AI-Research-Guide/issues/new" target="_blank" rel="noopener">补充这个词 ↗</a></div>`;
 $('more').hidden=result.length<=limit;$('more').textContent=`继续显示 · 还有 ${Math.max(0,result.length-limit)} 个`;
 detail();focusIndex=-1;
}
function openTerm(id){if(!byId.has(id))return;returnFocus=document.activeElement;returnY=scrollY;go({id});$('detail').scrollTop=0;if(matchMedia('(max-width:950px)').matches)$('detail').querySelector('h2').focus({preventScroll:true})}
function closeTerm(){go({id:''});if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});else document.querySelector(`.term-row[data-id="${returnFocus?.dataset?.id||''}"]`)?.focus({preventScroll:true});scrollTo(0,returnY)}
let inputTimer;function input(){clearTimeout(inputTimer);inputTimer=setTimeout(()=>{limit=24;go({q:$('query').value.trim(),id:'',all:false},{replace:true})},65)}
$('query').addEventListener('input',input);$('query').addEventListener('compositionend',input);$('search-form').addEventListener('submit',e=>{e.preventDefault();clearTimeout(inputTimer);go({q:$('query').value.trim(),id:''},{replace:true});if(visible.length)openTerm(visible[0].id)});
$('query').addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();document.querySelector('.term-row')?.focus()}});
document.addEventListener('click',async event=>{const t=event.target.closest('button,a');if(!t)return;
 if(t.classList.contains('nav-active')){closeMenu();return}
 if(t.dataset.id){openTerm(t.dataset.id);return}if(t.dataset.resolve){const r=resolve(t.dataset.resolve);if(r)openTerm(r.id);return}
 if(t.dataset.peek){const r=resolve(t.dataset.peek);if(r){$('peek-content').innerHTML=`<h2>${esc(r.term)}</h2><p>${esc(r.summary)}</p><button id="peek-full" data-target="${r.id}">查看完整词条 →</button>`;$('term-peek').showModal()}return}
 if(t.id==='peek-full'){$('term-peek').close();openTerm(t.dataset.target);return}
 if(t.hasAttribute('data-cat')){limit=24;go({cat:t.dataset.cat,group:'',kind:'',id:'',q:'',all:!t.dataset.cat});closeMenu();window.scrollTo({top:0});return}
 if(t.hasAttribute('data-query')){limit=24;go({q:t.dataset.query,cat:'',group:'',kind:'',id:''});$('query').focus();return}
 if(t.id==='close-detail'){closeTerm();return}
 if(t.id==='copy-term'){const url=location.href;try{await navigator.clipboard.writeText(url);toast('词条链接已复制')}catch{let input=document.createElement('input');input.className='copy-fallback';input.readOnly=true;input.value=url;$('detail').querySelector('.detail-top').after(input);input.select();if(document.execCommand('copy')){input.remove();toast('词条链接已复制')}else toast('链接已选中，可复制')}return}
 if(t.id==='clear'){$('query').value='';go({q:'',id:''},{replace:true});$('query').focus()}
 if(t.id==='all-terms'){limit=24;go({all:true,id:''})}if(t.id==='more'){limit+=24;render()}
 if(t.id==='search-everywhere'){go({cat:'',kind:'',group:''})}
 if(t.id==='theme'){const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('wiki-theme',theme)}catch{}}
 if(t.id==='menu'){const open=!document.body.classList.contains('nav-open');document.body.classList.toggle('nav-open',open);$('menu').setAttribute('aria-expanded',open);$('shade').hidden=!open}
 if(t.id==='shade')closeMenu();if(t.id==='close-peek')$('term-peek').close();
});
function closeMenu(){document.body.classList.remove('nav-open');$('menu').setAttribute('aria-expanded','false');$('shade').hidden=true}
$('kind').addEventListener('change',()=>{limit=24;go({kind:$('kind').value,group:'',id:''})});$('group').addEventListener('change',()=>{limit=24;go({group:$('group').value,id:''})});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();if(state.id)go({id:''});$('query').focus();$('query').select()}if(e.key==='Escape'){if($('term-peek').open)return;if(document.body.classList.contains('nav-open'))closeMenu();else if(state.id)closeTerm();else $('query').blur()}
 if(e.key==='Tab'&&state.id&&matchMedia('(max-width:950px)').matches&&!document.body.classList.contains('nav-open')){const items=[...$('detail').querySelectorAll('button,a[href],input')];const first=items[0],last=items.at(-1);if(e.shiftKey&&(document.activeElement===first||!$('detail').contains(document.activeElement))){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}
 if(e.target.classList.contains('term-row')&&['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();const rows=[...document.querySelectorAll('.term-row')];const i=rows.indexOf(e.target);rows[Math.max(0,Math.min(rows.length-1,i+(e.key==='ArrowDown'?1:-1)))].focus()}
});
let toastTimer;function toast(s){$('toast').textContent=s;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2400)}
window.addEventListener('popstate',()=>{state=parse();render()});window.addEventListener('hashchange',()=>{state=parse();render()});state=parse();render();
window.wikiTest={search:engine.search,entries,categories,resolve};
})();
