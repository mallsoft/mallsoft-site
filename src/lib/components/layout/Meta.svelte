<script>
  import { me } from '$lib/content';
  import { dev } from '$app/environment';
  import { onMount } from 'svelte';

  onMount(() => {
    if (!dev) {
      const styleStrings = [
        `font-size: 2em;`,
        `font-size: 1.6em;`,
        `font-size: .8em;font-style: italic;`,
        `font-size: 1.2em;`
      ];

      console.info(
        `


%c🧐 Hi there!

%cThis page exists because I needed a homepage and a place to experiment,
built with svelte/svelteKit and _was_ hosted on Netlify👎, but moved to fly.io👌.
%c...because somepeople don't consider waiting for 1.5s for servers to respond as "fast"...
%c
Repo: ${me.repoUrl}
Feel free to make an issue if you find any broken bits or have any suggestions.


`,
        ...styleStrings
      );
    }
  });
</script>

<svelte:head>
  <link rel="manifest" href="manifest.json" crossorigin="use-credentials" />
  <link rel="apple-touch-icon" href="meta/apple_t_192.png" />
  <link rel="icon" href="favicon.png" />

  <meta property="og:title" content="mallsoft" />
  <meta property="og:site_name" content="mallsoft.dev" />
  <meta property="og:url" content="https://mallsoft.dev/" />
  <meta property="og:description" content="mallsoft • dev - developer and designer" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/meta/opengraph.jpg" />

  <meta name="twitter:title" content="mallsoft" />
  <meta name="twitter:description" content="mallsoft • dev - developer and designer" />
  <meta name="twitter:image" content="/meta/opengraph.jpg" />
  <meta name="twitter:card" content="summary_large_image" />

  <meta name="description" content="mallsoft • dev - developer and designer" />

  <meta name="theme-color" content="#196ee6" />
</svelte:head>
