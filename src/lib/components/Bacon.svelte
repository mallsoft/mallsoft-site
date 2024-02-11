<script lang="ts">
  import { navigating } from '$app/stores';
  import { unlocked } from './achievement/achievementStores';

  let time = Date.now();
  let navigations = 0;

  $: if ($navigating && ['goto', 'link'].includes($navigating.type)) navigations++;

  const handleSessionChange = () => {
    if (document.visibilityState === 'hidden') {
      navigator.sendBeacon(
        '/api/bacon',
        JSON.stringify({
          timeSpent: Math.round((Date.now() - time) / 1000),
          window: `${window.innerWidth}x${window.innerHeight}`,
          achievements: $unlocked.length,
          navigations
        })
      );

      time = Date.now();
    }
  };
</script>

<svelte:window on:visibilitychange={handleSessionChange} />
