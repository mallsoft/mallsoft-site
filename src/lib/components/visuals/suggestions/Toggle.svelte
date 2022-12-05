<script>
  import { messages } from '$lib/components/announcement/messages';
  import { scribblesEnabled } from './suggestionStore';
</script>

<label>
  <span>Toggle dev scribbles</span>
  <input
    type="checkbox"
    bind:checked={$scribblesEnabled}
    on:change={() =>
      messages.add(null, `${$scribblesEnabled ? 'Enabled' : 'Disabled'} scribbles`, '', 400)}
  />
</label>

<style>
  input {
    width: 1em;
    height: 1em;
  }

  label {
    display: flex;
    align-items: center;
    gap: 1em;
    transition: 0.2s color;
    color: var(---c-a2);
  }
  label:is(:hover, :focus-within) {
    color: var(---c-a1);
  }

  @media (max-width: 700px) {
    label {
      display: none;
    }
  }
</style>
