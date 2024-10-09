import { Vec } from './vec';
import { Bee } from './bee';

const FLOCK_SIZE = 10;
let flock: Array<Bee> = [];

const debuglen = 4;
let debugidx = 0;
let debug: { avgHeading: Vec; avgCenter: Vec }[] = new Array(debuglen).fill({
  avgHeading: 0,
  avgCenter: 0
});

const flockStep = () => {
  const avgHeading = new Vec(0, 0);
  const avgCenter = new Vec(0, 0);
  for (const b of flock) {
    avgHeading.add(b.dir);
    avgCenter.add(b.pos);
  }
  // avgHeading.mult(1 / flock.length);
  // avgCenter.mult(1 / flock.length);

  debug[debugidx % debuglen] = { avgHeading, avgCenter };
  debugidx++;

  for (const b of flock) {
    b.step({ avgHeading, avgCenter });
  }
};

const flockDraw = (ctx: CanvasRenderingContext2D) => {
  // ctx.lineWidth = 1;
  // ctx.lineCap = 'round';
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('---c-c1');
  // ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const b of flock) {
    ctx.stroke(b.getPath());
  }
};

const flocInit = () => {
  flock = Array.from({ length: FLOCK_SIZE }, () => new Bee());
  for (const b of flock) {
    b.respawn();
  }
};

export { flocInit, flockDraw, flockStep };
