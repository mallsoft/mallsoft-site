<script lang="ts">
  import '@fontsource/space-grotesk';
  import '../app.css';

  import Achievements from '$lib/components/achievement/Achievements.svelte';
  import Announcer from '$lib/components/announcement/Announcer.svelte';
  import Loader from '$lib/components/layout/Loader.svelte';
  import Main from '$lib/components/layout/Main.svelte';
  import Meta from '$lib/components/layout/Meta.svelte';
  import Navbar from '$lib/components/layout/Navbar.svelte';

  import Confettu from '$lib/components/visuals/Confettu.svelte';
  import Terminus from '$lib/components/visuals/terminus/Terminus.svelte';
  import { isLocalStorageAvailable } from '$lib/utils';
  import Snowy from '$lib/components/visuals/Snowy.svelte';
  import { page } from '$app/stores';
  import Bacon from '$lib/components/Bacon.svelte';
</script>

<Meta />

<Navbar />

<Main>
  <slot />
</Main>

<Loader />

<Announcer />

{#if isLocalStorageAvailable()}
  <Achievements />
  <Bacon />
{/if}

<Terminus />

<Confettu />

{#if [11, 12, 1, 2].includes(new Date().getMonth() + 1) && $page.url.pathname === '/'}
  <Snowy />
{/if}
