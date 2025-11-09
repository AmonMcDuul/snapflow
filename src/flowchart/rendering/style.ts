export function injectStyle(svg?: SVGSVGElement) {
  if (!document.getElementById('sf-style-global')) {
    const domStyle = document.createElement('style');
    domStyle.id = 'sf-style-global';
    domStyle.textContent = `
      .sf-flow-container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
        box-sizing: border-box;
        min-height: 320px;
        width: 100%;
        overflow: hidden;
      }

      .sf-flow-title {
        text-align: center;
        font-size: 1.15rem;
        font-weight: 600;
        margin: 0;
        padding: 0.35rem 0;
        font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
        color: #2b2d42;
        border-bottom: 1px solid #e9eef2;
        user-select: none;
      }

      .sf-flow-subtitle {
        text-align: center;
        font-size: 0.9rem;
        color: #6b7280;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
        user-select: none;
      }

      .sf-svg-wrapper {
        width: 100%;
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: auto;
        box-sizing: border-box;
        padding: 0.5rem;
        background: transparent;
      }

      .sf-svg-wrapper svg {
        display: block;
        width: 100%;
        height: 100%;
        max-width: 2000px;
        max-height: 2000px;
      }

      .sf-svg-centered {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
    document.head.appendChild(domStyle);
  }

  if (svg) {
    const svgStyle = document.createElement('style');
    svgStyle.textContent = `
      .sf-node {
        transition: filter .18s, stroke .12s, opacity .12s;
        cursor: pointer;
      }
      .sf-node:hover {
        filter: brightness(1.08);
        stroke-width: 2px;
      }
      .sf-label {
        user-select: none;
        font-family: Inter, Arial, sans-serif;
        font-size: 13px;
        fill: #111;
      }
      .sf-edge {
        fill: none;
        stroke: #5a5a5a;
        stroke-width: 1.2;
        marker-end: url(#sf-arrow);
      }
      .sf-edge-label {
        font-size: 11px;
        fill: #444;
        text-anchor: middle;
      }
    `;
    svg.appendChild(svgStyle);
  }
}
