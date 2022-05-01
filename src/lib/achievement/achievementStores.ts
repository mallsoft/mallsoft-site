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
    description: 'Play around with physics',
    icon: '⚽'
  }
];

const defaultState = {
  unlocked: [],
  travel: 0,
  clicks: 0,
  visits: { '/about': 0, '/projects': 0, '/contact': 0 }
};

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

export function resetAll() {
  unlocked.set(defaultState.unlocked);
  travel.set(defaultState.travel);
  clicks.set(defaultState.clicks);
  visits.set(defaultState.visits);
}

export const unlocked = writable(defaultState.unlocked);
export const travel = writable(defaultState.travel);
export const clicks = writable(defaultState.clicks);
export const visits = writable(defaultState.visits);
