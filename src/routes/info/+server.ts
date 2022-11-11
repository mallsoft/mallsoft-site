import { json } from '@sveltejs/kit';

let lastReq = null;

/** @type {import('./$types').RequestHandler} */
export function GET(event) {
  const { getClientAddress, request } = event;

  const last = lastReq || new Date();
  lastReq = new Date();

  return json({
    ip: getClientAddress(),
    ua: request.headers.get('user-agent'),
    now: lastReq,
    last
  });
}
