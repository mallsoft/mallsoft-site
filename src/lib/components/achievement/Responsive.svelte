<script>
  import { Throttle } from '$lib/utils';
  import { messages } from '$lib/components/announcement/messages';
  import { unlocked, achievements } from './achievementStores';
  import { onMount } from 'svelte';

  let innerWidth;
  let between300_800 = false;
  let between800_2560 = false;

  const handleResize = new Throttle(() => {
    if (innerWidth >= 800 && innerWidth < 2560) {
      between800_2560 = true;
    }

    if (innerWidth >= 300 && innerWidth < 800) {
      between300_800 = true;
    }

    if (between800_2560 && between300_800) {
      const { id, icon, name, description } = achievements.find(
        (achievement) => achievement.id === 'responsive'
      );
      $unlocked = [...$unlocked, id];
      messages.add(icon, 'Achievement! "' + name + '"', description);
    }
  }, 1000);

  onMount(() => {
    return () => {
      handleResize.clear();
    };
  });
</script>

<svelte:window bind:innerWidth on:resize={() => handleResize.exec()} />
