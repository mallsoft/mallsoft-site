<script lang="ts">
  import '@fontsource/space-grotesk';
  import '../app.css';

  import Meta from '$lib/components/layout/Meta.svelte';
  import Main from '$lib/components/layout/Main.svelte';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Announcer from '$lib/components/announcement/Announcer.svelte';
  import Achievements from '$lib/components/achievement/Achievements.svelte';
  import Loader from '$lib/components/layout/Loader.svelte';
  import Snowy from '$lib/components/visuals/Snowy.svelte';

  import { isLocalStorageAvailable } from '$lib/utils';
  import { page } from '$app/stores';
</script>

<Meta />

<Loader />

<Navbar />

<Main>
  <slot />
</Main>

{#if new Date().getMonth() === 11 && $page.url.pathname === '/'}
  <Snowy />
{/if}

<Announcer />

{#if isLocalStorageAvailable()}
  <Achievements />
{/if}
