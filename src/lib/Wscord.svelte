<script>
  import { dev } from '$app/env';
  let ws;
  let cursors = null;

  const ratio = 100_000; // cent mille

  function loadSocket() {
    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.onerror = (event) => {
      console.log('error: ', event);
    };

    socket.onopen = () => {
      console.info('socket opened');
      cursors = [];
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
      cursors = messages.reduce((acc, cur) => {
        const [name, x, y] = cur.split(',');
        acc.push({ name, x, y });
        return acc;
      }, []);
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
    if (!ws) {
      ws = loadSocket();
    } else {
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
{#if cursors}
  <ul aria-hidden="true">
    {#each cursors as { name, x, y }}
      {@const { ax, ay } = toAbsolute(x, y)}
      <li style:--rx="{ax}px" style:--ry="{ay}px">
        {name}
      </li>
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
    background-color: rebeccapurple;

    transform: translate(0.25em, calc(-100% - 0.25em));
  }
</style>
