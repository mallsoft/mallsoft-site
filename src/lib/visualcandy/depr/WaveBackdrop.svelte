<script>
  import { onMount } from 'svelte';

  const Xmax = 400;
  const Ymax = 100;
  let raf;
  let lines = [];

  class Line {
    constructor(vertexCount) {
      this.points = [];

      const edgeLength = Xmax / (vertexCount - 1);

      for (let i = 0; i <= vertexCount; i++) {
        const x = i * edgeLength;
        this.points.push({ h: { x, y: 0 }, x, y: 0, vx: 0, vy: 0 });
      }
    }
    toPath() {
      let d = '';
      for (let i = 0; i < this.points.length - 1; i++) {
        const { x, y } = this.points[i];
        d += i === 0 ? `M${x} ${y} ` : `L${x} ${y} `;
      }
      return d;
    }
    update(time, idx) {
      this.points.forEach((p, i) => {
        const dy = Math.abs(p.y - p.h.y);
        const dx = Math.abs(p.x - p.h.x);

        if (i !== 0 && i !== this.points.length - 1) {
          p.x += p.vx;
        }
        p.y += p.vy;

        p.vy *= 0.98;
        p.vx *= 0.98;

        if (dx > 1) {
          p.x += ((p.x - p.h.x) / dx) * -0.1;
        }

        if (dy > 1) {
          p.y += ((p.y - p.h.y) / dy) * -0.1;
        }

        if (Math.random() > 0.95) {
          p.vy = (Math.random() * 2 - 1) * 0.1;
          p.vx = (Math.random() * 2 - 1) * 0.1;
        }
      });
    }
  }

  function loop(t) {
    raf = requestAnimationFrame(loop);
    lines.forEach((l, i) => l.update(t, i));
    lines = lines; // re assign
  }

  onMount(() => {
    for (let i = 0; i < 5; i++) {
      lines.push(new Line(50));
    }

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
    };
  });
</script>

<div aria-hidden="true">
  <svg viewBox="0 {-Ymax / 2.5 + lines.length / 2} {Xmax} {Ymax}">
    {#each lines.map((l) => l.toPath()) as d, i}
      <path {d} style:--offsetY="{5 * i}%" />
    {/each}
  </svg>
</div>

<style>
  div {
    position: fixed;
    width: 100%;
    height: 30vh;
    left: 0;
  }

  svg {
    margin: 0.5em 0;
    width: calc(100% + 0.5em);
    fill: none;
    stroke: var(---c-a2);
    stroke-width: 1;
    stroke-linejoin: miter;
    stroke-miterlimit: 10;
  }

  path {
    vector-effect: non-scaling-stroke;
    transform: translateY(var(--offsetY));
  }
</style>
