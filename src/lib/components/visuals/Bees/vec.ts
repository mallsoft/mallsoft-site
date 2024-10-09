export class Vec {
  constructor(
    public x: number,
    public y: number
  ) {}

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  dir() {
    return Math.atan2(this.y, this.x);
  }

  setDir(rad: number) {
    this.set(Math.cos(rad), Math.sin(rad));
    return this.normalize();
  }

  /**
   * @returns distance between this point and p
   */
  dist(p: Vec) {
    return Math.hypot(this.x - p.x, this.y - p.y);
  }

  /**
   * @returns direction from this to p in radians
   */
  dirTo(p: Vec) {
    return Math.atan2(p.y - this.y, p.x - this.x);
  }

  random() {
    this.x = Math.random() - Math.random();
    this.y = Math.random() - Math.random();
    this.normalize();
    return this;
  }

  add(v: Vec, factor: number = 1) {
    this.x += v.x * factor;
    this.y += v.y * factor;

    return this;
  }

  sub(v: Vec, factor: number = 1) {
    this.x -= v.x * factor;
    this.y -= v.y * factor;
    return this;
  }

  mult(s: number) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  get magnitude() {
    return Math.hypot(this.x, this.y);
  }

  normalize() {
    if (this.magnitude === 0) {
      this.x = 0;
      this.y = 0;
    } else {
      this.mult(1 / this.magnitude);
    }
    return this;
  }

  clone() {
    return new Vec(this.x, this.y);
  }
}
