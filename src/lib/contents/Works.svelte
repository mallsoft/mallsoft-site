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

    margin: 0.4em 0;
    gap: 0.8em;

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

  p {
    max-width: var(---readwidth);
  }
</style>
