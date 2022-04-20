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
