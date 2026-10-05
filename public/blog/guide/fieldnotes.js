(() => {
 const lang=document.body.dataset.lang;
 let active=null,opener=null;
 const closePaper=d=>{if(!d.open||d.classList.contains('leaving'))return;if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.close();return}d.classList.add('leaving');setTimeout(()=>{d.close();d.classList.remove('leaving')},180)};
 const openPaper=id=>{const d=document.getElementById('paper-'+id);if(!d)return;if(active&&active!==d)active.close();if(!d.open){opener=document.activeElement;d.showModal();d.querySelector('[data-close-paper]').focus()}active=d};
 document.querySelectorAll('[data-paper]').forEach(b=>b.addEventListener('click',()=>{history.replaceState(null,'','#paper-'+b.dataset.paper);openPaper(b.dataset.paper)}));
 const fromHash=()=>{if(location.hash.startsWith('#paper-'))openPaper(decodeURIComponent(location.hash.slice(7)))};
 document.querySelectorAll('.paper-dialog').forEach(d=>{d.querySelector('[data-close-paper]').addEventListener('click',()=>closePaper(d));d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom )closePaper(d)}});d.addEventListener('cancel',e=>{e.preventDefault();closePaper(d)});d.addEventListener('close',()=>{if(active===d)active=null;if(location.hash==='#'+d.id)history.replaceState(null,'',location.pathname+location.search);if(opener?.isConnected)opener.focus()})});
 window.addEventListener('hashchange',fromHash);fromHash();
 document.querySelectorAll('[data-check]').forEach(c=>{const key='guide-check-'+c.dataset.check;try{c.checked=localStorage.getItem(key)==='1'}catch{}c.addEventListener('change',()=>{try{localStorage.setItem(key,c.checked?'1':'0')}catch{}})});
 const filter=()=>{const domain=document.getElementById('paper-domain')?.value||'',q=(document.getElementById('paper-query')?.value||'').toLowerCase();let n=0;document.querySelectorAll('.paper-library .paper-item').forEach(el=>{const show=(!domain||el.dataset.domains.split(' ').includes(domain))&&el.dataset.find.toLowerCase().includes(q);el.hidden=!show;if(show)n++});const count=document.getElementById('paper-count');if(count)count.textContent=n+' '+(lang==='zh'?'篇代表作':'papers')};
 document.getElementById('paper-domain')?.addEventListener('change',filter);document.getElementById('paper-query')?.addEventListener('input',filter);
})();
