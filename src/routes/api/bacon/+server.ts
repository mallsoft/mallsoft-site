import { env } from '$env/dynamic/private';
import { getRequestInfos } from '$lib/utils';
import type { RequestHandler } from './$types';
import PocketBase from 'pocketbase';

const pb = new PocketBase(env.SECRET_URL);

export const POST: RequestHandler = async (event) => {
  const { agent, os, platform } = getRequestInfos(event);
  let uid = event.cookies.get('baconx');
  if (!uid) uid = crypto.randomUUID();
  event.cookies.set('baconx', uid, { path: '/', maxAge: 7200 });

  const resp = await event.request.json();

  await pb.collection('machine').authWithPassword('mallx', env.SECRET_MALLX);
  await pb.collection('stats').create({ timeSpent: resp.timeSpent, agent, os, platform, uid });

  return new Response();
};
