<script>
  import { me } from '$lib/content';
  import Unlocked from '$lib/visualcandy/Unlocked.svelte';
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
<div>
  <a href="/achievements">Achievements</a>
</div>

<style>
  span {
    margin-left: 0.5em;
    user-select: all;
  }

  div {
    width: 100%;
    max-width: var(---readwidth);
  }
  div a {
    font-size: smaller;
    color: var(---c-a2);
  }
  div a:hover {
    color: var(---c-b1);
  }
</style>
