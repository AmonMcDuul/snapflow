<img width="430" height="921" alt="image" src="https://github.com/user-attachments/assets/134ce657-d820-40be-888a-9d61617b2425" />

# 🌀 FlowRender — Elegant SVG Flowchart Renderer

**FlowRender** is a lightweight TypeScript library for rendering clean, responsive, and zoomable SVG flowcharts from structured JSON data.

It automatically handles layout (via [dagre](https://github.com/dagrejs/dagre)), shapes, edges, and interaction, making it ideal for visualizing processes, diagrams, or workflows — all in pure SVG.

---

## ✨ Features

- 🧩 **Simple data model** — define nodes and edges in JSON  
- 🎨 **Beautiful SVG output** — crisp, styled, and scalable  
- 🔍 **Zoom & Pan** support (mouse wheel and drag)  
- 🧭 **Automatic layout** (Top–Bottom, Left–Right, etc.)  
- 🪶 **Lightweight & framework-agnostic** — no dependencies beyond Dagre  
- 🧱 **Modular architecture** — extend shapes, styles, or layouts easily  

---

## 🚀 Quick Start

Install via npm (when published) or use directly from your local build:

# when published to npm
npm install FlowRender

# or locally during development (example)
# build your package and import from dist/

Then import and render a flowchart:

import { renderFlowToSVG } from "FlowRender"; // or from your built dist

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

This will automatically create a flowchart with zoom and pan support.
🧠 Data Model

A flow consists of nodes and edges, wrapped in a FlowData object.

export interface FlowData {
  id?: string;
  name?: string;
  nodes: { id: string; name: string; type?: string; width?: number; height?: number }[];
  edges: { from: string; to: string; label?: string }[];
}

Supported node type values:
Type	Description	Shape Example
start	Start node (ellipse)	⭕
end	End node (ellipse)	⭕
process	Standard step (rounded rect)	▭
decision	Decision (diamond)	◇
io	Input/Output (parallelogram)	⧅
subflow	Subprocess (double rect)	⧈
⚙️ Options

renderFlowToSVG(flowData, container, {
  direction: "TB", // Layout direction: TB | BT | LR | RL
  fitToView: true, // Auto-fit (optional; currently the library computes viewBox automatically)
});

Layout direction meanings:

    TB: Top → Bottom

    BT: Bottom → Top

    LR: Left → Right

    RL: Right → Left

🖱️ Interactions

The chart supports:

    Zooming: with the mouse wheel (centered on cursor)

    Panning: by dragging the background (mousedown + move)

Interactions are implemented in interactions/zoomPan.ts. The module exposes an API to get/set/reset the viewBox so you can programmatically control zoom/pan if needed.
🎨 Styling

All styles (both DOM and SVG) are injected automatically by rendering/style.ts (function injectStyle). Styles are namespaced with the sf- prefix, so they won’t interfere with your app.
Class	Purpose
.sf-flow-container	Main container for the chart
.sf-flow-title	Title above the chart
.sf-svg-wrapper	Scrollable SVG container
.sf-node	Generic node shape
.sf-edge	Connector line
.sf-label	Node text label
.sf-edge-label	Edge text label

You can override these CSS rules in your app's stylesheet, or modify rendering/style.ts for a custom default.
🧩 Architecture Overview

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
🧱 Extending the Library

Add new shapes in rendering/shapes.ts and register a case in renderFlowToSVG. Example:

// In shapes.ts
export function hexagon(x: number, y: number, radius: number, fill: string, stroke: string) {
  const p = create("polygon");
  const points = [
    `${x + radius},${y}`,
    `${x + radius/2},${y + radius * 0.866}`,
    `${x - radius/2},${y + radius * 0.866}`,
    `${x - radius},${y}`,
    `${x - radius/2},${y - radius * 0.866}`,
    `${x + radius/2},${y - radius * 0.866}`
  ];
  p.setAttribute("points", points.join(" "));
  p.setAttribute("fill", fill);
  p.setAttribute("stroke", stroke);
  return p;
}

Then in renderFlowToSVG:

case "hex": shapeEls.push(S.hexagon(x, y, 40, "#fff1c9", "#d4a373")); break;

🧰 Customization

Override CSS to change appearance globally:

.sf-node:hover {
  filter: brightness(1.1);
  stroke: #333;
}

.sf-edge {
  stroke: #0077b6;
  stroke-width: 2px;
}

.sf-label {
  font-size: 14px;
  font-weight: 500;
  fill: #222;
}

.sf-flow-title {
  color: #0b7285;
  font-family: "Poppins", sans-serif;
}

Programmatic tweaks:

    Use the enableZoomPan return API to getViewBox(), setViewBox(vb), or resetZoom() (if implemented).

    Modify gradients or markers by editing svgUtils.createDefs(svg) before rendering content.

📦 Build & Development

Use tsup (or your bundler of choice) to build the library:

npm run build

Example package.json scripts:

{
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts --sourcemap --clean",
    "dev": "vite" // or any simple static server for examples
  }
}

The build output will include both ESM (.mjs) and CJS bundles under dist/.
🧪 Example

Run the example page locally:

# serve static files or run your dev server
npm run dev

Minimal example HTML (/examples/basic/index.html):

<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>FlowRender Demo</title>
  </head>
  <body>
    <div id="flowchart" class="sf-flow-container" style="height:600px;"></div>
    <script type="module" src="./example.js"></script>
  </body>
</html>

example.js should import renderFlowToSVG from your built bundle or source and call it with the example flowData.
🧪 TypeScript / IDE tips

If you use TypeScript (recommended), import types for better IntelliSense:

import type { FlowData, FlowNode } from "FlowRender"; // or from './src/core/types' in dev

VS Code will then show parameters and autocomplete when calling renderFlowToSVG.
📜 License

MIT © 2025 FlamSoft
