<script>
  import { unlocked, achievements } from '$lib/achievement/achievementStores';
</script>

{#if $unlocked && $unlocked.length}
  <article>
    <h1>Unlocked achievements</h1>
    <p>
      {$unlocked.length} / {achievements.length}
    </p>
    <ul>
      {#each $unlocked as key}
        {@const { name, description, icon } = achievements.find(
          (achievement) => achievement.id === key
        )}
        <li>
          <span>{icon}</span>
          <h2>{name}</h2>
          <p>{description}</p>
        </li>
      {/each}
    </ul>
  </article>
{/if}

<style>
  ul {
    font-size: 3rem;
  }
</style>
