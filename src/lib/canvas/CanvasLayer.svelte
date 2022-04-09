<script lang="ts">
  import { onMount } from 'svelte';

  export let canvasCallback: (delta, ctx) => void;
  export let debug: {} | boolean = false;

  let canvasElement: HTMLCanvasElement;
  let inMemoryCanvas: HTMLCanvasElement;
  let innerWidth, innerHeight;

  class Throttle {
    callback: Function;
    timeout: number;
    delay: number;
    constructor(callback, delay) {
      this.callback = callback;
      this.timeout = null;
      this.delay = delay;
    }
    exec() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(this.callback, this.delay);
      return this;
    }
    cancel() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      return this;
    }
  }

  class LowPassFilter {
    smoothedValue: number;
    lastCall: number;
    constructor() {
      this.smoothedValue = 0;
      this.lastCall = performance.now();
    }

    filter(value: number, strength: number): number {
      const now = performance.now();
      const elapsed = now - this.lastCall;

      this.smoothedValue += (elapsed * (value - this.smoothedValue)) / strength;

      this.lastCall = now;
      return this.smoothedValue;
    }
  }

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
      throttledResize.cancel();
    };
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if debug}
  <pre>{JSON.stringify(debug, null, '').replace(/^{+|}$|/g, '')}</pre>
{/if}

<canvas
  on:resize={() => {
    throttledResize.exec();
  }}
  aria-hidden="true"
  bind:this={canvasElement}
/>

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
    font-family: var(--fontx);
    background: rgba(0, 0, 0, 0.5);
    color: white;
  }

  :global(html, body) {
    margin: 0;
    overflow: hidden;
  }
</style>
