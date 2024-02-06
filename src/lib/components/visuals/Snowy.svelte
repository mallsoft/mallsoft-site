<script lang="ts">
  import { clamp, Throttle } from '$lib/utils';
  import { onMount } from 'svelte';
  import { SnowFlake } from '$lib/components/visuals/snow';

  let canvasElement: HTMLCanvasElement;
  let innerWidth: number, innerHeight: number;
  let frame: number;
  let flakes: SnowFlake[] = [];

  const throttledResize = new Throttle(() => {
    canvasElement.width = innerWidth;
    canvasElement.height = innerHeight;

    flakes = [];
    const count = Math.max(clamp(innerWidth / 8, 10, 300));
    for (let i = count; i > 0; i--) {
      flakes.push(new SnowFlake());
    }
  }, 100);

  onMount(() => {
    throttledResize.exec();
    const ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    (function loop() {
      frame = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      // ...

      flakes.forEach((f) => f.draw(ctx));
      flakes.forEach((f, i) => f.update(frame, i));
    })();

    return () => {
      cancelAnimationFrame(frame);
      throttledResize.clear();
    };
  });
</script>

<svelte:window
  bind:innerWidth
  bind:innerHeight
  on:resize={() => {
    throttledResize.call();
  }}
/>

<canvas aria-hidden="true" bind:this={canvasElement} />

<style>
  canvas {
    pointer-events: none;

    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    animation: fadein 3s backwards ease-in-out;

    filter: opacity(0.6) drop-shadow(5px 8px 2px rgba(0, 0, 0, 0.05));
  }
  @media (prefers-color-scheme: dark) {
    canvas {
      filter: opacity(0.3);
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
