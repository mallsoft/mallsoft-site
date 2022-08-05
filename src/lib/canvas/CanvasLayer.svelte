<script lang="ts">
  import { Throttle, LowPassFilter } from '$lib/utils';
  import { onMount } from 'svelte';

  export let canvasCallback: (delta, ctx) => void;
  export let debug: {} | boolean = false;

  let canvasElement: HTMLCanvasElement;
  let inMemoryCanvas: HTMLCanvasElement;
  let innerWidth, innerHeight;

  const throttledResize = new Throttle(() => {
    fitToWindow();
  }, 100);

  function fitToWindow() {
    canvasElement.width = innerWidth;
    canvasElement.height = innerHeight;
    inMemoryCanvas.width = innerWidth;
    inMemoryCanvas.height = innerHeight;
  }

  onMount(() => {
    if (!canvasCallback) throw new Error('updateCallback is not defined');

    inMemoryCanvas = document.createElement('canvas');
    const m_ctx = inMemoryCanvas.getContext('2d');
    const ctx = canvasElement.getContext('2d');

    let frame;
    let lastTime = performance.now();
    let lpf = new LowPassFilter();

    function loop(time) {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      canvasCallback(delta, m_ctx);

      if (debug) {
        debug = Object.keys(debug).length ? debug : {};
        debug['fps'] = Math.round(lpf.filter(1 / delta, 600));
      }

      ctx.clearRect(0, 0, innerWidth, innerHeight);
      ctx.drawImage(inMemoryCanvas, 0, 0);

      frame = requestAnimationFrame(loop);
    }

    fitToWindow();
    frame = requestAnimationFrame(loop);

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

{#if debug}
  <pre>{JSON.stringify(debug, null, '').replace(/^{+|}$|/g, '')}</pre>
{/if}

<canvas aria-hidden="true" bind:this={canvasElement} />

<style>
  canvas {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  pre {
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
  }
</style>
