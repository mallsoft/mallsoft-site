<script>
  import { navRoutes } from '$lib/content';
  import Wscord from '$lib/contents/Wscord.svelte';
  import Aksel from '$lib/visuals/Aksel.svelte';
  import { onMount } from 'svelte';

  let wiggle = false;
  onMount(() => {
    if (localStorage.getItem('hasWiggled') !== 'yeah!') {
      wiggle = true;
      localStorage.setItem('hasWiggled', 'yeah!');
    }
  });
</script>

<article class="default">
  <h1>mallsoft•dev</h1>
  <p>a developer based in Bergen<br />— mostly focused on web and UX</p>

  <nav>
    {#each navRoutes as { href, name }, i}
      {#if i === 0}
        <a {href} class:wiggle>{name}</a>
      {:else}
        <a {href}>{name}</a>
      {/if}
    {/each}
  </nav>
</article>

<Aksel />

<Wscord />

<style>
  nav {
    margin-top: 1em;
    display: flex;
    flex-wrap: wrap;
    gap: 1.2em;
  }

  .wiggle {
    animation: wiggle 0.6s 3s 2;
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
