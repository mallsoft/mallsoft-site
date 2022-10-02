<script>
  import { me } from '$lib/content';
</script>

<ol>
  {#each me.work as { who, what }}
    <li>
      <h3>{who}</h3>
      <p>{what}</p>
    </li>
  {/each}
</ol>

<style>
  ol {
    display: flex;
    flex-direction: column;

    margin: 1em 0;
    gap: 1em;

    font-size: 0.9em;
  }

  li {
    display: flex;
    flex-direction: column;

    gap: 0.25em;
  }

  h3 {
    color: var(---c-a2);
    font-size: 80%;
  }
</style>
