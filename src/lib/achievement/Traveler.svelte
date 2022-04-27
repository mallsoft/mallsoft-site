<script>
  import { messages } from '$lib/announcement/messages';
  import { travel, unlocked, achievements } from './achievementStores';

  function handleMove(ev) {
    $travel++;
    if ($travel >= 1000) {
      const { id, icon, name, description } = achievements.find(
        (achievement) => achievement.id === 'traveler'
      );

      $unlocked = [...$unlocked, id];
      messages.add(icon, 'Achievement! "' + name + '"', description);
    }
  }
</script>

<svelte:window on:mousemove={handleMove} />
