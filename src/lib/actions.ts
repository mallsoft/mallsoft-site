export function draggable(node, { target }) {
  const old_transform = getComputedStyle(node).transform;
  let isDown: boolean = false;
  let startX: number;
  let startY: number;
  let dx: number;
  let dy: number;
  let tx: number = 0;
  let ty: number = 0;

  function handleDown({ x, y }) {
    isDown = true;
    startX = x;
    startY = y;
  }
  function handleMove({ x, y }) {
    // node.querySelector('h1').innerText = `${x} ${y}   ==> ${x - startX} ${y - startY}` || '---';

    if (isDown) {
      dx = x - startX;
      dy = y - startY;

      node.style.transform = `translate(${tx + dx}px,${ty + dy}px)`;
    }
  }
  function handleUp() {
    tx += dx;
    ty += dy;
    isDown = false;
  }

  target.addEventListener('mousedown', handleDown);
  window.addEventListener('mouseup', handleUp);
  window.addEventListener('mousemove', handleMove);
  return {
    destroy() {
      target.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('mousemove', handleMove);
    }
  };
}
