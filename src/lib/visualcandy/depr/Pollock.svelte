<script>
  import { browser } from '$app/env';
  import CanvasLayer from '$lib/canvas/CanvasLayer.svelte';

  export let agents = 3;

  class Agent {
    respawn(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.r = Math.random() * Math.random() * Math.random() * 200 + 1;
      this.vx = (Math.random() * 2 - 1) * 50;
      this.vy = (Math.random() * 2 - 1) * 50;
      this.hue = Math.random() * 360;
      this.opacity = Math.random() * 0.2 + 0.3;

      return this;
    }

    randomHue() {
      this.hue = Math.random() * 360;
    }

    update(delta, ctx) {
      const { width, height } = ctx.canvas;

      // wrap
      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      if (this.y < 0) this.y = height;

      this.vx += (Math.random() * 2 - 1) * (30 * Math.random() * Math.random());
      this.vy += (Math.random() * 2 - 1) * (30 * Math.random() * Math.random());

      this.x += this.vx * delta;
      this.y += this.vy * delta;

      this.r = Math.max(Math.min(this.r + (Math.random() * 3 - 1.5) * 1, 500), 1);

      if (Math.random() < 0.003) {
        this.respawn(width, height);
      }

      if (Math.random() < 0.002) {
        this.randomHue();
      }

      if (Math.random() < 0.01) {
        this.opacity = Math.random() * Math.random();
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

      const colorSpace = 100;

      if (this.hue < colorSpace || this.hue > 360 - colorSpace) {
        ctx.fillStyle = `hsla(${this.hue}, 20%, 70%, ${this.opacity})`;
      } else {
        Math.random() < 0.002
          ? this.randomHue()
          : (ctx.fillStyle =
              browser &&
              window.getComputedStyle(document.documentElement).getPropertyValue('---c-bg'));
      }

      ctx.fill();

      return this;
    }
  }

  let agentsList = [];

  function canvasCallback(delta, ctx) {
    if (agentsList.length < agents) {
      agentsList.push(new Agent().respawn(ctx.canvas.width, ctx.canvas.height));
    }

    for (let i = 0; i < agentsList.length; i++) {
      agentsList[i].update(delta, ctx);
    }
  }
</script>

<CanvasLayer {canvasCallback} />
