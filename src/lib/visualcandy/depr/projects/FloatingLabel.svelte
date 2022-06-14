<script>
  import { fade } from 'svelte/transition';
  export let element = null;
</script>

{#if element}
  <section transition:fade>
    <h1>{element.title}</h1>
    <p>{element.description}</p>
  </section>
{/if}

<style>
  h1 {
    margin-bottom: 0.5em;
  }
  section {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 100;

    font-size: 0.5em;
    padding: 1em;
    margin: 0.5em;
    border: 1px solid #ccc;

    max-width: 350px;
  }
</style>
