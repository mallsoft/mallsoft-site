<script lang="ts">
  import { Throttle } from '$lib/utils';
  import { onMount } from 'svelte';
  import { Vec } from '$lib/components/visuals/casting';
  let canvasElement: HTMLCanvasElement;
  let innerWidth, innerHeight;
  let frame = null;
  let flakes: SnowFlake[] = [];

  const throttledResize = new Throttle(() => {
    canvasElement.width = innerWidth;
    canvasElement.height = innerHeight;

    flakes = [];
    const count = Math.max(10, Math.min(300, (innerHeight * innerWidth) / 6000));
    // const count = 6;
    for (let i = count; i > 0; i--) {
      flakes.push(new SnowFlake(1 + Math.random() * 3));
    }
  }, 100);

  class SnowFlake extends Vec {
    constructor(private r: number) {
      super(innerWidth * Math.random(), innerHeight * Math.random());
    }
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }
    update(f, i) {
      this.x += (Math.sin(i + f / 1000) + Math.sin(i + f / 300)) * 0.1;
      this.y += Math.sin(i + f / 1000) * 0.1 + this.r * 0.08;

      // magic numbers are just padding
      if (this.y > innerHeight + 50) this.y = -50;
      if (this.x > innerWidth) this.x = 0;
      if (this.x < 0) this.x = innerWidth;
    }
  }

  onMount(() => {
    throttledResize.exec();
    const ctx = canvasElement.getContext('2d');
    (function loop() {
      frame = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      // ...
      ctx.fillStyle = 'white';

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
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    animation: fadein 3s backwards ease-in-out;

    filter: blur(1px) drop-shadow(7px 7px 3px var(---c-a2)) brightness(1.4);
  }
  @media (prefers-color-scheme: dark) {
    canvas {
      filter: opacity(0.1) blur(1px);
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
