import { browser } from '$app/environment';
import { crossfade } from 'svelte/transition';
import { messages } from '$lib/components/announcement/messages';

export function getLeafNodes() {
  const nodes = document.querySelectorAll('body :not(:is( body > *), canvas)');
  const leafNodes = Array.from(nodes).filter(({ childNodes }) => {
    return (
      (childNodes.length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) || // contains single [ #text ]
      [...childNodes]
        .filter(({ nodeName }) => nodeName !== 'BR') // contains multiple [ #text, br, #text ], remove br tags
        .every(({ nodeType }) => nodeType === Node.TEXT_NODE) // all is [ #text ]
    );
  });
  return leafNodes;
}

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
    this.callback();
    return this;
  }
  call() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(this.callback, this.delay);
    return this;
  }
  clear() {
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

export function isLocalStorageAvailable() {
  if (!browser) return false;
  const kv = 'TEST___TESTY___TEST_plznoconflict';
  try {
    localStorage.setItem(kv, 'spagetti!');
    localStorage.removeItem(kv);
    return true;
  } catch (e) {
    return false;
  }
}
