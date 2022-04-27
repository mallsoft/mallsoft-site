import { writable, get } from 'svelte/store';
import { loadLocal, saveLocal } from '$lib/utils';

export const achievements = [
  {
    id: 'first',
    name: 'Who dis?',
    description: 'First visit to the site. Welcome!',
    icon: '🎉'
  },
  {
    id: 'traveler',
    name: 'Traveler',
    description: 'Move mouse 3000px on page',
    icon: '🚗'
  },
  {
    id: 'clicker',
    name: 'Clicker Hero',
    description: 'Click or tap more than 100 times',
    icon: '🖱️'
  },
  {
    id: 'duediligence',
    name: 'Due diligence',
    description: 'Visit all pages',
    icon: '📚'
  },
  {
    id: 'physics',
    name: 'Ball pit',
    description: 'Play with my balls',
    icon: '⚽'
  }
];

const store_key = '_achievements';

export function saveAll() {
  const state = {
    unlocked: get(unlocked),
    travel: get(travel),
    clicks: get(clicks),
    visits: get(visits)
  };

  saveLocal(store_key, state);
}

export function loadAll() {
  const state = loadLocal(store_key);
  if (state) {
    state.unlocked && unlocked.set(state.unlocked);
    state.travel && travel.set(state.travel);
    state.clicks && clicks.set(state.clicks);
    state.visits && visits.set(state.visits);
  }
}

export const unlocked = writable([]);
export const travel = writable(0);
export const clicks = writable(0);
export const visits = writable({ '/about': 0, '/projects': 0, '/contact': 0 });
