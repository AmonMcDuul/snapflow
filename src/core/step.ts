export type NodeType = 'start' | 'end' | 'process' | 'decision' | 'io' | 'subflow';

export class Step {
  readonly id: string;
  name: string;
  type: NodeType;
  meta: Record<string, any> = {};
  nextEdges: Array<{ to: string; label?: string }> = [];

  constructor(id: string, name: string, type: NodeType = 'process') {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  next(step: Step, label?: string) {
    if (!this.nextEdges.find(e => e.to === step.id && e.label === label)) {
      this.nextEdges.push({ to: step.id, label });
    }
    return step;
  }

  setMeta(key: string, value: any) {
    this.meta[key] = value;
    return this;
  }
}
