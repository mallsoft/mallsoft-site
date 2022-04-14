<script>
  import CanvasLayer from '$lib/canvas/CanvasLayer.svelte';

  export let agents = 3;

  class Agent {
    respawn(width, height) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.r = 3;
      this.vx = (Math.random() * 2 - 1) * 50;
      this.vy = (Math.random() * 2 - 1) * 50;

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

      this.x += this.vx * delta;
      this.y += this.vy * delta;

      // draw
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fillStyle = ;
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
