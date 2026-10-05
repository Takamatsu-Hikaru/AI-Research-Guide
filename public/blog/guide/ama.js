(() => {
const root=document.getElementById('ama-app');if(!root)return;
const zh=document.body.dataset.lang==='zh';
const feed='https://raw.githubusercontent.com/Takamatsu-Hikaru/Takamatsu-Hikaru.github.io/ama-data/ama.json';
const board='https://github.com/Takamatsu-Hikaru/Takamatsu-Hikaru.github.io/discussions';
const t=zh?{posts:'篇帖子',empty:'还没有帖子。',noMatch:'没有找到匹配的帖子。',reply:'回复',failed:'帖子加载失败，请重试或进入讨论区。',deleted:'已注销用户',locked:'已锁定',loading:'加载帖子…'}:{posts:'posts',empty:'No posts yet.',noMatch:'No matching posts.',reply:'Reply',failed:'Could not load posts. Retry or open discussions.',deleted:'Deleted user',locked:'Locked',loading:'Loading posts…'};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=s=>esc(s).replace(/https?:\/\/[^\s<>]+/g,url=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
const date=s=>{const d=new Date(s);return Number.isNaN(d.getTime())?'':d.toLocaleDateString(zh?'zh-CN':'en-US',{year:'numeric',month:'short',day:'numeric'})};
const who=author=>esc(author?.login||t.deleted);
let items=[],loaded=false,controller;
const query=root.querySelector('#ama-query'),list=root.querySelector('#ama-list'),count=root.querySelector('#ama-count'),notice=root.querySelector('#ama-notice'),refresh=root.querySelector('#ama-refresh');
const render=()=>{
 const open=new Set([...list.querySelectorAll('details[open]')].map(x=>x.id));
 const q=query.value.trim().toLocaleLowerCase();
 const selected=items.filter(x=>(x.title+' '+x.body+' '+(x.author?.login||'')).toLocaleLowerCase().includes(q));
 count.textContent=loaded?`${items.length} ${t.posts}`:t.loading;
 list.innerHTML=selected.map(x=>{
  const url=board+'/'+x.number;
  const reply=r=>`<div class="ama-reply"><div class="ama-reply-meta"><b>${who(r.author)}</b><time datetime="${esc(r.createdAt)}">${date(r.createdAt)}</time></div><p>${text(r.body)}</p>${(r.replies||[]).map(n=>`<div class="ama-nested-reply"><b>${who(n.author)}</b><p>${text(n.body)}</p></div>`).join('')}</div>`;
  return `<details class="ama-thread" id="thread-${x.number}"${open.has('thread-'+x.number)?' open':''}><summary><span class="ama-count-badge">${x.commentCount}<small>${zh?'回复':'replies'}</small></span><span class="ama-thread-heading"><strong>${esc(x.title)}</strong><span class="ama-thread-meta">${who(x.author)}<span>·</span><time datetime="${esc(x.updatedAt)}">${date(x.updatedAt)}</time>${x.locked?`<span>· ${t.locked}</span>`:''}</span></span></summary><div class="ama-thread-body"><p>${text(x.body)}</p><div class="ama-replies">${x.comments.map(reply).join('')}</div><div class="ama-thread-actions"><a href="${url}" target="_blank" rel="noopener">${zh?'打开帖子':'Open post'}</a>${!x.locked?`<a class="ama-primary" href="${url}#new_comment_field" target="_blank" rel="noopener">${t.reply}</a>`:''}</div></div></details>`;
 }).join('')||`<div class="ama-empty">${loaded?(q?t.noMatch:t.empty):t.loading}</div>`;
};
const load=async()=>{
 controller?.abort();controller=new AbortController();const current=controller;
 refresh.disabled=true;notice.textContent='';
 try{
  const response=await fetch(feed+'?v='+Math.floor(Date.now()/30000),{signal:current.signal,cache:'no-store'});
  if(!response.ok)throw Error('HTTP '+response.status);
  const data=await response.json();
  if(!Array.isArray(data.posts)||!data.posts.every(x=>Number.isInteger(x.number)&&typeof x.title==='string'&&typeof x.body==='string'&&Array.isArray(x.comments)&&Number.isInteger(x.commentCount)))throw Error('Invalid feed');
  if(!root.isConnected||current!==controller)return;
  items=data.posts;loaded=true;render();
 }catch(e){if(e.name!=='AbortError'&&root.isConnected){notice.textContent=t.failed;if(!loaded){count.textContent='';list.innerHTML=''}}}
 finally{if(root.isConnected&&current===controller)refresh.disabled=false}
};
query.addEventListener('input',render);refresh.addEventListener('click',load);
window.addEventListener('focus',function back(){if(!root.isConnected){window.removeEventListener('focus',back);controller?.abort();return}load()});
render();load();
})();
