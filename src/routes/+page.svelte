<script>
  import { navRoutes } from '$lib/content';
  import Snowy from '$lib/components/visuals/Snowy.svelte';
  import Aksel from 'aksel';

  import { unlocked } from '$lib/components/achievement/achievementStores';

  import { onMount } from 'svelte';
  import SuggestionLoader from '$lib/components/visuals/suggestions/SuggestionLoader.svelte';

  let wiggle = false;
  let showEgg = false;

  onMount(() => {
    showEgg = true; // only show if js and on client

    if (localStorage.getItem('hasWiggled') !== 'yeah!') {
      wiggle = true;
      localStorage.setItem('hasWiggled', 'yeah!');
    }
  });

  let current = null;
</script>

<svelte:head>
  <title>mallsoft•dev - Index</title>
</svelte:head>

<article class="default">
  <h1 aria-label="three dots">
    {#each navRoutes as _, i}
      <span class:active={i === current}>•</span>
    {/each}
  </h1>
  <p>A developer based in Bergen<br />— mostly focused on web and UX</p>

  <nav>
    {#each navRoutes as { href, name }, i}
      <a
        on:mouseover={() => {
          current = i;
        }}
        on:focus={() => {
          current = i;
        }}
        on:mouseout={() => {
          current = null;
        }}
        on:blur={() => {
          current = null;
        }}
        {href}
        class:wiggle={wiggle && i === 0}>{name}</a
      >
    {/each}
  </nav>

  <SuggestionLoader />
</article>

{#each $unlocked as _, i}
  <Aksel size={60 + i * 10} />
{:else}
  {#if showEgg}
    <div class="egg">🥚</div>
  {/if}
{/each}

<!-- dec, jan, feb -->
{#if [11, 0, 1].includes(new Date().getMonth())}
  <Snowy />
{/if}

<style>
  h1 span {
    display: inline-block;
    transition: color 0.2s, transform 0.6s;
  }
  h1 span.active {
    transition: color 0.2s, transform 0.2s;
    color: var(---c-c1);
    transform: translateY(-0.25ch);
  }

  nav {
    margin-top: 1em;
    display: flex;
    flex-wrap: wrap;
    gap: 1.2em;
  }

  .wiggle {
    animation: wiggle 0.6s 3s 2;
  }

  .egg {
    display: block;
    margin-bottom: 0.1em;
    font-size: 1.4em;
    animation: wiggle 1s infinite;
  }

  @keyframes wiggle {
    10% {
      transform: rotate(5deg);
    }
    30% {
      transform: rotate(-5deg) scale(1.03);
    }
    60% {
      transform: rotate(5deg);
    }
  }
</style>
