import { json } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import { env as pub } from '$env/dynamic/public';

const pb = new PocketBase(pub.PUBLIC_URL);

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  await pb.collection('machine').authWithPassword('mallx', env.SECRET_MALLX);
  const res = await pb.collection('stats').getFullList();

  const stats = res.map(({ achivements, agent, navigations, os, platform, timeSpent, window }) => ({
    achivements,
    agent,
    navigations,
    os,
    platform,
    timeSpent,
    window
  }));

  return json(stats);
}
