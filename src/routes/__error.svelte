<script context="module">
  /** @type {import('@sveltejs/kit').Load} */ export function load({ error, status }) {
    return {
      props: {
        status,
        message: error.message
      }
    };
  }
</script>

<script>
  import { dev } from '$app/env';
  export let status;
  export let message;

  let text = status === 404 ? 'Nothing here' : status;
</script>

<svelte:head>
  <title>Error {status}</title>
</svelte:head>

<article>
  <h1>{text}</h1>
  {#if dev}
    <pre>{message}</pre>
  {/if}
  {#if status !== 404}
    <img src="error.webp" alt="bleerp cat" />
  {/if}
</article>

<style>
  img {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
    max-width: 50vw;
    max-height: 50vh;
    filter: grayscale(1) opacity(0.3);
  }

  article {
    padding: 2em;
    color: var(---c-bg);
    background-color: var(---c-a2);
  }
</style>
