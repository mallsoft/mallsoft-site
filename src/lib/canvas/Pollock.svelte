<script>
  import { browser } from '$app/env';

  import CanvasLayer from './CanvasLayer.svelte';

  let bgColor =
    browser && window.getComputedStyle(document.documentElement).getPropertyValue('---c-bg');

  class Agent {
    respawn(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.r = Math.random() * Math.random() * Math.random() * 100 + 1;
      this.vx = (Math.random() * 2 - 1) * 50;
      this.vy = (Math.random() * 2 - 1) * 50;
      this.hue = Math.random() * 360;
      this.opacity = 0.1;

      return this;
    }

    randomHue() {
      this.hue = Math.random() * 360;
    }

    randomOpacity() {
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update(delta, ctx) {
      const { width, height } = ctx.canvas;

      // wrap
      if (this.x > width) this.x = 0;
      if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      if (this.y < 0) this.y = height;

      this.vx += (Math.random() * 2 - 1) * (25 * Math.random() * Math.random());
      this.vy += (Math.random() * 2 - 1) * (25 * Math.random() * Math.random());

      this.x += this.vx * delta;
      this.y += this.vy * delta;

      this.r = Math.max(Math.min(this.r + (Math.random() * 2 - 1) * 1, 1000), 1);

      this.opacity = Math.max(Math.min(this.opacity + (Math.random() * 0.25 - 0.25), 1), 0.1);

      if (Math.random() < 0.003) {
        this.respawn(width, height);
      }
      if (Math.random() < 0.002) {
        this.randomHue();
      }
      if (Math.random() < 0.005) {
        this.randomOpacity();
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

      const colorSpace = 60;
      if (this.hue < colorSpace || this.hue > 360 - colorSpace) {
        ctx.fillStyle = `hsla(${this.hue}, 70%, 80%, ${this.opacity})`;
      } else {
        ctx.fillStyle = bgColor;
      }

      ctx.fill();

      return this;
    }
  }

  const agents = [];

  function canvasCallback(delta, ctx) {
    const { width, height } = ctx.canvas;

    while (agents.length < 3) {
      agents.push(new Agent().respawn(width, height));
    }

    ctx.save();
    ctx.scale(0.99, 0.99);

    for (let i = 0; i < agents.length; i++) {
      agents[i].update(delta, ctx);
    }
    ctx.restore();
  }
</script>

<CanvasLayer {canvasCallback} />
