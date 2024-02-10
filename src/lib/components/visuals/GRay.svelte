<script lang="ts">
  import { Throttle, getLeafNodes } from '$lib/utils';
  import { onMount } from 'svelte';
  import { Line, Ray, Vec } from '$lib/components/visuals/casting';
  let canvasElement: HTMLCanvasElement;
  let innerWidth: number, innerHeight: number;

  let scrolling = false;
  let pointer: Vec | null;
  let lines: Line[];

  const throttledResize = new Throttle(() => {
    scrolling = false;
    canvasElement.width = innerWidth;
    canvasElement.height = innerHeight;

    lines = [];
    getLeafNodes().forEach((node) => {
      const { top, bottom, right, left } = node.getBoundingClientRect();

      lines.push(new Line(new Vec(left, top), new Vec(right, top)));
      lines.push(new Line(new Vec(right, top), new Vec(right, bottom)));
      lines.push(new Line(new Vec(right, bottom), new Vec(left, bottom)));
      lines.push(new Line(new Vec(left, bottom), new Vec(left, top)));
    });

    // add bounding box lines
    lines.push(new Line(new Vec(5, 5), new Vec(innerWidth - 5, 5)));
    lines.push(new Line(new Vec(innerWidth - 5, 5), new Vec(innerWidth - 5, innerHeight - 5)));
    lines.push(new Line(new Vec(innerWidth - 5, innerHeight - 5), new Vec(5, innerHeight - 5)));
    lines.push(new Line(new Vec(5, innerHeight - 5), new Vec(5, 5)));
  }, 100);

  onMount(() => {
    const firstLoad = setTimeout(() => {
      throttledResize.exec();
    }, 500);

    const observer = new MutationObserver(() => {
      throttledResize.call();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    const ctx: CanvasRenderingContext2D = canvasElement.getContext('2d')!;

    let frame: number;

    (function loop(t?: number) {
      frame = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, innerWidth, innerHeight);

      if (!lines || !pointer) return;

      // get root element variable ---c-c1
      const color = getComputedStyle(document.documentElement).getPropertyValue('---c-c1');

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      const rays: Ray[] = [];
      for (const line of lines) {
        const v = new Vec(line.start.x, line.start.y);
        const d1 = v.clone().rotate(0.0001);
        const d2 = v.clone().rotate(-0.0001);
        rays.push(new Ray(pointer, d1), new Ray(pointer, d2));
      }

      const hits: Vec[] = [];
      rays.forEach((ray) => {
        const hit = ray.castAllNearest(lines);
        if (hit) hits.push(hit);
      });

      // sort hits by angle from pointer and draw
      hits.sort((a, b) => {
        const aAngle = Math.atan2(a.y - pointer!.y, a.x - pointer!.x);
        const bAngle = Math.atan2(b.y - pointer!.y, b.x - pointer!.x);
        return aAngle - bAngle;
      });

      for (let i = 0; i < hits.length; i++) {
        const { x, y } = hits[i];
        if (i === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        if (i === hits.length - 1) {
          ctx.closePath();
          ctx.stroke();
        }
      }

      // --
    })();

    return () => {
      clearTimeout(firstLoad);
      cancelAnimationFrame(frame);
      throttledResize.clear();
      observer.disconnect();
    };
  });
</script>

<svelte:window
  bind:innerWidth
  bind:innerHeight
  on:resize={() => {
    throttledResize.call();
  }}
  on:mousemove={({ clientX, clientY }) => {
    if (!pointer) {
      pointer = new Vec(clientX, clientY);
    } else {
      pointer.x = clientX;
      pointer.y = clientY;
    }
  }}
  on:touchmove={({ touches }) => {
    if (!pointer) {
      pointer = new Vec(touches[0].clientX, touches[0].clientY);
    } else {
      pointer.x = touches[0].clientX;
      pointer.y = touches[0].clientY;
    }
  }}
  on:mouseout={() => {
    pointer = null;
  }}
  on:scroll={() => {
    scrolling = true;
    throttledResize.call();
  }}
/>
<canvas aria-hidden="true" bind:this={canvasElement} class:scrolling />

<style>
  canvas {
    position: fixed;
    z-index: 2;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    animation: fadein 0.53s backwards ease-in-out;

    transition: opacity 0.2s;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .scrolling {
    opacity: 0.2;
  }
</style>
