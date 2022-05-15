<script>
  import { page } from '$app/stores';
  let ws;

  function loadSocket() {
    const socket = new WebSocket('ws://localhost:8080/ws');

    socket.onerror = (event) => {
      console.log('error: ', event);
    };

    socket.onopen = () => {
      console.log('connected');
    };

    socket.onmessage = (event) => {
      console.log('in: ', event.data);
    };

    return socket;
  }

  function sendUpdate(x, y) {
    if (!ws) {
      ws = loadSocket();
    } else {
      const fullWidth = document.documentElement.clientWidth;
      const fullHeight = document.documentElement.clientHeight;
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      const rx = Math.round(((x + scrollX) / fullWidth + Number.EPSILON) * 1000);
      const ry = Math.round(((y + scrollY) / fullHeight + Number.EPSILON) * 1000);
      ws.send(`${rx},${ry}${$page.url.pathname}`);
    }
  }

  let waiting = false;
  function handleMouseMove(event) {
    if (!waiting) {
      waiting = true;
      setTimeout(() => {
        waiting = false;
        sendUpdate(event.clientX, event.clientY);
      }, 300);
    }
  }
</script>

<svelte:window on:mousemove={handleMouseMove} />
