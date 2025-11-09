
# FlowRender — Elegant SVG Flowchart Renderer

FlowRender is a lightweight, TypeScript library for rendering beautiful **flowcharts and process diagrams** directly into SVG — fully interactive with **zoom, pan, hover states, and labeled connections**.

It’s designed to provide the clean look of tools like Lucidchart or Miro, but with a lightweight footprint and easy integration in your own web apps.

---
<img width="430" height="921" alt="image" src="https://github.com/user-attachments/assets/134ce657-d820-40be-888a-9d61617b2425" />

## Features

- Supports all common flowchart node types:
  - `start` · `end` · `process` · `decision` · `io` · `subflow`
- Direction control (`TB`, `BT`, `LR`, `RL`)
- Beautiful, Lucidchart-inspired SVG rendering
- Hover highlights & gradients
- Zoom and pan interactions built-in
- Scrollable and responsive container
- Simple, zero-dependency API

---

## Installation
```bash
npm install flowrender
```

## Quick Start

Import and render a flowchart:

import { renderFlowToSVG } from "FlowRender";

```ts
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

renderFlowToSVG(flowData, container, { direction: "TB" });
```

This will automatically create a flowchart with zoom and pan support.

## Data Model

A flow consists of nodes and edges, wrapped in a FlowData object.
```ts
export interface FlowData {
  id?: string;
  name?: string;
  nodes: { id: string; name: string; type?: string; width?: number; height?: number }[];
  edges: { from: string; to: string; label?: string }[];
}
```

Supported node type values:

| Type     | Description            | Shape Example     |
|----------|------------------------|-------------------|
| start    | Start node             | Ellipse           |
| end      | End node               | Ellipse           |
| process  | Standard step          | Rounded Rect      |
| decision | Decision               | Diamond           |
| io       | Input/Output           | Parallelogram     |
| subflow  | Subprocess             | Double Rect       |

## Options

```ts
renderFlowToSVG(flowData, container, {
  direction: "TB", // Layout direction: TB | BT | LR | RL
  fitToView: true, // Auto-fit (optional; currently the library computes viewBox automatically)
});
```
Layout direction meanings:
    TB: Top → Bottom
    BT: Bottom → Top
    LR: Left → Right
    RL: Right → Left

## Interactions

The chart supports:
    Zooming: with the mouse wheel (centered on cursor)
    Panning: by dragging the background (mousedown + move)

## Styling

All styles (both DOM and SVG) are injected automatically. Styles are namespaced with the sf- prefix, so they won’t interfere with your app.
Class	Purpose
.sf-flow-container	Main container for the chart
.sf-flow-title	Title above the chart
.sf-svg-wrapper	Scrollable SVG container
.sf-node	Generic node shape
.sf-edge	Connector line
.sf-label	Node text label
.sf-edge-label	Edge text label

You can override these CSS rules in your app's stylesheet.

## Architecture Overview

src/
├── core/
│   └── types.ts          # FlowData and related interfaces (single source of truth)
├── layout/
│   └── dagreLayout.ts    # Computes positions for nodes and edges (dagre)
├── rendering/
│   ├── shapes.ts         # SVG shape creation (rect, diamond, ellipse, parallelogram, etc.)
│   ├── svgUtils.ts       # SVG helper functions (create, defs, gradients, markers)
│   └── style.ts          # Unified CSS injection for DOM + SVG
├── interactions/
│   └── zoomPan.ts        # Handles zooming and panning (wheel + drag)
└── renderFlowToSVG.ts    # Main high-level rendering entry point (glues everything)

Each layer is independent and can be swapped, tested, or extended.

## Credits

Built by AmonMcDuul

## Licence
MIT License — free to use in commercial or personal projects.