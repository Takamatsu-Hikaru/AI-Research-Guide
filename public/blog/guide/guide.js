(()=>{
 const $=id=>document.getElementById(id),lang=document.body.dataset.lang,t=window.guideUI;
 $('theme').onclick=()=>{const dark=document.documentElement.dataset.theme!=='dark';document.documentElement.dataset.theme=dark?'dark':'light';try{localStorage.setItem('theme',dark?'dark':'light')}catch{}};
 const mq=matchMedia('(max-width:800px)');let lastFocus=null;
 function closeMenu(){document.body.classList.remove('navopen');$('menu').setAttribute('aria-expanded','false');$('shade').hidden=true;$('nav').inert=mq.matches;}
 function syncNav(){closeMenu();}mq.addEventListener('change',syncNav);syncNav();
 $('menu').onclick=()=>{if(document.body.classList.contains('navopen')){closeMenu();return;}$('nav').inert=false;document.body.classList.add('navopen');$('menu').setAttribute('aria-expanded','true');$('shade').hidden=false;$('opensearch').focus()};
 $('shade').onclick=()=>{closeMenu();$('menu').focus()};
 function reveal(){const id=decodeURIComponent(location.hash.slice(1));const el=document.getElementById(id);if(el){const d=el.closest('details');if(d)d.open=true;requestAnimationFrame(()=>el.scrollIntoView({block:'start'}))}$('language').hash=location.hash;}
 addEventListener('hashchange',reveal);if(location.hash)reveal();
 const expand=$('expand');if(expand)expand.onclick=()=>{const ds=[...document.querySelectorAll('details.qa')],open=ds.some(d=>!d.open);ds.forEach(d=>d.open=open);expand.textContent=open?t.collapse:t.all};
 const dialog=$('searchdialog'),input=$('searchinput'),results=$('results');
 function search(){const q=input.value.trim().toLocaleLowerCase();results.replaceChildren();if(!q){results.textContent=t.hint;return;}
  const terms=q.split(/\s+/);const found=window.guideSearch[lang].map(x=>({x,score:terms.every(s=>(x.title+' '+x.body).toLocaleLowerCase().includes(s))?(x.title.toLocaleLowerCase().includes(q)?5:1):0})).filter(x=>x.score).sort((a,b)=>b.score-a.score).slice(0,30);
  if(!found.length){results.textContent=t.empty;return;}
  for(const {x} of found){const a=document.createElement('a');a.className='result';a.href=x.url;const title=document.createElement('strong');title.textContent=x.title;const snippet=document.createElement('span');const pos=x.body.toLocaleLowerCase().indexOf(terms[0]);snippet.textContent=x.body.slice(Math.max(0,pos-30),Math.max(0,pos-30)+140)+'…';a.append(title,snippet);a.onclick=()=>{dialog.close();closeMenu();if(new URL(a.href).pathname===location.pathname)setTimeout(reveal,0)};results.append(a);}
 }
 function openSearch(){lastFocus=document.activeElement;dialog.showModal();input.value='';search();input.focus()}
 $('opensearch').onclick=openSearch;$('mobile-search').onclick=openSearch;$('closesearch').onclick=()=>dialog.close();input.oninput=search;dialog.onclose=()=>lastFocus?.focus();dialog.onclick=e=>{if(e.target===dialog)dialog.close()};
 addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();dialog.open?dialog.close():openSearch()}if(e.key==='Escape'&&!dialog.open){closeMenu();$('menu').focus()}if(e.key==='Tab'&&mq.matches&&document.body.classList.contains('navopen')&&!dialog.open){const items=[...$('nav').querySelectorAll('a,button')];if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1).focus()}else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0].focus()}}});
 addEventListener('beforeprint',()=>document.querySelectorAll('.qa').forEach(d=>d.open=true));
})();
