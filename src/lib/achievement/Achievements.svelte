<script>
  import { page } from '$app/stores';
  import { messages } from '$lib/announcement/messages';
  import { onMount } from 'svelte';
  import { loadAll, resetAll, saveAll, unlocked } from './achievementStores';
  import Clicker from './Clicker.svelte';
  import Duediligence from './Duediligence.svelte';
  import GreetAksel from './GreetAksel.svelte';
  import Physics from './Physics.svelte';
  import Responsive from './Responsive.svelte';
  import Traveler from './Traveler.svelte';

  function clearAchievements() {
    resetAll();
    saveAll();
    messages.add('', 'Achievements cleared', '', 1000);
  }

  onMount(() => {
    // @ts-ignore - add achievement clearing to the global window scope ...
    window.clearAchievements = clearAchievements;

    loadAll();

    const saver = setInterval(saveAll, 1000);

    return () => {
      clearInterval(saver);
    };
  });
</script>

{#if !$unlocked?.includes('traveler')}
  <Traveler />
{/if}

{#if !$unlocked?.includes('clicker')}
  <Clicker />
{/if}

{#if !$unlocked?.includes('duediligence')}
  <Duediligence />
{/if}

{#if !$unlocked?.includes('physics') && $page.url.pathname === '/about'}
  <Physics />
{/if}

{#if !$unlocked?.includes('responsive')}
  <Responsive />
{/if}

{#if !$unlocked?.includes('aksel') && $page.url.pathname === '/'}
  <GreetAksel />
{/if}
