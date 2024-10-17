<script lang="ts">
  import '@fontsource/space-grotesk';
  import '../app.css';
  import Meta from '$lib/components/layout/Meta.svelte';
  import { onMount } from 'svelte';

  onMount(() => {
    document.body.style.transition = 'opacity 0.2s';
    document.body.style.opacity = '1';
  });
</script>

<Meta />

<slot />

<noscript>
  <style>
    body {
      opacity: 1 !important;
    }
  </style>
</noscript>
