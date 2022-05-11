<script>
  import { onMount } from 'svelte';
  import { generateName } from './names';

  onMount(() => {
    const name = generateName();
    const socket = new WebSocket('ws://localhost:8080/ws', 'spagetti');

    socket.onerror = (event) => {
      console.log('error: ', event);
    };

    socket.onopen = () => {
      socket.send(JSON.stringify({ name }));
      console.log('connected', name);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('in: ', data);
    };
  });
</script>
