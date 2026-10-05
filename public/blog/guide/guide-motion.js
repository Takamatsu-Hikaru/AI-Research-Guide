(() => {
 'use strict';
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
  return {c,C,rr,line,dot,text,tick,bars,path,packet};
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
 function embodied(s,t,p){storyboard.draw('embodied',s,t)}
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

 // Seven direction storyboards adapted from the supplied reference.
 const directionMotion=(()=>{let C={};
const clamp=(x,a=0,b=1)=>x<a?a:x>b?b:x;
const lerp=(a,b,t)=>a+(b-a)*t;
const lerp2=(a,b,t)=>[lerp(a[0],b[0],t),lerp(a[1],b[1],t)];
const seg=(p,a,b)=>clamp((p-a)/(b-a));
const io=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const eo=t=>1-Math.pow(1-t,3);
const bump=t=>Math.sin(Math.PI*clamp(t));
const DIRS=[[1,0],[-1,0],[0,1],[0,-1]];
function rnd(seed){let s=seed;return()=>(s=(s*16807)%2147483647)/2147483647;}
function gauss(r){return Math.sqrt(-2*Math.log(r()+1e-9))*Math.cos(2*Math.PI*r());}
function box(g,x,y,w,h,r){g.beginPath();g.roundRect(x,y,Math.max(0,w),Math.max(0,h),r);}
function dot(g,x,y,r){g.beginPath();g.arc(x,y,Math.max(0,r),0,Math.PI*2);}
function line(g,x1,y1,x2,y2){g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);}
function qPath(g,p0,c,p1,t=1){g.beginPath();g.moveTo(p0[0],p0[1]);const n=Math.max(2,Math.ceil(32*t));for(let i=1;i<=n;i++){const u=t*i/n,v=1-u;g.lineTo(v*v*p0[0]+2*v*u*c[0]+u*u*p1[0],v*v*p0[1]+2*v*u*c[1]+u*u*p1[1]);}}
function qPt(p0,c,p1,u){const v=1-u;return [v*v*p0[0]+2*v*u*c[0]+u*u*p1[0],v*v*p0[1]+2*v*u*c[1]+u*u*p1[1]];}
function cPt(P,u){const v=1-u;return [v*v*v*P[0][0]+3*v*v*u*P[1][0]+3*v*u*u*P[2][0]+u*u*u*P[3][0],v*v*v*P[0][1]+3*v*v*u*P[1][1]+3*v*u*u*P[2][1]+u*u*u*P[3][1]];}
function cPath(g,P,t=1){g.beginPath();g.moveTo(P[0][0],P[0][1]);const n=Math.max(2,Math.ceil(40*t));for(let i=1;i<=n;i++){const q=cPt(P,t*i/n);g.lineTo(q[0],q[1]);}}
function trap(g,x1,x2,cy,h1,h2){g.beginPath();g.moveTo(x1,cy-h1/2);g.lineTo(x2,cy-h2/2);g.lineTo(x2,cy+h2/2);g.lineTo(x1,cy+h1/2);g.closePath();}
function arrowHead(g,x,y,ang,s){g.beginPath();g.moveTo(x,y);g.lineTo(x-s*Math.cos(ang-.5),y-s*Math.sin(ang-.5));g.moveTo(x,y);g.lineTo(x-s*Math.cos(ang+.5),y-s*Math.sin(ang+.5));g.stroke();}

/* a small still life (sphere, cube, cylinder) drawn in a 400×300 frame */
function sceneArt(g,ox,oy,s){
  const ga=g.globalAlpha;
  g.save();g.translate(ox,oy);g.scale(s,s);
  g.fillStyle=C.stage;g.fillRect(0,0,400,300);
  g.globalAlpha=ga*.55;g.fillStyle=C.line;g.fillRect(0,205,400,95);
  g.globalAlpha=ga*.7;g.fillStyle=C.mute;dot(g,95,185,48);g.fill();
  g.globalAlpha=ga*.3;g.fillStyle=C.stage;dot(g,78,166,15);g.fill();
  g.fillStyle=C.ink;
  g.globalAlpha=ga*.78;g.fillRect(175,150,80,80);
  g.globalAlpha=ga*.5;g.beginPath();g.moveTo(175,150);g.lineTo(197,132);g.lineTo(277,132);g.lineTo(255,150);g.closePath();g.fill();
  g.globalAlpha=ga*.62;g.beginPath();g.moveTo(255,150);g.lineTo(277,132);g.lineTo(277,212);g.lineTo(255,230);g.closePath();g.fill();
  g.globalAlpha=ga*.45;g.fillStyle=C.mute;g.fillRect(300,110,60,115);g.beginPath();g.ellipse(330,225,30,9,0,0,Math.PI);g.fill();
  g.globalAlpha=ga*.8;g.beginPath();g.ellipse(330,110,30,9,0,0,Math.PI*2);g.fill();
  g.restore();g.globalAlpha=ga;
}

/* ---------- engine ---------- */

const OBJ=[
  {box:[47,137,96,96],cx:95,mask:g=>{dot(g,95,185,48);}},
  {box:[175,132,102,98],cx:226,mask:g=>{g.beginPath();g.moveTo(175,150);g.lineTo(197,132);g.lineTo(277,132);g.lineTo(277,212);g.lineTo(255,230);g.lineTo(175,230);g.closePath();}},
  {box:[300,101,60,133],cx:330,mask:g=>{g.beginPath();g.ellipse(330,110,30,9,0,Math.PI,Math.PI*2);g.lineTo(360,225);g.ellipse(330,225,30,9,0,0,Math.PI);g.closePath();}}];
const CV=(()=>{
  const X=70,Y=100;let off=null,og=null;
  const conf=[.92,.97,.86],Z=[.38,.52,.74],CAM=[730,402];
  const stacks=[[520,128,150,112,4,6],[704,166,96,72,6,4],[836,192,50,38,8,3]];
  const aL=Math.atan2(118-CAM[1],570-CAM[0]),aR=Math.atan2(118-CAM[1],890-CAM[0]);
  const PTS=[];
  OBJ.forEach((o,k)=>{
    const cx=650+o.cx/400*160,cy=CAM[1]-30-Z[k]*250;
    for(let j=0;j<13;j++){
      const rad=k?16:24,ang=Math.PI*(.12+.76*j/12);
      const p=k===1?[cx-24+j*4,cy+18]:[cx+rad*Math.cos(ang),cy+rad*Math.sin(ang)];
      p.push((Math.atan2(p[1]-CAM[1],p[0]-CAM[0])-aL)/(aR-aL));PTS.push(p);
    }
  });
  return function(g,S,st){
    const A=a=>{g.globalAlpha=clamp(a*st.F)};
    const s0=S(0),s1=S(1),s2=S(2),s3=S(3),s4=S(4);
    const dim4=1-.6*eo(seg(s4,0,.3));
    // image: coarse pixels resolve into the full frame
    g.save();box(g,X,Y,400,300,10);g.clip();
    const px=eo(s0);
    if(px>=.999)sceneArt(g,X,Y,1);
    else{
      if(!off){off=document.createElement('canvas');og=off.getContext('2d');}
      const rw=Math.max(6,Math.round(8*Math.pow(50,px)));off.width=rw;off.height=Math.max(4,Math.round(rw*.75));
      og.setTransform(1,0,0,1,0,0);og.globalAlpha=1;sceneArt(og,0,0,rw/400);
      g.globalAlpha=1;g.imageSmoothingEnabled=false;g.drawImage(off,X,Y,400,300);g.imageSmoothingEnabled=true;
    }
    // segmentation masks sweep in
    const sw=io(seg(s3,.05,.7));
    if(sw>0){
      g.save();g.beginPath();g.rect(X,Y,400*sw,300);g.clip();g.translate(X,Y);
      OBJ.forEach((o,k)=>{o.mask(g);A([.5,.36,.44][k]*dim4);g.fillStyle=C.rose;g.fill();A(.9*dim4);g.strokeStyle=C.rose;g.lineWidth=2;g.stroke();});
      g.restore();
      if(sw<1){A(.9);g.strokeStyle=C.rose;g.lineWidth=1.5;line(g,X+400*sw,Y,X+400*sw,Y+300);g.stroke();}
    }
    g.restore();
    g.globalAlpha=1;g.strokeStyle=C.line;g.lineWidth=1.5;box(g,X,Y,400,300,10);g.stroke();

    // a kernel slides, feature maps shrink and deepen
    if(s1>0&&s1<1){
      const kp=Math.min(53,Math.floor(seg(s1,0,.7)*54)),kx=X+(kp%9)*45+2,ky=Y+Math.floor(kp/9)*48+4;
      A(1);g.strokeStyle=C.teal;g.lineWidth=2;box(g,kx,ky,40,40,4);g.stroke();A(.14);g.fillStyle=C.teal;g.fill();
      A(.35);g.lineWidth=1;line(g,kx+40,ky+20,520,184);g.stroke();
    }
    const fA=(s2>0?lerp(1,.3,eo(seg(s2,0,.3))):1)*(1-eo(seg(s4,0,.3)));
    stacks.forEach(([x,y,w,h,n,o],k)=>{
      const a=eo(seg(s1,.15+k*.2,.45+k*.2))*fA;if(a<=0)return;
      for(let j=n-1;j>=0;j--){A(a);box(g,x+j*o,y+j*o,w,h,4);g.fillStyle=C.stage;g.fill();g.strokeStyle=C.teal;g.lineWidth=1.3;g.stroke();A(a*(.06+.05*j));g.fillStyle=C.teal;g.fill();}
      if(k<2){const nx=stacks[k+1];A(a*.6);g.strokeStyle=C.mute;g.lineWidth=1.5;line(g,x+w+n*o+6,y+h/2,nx[0]-6,nx[1]+nx[3]/2);g.stroke();}
    });

    // detection boxes with confidence bars
    const bA=(1-.55*eo(seg(s3,0,.3)))*dim4;
    OBJ.forEach((o,k)=>{
      const d=eo(seg(s2,.1+k*.15,.45+k*.15));if(d<=0)return;
      const [bx,by,bw,bh]=o.box,sc=lerp(1.25,1,d),cx=X+bx+bw/2,cy=Y+by+bh/2,w=bw*sc,h=bh*sc;
      A(d*bA);g.strokeStyle=C.rose;g.lineWidth=2;g.strokeRect(cx-w/2,cy-h/2,w,h);
      A(d*bA*.25);g.fillStyle=C.rose;g.fillRect(cx-w/2,cy-h/2-10,w,5);A(d*bA);g.fillRect(cx-w/2,cy-h/2-10,w*conf[k]*d,5);
    });

    // depth: a top-down view rebuilt from rays
    if(s4>0){
      const a=eo(seg(s4,.05,.3)),sweep=seg(s4,.2,.85);
      A(a);g.strokeStyle=C.line;g.lineWidth=1.5;g.beginPath();g.moveTo(570,118);g.lineTo(CAM[0],CAM[1]);g.lineTo(890,118);g.stroke();
      g.setLineDash([2,6]);for(const z of [.25,.5,.75]){const y=CAM[1]-30-z*250;line(g,580,y,880,y);g.stroke();}g.setLineDash([]);
      A(a);g.fillStyle=C.ink;box(g,CAM[0]-13,CAM[1]-7,26,15,3);g.fill();dot(g,CAM[0],CAM[1]-9,5);g.fill();
      if(sweep>0&&sweep<1){const an=lerp(aL,aR,sweep);A(.5);g.strokeStyle=C.teal;g.lineWidth=1.5;line(g,CAM[0],CAM[1],CAM[0]+330*Math.cos(an),CAM[1]+330*Math.sin(an));g.stroke();}
      g.fillStyle=C.rose;
      for(const [x,y,an] of PTS){if(an>sweep)continue;A(a);dot(g,x,y,2.8);g.fill();}
    }
  };
})();

/* ---------- 2 · Multimodal ---------- */
const MM=(()=>{
  const r=rnd(23),IX=60,IY=96,IS=.42;
  const PC=[[470,170],[612,160],[482,338],[615,330]];
  const init=PC.map(()=>({i:[440+r()*200,120+r()*260],t:[440+r()*200,120+r()*260]}));
  const sim=[...Array(16)].map(()=>.1+r()*.45);
  const bands=[322,358,394];
  return function(g,S,st){
    const A=a=>{g.globalAlpha=clamp(a*st.F)};
    const s0=S(0),s1=S(1),s2=S(2),s3=S(3),s4=S(4);
    // inputs: an image and a token row
    const a0=eo(seg(s0,0,.5));
    if(a0>0){A(a0);sceneArt(g,IX,IY,IS);}
    g.globalAlpha=1;g.strokeStyle=C.line;g.lineWidth=1.5;box(g,IX,IY,168,126,6);g.stroke();
    for(let k=0;k<5;k++){const a=eo(seg(s0,.3+k*.08,.6+k*.08));if(a<=0)continue;A(a);g.fillStyle=C.amber;box(g,60+k*35,330,26,26,5);g.fill();}
    // two encoders
    const u=io(seg(s1,0,.55)),glow=bump(seg(u,.3,.7));
    for(const [cy,h1,h2] of [[159,110,40],[343,56,30]]){
      g.globalAlpha=1;trap(g,262,338,cy,h1,h2);g.fillStyle=C.stage;g.fill();g.globalAlpha=.6;g.strokeStyle=C.teal;g.lineWidth=2;g.stroke();
      if(glow>0){A(glow*.22);g.fillStyle=C.teal;g.fill();}
    }
    // shared embedding space
    g.globalAlpha=1;g.strokeStyle=C.line;g.lineWidth=1.5;box(g,410,96,260,310,14);g.stroke();
    g.globalAlpha=.5;line(g,540,108,540,394);g.stroke();line(g,422,251,658,251);g.stroke();
    if(u>0&&u<1){
      const pi=u<.5?lerp2([228,159],[300,159],u*2):lerp2([300,159],init[0].i,(u-.5)*2);
      const pt=u<.5?lerp2([226,343],[300,343],u*2):lerp2([300,343],init[0].t,(u-.5)*2);
      A(1);g.fillStyle=C.amber;box(g,pi[0]-7,pi[1]-7,14,14,4);g.fill();box(g,pt[0]-7,pt[1]-7,14,14,4);g.fill();
    }
    const m=io(seg(s2,0,.6)),dimF=1-.6*eo(seg(s3,0,.3));
    PC.forEach((c,k)=>{
      const ap=k===0?seg(s1,.5,.65):seg(s1,.6,.9);if(ap<=0)return;
      const base=(k===0?1:.5)*ap*dimF,pi=lerp2(init[k].i,[c[0]-12,c[1]],m),pt=lerp2(init[k].t,[c[0]+12,c[1]],m);
      if(m>0){A(m*.7*base);g.strokeStyle=C.teal;g.lineWidth=2;line(g,pi[0],pi[1],pt[0],pt[1]);g.stroke();}
      A(base);g.fillStyle=C.teal;box(g,pi[0]-7,pi[1]-7,14,14,3);g.fill();
      dot(g,pt[0],pt[1],7);g.fillStyle=C.stage;g.fill();g.strokeStyle=C.teal;g.lineWidth=2.5;g.stroke();
    });
    // similarity matrix: the diagonal wins
    const mA=eo(seg(s2,0,.25))*(1-eo(seg(s3,0,.25)));
    if(mA>0){
      for(let k=0;k<4;k++){A(mA*.8);g.fillStyle=C.mute;box(g,724+k*40,104,12,12,2);g.fill();dot(g,700,138+k*40,6);g.fill();}
      for(let rr=0;rr<4;rr++)for(let c=0;c<4;c++){A(mA*lerp(sim[rr*4+c],rr===c?.95:.07,m));g.fillStyle=rr===c?C.rose:C.mute;box(g,712+c*40,120+rr*40,36,36,5);g.fill();}
    }
    // fuse: visual tokens join the text tokens and enter the language model
    for(let k=0;k<3;k++){
      const v=io(seg(s3,.1+k*.06,.5+k*.06));if(v<=0)continue;
      const p=lerp2([PC[0][0]-12,PC[0][1]],[433+k*32,465],v);
      A(1);g.fillStyle=C.amber;box(g,p[0]-13,p[1]-13,26,26,5);g.fill();g.strokeStyle=C.teal;g.lineWidth=2.5;g.stroke();
    }
    for(let k=0;k<5;k++){
      const v=io(seg(s3,.3+k*.05,.7+k*.05));if(v<=0)continue;
      const p=lerp2([73+k*35,343],[433+(3+k)*32,465],v);
      A(1);g.fillStyle=C.amber;box(g,p[0]-13,p[1]-13,26,26,5);g.fill();
    }
    const ln=eo(seg(s3,.75,1));
    if(ln>0){A(.7);g.strokeStyle=C.mute;g.lineWidth=1.8;qPath(g,[682,465],[810,465],[810,428],ln);g.stroke();if(ln>=1)arrowHead(g,810,428,-Math.PI/2,8);}
    g.lineWidth=1;
    for(const y of bands){box(g,720,y,180,30,8);g.globalAlpha=.28;g.fillStyle=C.line;g.fill();g.globalAlpha=.9;g.strokeStyle=C.line;g.stroke();}
    const sc=seg(s4,0,.45)*3;
    bands.slice().reverse().forEach((y,k)=>{const lp=clamp(sc-k);if(lp<=0)return;A(bump(lp)*.3+.12);g.fillStyle=C.teal;box(g,720,y,180,30,8);g.fill();});
    if(s3>0){const a=eo(seg(s3,.6,1));A(a);box(g,720,130,180,154,12);g.fillStyle=C.stage;g.fill();g.strokeStyle=C.line;g.lineWidth=1.5;g.stroke();
      for(let k=0;k<4;k++){const o=eo(seg(s4,.38+k*.1,.6+k*.1));if(o>0){A(a);g.fillStyle=k===0?C.rose:C.ink;box(g,740,154+k*28,(k===3?85:138)*o,7,3);g.fill();}}
    }
  };
})();

/* ---------- 3 · Generative (diffusion) ---------- */
const GEN=(()=>{
  const r=rnd(31),N=260,SA=[],SB=[],NZ=[];
  while(SA.length<N){const x=130+r()*240,y=138+r()*220;if(Math.hypot(x-200,y-210)<70||(x>265&&x<365&&y>255&&y<355))SA.push([x,y]);}
  for(let k=0;k<N;k++){
    let a=r(),b=r();if(a+b>1){a=1-a;b=1-b;}
    SB.push([260+a*(150-260)+b*(372-260),118+a*(372-118)+b*(372-118)]);
    NZ.push([clamp(260+gauss(r)*80,84,436),clamp(252+gauss(r)*72,102,408)]);
  }
  const UB=[[530,130,110],[575,200,80],[620,260,56],[668,305,40],[716,260,56],[761,200,80],[806,130,110]];
  const UC=UB.map(([x,y,h])=>[x+11,y+h/2]);
  const PN=[...Array(26)].map(()=>[850+r()*48,162+r()*46]);
  const RET=[[874,214],[874,470],[470,470],[452,410]];
  const steps=(q)=>{const k=Math.min(7,Math.floor(q*8)),f=q*8-k;return 1-(k+io(seg(f,.72,1)))/8;};
  return function(g,S,st){
    const A=a=>{g.globalAlpha=clamp(a*st.F)};
    const s0=S(0),s1=S(1),s2=S(2),s3=S(3);
    let sig=1,tgt=SA,base=C.rose,active=false;
    if(st.i===0){sig=1;base=C.amber;}
    else if(st.i===1){active=true;}
    else if(st.i===2){sig=steps(s2);active=s2<1;}
    else{if(s3<.2){sig=io(seg(s3,0,.2));}else{tgt=SB;sig=s3<.35?1:steps(seg(s3,.35,1));active=s3>.3&&s3<1;}}
    // particles: data ↔ noise
    g.save();box(g,70,90,380,330,12);g.clip();
    for(let k=0;k<N;k++){
      const T=tgt[k],Z=NZ[k],x=lerp(T[0],Z[0],sig)+Math.sin(st.t*3+k)*2.2*sig,y=lerp(T[1],Z[1],sig)+Math.cos(st.t*2.6+k*1.3)*2.2*sig;
      if(sig>.01){A(sig*.8);g.fillStyle=C.mute;g.fillRect(x-2,y-2,4,4);}
      if(sig<.99){A(1-sig);g.fillStyle=base;g.fillRect(x-2,y-2,4,4);}
    }
    g.restore();
    g.globalAlpha=1;g.strokeStyle=C.line;g.lineWidth=1.5;box(g,70,90,380,330,12);g.stroke();
    // noise level t: 0 … T
    g.globalAlpha=1;line(g,80,450,440,450);g.stroke();
    for(let k=0;k<9;k++){line(g,80+k*45,445,80+k*45,455);g.stroke();}
    A(1);dot(g,lerp(80,440,sig),450,6);g.fillStyle=C.stage;g.fill();g.strokeStyle=C.teal;g.lineWidth=2.5;g.stroke();
    // U-Net
    g.globalAlpha=.6;g.strokeStyle=C.mute;g.lineWidth=1.5;
    for(let k=0;k<6;k++){line(g,UC[k][0],UC[k][1],UC[k+1][0],UC[k+1][1]);g.stroke();}
    g.setLineDash([3,4]);for(const [a,b] of [[0,6],[1,5],[2,4]]){const y=UB[a][1]+18;line(g,UB[a][0]+22,y,UB[b][0],y);g.stroke();}g.setLineDash([]);
    line(g,450,185,530,185);g.stroke();arrowHead(g,530,185,0,7);line(g,828,185,846,185);g.stroke();
    const ph=st.i===2?(s2*8)%1:st.i===3&&s3>=.35?(seg(s3,.35,1)*8)%1:(st.t*1.4)%1,idx=ph*6;
    UB.forEach(([x,y,h],k)=>{
      g.globalAlpha=1;box(g,x,y,22,h,5);g.fillStyle=C.stage;g.fill();g.strokeStyle=C.line;g.lineWidth=1.5;g.stroke();
      const gl=active?clamp(1-Math.abs(idx-k)):0;
      if(gl>0){A(gl);g.strokeStyle=C.teal;g.lineWidth=2.5;g.stroke();A(gl*.25);g.fillStyle=C.teal;g.fill();}
    });
    // predicted noise, subtracted back from the sample
    g.globalAlpha=1;g.setLineDash([3,3]);g.strokeStyle=C.line;g.lineWidth=1.5;box(g,846,158,56,56,6);g.stroke();g.setLineDash([]);
    if(active){
      const j=Math.min(5,Math.floor(idx)),p=lerp2(UC[j],UC[j+1],idx-j);
      A(1);dot(g,p[0],p[1],5);g.fillStyle=C.teal;g.fill();
      A(.75);g.fillStyle=C.mute;for(const [x,y] of PN)g.fillRect(x-1.5+Math.sin(st.t*5+x)*1.5,y-1.5,3,3);
      A(.4);g.strokeStyle=C.mute;g.lineWidth=1.5;g.setLineDash([4,5]);cPath(g,RET);g.stroke();g.setLineDash([]);
      const q=cPt(RET,ph);A(.8);dot(g,q[0],q[1],3.5);g.fillStyle=C.mute;g.fill();
    }
    // a condition steers the same process toward a new shape
    if(st.i===3&&s3>.2){
      const ct=io(seg(s3,.2,.35)),p=lerp2([940,423],[679,423],ct);
      if(ct>=1){A(.8);g.strokeStyle=C.teal;g.lineWidth=2;g.setLineDash([3,4]);line(g,679,405,679,347);g.stroke();g.setLineDash([]);}
      A(1);g.fillStyle=C.amber;box(g,p[0]-18,p[1]-18,36,36,7);g.fill();
      g.fillStyle=C.stage;g.beginPath();g.moveTo(p[0],p[1]-9);g.lineTo(p[0]-9,p[1]+8);g.lineTo(p[0]+9,p[1]+8);g.closePath();g.fill();
    }
  };
})();

/* ---------- 4 · Reinforcement learning ---------- */
const RL=(()=>{
  const CO=9,RO=6,CS=50,OX=70,OY=110,key=(c,r)=>c+','+r;
  const wall=new Set(['3,1','3,2','3,3','6,2','6,3','6,4','1,3','1,4']),pit=new Set(['5,0','7,4']);
  const GOAL=[8,0],START=[0,5];
  const free=(c,r)=>c>=0&&r>=0&&c<CO&&r<RO&&!wall.has(key(c,r));
  const D={};D[key(8,0)]=0;const qu=[GOAL];
  while(qu.length){const [c,r]=qu.shift();for(const [dc,dr] of DIRS){const n=[c+dc,r+dr],kk=key(n[0],n[1]);if(free(n[0],n[1])&&!pit.has(kk)&&D[kk]===undefined){D[kk]=D[key(c,r)]+1;qu.push(n);}}}
  const maxD=Math.max(...Object.values(D));
  const V=(c,r)=>D[key(c,r)]===undefined?-1:Math.pow(.86,D[key(c,r)]);
  const pol=(c,r)=>{let best=null,bv=-2;for(const d of DIRS){if(!free(c+d[0],r+d[1]))continue;const v=V(c+d[0],r+d[1]);if(v>bv){bv=v;best=d;}}return best;};
  const rr=rnd(41),isEnd=(c,r)=>pit.has(key(c,r))||(c===GOAL[0]&&r===GOAL[1]);
  const eps=[[.3,22],[.55,26],[.92,30]].map(([pf,max])=>{
    const path=[START.slice()];let [c,r]=START;
    for(let s=0;s<max;s++){
      let d;if(rr()<pf)d=pol(c,r);else{const o=DIRS.filter(([dc,dr])=>free(c+dc,r+dr));d=o[Math.floor(rr()*o.length)];}
      c+=d[0];r+=d[1];path.push([c,r]);if(isEnd(c,r))break;
    }return path;});
  const opt=[START.slice()];{let [c,r]=START;while(!isEnd(c,r)&&opt.length<40){const d=pol(c,r);c+=d[0];r+=d[1];opt.push([c,r]);}}
  const curve=[...Array(60)].map((_,k)=>clamp(1-Math.exp(-k/13)+(rr()-.5)*.35*(1-k/60)-.12));
  const cc=(c,r)=>[OX+c*CS+CS/2,OY+r*CS+CS/2];
  const at=(path,u)=>{const f=u*(path.length-1),j=Math.min(path.length-2,Math.floor(f));return lerp2(cc(...path[j]),cc(...path[j+1]),f-j);};
  function trail(g,path,u){g.beginPath();const n=u*(path.length-1);for(let j=0;j<=Math.floor(n);j++){const p=cc(...path[j]);j?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]);}const e=at(path,u);g.lineTo(e[0],e[1]);g.stroke();}
  function agent(g,A,p){A(1);g.fillStyle=C.teal;box(g,p[0]-11,p[1]-11,22,22,6);g.fill();g.fillStyle=C.stage;dot(g,p[0],p[1],3.5);g.fill();}
  function burst(g,A,c,r,u,col){if(u<=0||u>=1)return;const p=cc(c,r);A((1-u)*.9);g.strokeStyle=col;g.lineWidth=2;dot(g,p[0],p[1],12+u*30);g.stroke();}
  return function(g,S,st){
    const A=a=>{g.globalAlpha=clamp(a*st.F)};
    const s0=S(0),s1=S(1),s2=S(2),s3=S(3);
    // grid world
    for(let c=0;c<CO;c++)for(let r=0;r<RO;r++){
      const x=OX+c*CS,y=OY+r*CS,k=key(c,r);g.globalAlpha=1;box(g,x+2,y+2,46,46,7);
      if(wall.has(k)){g.globalAlpha=.75;g.fillStyle=C.ink;g.fill();continue;}
      g.strokeStyle=C.line;g.lineWidth=1.2;g.stroke();
      if(pit.has(k)){g.globalAlpha=.6;g.fillStyle=C.line;g.fill();g.globalAlpha=1;g.strokeStyle=C.mute;g.lineWidth=2;line(g,x+17,y+17,x+33,y+33);g.stroke();line(g,x+33,y+17,x+17,y+33);g.stroke();}
    }
    // value spreads back from the reward
    const wave=s1*(maxD+1.5);
    if(wave>0)for(const k in D){const [c,r]=k.split(',').map(Number),a=clamp(wave-D[k]);if(a<=0)continue;A(a*V(c,r)*.5);g.fillStyle=C.teal;box(g,OX+c*CS+2,OY+r*CS+2,46,46,7);g.fill();}
    {const p=cc(...GOAL);g.globalAlpha=1;g.strokeStyle=C.rose;g.lineWidth=2;dot(g,p[0],p[1],13);g.stroke();g.fillStyle=C.rose;dot(g,p[0],p[1],5);g.fill();
     const q=cc(...START);g.strokeStyle=C.amber;dot(g,q[0],q[1],13);g.stroke();}
    // greedy policy arrows
    if(s2>0)for(const k in D){
      const [c,r]=k.split(',').map(Number);if(D[k]===0)continue;
      const a=eo(seg(s2,D[k]/maxD*.6,D[k]/maxD*.6+.3));if(a<=0)continue;
      const d=pol(c,r),p=cc(c,r),ang=Math.atan2(d[1],d[0]);
      A(a*.75);g.strokeStyle=C.ink;g.lineWidth=2;line(g,p[0]-d[0]*9,p[1]-d[1]*9,p[0]+d[0]*10,p[1]+d[1]*10);g.stroke();arrowHead(g,p[0]+d[0]*10,p[1]+d[1]*10,ang,6);
    }
    // three exploratory episodes
    if(st.i===0){
      const e=Math.min(2,Math.floor(s0*3)),u=s0*3-e,mv=seg(u,0,.82);
      for(let k=0;k<e;k++){A(.18);g.strokeStyle=C.amber;g.lineWidth=2.5;trail(g,eps[k],1);}
      A(.75);g.strokeStyle=C.amber;g.lineWidth=2.5;trail(g,eps[e],mv);
      agent(g,A,at(eps[e],mv));
      const end=eps[e][eps[e].length-1];burst(g,A,end[0],end[1],seg(u,.82,1),pit.has(key(...end))?C.mute:C.rose);
    }else if(st.i<3)agent(g,A,cc(...START));
    // follow the learned policy
    if(s3>0){const mv=io(seg(s3,0,.72));A(.85);g.strokeStyle=C.rose;g.lineWidth=3;trail(g,opt,mv);agent(g,A,at(opt,mv));burst(g,A,GOAL[0],GOAL[1],seg(s3,.72,1),C.rose);}
    // return per episode
    g.globalAlpha=1;g.strokeStyle=C.mute;g.lineWidth=1.5;g.beginPath();g.moveTo(610,120);g.lineTo(610,390);g.lineTo(900,390);g.stroke();
    g.strokeStyle=C.line;g.setLineDash([4,4]);line(g,610,150,900,150);g.stroke();g.setLineDash([]);
    const n=Math.max(1,Math.floor(60*st.t/st.total));
    A(1);g.strokeStyle=C.teal;g.lineWidth=2;g.beginPath();
    for(let k=0;k<n;k++){const x=610+k/59*290,y=390-curve[k]*240;k?g.lineTo(x,y):g.moveTo(x,y);}g.stroke();
    const lx=610+(n-1)/59*290,ly=390-curve[n-1]*240;dot(g,lx,ly,4.5);g.fillStyle=C.rose;g.fill();
  };
})();

/* ---------- 5 · World model ---------- */
const WM=(()=>{
  const B0=[100,288],DX=460;
  const PATHS=[[[100,288],[160,288],[217,288]],[[100,288],[165,205],[218,250]],[[100,288],[230,100],[360,288]]];
  const score=[.16,.34,.92],Z=[[230,440],[520,440],[650,440],[780,440]];
  const pt=(k,u,ox=0)=>{const P=PATHS[k],q=qPt(P[0],P[1],P[2],u);return [q[0]+ox,q[1]];};
  const actual=(u,ox=0)=>{const p=pt(2,u,ox);return [p[0],p[1]-16*Math.sin(Math.PI*u)];};
  function actualPath(g,u){g.beginPath();for(let j=0;j<=32;j++){const p=actual(u*j/32);j?g.lineTo(...p):g.moveTo(...p);}}
  function world(g,ox,fa){
    const ga=g.globalAlpha;
    g.strokeStyle=C.mute;g.lineWidth=2;line(g,70+ox,300,390+ox,300);g.stroke();
    g.globalAlpha=ga*.75;g.fillStyle=C.ink;box(g,230+ox,240,30,60,3);g.fill();
    g.globalAlpha=ga;g.strokeStyle=C.ink;g.lineWidth=2;line(g,360+ox,300,360+ox,248);g.stroke();
    g.globalAlpha=ga*fa;g.fillStyle=C.rose;g.beginPath();g.moveTo(360+ox,248);g.lineTo(386+ox,256);g.lineTo(360+ox,264);g.closePath();g.fill();
    g.globalAlpha=ga;
  }
  function cross(g,x,y){line(g,x-7,y-7,x+7,y+7);g.stroke();line(g,x+7,y-7,x-7,y+7);g.stroke();}
  function latent(g,A,x,y,f){
    g.globalAlpha=1;dot(g,x,y,20);g.fillStyle=C.stage;g.fill();g.strokeStyle=C.teal;g.lineWidth=2;g.globalAlpha=.6;g.stroke();
    if(f>0){A(f*.22);g.fillStyle=C.teal;dot(g,x,y,20);g.fill();A(f);g.fillStyle=C.teal;for(let j=0;j<3;j++)g.fillRect(x-9+j*7,y+8-[12,18,9][j]*f,4,[12,18,9][j]*f);}
  }
  return function(g,S,st){
    const A=a=>{g.globalAlpha=clamp(a*st.F)};
    const s0=S(0),s1=S(1),s2=S(2),s3=S(3),s4=S(4);
    // real world (left) and imagination (right)
    g.globalAlpha=1;g.strokeStyle=C.line;g.lineWidth=1.5;box(g,60,110,340,210,10);g.stroke();
    g.setLineDash([5,5]);box(g,520,110,340,210,10);g.stroke();g.setLineDash([]);
    g.globalAlpha=1;world(g,0,.85);g.globalAlpha=.45;world(g,DX,.6);
    if(s0>0&&s0<1){const x=lerp(70,390,io(seg(s0,0,.5)));A(.08);g.fillStyle=C.amber;g.fillRect(70,120,x-70,180);A(.9);g.strokeStyle=C.amber;g.lineWidth=2;line(g,x,120,x,300);g.stroke();}
    // encoder funnel → z0, then a latent rollout
    g.globalAlpha=.6;g.strokeStyle=C.teal;g.lineWidth=2;g.beginPath();g.moveTo(195,326);g.lineTo(265,326);g.lineTo(240,412);g.lineTo(220,412);g.closePath();g.stroke();
    const enc=seg(s0,.45,.7);if(enc>0&&enc<1){A(1);dot(g,230,lerp(326,412,enc),4);g.fillStyle=C.amber;g.fill();}
    latent(g,A,Z[0][0],Z[0][1],eo(seg(s0,.65,.85)));
    for(let k=1;k<4;k++){
      const sk=seg(s1,(k-1)/3,k/3),[x0,y0]=Z[k-1],[x1,y1]=Z[k],ar=eo(seg(sk,0,.5));
      g.globalAlpha=1;g.strokeStyle=C.line;g.lineWidth=1.5;line(g,x0+22,y0,x1-22,y1);g.stroke();
      if(ar>0){A(1);g.strokeStyle=C.teal;g.lineWidth=2;line(g,x0+22,y0,lerp(x0+22,x1-22,ar),y1);g.stroke();}
      const at=eo(seg(sk,0,.3));if(at>0){A(at);g.fillStyle=C.rose;box(g,(x0+x1)/2-7,y0-34,14,14,4);g.fill();A(at*.6);g.strokeStyle=C.rose;g.lineWidth=1.5;line(g,(x0+x1)/2,y0-20,(x0+x1)/2,y0-4);g.stroke();}
      latent(g,A,x1,y1,eo(seg(sk,.5,.8)));
      const dc=eo(seg(sk,.6,1));if(dc>0){A(.6*(1-.5*eo(s2)));g.strokeStyle=C.teal;g.lineWidth=1.5;g.setLineDash([3,4]);line(g,x1,418,x1,lerp(418,322,dc));g.stroke();g.setLineDash([]);}
      const gh=eo(seg(sk,.8,1))*(1-.75*eo(seg(s2,0,.3)));if(gh>0){const p=pt(0,k/3,DX);A(gh*.7);g.strokeStyle=C.teal;g.lineWidth=2;dot(g,p[0],p[1],12);g.stroke();}
    }
    // imagine three futures, score them, keep the best
    if(s2>0){
      const sel=io(seg(s2,.65,.85));
      for(let k=0;k<3;k++){
        const pr=eo(seg(s2,k*.08,.5+k*.08)),best=k===2,al=best?1:lerp(1,.3,sel);
        g.fillStyle=best&&sel>0?C.teal:C.mute;
        for(let j=0;j<=Math.floor(pr*16);j++){const p=pt(k,j/16,DX);if(best&&st.i===4)p[1]-=16*Math.sin(Math.PI*j/16)*io(seg(s4,.35,.85));A(al*(best?.95:.7));dot(g,p[0],p[1],best?lerp(2.4,3.4,sel):2.4);g.fill();}
        if(pr>=1){const e=pt(k,1,DX);A(al);g.strokeStyle=best?C.teal:C.mute;g.lineWidth=2.5;if(best){dot(g,e[0],e[1],12);g.stroke();}else cross(g,e[0],e[1]);}
        const sb=eo(seg(s2,.45+k*.05,.65+k*.05));
        if(sb>0){A(.5*sb);g.fillStyle=C.line;box(g,874,150+k*40,60,8,4);g.fill();A(sb*al);g.fillStyle=best?C.teal:C.mute;box(g,874,150+k*40,60*score[k]*sb,8,4);g.fill();}
      }
    }
    // act in the real world
    let ball=B0;
    if(st.i===3){const u=io(seg(s3,0,.8));ball=actual(u);A(.8);g.strokeStyle=C.rose;g.lineWidth=2.5;actualPath(g,u);g.stroke();}
    if(st.i===4){ball=actual(1);A(.8);g.strokeStyle=C.rose;g.lineWidth=2.5;actualPath(g,1);g.stroke();}
    const won=seg(s3,.78,1);if(won>0&&won<1){A((1-won)*.9);g.strokeStyle=C.rose;g.lineWidth=2;dot(g,372,256,10+won*28);g.stroke();}
    g.globalAlpha=1;g.fillStyle=C.amber;dot(g,ball[0],ball[1],12);g.fill();
    // compare reality with the prediction, then correct the model
    if(s4>0){
      const a=eo(seg(s4,0,.25)),learn=io(seg(s4,.35,.85));
      A(a);g.strokeStyle=C.amber;g.lineWidth=2.5;g.beginPath();
      for(let j=0;j<=24;j++){const u=j/24,p=pt(2,u,DX),y=p[1]-16*Math.sin(Math.PI*u);j?g.lineTo(p[0],y):g.moveTo(p[0],y);}g.stroke();
      for(let j=1;j<5;j++){const u=j/5,p=pt(2,u,DX),y=p[1]-16*Math.sin(Math.PI*u)*(1-learn);A(a*(1-learn)*.9);g.strokeStyle=C.rose;g.lineWidth=1.5;line(g,p[0],p[1]-16*Math.sin(Math.PI*u)*learn,p[0],p[1]-16*Math.sin(Math.PI*u));g.stroke();}
      const up=seg(s4,.3,.8);if(up>0&&up<1){const f=up*3,j=Math.min(2,Math.floor(f)),p=lerp2(Z[3-j],Z[2-j],f-j);A(1);dot(g,p[0],p[1],5);g.fillStyle=C.rose;g.fill();}
    }
  };
})();

/* ---------- 6 · Efficiency & systems ---------- */
const SYS=(()=>{
  const r=rnd(53),Wm=[...Array(64)].map(()=>.06+r()*.94);
  const REQ=[5,2,7,3,4,2,6,3,5,2,4,3,6,2];
  const lanes=[0,0,0,0],sched=REQ.map(len=>{let l=0;for(let k=1;k<4;k++)if(lanes[k]<lanes[l])l=k;const s=lanes[l];lanes[l]+=len;return {l,s,e:s+len,len};});
  const CH=[210,390,570,750];
  const vis=(st,k)=>k===st.i?1:0;
  function memIcon(g,x,y){box(g,x-14,y-9,28,18,3);g.stroke();for(let j=0;j<4;j++){line(g,x-9+j*6,y+9,x-9+j*6,y+13);g.stroke();}}
  function cyl(g,x,y){g.beginPath();g.ellipse(x,y-10,13,5,0,0,Math.PI*2);g.stroke();g.beginPath();g.ellipse(x,y+10,13,5,0,0,Math.PI);g.stroke();line(g,x-13,y-10,x-13,y+10);g.stroke();line(g,x+13,y-10,x+13,y+10);g.stroke();}
  function loopIcon(g,x,y){g.beginPath();g.arc(x,y,12,-.3,Math.PI*1.6);g.stroke();arrowHead(g,x+12*Math.cos(-.3),y+12*Math.sin(-.3),Math.PI/2-.3+Math.PI,6);}
  return function(g,S,st){
    const A=a=>{g.globalAlpha=clamp(a*st.F)};
    let a;
    // quantize: values snap to 4 levels, the matrix shrinks, memory drops
    if((a=vis(st,0))>0){
      const p=st.p,q=io(seg(p,.2,.5)),m=io(seg(p,.55,.85)),size=240,cs=size/8,ox=230-size/2,oy=250-size/2;
      g.fillStyle=C.teal;
      for(let k=0;k<64;k++){const v=lerp(Wm[k],Math.round(Wm[k]*15)/15,q);A(a*(.08+.85*v));box(g,ox+(k%8)*cs+1,oy+Math.floor(k/8)*cs+1,cs-2,cs-2,2);g.fill();}
      A(a);g.strokeStyle=C.mute;g.lineWidth=1.8;memIcon(g,428,213);
      A(a);g.strokeStyle=C.line;g.lineWidth=1.5;box(g,460,200,340,26,7);g.stroke();
      g.fillStyle=C.teal;box(g,460,200,340*lerp(1,.25,m),26,7);g.fill();
      const bins=new Array(24).fill(0);for(const w of Wm){const v=lerp(w,Math.round(w*15)/15,q);bins[Math.min(23,Math.floor(v*24))]++;}
      A(a);g.strokeStyle=C.line;line(g,460,380,800,380);g.stroke();
      g.fillStyle=C.mute;bins.forEach((c,k)=>{const h=Math.min(110,c*7);if(h>0){A(a*.7);box(g,462+k*(340/24),380-h,340/24-4,h,2);g.fill();}});
    }
    // KV cache: without it every step recomputes all keys/values
    if((a=vis(st,1))>0){
      const g8=seg(st.p,.05,.95)*8,n=Math.min(9,2+Math.floor(g8)),f=g8%1;
      for(const R of [0,1]){
        const y0=R?290:110;
        A(a);g.strokeStyle=C.mute;g.lineWidth=2;if(R)cyl(g,96,y0+50);else loopIcon(g,96,y0+50);
        for(let k=0;k<n;k++){
          const x=140+k*40,nw=k===n-1;
          if(R&&!nw){A(a);g.fillStyle=C.amber;box(g,x,y0,30,48,5);g.fill();A(a*.6);box(g,x,y0+52,30,48,5);g.fill();}
          else{A(a*(nw?1:.5));g.fillStyle=nw?C.teal:C.mute;box(g,x,y0,30,100,5);g.fill();}
          if(!R||nw){A(a*bump(f)*.6);g.fillStyle=C.teal;box(g,x,y0,30,100,5);g.fill();}
        }
        const cost=R?n/45:n*(n+1)/2/45;
        A(a*.5);g.fillStyle=C.line;box(g,560,y0+38,340,24,6);g.fill();A(a);g.fillStyle=C.rose;box(g,560,y0+38,340*cost,24,6);g.fill();
      }
    }
    // continuous batching: freed slots are refilled at once
    if((a=vis(st,2))>0){
      const T=seg(st.p,.05,.95)*17,U=40,X0=200;
      for(let l=0;l<4;l++){A(a);g.strokeStyle=C.line;g.lineWidth=1.2;box(g,X0,140+l*62,680,44,8);g.stroke();}
      sched.forEach(s=>{
        if(s.s>=T)return;const e=Math.min(s.e,T),y=140+s.l*62,done=s.e<=T;
        A(a*(done?.32:.8));g.fillStyle=C.teal;box(g,X0+s.s*U+2,y+4,(e-s.s)*U-4,36,6);g.fill();
        if(done){A(a);g.fillStyle=C.rose;dot(g,X0+s.e*U-10,y+22,4);g.fill();}
      });
      sched.filter(s=>s.s>=T).slice(0,7).forEach((s,k)=>{A(a);g.fillStyle=C.amber;box(g,160-s.len*12,140+k*34,s.len*12,20,6);g.fill();});
      A(a*.8);g.strokeStyle=C.mute;g.lineWidth=1.5;line(g,X0+T*U,128,X0+T*U,394);g.stroke();
    }
    // pipeline parallelism: the model is split across four chips
    if((a=vis(st,3))>0){
      const p=st.p,sp=io(seg(p,.05,.25)),dr=io(seg(p,.25,.5));
      CH.forEach((cx,c)=>{
        A(a);box(g,cx-45,290,90,90,10);g.fillStyle=C.stage;g.fill();g.strokeStyle=C.mute;g.lineWidth=2;g.stroke();
        g.lineWidth=1.5;for(let j=0;j<4;j++){const o=-27+j*18;line(g,cx+o,284,cx+o,290);g.stroke();line(g,cx+o,380,cx+o,386);g.stroke();line(g,cx-51,335+o,cx-45,335+o);g.stroke();line(g,cx+45,335+o,cx+51,335+o);g.stroke();}
        if(c<3){A(a*.6);line(g,cx+51,335,CH[c+1]-51,335);g.stroke();}
        const x=lerp(170+c*155+(c-1.5)*sp*14,cx-30,dr),y=lerp(110,305,dr),w=lerp(151,60,dr),h=lerp(56,60,dr);
        for(let j=0;j<3;j++){A(a*(.3+.2*j));g.fillStyle=C.teal;box(g,x,y+j*h/3+1,w,h/3-2,3);g.fill();}
      });
      if(p>.5)for(let m=0;m<6;m++){
        const tt=seg(p,.5,1)*10-m*1.1;if(tt<0||tt>5)continue;
        const x=lerp(110,880,tt/5),inChip=CH.findIndex(cx=>Math.abs(x-cx)<45);
        if(inChip>=0){A(a*.2);g.fillStyle=C.teal;box(g,CH[inChip]-45,290,90,90,10);g.fill();}
        A(a);g.fillStyle=x<CH[0]-45?C.amber:x>CH[3]+45?C.rose:C.teal;dot(g,x,335,6);g.fill();
      }
    }
  };
})();

/* ---------- 7 · AI for science ---------- */
const SCI=(()=>{
  const cx=240,cy=262,R=62;
  const AT=[...Array(6)].map((_,k)=>{const a=(-90+60*k)*Math.PI/180;return [cx+R*Math.cos(a),cy+R*Math.sin(a),0];});
  const ext=(i,len,type)=>{const [x,y]=AT[i],dx=x-cx,dy=y-cy,d=Math.hypot(dx,dy);return [x+dx/d*len,y+dy/d*len,type];};
  AT.push(ext(0,50,1),ext(2,52,0),ext(4,50,1));AT.push([AT[7][0]+44,AT[7][1]-26,1]);
  const BD=[[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],[0,6,1],[2,7,1],[4,8,1],[7,9,2]];
  const NB=24,LINE=[...Array(NB)].map((_,k)=>[190+k*25,452]);
  const FOLD=LINE.map((_,k)=>{const th=-Math.PI/2+k/(NB-1)*Math.PI*2*.88,rr=70+22*Math.sin(3*th);return [420+rr*Math.cos(th),250+rr*Math.sin(th)];});
  const CONT=[];for(let i=0;i<NB;i++)for(let j=i+3;j<NB;j++)if(Math.hypot(FOLD[i][0]-FOLD[j][0],FOLD[i][1]-FOLD[j][1])<48)CONT.push([i,j]);
  function bond(g,a,b,order,t){
    const [x1,y1]=AT[a],[x2,y2]=AT[b],x=lerp(x1,x2,t),y=lerp(y1,y2,t);
    if(order===2){const d=Math.hypot(x2-x1,y2-y1),nx=-(y2-y1)/d*3.2,ny=(x2-x1)/d*3.2;line(g,x1+nx,y1+ny,x+nx,y+ny);g.stroke();line(g,x1-nx,y1-ny,x-nx,y-ny);g.stroke();}
    else{line(g,x1,y1,x,y);g.stroke();}
  }
  return function(g,S,st){
    const A=a=>{g.globalAlpha=clamp(a*st.F)};
    const s0=S(0),s1=S(1),s2=S(2),s3=S(3);
    const mA=1-eo(seg(s3,0,.2));
    if(mA>0){
      // Center and enlarge the molecule until the prediction architecture enters.
      const focus=1-eo(seg(s2,0,.3)),zoom=1+.4*focus;
      g.save();g.translate(cx+275*focus,cy);g.scale(zoom,zoom);g.translate(-cx,-cy);
      // molecule as a graph
      BD.forEach(([a,b,o],j)=>{const t=eo(seg(s0,.35+j*.04,.6+j*.04));if(t<=0)return;A(mA*.8);g.strokeStyle=C.mute;g.lineWidth=2.4;bond(g,a,b,o,t);});
      const rd=Math.min(2,Math.floor(s1*3)),f=s1*3-rd,lvl=s1>=1?1:(rd+seg(f,.6,1))/3;
      if(s1>0&&s1<1){const m=eo(seg(f,0,.6));g.fillStyle=C.teal;for(const [a,b] of BD){const p=lerp2(AT[a],AT[b],m),q=lerp2(AT[b],AT[a],m);A(mA*bump(m));dot(g,p[0],p[1],3.4);g.fill();dot(g,q[0],q[1],3.4);g.fill();}}
      AT.forEach(([x,y,ty],k)=>{
        const a=eo(seg(s0,k*.05,.3+k*.05));if(a<=0)return;const rr=ty?12:10;
        if(lvl>0){A(mA*lvl*.85);g.strokeStyle=C.teal;g.lineWidth=2.5;dot(g,x,y,rr+6);g.stroke();}
        A(mA*a);g.fillStyle=ty?C.amber:C.ink;dot(g,x,y,rr*lerp(.4,1,a));g.fill();
      });
      g.restore();
      // pool → MLP → property gauge
      const pk=seg(s2,0,.35);
      if(pk>0&&pk<1){g.fillStyle=C.amber;AT.forEach(([x,y],k)=>{const p=lerp2([cx+(x-cx)*zoom+275*focus,cy+(y-cy)*zoom],[510,260],io(clamp(pk*1.3-k*.03)));A(mA);dot(g,p[0],p[1],3);g.fill();});}
      const pc=seg(s2,.3,.5);
      for(let k=0;k<6;k++){g.globalAlpha=mA*(s2>0?1:0);g.strokeStyle=C.line;g.lineWidth=1.2;box(g,502,206+k*18,16,14,3);g.stroke();if(pc>0){A(mA*pc*(.3+.12*k));g.fillStyle=C.teal;box(g,502,206+k*18,16,14,3);g.fill();}}
      const ml=eo(seg(s2,.45,.65));
      if(ml>0){
        A(mA*ml*.35);g.strokeStyle=C.mute;g.lineWidth=1;
        for(let a=0;a<6;a++)for(let b=0;b<4;b++){line(g,518,213+a*18,580,224+b*24);g.stroke();}
        for(let a=0;a<4;a++){line(g,580,224+a*24,640,248+(a%2)*24);g.stroke();line(g,640,236+a*12,700,270);g.stroke();}
        g.fillStyle=C.teal;for(let b=0;b<4;b++){A(mA*ml);dot(g,580,224+b*24,5);g.fill();}for(let b=0;b<2;b++){dot(g,640,248+b*24,5);g.fill();}
      }
      const gv=io(seg(s2,.6,.95))*.72;
      if(s2>0){
        const gx=790,gy=300;A(mA);g.strokeStyle=C.line;g.lineWidth=10;g.lineCap='round';g.beginPath();g.arc(gx,gy,78,Math.PI,Math.PI*2);g.stroke();
        if(gv>0){g.strokeStyle=C.rose;g.beginPath();g.arc(gx,gy,78,Math.PI,Math.PI*(1+gv));g.stroke();}
        g.lineCap='butt';g.strokeStyle=C.ink;g.lineWidth=2.5;const an=Math.PI*(1+gv);line(g,gx,gy,gx+62*Math.cos(an),gy+62*Math.sin(an));g.stroke();
        g.fillStyle=C.ink;dot(g,gx,gy,6);g.fill();
        g.strokeStyle=C.mute;g.lineWidth=1.5;for(let k=0;k<=8;k++){const t=Math.PI*(1+k/8);line(g,gx+92*Math.cos(t),gy+92*Math.sin(t),gx+99*Math.cos(t),gy+99*Math.sin(t));g.stroke();}
      }
    }
    // protein: a sequence folds; contacts appear in the map
    if(s3>0){
      const ap=eo(seg(s3,0,.12)),fd=io(seg(s3,.12,.62)),ct=eo(seg(s3,.6,.88)),cm=eo(seg(s3,.25,.85));
      const P=LINE.map((p,k)=>lerp2(p,[FOLD[k][0]-65+(FOLD[k][0]-420)*.6,FOLD[k][1]+(FOLD[k][1]-250)*.6],fd));
      if(ct>0){A(ct*.45);g.strokeStyle=C.teal;g.lineWidth=1.5;g.setLineDash([3,4]);for(const [i,j] of CONT){line(g,P[i][0],P[i][1],P[j][0],P[j][1]);g.stroke();}g.setLineDash([]);}
      A(ap*.6);g.strokeStyle=C.ink;g.lineWidth=3;g.beginPath();P.forEach((p,k)=>k?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.stroke();
      P.forEach((p,k)=>{A(ap);g.fillStyle=k%3===0?C.mute:C.amber;dot(g,p[0],p[1],7);g.fill();});
      if(cm>0){
        A(cm);g.strokeStyle=C.line;g.lineWidth=1.2;box(g,686,146,200,200,6);g.stroke();
        for(let i=0;i<NB;i++)for(let j=0;j<NB;j++){const d=Math.abs(i-j);if(d>1)continue;A(cm*(d?.3:.5));g.fillStyle=C.ink;g.fillRect(690+i*8,150+j*8,7,7);}
        g.fillStyle=C.teal;for(const [i,j] of CONT){A(cm*.9);g.fillRect(690+i*8,150+j*8,7,7);g.fillRect(690+j*8,150+i*8,7,7);}
      }
    }
  };
})();



 const specs={
 vision:{fn:CV,d:[2.0,3.4,2.6,2.4,3.4],bounds:[48,80,880,350]},
 multimodal:{fn:MM,d:[2,2.6,3.2,3,3],bounds:[38,76,886,414]},
 generation:{fn:GEN,d:[1.4,2.6,5,5],bounds:[48,70,884,426]},
 rl:{fn:RL,d:[6,2.8,2.4,3.4],bounds:[45,85,883,345]},
 'world-model':{fn:WM,d:[2.4,3.2,3.6,3,2.8],bounds:[38,90,912,378]},
 systems:{fn:SYS,d:[4,4.2,4.6,4.4],bounds:[50,88,880,340]},
 ai4x:{fn:SCI,d:[2.6,3.6,3.4,5.4],bounds:[115,82,800,402]}
 };
 function phase(id,t){const ds=specs[id].d,total=ds.reduce((a,b)=>a+b,0);let time=Math.min(.9999,t)*total,i=0;while(i<ds.length-1&&time>=ds[i])time-=ds[i++];return {i,p:time/ds[i],t:Math.min(.9999,t)*total,total};}
 function draw(id,s,t){
   const col=s.colors;C={stage:col.wash,line:'color-mix(in srgb, '+col.ink+' 28%, '+col.wash+')',ink:col.ink,mute:col.muted,amber:col.orange,teal:col.green,rose:col.blue};
   const spec=specs[id],st=phase(id,t),S=k=>k<st.i?1:k>st.i?0:st.p;
   const [x,y,w,h]=spec.bounds,g=s.ctx,scale=Math.min(720/w,s.h/h);
   g.save();g.translate((720-w*scale)/2-x*scale,(s.h-h*scale)/2-y*scale);g.scale(scale,scale);
   spec.fn(g,S,{...st,F:1});
   // The reference's pipeline becomes sparse once layers reach the devices.
   // Keep a compact microbatch schedule above the four chips as work advances.
   if(id==='systems'&&st.i===3&&st.p>.5){
     const u=seg(st.p,.5,1)*10;
     for(let lane=0;lane<4;lane++){g.globalAlpha=.5;g.strokeStyle=C.line;g.lineWidth=1;line(g,185,143+lane*25,792,143+lane*25);g.stroke();
       for(let m=0;m<6;m++){const entered=m*1.1+lane,pr=clamp(u-entered);if(pr<=0)continue;g.globalAlpha=u>entered+1?.35:1;g.fillStyle=C.teal;box(g,185+entered*54,134+lane*25,48*pr,15,4);g.fill();}}
   }
   // Retain a clear completed prediction before the independent protein example.
   if(id==='ai4x'&&st.i===2&&st.p>.85){g.globalAlpha=eo(seg(st.p,.85,1));g.strokeStyle=C.teal;g.lineWidth=3;g.beginPath();g.moveTo(778,338);g.lineTo(788,348);g.lineTo(808,326);g.stroke();}
   g.restore();
 }
 return {draw,phase,has:id=>!!specs[id]};
 })();

 const render={llm,agent,embodied};
 function draw(s,t){if(!s.ratio)return;const p=pen(s);const id=s.el.dataset.motion;if(directionMotion.has(id))directionMotion.draw(id,s,t);else render[id]?.(s,t,p);const steps=s.el.querySelectorAll('.motion-steps li'),cuts={llm:[.24,.38,.58],agent:[2.2/16.4,4.4/16.4,13.4/16.4],vision:[.12,.48,.7],multimodal:[.16,.32,.48,.7],generation:[.08,.22,.35,.88],rl:[.08,.23,.34,.38,.6,.88],embodied:[2.4/15.9,4.8/15.9,7.8/15.9,13.3/15.9],systems:[.12,.25,.7],ai4x:[.13,.3,.52,.72],'world-model':[.12,.23,.55,.65]}[s.el.dataset.motion]||[];let step=cuts.filter(x=>t>=x).length;if(directionMotion.has(id))step=directionMotion.phase(id,t).i;step=Math.min(steps.length-1,step);if(step!==s.step){steps.forEach((el,i)=>el.classList.toggle('active',i===step));s.step=step}s.el.querySelector('.motion-progress i').style.transform='scaleX('+t+')';s.el.dataset.frame=String(Math.floor(t*100));}
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
 init();
})();
