<script lang="ts">
  import '../app.css';

  import Meta from '$lib/layout/Meta.svelte';
  import Main from '$lib/layout/Main.svelte';
  import Header from '$lib/layout/Header.svelte';
  import Announcer from '$lib/announcement/Announcer.svelte';
  import Achievements from '$lib/achievement/Achievements.svelte';
  import FullscreenLoader from '$lib/layout/FullscreenLoader.svelte';
  import { prefetch } from '$app/navigation';
  import { onMount } from 'svelte';
  import Aksel from '$lib/visuals/Aksel.svelte';

  onMount(() => {
    prefetch('/projects');
    prefetch('/about');
    prefetch('/contact');
  });
</script>

<Meta />

<FullscreenLoader />
<Header />

<Main>
  <slot />
</Main>

<Announcer />
<Achievements />

<Aksel />
