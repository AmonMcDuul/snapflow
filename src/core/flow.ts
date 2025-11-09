import { Step } from './step';
import type { FlowData, FlowNode, FlowEdge } from './types';

export type NodeDef = FlowNode;
export type EdgeDef = FlowEdge;
export type FlowDef = FlowData;

export class Flow {
  readonly id: string;
  readonly name: string;
  private steps: Map<string, Step> = new Map();

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addStep(id: string, name: string, type: Step['type'] = 'process') {
    if (this.steps.has(id)) {
      const existing = this.steps.get(id)!;
      existing.name = name;
      existing.type = type;
      return existing;
    }
    const s = new Step(id, name, type);
    this.steps.set(id, s);
    return s;
  }

  connect(fromId: string, toId: string, label?: string) {
    const from = this.steps.get(fromId);
    const to = this.steps.get(toId);
    if (!from || !to) throw new Error('Step not found: ' + (!from ? fromId : toId));
    from.next(to, label);
    return this;
  }

  toDefinition(): FlowDef {
    const nodes: NodeDef[] = [];
    const edges: EdgeDef[] = [];

    for (const [id, step] of this.steps) {
      nodes.push({ id, name: step.name, type: step.type, width: undefined, height: undefined });
      for (const e of step.nextEdges) edges.push({ from: id, to: e.to, label: e.label });
    }

    return { id: this.id, name: this.name, nodes, edges };
  }
}
