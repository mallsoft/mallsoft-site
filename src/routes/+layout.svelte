<script lang="ts">
  import '@fontsource/space-grotesk';
  import '../app.css';

  import Meta from '$lib/components/layout/Meta.svelte';
  import Main from '$lib/components/layout/Main.svelte';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Announcer from '$lib/components/announcement/Announcer.svelte';
  import Achievements from '$lib/components/achievement/Achievements.svelte';
  import Loader from '$lib/components/layout/Loader.svelte';

  import { isLocalStorageAvailable } from '$lib/utils';
</script>

<Meta />

<Loader />

<Navbar />

<Main>
  <slot />
</Main>

<Announcer />

{#if isLocalStorageAvailable()}
  <Achievements />
{/if}
