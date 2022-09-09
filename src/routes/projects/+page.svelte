<script>
  import Projects from '$lib/contents/Projects.svelte';
  import Aksel from '$lib/visuals/Aksel.svelte';
</script>

<article class="default">
  <h1>Creating</h1>
  <p>empathic design through observation and the consideration of all audiences</p>
  <p>
    I like creating pragmatic and functional <b>story first</b> solutions
  </p>
  <section>
    <h2>Works</h2>
    <Projects />
  </section>
</article>

<Aksel />

<style>
  h1 {
    position: relative;
  }
  h1::after {
    content: '';
    color: var(---c-c1);
    animation: dots 3s 0.2s infinite;
  }

  @keyframes dots {
    0% {
      content: '';
    }
    33% {
      content: '.';
    }
    66% {
      content: '..';
    }
    100% {
      content: '...';
    }
  }
</style>
