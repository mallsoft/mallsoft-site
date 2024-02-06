import { normalize, rand } from '$lib/utils';
import { Vec } from './casting';

export class SnowFlake extends Vec {
  static small: number = 2;
  static large: number = 6;
  private r: number = rand(SnowFlake.small, SnowFlake.large);

  constructor() {
    super(innerWidth * Math.random(), innerHeight * Math.random());
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `hsla(0,0%,100%,${Math.max(
      0.01,
      normalize(this.r, SnowFlake.small, SnowFlake.large)
    )})`;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  update(f: number, i: number) {
    const individual = Math.sin(i + f / 3000) * 0.3;
    const wind_bias = Math.sin(f / 10_000) * 0.1;
    this.x += individual + wind_bias;

    const fall = this.r * 0.1 + 0.25;
    const updrafts = Math.sin(i + f / 10_000) * 0.3;
    this.y += updrafts + fall;

    // magic numbers are just padding
    if (this.y > innerHeight + 50) this.y = -50;
    if (this.x > innerWidth) this.x = 0;
    if (this.x < 0) this.x = innerWidth;
  }
}
