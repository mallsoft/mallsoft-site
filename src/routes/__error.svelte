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
</script>

<h1>{status}</h1>
{#if dev}
  <pre>{message}</pre>
{/if}
{#if status !== 404}
  <img src="error.webp" alt="bleerp cat" />
{/if}

<style>
  img {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
    max-width: 50vw;
    max-height: 50vh;
  }
</style>
