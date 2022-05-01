import { browser } from '$app/env';
import { crossfade } from 'svelte/transition';
import { messages } from '$lib/announcement/messages';

export const [s, r] = crossfade({});

export function getAbsoluteRect(element) {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY,
    cx: rect.left + window.scrollX + rect.width / 2,
    cy: rect.top + window.scrollY + rect.height / 2,
    width: rect.width,
    height: rect.height,
    radius: (rect.width + rect.height) / 4
  };
}

export function toClipboard(text, announce = true) {
  navigator.clipboard.writeText(text);
  if (announce) {
    messages.add('✂', 'Copy that!', `(${text}) copied to clipboard`, 1300);
  }
}

export function saveLocal(key, value) {
  if (!browser) return;
  localStorage.setItem(key, btoa(JSON.stringify(value)));
}

export function loadLocal(key) {
  if (!browser) return;
  const value = localStorage.getItem(key);
  return value ? JSON.parse(atob(value)) : null;
}

export class Throttle {
  callback: Function;
  timeout: number;
  delay: number;
  constructor(callback, delay) {
    this.callback = callback;
    this.timeout = null;
    this.delay = delay;
  }
  exec() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(this.callback, this.delay);
    return this;
  }
  cancel() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    return this;
  }
}

export class LowPassFilter {
  smoothedValue: number;
  lastCall: number;
  constructor() {
    this.smoothedValue = 0;
    this.lastCall = performance.now();
  }

  filter(value: number, strength: number): number {
    const now = performance.now();
    const elapsed = now - this.lastCall;

    this.smoothedValue += (elapsed * (value - this.smoothedValue)) / strength;

    this.lastCall = now;
    return this.smoothedValue;
  }
}
