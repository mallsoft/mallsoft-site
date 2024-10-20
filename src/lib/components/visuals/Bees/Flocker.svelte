<script lang="ts">
  import { onMount } from 'svelte';
  import { flocInit, flockDraw, flockStep } from './flock';

  let frame: number = 0;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const fitCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  const handleResize = () => {
    if (resizeTimeout === null) {
      fitCanvas();
    } else {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
      fitCanvas();
      resizeTimeout = null;
    }, 200);
  };

  const animationLoop = () => {
    flockStep();
    flockDraw(ctx);

    frame = requestAnimationFrame(animationLoop);
  };

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    console.assert(!!ctx, 'No canvas 2d context');
    fitCanvas();
    flocInit({ initialFlockSize: 20 });

    frame = requestAnimationFrame(animationLoop);
    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<svelte:window on:resize={handleResize} />

<div>
  <canvas bind:this={canvas} />
</div>

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -10;
  }

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
