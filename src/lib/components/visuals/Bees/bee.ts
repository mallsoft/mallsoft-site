import { CircularBuffer } from './buff';
import { Vec } from './vec';

export class Bee {
  pos: Vec = new Vec(0, 0);
  dir: Vec = new Vec(0, 0);
  private hunting: Bee | null = null;
  private speed: number = 0;
  private historic: CircularBuffer<Vec> = new CircularBuffer(Math.floor(Math.random() * 300) + 5);

  private randSpeed() {
    this.speed = Math.random() + 1;
    if (Math.random() < 0.25) {
      this.speed = Math.random() * 3 + 1;
      if (Math.random() < 0.03) {
        this.speed = Math.random() * 8 + 1;
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

  private turn(target: Vec, factor: number) {
    const dir = this.pos.clone().setDir(this.pos.dirTo(target)).mult(factor);
    return this.dir.add(dir);
  }

  // private transpose(x: number, y: number) {
  //   for (let i = 1; i < this.historic.length; i++) {
  //     const v = this.historic.get(i)!;
  //     v.x += x;
  //     v.y += y;
  //   }
  // }

  private wrap() {
    if (this.pos.x > window.innerWidth) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = window.innerWidth;
    }

    if (this.pos.y > window.innerHeight) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = window.innerHeight;
    }
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
    this.historic.add(this.pos.clone());

    const max = Math.min(window.innerWidth / 2, window.innerHeight / 2);

    if (this.historic.length > 1) {
      ctx.beginPath();
      for (let i = 1; i < this.historic.length - 1; i++) {
        const v = this.historic.get(i)!;
        const v2 = this.historic.get(i + 1)!;

        if (v.dist(v2) > max) {
          continue;
        }

        ctx.moveTo(v.x, v.y);
        ctx.lineTo(v2.x, v2.y);
      }

      ctx.stroke();
    }
  }

  step({ avgHeading, avgCenter, flock }: { avgHeading: Vec; avgCenter: Vec; flock: Bee[] }) {
    this.pos.add(this.dir.clone().mult(this.speed));
    this.hunt(flock, 0.09);
    this.dir.add(avgHeading, 0.03).normalize();
    this.turn(avgCenter, 0.05);
    this.wrap();
  }
}
