<script>
  import { dev } from '$app/env';

  let ws;
  let cursors = [];

  class Cursor {
    constructor(name, x, y) {
      this.name = name;
      this.x = x;
      this.y = y;
      this.alive = true;
      this._setTimeout();
    }
    update(x, y) {
      this.alive = true;
      this.x = x;
      this.y = y;
      this._setTimeout();
    }
    _setTimeout() {
      clearTimeout(this.ttk);
      this.ttk = setTimeout(() => {
        this.alive = false;
        cursors = cursors;
      }, 5000);
      cursors = cursors;
    }
  }

  const ratio = 100_000; // cent mille

  function loadSocket() {
    const socket = new WebSocket(
      dev ? 'ws://localhost:8080/ws' : 'wss://socketboi.herokuapp.com/ws'
    );

    socket.onerror = (event) => {
      console.log('error: ', event);
    };

    socket.onopen = () => {
      if (dev) {
        console.info('socket opened');
      }
    };

    socket.onmessage = (event) => {
      const validIncomingMessage = /^[a-z]{2,20},[0-9]{1,6},[0-9]{1,6}$/;
      if (!event.data.match(validIncomingMessage)) {
        console.error('invalid message');
        if (dev) {
          console.log('msg: ', event.data);
        }
        return;
      }

      const messages = event.data.split(/\n|\r/);
      const incoming = messages.reduce((acc, cur) => {
        const [name, x, y] = cur.split(',');
        acc.push({ name, x, y });
        return acc;
      }, []);

      incoming.forEach((cursor) => {
        const { name, x, y } = cursor;
        const { ax, ay } = toAbsolute(x, y);
        const old = cursors.find((c) => c.name === name);
        if (old) {
          old.update(ax, ay);
        } else {
          cursors = [...cursors, new Cursor(name, ax, ay)];
        }
      });
    };

    return socket;
  }

  function toRelative(x, y) {
    const { scrollHeight, scrollWidth } = document.documentElement;

    const rx = Math.round((x / scrollWidth) * ratio);
    const ry = Math.round((y / scrollHeight) * ratio);

    return { rx, ry };
  }

  function toAbsolute(rx, ry) {
    const { scrollHeight, scrollWidth } = document.documentElement;

    const ax = Math.round((rx / ratio) * scrollWidth);
    const ay = Math.round((ry / ratio) * scrollHeight);

    return { ax, ay };
  }

  function sendUpdate(x, y) {
    if (ws === undefined) {
      ws = loadSocket();
    }
    if (ws.readyState === ws.OPEN) {
      const { rx, ry } = toRelative(x, y);
      ws.send(`${rx},${ry}`);
    }
  }

  let prev = new Date().getTime();
  function posUpdate(x, y) {
    const now = new Date().getTime();
    if (now - prev > 50) {
      sendUpdate(x, y);
      prev = now;
    }
  }

  function handleMouseMove(ev) {
    posUpdate(ev.clientX, ev.clientY);
  }
</script>

<svelte:window on:mousemove={handleMouseMove} />
{#if cursors.length}
  <ul aria-hidden="true">
    {#each cursors as { name, x, y, alive }}
      {#if alive}
        <li style:--rx="{x}px" style:--ry="{y}px">
          {name}
        </li>
      {/if}
    {/each}
  </ul>
{/if}

<style>
  ul {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  li {
    position: fixed;
    display: block;
    top: var(--ry);
    left: var(--rx);

    transition: top 0.1s, left 0.1s;

    font-size: 0.6em;

    transform: translate(0.25em, calc(-100% - 0.25em));
  }
</style>
