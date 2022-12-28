<script lang="ts">
  import { clamp, normalize, rand, Throttle } from '$lib/utils';
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
    const count = Math.max(clamp(innerWidth / 10, 10, 200));
    for (let i = count; i > 0; i--) {
      flakes.push(new SnowFlake(rand(SnowFlake.small, SnowFlake.large)));
    }
  }, 100);

  class SnowFlake extends Vec {
    static small = 2;
    static large = 6;

    constructor(private r: number) {
      super(innerWidth * Math.random(), innerHeight * Math.random());
    }

    draw(ctx) {
      ctx.fillStyle = `hsla(0,0%,100%,${Math.max(
        0.01,
        normalize(this.r, SnowFlake.small, SnowFlake.large)
      )})`;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }

    update(f, i) {
      const individual = Math.sin(i + f / 3000) * 0.15;
      const wind_bias = Math.sin(f / 10_000) * 0.1;
      this.x += individual + wind_bias;

      const fall = this.r * 0.01 + 0.25;
      const updrafts = Math.sin(i + f / 10_000) * 0.2;
      this.y += updrafts + fall;

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

    filter: blur(2px) drop-shadow(5px 8px 2px rgba(0, 0, 0, 0.15));
  }
  @media (prefers-color-scheme: dark) {
    canvas {
      filter: opacity(0.4) blur(3px);
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
