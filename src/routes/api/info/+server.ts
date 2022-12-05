import { json } from '@sveltejs/kit';

let lastReq = null;

/** @type {import('./$types').RequestHandler} */
export function GET(event) {
  const { request } = event;

  const last = lastReq || new Date();
  lastReq = new Date();

  return json({
    addr: request.headers.get('Fly-Client-IP'),
    ua: request.headers.get('user-agent'),
    now: lastReq,
    last
  });
}
