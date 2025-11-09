import dagre from 'dagre';
import type { FlowData } from '../../core/types';

export function computeLayout(flow: FlowData, direction: 'TB'|'LR'|'BT'|'RL' = 'TB') {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: direction, marginx: 40, marginy: 40 });
  g.setDefaultEdgeLabel(() => ({}));

  for (const n of flow.nodes) {
    g.setNode(n.id, {
      width: n.width ?? 140,
      height: n.height ?? 56,
      name: n.name,
      type: n.type
    });
  }

  for (const e of flow.edges) {
    g.setEdge(e.from, e.to, { label: e.label ?? '' });
  }

  dagre.layout(g);
  return g;
}
