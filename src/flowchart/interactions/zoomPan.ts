export function enableZoomPan(svg: SVGSVGElement, opts?: { initialViewBox?: number[] }) {
  let viewBox = opts?.initialViewBox ?? (svg.getAttribute('viewBox')?.split(' ').map(Number) ?? [0,0,100,100]);
  let isDragging = false;
  let startX = 0, startY = 0;
  let baseViewBox = [...viewBox];
  let currentZoom = 1;

  const MIN_ZOOM = 0.4;   
  const MAX_ZOOM = 2.5;  
  const ZOOM_STEP = 0.1;  
  const PAN_SENSITIVITY = 1.2;

  const setVB = () => svg.setAttribute('viewBox', viewBox.join(' '));

  svg.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    svg.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => {
    isDragging = false;
    svg.style.cursor = 'grab';
  });

  svg.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = (startX - e.clientX) * (viewBox[2] / svg.clientWidth) * PAN_SENSITIVITY;
    const dy = (startY - e.clientY) * (viewBox[3] / svg.clientHeight) * PAN_SENSITIVITY;
    viewBox[0] += dx;
    viewBox[1] += dy;
    startX = e.clientX;
    startY = e.clientY;
    setVB();
  });

  svg.addEventListener('wheel', (ev) => {
    ev.preventDefault();

    const direction = ev.deltaY > 0 ? 1 : -1;
    const factor = 1 + ZOOM_STEP * direction * -1;

    const newZoom = Math.min(Math.max(currentZoom * factor, MIN_ZOOM), MAX_ZOOM);
    const zoomChange = newZoom / currentZoom;
    currentZoom = newZoom;

    const rect = svg.getBoundingClientRect();
    const mx = (ev.clientX - rect.left) / rect.width;
    const my = (ev.clientY - rect.top) / rect.height;

    const svgMouseX = viewBox[0] + mx * viewBox[2];
    const svgMouseY = viewBox[1] + my * viewBox[3];

    viewBox[2] /= zoomChange;
    viewBox[3] /= zoomChange;

    viewBox[0] = svgMouseX - mx * viewBox[2];
    viewBox[1] = svgMouseY - my * viewBox[3];

    setVB();
  }, { passive: false });

  return {
    getViewBox: () => viewBox.slice(),
    setViewBox: (vb: number[]) => { viewBox = vb.slice(); setVB(); },
    resetZoom: () => {
      viewBox = [...baseViewBox];
      currentZoom = 1;
      setVB();
    }
  };
}
