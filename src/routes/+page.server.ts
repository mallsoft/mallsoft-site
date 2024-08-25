import type { PageServerLoad, Actions } from './$types';

import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';
import { env as pub } from '$env/dynamic/public';
import { fail } from '@sveltejs/kit';

const pb = new PocketBase(pub.PUBLIC_URL);

export const load: PageServerLoad = async () => {
  if (!pb.authStore.isValid) {
    await pb.collection('machine').authWithPassword('mallx', env.SECRET_MALLX);
  }
  const feedback = await pb.collection('feedback').getFullList();

  return {
    feedback: feedback?.map(({ id, name, count }) => ({ id, name, count }))
  };
};

let cooldownUntil = 0;

export const actions: Actions = {
  feedback: async ({ request }) => {
    if (cooldownUntil > Date.now()) return;

    const data = await request.formData();
    const id = data.get('iconId')?.toString();

    if (!id) return fail(400, { fail: 'no icon id' });
    if (!/^[a-z0-9]{15}$/.test(id)) return fail(400, { fail: 'not an id' });

    if (!pb.authStore.isValid) {
      await pb.collection('machine').authWithPassword('mallx', env.SECRET_MALLX);
    }

    try {
      const res = await pb.collection('feedback').update(id, {
        'count+': 1
      });
      return { id: res.id, count: res.count };
    } catch (err) {
      if (err?.isAbort) {
        cooldownUntil = Date.now() + 3_000;
        console.log('Put on cooldown');
      } else {
        console.error('_Unexpected_', err);
      }
    }
  }
};
