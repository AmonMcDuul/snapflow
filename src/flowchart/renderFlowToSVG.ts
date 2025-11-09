import { create, createDefs } from './rendering/svgUtils';
import * as S from './rendering/shapes';
import { computeLayout } from './layout/dagreLayout';
import { enableZoomPan } from './interactions/zoomPan';
import { injectStyle } from './rendering/style';
import type { FlowData } from '../core/types';

export function renderFlowToSVG(
  flow: FlowData,
  container: HTMLElement,
  options?: { direction?: 'TB'|'LR'|'BT'|'RL', fitToView?: boolean }
) {
  const dir = options?.direction ?? 'TB';
  const g = computeLayout(flow, dir);

  injectStyle();     

  container.classList.add('sf-flow-container');

  // clear old content
  container.innerHTML = '';

  // Title 
  if (flow.name) {
    const titleEl = document.createElement('div');
    titleEl.classList.add('sf-flow-title');
    titleEl.textContent = flow.name;
    container.appendChild(titleEl);
  }

  // // subtitle
  // if (flow.id) {
  //   const sub = document.createElement('div');
  //   sub.classList.add('sf-flow-subtitle');
  //   sub.textContent = `ID: ${flow.id}`;
  //   container.appendChild(sub);
  // }

  // SVG wrapper that is scrollable and sized by CSS
  const svgWrapper = document.createElement('div');
  svgWrapper.classList.add('sf-svg-wrapper');
  container.appendChild(svgWrapper);

  // Create SVG element 
  const svg = create('svg') as unknown as SVGSVGElement;
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');

  createDefs(svg);
  injectStyle(svg);

  svgWrapper.appendChild(svg);

  const rootG = create('g');
  svg.appendChild(rootG);

  // Draw nodes
  g.nodes().forEach((id: any) => {
    const n = g.node(id) as any;
    const { x, y, width, height, name, type } = n;
    let shapeEls: SVGElement[] = [];

    switch (type) {
      case 'start':
        shapeEls.push(S.ellipse(x, y, width / 2, height / 2, 'url(#sf-grad-start)', 'rgba(43,122,120,0.9)'));
        break;
      case 'end':
        shapeEls.push(S.ellipse(x, y, width / 2, height / 2, '#e6f7f7', '#2b7a78'));
        break;
      case 'decision':
        shapeEls.push(S.diamond(x, y, width, height, '#f4a261', '#b3541e'));
        break;
      case 'io':
        shapeEls.push(S.parallelogram(x - width / 2, y - height / 2, width, height, '#e9d9f2', '#6b4e71'));
        break;
      case 'subflow':
        shapeEls.push(...S.doubleRect(x - width / 2, y - height / 2, width, height, '#edf2fb', '#5c677d'));
        break;
      default:
        shapeEls.push(S.roundedRect(x - width / 2, y - height / 2, width, height, '#a2d2ff', '#3867d6', 8));
        break;
    }

    shapeEls.forEach(s => { s.classList.add('sf-node'); rootG.appendChild(s); });

    const t = create('text');
    t.classList.add('sf-label');
    t.setAttribute('x', String(x));
    t.setAttribute('y', String(y));
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('dominant-baseline', 'middle');
    t.textContent = String(name ?? '');
    rootG.appendChild(t);
  });

  // Draw edges
  g.edges().forEach((e: any) => {
    const ed = g.edge(e);
    const path = create('path');
    const d = ed.points.map((p: any, i: number) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');
    path.setAttribute('d', d);
    path.classList.add('sf-edge');
    rootG.appendChild(path);

    if (ed.label) {
      const mid = ed.points[Math.floor(ed.points.length / 2)];
      const lab = create('text');
      lab.classList.add('sf-edge-label');
      lab.setAttribute('x', String(mid.x));
      lab.setAttribute('y', String(mid.y - 6));
      lab.setAttribute('text-anchor', 'middle');
      lab.textContent = ed.label;
      rootG.appendChild(lab);
    }
  });

  // compute viewBox from nodes
  const nodesArr = g.nodes().map((id: any) => g.node(id));
  const minX = Math.min(...nodesArr.map((n: any) => n.x - n.width / 2));
  const maxX = Math.max(...nodesArr.map((n: any) => n.x + n.width / 2));
  const minY = Math.min(...nodesArr.map((n: any) => n.y - n.height / 2));
  const maxY = Math.max(...nodesArr.map((n: any) => n.y + n.height / 2));
  const padding = 50;
  const vb = [
    Math.floor(minX - padding),
    Math.floor(minY - padding),
    Math.ceil((maxX - minX) + padding * 2),
    Math.ceil((maxY - minY) + padding * 2)
  ];
  svg.setAttribute('viewBox', vb.join(' '));

  enableZoomPan(svg, { initialViewBox: vb });
  injectStyle(svg);

  return { svg, viewBox: vb };
}
