<script>
  import Projects from '$lib/visualcandy/Projects.svelte';
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

<style>
  h1 {
    position: relative;
  }
  h1::after {
    content: '';
    color: var(---c-c1);
    animation: dots 4s 1s infinite;
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
