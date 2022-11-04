<script>
  import { achievements, unlocked } from '$lib/components/achievement/achievementStores';
  import { messages } from '$lib/components/announcement/messages';
  import { scribblesEnabled } from './suggestionStore';
</script>

{#if $unlocked.length === achievements.length}
  <section>
    Toggle dev scribbles <input
      type="checkbox"
      bind:checked={$scribblesEnabled}
      on:change={() =>
        messages.add(null, `${$scribblesEnabled ? 'Enabled' : 'Disabled'} scribbles`, '', 400)}
    />
  </section>
{/if}

<style>
  input {
    width: 1em;
    height: 1em;
  }

  section {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  @media (max-width: 700px) {
    section {
      display: none;
    }
  }
</style>
