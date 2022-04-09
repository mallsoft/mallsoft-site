<script>
  import Words from '$lib/visualcandy/Words.svelte';
</script>

<article class="default">
  <h1>I'm Hans</h1>
  <p>
    a developer based in Bergen<br />— mostly focused on web and UX
  </p>
  <p>
    I like creating pragmatic and functional <b>story first</b> solutions
  </p>
  <section>
    <h2>Word pool</h2>
    <Words />
  </section>
</article>

<style>
  h1 {
    color: var(---c-a2);
  }

  p {
    line-height: 1.1;
  }
  p + p {
    margin-top: 0.45em;
    position: relative;
  }
  p + p::after {
    content: '';
    position: absolute;
    top: -0.45em;
    left: 30%;
    right: 0;
    bottom: 0;
    height: 60%;
    background: var(---c-a2);
    opacity: 0.1;
    z-index: -1;
    padding: 1em;
  }
  section {
    margin-top: 1.8em;
  }
  h2 {
    font-size: 1.25em;
    font-weight: normal;
    max-width: var(---readwidth);
  }
</style>
