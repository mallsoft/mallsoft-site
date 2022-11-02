import { loadLocal, saveLocal } from '$lib/utils';
import { writable } from 'svelte/store';

function createLocalSyncedStore(key, defaultValue = null) {
  if (!key && !defaultValue) throw 'missing param!';
  const { subscribe, set } = writable(loadLocal(key) ?? defaultValue);
  return {
    subscribe,
    set: (v) => {
      set(v);
      saveLocal(key, v);
    }
  };
}

export const scribblesEnabled = createLocalSyncedStore('scribbles', false);
