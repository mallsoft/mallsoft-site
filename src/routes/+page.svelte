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

  let current = null;
</script>

<svelte:head>
  <title>mallsoft•dev</title>
</svelte:head>

<article class="default">
  <h1>
    {#each navRoutes as _, i}
      <span class:active={i === current}>.</span>
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
</article>

<Aksel />

<Wscord />

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
