import { Vec } from './vec';

export class Bee {
  pos: Vec;
  dir: Vec;
  speed: number;
  paths: Path2D[];
  tailLength: number;
  pathIndex: number;
  hunting: Bee | null;

  constructor() {
    this.hunting = null;
    this.pathIndex = 0;
    this.paths = [];
    this.speed = 0;
    this.tailLength = Math.ceil(60 * Math.random() * Math.random()) + 5;
    this.pos = new Vec(0, 0);
    this.dir = new Vec(0, 0);
  }

  private randSpeed() {
    this.speed = Math.random() + 1;
    if (Math.random() < 0.3) {
      this.speed = Math.random() * 5;
      if (Math.random() < 0.1) {
        this.speed = Math.random() * 10;
      }
    }
  }

  respawn() {
    const x = window.innerWidth * Math.random();
    const y = window.innerHeight * Math.random();

    this.randSpeed();
    this.pos.set(x, y);
    this.dir.random();

    return this;
  }

  private genPath() {
    const path = new Path2D();
    const tailFactor = 2;
    path.moveTo(this.pos.x, this.pos.y);
    path.lineTo(
      this.pos.x + this.dir.x * (this.speed * tailFactor),
      this.pos.y + this.dir.y * (this.speed * tailFactor)
    );
    return path;
  }

  private turn(target: Vec, factor: number) {
    const dir = this.pos.clone().setDir(this.pos.dirTo(target)).mult(factor);
    this.dir.add(dir).normalize();
    return this;
  }

  private wrap() {
    if (this.pos.x > window.innerWidth) this.pos.x = 0;
    else if (this.pos.x < 0) this.pos.x = window.innerWidth;

    if (this.pos.y > window.innerHeight) this.pos.y = 0;
    else if (this.pos.y < 0) this.pos.y = window.innerHeight;
  }

  private hunt(flock: Bee[], factor = 1) {
    if (this.hunting) {
      this.turn(this.hunting.pos, factor);

      if (this.pos.dist(this.hunting.pos) < 100) {
        this.hunting = null;
      }
    } else if (Math.random() < 0.05) {
      this.randSpeed();
      this.hunting = flock[Math.floor(Math.random() * flock.length)];
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.paths[this.pathIndex++ % this.tailLength] = this.genPath();

    this.paths.forEach((p) => ctx.stroke(p));

    // ctx.beginPath();
    // ctx.arc(this.pos.x + this.dir.x, this.pos.y + this.dir.y, this.speed * 2, 0, Math.PI * 2);
    // ctx.stroke();

    return this.paths;
  }

  step({ avgHeading, avgCenter, flock }: { avgHeading: Vec; avgCenter: Vec; flock: Bee[] }) {
    this.pos.add(this.dir.clone().mult(this.speed));

    this.wrap();

    this.hunt(flock, 0.05);

    this.dir.add(avgHeading, 0.05);

    this.turn(avgCenter, 0.02);

    // randomize to avoid circular chase?

    this.dir.normalize();

    return this;
  }
}
