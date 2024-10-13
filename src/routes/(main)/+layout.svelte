<script lang="ts">
  import Achievements from '$lib/components/achievement/Achievements.svelte';
  import Announcer from '$lib/components/announcement/Announcer.svelte';
  import Loader from '$lib/components/layout/Loader.svelte';
  import Main from '$lib/components/layout/Main.svelte';
  import Navbar from '$lib/components/layout/Navbar.svelte';

  import Confettu from '$lib/components/visuals/Confettu.svelte';
  import Terminus from '$lib/components/visuals/terminus/Terminus.svelte';
  import { isLocalStorageAvailable } from '$lib/utils';
  import Snowy from '$lib/components/visuals/Snowy.svelte';
  import { page } from '$app/stores';
  import Bacon from '$lib/components/Bacon.svelte';
  // import { onMount } from 'svelte';
</script>

<!-- <svelte:window
  on:pointerup={() => {
    // why can we do this!? ...WHY
    const textBlob = new Blob(['mallsoft.dev'], { type: 'text/plain' });
    const clipItem = new ClipboardItem({
      [textBlob.type]: textBlob
    });
    navigator.clipboard.write([clipItem]);
  }}
/> -->

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
