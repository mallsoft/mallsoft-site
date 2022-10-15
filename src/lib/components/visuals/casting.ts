export class Vec {
  constructor(public x: number, public y: number) {}
  length() {
    // magnitude
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize() {
    const len = this.length();
    this.x /= len;
    this.y /= len;

    return this;
  }

  dist(other: Vec) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }

  rotate(rad: number) {
    this.x = this.x * Math.cos(rad) - this.y * Math.sin(rad);
    this.y = this.x * Math.sin(rad) + this.y * Math.cos(rad);

    return this;
  }

  clone() {
    return new Vec(this.x, this.y);
  }
}

export class Line {
  constructor(public start: Vec, public end: Vec) {}
}

export class Ray {
  constructor(public pos: Vec, public dir: Vec) {
    this.lookAt(dir);
  }

  lookAt(pos: Vec) {
    this.dir = new Vec(pos.x - this.pos.x, pos.y - this.pos.y).normalize();
    return this;
  }

  cast(line: Line): Vec {
    const x1 = line.start.x;
    const y1 = line.start.y;
    const x2 = line.end.x;
    const y2 = line.end.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      return null;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    // if t is between 0 and 1 and u is between 0 and 1
    // then the intersection is on the line segment
    if (t > 0 && t < 1 && u > 0) {
      return new Vec(x1 + t * (x2 - x1), y1 + t * (y2 - y1));
    }

    return null;
  }

  castAll(lines: Line[]): Vec[] {
    const intersections = [];
    for (const line of lines) {
      const intersection = this.cast(line);
      if (intersection) {
        intersections.push(intersection);
      }
    }
    return intersections;
  }

  castAllNearest(lines: Line[]) {
    const intersections = this.castAll(lines);
    if (intersections.length == 0) {
      return null;
    }
    let nearest = intersections[0];
    for (const intersection of intersections) {
      if (intersection.dist(this.pos) < nearest.dist(this.pos)) {
        nearest = intersection;
      }
    }
    return nearest;
  }
}
