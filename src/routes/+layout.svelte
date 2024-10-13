<script lang="ts">
  import '@fontsource/space-grotesk';
  import '../app.css';
  import Meta from '$lib/components/layout/Meta.svelte';
</script>

<Meta />

<svelte:head>
  <style>
    body {
      opacity: 0;
      transition: opacity 0.2s;
    }
  </style>
</svelte:head>

<noscript>
  <style>
    body {
      transition: opacity 0.2s 1s;
      opacity: 1 !important;
    }
  </style>
</noscript>

<svelte:window
  on:load={() => {
    document.body.style.opacity = '1';
  }}
/>

<slot />
