/* Deterministic, silent, seekable visual studies. All coordinates are in 900 × 440. */
(function () {
  'use strict';
  const registry = window.AI4X_MOTION = window.AI4X_MOTION || {};
  const pi = Math.PI;
  const clamp = n => Math.max(0, Math.min(1, n));
  const ease = n => { n = clamp(n); return n * n * (3 - 2 * n); };
  const at = (t, a, b) => ease((t - a) / (b - a));
  const lerp = (a, b, p) => a + (b - a) * p;
  function path(c, pts, color, width = 3, alpha = 1, dash = []) {
    if (pts.length < 2) return;
    c.save(); c.globalAlpha *= alpha; c.strokeStyle = color; c.lineWidth = width;
    c.lineJoin = 'round'; c.lineCap = 'round'; c.setLineDash(dash);
    c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.stroke(); c.restore();
  }
  function reveal(c, pts, p, color, width = 3, alpha = 1, dash = []) {
    const n = (pts.length - 1) * clamp(p), whole = Math.floor(n);
    const out = pts.slice(0, whole + 1);
    if (whole < pts.length - 1) out.push([lerp(pts[whole][0], pts[whole + 1][0], n - whole), lerp(pts[whole][1], pts[whole + 1][1], n - whole)]);
    path(c, out, color, width, alpha, dash);
    return out[out.length - 1];
  }
  function disc(c, x, y, r, fill, stroke) {
    c.beginPath(); c.arc(x, y, r, 0, pi * 2); c.fillStyle = fill; c.fill();
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = 2; c.stroke(); }
  }
  function fillPoly(c, pts, fill, alpha = 1) {
    c.save(); c.globalAlpha *= alpha; c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(...p) : c.moveTo(...p)); c.closePath(); c.fillStyle = fill; c.fill(); c.restore();
  }
  function txt(c, str, x, y, size, color, align = 'left') {
    c.fillStyle = color; c.font = `500 ${size}px "Inter", "PingFang SC", "Microsoft YaHei", sans-serif`; c.textAlign = align; c.textBaseline = 'middle'; c.fillText(str, x, y);
  }
  function alpha(c, a, fn) { c.save(); c.globalAlpha *= clamp(a); fn(); c.restore(); }
  function check(c, x, y, color, p = 1) { reveal(c, [[x-8,y],[x-2,y+6],[x+10,y-8]],p,color,3); }
  function curve(fn, x0, y0, w, h, n = 100) { return Array.from({length:n+1},(_,i)=>[x0+w*i/n,y0-h*fn(i/n)]); }
  function axes(c, C, x = 104, y = 341, w = 684, h = 238) {
    [0, .25, .5, .75, 1].forEach(f => path(c, [[x,y-h*f],[x+w,y-h*f]], C.line, 1, .5));
    path(c, [[x,y-h],[x,y],[x+w,y]], C.muted, 1.5);
  }
  function scene(id, steps, draw) {
    registry[id] = {duration:18, steps, draw(c, t, kit) {
      c.save(); c.globalAlpha *= at(t, 0, .035) * (1 - at(t, .965, 1));
      draw(c, t, kit); c.restore();
    }};
  }

  scene('math', ['读出已知条件','补出辅助构造','匹配全等三角形','检查推理结果'], (c,t,{C}) => {
    const A=[350,76], B=[162,332], D=[350,332], E=[538,332];
    const build=at(t,.22,.40), compare=at(t,.46,.63), proof=at(t,.73,.87);
    fillPoly(c,[A,B,E],C.light,.42);
    reveal(c,[B,A,E,B],at(t,.035,.19),C.ink,3);
    [[A,'A',0,-25],[B,'B',-23,18],[E,'C',23,18]].forEach(([p,label,dx,dy])=>{
      disc(c,...p,4,C.ink); txt(c,label,p[0]+dx,p[1]+dy,22,C.ink,'center');
    });
    // Identical side ticks encode the initial equality independently of text.
    [[256,204],[444,204]].forEach(([x,y],i)=>path(c,[[x-9,y+(i?-7:7)],[x+9,y+(i?7:-7)]],C.copper,3));
    txt(c,'AB = AC',647,103,27,C.ink,'center');
    alpha(c,build,()=>{
      reveal(c,[B,E],at(t,.22,.29),C.copper,3);
      reveal(c,[A,D],at(t,.27,.40),C.copper,2.5,1,[6,6]);
      disc(c,...D,5,C.copper); txt(c,'D',350,363,22,C.copper,'center');
      [256,444].forEach(x=>{path(c,[[x-4,325],[x-4,339]],C.copper,2);path(c,[[x+4,325],[x+4,339]],C.copper,2);});
      txt(c,'BD = DC',647,150,25,C.copper,'center');
    });
    alpha(c,compare,()=>{
      fillPoly(c,[A,B,D],C.green,.18); fillPoly(c,[A,D,E],C.copper,.12);
      // The left half folds onto the right about AD: a geometric match, not a node pulse.
      const fold=at(t,.46,.64), bx=350-188*Math.cos(fold*pi);
      fillPoly(c,[A,[bx,332],D],C.green,.22);
      path(c,[A,[bx,332],D,A],C.green,2.5,.7);
      txt(c,'AD = AD',647,197,25,C.green,'center');
      path(c,[[575,227],[724,227]],C.line,1.5);
      txt(c,'△ABD ≅ △ACD',647,259,23,C.ink,'center');
    });
    alpha(c,proof,()=>{
      [[B,-.938,0],[E,pi,pi+.938]].forEach(([p,a,b])=>{
        c.beginPath(); c.arc(...p,43,a,lerp(a,b,proof)); c.strokeStyle=C.green; c.lineWidth=3;c.stroke();
      });
      txt(c,'∠B = ∠C',647,324,31,C.green,'center'); check(c,766,324,C.green,proof);
      txt(c,'全等 → 对应角相等',350,407,23,C.green,'center');
    });
    alpha(c,1-proof,()=>txt(c, t<.22?'等腰三角形':t<.46?'取 BC 的中点 D':'沿 AD 对齐两侧',350,407,23,C.muted,'center'));
  });

  scene('finance',['信息按时到达','冻结预测时点','预测未来区间','留出观测对照'],(c,t,{C})=>{
    const x=104,y=334,w=690,h=220,cut=.58,cx=x+w*cut;
    const price=u=>.43+.16*Math.sin(u*9)+.065*Math.sin(u*38)+.12*u;
    const start=price(cut), forecast=u=>start+.10*Math.sin((u-cut)*7)+.055*(u-cut);
    axes(c,C,x,y,w,h); txt(c,'序列值',104,60,22,C.muted);
    const history=curve(price,x,y,w,h,160).filter(p=>p[0]<=cx);
    const hp=at(t,.035,.28); const head=reveal(c,history,hp,C.ink,3.5);
    if(head)disc(c,...head,5,C.green);
    txt(c,'历史数据',105,381,22,C.ink); txt(c,'时间 →',796,381,20,C.muted,'right');
    alpha(c,at(t,.24,.34),()=>{
      path(c,[[cx,92],[cx,349]],C.copper,2,1,[5,6]);
      txt(c,'预测时点',cx,67,23,C.copper,'center');
      txt(c,'过去',cx-19,365,20,C.muted,'right'); txt(c,'未来',cx+19,365,20,C.muted);
    });
    // Time-stamped event markers arrive with the corresponding history.
    [.16,.34,.50].forEach((u,i)=>{
      const a=at(t,.03+u*.32,.07+u*.32);
      alpha(c,a,()=>{const ex=x+u*w,ey=y-price(u)*h;path(c,[[ex,ey+10],[ex,319]],C.line,1.5);disc(c,ex,319,5,C.copper);});
    });
    const fp=at(t,.37,.60), future=Array.from({length:61},(_,i)=>{
      const u=cut+(1-cut)*i/60*fp;return [x+u*w,y-forecast(u)*h];
    });
    if(fp>0){
      const upper=future.map((p,i)=>[p[0],p[1]-7-34*i/60*fp]);
      const lower=future.map((p,i)=>[p[0],p[1]+7+34*i/60*fp]).reverse();
      fillPoly(c,upper.concat(lower),C.green,.13);path(c,future,C.green,3,1,[7,5]);
      txt(c,'预测',758,113,22,C.green);path(c,[[699,113],[744,113]],C.green,3,1,[6,5]);
    }
    const obs=at(t,.65,.89);
    if(obs>0){
      const pts=Array.from({length:46},(_,i)=>{const u=cut+(1-cut)*i/45;return[x+u*w,y-price(u)*h];});
      reveal(c,pts,obs,C.copper,3);
      for(let i=5;i<46;i+=6){if(i/45>obs)break;const p=pts[i],u=(p[0]-x)/w;path(c,[p,[p[0],y-forecast(u)*h]],C.copper,1.3,.6,[2,4]);disc(c,...p,3.5,C.paper,C.copper);}
      txt(c,'实测',758,148,22,C.copper);path(c,[[699,148],[744,148]],C.copper,3);
    }
    txt(c,t<.34?'只使用当时已知的信息':t<.65?'预测在新数据到来前固定':'未来数据揭晓，逐时比较误差',450,418,23,C.ink,'center');
  });

  scene('graphs',['记录道路状态','拥堵沿关系传播','推演下一时段','比较实际路况'],(c,t,{C})=>{
    const roads=[[[94,139],[789,139]],[[94,243],[789,243]],[[94,347],[789,347]],[[217,80],[217,387]],[[421,80],[421,387]],[[643,80],[643,387]]];
    const mapIn=at(t,.025,.13), jam=at(t,.24,.45), forecast=at(t,.49,.69), observed=at(t,.76,.91);
    // Pale city blocks make this a road system rather than an abstract network.
    for(let r=0;r<2;r++)for(let col=0;col<2;col++){
      const x=[244,449][col],y=[164,268][r];
      c.fillStyle=C.light;c.globalAlpha*=1; c.fillRect(x,y,166,54);
      path(c,[[x+18,y+18],[x+145,y+18]],C.paper,5);path(c,[[x+18,y+34],[x+103,y+34]],C.paper,5);
    }
    roads.forEach(r=>{reveal(c,r,mapIn,C.line,19,.75);reveal(c,r,mapIn,C.paper,2,.9,[9,12]);});
    const route=[[789,243],[643,243],[421,243],[217,243],[217,139],[94,139]];
    // Cars move continuously; cars approaching the bottleneck bunch up as congestion grows.
    roads.forEach((r,j)=>{
      const len=Math.hypot(r[1][0]-r[0][0],r[1][1]-r[0][1]);
      for(let i=0;i<11;i++){
        let p=(i/11+t*(j===1?.60:1.1))%1;
        if(j===1&&jam>0){const q=.43+.33*(i/10);p=lerp(p,q,jam*(1-observed*.2));}
        const px=lerp(r[0][0],r[1][0],p),py=lerp(r[0][1],r[1][1],p);
        c.save();c.translate(px,py);c.rotate(Math.atan2(r[1][1]-r[0][1],r[1][0]-r[0][0]));
        c.fillStyle=j===1&&i>3&&jam>.2?C.copper:C.green;c.fillRect(-5,-6,10,4);c.restore();
      }
    });
    alpha(c,jam,()=>{
      path(c,[[539,243],[643,243]],C.copper,15,.42);
      disc(c,643,243,10,C.paper,C.copper);path(c,[[637,237],[649,249]],C.copper,2.5);
      txt(c,'瓶颈',683,207,23,C.copper);
    });
    // Forecast congestion travels upstream over connected road segments.
    const spread=[[630,243],[421,243],[217,243],[217,139]];
    if(forecast>0){reveal(c,spread,forecast,C.copper,21,.20);reveal(c,spread,forecast,C.copper,3,.85,[6,8]);}
    alpha(c,observed,()=>{
      path(c,[[628,247],[424,247],[267,247]],C.copper,4);
      [421,310].forEach(x=>check(c,x,282,C.green));
    });
    const clock=t<.49?'08:00':t<.76?'08:10 · 预测':'08:10 · 实测';
    txt(c,clock,100,40,27,C.ink);
    txt(c,t<.24?'车流 → 路段状态':t<.49?'下游变慢，上游开始排队':t<.76?'沿连接道路预测拥堵范围':'用下一时段的传感器记录核对',450,418,23,C.ink,'center');
    path(c,[[634,40],[672,40]],C.green,5);txt(c,'通畅',686,40,21,C.green);
    path(c,[[760,40],[794,40]],C.copper,5);txt(c,'拥堵',808,40,21,C.copper);
  });

  scene('automl',['同时启动候选','观察验证曲线','停止弱候选','追加预算并选优'],(c,t,{C})=>{
    const x=119,y=338,w=658,h=225;axes(c,C,x,y,w,h);
    txt(c,'验证误差 ↓',119,55,24,C.ink);txt(c,'训练预算 →',782,374,21,C.muted,'right');
    const colors=[C.copper,C.blue,C.muted,C.green];
    const fn=[u=>.73-.21*(1-Math.exp(-u*5))+.025*Math.sin(u*28),u=>.78-.50*(1-Math.exp(-u*5)),u=>.77-.32*(1-Math.exp(-u*8))+.025*Math.sin(u*25),u=>.78-.67*(1-Math.exp(-u*4.4))];
    const progress=lerp(0,.40,at(t,.045,.41))+lerp(0,.60,at(t,.57,.89));
    const stop=[.35,.65,.40,1];
    colors.forEach((color,i)=>{
      const cap=t<.49?.4:stop[i],p=Math.min(progress,cap);
      const pts=curve(fn[i],x,y,w,h);
      // Translucent ribbons resolve into the measured training trajectories.
      const used=pts.slice(0,Math.floor(p*100)+1);
      fillPoly(c,used.map(p=>[p[0],p[1]-5]).concat(used.map(p=>[p[0],p[1]+5]).reverse()),color,.08);
      const end=reveal(c,pts,p,color,i===3?4:2.5,i===3?1:.75);
      if(!end)return;disc(c,...end,i===3?5:4,color);
      if(t>.49&&progress>=stop[i]&&i<3){
        alpha(c,at(t,.49,.56),()=>{path(c,[[end[0]-5,end[1]-5],[end[0]+5,end[1]+5]],color,2.5);path(c,[[end[0]-5,end[1]+5],[end[0]+5,end[1]-5]],color,2.5);});
      }
    });
    // Each moving bead is a remaining unit of training budget, reassigned after pruning.
    const move=at(t,.51,.68);
    for(let i=0;i<16;i++){
      const row=Math.floor(i/4),col=i%4;
      const bx=lerp(143+col*24,615+col*24,move),by=lerp(88+row*17,82+row*17,move);
      const spent=at(t,.70+i*.008,.79+i*.008);
      alpha(c,1-spent,()=>disc(c,bx+spent*80,by+spent*180,4.5,colors[row]));
    }
    alpha(c,at(t,.43,.53)*(1-at(t,.71,.77)),()=>{
      path(c,[[x+w*.40,122],[x+w*.40,338]],C.muted,1.5,.55,[4,6]);
      txt(c,'停止弱候选',456,80,24,C.copper);
    });
    alpha(c,at(t,.87,.94),()=>{txt(c,'保留配置 D',654,65,25,C.green);check(c,810,65,C.green);});
    ['A','B','C','D'].forEach((name,i)=>{path(c,[[119+i*119,402],[143+i*119,402]],colors[i],4);txt(c,name,154+i*119,402,22,colors[i]);});
    alpha(c,at(t,.59,.68),()=>txt(c,'预算流向更优候选',779,402,23,C.ink,'right'));
  });

  scene('research',['提出实验分支','执行并记录曲线','比较结果与基线','据证据选择下一轮'],(c,t,{C})=>{
    const trunk=[105,222], nodes=[[252,116],[252,221],[252,326]];
    txt(c,'同一数据 · 同一预算',449,42,24,C.ink,'center');
    const branch=at(t,.08,.23),train=at(t,.25,.58),select=at(t,.62,.75),next=at(t,.79,.92);
    disc(c,...trunk,12,C.ink);txt(c,'基线',105,262,22,C.ink,'center');
    nodes.forEach((n,i)=>{
      reveal(c,[trunk,[174,222],n],branch,[C.blue,C.green,C.copper][i],2);
      alpha(c,branch,()=>{disc(c,...n,8,[C.blue,C.green,C.copper][i]);txt(c,['改结构','改训练','改数据'][i],n[0],n[1]-24,22,C.ink,'center');});
    });
    const x=374,y=336,w=419,h=230;
    axes(c,C,x,y,w,h);txt(c,'验证误差 ↓',374,76,21,C.muted);
    txt(c,'训练步数',793,367,20,C.muted,'right');
    const base=u=>.68-.30*(1-Math.exp(-u*5));
    const fns=[u=>.69-.34*(1-Math.exp(-u*4)),u=>.68-.49*(1-Math.exp(-u*4.5)),u=>.69-.24*(1-Math.exp(-u*6))+.10*Math.max(0,u-.45)];
    path(c,curve(base,x,y,w,h),C.muted,2,.5,[5,6]);
    [C.blue,C.green,C.copper].forEach((color,i)=>{
      const p=clamp(train*1.12-i*.045); const pts=curve(fns[i],x,y,w,h);
      reveal(c,pts,p,color,i===1?3.5:2.5,i===1?1:1-select*.55);
    });
    alpha(c,select,()=>{
      path(c,[trunk,[174,222],nodes[1]],C.green,4);
      check(c,283,221,C.green);txt(c,'保留',256,255,22,C.green,'center');
      [0,2].forEach(i=>path(c,[[nodes[i][0]-5,nodes[i][1]-5],[nodes[i][0]+5,nodes[i][1]+5]],C.paper,2));
      txt(c,'基线',802,y-h*base(1),18,C.muted);
    });
    alpha(c,next,()=>{
      // The selected experiment generates a real next trial and an additional curve.
      reveal(c,[nodes[1],[298,221],[326,177]],next,C.green,2.5);
      disc(c,326,177,6,C.green);txt(c,'下一轮',326,148,20,C.green,'center');
      const better=u=>.68-.53*(1-Math.exp(-u*4.3));
      reveal(c,curve(better,x,y,w,h),next,C.green,2.5,1,[5,5]);
    });
    txt(c,t<.25?'一个问题，三种可执行修改':t<.62?'每个分支留下自己的实验曲线':t<.79?'结果支持保留训练策略改动':'从保留的实验继续提出下一次修改',450,410,23,C.ink,'center');
  });

  scene('rsi',['修改自身工具代码','生成候选版本','执行固定任务测试','保留并继续修改'],(c,t,{C})=>{
    const patch=at(t,.06,.24),fork=at(t,.26,.41),test=at(t,.45,.69),pick=at(t,.74,.87);
    const root=[120,206],one=[262,132],two=[262,292],child=[369,132];
    txt(c,'Agent 版本档案',95,47,24,C.ink);
    disc(c,...root,12,C.ink);txt(c,'v0',120,244,24,C.ink,'center');
    [[one,'v1',C.green],[two,'v2',C.copper]].forEach(([p,name,color])=>{
      reveal(c,[root,[179,206],p],fork,color,2.5);
      alpha(c,fork,()=>{disc(c,...p,10,color);txt(c,name,p[0],p[1]+33,23,color,'center');});
    });
    // Code is the concrete object being changed; this is a schematic tool-agent example.
    const codeFade=1-at(t,.39,.47);
    alpha(c,codeFade,()=>{
      txt(c,'工具调用策略',478,98,25,C.ink);
      path(c,[[454,129],[809,129]],C.line,1.5);
      txt(c,'result = run(task)',478,168,23,C.muted);
      alpha(c,patch,()=>{
        path(c,[[474,168],[742,168]],C.copper,2);
        c.fillStyle=C.light;c.fillRect(459,199,366,111);
        txt(c,'+ inspect(error)',478,222,23,C.green);
        txt(c,'+ revise(tool_args)',478,259,23,C.green);
        txt(c,'+ retry(task)',478,296,23,C.green);
      });
    });
    alpha(c,at(t,.40,.47),()=>{
      txt(c,'固定任务测试',489,88,25,C.ink);
      const colx=[527,639,751];
      ['v0','v1','v2'].forEach((label,i)=>txt(c,label,colx[i],130,22,[C.muted,C.green,C.copper][i],'center'));
      for(let row=0;row<5;row++){
        const yy=175+row*37;
        txt(c,String(row+1).padStart(2,'0'),452,yy,19,C.muted);
        colx.forEach((xx,col)=>{
          const a=at(test,(row*3+col)/18,(row*3+col+2)/18);
          path(c,[[xx-22,yy+16],[xx+22,yy+16]],C.line,1,.6);
          const passed=[[true,true,false,true,false],[true,true,true,true,false],[true,false,true,false,false]][col][row];
          alpha(c,a,()=>passed?check(c,xx,yy,[C.muted,C.green,C.copper][col]):path(c,[[xx-7,yy],[xx+7,yy]],C.copper,2.5));
        });
      }
      alpha(c,at(t,.68,.73),()=>{
        ['3 / 5','4 / 5','2 / 5'].forEach((s,i)=>txt(c,s,colx[i],380,23,[C.muted,C.green,C.copper][i],'center'));
      });
    });
    alpha(c,pick,()=>{
      path(c,[root,[179,206],one],C.green,4);
      disc(c,...one,16,C.paper,C.green);check(c,...one,C.green);
      reveal(c,[one,child],at(t,.82,.92),C.green,3);disc(c,...child,7,C.green);
      txt(c,'v1.1',369,170,21,C.green,'center');
      txt(c,'再次修改',346,95,21,C.green,'center');
    });
    txt(c,t<.40?'修改的是 Agent 自己的工具策略':t<.74?'同一组任务，比较候选版本':'保留通过更多测试的版本，继续生成修改',450,419,23,C.ink,'center');
  });
})();
