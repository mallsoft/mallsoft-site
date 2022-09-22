<script>
  import { navRoutes } from '$lib/content';
  import Wscord from '$lib/contents/Wscord.svelte';
  import Aksel from '$lib/visuals/Aksel.svelte';
</script>

<article class="default">
  <h1>mallsoft•dev</h1>
  <p>a developer based in Bergen<br />— mostly focused on web and UX</p>

  <nav>
    {#each navRoutes as { href, name }}
      <a {href}>{name}</a>
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
</style>
