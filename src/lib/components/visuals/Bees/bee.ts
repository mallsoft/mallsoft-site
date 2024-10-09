import { Vec } from './vec';

export class Bee {
  pos: Vec;
  dir: Vec;
  speed: number;
  constructor() {
    this.speed = 0;
    this.pos = new Vec(0, 0);
    this.dir = new Vec(0, 0);
  }

  randSpeed() {
    this.speed = Math.random() + 1;
    if (Math.random() > 0.6) {
      this.speed = Math.random() * 10;
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

  getPath() {
    const path = new Path2D();
    const tailFactor = 10;
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

  step({ avgHeading, avgCenter }: { avgHeading: Vec; avgCenter: Vec }) {
    this.pos.add(this.dir.clone().mult(this.speed));

    this.wrap();

    this.turn(avgHeading, 0.03).turn(avgCenter, 0.09).turn(new Vec());

    this.dir.normalize();

    return this;
  }
}
