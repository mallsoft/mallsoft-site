import { Vec } from './vec';
import { Bee } from './bee';

const flockStep = () => {
  const avgHeading = new Vec(0, 0);
  const avgCenter = new Vec(0, 0);
  for (const b of flock) {
    avgHeading.add(b.dir);
    avgCenter.add(b.pos);
  }
  avgHeading.mult(1 / flock.length);
  avgCenter.mult(1 / flock.length);

  for (const b of flock) {
    b.step({ avgHeading, avgCenter, flock });
  }
};

const flockDraw = (ctx: CanvasRenderingContext2D) => {
  ctx.lineCap = 'round';
  ctx.globalAlpha = 0.25;
  // ctx.lineWidth = 5;
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('---c-a2');
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('---c-c1');
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const b of flock) {
    b.draw(ctx);
  }
};

let flock: Array<Bee> = [];

const flocInit = ({ initialFlockSize }: { initialFlockSize: number }) => {
  flock = Array.from({ length: initialFlockSize }, () => new Bee());

  for (const b of flock) {
    b.respawn();
  }
};

export { flocInit, flockDraw, flockStep };
