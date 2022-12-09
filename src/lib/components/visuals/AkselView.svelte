<script>
  import Aksel from 'aksel';
  import { unlocked } from '$lib/components/achievement/achievementStores';
  import { onMount } from 'svelte';

  let showEgg = false;
  onMount(() => {
    showEgg = true;
  });
</script>

{#each $unlocked as _, i}
  <Aksel size={60 + i * 10} />
{:else}
  {#if showEgg}
    <div class="egg">🥚</div>
  {/if}
{/each}
