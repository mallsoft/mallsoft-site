import { normalize, rand } from '$lib/utils';
import { Vec } from './casting';

export class SnowFlake extends Vec {
  static small: number = 2;
  static large: number = 8;

  private min: number;
  private max: number;
  private r: number;

  private fallSpeed: number;

  constructor(min: number, max: number) {
    super(innerWidth * Math.random(), innerHeight * Math.random());

    this.min = min || SnowFlake.small;
    this.max = max || SnowFlake.large;
    this.r = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;

    this.fallSpeed = this.r * 0.05 + Math.random();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `hsla(0,0%,100%,${Math.max(0.01, normalize(this.r, this.min, this.max))})`;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fill();
  }

  update(f: number, i: number) {
    const individual = Math.sin(i + f / 3000) * 0.3;
    const windBias = Math.sin(f / 10000) * 0.1;
    this.x += individual + windBias;

    const updrafts = windBias / 2;
    this.y += this.fallSpeed + updrafts;

    if (this.y > innerHeight + this.r) {
      this.y = -this.r;
      this.x = Math.random() * innerWidth;
    }
    if (this.x > innerWidth) this.x = 0;
    if (this.x < 0) this.x = innerWidth;
  }
}
