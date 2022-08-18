<script>
  import { achievements, unlocked } from './achievementStores';
  import { messages } from '$lib/announcement/messages';

  let greetEvents = 0;
  function handleOver(ev) {
    if (ev.target.dataset.name === 'likeswaffels' && ev.target.nodeName === 'svg') {
      greetEvents++;
    }

    if (greetEvents >= 3) {
      const { id, icon, name, description } = achievements.find(
        (achievement) => achievement.id === 'aksel'
      );
      $unlocked = [...$unlocked, id];
      messages.add(icon, 'Achievement! "' + name + '"', description);
    }
  }
</script>

<svelte:window on:pointerover={handleOver} />
