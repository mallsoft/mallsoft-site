<script>
  import Words from '$lib/components/content/Words.svelte';
  import SuggestionLoader from '$lib/components/visuals/suggestions/SuggestionLoader.svelte';
  import SuggestionToggle from '$lib/components/visuals/suggestions/Toggle.svelte';
</script>

<svelte:head>
  <title>mallsoft•dev - About</title>
</svelte:head>

<article class="default">
  <h1>I'm Hans</h1>
  <p>
    A developer based in Bergen<br />— mostly focused on web and UX
  </p>

  <p class="diff-add">Human-centered concepts featuring inclusive and accessible storytelling</p>

  <Words />

  <SuggestionLoader />
  <SuggestionToggle />
</article>
