import { env } from '$env/dynamic/private';
import { env as pub } from '$env/dynamic/public';
import { getRequestInfos } from '$lib/utils';
import type { RequestHandler } from './$types';
import PocketBase from 'pocketbase';

const pb = new PocketBase(pub.PUBLIC_URL);

function validateInput({
  timeSpent,
  window,
  achievements,
  navigations
}: {
  timeSpent: any;
  window: any;
  achievements: any;
  navigations: any;
}) {
  const timeSpentIsValid = typeof timeSpent === 'number' && timeSpent >= 0;
  const windowIsValid = /^\d+x\d+$/.test(window);
  const achievementsIsValid = typeof achievements === 'number' && achievements >= 0;
  const navigationsIsValid = typeof navigations === 'number' && navigations >= 0;

  return timeSpentIsValid && windowIsValid && achievementsIsValid && navigationsIsValid;
}

export const POST: RequestHandler = async (event) => {
  const { agent, os, platform } = getRequestInfos(event);
  const { timeSpent, window, achievements, navigations } = await event.request.json();
  const isValid = validateInput({ timeSpent, window, achievements, navigations });

  if (!isValid) {
    console.log('bacon error, invalid data');
    return new Response();
  }

  const id = event.cookies.get('baconx');
  await pb.collection('machine').authWithPassword('mallx', env.SECRET_MALLX);

  if (id) {
    await pb.collection('stats').update(id, {
      'timeSpent+': timeSpent,
      'navigations+': navigations,
      agent,
      os,
      platform,
      window,
      achievements
    });
    event.cookies.set('baconx', id, { path: '/', maxAge: 7200 });
  } else {
    const entry = await pb
      .collection('stats')
      .create({ timeSpent, navigations, agent, os, platform, window, achievements });
    event.cookies.set('baconx', entry.id, { path: '/', maxAge: 7200 });
  }

  return new Response();
};
