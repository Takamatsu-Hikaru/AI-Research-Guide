window.AI4X_MOTION=window.AI4X_MOTION||{};
window.AI4X_KIT=(()=>{
 const C={ink:'#243e35',green:'#34776a',light:'#dce9df',copper:'#bc7c48',muted:'#768779',paper:'#f8f6ee',line:'#cbd8ca',blue:'#668a9a'};
 const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
 const mix=(a,b,t)=>a+(b-a)*t;
 const smooth=(a,b,t)=>{const x=clamp((t-a)/(b-a));return x*x*(3-2*x)};
 function text(c,s,x,y,size=20,color=C.ink,align='left'){c.save();c.font=`500 ${size}px Arial,"Microsoft YaHei",sans-serif`;c.fillStyle=color;c.textAlign=align;c.textBaseline='middle';c.fillText(s,x,y);c.restore()}
 function line(c,pts,color=C.green,width=2,alpha=1){if(!pts.length)return;c.save();c.globalAlpha*=alpha;c.strokeStyle=color;c.lineWidth=width;c.lineCap='round';c.lineJoin='round';c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();c.restore()}
 function circle(c,x,y,r,fill,stroke){if(r<=0)return;c.beginPath();c.arc(x,y,r,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.stroke()}}
 function round(c,x,y,w,h,r,fill,stroke){c.beginPath();c.roundRect(x,y,w,h,r);if(fill){c.fillStyle=fill;c.fill()}if(stroke){c.strokeStyle=stroke;c.stroke()}}
 const stage=(t,i)=>smooth(i/4,i/4+.07,t)*(1-smooth((i+1)/4-.06,(i+1)/4,t));
 return {W:900,H:440,C,clamp,mix,smooth,text,line,circle,round,stage};
})();
