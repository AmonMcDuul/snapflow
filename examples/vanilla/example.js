import { renderFlowToSVG } from "../../dist/index.mjs";

const container = document.getElementById("flowchart");

const flowData = {
  id: "demo-flow",
  name: "User Input Process",
  nodes: [
    { id: "start", name: "Start", type: "start" },
    { id: "input", name: "Get User Input", type: "io" },
    { id: "process1", name: "Process Data", type: "process" },
    { id: "decision", name: "Valid?", type: "decision" },
    { id: "subflow", name: "Sub Process", type: "subflow" },
    { id: "process2", name: "Store Result", type: "process" },
    { id: "end", name: "End", type: "end" },
  ],
  edges: [
    { from: "start", to: "input" },
    { from: "input", to: "process1" },
    { from: "process1", to: "decision" },
    { from: "decision", to: "subflow", label: "Yes" },
    { from: "decision", to: "input", label: "No" },
    { from: "subflow", to: "process2" },
    { from: "process2", to: "end" },
  ],
};

renderFlowToSVG(flowData, container, { direction: 'TB' });
//richtingen: TB, BT, LR, RL