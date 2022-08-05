<script>
  import { me } from '$lib/content';
  import { browser, dev } from '$app/env';

  if (!dev && browser) {
    const styleStrings = [
      `font-size: 2em;`,
      `font-size: 1.4em; color: #8ada55;`,
      `font-size: 1.2em; color: gray;`
    ];

    console.info(
      `

%c🧐 Hi there!

%cThis page exists because I needed a homepage and a place to experiment,
it's hosted on Netlify and built with svelte/svelteKit.

%c
Repo: ${me.repoUrl}
Feel free to make an issue if you find any broken bits or have any suggestions.
 
`,
      ...styleStrings
    );
  }
</script>

<svelte:head>
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

  <title>mallsoft•dev</title>
  <meta name="description" content="mallsoft • dev - developer and designer" />
  <link rel="icon" href="favicon.png" />

  <meta name="theme-color" content="#0c0c0d" />
</svelte:head>
