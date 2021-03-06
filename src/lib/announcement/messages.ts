import { writable } from 'svelte/store';

function createAnnouncementsStore(maxLength = 4) {
  const { subscribe, set, update } = writable([]);
  return {
    set,
    subscribe,
    add: (icon, title, description, ttl = 3000) =>
      update((m) => {
        m.length >= maxLength && m.shift();
        return [...m, { icon, title, description, ttl: ttl + Date.now() }];
      }),
    clearOld: () => update((m) => (m.length ? m.filter((m) => m.ttl > Date.now()) : [])),
    remove: (msg) => update((m) => (m.length ? m.filter((x) => x !== msg) : []))
  };
}

export const messages = createAnnouncementsStore();
