<script>
  import { messages } from '$lib/components/announcement/messages';
  import { travel, unlocked, achievements } from './achievementStores';

  let old = {
    x: null,
    y: null
  };
  function handleMove(ev) {
    const x = ev.clientX;
    const y = ev.clientY;

    if (old.x === null) {
      old.x = x;
      old.y = y;
    }
    const distance = Math.hypot(x - old.x, y - old.y);

    $travel += Math.floor(distance);

    if ($travel >= 5_000_000) {
      const { id, icon, name, description } = achievements.find(
        (achievement) => achievement.id === 'traveler'
      );

      $unlocked = [...$unlocked, id];
      messages.add(icon, 'Achievement! "' + name + '"', description);
    }
  }
</script>

<svelte:window on:pointermove={handleMove} />
