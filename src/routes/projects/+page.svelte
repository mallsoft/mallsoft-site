<script>
  import Projects from '$lib/contents/Projects.svelte';
</script>

<article class="default">
  <h1>Creating</h1>
  <p class="diff-add">Empathic design through observation and the consideration of all audiences</p>
  <p>
    Ideas with honest and functional <strong>story first</strong> solutions
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
    animation: dots 3s 0.2s infinite;
  }

  p:last-of-type::after {
    content: '™';
    font-size: 80%;
    color: var(---c-a2);
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
