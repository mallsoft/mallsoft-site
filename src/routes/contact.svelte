<script>
  import GRay from '$lib/canvas/GRay.svelte';
  import { me } from '$lib/content';
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

<GRay />

<style>
  span {
    margin-left: 0.5em;
    user-select: all;
  }

  div {
    width: 100%;
    max-width: var(---readwidth);
    padding: 0 1rem;
  }
  div a {
    font-size: 0.6em;
    color: var(---c-a2);
  }
  div a:hover {
    color: var(---c-b1);
  }
</style>
