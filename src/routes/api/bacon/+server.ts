import { env } from '$env/dynamic/private';
import { getRequestInfos } from '$lib/utils';
import type { RequestHandler } from './$types';
import PocketBase from 'pocketbase';

const pb = new PocketBase(env.SECRET_URL);

export const POST: RequestHandler = async (event) => {
  const { agent, os, platform } = getRequestInfos(event);
  const { timeSpent, window, achievements, navigations } = await event.request.json();

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
