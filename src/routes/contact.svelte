<script>
  import { me } from '$lib/content';
  import Unlocked from '$lib/visualcandy/unlocked.svelte';
</script>

<article class="default">
  <h1>Contact</h1>
  <p>
    <a href="mailto:{me.email}?subject=Hello {me.name}!">mailto:</a><span>{me.email}</span>
  </p>
  <p>
    <a href="https://github.com{me.github}">github:</a><span>{me.github}</span>
  </p>
</article>

<Unlocked />

<style>
  span {
    margin-left: 0.5em;
    user-select: all;
  }
</style>
