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
    <h2>Tricks of my trade</h2>
    <Words />
  </section>
</article>

<style>
  p {
    line-height: 1.1;
  }
  p + p {
    margin-top: 0.4em;
    position: relative;
  }

  section {
    margin-top: 1.5em;
  }

  h2 {
    font-size: 1.25em;
    font-weight: normal;
    max-width: var(---readwidth);
  }
</style>
