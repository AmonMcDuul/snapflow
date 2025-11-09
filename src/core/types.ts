export type NodeType = 'start'|'end'|'process'|'decision'|'io'|'subflow';

export interface FlowNode {
  id: string;
  name: string;
  type: NodeType;
  width?: number;
  height?: number;
}

export interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

export interface FlowData {
  id?: string;
  name?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}
