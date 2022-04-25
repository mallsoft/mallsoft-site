<script lang="ts">
  import Main from '$lib/layout/Main.svelte';
  import Header from '$lib/layout/Header.svelte';
  import '../app.css';

  import { projectlog } from '$lib/content';
  import Announcer from '$lib/Announcements/Announcer.svelte';
  import { messages } from '$lib/Announcements/messages';

  let memes = 0;
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

<Announcer />

<!-- TEST -->
<svelte:window
  on:keypress={(ev) => {
    if (ev.key === 'a') {
      ev.preventDefault();
      messages.add('test!', 'test!!!!!' + ++memes);
    }
  }}
/>
