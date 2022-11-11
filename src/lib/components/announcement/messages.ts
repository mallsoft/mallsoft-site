import { writable } from 'svelte/store';

function logToast(icon, title, description) {
  console.info(
    `%cToast:

%c${icon ?? '❕'}${title}
%c${description}

`,
    'font-size:1.2em;',
    'font-size:2em;',
    'font-size:1.5em;'
  );
}

function createAnnouncementsStore(maxLength = 4) {
  const { subscribe, set, update } = writable([]);
  return {
    set,
    subscribe,
    add: (icon, title, description, ttl = 3000) => {
      logToast(icon, title, description);
      return update((m) => {
        m.length >= maxLength && m.shift();
        return [...m, { icon, title, description, ttl: ttl + Date.now() }];
      });
    },
    clearOld: () => update((m) => (m.length ? m.filter((m) => m.ttl > Date.now()) : [])),
    remove: (msg) => update((m) => (m.length ? m.filter((x) => x !== msg) : []))
  };
}

export const messages = createAnnouncementsStore();
