import { Vec } from './vec';
import { Bee } from './bee';

const FLOCK_SIZE = 15;
let flock: Array<Bee> = [];

const flockStep = () => {
  const avgHeading = new Vec(0, 0);
  const avgCenter = new Vec(0, 0);
  for (const b of flock) {
    avgHeading.add(b.dir);
    avgCenter.add(b.pos);
  }
  // avgHeading.mult(1 / flock.length);
  // avgCenter.mult(1 / flock.length);

  for (const b of flock) {
    b.step({ avgHeading, avgCenter, flock });
  }
};

const flockDraw = (ctx: CanvasRenderingContext2D) => {
  // ctx.lineCap = 'round';
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('---c-c1');
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const b of flock) {
    b.draw(ctx);
  }
};

const flocInit = () => {
  flock = Array.from({ length: FLOCK_SIZE }, () => new Bee());

  for (const b of flock) {
    b.respawn();
  }
};

export { flocInit, flockDraw, flockStep };
