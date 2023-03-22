import { json } from '@sveltejs/kit';
import { getRequestInfos } from '$lib/utils';

let lastReq = null;

/** @type {import('./$types').RequestHandler} */
export function GET(event) {
  const { request } = event;

  const last = lastReq || Date.now();
  lastReq = Date.now();

  const { ip, agent, os, platform } = getRequestInfos(event);

  return json({
    ip,
    agent,
    os,
    platform,
    now: lastReq,
    last
  });
}
