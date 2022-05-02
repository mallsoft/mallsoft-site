<script lang="ts">
  import Main from '$lib/layout/Main.svelte';
  import Header from '$lib/layout/Header.svelte';
  import '../app.css';

  import { me } from '$lib/content';
  import Announcer from '$lib/announcement/Announcer.svelte';
  import Achievements from '$lib/achievement/Achievements.svelte';
  import { browser, dev } from '$app/env';

  if (!dev && browser) {
    const styleStr = `
    display: block;
    border-radius: 0.5em;
    line-height: 1.6;
    font-size: 1.5em; 
    padding: 1.5em 2em;
    margin: 1em;
    background-color: hsl(240, 10%, 15%);
    color: hsl(240, 10%, 90%);
    border: 1px solid hsl(240, 10%, 30%);
    `;

    console.log('%c🧐 Hi there!', 'font-size: 2em;');
    console.groupCollapsed('About');
    console.info(
      `%cThis page exists because I needed a homepage and a place to experiment.
It's hosted on Netlify and built with svelte/svelteKit.

If you havent already, you should try running lighthouse on this site!`,
      styleStr
    );
    console.groupEnd();
    console.groupCollapsed('Repository');
    console.info(
      `%cSource code for this site: ${me.repoUrl}

Feel free to make an issue if you find any broken bits or have any suggestions.`,
      styleStr
    );
    console.groupEnd();
  }
</script>

<svelte:head>
  <meta property="og:title" content="mallsoft" />
  <meta property="og:site_name" content="mallsoft.dev" />
  <meta property="og:url" content="https://mallsoft.dev/" />
  <meta property="og:description" content="mallsoft • dev - developer and designer" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/opengraph.jpg" />

  <meta name="twitter:title" content="mallsoft" />
  <meta name="twitter:description" content="mallsoft • dev - developer and designer" />
  <meta name="twitter:image" content="/opengraph.jpg" />
  <meta name="twitter:card" content="summary_large_image" />

  <title>mallsoft</title>
  <meta name="description" content="mallsoft • dev - developer and designer" />
  <link rel="icon" href="favicon.png" />

  <meta name="theme-color" content="#6b6b6b" />
</svelte:head>

<Header />

<Main>
  <slot />
</Main>

<Announcer />
<Achievements />
