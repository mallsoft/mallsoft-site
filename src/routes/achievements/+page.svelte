<script>
  import Unlocked from '$lib/components/content/Unlocked.svelte';
  import SuggestionLoader from '$lib/components/visuals/suggestions/SuggestionLoader.svelte';
  import SuggestionToggle from '$lib/components/visuals/suggestions/Toggle.svelte';
</script>

<svelte:head>
  <title>mallsoft•dev - Achievements</title>
</svelte:head>

<article class="default">
  <h1>Achievements</h1>
  <Unlocked />

  <SuggestionToggle />
  <SuggestionLoader />
</article>
