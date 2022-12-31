import { dev } from '$app/environment';
import { json } from '@sveltejs/kit';
import b from 'bowser';

let lastReq = null;

/** @type {import('./$types').RequestHandler} */
export function GET(event) {
  const { request } = event;

  const last = lastReq || new Date();
  lastReq = new Date();

  const ua = request.headers.get('user-agent');
  const browser = b.getParser(ua);

  const agent = browser.getBrowserName();
  const os = browser.getOSName();
  const platform = browser.getPlatformType();

  const ip = dev ? event.getClientAddress() : request.headers.get('Fly-Client-IP');

  return json({
    ip,
    agent,
    os,
    platform,
    now: lastReq,
    last
  });
}
