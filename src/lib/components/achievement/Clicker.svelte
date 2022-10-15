<script>
  import { messages } from '$lib/components/announcement/messages';
  import { clicks, unlocked, achievements } from './achievementStores';

  function handleClick(ev) {
    $clicks++;
    if ($clicks >= 100) {
      const { id, icon, name, description } = achievements.find(
        (achievement) => achievement.id === 'clicker'
      );

      $unlocked = [...$unlocked, id];
      messages.add(icon, 'Achievement! "' + name + '"', description);
    }
  }
</script>

<svelte:window on:click={handleClick} />
