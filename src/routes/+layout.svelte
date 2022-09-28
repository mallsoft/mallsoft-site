<script lang="ts">
  import '@fontsource/space-grotesk';
  import '../app.css';

  import Meta from '$lib/layout/Meta.svelte';
  import Main from '$lib/layout/Main.svelte';
  import Navbar from '$lib/layout/Navbar.svelte';
  import Announcer from '$lib/announcement/Announcer.svelte';
  import Achievements from '$lib/achievement/Achievements.svelte';
  import Loader from '$lib/layout/Loader.svelte';

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
