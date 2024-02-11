<script lang="ts">
  let time = Date.now();
  const handleSessionChange = () => {
    if (document.visibilityState === 'hidden') {
      navigator.sendBeacon(
        '/api/bacon',
        JSON.stringify({ timeSpent: Math.round((Date.now() - time) / 1000) })
      );

      time = Date.now();
    }
  };
</script>

<svelte:window on:visibilitychange={handleSessionChange} />
