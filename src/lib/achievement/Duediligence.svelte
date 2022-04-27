<script>
  import { messages } from '$lib/announcement/messages';
  import { visits, unlocked, achievements } from './achievementStores';
  import { page } from '$app/stores';
  import { browser } from '$app/env';

  $: routeChange($page.url.pathname);

  function routeChange(pathname) {
    if (!browser) return;

    if ($visits[pathname] !== undefined) {
      $visits[pathname]++;
    }

    const allPages = Object.entries($visits);
    if (allPages.every(([route, count]) => count)) {
      const { id, icon, name, description } = achievements.find(
        (achievement) => achievement.id === 'duediligence'
      );
      $unlocked = [...$unlocked, id];
      messages.add(icon, 'Achievement! "' + name + '"', description);
    }
  }
</script>
