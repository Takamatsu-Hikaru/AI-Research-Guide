(() => {
 'use strict';
 const assetBase=new URL('.',document.currentScript.src);
 const photo=new Image();photo.src=window.guideMotionPhoto;
 const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x)},mix=(a,b,t)=>a+(b-a)*t;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let scenes=[],raf=0,last=0;
 function palette(){const s=getComputedStyle(document.documentElement),get=(k,f)=>s.getPropertyValue(k).trim()||f;return {ink:get('--ink','#192d36'),blue:get('--blue',get('--accent','#315fd4')),soft:get('--soft',get('--line','#d8d5cb')),paper:get('--paper','#f5f2e9'),wash:get('--paper-2',get('--wash','#ebe7db')),green:'#389883',orange:'#c47d4a'};}
 function setup(el){const canvas=el.querySelector('canvas');if(!canvas)return;const s={el,canvas,ctx:canvas.getContext('2d'),time:0,visible:false,step:-1,colors:palette(),noise:null};scenes.push(s);s.resize=new ResizeObserver(()=>size(s));s.resize.observe(el);size(s);return s;}
 function size(s){const r=s.canvas.getBoundingClientRect();if(!r.width)return;const d=Math.min(devicePixelRatio||1,2);s.canvas.width=Math.round(r.width*d);s.canvas.height=Math.round(r.height*d);s.ratio=s.canvas.width/720;s.h=s.canvas.height/s.ratio;draw(s,reduced.matches ? .99 : s.time/16000);}
 function pen(s){const c=s.ctx,C=s.colors;c.setTransform(s.ratio,0,0,s.ratio,0,0);c.globalAlpha=1;c.clearRect(0,0,720,s.h);c.lineCap='round';c.lineJoin='round';c.font='500 24px system-ui';
  const rr=(x,y,w,h,r=12,fill=C.paper,stroke)=>{c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.lineWidth=1.5;c.stroke()}};
  const line=(a,b,color=C.soft,width=2,alpha=1)=>{c.globalAlpha=alpha;c.beginPath();c.moveTo(...a);c.lineTo(...b);c.strokeStyle=color;c.lineWidth=width;c.stroke();c.globalAlpha=1};
  const dot=(x,y,r,color=C.blue,alpha=1)=>{c.globalAlpha=alpha;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fillStyle=color;c.fill();c.globalAlpha=1};
  const text=(t,x,y,color=C.ink,size=24)=>{c.fillStyle=color;c.font='500 '+size+'px system-ui';c.fillText(t,x,y)};
  const tick=(x,y,k=1)=>{c.beginPath();c.moveTo(x-10*k,y);c.lineTo(x-2*k,y+8*k);c.lineTo(x+13*k,y-10*k);c.lineWidth=4*k;c.strokeStyle=C.green;c.stroke()};
  const bars=(x,y,w,n=3,progress=1,color=C.soft)=>{for(let i=0;i<n;i++){const q=clamp(progress*n-i);if(q)rr(x,y+i*19,w*(i===n-1?.63:1)*q,6,3,color)}};
  const path=(pts,color=C.blue,width=3,progress=1)=>{if(!pts.length)return;c.beginPath();c.moveTo(...pts[0]);const amount=clamp(progress)*(pts.length-1);for(let i=1;i<=Math.floor(amount);i++)c.lineTo(...pts[i]);const i=Math.floor(amount);if(i<pts.length-1)c.lineTo(mix(pts[i][0],pts[i+1][0],amount-i),mix(pts[i][1],pts[i+1][1],amount-i));c.strokeStyle=color;c.lineWidth=width;c.stroke()};
  const packet=(a,b,t,color=C.blue)=>{line(a,b);const q=smooth(t);dot(mix(a[0],b[0],q),mix(a[1],b[1],q),6,color)};
  const img=(x,y,w,h)=>{c.save();c.beginPath();c.roundRect(x,y,w,h,12);c.clip();if(photo.complete&&photo.naturalWidth){const z=Math.max(w/photo.width,h/photo.height),sw=w/z,sh=h/z;c.drawImage(photo,(photo.width-sw)/2,(photo.height-sh)/2,sw,sh,x,y,w,h)}else rr(x,y,w,h,0,C.soft);c.restore()};
  return {c,C,rr,line,dot,text,tick,bars,path,packet,img};
 }
 function llm(s,t,p){const {c,C,rr,line,dot,bars,text,tick}=p;const y=s.h*.49;
  rr(40,28,640,56,15,C.paper,C.soft);bars(64,48,410,1,smooth(t/.12),C.ink);dot(648,56,17,t>.12?C.blue:C.soft);line([640,58],[648,48],C.paper,3);line([648,48],[656,58],C.paper,3);
  const q=smooth((t-.12)/.13);if(t>.81){rr(256,110,27,25,5,C.green)}for(let i=0;i<6;i++){const x=52+i*34;rr(x,110,27,25,5,i%2?C.blue:C.orange);c.globalAlpha=.6;line([x+17,136],[340,y-24],C.blue,1,q);c.globalAlpha=1}
  for(let z=2;z>=0;z--){rr(280+z*12,y-65-z*9,130,130,15,C.paper,C.soft);for(let i=0;i<4;i++)for(let j=0;j<4;j++){const k=Math.sin((i+j*2)*2+t*28);dot(308+z*12+i*25,y-40-z*9+j*25,4+(t>.22&&t<.54?k+1:0),C.blue,.25+.65*clamp(k))}}
  if(t>.25){const a=Math.floor(t*20)%4;for(let i=0;i<4;i++)line([310,y-35+a*25],[385,y-35+i*25],C.blue,2,.2+.6*smooth((t-.25)/.2))}
  for(let i=0;i<4;i++){const h=[.38,.72,1,.23][i];rr(490,y-65+i*32,155,12,6,C.soft);rr(490,y-65+i*32,155*h*smooth((t-.38)/.18),12,6,i===2?C.blue:C.orange)}
  if(t>.58){const k=smooth((t-.58)/.13);c.globalAlpha=k;rr(575,y+53,34,24,5,C.blue);c.globalAlpha=1;const pts=[[592,y+77],[592,s.h-103],[170,s.h-103],[170,142]];pathArrow(p,pts,k,C.blue)}
  rr(40,s.h-86,640, 60,15,C.paper,C.soft);bars(62,s.h-65,510,2,smooth((t-.68)/.2),C.ink);if(t>.9)tick(646,s.h-54,.8);
 }
 function pathArrow(p,pts,t,col){p.path(pts,col,2.5,t);const i=Math.min(pts.length-2,Math.floor(t*(pts.length-1))),q=t*(pts.length-1)-i;p.dot(mix(pts[i][0],pts[i+1][0],q),mix(pts[i][1],pts[i+1][1],q),5,col)}
 function agent(s,t,p){const {C,rr,dot,line,bars,tick,packet}=p,y=s.h/2;
  rr(36,y-61,168,122,15,C.paper,C.soft);bars(56,y-36,115,3,smooth(t/.14),C.ink);
  rr(286,y-67,144,134,24,C.paper,C.blue);for(let i=0;i<6;i++){const a=i*Math.PI/3+t*2;dot(357+Math.cos(a)*37,y+Math.sin(a)*37,5,C.blue);line([357,y],[357+Math.cos(a)*37,y+Math.sin(a)*37],C.blue,1,.35)}dot(357,y,12,C.blue);
  rr(522,40,154,96,14,C.paper,C.soft);dot(570,77,16,C.orange);line([582,89],[598,105],C.orange,5);bars(605,70,47,2,1);
  rr(522,s.h-137,154,96,14,C.paper,C.soft);p.text('›_',548,s.h-91,C.green,34);bars(600,s.h-103,50,2,1);
  if(t<.22)packet([204,y],[286,y],t/.22);else line([204,y],[286,y],C.blue);
  if(t>.2&&t<.45)packet([430,y-24],[522,88],(t-.2)/.25,C.orange);
  if(t>.45&&t<.58)packet([522,100],[430,y],(t-.45)/.13,C.orange);
  if(t>.48){bars(550,114,90,1,smooth((t-.48)/.1),C.orange)}
  if(t>.58&&t<.73)packet([430,y+24],[522,s.h-87],(t-.58)/.15,C.green);
  if(t>.73&&t<.86)packet([522,s.h-77],[430,y+25],(t-.73)/.13,C.green);
  if(t>.78){p.tick(649,s.h-66,.55)}
  if(t>.86){rr(50,y+16,130,32,8,C.wash);bars(61,y+29, 70,1,smooth((t-.86)/.1),C.green);tick(164,y+31,.7);packet([286,y+22],[204,y+22],(t-.86)/.1,C.green)}
 }
 function vision(s,t,p){const {c,C,rr,line,dot,img}=p,y=s.h/2;
  img(25,y-89,165,178);line([190,y],[234,y]);for(let z=0;z<4;z++){const x=237+z*39,h=142-z*22;rr(x,y-h/2,29,h,3,C.paper,C.soft);for(let j=0;j<6;j++)for(let i=0;i<2;i++){const a=.2+.8*clamp(Math.sin(t*18-z+j+i));c.globalAlpha=a;rr(x+5+i*11,y-h/2+6+j*(h-12)/6,7,(h-22)/6,1,t>(z+1)*.11?C.blue:C.soft)}c.globalAlpha=1}line([390,y],[443,y]);img(460,y-108,230,216);
  const q=smooth((t-.58)/.25);if(q){c.globalAlpha=q;c.strokeStyle=C.blue;c.lineWidth=3;c.strokeRect(491,y-93,172,173);c.globalAlpha=1}
  const scan=(t*1.7%1);if(t<.65){c.globalAlpha=.3;rr(25+scan*158,y-89,5,178,0,C.blue);c.globalAlpha=1}
 }
 function multimodal(s,t,p){const {c,C,rr,line,dot,bars,img}=p,y=s.h/2;
  img(30,25,180,170);rr(30,s.h-115,180,80,12,C.paper,C.soft);bars(49,s.h-91,135,2,1,C.ink);
  c.strokeStyle=C.orange;c.lineWidth=3;c.strokeRect(73, 60,102,108);const a=smooth((t-.12)/.25);line([175,119],[324,y-22],C.orange,3,a);line([185,s.h- 70],[324,y+33],C.blue,3,a);
  if(t>.16&&t<.52){for(let k=0;k<3;k++){const q=(t*3+k*.22)%1;p.dot(mix(204,310,q),mix(119,y-22,q),5,C.orange);p.dot(mix(185,310,q),mix(s.h-70,y+33,q),5,C.blue)}}
  for(let i=0;i<4;i++)for(let j=0;j<4;j++){const x=324+j*22,yy=y-43+i*26;dot(x,yy,5+i%2,t>.35?(i+j)%2?C.orange:C.blue:C.soft);if(j<3&&t>.35)line([x,yy],[x+22,yy],C.soft)}
  rr(491,y-84,191,168,16,C.paper,C.soft);bars(512,y-54,142,4,smooth((t-.57)/.28),C.ink);if(t>.53)p.packet([416,y],[491,y],(t-.53)/.16);if(t>.88)p.tick(651,y+57,.9);
 }
 function generation(s,t,p){const {c,C,rr}=p;const w=500,h=Math.min(285,s.h-75),x=110,y=22;rr(x-8,y-8,w+16,h+16,16,C.paper,C.soft);
  if(photo.complete&&photo.naturalWidth){if(!s.frames){s.frames=[];const tmp=document.createElement('canvas');tmp.width=250;tmp.height=150;const ctx=tmp.getContext('2d',{willReadFrequently:true});const cropH=photo.width*150/250;ctx.drawImage(photo,0,(photo.height-cropH)*.48,photo.width,cropH,0,0,250,150);const orig=ctx.getImageData(0,0,250,150);let seed=31;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};const noise=Array.from({length:orig.data.length/4},()=>Math.sqrt(-2*Math.log(Math.max(rand(),.0001)))*Math.cos(2*Math.PI*rand()));for(let f=0;f<=40;f++){const frame=document.createElement('canvas');frame.width=250;frame.height=150;const cc=frame.getContext('2d');const a=f/40;const data=cc.createImageData(250,150);for(let i=0;i<data.data.length;i+=4){for(let j=0;j<3;j++)data.data[i+j]=128+(orig.data[i+j]-128)*Math.sqrt(a)+noise[i/4]*85*Math.sqrt(1-a);data.data[i+3]=255}cc.putImageData(data,0,0);s.frames.push(frame)}}const q=smooth((t-.08)/.78)*40,i=Math.min(39,Math.floor(q));c.save();c.beginPath();c.roundRect(x,y,w,h,10);c.clip();c.drawImage(s.frames[i],x,y,w,h);c.globalAlpha=q-i;c.drawImage(s.frames[i+1],x,y,w,h);c.globalAlpha=1;c.restore()}
  const yy=y+h+35;p.line([110,yy],[610,yy],C.soft,3);p.line([110,yy],[110+500*smooth((t-.08)/.78),yy],C.blue,3);p.dot(110+500*smooth((t-.08)/.78),yy,7,C.blue);for(let i=0;i<=8;i++)p.dot(110+i*62.5,yy,3,i/8<t?C.blue:C.soft);
 }
 const mazeBlocks=[[2,0],[2,1],[2,2],[4,2],[4,3]];
 function maze(p,ox,oy,step=47){for(let y=0;y<5;y++)for(let x=0;x<7;x++){const blocked=mazeBlocks.some(b=>b[0]===x&&b[1]===y);p.rr(ox+x*step,oy+y*step,step-5,step-5,6,blocked?p.C.soft:p.C.paper)}p.dot(ox+6*step+21,oy+21,13,p.C.green);p.tick(ox+6*step+21,oy+21,.55)}
 const good=[[0,4],[1,4],[2,4],[3,4],[3,3],[3,2],[3,1],[4,1],[5,1],[6,1],[6,0]],bad=[[0,4],[0,3],[1,3],[1,2],[1,1],[1,0],[0,0]];
 function along(pts,q){const f=clamp(q)*(pts.length-1),i=Math.min(pts.length-2,Math.floor(f));return[mix(pts[i][0],pts[i+1][0],f-i),mix(pts[i][1],pts[i+1][1],f-i)]}
 function rl(s,t,p){const {C,rr,line,dot,path}=p,oy=(s.h-235)/2,ox=30;maze(p,ox,oy);const map=ps=>ps.map(([x,y])=>[ox+x*47+21,oy+y*47+21]);const a=map(bad),b=map(good);path(a,C.orange,3,clamp(t/.34));if(t>.38)path(b,C.green,4,smooth((t-.38)/.5));const pos=t<.38?along(a,t/.34):along(b,smooth((t-.38)/.5));dot(...pos,11,t<.38?C.orange:C.green);
  rr(407,oy,276,235,13,C.paper,C.soft);line([435,oy+190],[660,oy+190]);line([435,oy+190],[435,oy+35]);const curve=[[435,oy+180],[465,oy+172],[498,oy+175],[531,oy+122],[565,oy+99],[602,oy+55],[651,oy+39]];path(curve,C.green,4,t);const k=along(curve,t);dot(...k,6,C.green);for(let i=0;i<5;i++)rr(441+i*42,oy+211,28,5,2,i<Math.floor(t*6)?C.green:C.soft);
 }
 function world(s,t,p){const {c,C,line,dot,path,rr}=p,y=s.h/2;
  const frame=(x,yy,col,row,active)=>{rr(x-46,yy-37,92,74,10,C.paper,active?C.blue:C.soft);line([x-36,yy+22],[x+36,yy+22],C.soft,3);rr(x+10,yy+2,9,18,3,C.soft);const dx=col===0?-25:col===1?-10:27,dy=row===0?-20:row===1?-9:12;dot(x+dx,yy+dy,7,active?C.blue:C.orange);if(col===3&&row===1){line([x+32,yy+3],[x+32,yy+21],C.green,2);path([[x+32,yy+3],[x+21,yy+8],[x+32,yy+10]],C.green,2)}};
  frame(75,y,0,1,true);const branches=[[[124,y],[282,y-103],[455,y-120],[648,y-128]],[[124,y],[282,y],[455,y],[648,y]],[[124,y],[282,y+103],[455,y+120],[648,y+128]]];
  for(let i=0;i<3;i++){c.setLineDash([5,8]);path(branches[i],i===1?C.blue:C.soft,2,smooth(t/.55));c.setLineDash([]);for(let j=1;j<4;j++)if(t>j*.13)frame(...branches[i][j],j,i,i===1)}
  if(t>.6){const q=smooth((t-.6)/.32);path(branches[1],C.green,3,q);const pos=along(branches[1],q);dot(pos[0],pos[1]-9,9,C.green);if(t>.94)p.tick(649,y-15,.75)}
 }
 function embodied(s,t,p){const {c,C,rr,line,dot}=p;const floor=s.h- 60,grab=smooth((t-.18)/.22),carry=smooth((t-.48)/.26),release=smooth((t-.78)/.14);line([40,floor],[680,floor],C.soft,3);rr(535,floor-10,105,12,4,C.soft);const bx=mix(360,580,carry),by=floor-32-(Math.sin(carry*Math.PI)*90)*(1-release);rr(bx-22,by-22,44,44,7,C.orange);rr(bx-14,by-17,18,7,3,'#ffffff55');
  const handX=mix(255,mix(360,580,carry),grab),handY=mix(floor-150,by-36,grab)-Math.sin(carry*Math.PI)*10;const elbow=[180,floor-170];line([105,floor],[...elbow],C.ink,22);line(elbow,[handX,handY-32],C.ink,18);dot(105,floor,20,C.blue);dot(...elbow,17,C.blue);dot(handX,handY-32,13,C.blue);const gap=25-14*grab+14*release;line([handX,handY-22],[handX-gap,handY],C.ink,7);line([handX-gap,handY],[handX-gap,handY+25],C.ink,7);line([handX,handY-22],[handX+gap,handY],C.ink,7);line([handX+gap,handY],[handX+gap,handY+25],C.ink,7);rr(70,floor, 70,17,5,C.ink);
  rr(42,30,82,49,9,C.paper,C.soft);dot(83,54,13,C.blue);c.globalAlpha=.1;c.fillStyle=C.blue;c.beginPath();c.moveTo(120,74);c.lineTo(410,floor);c.lineTo(305,floor);c.closePath();c.fill();c.globalAlpha=1;if(t>.92)p.tick(580,floor-80,1.2);
 }
 function systems(s,t,p){const {C,rr,line,dot}=p;const y1=s.h*.30,y2=s.h*.72,phase=clamp((t-.1)/.8);for(const yy of [y1,y2]){line([45,yy+34],[678,yy+34]);rr(294,yy-37,118, 70,12,C.paper,C.soft)}for(let i=0;i<6;i++){const a=clamp(phase*6-i),x=phase*6<i?55+i*32:mix(255,480+i*32,a);rr(x,y1-18,24, 30,5,a===1?C.green:C.blue)}for(let i=0;i<6;i++){const q=clamp(phase*2.2),x=q<.5?mix(55+i*32,300+(i%3)*32,q*2):mix(300+(i%3)*32,480+i*32,(q-.5)*2);rr(x,y2-25+Math.floor(i/3)*31,24,25,5,q===1?C.green:C.orange)}p.text('1 × 6',44,y1-45,C.ink,30);p.text('6 × 1',44,y2-52,C.ink,30)}
 function ai4x(s,t,p){const {c,C,rr,line,dot}=p,y=s.h/2;const atoms=Array.from({length:6},(_,i)=>[120+Math.cos(i*Math.PI/3)*62,y+Math.sin(i*Math.PI/3)*62]);atoms.forEach((a,i)=>{line(a,atoms[(i+1)%6],C.ink,3);dot(...a,12,i===1?C.orange:i===4?C.blue:C.ink)});line(atoms[0],[221,y],C.ink,3);dot(221,y,10,C.green);if(t>.3&&t<.52){atoms.forEach((a,i)=>{const b=atoms[(i+1)%6],q=t*4%1;dot(mix(a[0],b[0],q),mix(a[1],b[1],q),5,C.blue)})}
  for(let i=0;i<7;i++){const h=(40+(Math.sin(i*5)*.5+.5)*110)*smooth((t-.52)/.18);rr(303+i*19,y+70-h,12,Math.max(3,h),4,t>.52?C.blue:C.soft)}line([250,y],[290,y],C.soft);line([450,y],[482,y],C.soft);rr(493,y-104,188,208,14,C.paper,C.soft);for(let i=0;i<4;i++){const q=smooth((t-.72-i*.025)/.13);rr(516,y-72+i*42,137,10,5,C.soft);rr(516,y-72+i*42,137*[.78,.4,.95,.56][i]*q,10,5,i%2?C.orange:C.green)}if(t>.92)p.tick(660,y+ 80,.7)}
 const render={llm,agent,vision,multimodal,generation,rl,'world-model':world,embodied,systems,ai4x};
 function draw(s,t){if(!s.ratio)return;const p=pen(s);render[s.el.dataset.motion]?.(s,t,p);const steps=s.el.querySelectorAll('.motion-steps li'),cuts={llm:[.24,.38,.58],agent:[.2,.32,.45,.58,.73,.86],vision:[.12,.48,.7],multimodal:[.16,.32,.48,.7],generation:[.08,.22,.35,.88],rl:[.08,.23,.34,.38,.6,.88],embodied:[.18,.4,.48,.92],systems:[.12,.25,.7],ai4x:[.13,.3,.52,.72],'world-model':[.12,.23,.55,.65]}[s.el.dataset.motion]||[];let step=cuts.filter(x=>t>=x).length;if(s.el.dataset.motion==='agent')step=[0,1,2,3,1,2,3][step];if(s.el.dataset.motion==='rl')step=[0,1,2,3,4,1,2][step];step=Math.min(steps.length-1,step);if(step!==s.step){steps.forEach((el,i)=>el.classList.toggle('active',i===step));s.step=step}s.el.querySelector('.motion-progress i').style.transform='scaleX('+t+')';s.el.dataset.frame=String(Math.floor(t*100));}
 function loop(now){const dt=Math.min(60,now-last||16);last=now;scenes=scenes.filter(s=>{if(s.el.isConnected)return true;s.resize.disconnect();observer.unobserve(s.el);return false});for(const s of scenes)if(s.visible&&!document.hidden){s.time=(s.time+dt)%16000;draw(s,s.time/16000)}raf=requestAnimationFrame(loop)}
 const observer=new IntersectionObserver(entries=>{for(const e of entries){const s=scenes.find(x=>x.el===e.target);if(s)s.visible=e.isIntersecting;if(e.isIntersecting&&e.target.hasAttribute('data-lineage')){e.target.classList.add('is-visible');observer.unobserve(e.target)}}},{threshold:.15});
 function init(root=document){scenes=scenes.filter(s=>{if(s.el.isConnected)return true;s.resize.disconnect();observer.unobserve(s.el);return false});root.querySelectorAll('[data-motion]').forEach(el=>{if(el.dataset.motionReady)return;el.dataset.motionReady='1';setup(el);observer.observe(el)});root.querySelectorAll('[data-lineage]').forEach(el=>observer.observe(el));if(!raf&&!reduced.matches)raf=requestAnimationFrame(loop);initNavigation();revealSelectedNavigation();initToc(root);}
 function initNavigation(){document.querySelectorAll('#nav .navgroup').forEach(group=>{if(group.dataset.motionReady)return;group.dataset.motionReady='1';group.tabIndex=0;group.setAttribute('role','button');group.setAttribute('aria-expanded','true');const toggle=()=>{const open=group.getAttribute('aria-expanded')==='true';group.setAttribute('aria-expanded',String(!open));let n=group.nextElementSibling;while(n&&!n.classList.contains('navgroup')){if(n.matches('a')){n.classList.toggle('nav-collapsed',open);n.inert=open}n=n.nextElementSibling}};group.addEventListener('click',toggle);group.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}})});}
 function revealSelectedNavigation(){const nav=document.getElementById('nav');if(!nav)return;const selected=[...nav.querySelectorAll('a')].find(a=>a.dataset.page===document.body.dataset.page)||nav.querySelector('a[aria-current=page]');if(!selected)return;let group=selected.previousElementSibling;while(group&&!group.classList.contains('navgroup'))group=group.previousElementSibling;if(group?.getAttribute('aria-expanded')==='false')group.click();}
 function initToc(root){const hs=[...root.querySelectorAll('h2[id]')].filter(h=>!h.closest('dialog'));if(!hs.length)return;window._guideTocObserver?.disconnect();window._guideTocObserver=new IntersectionObserver(entries=>{const seen=entries.filter(e=>e.isIntersecting);if(!seen.length)return;const id=seen[0].target.id;document.querySelectorAll('#toc a').forEach(a=>a.classList.toggle('is-current',a.hash.endsWith(id)))},{rootMargin:'-10% 0px -65% 0px'});hs.forEach(h=>window._guideTocObserver.observe(h));}
 window.initGuideMotion=init;
 // Time seeking is used only by the private frame review, without adding page controls.
 window.guideMotionReview=(id,t)=>{const s=scenes.find(s=>s.el.dataset.motion===id);if(s){s.time=clamp(t)*16000;draw(s,clamp(t))}};
 new MutationObserver(()=>{for(const s of scenes){s.colors=palette();draw(s,reduced.matches?.99:s.time/16000)}}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
 reduced.addEventListener('change',()=>{if(reduced.matches){cancelAnimationFrame(raf);raf=0;scenes.forEach(s=>draw(s,.99))}else if(!raf)raf=requestAnimationFrame(loop)});
 photo.onload=()=>scenes.forEach(s=>draw(s,reduced.matches ? .99 : s.time/16000));
 init();
})();
