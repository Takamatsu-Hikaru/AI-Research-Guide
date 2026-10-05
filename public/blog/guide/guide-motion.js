(() => {
 'use strict';
 const assetBase=new URL('.',document.currentScript.src);
 const photo=new Image();photo.src=window.guideMotionPhoto;
 const clamp=x=>Math.max(0,Math.min(1,x)),smooth=x=>{x=clamp(x);return x*x*(3-2*x)},mix=(a,b,t)=>a+(b-a)*t;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let scenes=[],raf=0,last=0;
 function palette(){const s=getComputedStyle(document.documentElement),get=(k,f)=>s.getPropertyValue(k).trim()||f;return {ink:get('--ink','#192d36'),blue:get('--blue',get('--accent','#315fd4')),soft:get('--soft',get('--line','#d8d5cb')),paper:get('--paper','#f5f2e9'),wash:get('--paper-2',get('--wash','#ebe7db')),green:'#389883',orange:'#c47d4a',muted:get('--muted','#718087')};}
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
 function agent(s,t,p){storyboard.draw('agent',s,t)}
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
 function embodied(s,t,p){storyboard.draw('embodied',s,t)}
 function systems(s,t,p){const {C,rr,line,dot}=p;const y1=s.h*.30,y2=s.h*.72,phase=clamp((t-.1)/.8);for(const yy of [y1,y2]){line([45,yy+34],[678,yy+34]);rr(294,yy-37,118, 70,12,C.paper,C.soft)}for(let i=0;i<6;i++){const a=clamp(phase*6-i),x=phase*6<i?55+i*32:mix(255,480+i*32,a);rr(x,y1-18,24, 30,5,a===1?C.green:C.blue)}for(let i=0;i<6;i++){const q=clamp(phase*2.2),x=q<.5?mix(55+i*32,300+(i%3)*32,q*2):mix(300+(i%3)*32,480+i*32,(q-.5)*2);rr(x,y2-25+Math.floor(i/3)*31,24,25,5,q===1?C.green:C.orange)}p.text('1 × 6',44,y1-45,C.ink,30);p.text('6 × 1',44,y2-52,C.ink,30)}
 function ai4x(s,t,p){const {c,C,rr,line,dot}=p,y=s.h/2;const atoms=Array.from({length:6},(_,i)=>[120+Math.cos(i*Math.PI/3)*62,y+Math.sin(i*Math.PI/3)*62]);atoms.forEach((a,i)=>{line(a,atoms[(i+1)%6],C.ink,3);dot(...a,12,i===1?C.orange:i===4?C.blue:C.ink)});line(atoms[0],[221,y],C.ink,3);dot(221,y,10,C.green);if(t>.3&&t<.52){atoms.forEach((a,i)=>{const b=atoms[(i+1)%6],q=t*4%1;dot(mix(a[0],b[0],q),mix(a[1],b[1],q),5,C.blue)})}
  for(let i=0;i<7;i++){const h=(40+(Math.sin(i*5)*.5+.5)*110)*smooth((t-.52)/.18);rr(303+i*19,y+70-h,12,Math.max(3,h),4,t>.52?C.blue:C.soft)}line([250,y],[290,y],C.soft);line([450,y],[482,y],C.soft);rr(493,y-104,188,208,14,C.paper,C.soft);for(let i=0;i<4;i++){const q=smooth((t-.72-i*.025)/.13);rr(516,y-72+i*42,137,10,5,C.soft);rr(516,y-72+i*42,137*[.78,.4,.95,.56][i]*q,10,5,i%2?C.orange:C.green)}if(t>.92)p.tick(660,y+ 80,.7)}

 // Adapted from the user's model-anim storyboard: fixed-link robot IK and agent action/observation loop.
 const storyboard=(()=>{
 let C={};
 const clamp=(x,a=0,b=1)=>x<a?a:x>b?b:x;
const lerp=(a,b,t)=>a+(b-a)*t;
const seg=(p,a,b)=>clamp((p-a)/(b-a));
const io=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const eo=t=>1-Math.pow(1-t,3);
const bump=t=>Math.sin(Math.PI*clamp(t));
function rnd(seed){let s=seed;return()=>(s=(s*16807)%2147483647)/2147483647;}
function box(g,x,y,w,h,r){g.beginPath();g.roundRect(x,y,Math.max(0,w),Math.max(0,h),r);}
function dot(g,x,y,r){g.beginPath();g.arc(x,y,Math.max(0,r),0,Math.PI*2);}
function line(g,x1,y1,x2,y2){g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);}
function qPath(g,p0,c,p1,t=1){g.beginPath();g.moveTo(p0[0],p0[1]);const n=Math.max(2,Math.ceil(32*t));for(let i=1;i<=n;i++){const u=t*i/n,v=1-u;g.lineTo(v*v*p0[0]+2*v*u*c[0]+u*u*p1[0],v*v*p0[1]+2*v*u*c[1]+u*u*p1[1]);}}
function qPt(p0,c,p1,u){const v=1-u;return [v*v*p0[0]+2*v*u*c[0]+u*u*p1[0],v*v*p0[1]+2*v*u*c[1]+u*u*p1[1]];}
function cPt(P,u){const v=1-u;return [v*v*v*P[0][0]+3*v*v*u*P[1][0]+3*v*u*u*P[2][0]+u*u*u*P[3][0],v*v*v*P[0][1]+3*v*v*u*P[1][1]+3*v*u*u*P[2][1]+u*u*u*P[3][1]];}
function cPath(g,P,t=1){g.beginPath();g.moveTo(P[0][0],P[0][1]);const n=Math.max(2,Math.ceil(40*t));for(let i=1;i<=n;i++){const q=cPt(P,t*i/n);g.lineTo(q[0],q[1]);}}
function bandNodes(g,A,xs,y,lit){for(const x of xs){A(1);dot(g,x,y,3.6);g.fillStyle=lit?C.teal:C.stage;g.fill();g.lineWidth=1.5;g.strokeStyle=C.teal;g.stroke();}}


 const AGENT=(()=>{
  const T=[150,270],K=[480,270];
  const tools=[[812,150],[812,270],[812,390]];
  const plan=[92,118,144];
  const mem=[0,1,2,3].map(k=>[392+k*46,430]);
  const curve=i=>[[540,270],[650,270],[690,tools[i][1]],[762,tools[i][1]]];
  function icon(g,k,x,y){
    g.lineWidth=2;g.strokeStyle=C.mute;g.lineCap='round';
    if(k===0){dot(g,x-4,y-4,10);g.stroke();line(g,x+4,y+4,x+13,y+13);g.stroke();}
    if(k===1){g.beginPath();g.moveTo(x-9,y-9);g.lineTo(x-18,y);g.lineTo(x-9,y+9);g.moveTo(x+9,y-9);g.lineTo(x+18,y);g.lineTo(x+9,y+9);g.moveTo(x+4,y-12);g.lineTo(x-4,y+12);g.stroke();}
    if(k===2){g.beginPath();g.ellipse(x,y-10,14,5,0,0,Math.PI*2);g.stroke();for(const dy of [0,10]){g.beginPath();g.ellipse(x,y+dy,14,5,0,0,Math.PI);g.stroke();}line(g,x-14,y-10,x-14,y+10);g.stroke();line(g,x+14,y-10,x+14,y+10);g.stroke();}
    g.lineCap='butt';
  }
  return function(g,S,st){
    const A=a=>{g.globalAlpha=clamp(a*st.F)};
    const packet=(x,y,c)=>{A(1);g.fillStyle=c;box(g,x-7,y-7,14,14,4);g.fill();};
    const s0=S(0),s1=S(1),s2=S(2),s3=S(3);
    const it=Math.min(2,Math.floor(s2*3)),q=s2*3-it;
    const looping=s2>0&&s2<1;
    const chk=k=>k<it?1:k===it?seg(q,.84,1):0;

    g.globalAlpha=1;g.strokeStyle=C.line;g.lineWidth=1.5;
    line(g,T[0]+90,T[1],K[0]-60,K[1]);g.stroke();
    for(let i=0;i<3;i++){cPath(g,curve(i));g.stroke();}
    g.setLineDash([3,4]);line(g,K[0],330,K[0],424);g.stroke();line(g,K[0],210,K[0],156);g.stroke();g.setLineDash([]);

    // Prompt and answer stay visible while the tool loop accumulates observations.
    g.globalAlpha=1;box(g,50,204,190,140,14);g.fillStyle=C.stage;g.fill();g.strokeStyle=C.line;g.lineWidth=1.5;g.stroke();
    for(let k=0;k<3;k++){
      const u=eo(seg(s0,k*.12,.4+k*.12));A(u);g.fillStyle=C.ink;
      box(g,70,225+k*17,(k===2?88:140)*u,5,2.5);g.fill();
    }
    A(.55);g.strokeStyle=C.line;line(g,70,286,220,286);g.stroke();
    const answer=eo(seg(s3,.36,.84));
    for(let k=0;k<2;k++){const u=seg(answer,k*.22,.7+k*.22);if(u>0){A(1);g.fillStyle=C.teal;box(g,70,302+k*16,(k?84:118)*u,5,2.5);g.fill();}}
    if(answer>.9){A(1);g.strokeStyle=C.teal;g.lineWidth=2.5;g.beginPath();g.moveTo(205,314);g.lineTo(210,319);g.lineTo(220,307);g.stroke();}

    // tools
    tools.forEach(([x,y],k)=>{
      const glow=looping&&k===it?bump(seg(q,.36,.66)):0;
      g.globalAlpha=1;box(g,x-50,y-36,100,72,12);g.fillStyle=C.stage;g.fill();g.strokeStyle=C.line;g.lineWidth=1.5;g.stroke();
      if(glow>0){A(glow);g.strokeStyle=C.teal;g.lineWidth=2.5;g.stroke();A(glow*.12);g.fillStyle=C.teal;g.fill();}
      g.globalAlpha=1;icon(g,k,x,y-6);
      const prog=s2>=1||k<it?1:(k===it&&s2>0)?seg(q,.42,.62):0;
      g.globalAlpha=1;g.fillStyle=C.line;g.fillRect(x-30,y+22,60,3);
      if(prog>0){A(1);g.fillStyle=C.teal;g.fillRect(x-30,y+22,60*prog,3);}
    });

    // core
    const think=Math.max(bump(s1)*.9,looping?bump(seg(q,0,.24)):0,bump(seg(s0,.8,1))*.6,s3>0?bump(seg(s3,0,.25))*.5:0);
    g.globalAlpha=1;box(g,K[0]-60,K[1]-60,120,120,18);g.fillStyle=C.stage;g.fill();g.globalAlpha=.85;g.strokeStyle=C.teal;g.lineWidth=2;g.stroke();
    for(let a=0;a<3;a++)for(let b=0;b<3;b++){const k=a*3+b;g.globalAlpha=.22+.78*think*(.5+.5*Math.sin(st.t*7+k*1.9));dot(g,K[0]-24+b*24,K[1]-24+a*24,5);g.fillStyle=C.teal;g.fill();}
    if(think>.02){const r0=st.t*3.2;A(think);g.strokeStyle=C.teal;g.lineWidth=2.5;g.beginPath();g.arc(K[0],K[1],96,r0,r0+1.1);g.stroke();g.beginPath();g.arc(K[0],K[1],96,r0+Math.PI,r0+Math.PI+1.1);g.stroke();}

    if(s0>.45&&s0<.95){const u=io(seg(s0,.45,.9));packet(lerp(T[0]+90,K[0]-60,u),T[1],C.amber);}

    // plan
    plan.forEach((y,k)=>{
      const gr=eo(seg(s1,.15+k*.18,.55+k*.18));if(gr<=0)return;
      A(gr);g.strokeStyle=C.mute;g.lineWidth=1.5;dot(g,418,y,6.5);g.stroke();
      A(.4*gr);g.fillStyle=C.mute;box(g,434,y-3,114*gr,6,3);g.fill();
      const c=chk(k);
      if(c>0){A(c);g.fillStyle=C.teal;dot(g,418,y,6.5);g.fill();box(g,434,y-3,114,6,3);g.fill();
        A(c);g.strokeStyle=C.stage;g.lineWidth=1.8;g.beginPath();g.moveTo(414.5,y);g.lineTo(417,y+2.5);g.lineTo(421.5,y-2.5);g.stroke();}
    });

    // memory
    mem.forEach(([x,y],k)=>{
      g.globalAlpha=1;g.setLineDash([3,3]);g.strokeStyle=C.line;g.lineWidth=1.5;box(g,x,y,38,26,6);g.stroke();g.setLineDash([]);
      const f=k<3?chk(k):seg(s3,.55,.75);
      if(f>0){A(f);g.fillStyle=k<3?C.amber:C.rose;box(g,x,y,38,26,6);g.fill();A(f*.8);g.fillStyle=C.stage;g.fillRect(x+8,y+8,22,2.5);g.fillRect(x+8,y+15,14,2.5);}
    });

    // act → observe → remember, three times
    if(looping){
      const P=curve(it);
      if(q>.22&&q<.42){const u=io(seg(q,.22,.42));A(.9);g.strokeStyle=C.teal;g.lineWidth=2;cPath(g,P,u);g.stroke();const p=cPt(P,u);packet(p[0],p[1],C.teal);}
      if(q>=.42&&q<.6){A(.6);g.strokeStyle=C.teal;g.lineWidth=2;cPath(g,P);g.stroke();}
      if(q>=.6&&q<.84){const u=io(seg(q,.6,.82));A(.55);g.strokeStyle=C.amber;g.lineWidth=2;cPath(g,P);g.stroke();const p=cPt(P,1-u);packet(p[0],p[1],C.amber);}
      if(q>=.82&&q<.97){const u=io(seg(q,.82,.95)),[mx,my]=mem[it];packet(lerp(K[0],mx+19,u),lerp(330,my+13,u),C.amber);}
    }
    if(s3>0){
      const u=io(seg(s3,0,.4));if(u<1)packet(lerp(K[0]-60,T[0]+90,u),T[1],C.rose);

    }
  };
})();

/* ---------- 3 · Embodied ---------- */
const EMB=(()=>{
  const SH=[860,418],L=125,HOME=[800,300],START=[630,425],GOAL=[740,425];
  const KEYS=[[0,HOME],[.16,[630,336]],[.3,[630,392]],[.4,[630,392]],[.55,[630,318]],[.72,[740,318]],[.84,[740,392]],[.92,[740,392]],[1,HOME]];
  const CAM={x:60,y:96,w:200,h:122},SC=200/360;
  const tokX=k=>356+k*32,bands=[190,240,290];
  function wrist(p){for(let k=1;k<KEYS.length;k++){if(p<=KEYS[k][0]){const [a,P]=KEYS[k-1],[b,Q]=KEYS[k],u=io((p-a)/(b-a));return [lerp(P[0],Q[0],u),lerp(P[1],Q[1],u)];}}return HOME;}
  function ik(w){const dx=w[0]-SH[0],dy=w[1]-SH[1],d=Math.min(Math.hypot(dx,dy),2*L-1),c2=clamp((d*d-2*L*L)/(2*L*L),-1,1),t2=-Math.acos(c2),b=Math.atan2(dy,dx),t1=b-Math.atan2(L*Math.sin(t2),L+L*Math.cos(t2));return {t1,t2,e:[SH[0]+L*Math.cos(t1),SH[1]+L*Math.sin(t1)]};}
  function state(i,p){
    if(i<3)return {w:HOME,open:1,cube:START};
    if(i>3)return {w:HOME,open:1,cube:GOAL};
    const w=wrist(p);
    const open=p<.3?1:p<.38?1-seg(p,.3,.38):p<.84?0:p<.9?seg(p,.84,.9):1;
    const cube=p<.38?START:p<.86?[w[0],w[1]+33]:GOAL;
    return {w,open,cube};
  }
  const caps=[...Array(8)].map((_,k)=>{const a=wrist(k/8),b=wrist((k+1)/8),dx=b[0]-a[0],dy=b[1]-a[1];return Math.hypot(dx,dy)<6?null:Math.atan2(dy,dx);});
  function world(g,s,alpha){
    const ga=g.globalAlpha;
    g.strokeStyle=C.mute;g.lineWidth=2;line(g,596,440,944,440);g.stroke();
    g.strokeStyle=C.rose;g.beginPath();g.moveTo(712,432);g.lineTo(712,440);g.lineTo(768,440);g.lineTo(768,432);g.stroke();
    g.globalAlpha=ga*alpha;g.fillStyle=C.amber;box(g,s.cube[0]-15,s.cube[1]-15,30,30,4);g.fill();g.globalAlpha=ga;
    const {e}=ik(s.w),w=s.w,o=lerp(16.5,24,s.open);
    g.fillStyle=C.ink;box(g,SH[0]-22,SH[1],44,22,4);g.fill();
    g.strokeStyle=C.ink;g.lineCap='round';g.lineWidth=12;g.beginPath();g.moveTo(SH[0],SH[1]);g.lineTo(e[0],e[1]);g.lineTo(w[0],w[1]);g.stroke();
    g.lineWidth=5;g.beginPath();g.moveTo(w[0],w[1]);g.lineTo(w[0],w[1]+10);g.moveTo(w[0]-o-2,w[1]+10);g.lineTo(w[0]+o+2,w[1]+10);g.stroke();
    g.lineWidth=4;g.beginPath();g.moveTo(w[0]-o,w[1]+10);g.lineTo(w[0]-o,w[1]+32);g.moveTo(w[0]+o,w[1]+10);g.lineTo(w[0]+o,w[1]+32);g.stroke();
    g.lineCap='butt';
    for(const j of [SH,e,w]){dot(g,j[0],j[1],j===w?5:7);g.fillStyle=C.stage;g.fill();g.lineWidth=3;g.strokeStyle=C.ink;g.stroke();}
  }
  function snapshot(g,s,clipW,a){
    if(clipW<=0||a<=0)return;
    g.save();box(g,CAM.x,CAM.y,CAM.w,CAM.h,8);g.clip();g.beginPath();g.rect(CAM.x,CAM.y,clipW,CAM.h);g.clip();
    g.globalAlpha=a;g.fillStyle=C.stage;g.fillRect(CAM.x,CAM.y,CAM.w,CAM.h);g.globalAlpha=a*.35;g.fillStyle=C.line;g.fillRect(CAM.x,CAM.y,CAM.w,CAM.h);
    g.globalAlpha=a;g.translate(CAM.x,CAM.y);g.scale(SC,SC);g.translate(-590,-230);world(g,s,1);
    g.restore();
  }
  function brackets(g,x,y,w,h){
    g.globalAlpha=1;g.strokeStyle=C.mute;g.lineWidth=1.5;const k=12;g.beginPath();
    g.moveTo(x,y+k);g.lineTo(x,y);g.lineTo(x+k,y);g.moveTo(x+w-k,y);g.lineTo(x+w,y);g.lineTo(x+w,y+k);
    g.moveTo(x+w,y+h-k);g.lineTo(x+w,y+h);g.lineTo(x+w-k,y+h);g.moveTo(x+k,y+h);g.lineTo(x,y+h);g.lineTo(x,y+h-k);g.stroke();
  }
  function scan(g,A,u){if(u<=0||u>=1)return;const x=lerp(596,944,u);A(.08);g.fillStyle=C.amber;g.fillRect(596,230,x-596,212);A(.9);g.strokeStyle=C.amber;g.lineWidth=2;line(g,x,230,x,442);g.stroke();}
  return function(g,S,st){
    const A=a=>{g.globalAlpha=clamp(a*st.F)};
    const s0=S(0),s1=S(1),s2=S(2),s3=S(3),s4=S(4);
    const now=state(st.i,st.p);

    // sensors: camera frame + joint-angle traces
    brackets(g,CAM.x-6,CAM.y-6,CAM.w+12,CAM.h+12);
    brackets(g,CAM.x-6,244,CAM.w+12,82);
    const u0=io(seg(s0,.1,.75)),u4=io(seg(s4,.1,.6));
    snapshot(g,state(0,0),CAM.w*u0,st.F);
    snapshot(g,state(4,0),CAM.w*u4,st.F);
    if(s1>0&&s1<1){A(bump(s1)*.9);g.strokeStyle=C.stage;g.lineWidth=2;line(g,CAM.x+CAM.w/2,CAM.y,CAM.x+CAM.w/2,CAM.y+CAM.h);g.stroke();line(g,CAM.x,CAM.y+CAM.h/2,CAM.x+CAM.w,CAM.y+CAM.h/2);g.stroke();}
    for(const [key,al] of [['t1',1],['t2',.5]]){
      g.globalAlpha=al;g.strokeStyle=C.amber;g.lineWidth=1.8;g.beginPath();
      for(let n=0;n<=48;n++){const tt=st.t-(48-n)*.0625,s=st.at(tt),j=ik(state(s.i,s.p).w),x=66+n*(188/48),y=314-clamp((j[key]+2.7)/1.9)*58;n?g.lineTo(x,y):g.moveTo(x,y);}
      g.stroke();
    }

    // model skeleton
    g.globalAlpha=.55;g.strokeStyle=C.teal;g.lineWidth=2;box(g,316,150,240,250,14);g.stroke();
    g.lineWidth=1;for(const y of bands){box(g,330,y,212,36,8);g.globalAlpha=.28;g.fillStyle=C.line;g.fill();g.globalAlpha=.9;g.strokeStyle=C.line;g.stroke();}
    g.globalAlpha=1;g.strokeStyle=C.line;g.lineWidth=1.5;box(g,376,162,120,14,7);g.stroke();
    for(let k=0;k<8;k++){g.setLineDash([3,3]);box(g,320+k*30,100,22,20,6);g.stroke();}g.setLineDash([]);

    // shot 1: image patches + joint state become tokens
    for(let k=0;k<6;k++){
      const u=io(seg(s1,k*.07,.55+k*.07));if(u<=0)continue;
      const src=k<4?[CAM.x+50+(k%2)*100,CAM.y+30+(k>1?62:0)]:[110+(k-4)*80,285],dst=[tokX(k),363];
      const x=lerp(src[0],dst[0],u),y=lerp(src[1],dst[1],u),sz=lerp(k<4?40:18,22,u);
      A(1);g.fillStyle=C.amber;box(g,x-sz/2,y-sz/2,sz,sz,5);g.fill();
      A(.85);g.fillStyle=C.stage;if(k<4)g.fillRect(x-sz/4,y-1,sz/2,2);else{dot(g,x,y,2.5);g.fill();}
    }
    // shot 2: transformer pass → action head → action chunk
    for(let k=0;k<6;k++){const gk=io(seg(s2,k*.04,.3+k*.04));if(gk<=0)continue;A(gk*.8);g.strokeStyle=C.teal;g.lineWidth=2;line(g,tokX(k),352,tokX(k),lerp(352,176,gk));g.stroke();}
    const sa=seg(s2,.25,.7)*3;
    bands.forEach((y,L)=>{const lp=clamp(sa-L);if(lp<=0)return;A(bump(lp)*.18);g.fillStyle=C.teal;box(g,330,y,212,36,8);g.fill();bandNodes(g,A,[0,1,2,3,4,5].map(tokX),y+18,lp>.5);});
    const hd=seg(s2,.62,.78);if(hd>0){A(hd);g.fillStyle=C.rose;box(g,376,162,120,14,7);g.fill();}
    const cur=Math.min(7,Math.floor(s3*8));
    for(let k=0;k<8;k++){
      const c=eo(seg(s2,.7+k*.03,.85+k*.03));if(c<=0)continue;
      const x=320+k*30,al=s3>=1?.25:s3>0?(k<cur?.25:k===cur?1:.75):1,lift=s3>0&&s3<1&&k===cur?-4:0;
      A(al*c);g.fillStyle=C.rose;box(g,x,100+lift+(1-c)*8,22,20,6);g.fill();
      A(al*c);g.strokeStyle=C.stage;g.fillStyle=C.stage;g.lineWidth=1.8;const cx=x+11,cy=110+lift;
      if(caps[k]===null){dot(g,cx,cy,2.6);g.fill();}else{const a=caps[k],dx=Math.cos(a)*6,dy=Math.sin(a)*6;line(g,cx-dx,cy-dy,cx+dx,cy+dy);g.stroke();dot(g,cx+dx,cy+dy,2);g.fill();}
    }
    // shot 3: each chunk step drives the arm
    if(s3>0&&s3<1){const f=s3*8-cur,c=[320+cur*30+11,100],w=now.w,m=[w[0],c[1]];const p=qPt(c,m,w,eo(f));A(1-f*.6);dot(g,p[0],p[1],4);g.fillStyle=C.rose;g.fill();}

    // world
    g.globalAlpha=1;world(g,now,st.F);
    scan(g,A,u0);scan(g,A,u4);
    // shot 4: new frame closes the loop
    const lo=seg(s4,.5,.85);
    if(lo>0){A(.7);g.strokeStyle=C.amber;g.lineWidth=1.8;g.setLineDash([4,5]);qPath(g,[770,222],[465,-20],[160,88],eo(lo));g.stroke();g.setLineDash([]);
      if(lo<1){const p=qPt([770,222],[465,-20],[160,88],eo(lo));A(1);dot(g,p[0],p[1],4);g.fillStyle=C.amber;g.fill();}}
  };
})();


 const timing={embodied:[2.4,2.4,3,5.5,2.6],agent:[2.2,2.2,9,3]};
 function draw(id,s,t){
   const col=s.colors;
   C={stage:col.wash,line:col.soft,ink:col.ink,mute:col.muted,amber:col.orange,teal:col.green,rose:col.blue};
   const ds=timing[id],total=ds.reduce((a,b)=>a+b,0),time=Math.min(.9999,t)*total;
   const at=tt=>{tt=Math.max(0,Math.min(total-.00001,tt));let i=0,start=0;while(i<ds.length-1&&tt>=start+ds[i])start+=ds[i++];return {i,p:clamp((tt-start)/ds[i])};};
   const st=at(time),S=k=>k<st.i?1:k>st.i?0:st.p;
   const g=s.ctx,k=Math.min(720/960,s.h/540);
   g.save();g.translate((720-960*k)/2,(s.h-540*k)/2);g.scale(k,k);
   (id==='embodied'?EMB:AGENT)(g,S,{...st,t:time,F:1,at});g.restore();
 }
 return {draw};
 })();

 const render={llm,agent,vision,multimodal,generation,rl,'world-model':world,embodied,systems,ai4x};
 function draw(s,t){if(!s.ratio)return;const p=pen(s);render[s.el.dataset.motion]?.(s,t,p);const steps=s.el.querySelectorAll('.motion-steps li'),cuts={llm:[.24,.38,.58],agent:[2.2/16.4,4.4/16.4,13.4/16.4],vision:[.12,.48,.7],multimodal:[.16,.32,.48,.7],generation:[.08,.22,.35,.88],rl:[.08,.23,.34,.38,.6,.88],embodied:[2.4/15.9,4.8/15.9,7.8/15.9,13.3/15.9],systems:[.12,.25,.7],ai4x:[.13,.3,.52,.72],'world-model':[.12,.23,.55,.65]}[s.el.dataset.motion]||[];let step=cuts.filter(x=>t>=x).length;if(s.el.dataset.motion==='rl')step=[0,1,2,3,4,1,2][step];step=Math.min(steps.length-1,step);if(step!==s.step){steps.forEach((el,i)=>el.classList.toggle('active',i===step));s.step=step}s.el.querySelector('.motion-progress i').style.transform='scaleX('+t+')';s.el.dataset.frame=String(Math.floor(t*100));}
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
