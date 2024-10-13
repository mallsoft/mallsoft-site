<script>
  import { page } from '$app/stores';
  import { dev } from '$app/environment';
</script>

<svelte:head>
  <title>Error {$page.status}</title>
</svelte:head>

<article>
  <h1>{$page.status === 404 ? 'Nothing here' : $page.status}</h1>
  {#if dev}
    <pre>{$page.error?.message}</pre>
  {/if}
  {#if $page.status !== 404}
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
