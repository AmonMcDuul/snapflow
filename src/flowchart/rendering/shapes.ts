import { create } from './svgUtils';

// all functions return SVGElement (or array for multi-shape)
export function roundedRect(x:number,y:number,w:number,h:number, fill:string, stroke:string, rx=8) {
  const r = create('rect');
  r.setAttribute('x',String(x)); r.setAttribute('y',String(y));
  r.setAttribute('width',String(w)); r.setAttribute('height',String(h));
  r.setAttribute('rx',String(rx));
  r.setAttribute('fill', fill); r.setAttribute('stroke', stroke); r.setAttribute('stroke-width','1.4');
  r.setAttribute('filter','url(#sf-shadow)');
  return r;
}

export function ellipse(cx:number,cy:number,rx:number,ry:number, fill:string, stroke:string) {
  const e = create('ellipse');
  e.setAttribute('cx',String(cx)); e.setAttribute('cy',String(cy));
  e.setAttribute('rx',String(rx)); e.setAttribute('ry',String(ry));
  e.setAttribute('fill', fill); e.setAttribute('stroke', stroke); e.setAttribute('stroke-width','1.4');
  e.setAttribute('filter','url(#sf-shadow)');
  return e;
}

export function diamond(cx:number,cy:number,w:number,h:number, fill:string, stroke:string) {
  const pts = [
    `${cx},${cy - h/2}`,
    `${cx + w/2},${cy}`,
    `${cx},${cy + h/2}`,
    `${cx - w/2},${cy}`
  ].join(' ');
  const p = create('polygon');
  p.setAttribute('points', pts); p.setAttribute('fill', fill); p.setAttribute('stroke', stroke); p.setAttribute('stroke-width','1.4');
  p.setAttribute('filter','url(#sf-shadow)');
  return p;
}

export function parallelogram(x:number,y:number,w:number,h:number, fill:string, stroke:string, skew=20) {
  const pts = [
    `${x+skew},${y}`,
    `${x+w},${y}`,
    `${x+w-skew},${y+h}`,
    `${x},${y+h}`
  ].join(' ');
  const p = create('polygon');
  p.setAttribute('points', pts); p.setAttribute('fill', fill); p.setAttribute('stroke', stroke); p.setAttribute('stroke-width','1.4');
  p.setAttribute('filter','url(#sf-shadow)');
  return p;
}

export function doubleRect(x:number,y:number,w:number,h:number, fill:string, stroke:string) {
  const outer = roundedRect(x,y,w,h, fill, stroke, 6);
  const inner = roundedRect(x+4,y+4,w-8,h-8, 'none', stroke, 6);
  return [outer, inner];
}
