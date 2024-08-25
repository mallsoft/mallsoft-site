<script>
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import { messages } from '../announcement/messages';

  let feedback = $page.data.feedback;
  let disabled = false;
</script>

<form
  action="/?/feedback"
  method="post"
  use:enhance={() => {
    disabled = true;
    return async ({ result }) => {
      if (result.data?.fail) {
        messages.add('😭', 'Error', result.data?.fail);
      }

      const { count, id: resId } = result.data;
      let entry = feedback.find(({ id }) => id === resId);
      if (entry) {
        entry.count = count;
        feedback = feedback;
      }
      disabled = false;
    };
  }}
>
  {#each feedback as { id, name, count }}
    <button type="submit" name="iconId" value={id} {disabled}>
      <span class="icon">{name}</span>
      <span class="count">{count}</span>
    </button>
  {/each}
</form>

<style>
  form {
    display: flex;
    margin-top: 4em;
    transform-origin: left;
    transform: rotate(3deg);
    gap: 0.25em;
  }

  button {
    background-color: transparent;
    border: transparent;
    display: flex;
    align-items: center;
  }

  button > span {
    transition: all 0.5s;
  }

  button:not(:disabled):is(:hover, :focus-visible) > span:first-of-type {
    transform: scale(1.2);
  }

  button:disabled {
    filter: grayscale(0.2) opacity(0.9);
  }
  button:disabled > span:first-of-type {
    transform: scale(0.9) hue-rotate(520deg);
  }

  .icon {
    font-size: 0.8em;
  }

  .count {
    font-size: 0.5em;
    margin-top: 0.25em;
  }
</style>
