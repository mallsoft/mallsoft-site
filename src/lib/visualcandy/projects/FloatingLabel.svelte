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
  section {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    font-size: 0.5em;
    padding: 1em;
    border: 1px solid #ccc;

    max-width: 350px;
  }
</style>
