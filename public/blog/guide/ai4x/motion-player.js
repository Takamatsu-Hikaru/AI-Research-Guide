(()=>{
let mounted=null,dispose=null;
window.initAI4XMotion=()=>{
const nextHost=document.querySelector('.ai4x-expanded #scene-host');
if(nextHost===mounted)return;
if(dispose){dispose();dispose=null}mounted=nextHost;
if(!nextHost)return;
const TOPICS=[...document.querySelectorAll('.ai4x-domain[data-topic]')].map(el=>({id:el.dataset.topic,group:el.dataset.group,short:el.dataset.short}));
const lang=document.querySelector('.ai4x-expanded').dataset.lang||'zh',english=lang==='en';
const tr=s=>english?(window.AI4X_EN?.[s]||s):s;
const anchor=id=>document.body.dataset.club==='true'?'#/ai4x/'+id:'#'+id;

const $=s=>document.querySelector(s),host=$('#scene-host'),area=$('#process'),select=$('#topic-select');
const registry=window.AI4X_MOTION,kit=window.AI4X_KIT,reduce=matchMedia('(prefers-reduced-motion: reduce)');
host.innerHTML='<canvas role="img" aria-label="研究过程动态示意"></canvas>';
const canvas=host.firstElementChild,ctx=canvas.getContext('2d');
const fill=ctx.fillText.bind(ctx);ctx.fillText=(s,x,y,...args)=>fill(tr(s),x,y,...args);
let current='molecule',progress=reduce.matches?.65:.025,paused=reduce.matches,visible=true,last=0,raf=0,lastStage=-1;
const groups=[...new Set(TOPICS.map(t=>t.group))];
$('#scene-groups').innerHTML=groups.map((g,i)=>`<button type="button" data-group="${i}">${g}</button>`).join('');
$('#scene-groups').querySelectorAll('button').forEach(b=>b.onclick=()=>choose(TOPICS.find(t=>t.group===groups[+b.dataset.group]).id));
function tabs(t){
 $('#scene-groups').querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',groups[i]===t.group));
 const members=TOPICS.filter(x=>x.group===t.group);
 $('#scene-tabs').innerHTML=members.map(x=>`<button type="button" role="tab" aria-selected="${x.id===t.id}" tabindex="${x.id===t.id?0:-1}" data-id="${x.id}">${x.short}</button>`).join('');
 [...$('#scene-tabs').children].forEach((b,i)=>{b.onclick=()=>{choose(b.dataset.id);$('#scene-tabs [aria-selected="true"]').focus({preventScroll:true})};b.onkeydown=e=>{let j;if(e.key==='ArrowRight')j=(i+1)%members.length;else if(e.key==='ArrowLeft')j=(i+members.length-1)%members.length;else if(e.key==='Home')j=0;else if(e.key==='End')j=members.length-1;else return;e.preventDefault();choose(members[j].id);$('#scene-tabs [aria-selected="true"]').focus({preventScroll:true})}});
}
function resize(){const w=host.clientWidth,dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(w*440/900*dpr);ctx.setTransform(canvas.width/900,0,0,canvas.height/440,0,0);draw()}
function draw(){
 const scene=registry[current];
 ctx.save();ctx.setTransform(canvas.width/900,0,0,canvas.height/440,0,0);ctx.clearRect(0,0,900,440);
 const bg=ctx.createLinearGradient(0,0,900,440);bg.addColorStop(0,'#f4f3ea');bg.addColorStop(.6,'#edf2e9');bg.addColorStop(1,'#ebece1');ctx.fillStyle=bg;ctx.fillRect(0,0,900,440);
 ctx.strokeStyle='#5c7b6110';ctx.lineWidth=1;for(let y=20;y<440;y+=28)for(let x=20;x<900;x+=28){ctx.beginPath();ctx.arc(x,y,.65,0,Math.PI*2);ctx.stroke()}
 if(scene){ctx.save();try{scene.draw(ctx,progress,kit)}finally{ctx.restore()}}else{kit.text(ctx,'正在制作这一方向的演示',450,220,25,kit.C.ink,'center')}
 ctx.restore();
 const stage=Math.min(3,Math.floor(progress*4));if(stage!==lastStage){lastStage=stage;[...$('#process-labels').children].forEach((b,i)=>{b.classList.toggle('active',i===stage);if(i===stage)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')})}
 $('.scene-progress i').style.transform=`scaleX(${progress})`;
}
function canPlay(){return !paused&&visible&&!document.hidden&&host.isConnected}
function tick(now){raf=0;if(!canPlay())return;if(last)progress=(progress+Math.min((now-last)/1000,.08)/(registry[current]?.duration||18))%1;last=now;draw();raf=requestAnimationFrame(tick)}
function schedule(){cancelAnimationFrame(raf);last=0;if(canPlay())raf=requestAnimationFrame(tick)}
function controls(){area.classList.toggle('paused',paused);$('#motion-toggle').textContent=paused?(english?'Play':'播放'):(english?'Pause':'暂停');$('#motion-toggle').setAttribute('aria-pressed',String(paused));schedule()}
function choose(id){if(!TOPICS.some(t=>t.id===id))return;current=id;progress=reduce.matches?.65:.025;lastStage=-1;select.value=id;const t=TOPICS.find(x=>x.id===id);tabs(t);canvas.setAttribute('aria-label',`${t.short}：${(registry[id]?.steps||[]).map(tr).join(', ')}`);$('#process-labels').innerHTML=(registry[id]?.steps||[]).map(tr).map((s,i)=>`<button type="button" data-step="${i}"><span>${String(i+1).padStart(2,'0')}</span>${s}</button>`).join('');$('#process-labels').querySelectorAll('button').forEach(b=>b.onclick=()=>{progress=(+b.dataset.step+.25)/4;lastStage=-1;draw();schedule()});$('#read-topic').href=anchor(id);draw();schedule()}
$('#motion-toggle').onclick=()=>{paused=!paused;controls()};
select.onchange=()=>choose(select.value);
document.querySelectorAll('[data-scene]').forEach(b=>b.onclick=()=>{choose(b.dataset.scene);area.scrollIntoView({behavior:reduce.matches?'instant':'smooth',block:'start'})});
const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
const visibilityObserver=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;schedule()},{threshold:.05});visibilityObserver.observe(host);
document.addEventListener('visibilitychange',schedule);
const reducedChange=e=>{paused=e.matches;if(paused){progress=.65;draw()}controls()};reduce.addEventListener('change',reducedChange);
choose(current);resize();controls();
window.ai4xMotion={select:choose,seek(t){progress=kit.clamp(t,0,.9999);lastStage=-1;draw();schedule()},pause(){paused=true;controls()},play(){paused=false;controls()},get state(){return {id:current,t:progress,paused,visible,stage:lastStage}}};
dispose=()=>{cancelAnimationFrame(raf);resizeObserver.disconnect();visibilityObserver.disconnect();document.removeEventListener('visibilitychange',schedule);reduce.removeEventListener('change',reducedChange)};
};
window.initAI4XMotion();
})();
