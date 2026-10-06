/* Deterministic, seekable scientific scenes. All geometry is illustrative. */
(function () {
  'use strict';
  const TAU = Math.PI * 2;
  const clamp = x => Math.max(0, Math.min(1, x));
  const ease = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const at = (t, a, b) => ease((t - a) / (b - a));
  const mix = (a, b, t) => a + (b - a) * t;
  const hash = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  const fade = t => at(t, 0, .035) * (1 - at(t, .94, 1));
  function path(ctx, pts, color, width, alpha) {
    if (!pts.length) return;
    ctx.save(); ctx.globalAlpha *= alpha == null ? 1 : alpha;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.strokeStyle = color; ctx.lineWidth = width || 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
  }
  function ellipse(ctx, x, y, rx, ry, fill, stroke, width, angle) {
    ctx.beginPath(); ctx.ellipse(x, y, Math.max(.01, rx), Math.max(.01, ry), angle || 0, 0, TAU);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width || 1.5; ctx.stroke(); }
  }
  function label(ctx, text, x, y, color, size, align) {
    ctx.fillStyle = color; ctx.font = '500 ' + (size || 21) + 'px "Inter", "Noto Sans SC", "Microsoft YaHei", sans-serif';
    ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, x, y);
  }
  function alpha(ctx, a, fn) { if (a <= .001) return; ctx.save(); ctx.globalAlpha *= clamp(a); fn(); ctx.restore(); }
  function shadow(ctx, x, y, rx, ry, C, opacity) {
    alpha(ctx, opacity || .12, () => ellipse(ctx, x, y, rx, ry, C.green));
  }
  function caption(ctx, s, C) { label(ctx, s, 450, 405, C.muted, 20, 'center'); }

  // Backbone coordinates: connected helices and turns, projected and depth sorted.
  function folded(u) {
    const s = u * 5;
    const k = Math.min(4, Math.floor(s)), v = s - k;
    if (k === 0) return [-145 + 58 * Math.cos(v * TAU * 3), -105 + v * 210, 40 * Math.sin(v * TAU * 3)];
    if (k === 1) return [-87 + 130 * v, 105 + 30 * Math.sin(v * Math.PI), 25 * Math.sin(v * TAU)];
    if (k === 2) return [43 + 55 * Math.sin(v * TAU * 3), 105 - 220 * v, 50 * Math.cos(v * TAU * 3)];
    if (k === 3) return [43 + 133 * v, -115 - 23 * Math.sin(v * Math.PI), 50 * (1 - v)];
    return [176 + 44 * (Math.cos(v * TAU * 2.7) - 1), -115 + v * 215, 45 * Math.sin(v * TAU * 2.7)];
  }
  window.AI4X_MOTION.protein = {
    duration: 18,
    steps: ['序列输入', '残基关系', '结构预测', '结构比对'],
    draw(ctx, t, kit) {
      const C = kit.C, build = at(t, .19, .53), compare = at(t, .76, .85), rot = .23 * Math.sin(t * TAU), pts = [];
      ctx.save(); ctx.globalAlpha *= fade(t);
      shadow(ctx, 450, 361, mix(325, 185, build), 15, C, .06);
      for (let i = 0; i <= 220; i++) {
        const u = i / 220, f = folded(u), x = f[0] * Math.cos(rot) + f[2] * Math.sin(rot), z = f[2] * Math.cos(rot) - f[0] * Math.sin(rot);
        pts.push([450 + mix((u - .5) * 730, x, build), 214 + mix(36 * Math.sin(u * TAU * 2), f[1], build), z * build, u]);
      }
      // Long-range residue constraints appear before the predicted backbone.
      alpha(ctx, at(t, .13, .23) * (1 - at(t, .44, .54)), () => {
        const contactAlpha = ctx.globalAlpha;
        for (let i = 0; i < 12; i++) {
          const a = pts[12 + i * 5], b = pts[205 - i * 7];
          ctx.beginPath(); ctx.moveTo(a[0], a[1]);
          ctx.bezierCurveTo(a[0], a[1] - 45 - i * 4, b[0], b[1] - 45 - i * 4, b[0], b[1]);
          ctx.strokeStyle = i % 3 ? C.green : C.copper; ctx.globalAlpha = contactAlpha * (.12 + .2 * Math.sin(i + t * 7) ** 2);
          ctx.lineWidth = 1.5; ctx.stroke();
        }
      });
      // A wide ribbon, edge shadow, and narrow specular ridge convey orientation.
      const segments = pts.slice(1).map((p, i) => ({ a: pts[i], b: p, z: (p[2] + pts[i][2]) / 2 }));
      segments.sort((a, b) => a.z - b.z);
      for (const seg of segments) {
        const u = seg.a[3], copper = u > .2 && u < .4 || u > .6 && u < .8;
        const width = mix(5, copper ? 7 : 13 + 4 * Math.sin(u * TAU * 15) ** 2, build);
        path(ctx, [[seg.a[0] + 2, seg.a[1] + 3], [seg.b[0] + 2, seg.b[1] + 3]], C.ink, width + 1, .12 * build);
        path(ctx, [seg.a, seg.b], copper ? C.copper : C.green, width, .75 + .2 * (seg.z + 70) / 140);
        path(ctx, [[seg.a[0] - 1.5, seg.a[1] - 2], [seg.b[0] - 1.5, seg.b[1] - 2]], copper ? '#eed1ab' : '#a4c9b0', width * .22, .6 * build);
      }
      alpha(ctx, 1 - at(t, .24, .35), () => {
        const seq = 'M A K V L G D A S T R V L E';
        const letters = seq.split(' ');
        for (let i = 0; i < letters.length; i++) {
          const p = pts[Math.round(i / (letters.length - 1) * 220)];
          ellipse(ctx, p[0], p[1], 14, 14, i % 4 === 0 ? C.copper : C.green, C.paper, 3);
          label(ctx, letters[i], p[0], p[1] + 41, C.ink, 20, 'center');
        }
      });
      alpha(ctx, at(t, .54, .67), () => {
        const p = pts[99], q = pts[184];
        path(ctx, [[p[0], p[1]], [p[0] - 80, 72], [160, 72]], C.line, 1.5);
        label(ctx, '预测骨架', 120, 51, C.green, 22);
        ellipse(ctx, p[0], p[1], 5, 5, C.paper, C.green, 2);
        alpha(ctx, compare, () => {
          const measured = pts.map((r, i) => [r[0] + 7 * Math.sin(i * .16), r[1] + 5 * Math.cos(i * .12)]);
          ctx.setLineDash([5, 5]); path(ctx, measured, C.copper, 2.5, .85); ctx.setLineDash([]);
          path(ctx, [[q[0], q[1]], [710, 100], [777, 100]], C.copper, 1.5, .7);
          label(ctx, '参考结构', 685, 75, C.copper, 22);
        });
      });
      caption(ctx, t < .24 ? '氨基酸序列' : t < .52 ? '远距离残基联系' : t < .76 ? '计算预测三维结构' : '叠合比较局部差异', C);
      ctx.restore();
    }
  };

  function genomeTrack(ctx, x0, y, width, height, mutation, C, color, fillOpacity) {
    const pts = [];
    for (let i = 0; i <= 180; i++) {
      const u = i / 180;
      let value = .055 + .035 * Math.sin(u * 48) ** 2;
      value += .63 * Math.exp(-1 * ((u - .32) / .055) ** 2) + .82 * Math.exp(-1 * ((u - .64) / .075) ** 2);
      value += .22 * Math.exp(-1 * ((u - .83) / .022) ** 2);
      value += mutation * (.48 * Math.exp(-1 * ((u - .51) / .045) ** 2) - .44 * Math.exp(-1 * ((u - .64) / .06) ** 2));
      pts.push([x0 + u * width, y - value * height]);
    }
    alpha(ctx, fillOpacity || .12, () => {
      ctx.beginPath(); ctx.moveTo(x0, y); pts.forEach(p => ctx.lineTo(p[0], p[1])); ctx.lineTo(x0 + width, y); ctx.closePath(); ctx.fillStyle = color; ctx.fill();
    });
    path(ctx, pts, color, 2.5); path(ctx, [[x0, y], [x0 + width, y]], C.line, 1);
  }
  window.AI4X_MOTION.genome = {
    duration: 18, steps: ['DNA 上下文', '放大变异位点', '预测调控信号', '比较变异影响'],
    draw(ctx, t, kit) {
      const C = kit.C, zoom = at(t, .16, .32), tracks = at(t, .42, .56), variant = at(t, .68, .82);
      const cy = mix(213, 126, tracks), spread = mix(63, 35, zoom), twist = mix(3.1, .24, zoom), x0 = 70;
      ctx.save(); ctx.globalAlpha *= fade(t);
      const strand = sign => {
        const points = [];
        for (let i = 0; i <= 230; i++) {
          const u = i / 230, theta = u * TAU * twist + .4 + t * 1.3 * (1 - zoom);
          points.push([x0 + u * 760, cy + sign * Math.sin(theta) * spread]);
        }
        path(ctx, points.map(p => [p[0], p[1] + 3]), C.ink, 6, .06);
        path(ctx, points, sign === 1 ? C.green : C.copper, 5);
        path(ctx, points.map(p => [p[0], p[1] - 1]), '#ffffff', 1, .45);
      };
      for (let i = 0; i < 31; i++) {
        const u = i / 30, theta = u * TAU * twist + .4 + t * 1.3 * (1 - zoom), x = x0 + u * 760;
        const y1 = cy + Math.sin(theta) * spread, y2 = cy - Math.sin(theta) * spread;
        path(ctx, [[x, y1], [x, cy]], C.green, mix(3, 5, zoom), .2 + .45 * Math.abs(Math.cos(theta)));
        path(ctx, [[x, cy], [x, y2]], C.copper, mix(3, 5, zoom), .2 + .45 * Math.abs(Math.cos(theta)));
      }
      strand(-1); strand(1);
      alpha(ctx, zoom, () => {
        const letters = ['A', 'C', 'T', 'G', 'A', 'T', 'C', 'G', 'T'];
        for (let i = 0; i < letters.length; i++) {
          const x = 170 + i * 70, active = i === 4;
          if (active) {
            const halo = ctx.createRadialGradient(x, cy, 3, x, cy, 55); halo.addColorStop(0, '#bc7c4830'); halo.addColorStop(1, '#bc7c4800');
            ellipse(ctx, x, cy, 55, 55, halo);
            ellipse(ctx, x, cy, 25, 25, C.paper, C.copper, 2);
          } else ellipse(ctx, x, cy, 20, 20, C.paper);
          label(ctx, active && variant > .5 ? 'G' : letters[i], x, cy + 1, active ? C.copper : C.ink, active ? 27 : 23, 'center');
        }
        path(ctx, [[450, cy - 31], [450, 58]], C.copper, 1.5);
        label(ctx, 'A → G', 450, 37, C.copper, 23, 'center');
      });
      alpha(ctx, tracks, () => {
        const y1 = 275, y2 = 366;
        label(ctx, '参考序列', 71, 203, C.green, 20);
        genomeTrack(ctx, 70, y1, 760, 64, 0, C, C.green);
        label(ctx, '变异序列', 71, 298, C.copper, 20);
        genomeTrack(ctx, 70, y2, 760, 64, variant, C, C.copper);
        const scanX = 70 + 760 * clamp((t - .43) / .23);
        alpha(ctx, 1 - at(t, .69, .73), () => { path(ctx, [[scanX, 190], [scanX, 371]], C.green, 2, .35); });
        alpha(ctx, variant, () => {
          const x = 450; ctx.setLineDash([4, 5]); path(ctx, [[x, cy + 40], [x, 367]], C.copper, 1.5, .55); ctx.setLineDash([]);
          ctx.fillStyle = '#bc7c4810'; ctx.fillRect(413, 215, 155, 157);
          path(ctx, [[599, 241], [599, 329]], C.copper, 1.5, .6);
          path(ctx, [[592, 250], [599, 241], [606, 250]], C.copper, 1.5, .6);
          path(ctx, [[592, 320], [599, 329], [606, 320]], C.copper, 1.5, .6);
        });
      });
      if (tracks < .5) caption(ctx, zoom < .5 ? '长序列中的局部差异' : '保留上下文，替换一个碱基', C);
      else caption(ctx, '同一细胞背景下的预测信号', C);
      ctx.restore();
    }
  };

  function cellShape(ctx, x, y, r, phase, C, response, detail) {
    const points = [];
    for (let i = 0; i <= 32; i++) {
      const a = i / 32 * TAU, rr = r * (1 + .075 * Math.sin(a * 3 + phase) + .04 * Math.cos(a * 5 - phase));
      points.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr * .88]);
    }
    const grad = ctx.createRadialGradient(x - r * .28, y - r * .3, 1, x, y, r);
    grad.addColorStop(0, response ? '#f3e3c8' : '#edf3e7'); grad.addColorStop(.8, response ? '#e0bf8f' : '#c4dbbf'); grad.addColorStop(1, response ? '#bf9567' : '#8db99b');
    ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = response ? C.copper : C.green; ctx.lineWidth = detail ? 1.5 : 1; ctx.stroke();
    const nx = x - r * .11, ny = y + r * .03;
    ellipse(ctx, nx, ny, r * .35, r * .29, response ? '#ba865b99' : '#50857288', response ? '#aa744c88' : '#3c6f5d88', 1, -.3);
    ellipse(ctx, nx - r * .07, ny + r * .02, r * .095, r * .095, response ? '#93634499' : '#3f716199');
    if (detail) {
      for (let j = 0; j < 7; j++) {
        const a = j * 2.399 + phase, d = r * (.52 + .13 * hash(j + phase));
        ellipse(ctx, x + Math.cos(a) * d, y + Math.sin(a) * d * .8, r * .1, r * .045, '#93b3a080', '#668d7766', .7, a);
      }
      path(ctx, points.slice(3, 13).map(p => [p[0] - 1, p[1] - 2]), '#ffffff', 2, .7);
    }
  }
  window.AI4X_MOTION.cell = {
    duration: 18, steps: ['观察组织细胞', '学习细胞状态', '加入干预条件', '预测响应分布'],
    draw(ctx, t, kit) {
      const C = kit.C, gather = at(t, .2, .43), treat = at(t, .5, .68), respond = at(t, .68, .88);
      ctx.save(); ctx.globalAlpha *= fade(t);
      alpha(ctx, 1 - gather, () => {
        for (let i = 0; i < 7; i++) {
          const y = 83 + i * 47; path(ctx, [[45, y], [855, y + 17 * Math.sin(i)]], C.line, 1, .23);
        }
      });
      const cells = [];
      for (let i = 0; i < 56; i++) {
        const col = i % 8, row = Math.floor(i / 8), g = i % 3;
        const angle = hash(i * 3) * TAU, radius = 18 + Math.sqrt(hash(i * 3 + 1)) * 65;
        const centers = [[242, 179], [462, 276], [685, 169]];
        const startX = 119 + col * 94 + (row % 2) * 29 + (hash(i + 90) - .5) * 11, startY = 78 + row * 46 + (hash(i + 91) - .5) * 7;
        const endX = centers[g][0] + Math.cos(angle) * radius, endY = centers[g][1] + Math.sin(angle) * radius * .82;
        const changed = g === 1 && i % 4 !== 0;
        const dx = changed ? 115 + 35 * hash(i) : g === 2 ? 17 : -15;
        const dy = changed ? -66 - 35 * hash(i + 2) : 0;
        const x = mix(startX, endX, gather) + respond * dx, y = mix(startY, endY, gather) + respond * dy;
        cells.push({ i, x, y, r: mix(24, 12 + hash(i) * 5, gather), changed, old: [endX, endY] });
      }
      alpha(ctx, respond * .23, () => {
        for (const c of cells) if (c.changed) {
          ellipse(ctx, c.old[0], c.old[1], 7, 6, C.light, C.line, 1);
          ctx.setLineDash([2, 5]); path(ctx, [c.old, [c.x, c.y]], C.copper, 1, .65); ctx.setLineDash([]);
        }
      });
      for (const c of cells.sort((a, b) => a.y - b.y)) {
        const drift = (1 - gather) * 1.5;
        cellShape(ctx, c.x + Math.sin(t * TAU + c.i) * drift, c.y + Math.cos(t * TAU + c.i * .7) * drift, c.r, c.i * .63, C, c.changed && respond > hash(c.i) * .6, gather < .5);
      }
      alpha(ctx, gather, () => {
        label(ctx, '细胞状态', 87, 47, C.ink, 23);
        alpha(ctx, 1 - respond, () => { label(ctx, 'A', 222, 300, C.green, 20); label(ctx, 'B', 452, 370, C.green, 20); label(ctx, 'C', 678, 283, C.green, 20); });
      });
      alpha(ctx, treat * (1 - at(t, .83, .9)), () => {
        const dx = mix(798, 458, at(t, .52, .68)), dy = mix(66, 226, at(t, .52, .68));
        const halo = ctx.createRadialGradient(dx, dy, 2, dx, dy, 57); halo.addColorStop(0, '#bc7c4835'); halo.addColorStop(1, '#bc7c4800');
        ellipse(ctx, dx, dy, 57, 57, halo);
        ellipse(ctx, dx, dy, 13, 13, C.copper, '#f6e8ce', 3);
        for (let j = 0; j < 5; j++) ellipse(ctx, dx + Math.sin(j * 2.4) * 28, dy + Math.cos(j * 2.4) * 22, 3, 3, C.copper);
        label(ctx, '干预', 778, 44, C.copper, 23, 'center');
      });
      alpha(ctx, respond, () => {
        path(ctx, [[635, 215], [721, 307], [780, 307]], C.copper, 1.5, .6);
        label(ctx, '响应状态', 688, 336, C.copper, 22);
      });
      caption(ctx, t < .23 ? '从单个细胞到组织中的差异' : t < .52 ? '每个细胞对应一个状态' : t < .73 ? '给定细胞背景与干预条件' : '比较干预前后的状态分布', C);
      ctx.restore();
    }
  };

  function wave(u, channel, time) {
    return Math.sin(u * 69 + time * 10 + channel * .8) * .52 + Math.sin(u * 137 - time * 8 + channel) * .23 + Math.sin(u * 27 + channel * 1.1) * .31;
  }
  function head(ctx, x, y, s, t, C) {
    const g = ctx.createRadialGradient(x - s * .3, y - s * .2, s * .1, x, y, s);
    g.addColorStop(0, '#f2f1e4'); g.addColorStop(.8, '#dde7d7'); g.addColorStop(1, '#b7cdb7');
    ellipse(ctx, x, y, s * .81, s, g, C.green, 2);
    ellipse(ctx, x - s * .85, y + s * .08, s * .08, s * .2, C.paper, C.green, 1.5);
    ellipse(ctx, x + s * .85, y + s * .08, s * .08, s * .2, C.paper, C.green, 1.5);
    path(ctx, [[x - 14 * s / 120, y - s + 3], [x, y - s - 19 * s / 120], [x + 14 * s / 120, y - s + 3]], C.green, 2);
    // Broad smooth field instead of blinking electrodes.
    ctx.save(); ctx.beginPath(); ctx.ellipse(x, y, s * .79, s * .98, 0, 0, TAU); ctx.clip();
    for (let j = 0; j < 3; j++) {
      const xx = x + Math.sin(t * TAU + j * 2) * s * .37, yy = y + Math.cos(t * TAU * .7 + j * 2) * s * .43;
      const field = ctx.createRadialGradient(xx, yy, 0, xx, yy, s * .8);
      field.addColorStop(0, j === 1 ? '#bc7c483b' : '#34776a44'); field.addColorStop(1, '#34776a00');
      ellipse(ctx, xx, yy, s, s, field);
    }
    ctx.restore();
    for (let ring = 0; ring < 3; ring++) {
      const n = ring === 0 ? 1 : ring === 1 ? 6 : 10;
      for (let i = 0; i < n; i++) {
        const a = i / n * TAU - Math.PI / 2, r = ring * .34;
        const electrode = Math.max(1.4, s / 123 * 5);
        ellipse(ctx, x + Math.cos(a) * s * .78 * r, y + Math.sin(a) * s * r, electrode, electrode, C.paper, ring === 1 ? C.copper : C.green, Math.max(.75, s / 123 * 2));
      }
    }
  }
  function leaf(ctx, x, y, s, C, predicted, phase) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(-.25);
    ctx.beginPath(); ctx.moveTo(0, s * .78);
    ctx.bezierCurveTo(-s * .7, s * .42, -s * .75, -s * .4, s * .12, -s);
    ctx.bezierCurveTo(s * .65, -s * .32, s * .61, s * .38, 0, s * .78);
    const grad = ctx.createLinearGradient(-s, -s, s, s); grad.addColorStop(0, predicted ? '#d8dec0' : '#abc5a1'); grad.addColorStop(1, predicted ? '#779980' : '#477b61');
    ctx.fillStyle = grad; ctx.globalAlpha *= predicted ? .84 : 1; ctx.fill(); ctx.strokeStyle = predicted ? C.copper : C.green; ctx.lineWidth = 2; ctx.stroke();
    path(ctx, [[-s * .03, s], [s * .05, -s * .79]], predicted ? '#d7e2cc' : '#e3ecd9', 2);
    for (let i = 0; i < 5; i++) {
      const yy = s * (.48 - i * .27), w = s * (.22 + .09 * Math.sin(i));
      path(ctx, [[s * .02, yy], [-w, yy - s * .2]], '#dfe8d588', 1);
      path(ctx, [[s * .02, yy], [w, yy - s * .2]], '#dfe8d588', 1);
    }
    if (predicted) { ctx.setLineDash([4, 5]); path(ctx, [[-s * .02 + 3 * Math.sin(phase), s * .83], [s * .08, -s * .79]], C.copper, 1, .35); }
    ctx.restore();
  }
  window.AI4X_MOTION.eeg = {
    duration: 18, steps: ['电极记录', '时频编码', '视觉解码', '留出被试比较'],
    draw(ctx, t, kit) {
      const C = kit.C, features = at(t, .2, .37), decoding = at(t, .46, .6), compare = at(t, .75, .86);
      ctx.save(); ctx.globalAlpha *= fade(t);
      alpha(ctx, 1 - decoding, () => {
        const hx = mix(215, 154, features), hs = mix(123, 90, features);
        head(ctx, hx, 205, hs, t, C);
        label(ctx, '头皮电极', hx, 361, C.ink, 21, 'center');
        for (let channel = 0; channel < 5; channel++) {
          const y = 92 + channel * 53, points = [];
          const x0 = mix(380, 306, features), width = mix(430, 506, features);
          path(ctx, [[x0, y], [x0 + width, y]], C.line, 1, .5);
          for (let i = 0; i <= 190; i++) {
            const u = i / 190;
            points.push([x0 + u * width, y + wave(u, channel, t * 6) * 17 * (1 - features)]);
          }
          alpha(ctx, 1 - features, () => path(ctx, points, channel % 2 ? C.copper : C.green, 2));
          alpha(ctx, features, () => {
            const powerAlpha = ctx.globalAlpha;
            for (let k = 0; k < 58; k++) {
              const power = .12 + .88 * Math.exp(-1 * ((channel - (1.5 + .95 * Math.sin(k * .08 + t * 3))) / 1.1) ** 2) * (.58 + .42 * Math.cos(k * .19 + t * 6) ** 2);
              ctx.fillStyle = channel > 2 ? C.copper : C.green; ctx.globalAlpha = powerAlpha * power * .88;
              ctx.fillRect(x0 + k * width / 58, y - 21, width / 58 - 1.5, 39);
            }
          });
        }
        label(ctx, features < .5 ? '多通道时间信号' : '时间 × 频率', 558, 361, C.ink, 22, 'center');
      });
      alpha(ctx, decoding, () => {
        const y = 215, gap = mix(360, 320, compare);
        shadow(ctx, 450 - gap / 2, 324, 83, 10, C, .05);
        shadow(ctx, 450 + gap / 2, 324, 83, 10, C, .05);
        leaf(ctx, 450 - gap / 2, y, 98, C, false, t);
        leaf(ctx, 450 + gap / 2, y + Math.sin(t * TAU) * 3, 94, C, true, t);
        label(ctx, '视觉刺激', 450 - gap / 2, 67, C.green, 23, 'center');
        label(ctx, '解码结果', 450 + gap / 2, 67, C.copper, 23, 'center');
        const mid = [];
        for (let i = 0; i <= 80; i++) { const u = i / 80; mid.push([404 + u * 92, 207 + wave(u, 2, t * 4) * 13 * Math.sin(u * Math.PI)]); }
        path(ctx, mid, C.green, 2, .6);
        alpha(ctx, compare, () => {
          head(ctx, 450, 319, 31, t, C);
          path(ctx, [[450, 273], [450, 242]], C.green, 1.5, .45);
          label(ctx, '未见被试', 450, 370, C.muted, 20, 'center');
        });
      });
      caption(ctx, t < .25 ? '记录电信号随时间的变化' : t < .5 ? '提取频段、时间与空间关系' : t < .75 ? '用信号表征连接视觉内容' : '在未见被试上检验解码', C);
      ctx.restore();
    }
  };

  // Procedural short-axis cardiac image with anatomy, mottled tissue and blood pool.
  function scanRaw(ctx, x, y, scale, beat, C, opacity) {
    ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale); ctx.globalAlpha *= opacity == null ? 1 : opacity;
    const tissue = ctx.createRadialGradient(-20, -22, 10, 0, 0, 160);
    tissue.addColorStop(0, '#aaa99e'); tissue.addColorStop(.5, '#737a73'); tissue.addColorStop(.88, '#a5a99b'); tissue.addColorStop(1, '#454f49');
    ellipse(ctx, 0, 0, 155, 138, '#27342e', '#b7c4b4', 2);
    ellipse(ctx, 0, 0, 145, 127, tissue);
    ellipse(ctx, -63, -21, 47, 79, '#25372f', '#697b6b', 4, -.24);
    ellipse(ctx, 63, -21, 45, 79, '#293a31', '#738272', 3, .26);
    ellipse(ctx, -2, 79, 26, 25, '#c7c8b5', '#657361', 5);
    ellipse(ctx, -2, 80, 11, 14, '#596954', '#c7c8b5', 3);
    // Vascular and tissue features make the scan read as a volume, not an icon.
    ellipse(ctx, 10, -72, 10, 13, '#b9bfac', '#737e6b', 3);
    ellipse(ctx, -13, -42, 13, 10, '#999f8d');
    const rr = 1 - beat * .19;
    ellipse(ctx, 13, 9, 48, 57, '#4e6250', '#8e9b81', 2, -.28);
    ellipse(ctx, 14, 6, 34 * rr, 42 * rr, '#dadac1', '#929c80', 11, -.24);
    ellipse(ctx, -22, -3, 20, 36, '#c5c9b0', '#788b74', 6, .32);
    ellipse(ctx, 6, 9, 5, 9, '#7c8a70', null, 0, -.5);
    ellipse(ctx, 22, 17, 4, 7, '#7c8a70', null, 0, .4);
    ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 142, 123, 0, 0, TAU); ctx.clip();
    const grainAlpha = ctx.globalAlpha;
    for (let i = 0; i < 1550; i++) {
      const px = hash(i * 3) * 290 - 145, py = hash(i * 3 + 1) * 254 - 127;
      ctx.globalAlpha = grainAlpha * (.025 + hash(i * 3 + 2) * .1);
      ctx.fillStyle = i % 2 ? '#eef0d7' : '#172820'; ctx.fillRect(px, py, 1.4 + hash(i + 1000) * 2.8, 1.1 + hash(i + 2000) * 2.4);
    }
    ctx.restore(); ctx.restore();
  }
  // The same acquisition texture is reused by every slice. Small quantized
  // radius steps are subpixel on screen; the overlay boundaries stay continuous.
  const scanFrames = new Map();
  function scan(ctx, x, y, scale, beat, C, opacity) {
    if (typeof OffscreenCanvas === 'undefined') return scanRaw(ctx, x, y, scale, beat, C, opacity);
    const frame = Math.round(clamp(beat) * 32);
    let bitmap = scanFrames.get(frame);
    if (!bitmap) {
      bitmap = new OffscreenCanvas(480, 432);
      const surface = bitmap.getContext('2d');
      surface.translate(240, 216); surface.scale(1.5, 1.5);
      scanRaw(surface, 0, 0, 1, frame / 32, C, 1);
      scanFrames.set(frame, bitmap);
    }
    ctx.save(); ctx.globalAlpha *= opacity == null ? 1 : opacity;
    ctx.drawImage(bitmap, x - 160 * scale, y - 144 * scale, 320 * scale, 288 * scale); ctx.restore();
  }
  function heartBoundary(ctx, x, y, sx, sy, progress, C, fillAlpha, beat) {
    const rr = 1 - (beat || 0) * .19, points = [];
    for (let i = 0; i <= 120 * progress; i++) {
      const a = i / 120 * TAU - Math.PI / 2;
      points.push([x + Math.cos(a) * 35 * sx * rr + Math.sin(a) * 7 * sx, y + Math.sin(a) * 43 * sy * rr]);
    }
    if (progress >= .995 && fillAlpha) {
      alpha(ctx, fillAlpha, () => { ctx.beginPath(); points.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fillStyle = C.copper; ctx.fill(); });
    }
    path(ctx, points, C.copper, 2.5);
  }
  window.AI4X_MOTION.image = {
    duration: 18, steps: ['读取影像切片', '描绘结构边界', '重建三维体积', '测量周期变化'],
    draw(ctx, t, kit) {
      const C = kit.C, trace = at(t, .23, .44), volume = at(t, .49, .615), functionView = at(t, .73, .84);
      const beat = .5 + .5 * Math.sin(t * TAU * 5), x = mix(450, 330, volume), y = mix(211, 197, volume);
      ctx.save(); ctx.globalAlpha *= fade(t);
      // A single enlarged source slice tilts and separates into a depth stack.
      alpha(ctx, 1 - volume, () => {
        shadow(ctx, x, 365, 161, 10, C, .06);
        scan(ctx, x, y, 1.12, beat * functionView, C);
        if (trace > 0) heartBoundary(ctx, x + 15.7, y + 6.7, 1.12, 1.12, trace, C, .22 * trace, beat * functionView);
        alpha(ctx, 1 - trace, () => {
          const scanY = 72 + ((t * 3.1) % 1) * 275;
          path(ctx, [[278, scanY], [622, scanY]], '#c9d9bd', 1.5, .26);
        });
        alpha(ctx, trace, () => {
          path(ctx, [[x + 49, y + 8], [674, 133], [779, 133]], C.copper, 1.5, .7);
          label(ctx, '心腔轮廓', 673, 108, C.copper, 22);
        });
      });
      alpha(ctx, volume, () => {
        const separation = mix(0, 16, volume), n = 10;
        for (let j = n - 1; j >= 0; j--) {
          const z = j - n / 2, xx = x + z * separation * .75, yy = y + z * separation;
          const ss = .92 - Math.abs(z) * .035;
          ctx.save(); ctx.translate(xx, yy); ctx.transform(1, -.14, .36, .43, 0, 0);
          alpha(ctx, .35 + (j === 0 ? .5 : 0), () => scan(ctx, 0, 0, ss, beat * functionView, C));
          heartBoundary(ctx, 14 * ss, 6 * ss, ss * (1 - Math.abs(z) * .035), ss, 1, C, .18, beat * functionView);
          ctx.restore();
        }
        label(ctx, '切片 → 体积', 295, 57, C.ink, 23, 'center');
        alpha(ctx, functionView, () => {
          const cx = 661, cy = 157;
          label(ctx, '心动周期', cx, 57, C.copper, 23, 'center');
          // A volumetric wire surface contracts with the sampled frame.
          for (let j = 0; j < 15; j++) {
            const v = j / 14, radius = Math.sin(v * Math.PI) ** .6 * (48 - beat * 10);
            ellipse(ctx, cx + Math.sin(v * Math.PI) * 5, cy - 54 + v * 110, radius, radius * .28, j === 7 ? '#bc7c481a' : null, C.copper, 1.3);
          }
          const graph = [], gx = 539, gy = 334, gw = 251;
          path(ctx, [[gx, 259], [gx, gy], [gx + gw, gy]], C.line, 1.5);
          for (let i = 0; i <= 150; i++) {
            const u = i / 150, value = .48 + .39 * Math.cos(u * TAU);
            graph.push([gx + u * gw, gy - 70 * value]);
          }
          path(ctx, graph, C.copper, 2.5);
          const phase = (t * 5 + .75) % 1, dotX = gx + phase * gw, dotY = gy - 70 * (.48 + .39 * Math.cos(phase * TAU));
          path(ctx, [[dotX, gy], [dotX, dotY]], C.copper, 1, .45); ellipse(ctx, dotX, dotY, 5, 5, C.copper, C.paper, 2);
          label(ctx, '体积变化', 665, 365, C.muted, 20, 'center');
        });
      });
      caption(ctx, t < .25 ? '短轴切片中的组织与心腔' : t < .5 ? '沿图像边缘提取结构' : t < .75 ? '把连续切片连接为空间结构' : '把结构与时间联系起来', C);
      ctx.restore();
    }
  };
})();
