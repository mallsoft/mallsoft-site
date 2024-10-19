export class CircularBuffer<T> {
  private size: number = 0;
  private buff: T[];
  private currentIndex: number = 0;

  constructor(private capacity: number) {
    this.buff = new Array<T>(capacity);
  }

  add(item: T) {
    this.buff[this.currentIndex] = item;

    this.currentIndex = (this.currentIndex + 1) % this.capacity;

    if (this.size < this.capacity) this.size += 1;

    return this;
  }

  get(idx: number) {
    if (idx < 0 || idx >= this.size) return;
    return this.buff[(this.currentIndex + idx) % this.size];
  }

  private *values() {
    for (let i = this.currentIndex; i < this.currentIndex + this.size; i++) {
      yield this.buff[i % this.capacity];
    }
  }

  [Symbol.iterator]() {
    return this.values();
  }

  get length() {
    return this.size;
  }
}
