<script>
  import Works from '$lib/components/content/Works.svelte';
  import SuggestionLoader from '$lib/components/visuals/suggestions/SuggestionLoader.svelte';
</script>

<svelte:head>
  <title>mallsoft•dev - Stuff</title>
</svelte:head>

<article class="default">
  <h1>Creating</h1>
  <p class="diff-modify">
    Empathic design through observation and the consideration of all audiences
  </p>
  <p>
    Ideas with inclusive and accessible <strong>story first</strong> solutions
  </p>
  <Works />
  <p class="diff-remove">
    Less is more and... bad software has probably killed more people than sharks
  </p>

  <SuggestionLoader />
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
