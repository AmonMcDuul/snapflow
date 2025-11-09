export const SVG_NS = 'http://www.w3.org/2000/svg';

export const create = (tag: string) => document.createElementNS(SVG_NS, tag);

export function createDefs(svg: SVGElement) {
  const defs = create('defs');

  // shadow filter
  const filter = create('filter');
  filter.setAttribute('id', 'sf-shadow');
  filter.setAttribute('x', '-20%'); filter.setAttribute('y', '-20%');
  filter.setAttribute('width', '140%'); filter.setAttribute('height', '140%');
  const fe = create('feDropShadow');
  fe.setAttribute('dx','1'); fe.setAttribute('dy','1'); fe.setAttribute('stdDeviation','1.5');
  fe.setAttribute('flood-color','#000'); fe.setAttribute('flood-opacity','0.12');
  filter.appendChild(fe);
  defs.appendChild(filter);

  // gradient for start/end
  const grad = create('linearGradient');
  grad.setAttribute('id','sf-grad-start'); grad.setAttribute('x1','0%'); grad.setAttribute('y1','0%');
  grad.setAttribute('x2','0%'); grad.setAttribute('y2','100%');
  const s1 = create('stop'); s1.setAttribute('offset','0%'); s1.setAttribute('stop-color','#64dfdf');
  const s2 = create('stop'); s2.setAttribute('offset','100%'); s2.setAttribute('stop-color','#48bfe3');
  grad.appendChild(s1); grad.appendChild(s2);
  defs.appendChild(grad);

  // arrow marker
  const marker = create('marker');
  marker.setAttribute('id','sf-arrow'); marker.setAttribute('viewBox','0 0 10 10');
  marker.setAttribute('refX','10'); marker.setAttribute('refY','5'); marker.setAttribute('markerUnits','strokeWidth');
  marker.setAttribute('markerWidth','8'); marker.setAttribute('markerHeight','6'); marker.setAttribute('orient','auto');
  const arrowPath = create('path');
  arrowPath.setAttribute('d','M 0 0 L 10 5 L 0 10 z'); arrowPath.setAttribute('fill','#555');
  marker.appendChild(arrowPath);
  defs.appendChild(marker);

  svg.appendChild(defs);
}
