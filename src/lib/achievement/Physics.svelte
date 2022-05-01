<script>
  import { achievements, unlocked } from './achievementStores';
  import { messages } from '$lib/announcement/messages';

  let currentTargetIsBall = false;
  let traveledDistance = 0;
  let plays = 0;

  function handleDown(ev) {
    traveledDistance = 0;
    if (ev.target.physics) {
      currentTargetIsBall = true;
    }
  }

  function handleUp(ev) {
    currentTargetIsBall = false;
  }

  function handleMove(ev) {
    if (currentTargetIsBall) {
      traveledDistance++;
    }
    if (traveledDistance > 10) {
      traveledDistance = 0;
      currentTargetIsBall = false;
      plays++;
    }
    if (plays === 3) {
      const { id, icon, name, description } = achievements.find(
        (achievement) => achievement.id === 'physics'
      );
      $unlocked = [...$unlocked, id];
      messages.add(icon, 'Achievement! "' + name + '"', description);
    }
  }
</script>

<svelte:window on:pointerdown={handleDown} on:pointerup={handleUp} on:pointermove={handleMove} />
