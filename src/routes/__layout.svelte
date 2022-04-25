<script lang="ts">
  import Main from '$lib/layout/Main.svelte';
  import Header from '$lib/layout/Header.svelte';
  import '../app.css';

  import { projectlog } from '$lib/content';
</script>

<svelte:head>
  <title>mallsoft</title>
  <meta name="description" content="mallsoft homepage" />
  <link rel="icon" href="favicon.png" />

  <meta name="theme-color" content="#6b6b6b" />

  {#each projectlog as { image }}
    <link rel="preload" href={image} as="image" />
  {/each}
</svelte:head>

<Header />

<Main>
  <slot />
</Main>
